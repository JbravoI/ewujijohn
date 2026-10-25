import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoClientPromise } from "@/lib/mongodb";

const schema = z.object({ name:z.string().trim().min(2).max(100), email:z.email().max(254), subject:z.string().trim().min(3).max(160), message:z.string().trim().min(10).max(5000), consentToReply:z.literal(true), website:z.string().max(0).optional() });
const requests = new Map<string,{count:number; reset:number}>();

export async function POST(request: Request) {
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now=Date.now(); const entry=requests.get(ip);
  if(entry && entry.reset>now && entry.count>=5) return NextResponse.json({error:"Too many requests. Try again later."},{status:429});
  requests.set(ip,{count:(entry?.reset>now?entry.count:0)+1,reset:now+60*60*1000});
  const parsed=schema.safeParse(await request.json().catch(()=>null));
  if(!parsed.success) return NextResponse.json({error:"Please check the form fields and consent to a reply."},{status:400});
  if(parsed.data.website) return NextResponse.json({ok:true});
  const client=await mongoClientPromise;
  await client.db("ewujijohn").collection("contactMessages").insertOne({name:parsed.data.name,email:parsed.data.email,subject:parsed.data.subject,message:parsed.data.message,consentToReply:true,createdAt:new Date(),status:"new"});
  return NextResponse.json({ok:true},{status:201});
}
