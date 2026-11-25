"use client";

import { useEffect, useState } from "react";

import { Button } from "./button";
import { Check, Copy } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <Button variant="secondary" onClick={copy} iconStart={copied ? <Check /> : <Copy />}>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </Button>
  );
}
