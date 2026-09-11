import type { CSSProperties } from 'react';

import { Code } from '@/components/ui/Code';
import { Emphasis } from '@/components/ui/Emphasis';
import { HoverPreview } from '@/components/ui/HoverPreview';
import { Lines } from '@/components/ui/Lines';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { toolkit } from '@/data/content';
import { skills } from '@/data/skills';

import styles from './Toolkit.module.css';

const pad = (value: number) => String(value).padStart(2, '0');

export function Toolkit() {
  const previews = skills.map((skill, index) => (
    <div key={skill.name} className={styles.card}>
      <div className={styles.cardHead}>
        <span className={styles.symbol}>
          {skill.symbol}
          <sup>{pad(index + 1)}</sup>
        </span>
        <span className="label mute">{skill.file}</span>
      </div>
      <Code code={skill.code} />
    </div>
  ));

  return (
    <section id="toolkit" className={`section ${styles.toolkit}`} data-theme="dark" aria-labelledby="toolkit-title">
      <div className="container">
        <SectionHeader index="04" title="Toolkit" meta="No percentages" />

        <div className={`grid ${styles.head}`}>
          <h2 id="toolkit-title" className={styles.title} data-reveal="lines">
            <Lines
              indents={[0, 2]}
              lines={[
                'What I',
                <>
                  <Emphasis text="*work* with" />
                  <span className="stop">.</span>
                </>,
              ]}
            />
          </h2>
          <p className={styles.intro} data-reveal>
            {toolkit.intro}
          </p>
        </div>

        <HoverPreview previews={previews} className={styles.listWrap}>
          <ol className={styles.list}>
            {skills.map((skill, index) => (
              <li
                key={skill.name}
                className={styles.item}
                data-preview={index}
                data-reveal
                style={{ '--delay': index * 60 } as CSSProperties}
              >
                <span className={`label ${styles.number}`}>{pad(index + 1)}</span>
                <h3 className={styles.name}>{skill.name}</h3>
                <p className={styles.description}>{skill.description}</p>
                <span className={styles.tile} aria-hidden="true">
                  {skill.symbol}
                </span>
              </li>
            ))}
          </ol>
        </HoverPreview>
      </div>
    </section>
  );
}
