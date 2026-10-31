"use client";

import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Item = { id: string; name?: string; email?: string; subject?: string; message?: string; modules?: string[]; month?: string; expectations?: string; createdAt?: string; status?: string };
const unique = (values: (string | undefined)[]) => [...new Set(values.filter((value): value is string => Boolean(value)))];

function SectionToggle({ expanded, onClick }: { expanded: boolean; onClick: () => void }) {
  return <button className="section-toggle" type="button" onClick={onClick} aria-expanded={expanded}>
    {expanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}<span>{expanded ? "Collapse" : "Expand"}</span>
  </button>;
}

function Collection({ title, items }: { title: string; items: Item[] }) {
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState(""); const [sort, setSort] = useState("newest"); const [status, setStatus] = useState(""); const [month, setMonth] = useState(""); const [module, setModule] = useState(""); const [selected, setSelected] = useState<Item | null>(null);
  const statuses = unique(items.map((item) => item.status)); const months = unique(items.map((item) => item.month)); const modules = unique(items.flatMap((item) => item.modules ?? []));
  const filtered = useMemo(() => items.filter((item) => JSON.stringify(item).toLowerCase().includes(query.toLowerCase())).filter((item) => !status || item.status === status).filter((item) => !month || item.month === month).filter((item) => !module || item.modules?.includes(module)).sort((a, b) => sort === "newest" ? new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime() : new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime()), [items, query, status, month, module, sort]);
  const clear = () => { setQuery(""); setSort("newest"); setStatus(""); setMonth(""); setModule(""); };
  return <section className="admin-section">
    <div className="admin-section-header"><h2>{title} ({filtered.length})</h2><SectionToggle expanded={expanded} onClick={() => setExpanded((value) => !value)} /></div>
    {expanded && <>
      <div className="admin-filters">
        <label>Sort<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
        <label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Month<select value={month} onChange={(event) => setMonth(event.target.value)} disabled={!months.length}><option value="">All months</option>{months.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Module<select value={module} onChange={(event) => setModule(event.target.value)} disabled={!modules.length}><option value="">All modules</option>{modules.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label>Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, keyword" /></label><button className="clear-filters" type="button" onClick={clear}>Clear filters</button>
      </div>
      <div className="admin-list">{filtered.map((item) => <button className="card admin-card" type="button" onClick={() => setSelected(item)} key={item.id}><strong>{item.name ?? "Unknown"}</strong><p>{item.email}</p><p>{item.month}{item.modules?.length ? ` · ${item.modules.join(", ")}` : ""}</p><small>{item.createdAt}</small></button>)}</div>
      {selected && <div className="modal-backdrop" onMouseDown={() => setSelected(null)}><section className="module-modal" role="dialog" aria-modal="true" aria-label={`${title} details`} onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close details">×</button><h2>{selected.name}</h2><p><b>Email:</b> {selected.email}</p>{selected.month && <p><b>Month:</b> {selected.month}</p>}{selected.modules && <p><b>Modules:</b> {selected.modules.join(", ")}</p>}{selected.subject && <p><b>Subject:</b> {selected.subject}</p>}<p><b>Message / expectations:</b></p><p>{selected.message ?? selected.expectations ?? "—"}</p><p><b>Received:</b> {selected.createdAt}</p></section></div>}
    </>}
  </section>;
}

export function AdminDashboard({ messages, registrations, moduleRegistrations }: { messages: Item[]; registrations: Item[]; moduleRegistrations: Item[] }) {
  const [actionsExpanded, setActionsExpanded] = useState(true); const months = unique(moduleRegistrations.map((item) => item.month)); const [month, setMonth] = useState(""); const modules = unique(moduleRegistrations.filter((item) => !month || item.month === month).flatMap((item) => item.modules ?? [])); const [chosen, setChosen] = useState<string[]>([]); const [subject, setSubject] = useState(""); const [message, setMessage] = useState(""); const [notice, setNotice] = useState("");
  const broadcastDisabled = (!month && !chosen.length) || !subject.trim() || !message.trim();
  const broadcastHint = !month && !chosen.length ? "Choose a month or at least one module before sending." : !subject.trim() ? "Add an email subject before sending." : !message.trim() ? "Write a message before sending." : "Ready to send.";
  async function exportReport() { const response = await fetch("/api/admin/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ month: month || undefined, modules: chosen }) }); const data = await response.json(); setNotice(response.ok ? `Report with ${data.records} registration(s) sent to your Gmail inbox.` : data.error ?? "Unable to send report."); }
  async function send() { const response = await fetch("/api/admin/broadcast", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ month: month || undefined, modules: chosen, subject, message }) }); const data = await response.json(); setNotice(response.ok ? `Message sent to ${data.recipients} unique recipients.` : data.error ?? "Unable to send message."); }
  return <>
    <section className="admin-actions card"><div className="admin-section-header"><h2>Reports and module updates</h2><SectionToggle expanded={actionsExpanded} onClick={() => setActionsExpanded((value) => !value)} /></div>{actionsExpanded && <>
      <div className="admin-filters"><label>Month<select value={month} onChange={(event) => { setMonth(event.target.value); setChosen([]); }}><option value="">All months</option>{months.map((value) => <option key={value}>{value}</option>)}</select></label><button className="clear-filters" type="button" onClick={() => { setMonth(""); setChosen([]); }}>Clear targeting</button></div><h3>Target modules</h3><div className="module-picker-options">{modules.map((module) => <label key={module}><input type="checkbox" checked={chosen.includes(module)} onChange={(event) => setChosen(event.target.checked ? [...chosen, module] : chosen.filter((value) => value !== module))} />{module}</label>)}</div><button className="button secondary" type="button" disabled={!month && !chosen.length} onClick={exportReport}>Email filtered CSV report</button><h3>Send a module update</h3><input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Email subject" /><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message to selected learners" /><button className="button primary" type="button" disabled={broadcastDisabled} onClick={send}>Send to unique recipients</button><p className={broadcastDisabled ? "admin-action-hint" : "admin-action-hint ready"} aria-live="polite">{broadcastHint}</p><p aria-live="polite">{notice}</p>
    </>}</section>
    <Collection title="Module registrations" items={moduleRegistrations} /><Collection title="Training registrations" items={registrations} /><Collection title="Contact messages" items={messages} />
  </>;
}
