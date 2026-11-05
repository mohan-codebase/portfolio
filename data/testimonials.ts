export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  logo: string;
}

export const testimonials: Testimonial[] = [
  {
    "id": 1,
    "name": "Yakoub Kashmiri",
    "role": "Marketing Director",
    "quote": "Working with Mohan completely changed how we approach our web projects. The architecture is not just clean, it’s structured in a way that makes scaling so much easier.",
    "avatar": "https://framerusercontent.com/images/kAftuUN9iRKwIt9M6RqZo9NS314.jpg?width=3840&height=5275",
    "logo": "https://framerusercontent.com/images/MG7SSqT3AUbDDMeyGynYFWvAWI.png?width=160&height=160"
  },
  {
    "id": 2,
    "name": "Daniel K.",
    "role": "Indie Maker",
    "quote": "I’ve worked with dozens of developers, but Mohan stands out. Everything feels intentional, from web performance to the smallest micro-interactions.",
    "avatar": "https://framerusercontent.com/images/HqoHkPp6dpJFdgMqUKIaAXmy7o.jpg?width=3220&height=3220",
    "logo": "https://framerusercontent.com/images/yceQCLz3chOtgu2oZRjmfEKjY.png?width=160&height=160"
  },
  {
    "id": 3,
    "name": "Mark M.",
    "role": "Startup Founder",
    "quote": "Mohan saved us weeks of engineering work. We were able to launch our web platform ahead of schedule, and it looks and runs flawlessly.",
    "avatar": "https://framerusercontent.com/images/Y9KmJAQ4w53hsc4jJojfokLZ7D8.jpg?width=2662&height=3993",
    "logo": "https://framerusercontent.com/images/gN85dqTeMmVvE57UMiHhgeL4P4.png?width=196&height=160"
  },
  {
    "id": 4,
    "name": "Omar H.",
    "role": "Frontend Developer",
    "quote": "The engineering quality Mohan delivers is incredible. Clean structure, smooth animations, and super easy to maintain.",
    "avatar": "https://framerusercontent.com/images/HH8KrojyxZx6X20z1r13CSwiiWE.jpg?width=3648&height=3648",
    "logo": "https://framerusercontent.com/images/WsYTUG4cqmLIU4lwbMUQX7FdOY.png?width=160&height=160"
  }
];
