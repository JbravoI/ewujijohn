import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const topics = [
  "Azure subscriptions, resources, and resource groups",
  "Management groups, tags, and consistent resource organisation",
  "Role-based access control (RBAC) and least-privilege access",
  "Azure Policy basics and governance guardrails",
  "Platform capacity, performance, availability, and cost monitoring",
  "An introduction to hybrid connectivity with Azure Arc, ExpressRoute, and VPN Gateway",
];

export default function MonthOnePage() {
  return <><PageHero eyebrow="Month 1 · Azure fundamentals & governance" title="Build a governed Azure foundation."><p>Understand how Azure environments are organised, secured, monitored, and managed before moving to application platforms.</p></PageHero><section className="shell section"><p className="eyebrow">Topics</p><div className="card-grid">{topics.map((topic, index) => <article className="card" key={topic}><p className="eyebrow">Module {index + 1}</p><h2>{topic}</h2></article>)}</div></section><section className="shell section feature"><div><p className="eyebrow">Session details</p><h2>Resources, practical labs, schedules, and registration will be added here.</h2><p>The learning structure is ready for the detailed Month 1 material you provide next.</p></div><Link className="button secondary" href="/training">View full roadmap</Link></section></>;
}
