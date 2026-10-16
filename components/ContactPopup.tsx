'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { createContactDraft, validateContact, type ContactErrors } from '@/lib/contact-validation';

export default function ContactPopup() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [error, setError] = useState('');
  useEffect(() => {
    const open = () => { setFieldErrors({}); setError(''); dialog.current?.showModal(); };
    window.addEventListener('open-contact', open);
    return () => window.removeEventListener('open-contact', open);
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = { name: String(data.get('name') ?? ''), email: String(data.get('email') ?? ''), project: String(data.get('project') ?? ''), interest: 'Something else' };
    const errors = validateContact(fields);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setError(Object.values(errors)[0]!);
      event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errors)[0]}"]`)?.focus();
      return;
    }
    window.location.href = createContactDraft(fields);
    setError('Review and send the draft in your email app.');
  }
  const field = 'block w-full rounded-2xl border border-black/15 bg-transparent px-4 py-3 text-base dark:border-white/15';
  return (
    <dialog data-lenis-prevent ref={dialog} aria-labelledby="quick-contact-title" onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl border border-black/10 bg-[#faf7f3] p-6 text-[#111111] shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-sm dark:border-white/15 dark:bg-[#161619] dark:text-[#f4f4f6] sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4"><h2 id="quick-contact-title" className="text-2xl font-semibold tracking-tight">Let’s talk.</h2><button type="button" aria-label="Close contact popup" onClick={() => dialog.current?.close()} className="flex size-11 items-center justify-center rounded-full"><X className="h-5 w-5" /></button></div>
      <form noValidate onSubmit={submit} className="grid gap-4">
        <label className="grid gap-2 text-xs"><span>Your name</span><input aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "quick-contact-error" : undefined} name="name" autoComplete="name" required maxLength={100} placeholder="Kavin Kumar" className={field} /></label>
        <label className="grid gap-2 text-xs"><span>Email</span><input aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "quick-contact-error" : undefined} name="email" type="email" inputMode="email" autoCapitalize="none" spellCheck={false} autoComplete="email" required maxLength={254} placeholder="kavin@example.com" className={field} /></label>
        <label className="grid gap-2 text-xs"><span>Your idea</span><textarea aria-invalid={Boolean(fieldErrors.project)} aria-describedby={fieldErrors.project ? "quick-contact-error" : undefined} name="project" required minLength={10} maxLength={2000} rows={3} placeholder="What would you like to create?" className={field} /></label>
        <p className="text-xs opacity-60">Opens an email draft for you to review and send.</p>
        <button type="submit" className="w-full rounded-full bg-[#111111] px-5 py-3 text-sm text-white dark:bg-[#f4f4f6] dark:text-[#111111]">Open email draft ↗</button>
        {error && <p id="quick-contact-error" role="status" className="text-sm leading-relaxed">{error}</p>}
      </form>
    </dialog>
  );
}
