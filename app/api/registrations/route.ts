import { NextResponse } from "next/server";
import { z } from "zod";
import { mongoClientPromise } from "@/lib/mongodb";
const schema=z.object({name:z.string().trim().min(2).max(100),email:z.email().max(254),careerPath:z.string().trim().min(2).max(100),experienceLevel:z.enum(["Beginner","Intermediate","Advanced"]),goals:z.string().trim().min(10).max(1000),consentToContact:z.literal(true),website:z.string().max(0).optional()});
export async function POST(request:Request){const data=schema.safeParse(await request.json().catch(()=>null));if(!data.success)return NextResponse.json({error:"Please complete every required field."},{status:400});if(data.data.website)return NextResponse.json({ok:true});const client=await mongoClientPromise;await client.db("ewujijohn").collection("registrations").insertOne({...data.data,sessionId:"azure-governance-month-1",createdAt:new Date()});return NextResponse.json({ok:true},{status:201});}
