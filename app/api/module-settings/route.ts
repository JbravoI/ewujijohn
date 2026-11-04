import { NextResponse } from "next/server";
import { mongoClientPromise } from "@/lib/mongodb";

export async function GET() {
  const settings = await (await mongoClientPromise).db("ewujijohn").collection("moduleSettings")
    .find<{ module: string; registrationEnabled?: boolean }>({ month: "Month 1" }).toArray();
  return NextResponse.json({ disabledModules: settings.filter((item) => item.registrationEnabled === false).map((item) => item.module) });
}
