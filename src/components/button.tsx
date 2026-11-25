import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/ui";

import { ArrowUpRight } from "./icons";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type ButtonStyle = {
  /**
   * `primary` is the one main action in a group; `secondary` is everything else.
   * `ghost` tints itself from the text colour, for use on inverted panels.
   */
  variant?: Variant;
  size?: Size;
  className?: string;
};

/**
 * Pill buttons. Both sizes keep a comfortable tap target (44px / 36px tall),
 * press down slightly when clicked and show a clear focus ring.
 */
export function buttonClasses({ variant = "primary", size = "md", className }: ButtonStyle = {}) {
  return cn(
    "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none",
    "transition-[background-color,color,scale] duration-300 ease-out-expo active:scale-[0.97]",
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-fg",
    size === "md" ? "h-11 px-5 text-[0.9375rem] tracking-[-0.01em]" : "h-9 px-4 text-sm",
    variant === "primary" && "bg-fg text-bg",
    variant === "secondary" && "bg-surface text-fg hover:bg-surface-strong",
    variant === "ghost" && "bg-current/10 hover:bg-current/[0.16]",
    className,
  );
}

/**
 * Button text that rolls up to a fresh copy on hover. `card` makes it follow the
 * hover state of an enclosing `.group` (for a whole clickable card) instead.
 */
export function ButtonLabel({ children, card }: { children: ReactNode; card?: boolean }) {
  return (
    <span className="relative block overflow-hidden leading-6">
      <span
        className={cn(
          "block transition-transform duration-500 ease-out-expo",
          card ? "group-hover:-translate-y-full" : "group-hover/button:-translate-y-full",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo",
          card ? "group-hover:translate-y-0" : "group-hover/button:translate-y-0",
        )}
      >
        {children}
      </span>
    </span>
  );
}

type Content = {
  children: ReactNode;
  /** Icon after the label. */
  icon?: ReactNode;
  /** Icon before the label (for "back" actions). */
  iconStart?: ReactNode;
};

function Inner({ children, icon, iconStart }: Content) {
  return (
    <>
      {iconStart}
      <ButtonLabel>{children}</ButtonLabel>
      {icon}
    </>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  icon,
  iconStart,
  type = "button",
  ...props
}: ButtonStyle & Content & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...props}>
      <Inner icon={icon} iconStart={iconStart}>
        {children}
      </Inner>
    </button>
  );
}

const externalIcon = (
  <ArrowUpRight className="transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
);

/**
 * A link that looks like a button.
 * - `/path` routes use Next.js client navigation.
 * - `#hash` links stay plain anchors so smooth scrolling can handle them.
 * - `external` opens in a new tab and adds the ↗ icon.
 */
export function ButtonLink({
  href,
  external,
  variant,
  size,
  className,
  children,
  icon,
  iconStart,
  ...props
}: ButtonStyle &
  Content & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "children" | "className" | "href">) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        <Inner icon={icon ?? externalIcon} iconStart={iconStart}>
          {children}
        </Inner>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  const inner = (
    <Inner icon={icon} iconStart={iconStart}>
      {children}
    </Inner>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {inner}
    </a>
  );
}
