import { pageMetadata, siteTitle, siteDescription } from '@/lib/metadata';
import Hero from '@/components/Hero';
import BioSection from '@/components/BioSection';
import ServicesSection from '@/components/ServicesSection';
import FeaturedProjects from '@/components/FeaturedProjects';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

export const metadata = pageMetadata(siteTitle, siteDescription, '/');

export default function Home() {
  return (
    <>
      <Hero />
      <BioSection />
      <ServicesSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
