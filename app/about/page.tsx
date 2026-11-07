import Image from "next/image";
import { FaAws, FaDocker, FaGithub, FaLinkedin, FaMicrosoft } from "react-icons/fa";
import { SiHelm, SiKubernetes, SiTerraform } from "react-icons/si";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { AboutContributions } from "@/components/about-contributions";

export const metadata = pageMetadata({ title: "About", description: "Meet Ewuji John, a DevOps engineer and Azure cloud infrastructure specialist sharing practical learning for aspiring and working engineers.", path: "/about" });

const capabilities = [
  { title: "Cloud platforms", items: [["Microsoft Azure", FaMicrosoft], ["Amazon Web Services", FaAws]] },
  { title: "DevOps & delivery", items: [["Azure DevOps", FaMicrosoft], ["GitHub Actions", FaGithub], ["Docker", FaDocker]] },
  { title: "Infrastructure & containers", items: [["Terraform", SiTerraform], ["Kubernetes & AKS", SiKubernetes], ["Helm", SiHelm]] },
  { title: "Engineering practice", items: [["CI/CD automation", null], ["Cloud governance & RBAC", null], ["Monitoring & reliability", null]] },
] as const;

export default function AboutPage() {
  return <><section className="shell about-intro"><div className="about-copy"><p className="eyebrow">About Ewuji John</p><h1>Practical engineering for reliable cloud platforms.</h1><p className="lede">I am a DevOps Engineer and cloud infrastructure specialist focused on Azure, automation, Kubernetes, Infrastructure as Code, and production reliability.</p><p>I translate cloud concepts into practical skills through hands-on training, reusable Terraform projects, technical writing, and community learning resources for aspiring learners and working engineers.</p><div className="actions"><a className="button primary" href={siteConfig.links.linkedin} target="_blank" rel="noreferrer"><FaLinkedin aria-hidden="true" /> Connect on LinkedIn</a><a className="button secondary" href={siteConfig.links.github} target="_blank" rel="noreferrer"><FaGithub aria-hidden="true" /> View GitHub</a></div></div><Image className="about-portrait" src="/images/ewuji-john.jpg" alt="Ewuji John, DevOps Engineer" width={480} height={480} priority /></section><section className="shell section"><div className="about-section-heading"><p className="eyebrow">Technical profile</p><h2>Tools and practices I use to build, automate, and operate cloud environments.</h2></div><div className="capability-grid">{capabilities.map((group) => <article className="capability-group" key={group.title}><h2>{group.title}</h2><ul>{group.items.map(([label, Icon]) => <li key={label}>{Icon ? <Icon aria-hidden="true" /> : <span className="capability-mark" aria-hidden="true" />}<span>{label}</span></li>)}</ul></article>)}</div></section><section className="shell section about-practice"><div><p className="eyebrow">How I contribute</p><h2>Learning that connects theory to real operational work.</h2></div><AboutContributions /></section></>;
}
