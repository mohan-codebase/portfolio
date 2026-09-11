import Image from 'next/image';

import type { Shot } from '@/data/projects';
import { cx } from '@/lib/cx';

import styles from './Frames.module.css';

/** A quiet browser window: neutral traffic lights, the real hostname, the real screenshot. */
export function BrowserFrame({
  shot,
  domain,
  sizes,
  theme,
  scrollable = false,
}: {
  shot: Shot;
  domain: string;
  sizes: string;
  theme: 'dark' | 'light';
  scrollable?: boolean;
}) {
  return (
    <div className={styles.browser} data-frame-theme={theme}>
      <div className={styles.chrome} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{domain}</span>
      </div>
      <div className={styles.viewport}>
        <Image
          src={shot.src}
          alt={shot.alt}
          sizes={sizes}
          placeholder="blur"
          className={cx(styles.shot, scrollable && styles.scrollable)}
        />
      </div>
    </div>
  );
}

export function PhoneFrame({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <Image src={shot.src} alt={shot.alt} sizes={sizes} placeholder="blur" className={styles.shot} />
      </div>
    </div>
  );
}
