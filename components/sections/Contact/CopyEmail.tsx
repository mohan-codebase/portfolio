'use client';

import { useEffect, useRef, useState } from 'react';

/** Copies the address to the clipboard, falling back to opening the mail client. */
export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={className} onClick={copy} data-copied={copied} aria-live="polite">
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}
