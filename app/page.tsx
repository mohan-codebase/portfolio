import Hero from '@/components/Hero';
import BioSection from '@/components/BioSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import TestimonialsSection from '@/components/TestimonialsSection';
import ThoughtsSection from '@/components/ThoughtsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <BioSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <ThoughtsSection />
      <ContactSection />
    </>
  );
}
