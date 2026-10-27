import StructuredData from '@/components/StructuredData';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import PageIntro from '@/components/PageIntro';
import { services } from '@/data/services';

export const metadata = pageMetadata('Services', 'UI design, frontend development, website migration, and product consulting with Mohan.', '/services');

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 sm:px-8 sm:pt-40">
      <StructuredData title="Services" path="/services" />
      <PageIntro title="Services" />
      <div>
        {services.map((service) => (
          <section key={service.id} className="grid gap-6 border-t border-black/15 py-10 dark:border-white/15 sm:py-14 lg:grid-cols-[80px_1fr_1fr] lg:gap-10">
            <span className="section-kicker">/{service.id}</span>
            <h2 className="section-title text-3xl font-semibold sm:text-4xl">{service.title}</h2>
            <div>
              <p className="text-lg leading-relaxed text-black/65 dark:text-white/65">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${service.title} focus areas`}>
                {service.tags.map((tag) => <li key={tag} className="rounded-full border border-black/15 px-3 py-1.5 text-xs dark:border-white/15">{tag}</li>)}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <section className="mt-8 rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#161619] p-8 text-white sm:p-14">
        <p className="mb-5 text-xs uppercase tracking-[0.16em] text-white/60">Let’s find the right starting point</p>
        <h2 className="section-title max-w-2xl text-4xl font-semibold sm:text-6xl">What are you<br />working on?</h2>
        <p className="mb-8 mt-6 max-w-xl leading-relaxed text-white/75">Tell me about your idea, what you need, and where you’d like to take it. We can discuss the scope and next steps together.</p>
        <a href="mailto:mohanavenkatesh.work@gmail.com" className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-medium text-[#111111] hover:bg-[#faf7f3]">Start a conversation ↗</a>
        <Link href="/work" className="ml-6 inline-block py-4 text-sm underline underline-offset-4">View selected work</Link>
      </section>
    </div>
  );
}
