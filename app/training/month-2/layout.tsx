import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Month 2 Azure Compute, Storage, AKS and Container Platforms",
  description: "Learn Azure Storage, Azure Compute, Docker, Azure Container Registry, Azure Kubernetes Service, Helm, AKS networking, upgrades, and day-2 operations through practical training.",
  path: "/training/month-2",
});

export default function MonthTwoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
