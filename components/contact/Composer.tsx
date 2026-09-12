'use client';

import { useId, useState, type FormEvent } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { composer } from '@/data/content';
import { site } from '@/data/site';
import { cx } from '@/lib/cx';

import styles from './Composer.module.css';

/**
 * A fill-in-the-blanks project brief. It writes the email as you type (shown
 * live beside the form) and opens it in the visitor's own mail app — nothing
 * is sent from the site, so there is no backend or inbox API to maintain.
 */
export function Composer() {
  const id = useId();
  const [name, setName] = useState('');
  const [service, setService] = useState(composer.services[0]);
  const [timeline, setTimeline] = useState(composer.timelines[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const who = name.trim();
  const subject = `Project enquiry — ${service.label}${who ? ` (${who})` : ''}`;
  const body = [
    `Hi ${site.name},`,
    '',
    `${who ? `I'm ${who}, and I'd` : "I'd"} like help with ${service.phrase}. Timing: ${timeline.phrase}.`,
    ...(message.trim() ? ['', message.trim()] : []),
    '',
    who ? `Thanks,\n${who}` : 'Thanks!',
  ].join('\n');
  const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Opening your mail app…');
    window.location.assign(href);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${subject}\n\n${body}`);
      setStatus('Copied — paste it into any email.');
    } catch {
      setStatus(`Couldn’t copy. Write to ${site.email} instead.`);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.fields}>
        <p className={styles.sentence}>
          Hi {site.name}, I&apos;m{' '}
          <label className="sr-only" htmlFor={`${id}-name`}>
            Your name
          </label>
          <input
            id={`${id}-name`}
            className={styles.inline}
            name="name"
            autoComplete="name"
            placeholder="your name"
            size={Math.max(name.length + 1, 9)}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />{' '}
          and I&apos;d like help with…
        </p>

        <fieldset className={styles.group}>
          <legend className="label mute">What do you need?</legend>
          <div className={styles.chips}>
            {composer.services.map((option) => (
              <label key={option.label} className={styles.chip}>
                <input
                  type="radio"
                  name="service"
                  className="sr-only"
                  checked={service.label === option.label}
                  onChange={() => setService(option)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={styles.group}>
          <legend className="label mute">When would you like to start?</legend>
          <div className={styles.chips}>
            {composer.timelines.map((option) => (
              <label key={option.label} className={styles.chip}>
                <input
                  type="radio"
                  name="timeline"
                  className="sr-only"
                  checked={timeline.label === option.label}
                  onChange={() => setTimeline(option)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.group}>
          <label className="label mute" htmlFor={`${id}-message`}>
            Anything else? (optional)
          </label>
          <textarea
            id={`${id}-message`}
            className={styles.message}
            rows={4}
            placeholder="A sentence or two about the project, or a link to the design…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button type="submit" className={cx(styles.send, 'press')}>
            Open in my mail app <Arrow />
          </button>
          <button type="button" className={styles.copy} onClick={copy}>
            Copy the text instead
          </button>
          <p className={`label ${styles.status}`} role="status">
            {status}
          </p>
        </div>
      </div>

      <aside className={styles.preview} aria-label="Email preview">
        <p className={`label ${styles.previewHead}`}>
          <span className="pulse" aria-hidden="true" /> Live preview
        </p>
        <dl className={styles.envelope}>
          <div>
            <dt className="label">To</dt>
            <dd>{site.email}</dd>
          </div>
          <div>
            <dt className="label">Subject</dt>
            <dd>{subject}</dd>
          </div>
        </dl>
        <pre className={styles.body}>{body}</pre>
      </aside>
    </form>
  );
}
