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
    "description": "Move your site to a faster, modern stack."
  },
  {
    "id": "02",
    "title": "Frontend Development",
    "tags": [
      "UI Dev",
      "Responsive Layouts",
      "Web Performance"
    ],
    "description": "Designs turned into fast, accessible code."
  },
  {
    "id": "03",
    "title": "Fullstack Development",
    "tags": [
      "Next.js",
      "API Development",
      "Database Integration"
    ],
    "description": "Complete web apps, from idea to launch."
  },
  {
    "id": "04",
    "title": "Product Consulting",
    "tags": [
      "Product Direction",
      "Web Strategy",
      "Technical Guidance"
    ],
    "description": "Clear advice on UX and technical choices."
  }
];
