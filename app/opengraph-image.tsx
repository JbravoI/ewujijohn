import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", background: "#08111f", color: "#f4f8fc" }}><div style={{ color: "#fbbf24", fontSize: 26, letterSpacing: 5 }}>AZURE · DEVOPS · CLOUD INFRASTRUCTURE</div><div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>Ewuji John</div><div style={{ color: "#38bdf8", fontSize: 38, marginTop: 16 }}>Practical cloud engineering skills.</div></div>, size); }
