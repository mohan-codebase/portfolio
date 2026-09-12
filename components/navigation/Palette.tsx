'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useEffectEvent, useId, useRef, useState, type KeyboardEvent } from 'react';

import { TOGGLE_GRID } from '@/components/ui/GridOverlay';
import { archive, featured } from '@/data/projects';
import { mailto, site, socials } from '@/data/site';
import { lockScroll, scrollToTarget } from '@/lib/scroll';
import { startPageTransition } from '@/lib/transition';

import styles from './Palette.module.css';

type Command = {
  id: string;
  group: string;
  label: string;
  hint: string;
  keywords?: string;
  /** Returns a message to flash before closing, for actions without a visible result. */
  run: () => string | void;
};

/** The ⌘K palette: jump to any page or project, or run a small action. */
export function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState('');
  const id = useId();

  const go = (href: string) => {
    if (!startPageTransition(href)) router.push(href);
  };
  const open = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const commands: Command[] = [
    ...site.pages.map((page) => ({ id: `page${page.href}`, group: 'Pages', label: page.label, hint: page.href, run: () => go(page.href) })),
    ...featured.map((project) => ({
      id: `case-${project.slug}`,
      group: 'Case studies',
      label: project.title,
      hint: project.category,
      keywords: project.stack.join(' '),
      run: () => go(`/work/${project.slug}`),
    })),
    ...archive
      .filter((project) => !project.current)
      .map((project) => ({
        id: `project-${project.title}`,
        group: 'More projects',
        label: project.title,
        hint: `${project.type} ↗`,
        keywords: project.stack.join(' '),
        run: () => open(project.href),
      })),
    {
      id: 'copy-email',
      group: 'Actions',
      label: 'Copy email address',
      hint: site.email,
      run: () => {
        void navigator.clipboard?.writeText(site.email);
        return 'Email copied ✓';
      },
    },
    { id: 'write', group: 'Actions', label: 'Write an email', hint: 'Opens your mail app', run: () => window.location.assign(mailto) },
    ...socials.map((social) => ({
      id: `social-${social.label}`,
      group: 'Actions',
      label: `${social.label} profile`,
      hint: `${social.handle} ↗`,
      run: () => open(social.href),
    })),
    { id: 'grid', group: 'Actions', label: 'Toggle the layout grid', hint: 'G', run: () => void window.dispatchEvent(new Event(TOGGLE_GRID)) },
    { id: 'top', group: 'Actions', label: 'Back to top', hint: '↑', run: () => void scrollToTarget(0) },
  ];

  const needle = query.trim().toLowerCase();
  const results = needle
    ? commands.filter((command) => `${command.label} ${command.group} ${command.hint} ${command.keywords ?? ''}`.toLowerCase().includes(needle))
    : commands;
  const current = Math.min(active, Math.max(results.length - 1, 0));
  const optionId = (command: Command) => `${id}-${command.id}`;

  const close = () => {
    // Leave the top layer at once, so a page curtain started by the command is not hidden behind it.
    if (dialogRef.current?.open) dialogRef.current.close();
    onClose();
  };

  const run = (command: Command) => {
    const message = command.run();
    if (!message) return close();
    setFlash(message);
    window.setTimeout(close, 900);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActive((current + step + results.length) % results.length);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      run(results[current]);
    }
  };

  const onCancel = useEffectEvent((event: Event) => {
    event.preventDefault();
    onClose();
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const release = lockScroll();
    const frame = requestAnimationFrame(() => {
      dialog.dataset.state = 'open';
    });
    dialog.addEventListener('cancel', onCancel);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener('cancel', onCancel);
      if (dialog.open) dialog.close();
      release();
    };
  }, []);

  // Keep the highlighted option in view while moving with the keyboard.
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [current, needle]);

  const groups = results.reduce<Array<{ name: string; items: Array<{ command: Command; index: number }> }>>((all, command, index) => {
    const last = all[all.length - 1];
    if (last?.name === command.group) last.items.push({ command, index });
    else all.push({ name: command.group, items: [{ command, index }] });
    return all;
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.palette}
      aria-label="Quick navigation"
      data-lenis-prevent
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.field}>
          <span className={`label ${styles.prompt}`} aria-hidden="true">
            →
          </span>
          <input
            className={styles.input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={`${id}-list`}
            aria-autocomplete="list"
            aria-activedescendant={results[current] ? optionId(results[current]) : undefined}
            aria-label="Search pages, projects and actions"
            placeholder="Jump to a page, project or action…"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
          />
          <kbd className={`label ${styles.esc}`}>Esc</kbd>
        </div>

        <div ref={listRef} id={`${id}-list`} role="listbox" aria-label="Results" className={styles.list}>
          {groups.map((group) => (
            <div key={group.name} role="presentation" className={styles.group}>
              <p id={`${id}-${group.name}`} className={`label ${styles.heading}`} aria-hidden="true">
                {group.name}
              </p>
              <div role="group" aria-labelledby={`${id}-${group.name}`}>
                {group.items.map(({ command, index }) => (
                  <div
                    key={command.id}
                    id={optionId(command)}
                    role="option"
                    aria-selected={index === current}
                    className={styles.option}
                    onPointerEnter={() => setActive(index)}
                    onClick={() => run(command)}
                  >
                    <span className={styles.optionLabel}>{command.label}</span>
                    <span className={`label ${styles.hint}`}>{command.hint}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {results.length === 0 ? <p className={styles.empty}>Nothing matches “{query}”.</p> : null}
        </div>

        <p className={`label ${styles.help}`} role="status">
          {flash || '↑ ↓ to move · Enter to open · Esc to close'}
        </p>
      </div>
    </dialog>
  );
}
