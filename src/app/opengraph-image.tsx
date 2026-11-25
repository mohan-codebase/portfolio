import { ImageResponse } from "next/og";

import { hero, profile } from "@/content/site";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const ink = "#111111";
  const muted = "#6b6b6f";
  const line = "rgba(17,17,17,0.12)";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#ffffff",
        color: ink,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 0, color: muted }}>
        <span style={{ color: ink, fontWeight: 600, letterSpacing: 0, fontSize: 28 }}>{profile.name}</span>
        <span>{profile.location}</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 104,
          fontWeight: 600,
          lineHeight: 0.95,
          letterSpacing: -5,
        }}
      >
        <span>{hero.headline[0]}</span>
        <span style={{ color: muted }}>{hero.headline[1]}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: `1px solid ${line}`,
          paddingTop: 24,
          fontSize: 22,
          letterSpacing: 0,
          color: muted,
        }}
      >
        <span>Portfolio</span>
        <span>Frontend · Backend · Databases</span>
      </div>
    </div>,
    size,
  );
}
