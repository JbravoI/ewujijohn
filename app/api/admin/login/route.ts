import { NextResponse } from "next/server";
import { z } from "zod";
import { adminCookieName, createAdminSession, isValidAdminPassword } from "@/lib/admin-auth";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (isRateLimited(request, 5, 15 * 60 * 1000)) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const parsed = z.object({ password: z.string().min(1).max(500) }).safeParse(await request.json().catch(() => null));
  if (!parsed.success || !isValidAdminPassword(parsed.data.password)) return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookieName, createAdminSession(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
