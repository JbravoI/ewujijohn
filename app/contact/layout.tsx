import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
export const metadata: Metadata = pageMetadata({ title: "Contact", description: "Contact Ewuji John for Azure, DevOps, speaking, and collaboration enquiries.", path: "/contact" });
export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
