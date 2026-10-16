'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { testimonials } from '@/data/testimonials';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="testimonials-title" className={`py-10 sm:py-14 px-5 sm:px-8 text-[#111111] dark:text-[#f4f4f6] my-12 max-w-[1400px] mx-auto ${styles.section}`}>
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <h2 id="testimonials-title" className="section-title text-2xl sm:text-3xl font-bold tracking-tight">Testimonials</h2>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? 'Play testimonials' : 'Pause testimonials'}
          className={`flex size-11 items-center justify-center rounded-full border border-black/15 hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10 ${styles.control}`}
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
        </button>
      </div>
      <div className={styles.viewport}>
        <div className={styles.track} data-paused={paused}>
          {[0, 1].map((copy) => (
            <div key={copy} className={styles.group} aria-hidden={copy === 1 ? true : undefined}>
              {testimonials.map((testimonial) => (
                <figure key={testimonial.id} className="min-w-0 flex flex-col justify-between rounded-3xl border border-black/10 p-5 sm:p-6 dark:border-white/10">
                  <blockquote className="mb-6 text-sm leading-relaxed text-black/80 dark:text-white/80 sm:text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <figcaption>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-black/55 dark:text-white/55">{testimonial.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
