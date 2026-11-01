import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ewujijohn.com").replace(/\/$/, "");

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | Ewuji John`;
  return {
    title,
    description,
    keywords: ["Azure", "DevOps", "Terraform", "Kubernetes", "Azure training", "cloud infrastructure", "Ewuji John"],
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Ewuji John", title: fullTitle, description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ewuji John — Azure and DevOps learning" }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
  };
}
