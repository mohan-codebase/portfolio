import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#111111",
      }}
    >
      <svg width="112" height="112" viewBox="0 0 64 64">
        <path d="M17 45V19l15 18 15-18v26" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="square" />
      </svg>
    </div>,
    size,
  );
}
