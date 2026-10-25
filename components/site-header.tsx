import Link from "next/link";

const links = [
  ["Training", "/training"], ["Blog", "/blog"], ["Labs", "/labs"],
  ["Community", "/community"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  return <header className="site-header"><nav aria-label="Primary navigation" className="shell nav"><Link className="brand" href="/">Ewuji John</Link><div className="nav-links">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div></nav></header>;
}
