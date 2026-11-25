import { ImageResponse } from "next/og";

/** 32 for favicon.ico; 192 and 512 for "Add to Home Screen" (listed in manifest.ts). */
const SIZES = ["32", "192", "512"] as const;

export function generateStaticParams() {
  return SIZES.map((size) => ({ size }));
}

/** The round site mark as a PNG at /icons/32, /icons/192 and /icons/512. */
export async function GET(_request: Request, { params }: RouteContext<"/icons/[size]">) {
  const { size } = await params;
  const px = SIZES.includes(size as (typeof SIZES)[number]) ? Number(size) : 192;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#111111",
      }}
    >
      <svg width={px} height={px} viewBox="0 0 64 64">
        <path
          d="M20 42V22l12 14 12-14v20"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    { width: px, height: px },
  );
}
