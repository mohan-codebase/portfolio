'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import RollingText from './RollingText';

export default function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', project: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-28 px-5 sm:px-8 max-w-[1400px] mx-auto border-t border-black/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Title & Subtitle */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#111111]/50 block">
            /Get In Touch
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#111111]">
            Let’s talk.
          </h2>
          <p className="text-base sm:text-lg text-[#111111]/70 leading-relaxed font-normal pt-2">
            Have a project or need help? Fill out the form, and I&apos;ll get back to you soon.
          </p>

          <div className="pt-6 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#111111]/40">
              Direct Contact
            </p>
            <a
              href="mailto:mohanavenkatesh.work@gmail.com"
              className="text-lg font-medium text-[#111111] hover:underline underline-offset-4 inline-flex items-center gap-1.5 break-all"
            >
              mohanavenkatesh.work@gmail.com
              <ArrowUpRight className="w-4 h-4 opacity-60 shrink-0" />
            </a>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-white/70 border border-black/10 flex flex-col items-center justify-center text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
              <h3 className="text-2xl font-bold text-[#111111]">
                Thank you! Message sent.
              </h3>
              <p className="text-sm text-[#111111]/70 max-w-sm">
                I received your message and will reply as soon as possible.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: '', email: '', project: '' });
                }}
                className="mt-4 px-5 py-2 text-xs font-semibold rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 sm:p-12 rounded-3xl bg-white/50 backdrop-blur-sm border border-black/10 space-y-6 shadow-sm"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111111]/60 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your full name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/80 border border-black/10 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-2 focus:ring-[#111111]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111111]/60 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="hello@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/80 border border-black/10 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-2 focus:ring-[#111111]/20 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#111111]/60 mb-2"
                >
                  Your Project
                </label>
                <textarea
                  id="project"
                  required
                  rows={4}
                  placeholder="Tell us about your project, timeline, and budget..."
                  value={formState.project}
                  onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white/80 border border-black/10 text-sm text-[#111111] placeholder:text-[#111111]/30 focus:outline-none focus:ring-2 focus:ring-[#111111]/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#111111] text-[#faf7f3] text-sm font-medium hover:bg-black/85 disabled:opacity-50 transition-all shadow-md group"
              >
                <RollingText text={loading ? 'Sending...' : 'Submit'} />
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#faf7f3]" />
                </div>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
