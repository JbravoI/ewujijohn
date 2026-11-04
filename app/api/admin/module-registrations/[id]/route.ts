import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { isAdminRequest } from "@/lib/admin-auth";
import { mongoClientPromise } from "@/lib/mongodb";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminRequest(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid registration." }, { status: 400 });
  const result = await (await mongoClientPromise).db("ewujijohn").collection("moduleRegistrations").deleteOne({ _id: new ObjectId(id) });
  if (!result.deletedCount) return NextResponse.json({ error: "Registration not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
