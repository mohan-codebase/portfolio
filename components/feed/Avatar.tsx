type AvatarProps = { size?: 'sm' | 'md' | 'lg'; ring?: boolean };

const sizes = {
  sm: 'size-9 text-sm',
  md: 'size-16 text-2xl',
  lg: 'size-24 text-4xl',
};

/** Monogram avatar with an optional story-style ring. */
export default function Avatar({ size = 'sm', ring = false }: AvatarProps) {
  const face = (
    <span aria-hidden="true" className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-[#111111] font-extrabold tracking-[-0.08em] text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111]`}>
      M<span className="opacity-40">.</span>
    </span>
  );
  if (!ring) return face;
  return (
    <span aria-hidden="true" className="story-ring inline-flex shrink-0 rounded-full p-[2.5px]">
      <span className="rounded-full bg-[var(--background)] p-[3px]">{face}</span>
    </span>
  );
}
