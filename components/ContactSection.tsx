'use client';

import { useState, useRef, type FormEvent } from 'react';
import { createWhatsAppDraft, validateContact, type ContactErrors } from '@/lib/contact-validation';
import { ArrowUpRight, Copy, Check, Mail } from 'lucide-react';

const email = 'mohanavenkatesh.work@gmail.com';
const interests = ['UI design', 'Website', 'Web application', 'Something else'];
const messageTemplates: Record<string, { label: string; text: string }[]> = {
  'UI design': [
    { label: 'Design a new interface', text: `I’m planning a new app or website and would like help with the UI design.

The idea: [describe your product]
Who it’s for: [your audience]
Timeline: [your preferred timeline]` },
    { label: 'Improve an existing design', text: `I’d like to improve the interface of my existing website or app.

Current website or screenshots: [add a link]
What needs improvement: [share the main issues]
Timeline: [your preferred timeline]` },
  ],
  Website: [
    { label: 'Build a business website', text: `I’m looking for a website for my business.

Business and audience: [tell me a little about them]
Pages needed: [for example, Home, About, Services, Contact]
References I like: [optional links]
Timeline: [your preferred timeline]` },
    { label: 'Refresh my website', text: `I’d like to refresh my current website.

Website: [add your link]
Main goals: [design, mobile experience, speed, or new features]
Timeline: [your preferred timeline]` },
  ],
  'Web application': [
    { label: 'Build an MVP', text: `I have an idea for a web application and would like to discuss an MVP.

Problem it solves: [describe the problem]
Who will use it: [your users]
Essential features: [list your priorities]
Timeline: [your preferred timeline]` },
    { label: 'Add a feature', text: `I need help adding a feature to an existing application.

Application and current stack: [link and technologies, if known]
Feature needed: [describe the change]
Timeline: [your preferred timeline]` },
  ],
  'Something else': [
    { label: 'Discuss a collaboration', text: `I’d love to explore a collaboration.

A little about me: [introduce yourself]
What I have in mind: [describe the opportunity]
Next step: [suggest how we can connect]` },
    { label: 'Ask a question', text: `Hi Mohan, I have a question about your work.

[Write your question here]` },
  ],
};

const fieldStyle = 'w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-4 text-base placeholder:text-black/40 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/40';

