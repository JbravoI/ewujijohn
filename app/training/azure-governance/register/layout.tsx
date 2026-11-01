import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Register for Azure Governance Training", description: "Register your interest for Ewuji John's Azure governance class covering resource groups, tags, RBAC, and Azure Policy.", path: "/training/azure-governance/register" });
export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
