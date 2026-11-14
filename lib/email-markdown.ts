function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function safeUrl(value: string) {
  const normalized = value.replace(/\\/g, "");
  return /^https?:\/\//i.test(normalized) ? normalized : "";
}

function inlineMarkdown(value: string) {
  let output = escapeHtml(value);
  const links: string[] = [];
  output = output.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label, href) => {
    const url = safeUrl(href);
    if (!url) return label;
    links.push(`<a href="${escapeHtml(url)}" style="color:#0284c7;text-decoration:underline;">${label}</a>`);
    return `@@EMAIL_LINK_${links.length - 1}@@`;
  });
  output = output.replace(/(https?:\/\/[^\s<]+)/g, (url) => `<a href="${url}" style="color:#0284c7;text-decoration:underline;">${url}</a>`);
  output = output.replace(/@@EMAIL_LINK_(\d+)@@/g, (_match, index) => links[Number(index)]);
  output = output.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  return output;
}

export function markdownToEmailHtml(message: string) {
  const normalized = message.replace(/\\([:\[\]()])/g, "$1");
  const lines = normalized.replace(/\r\n/g, "\n").replace(/\\\n/g, "\n").trim().split("\n");
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flushParagraph = () => { if (paragraph.length) { blocks.push(`<p style="margin:0 0 18px;line-height:1.65;color:#172033;">${inlineMarkdown(paragraph.join(" "))}</p>`); paragraph = []; } };
  const flushList = () => { if (list) { const tag = list.ordered ? "ol" : "ul"; blocks.push(`<${tag} style="margin:0 0 18px;padding-left:24px;color:#172033;line-height:1.65;">${list.items.map((item) => `<li style="margin:0 0 7px;">${inlineMarkdown(item)}</li>`).join("")}</${tag}>`); list = null; } };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushParagraph(); flushList(); continue; }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const ordered = /^\d+[.)]\s+(.+)$/.exec(line);
    const unordered = /^[-*]\s+(.+)$/.exec(line);
    if (heading) { flushParagraph(); flushList(); const level = heading[1].length === 1 ? "h1" : heading[1].length === 2 ? "h2" : "h3"; const size = level === "h1" ? "24px" : level === "h2" ? "20px" : "17px"; blocks.push(`<${level} style="margin:24px 0 10px;color:#0f172a;font-size:${size};line-height:1.25;">${inlineMarkdown(heading[2])}</${level}>`); continue; }
    if (ordered || unordered) { flushParagraph(); const next = ordered ? { ordered: true, item: ordered[1] } : { ordered: false, item: unordered![1] }; if (!list || list.ordered !== next.ordered) { flushList(); list = { ordered: next.ordered, items: [] }; } list.items.push(next.item); continue; }
    flushList(); paragraph.push(line);
  }
  flushParagraph(); flushList();
  return `<div style="margin:0;padding:28px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;"><div style="max-width:680px;margin:0 auto;padding:32px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">${blocks.join("")}</div></div>`;
}
