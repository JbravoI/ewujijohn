import { NextResponse } from "next/server";
import type { ObjectId } from "mongodb";
import { z } from "zod";
import { mongoClientPromise } from "@/lib/mongodb";
import { sendModuleRegistrationEmails } from "@/lib/mailer";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  month: z.literal("Month 1"),
  modules: z.array(z.string().trim().min(3).max(180)).min(1).max(6),
  expectations: z.string().trim().min(10).max(1000),
  consentToContact: z.literal("true").transform(() => true),
  website: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  if (isRateLimited(request)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const client = await mongoClientPromise;
  const registrations = client.db("ewujijohn").collection("moduleRegistrations");
  const emailNormalized = parsed.data.email.trim().toLowerCase();
  const registration = { ...parsed.data, email: emailNormalized, emailNormalized };
  const existingRegistrations = await registrations.find<{ _id: ObjectId; modules?: string[] }>({ $or: [{ emailNormalized, month: registration.month }, { email: emailNormalized, month: registration.month }] }).sort({ createdAt: 1 }).toArray();
  const existing = existingRegistrations[0];
  const registeredModules = new Set(existingRegistrations.flatMap((item) => item.modules ?? []));
  const registeredModuleSlugs = [...registeredModules].map((module) => module.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  const submittedModules = [...new Set(registration.modules)];
  const newModules = submittedModules.filter((module) => !registeredModules.has(module));

  if (existing && newModules.length === 0) {
    if (existingRegistrations.length > 1) {
      await registrations.updateOne({ _id: existing._id }, { $set: { email: emailNormalized, emailNormalized, modules: [...registeredModules], moduleSlugs: registeredModuleSlugs, updatedAt: new Date() } });
      await registrations.deleteMany({ _id: { $in: existingRegistrations.slice(1).map((item) => item._id) } });
    }
    return NextResponse.json({ ok: true, duplicate: true, message: "You are already registered for the selected module(s)." });
  }

  const newModuleSlugs = newModules.map((module) => module.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  if (existing) {
    await registrations.updateOne(
      { _id: existing._id },
      { $addToSet: { modules: { $each: newModules }, moduleSlugs: { $each: newModuleSlugs } }, $set: { name: registration.name, email: emailNormalized, emailNormalized, expectations: registration.expectations, updatedAt: new Date() } },
    );
    if (existingRegistrations.length > 1) await registrations.deleteMany({ _id: { $in: existingRegistrations.slice(1).map((item) => item._id) } });
  } else {
    await registrations.insertOne({ ...registration, modules: newModules, moduleSlugs: newModuleSlugs, status: "new", createdAt: new Date() });
  }
  try { await sendModuleRegistrationEmails({ ...registration, modules: newModules }); } catch (error) { console.error("Module registration saved, but email notification could not be sent.", error); }
  return NextResponse.json({ ok: true, addedModules: newModules.length }, { status: existing ? 200 : 201 });
}
