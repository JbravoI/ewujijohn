"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { monthTwoModules } from "@/lib/month-two-modules";
import type { TrainingModule } from "@/lib/month-one-modules";

export default function MonthTwoPage() {
  const [selected, setSelected] = useState<TrainingModule | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [disabledModules, setDisabledModules] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const enabledModules = useMemo(() => monthTwoModules.filter((module) => !disabledModules.includes(module.title)), [disabledModules]);
  const isComplete = selected ? disabledModules.includes(selected.title) : false;
  const nextModule = selected ? enabledModules.find((module) => monthTwoModules.indexOf(module) > monthTwoModules.indexOf(selected)) ?? enabledModules[0] : undefined;

  useEffect(() => { fetch("/api/module-settings?month=Month%202").then((response) => response.json()).then((data) => setDisabledModules(Array.isArray(data.disabledModules) ? data.disabledModules : [])).catch(() => undefined); }, []);
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null); window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const openModule = (module: TrainingModule) => { setSelected(module); setSelectedModules(disabledModules.includes(module.title) ? [] : [module.title]); setStatus(""); };
  const toggleModule = (title: string, checked: boolean) => setSelectedModules((current) => checked ? [...current, title] : current.filter((item) => item !== title));

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus(""); setSending(true); const form = event.currentTarget; const data = new FormData(form);
    try {
      const response = await fetch("/api/module-registrations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), month: data.get("month"), modules: data.getAll("modules"), expectations: data.get("expectations"), consentToContact: data.get("consentToContact"), website: data.get("website") }) });
      const result = await response.json().catch(() => ({})); if (!response.ok) throw new Error(result.error ?? "Unable to submit your registration.");
      form.reset(); setSelectedModules(selected && !disabledModules.includes(selected.title) ? [selected.title] : []);
      setStatus(result.duplicate ? "You are already registered for the selected module(s). No duplicate registration was created." : result.addedModules > 1 ? "Your registration has been updated with the new modules. Check your email for confirmation." : "Registration received. Check your email for confirmation.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "We could not submit your registration. Please check the fields and try again."); } finally { setSending(false); }
  }

  return <>
    <PageHero eyebrow="Month 2 · Azure compute, storage & container platforms" title="Build from Azure core services into AKS with confidence."><p>Start with Azure Storage and Compute, then move into container foundations, deployment, networking, and production-minded AKS operations.</p></PageHero>
    <section className="shell section"><p className="eyebrow">Topics</p><div className="card-grid">{monthTwoModules.map((module, index) => <button className="card module-card" key={module.title} onClick={() => openModule(module)}><p className="eyebrow">Module {index + 1}{disabledModules.includes(module.title) ? " · Completed" : ""}</p><h2>{module.title}</h2><span className="text-button">Click for more details</span></button>)}</div></section>
    <section className="shell section feature"><div><p className="eyebrow">Session details</p><h2>Resources, practical labs, schedules, and registration are available within each module.</h2><p>Select a topic above to review the material and register your interest.</p></div><Link className="button secondary" href="/training">View full roadmap</Link></section>
    {selected && <div className="modal-backdrop" onMouseDown={() => setSelected(null)}><section className="module-modal" role="dialog" aria-modal="true" aria-labelledby="module-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close module details" onClick={() => setSelected(null)}>×</button><p className="eyebrow">Month 2 module</p><h2 id="module-title">{selected.title}</h2><h3>Overview</h3><p>{selected.overview}</p><h3>Technicality</h3><p>{selected.technicality}</p><h3>Practical task</h3><p>{selected.task}</p><h3>Microsoft reading</h3><ul>{selected.links.map((link) => <li key={link.href}><a href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a></li>)}</ul><hr className="module-divider" />{isComplete ? <div className="module-completed"><h3>Module completed</h3><p>Registration for this module has closed.</p>{nextModule ? <button className="button primary" type="button" onClick={() => openModule(nextModule)}>Proceed to Module: {nextModule.title} →</button> : <p>There are no further open modules at the moment.</p>}</div> : <><h3>Register to attend</h3><form className="module-registration" onSubmit={register}><label>Name<input name="name" required minLength={2} maxLength={100} /></label><label>Email<input name="email" type="email" required maxLength={254} /></label><label>Month<input name="month" value="Month 2" readOnly /></label><fieldset className="module-picker"><legend>Modules</legend><details open><summary>{selectedModules.length ? `${selectedModules.length} module${selectedModules.length > 1 ? "s" : ""} selected` : "Choose modules"}</summary><div className="module-picker-options"><label><input type="checkbox" checked={selectedModules.length === enabledModules.length} onChange={(event) => setSelectedModules(event.target.checked ? enabledModules.map((module) => module.title) : [])} /> Select all open Month 2 modules</label>{enabledModules.map((module) => <label key={module.title}><input name="modules" type="checkbox" value={module.title} checked={selectedModules.includes(module.title)} onChange={(event) => toggleModule(module.title, event.target.checked)} />{module.title}</label>)}</div></details></fieldset><label>What do you expect from this training?<textarea name="expectations" required minLength={10} maxLength={1000} rows={4} /></label><p className="honeypot"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></p><label className="consent"><input type="checkbox" name="consentToContact" value="true" required /> I consent to receiving information about this class.</label><button className="button primary" disabled={sending || !selectedModules.length}>{sending ? "Submitting…" : "Register interest"}</button><p aria-live="polite">{status}</p></form></>}</section></div>}
  </>;
}
