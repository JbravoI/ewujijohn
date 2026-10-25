export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return <section className="page-hero shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="lede">{children}</div></section>;
}
