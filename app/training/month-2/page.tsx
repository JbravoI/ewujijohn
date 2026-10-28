import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const topics = [
  "Docker, container images, and Azure Container Registry (ACR)",
  "Deploying, managing, and troubleshooting Azure Kubernetes Service (AKS)",
  "Helm charts and repeatable application delivery on AKS",
  "AKS networking: CNI, ingress, Azure Load Balancer, and internal load balancing",
  "High availability, node pools, cluster upgrades, and day-2 operations",
];

export default function MonthTwoPage() {
  return <><PageHero eyebrow="Month 2 · AKS & container platforms" title="Operate Azure Kubernetes Service with confidence."><p>Move from container fundamentals to deploying, networking, and maintaining production-minded AKS workloads.</p></PageHero><section className="shell section"><p className="eyebrow">Topics</p><div className="card-grid">{topics.map((topic, index) => <article className="card" key={topic}><p className="eyebrow">Module {index + 1}</p><h2>{topic}</h2></article>)}</div></section><section className="shell section feature"><div><p className="eyebrow">Session details</p><h2>Resources, practical labs, schedules, and registration will be added here.</h2><p>The learning structure is ready for the detailed Month 2 material you provide next.</p></div><Link className="button secondary" href="/training">View full roadmap</Link></section></>;
}
