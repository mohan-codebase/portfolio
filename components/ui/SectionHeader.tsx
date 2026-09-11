import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './SectionHeader.module.css';

/** The folio line that opens every section: (index) title ———— meta */
export function SectionHeader({
  index,
  title,
  meta,
  className,
}: {
  index: string;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx(styles.header, className)}>
      <p className="label">
        <span className={styles.index}>({index})</span> {title}
      </p>
      <span className={styles.rule} data-reveal="rule" aria-hidden="true" />
      {meta ? <p className={cx('label', styles.meta)}>{meta}</p> : null}
    </div>
  );
}
