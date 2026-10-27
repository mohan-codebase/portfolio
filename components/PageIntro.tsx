interface PageIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  count?: string;
}

export default function PageIntro({ eyebrow, title, description, count }: PageIntroProps) {
  return (
    <header className="page-intro hero-reveal">
      {(eyebrow || count) && <div className="section-kicker flex items-center justify-between gap-4">
        <span>{eyebrow}</span><span>{count}</span>
      </div>}
      <h1 className="display-title">{title}<span className="accent-text">.</span></h1>
      {description && <div className="intro-bottom">
        <span className="text-xs uppercase tracking-[0.15em] opacity-60">Mohan / Independent developer</span>
        <p>{description}</p>
      </div>}
    </header>
  );
}
