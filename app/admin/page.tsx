import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { mongoClientPromise } from "@/lib/mongodb";
import { adminCookieName, isValidAdminSession } from "@/lib/admin-auth";
import { LogoutButton } from "@/components/logout-button";
import { AdminDashboard } from "@/components/admin-dashboard";

type Record = { _id: { toString(): string }; name?: string; email?: string; subject?: string; message?: string; modules?: string[]; month?: string; expectations?: string; createdAt?: Date; status?: string };
const date = (value?: Date) => value ? new Date(value).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : "—";
const plain=(records:Record[])=>records.map(({_id,createdAt,...record})=>({...record,id:_id.toString(),createdAt:date(createdAt)}));
export default async function AdminPage(){const token=(await cookies()).get(adminCookieName)?.value;if(!isValidAdminSession(token))redirect("/admin/login");const db=(await mongoClientPromise).db("ewujijohn");const [messages,registrations,moduleRegistrations]=await Promise.all([db.collection<Record>("contactMessages").find().sort({createdAt:-1}).limit(100).toArray(),db.collection<Record>("registrations").find().sort({createdAt:-1}).limit(100).toArray(),db.collection<Record>("moduleRegistrations").find().sort({createdAt:-1}).limit(100).toArray()]);return <main className="shell section"><div className="admin-heading"><div><p className="eyebrow">Private dashboard</p><h1>Registration reports</h1></div><LogoutButton/></div><AdminDashboard messages={plain(messages)} registrations={plain(registrations)} moduleRegistrations={plain(moduleRegistrations)}/></main>}
