import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/training", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/training/month-1", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/training/month-2", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/training/azure-governance", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/training/azure-governance/register", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/labs", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/community", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/accessibility", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `${siteUrl}${route.path}`, lastModified: new Date("2026-11-01"), changeFrequency: route.changeFrequency, priority: route.priority })); }
