export type ArrowDirection = 'up-right' | 'right' | 'down-right' | 'down' | 'up' | 'left';

const rotation: Record<ArrowDirection, number> = {
  'up-right': -45,
  right: 0,
  'down-right': 45,
  down: 90,
  up: -90,
  left: 180,
};

/** A hairline arrow drawn to sit on the text baseline at 1em. */
export function Arrow({ direction = 'up-right', className }: { direction?: ArrowDirection; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" width="1em" height="1em" fill="none" aria-hidden="true">
      <g transform={`rotate(${rotation[direction]} 8 8)`}>
        <path d="M1.5 8h12.5M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
      </g>
    </svg>
  );
}
