import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "square",
  "aria-hidden": true,
  focusable: false,
} as const;

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5v11M3.5 9L8 13.5 12.5 9" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 13.5v-11M3.5 7L8 2.5 12.5 7" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11M9 3.5L13.5 8 9 12.5" />
    </svg>
  );
}

export function Copy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 5.5h8v8h-8z" />
      <path d="M10.5 3V2.5h-8v8H3" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 8h-11M7 3.5L2.5 8 7 12.5" />
    </svg>
  );
}
