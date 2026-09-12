/**
 * Editorial copy for each page and section. Headline arrays are rendered one
 * line per item; the closing full stop is added by the design (it is the
 * accent colour). Wrap a word in *asterisks* to set it in the italic serif.
 */

export const hero = {
  headline: ['I build', 'digital', 'experiences'],
  lede: 'Fullstack developer in Chennai, turning Figma designs into fast, responsive and carefully detailed websites.',
};

export const about = {
  statement: ['A fullstack', 'developer who', 'cares about', 'the *details*'],
  intro:
    "I'm Mohan — a fullstack developer from Chennai. I started in 2024 with plain HTML and CSS, rebuilding pages I admired until layouts made sense. Today I build with React, I'm learning Next.js, and I still obsess over the small things: the rhythm of a type scale, the easing of a transition, a focus ring you can actually see.",
  principles: [
    {
      title: 'Details are the design',
      body: 'Spacing, timing and states. The last ten percent is where an interface starts to feel considered.',
    },
    {
      title: 'Performance is a feature',
      body: 'CSS before JavaScript, lighter images, less code. Fast pages feel better on every device.',
    },
    {
      title: 'Accessible by default',
      body: 'Semantic HTML, keyboard support and reduced-motion handling are part of the build — not an afterthought.',
    },
  ],
  facts: [
    { label: 'Based in', value: 'Chennai, India' },
    { label: 'Focus', value: 'Fullstack & UI' },
    { label: 'Building since', value: '2024' },
    { label: 'Now', value: 'Learning Next.js' },
  ],
};

export const aboutPage = {
  headline: ['Hello —', "I'm *Mohan*"],
};

export const marquee = ['Fullstack', 'design', 'Development', 'interaction'];

export const work = {
  intro:
    'Real projects, from my first landing page to multi-page React builds. Each one taught me something the last one couldn’t.',
  more: 'Everything else — experiments, clones and works in progress — lives on GitHub.',
};

export const caseStudy = {
  overview: 'Overview',
  highlights: 'Highlights',
  screens: 'Screens',
  next: 'Next project',
};

export const toolkit = {
  intro: 'No skill bars, no percentages — just the tools I reach for every day, and what I use them for.',
};

export const contact = {
  kicker: 'Have an idea?',
  headline: ["Let's", 'make it', '*real*'],
  body: 'Got a project, a role or a question? My inbox is open.',
};

/** The fill-in-the-blanks brief on the contact page. It drafts an email; nothing is sent from the site. */
export const composer = {
  intro: 'Fill in the blanks and it drafts an email in your own mail app — nothing is sent until you press send.',
  /** `phrase` finishes the sentence "I'd like help with …". */
  services: [
    { label: 'Website', phrase: 'a website' },
    { label: 'Web app', phrase: 'a web app' },
    { label: 'Landing page', phrase: 'a landing page' },
    { label: 'Figma to website', phrase: 'turning a Figma design into a website' },
    { label: 'Something else', phrase: 'something else' },
  ],
  timelines: [
    { label: 'As soon as possible', phrase: 'as soon as possible' },
    { label: 'In a month or two', phrase: 'in a month or two' },
    { label: 'Just exploring', phrase: 'no fixed date yet — just exploring' },
  ],
};
