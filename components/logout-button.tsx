"use client";
import { useRouter } from "next/navigation";
export function LogoutButton(){const router=useRouter();return <button className="button secondary" onClick={async()=>{await fetch("/api/admin/logout",{method:"POST"});router.replace("/admin/login")}}>Sign out</button>}
