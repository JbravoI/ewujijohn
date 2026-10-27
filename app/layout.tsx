import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ewuji John | Azure and DevOps Learning", template: "%s | Ewuji John" },
  description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ewujijohn.vercel.app"),
  openGraph: { type: "website", title: "Ewuji John | Azure and DevOps Learning", description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
