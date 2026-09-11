import type { Metadata } from 'next';

import { Button } from '@/components/ui/Button';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main id="main" className={styles.page} data-theme="dark">
      <div className={`container ${styles.inner}`}>
        <p className="label">
          <span className={styles.index}>(404)</span> Page not found
        </p>
        <h1 className={styles.title}>
          Lost<span className="stop">.</span>
        </h1>
        <p className={styles.text}>
          This page doesn’t exist — or it moved while I was polishing the <span className="serif">details</span>.
        </p>
        <Button href="/" arrow="right">
          Back to home
        </Button>
      </div>
    </main>
  );
}
