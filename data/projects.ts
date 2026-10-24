export interface Project {
  slug: string;
  title: string;
  category: string;
  badge: string;
  year: string;
  image: string;
  description: string;
  liveUrl: string;
  repositoryUrl: string;
  hasDemo: boolean;
  overview: string;
  gallery: string[];
  features: { title: string; description: string }[];
}

// Public GitHub metadata and README snapshot, retrieved 2026-10-16.
// Source: https://github.com/mohan-codebase?tab=repositories
export const projects: Project[] = [
  {
    "slug": "ula",
    "title": "Ula",
    "category": "Tamil Nadu travel discovery platform",
    "badge": "Featured project",
    "year": "2026",
    "image": "/projects/ula.svg",
    "description": "An independent editorial travel discovery platform exploring Tamil Nadu’s heritage, hill stations, and coastal journeys with interactive itinerary planning.",
    "liveUrl": "https://elsewhere-jet.vercel.app/",
    "repositoryUrl": "https://github.com/mohan-codebase/Otium",
    "hasDemo": true,
    "overview": "Ula is an independent travel discovery platform celebrating the heritage, hill stations, and coastal landscapes of Tamil Nadu. It combines thoughtful editorial guides with interactive itinerary building, allowing travelers to create and download custom travel briefs directly in the browser.",
    "gallery": [
      "/projects/ula.png"
    ],
    "features": [
      {
        "title": "Frontend architecture",
        "description": "Next.js App Router, React 19, TypeScript, Tailwind CSS, GSAP, and Lenis"
      },
      {
        "title": "Interactive trip planner",
        "description": "Browser-based itinerary planner with customizable routes, pace preferences, and downloadable trip briefs"
      },
      {
        "title": "Curated destinations",
        "description": "Exploration guides covering Madurai, Ooty, Mamallapuram, Kanyakumari, Rameswaram, and Thanjavur"
      },
      {
        "title": "Design system",
        "description": "Editorial typography pairing, responsive layouts, accessible contrast, and smooth transitions"
      }
    ]
  },
  {
    "slug": "attendance-app",
    "title": "Attendance App",
    "category": "Collaborative web application",
    "badge": "Public repository",
    "year": "2025",
    "image": "/projects/attendance-app.svg",
    "description": "A collaborative attendance-tracking application built by students of Schools of Techies, bringing together designers, content creators, and developers.",
    "liveUrl": "https://attendance-app-black-omega.vercel.app",
    "repositoryUrl": "https://github.com/mohan-codebase/attendance-app",
    "hasDemo": true,
    "overview": "A collaborative attendance-tracking application built by students of Schools of Techies, bringing together designers, content creators, and developers.",
    "gallery": [],
    "features": [
      {
        "title": "Primary language",
        "description": "JavaScript"
      },
      {
        "title": "Project context",
        "description": "Collaborative web application"
      }
    ]
  },
  {
    "slug": "bite-paste",
    "title": "Bite Paste",
    "category": "Bootstrap multipage website",
    "badge": "Public repository",
    "year": "2024",
    "image": "/projects/bite-paste.svg",
    "description": "A responsive multipage website built with Bootstrap, structured layouts, and reusable interface components.",
    "liveUrl": "https://bitepaste.netlify.app/",
    "repositoryUrl": "https://github.com/mohan-codebase/bite-paste",
    "hasDemo": true,
    "overview": "A responsive multipage website built with Bootstrap, structured layouts, and reusable interface components.",
    "gallery": [],
    "features": [
      {
        "title": "Primary language",
        "description": "HTML"
      },
      {
        "title": "Project context",
        "description": "Bootstrap multipage website"
      }
    ]
  },
  {
    "slug": "spotify-clone",
    "title": "Spotify Clone",
    "category": "HTML & CSS interface study",
    "badge": "Public repository",
    "year": "2024",
    "image": "/projects/spotify-clone.svg",
    "description": "A Spotify homepage interface study built with HTML and CSS, focused on layout and responsive styling.",
    "liveUrl": "https://spotify-project-clone.netlify.app/",
    "repositoryUrl": "https://github.com/mohan-codebase/spotify-clone",
    "hasDemo": true,
    "overview": "A Spotify homepage interface study built with HTML and CSS, focused on layout and responsive styling.",
    "gallery": [],
    "features": [
      {
        "title": "Primary language",
        "description": "HTML"
      },
      {
        "title": "Project context",
        "description": "HTML & CSS interface study"
      }
    ]
  },
  {
    "slug": "medical-treatment",
    "title": "Medical Treatment",
    "category": "CSS landing page",
    "badge": "Public repository",
    "year": "2024",
    "image": "/projects/medical-treatment.svg",
    "description": "A single-page medical landing page focused on CSS layouts, typography, and clear section structure.",
    "liveUrl": "https://medical-treatment.netlify.app/",
    "repositoryUrl": "https://github.com/mohan-codebase/medical-treatment",
    "hasDemo": true,
    "overview": "A single-page medical landing page focused on CSS layouts, typography, and clear section structure.",
    "gallery": [],
    "features": [
      {
        "title": "Primary language",
        "description": "CSS"
      },
      {
        "title": "Project context",
        "description": "CSS landing page"
      }
    ]
  },
  {
    "slug": "botanical-store",
    "title": "Botanical Store",
    "category": "HTML storefront interface",
    "badge": "Public repository",
    "year": "2024",
    "image": "/projects/botanical-store.svg",
    "description": "A plant-store interface built with HTML, featuring product sections, a hero layout, and responsive content organization.",
    "liveUrl": "https://plant-shop-website1.netlify.app/",
    "repositoryUrl": "https://github.com/mohan-codebase/botanical-store",
    "hasDemo": true,
    "overview": "A plant-store interface built with HTML, featuring product sections, a hero layout, and responsive content organization.",
    "gallery": [],
    "features": [
      {
        "title": "Primary language",
        "description": "HTML"
      },
      {
        "title": "Project context",
        "description": "HTML storefront interface"
      }
    ]
  }
];
