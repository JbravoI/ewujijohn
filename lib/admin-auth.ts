import { createHmac, timingSafeEqual } from "crypto";

const cookieName = "ewujijohn_admin";

function secret() { const value = process.env.ADMIN_SESSION_SECRET; if (!value) throw new Error("Admin session is not configured."); return value; }
function signature(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }

export function isValidAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const inputBuffer = Buffer.from(password); const expectedBuffer = Buffer.from(expected);
  return inputBuffer.length === expectedBuffer.length && timingSafeEqual(inputBuffer, expectedBuffer);
}
export function createAdminSession() { const expires = Date.now() + 1000 * 60 * 60 * 8; const value = String(expires); return `${value}.${signature(value)}`; }
export function isValidAdminSession(token?: string) { if (!token) return false; const [expires, provided] = token.split("."); if (!expires || !provided || Number(expires) < Date.now()) return false; const expected = signature(expires); const left = Buffer.from(provided); const right = Buffer.from(expected); return left.length === right.length && timingSafeEqual(left, right); }
export const adminCookieName = cookieName;
