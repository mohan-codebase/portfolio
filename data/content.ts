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

export const privacy = {
  hero: {
    lede: 'A clear, honest account of how this website handles data, cookies, infrastructure logs, and your rights.',
  },
  summary: {
    intro:
      'This website is an independent portfolio designed to showcase engineering work and interface craft. It is built for visitors, not ad-targeting algorithms.',
    points: [
      {
        number: '01',
        label: 'Zero tracking cookies',
        detail: 'No analytics beacons, tracking pixels, or cross-site fingerprinting scripts.',
      },
      {
        number: '02',
        label: 'No accounts required',
        detail: 'Everything is publicly viewable without signing in, registering, or sharing personal data.',
      },
      {
        number: '03',
        label: 'Client-side brief',
        detail: 'The project brief composer drafts an email in your mail app. No form data is stored on a server.',
      },
      {
        number: '04',
        label: 'Zero data sales',
        detail: 'Your contact info and communications will never be sold, rented, or commercialized.',
      },
    ],
  },
  sections: [
    {
      id: 'collection',
      number: '01',
      title: 'Information collection',
      summary: 'What data is gathered and why',
      paragraphs: [
        'When you browse this site, no personally identifiable information is requested or collected. You are free to view all case studies, project details, and source links without identifying yourself.',
        'If you initiate contact via email or use the fill-in-the-blanks project brief on the Contact page, any details you share (such as your name, email address, timeline, and project scope) are provided voluntarily by you. This data is used solely to reply to your inquiry, discuss prospective work, or answer questions.',
      ],
    },
    {
      id: 'cookies',
      number: '02',
      title: 'Cookies and local storage',
      summary: 'How device storage is used',
      paragraphs: [
        'This website does not set tracking cookies, behavioral profiling cookies, or third-party marketing tags.',
        'Strictly functional client-side storage (sessionStorage) is used to store temporary display states — specifically, remembering whether you have already seen the opening preloader animation during your current browser session, and honoring your system reduced-motion preference. These values remain solely within your local browser and are never sent to any server.',
      ],
    },
    {
      id: 'infrastructure',
      number: '03',
      title: 'Hosting and server logs',
      summary: 'Standard delivery records',
      paragraphs: [
        'This site is hosted and served through Vercel’s global Edge Network. When your browser requests a page or asset, standard web server access logs are generated.',
        'These technical records may include your IP address, browser user-agent, requested URL, HTTP status code, and timestamp. These logs are maintained by the hosting infrastructure solely for technical diagnostics, server health monitoring, and defense against malicious traffic or DDoS attacks.',
      ],
    },
    {
      id: 'external-links',
      number: '04',
      title: 'External platforms and services',
      summary: 'Third-party sites and profiles',
      paragraphs: [
        'This portfolio includes links to external third-party services, such as GitHub repositories and social platforms. Once you click a link to an external site, their independent terms of service and privacy policies govern your interactions.',
        'I do not control and cannot accept responsibility for the privacy practices or content of third-party websites.',
      ],
    },
    {
      id: 'rights',
      number: '05',
      title: 'Your rights and choices',
      summary: 'Access, correction, and deletion',
      paragraphs: [
        'Depending on your location and applicable privacy regulations (including GDPR, UK GDPR, and the Digital Personal Data Protection Act), you have rights regarding your personal information. These include the right to request confirmation of what communications are held, to request a copy, or to ask that past correspondence be deleted.',
        'To exercise any of these rights, or if you have any questions regarding this Privacy Policy, please send an email directly to the contact address below.',
      ],
    },
  ],
  effectiveDate: 'September 2026',
};

