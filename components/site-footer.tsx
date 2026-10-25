import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><strong>{siteConfig.name}</strong><p>Practical cloud engineering, shared openly.</p></div><div className="social-links"><a href={siteConfig.links.linkedin}>LinkedIn</a><a href={siteConfig.links.medium}>Medium</a><a href={siteConfig.links.youtube}>YouTube</a><a href={siteConfig.links.github}>GitHub</a></div></div></footer>;
}
