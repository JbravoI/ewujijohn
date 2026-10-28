const requests = new Map<string, { count: number; reset: number }>();

export function isRateLimited(request: Request, limit = 5, windowMs = 60 * 60 * 1000) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const entry = requests.get(ip);
  const currentCount = entry && entry.reset > now ? entry.count : 0;
  if (currentCount >= limit) return true;
  requests.set(ip, { count: currentCount + 1, reset: now + windowMs });
  return false;
}
