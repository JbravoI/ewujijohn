import { NextResponse } from "next/server";
import { mongoClientPromise } from "@/lib/mongodb";
import { isAdminRequest } from "@/lib/admin-auth";
import { sendAdminEmail } from "@/lib/mailer";
const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
export async function POST(request: Request) { if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); const docs = await (await mongoClientPromise).db("ewujijohn").collection("moduleRegistrations").find().sort({ createdAt: -1 }).limit(500).toArray(); const csv = ["Name,Email,Month,Modules,Expectations,Status,Created at", ...docs.map((item) => [item.name, item.email, item.month, (item.modules as string[] | undefined)?.join(" | "), item.expectations, item.status, item.createdAt].map(escape).join(","))].join("\n"); await sendAdminEmail({ to: process.env.GMAIL_USER!, subject: "Ewuji John module registration report", text: "Your requested module registration report is attached.", attachments: [{ filename: "module-registrations.csv", content: csv }] }); return NextResponse.json({ ok: true }); }
