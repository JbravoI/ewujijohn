import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Month 1 Azure Fundamentals and Governance", description: "Learn Azure subscriptions, resource groups, tags, RBAC, Azure Policy, monitoring, and governance through practical training.", path: "/training/month-1" });
export default function MonthOneLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
