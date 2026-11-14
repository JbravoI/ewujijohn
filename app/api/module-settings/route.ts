import { NextResponse } from "next/server";
import { mongoClientPromise } from "@/lib/mongodb";

const months = ["Month 1", "Month 2"];

export async function GET(request: Request) {
  const requestedMonth = new URL(request.url).searchParams.get("month") ?? "Month 1";
  if (!months.includes(requestedMonth)) return NextResponse.json({ error: "Invalid training month." }, { status: 400 });
  const settings = await (await mongoClientPromise).db("ewujijohn").collection("moduleSettings")
    .find<{ module: string; registrationEnabled?: boolean }>({ month: requestedMonth }).toArray();
  return NextResponse.json({ disabledModules: settings.filter((item) => item.registrationEnabled === false).map((item) => item.module) });
}
