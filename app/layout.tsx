import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ewuji John | Azure and DevOps Learning", template: "%s | Ewuji John" },
  description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ewujijohn.vercel.app"),
  openGraph: { type: "website", title: "Ewuji John | Azure and DevOps Learning", description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Ewuji John | Azure and DevOps Learning", description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ewujijohn.vercel.app";
  const person = { "@context": "https://schema.org", "@type": "Person", name: "Ewuji John", url: siteUrl, jobTitle: "Azure DevOps Engineer and Trainer", sameAs: ["https://www.linkedin.com/in/ewuji-oluwaseyi-john-40bb1413b/", "https://medium.com/@johnseyi51", "https://www.youtube.com/@Bravodigitals", "https://github.com/JbravoI"] };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}/><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
