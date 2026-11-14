import { NextResponse } from "next/server";
import { z } from "zod";
import { isAdminRequest } from "@/lib/admin-auth";
import { monthOneModuleTitles } from "@/lib/month-one-modules";
import { monthTwoModuleTitles } from "@/lib/month-two-modules";
import { mongoClientPromise } from "@/lib/mongodb";

const moduleTitlesByMonth = { "Month 1": monthOneModuleTitles, "Month 2": monthTwoModuleTitles } as const;
const schema = z.object({ month: z.enum(["Month 1", "Month 2"]), module: z.string(), registrationEnabled: z.boolean() });

export async function PATCH(request: Request) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !moduleTitlesByMonth[parsed.data.month].includes(parsed.data.module)) return NextResponse.json({ error: "Invalid module setting." }, { status: 400 });
  await (await mongoClientPromise).db("ewujijohn").collection("moduleSettings").updateOne(
    { month: parsed.data.month, module: parsed.data.module },
    { $set: { registrationEnabled: parsed.data.registrationEnabled, updatedAt: new Date() } },
    { upsert: true },
  );
  return NextResponse.json({ ok: true });
}
