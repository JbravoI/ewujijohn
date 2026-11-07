"use client";

import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaPlayCircle } from "react-icons/fa";

const sessions = [
  { title: "The Gist on Cloud Engineering for Analytics Professionals W/ John Ewuji", href: "https://www.youtube.com/watch?v=AagUI7hNWvw&t=1s", platform: "YouTube" },
  { title: "Cloud migration in Nigeria: Building secure, compliant and AI-Ready Businesses", href: "https://lnkd.in/p/e6K6dS7E", platform: "LinkedIn" },
  { title: "Building Resilient Digital Banking Infrastructure in Africa", href: "https://www.youtube.com/watch?v=XzIbsIbefvk&t=533s", platform: "YouTube" },
];

export function AboutContributions() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  return <><div className="about-contribution-grid"><a className="about-contribution-link" href="/training"><h3>Azure training <FaExternalLinkAlt aria-hidden="true" /></h3><p>Guided modules for Azure governance, AKS, CI/CD, Terraform, observability, and DevSecOps.</p></a><a className="about-contribution-link" href="https://github.com/JbravoI/terraform-azurerm-aks-workload-identity" target="_blank" rel="noreferrer"><h3>Open-source labs <FaExternalLinkAlt aria-hidden="true" /></h3><p>Reference projects that show infrastructure patterns, guardrails, workload identity, and automation in practice.</p></a><button className="about-contribution-link" type="button" onClick={() => setOpen(true)}><h3>Technical content <FaPlayCircle aria-hidden="true" /></h3><p>Open podcasts and speaking sessions on cloud engineering, migration, and resilient infrastructure.</p></button></div>{open && <div className="modal-backdrop" onMouseDown={() => setOpen(false)}><section className="module-modal speaking-modal" role="dialog" aria-modal="true" aria-labelledby="speaking-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close speaking sessions">×</button><p className="eyebrow">Speaking & podcast archive</p><h2 id="speaking-title">Technical content and conversations</h2><p>Explore sessions where I discuss practical cloud engineering, migration, and reliable digital infrastructure.</p><div className="speaking-list">{sessions.map((session) => <a href={session.href} target="_blank" rel="noreferrer" key={session.href}><span>{session.platform}</span><strong>{session.title}</strong><em>Open session <FaExternalLinkAlt aria-hidden="true" /></em></a>)}</div></section></div>}</>;
}
