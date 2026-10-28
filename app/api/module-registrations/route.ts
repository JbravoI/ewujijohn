import { NextResponse } from "next/server";
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
  await client.db("ewujijohn").collection("moduleRegistrations").insertOne({ ...parsed.data, moduleSlugs: parsed.data.modules.map((module) => module.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")), status: "new", createdAt: new Date() });
  try { await sendModuleRegistrationEmails(parsed.data); } catch (error) { console.error("Module registration saved, but email notification could not be sent.", error); }
  return NextResponse.json({ ok: true }, { status: 201 });
}
