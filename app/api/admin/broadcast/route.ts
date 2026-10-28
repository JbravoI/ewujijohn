import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoClientPromise } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/admin-auth";
import { sendAdminEmail } from "@/lib/mailer";
const schema = z.object({ modules: z.array(z.string().min(1)).min(1).max(6), subject: z.string().trim().min(3).max(160), message: z.string().trim().min(3).max(5000) });
export async function POST(request: Request) { if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ error: "Check your message and selected modules." }, { status: 400 }); const recipients = await (await mongoClientPromise).db("ewujijohn").collection("moduleRegistrations").aggregate<{ _id: string }>([{ $match: { modules: { $in: parsed.data.modules } } }, { $group: { _id: "$email" } }, { $limit: 100 }]).toArray(); if (!recipients.length) return NextResponse.json({ error: "No recipients found." }, { status: 404 }); await Promise.all(recipients.map((item) => sendAdminEmail({ to: item._id, subject: parsed.data.subject, text: parsed.data.message }))); return NextResponse.json({ ok: true, recipients: recipients.length }); }
