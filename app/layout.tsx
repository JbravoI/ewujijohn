import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Ewuji John | Azure and DevOps Learning", template: "%s | Ewuji John" },
  description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/", types: { "application/rss+xml": `${siteUrl}/rss.xml` } },
  category: "technology",
  keywords: ["Azure", "DevOps", "Terraform", "Kubernetes", "cloud engineering", "Azure training", "Ewuji John"],
  icons: { icon: [{ url: "/favicon-512.png", type: "image/png", sizes: "512x512" }], apple: [{ url: "/favicon-512.png", type: "image/png", sizes: "512x512" }] },
  openGraph: { type: "website", title: "Ewuji John | Azure and DevOps Learning", description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: "Ewuji John | Azure and DevOps Learning", description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning.", images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Person", name: "Ewuji John", url: siteUrl, jobTitle: "Azure DevOps Engineer and Trainer", sameAs: ["https://www.linkedin.com/in/ewuji-oluwaseyi-john-40bb1413b/", "https://medium.com/@johnseyi51", "https://www.youtube.com/@Bravodigitals", "https://github.com/JbravoI"] }, { "@type": "WebSite", name: "Ewuji John", url: siteUrl, description: "Practical Azure, DevOps, Kubernetes, and Infrastructure-as-Code learning." }, { "@type": "Organization", name: "Ewuji John", url: siteUrl, sameAs: ["https://www.linkedin.com/in/ewuji-oluwaseyi-john-40bb1413b/", "https://github.com/JbravoI"] }] };
  return <html lang="en"><head><meta property="og:logo" content={`${siteUrl}/favicon-512.png`} /><meta property="og:image:secure_url" content={`${siteUrl}/opengraph-image`} /></head><body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /></body></html>;
}
