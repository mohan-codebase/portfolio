export interface Service {
  id: string;
  title: string;
  tags: string[];
  description: string;
}

export const services: Service[] = [
  {
    "id": "01",
    "title": "Website Migration",
    "tags": [
      "Web Migration",
      "Optimization",
      "Framer Rebuild"
    ],
    "description": "Seamlessly transition your existing website into a modern, responsive architecture optimized for speed, clarity, and higher conversion."
  },
  {
    "id": "02",
    "title": "Frontend Development",
    "tags": [
      "UI Dev",
      "Responsive Layouts",
      "Web Performance"
    ],
    "description": "Writing clean, accessible, and lightning-fast frontend code that brings static design files to life across all devices and browsers."
  },
  {
    "id": "03",
    "title": "Fullstack Development",
    "tags": [
      "Next.js",
      "API Development",
      "Database Integration"
    ],
    "description": "Building complete web applications with responsive interfaces, backend APIs, authentication, and connected databases—from your first idea to deployment."
  },
  {
    "id": "04",
    "title": "Product Consulting",
    "tags": [
      "Product Direction",
      "Web Strategy",
      "Technical Guidance"
    ],
    "description": "Advising founders and teams on UX structure, digital brand positioning, and technical decisions to help launch and scale with confidence."
  }
];
