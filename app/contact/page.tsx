import ContactSection from '@/components/ContactSection';
import PageIntro from '@/components/PageIntro';
import StructuredData from '@/components/StructuredData';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Contact', 'Get in touch with Mohan to discuss UI design, websites, and full-stack web applications.', '/contact');

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-5 pt-28 sm:px-8 sm:pt-40">
        <StructuredData title="Contact" path="/contact" />
        <PageIntro eyebrow="Let’s work together" title="Contact" count="Chennai, India" description="Have a project in mind? Tell me about your idea, what you need, and where you’d like to take it." />
      </div>
      <ContactSection />
    </>
  );
}
