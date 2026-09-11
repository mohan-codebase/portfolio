import Image from 'next/image';
import type { CSSProperties } from 'react';

import { Arrow } from '@/components/ui/Arrow';
import { HoverPreview } from '@/components/ui/HoverPreview';
import type { ArchiveProject } from '@/data/projects';
import { cx } from '@/lib/cx';

import styles from './ProjectArchive.module.css';

/** Smaller builds as an index list; hovering a row floats its screenshot beside the pointer. */
export function ProjectArchive({ items, startAt }: { items: ArchiveProject[]; startAt: number }) {
  const previews = items.map((item) =>
    item.image ? (
      <div key={item.title} className={styles.preview}>
        <Image src={item.image.src} alt="" sizes="22rem" className={styles.previewImage} />
      </div>
    ) : (
      <div key={item.title} className={cx(styles.preview, styles.here)}>
        <span className="label">You are here</span>
      </div>
    ),
  );

  return (
    <div className={styles.archive}>
      <div className={styles.head}>
        <h3 className="label">Archive</h3>
        <span className="label mute">
          ({String(items.length).padStart(2, '0')})
        </span>
      </div>

      <HoverPreview previews={previews}>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={item.title} data-reveal style={{ '--delay': index * 70 } as CSSProperties}>
              <a
                className={styles.row}
                href={item.href}
                data-preview={index}
                {...(item.current ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <span className={cx('label', styles.number)}>{String(startAt + index).padStart(2, '0')}</span>
                <span className={styles.name}>{item.title}</span>
                <span className={cx('label', styles.type)}>{item.type}</span>
                <span className={cx('label', styles.stack)}>{item.stack.join(' · ')}</span>
                <span className={cx('label', styles.year)}>{item.year}</span>
                <Arrow className={styles.arrow} direction={item.current ? 'up' : 'up-right'} />
                {item.current ? null : <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </HoverPreview>
    </div>
  );
}