export default function ContactSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [draftUrl, setDraftUrl] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [interest, setInterest] = useState('UI design');
  const [message, setMessage] = useState('');
  const [pendingTemplate, setPendingTemplate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = { name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), project: message, interest };
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice('Please check the highlighted fields.');
      const first = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDraftUrl(createWhatsAppDraft(fields));
    dialogRef.current?.showModal();
    setNotice('');
  }

  function applyTemplate(text: string) {
    if (message.trim()) {
      setPendingTemplate(text);
      return;
    }
    setMessage(text);
    setNotice('Template added. Replace the bracketed prompts with your details.');
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setNotice('Email address copied.');
    } catch {
      setNotice('Could not copy. You can select the email address or click it to open your email app.');
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1400px] border-t border-black/10 px-5 py-20 dark:border-white/10 sm:px-8 sm:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="text-5xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-7xl">Good things<br />start with<br /><span className="text-black/45 dark:text-white/45">a hello.</span></h2>
          <p className="mt-7 max-w-sm text-base leading-relaxed text-black/65 dark:text-white/65 sm:text-lg">A fresh interface, a website, or an idea you’re still figuring out. Tell me what you have in mind — let’s find the next step.</p>
          <div className="mt-10 border-t border-black/10 pt-6 dark:border-white/10 sm:mt-14">
            <p className="mb-3 text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Prefer a direct hello?</p>
            <a href={`mailto:${email}`} className="inline-flex max-w-full items-center gap-2 text-sm font-medium underline-offset-4 hover:underline sm:text-base"><span className="break-all">{email}</span><ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0" /></a>
            <button type="button" onClick={copyEmail} className="mt-4 flex min-h-11 items-center gap-2 rounded-full border border-black/15 px-4 text-xs dark:border-white/15">
              {copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}{copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
        </div>
        <form noValidate onSubmit={handleSubmit} onReset={() => {
          setErrors({});
          setInterest('UI design');
          setMessage('');
          setPendingTemplate(null);
          setCopied(false);
          setNotice('Form cleared.');
        }} className="space-y-7 rounded-3xl border border-black/10 bg-white/50 p-6 dark:border-white/10 dark:bg-white/[0.03] sm:p-10 lg:col-span-7">
          <div className="flex items-start justify-between gap-4">
            <div><h3 className="text-2xl font-semibold tracking-tight">Tell me about your idea.</h3><p className="mt-2 text-sm text-black/55 dark:text-white/55">A few details are all we need to get started.</p></div>
            <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 opacity-50" />
          </div>
          <fieldset>
            <legend className="mb-3 text-xs font-medium uppercase tracking-wider">I’m interested in</legend>
            <div className="flex flex-wrap gap-2">
              {interests.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => { setInterest(option); setPendingTemplate(null); }} className="peer sr-only" />
                  <span className="block rounded-full border border-black/15 px-4 py-2.5 text-sm transition-colors peer-checked:bg-[#111111] peer-checked:text-[#faf7f3] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 dark:border-white/15 dark:peer-checked:bg-[#f4f4f6] dark:peer-checked:text-[#111111]">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="rounded-2xl border border-black/10 p-4 dark:border-white/10">
            <p className="text-sm font-medium">Not sure where to start?</p>
            <p className="mb-3 mt-1 text-xs text-black/55 dark:text-white/55">Choose a message starter, then make it yours.</p>
            <div className="flex flex-wrap gap-2">
              {messageTemplates[interest].map((template) => <button key={template.label} type="button" onClick={() => applyTemplate(template.text)} className="rounded-full border border-black/15 px-3 py-2.5 text-xs hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10">{template.label} ↗</button>)}
            </div>
            {pendingTemplate && <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
              <p className="text-sm">You already have a message. Replace it with this template?</p>
              <div className="mt-3 flex gap-3">
                <button type="button" onClick={() => { setMessage(pendingTemplate); setPendingTemplate(null); setNotice('Template added. Replace the bracketed prompts with your details.'); }} className="rounded-full border border-current px-3 py-2 text-xs">Replace message</button>
                <button type="button" onClick={() => setPendingTemplate(null)} className="rounded-full px-3 py-2 text-xs underline underline-offset-4">Keep my message</button>
              </div>
            </div>}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div><label htmlFor="contact-name" className="mb-2 block text-xs font-medium uppercase tracking-wider">Your name</label><input id="contact-name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} name="name" autoComplete="name" required maxLength={100} placeholder="Kavin Kumar" className={fieldStyle} />{errors.name && <p id="contact-name-error" className="mt-2 text-sm font-medium">{errors.name}</p>}</div>
            <div><label htmlFor="contact-email" className="mb-2 block text-xs font-medium uppercase tracking-wider">Email address</label><input id="contact-email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} name="email" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} autoComplete="email" required maxLength={254} placeholder="kavin@example.com" className={fieldStyle} />{errors.email && <p id="contact-email-error" className="mt-2 text-sm font-medium">{errors.email}</p>}</div>
          </div>
          <div><label htmlFor="contact-project" className="mb-2 block text-xs font-medium uppercase tracking-wider">What are you thinking?</label><textarea id="contact-project" aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "contact-project-error" : undefined} name="project" value={message} onChange={(event) => setMessage(event.target.value)} required maxLength={2000} rows={5} placeholder="What would you like to create or improve? Share your idea, timeline, or any questions." className={`${fieldStyle} resize-y`} />{errors.project && <p id="contact-project-error" className="mt-2 text-sm font-medium">{errors.project}</p>}</div>
          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-black/10 pt-6 dark:border-white/10">
            <p className="max-w-48 text-xs leading-relaxed text-black/55 dark:text-white/55">Opens your message in WhatsApp.<br />Review it, then tap Send.</p>
            <button type="submit" className="group inline-flex items-center gap-4 rounded-full bg-[#111111] px-6 py-4 text-sm font-medium text-[#faf7f3] hover:bg-black/80 dark:bg-[#f4f4f6] dark:text-[#111111] dark:hover:bg-white">Continue to WhatsApp<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></button>
          </div>
          <button type="reset" className="rounded-full px-3 py-2 text-xs text-black/60 underline underline-offset-4 hover:text-black dark:text-white/60 dark:hover:text-white">Clear everything</button>
          <p role="status" className="text-sm leading-relaxed text-black/65 empty:hidden dark:text-white/65">{notice}</p>
        </form>
      </div>
      <dialog
        data-lenis-prevent
        ref={dialogRef}
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl border border-black/10 bg-[#faf7f3] p-0 text-[#111111] shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm dark:border-white/15 dark:bg-[#161619] dark:text-[#f4f4f6]"
      >
        <div className="p-6 sm:p-7">
          <h3 id="contact-dialog-title" className="text-xl font-semibold tracking-tight">Ready to say hello?</h3>
          <p id="contact-dialog-description" className="mt-2 text-sm leading-relaxed opacity-65">Open WhatsApp to review your details and send your message to Mohan.</p>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" autoFocus onClick={() => dialogRef.current?.close()} className="rounded-full px-4 py-3 text-sm opacity-70 hover:opacity-100">Cancel</button>
            <a href={draftUrl || undefined} onClick={() => {
              dialogRef.current?.close();
              setNotice('Tap Send in WhatsApp to deliver your message. If WhatsApp didn’t open, you can contact me using the email address alongside.');
            }} className="rounded-full bg-[#111111] px-5 py-3 text-sm font-medium text-[#faf7f3] dark:bg-[#f4f4f6] dark:text-[#111111]">Open WhatsApp ↗</a>
          </div>
        </div>
      </dialog>
    </section>
  );
}
