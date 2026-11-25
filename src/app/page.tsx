import { Motion } from "@/components/motion";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <About />
      <Work />
      <Skills />
      <Experience />
      <Contact />
      {/* Mounted inside the page so it runs after this segment has hydrated. */}
      <Motion />
    </main>
  );
}
