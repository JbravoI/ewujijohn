import type { MetadataRoute } from "next";
const routes=["","/about","/blog","/training","/training/month-1","/training/month-2","/training/azure-governance","/labs","/community","/contact","/privacy","/accessibility","/terms"];
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL ?? "https://ewujijohn.vercel.app"; return routes.map(route=>({url:`${base}${route}`,lastModified:new Date()})); }
