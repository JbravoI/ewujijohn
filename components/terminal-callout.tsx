export function TerminalCallout({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="terminal-callout" aria-label={title}><div className="terminal-titlebar"><span className="terminal-dots" aria-hidden="true"><i/><i/><i/></span><span>{title}</span></div><pre>{children}</pre></section>;
}
