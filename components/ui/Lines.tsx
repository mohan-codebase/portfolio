import type { CSSProperties, ReactNode } from 'react';

/**
 * Renders headline lines inside masks, for parents marked
 * `data-reveal="lines"` (the reveal itself lives in globals.css).
 * `indents` shifts individual lines by whole grid columns — the unit comes
 * from `--indent-unit`, so each breakpoint decides whether indents apply.
 * A trailing space keeps words separate for assistive tech, which reads the
 * lines as one sentence.
 */
export function Lines({ lines, indents }: { lines: ReactNode[]; indents?: number[] }) {
  return lines.map((line, index) => (
    <span
      key={index}
      className="line"
      style={{ '--i': index, '--indent': indents?.[index] ?? 0 } as CSSProperties}
    >
      <span>
        {line}{' '}
      </span>
    </span>
  ));
}
