import { siteConfig } from "@/lib/site";
import { FaGithub, FaLinkedin, FaMedium, FaYoutube } from "react-icons/fa";

const socialLinks=[["LinkedIn",siteConfig.links.linkedin,FaLinkedin],["Medium",siteConfig.links.medium,FaMedium],["YouTube",siteConfig.links.youtube,FaYoutube],["GitHub",siteConfig.links.github,FaGithub]] as const;
export function SiteFooter() { return <footer className="site-footer"><div className="shell footer-grid"><div><strong>{siteConfig.name}</strong><p>Practical cloud engineering, shared openly.</p></div><div className="social-links">{socialLinks.map(([label,href,Icon])=><a key={label} href={href} aria-label={`Visit Ewuji John's ${label}`}><Icon aria-hidden="true"/><span>{label}</span></a>)}</div></div></footer>; }
