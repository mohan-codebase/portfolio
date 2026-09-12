import type { ComponentProps, ReactNode } from 'react';

import { TransitionLink } from '@/components/transition/TransitionLink';
import { cx } from '@/lib/cx';

import { Arrow, type ArrowDirection } from './Arrow';
import styles from './Button.module.css';

type ButtonProps = Omit<ComponentProps<'a'>, 'children'> & {
  href: string;
  children: ReactNode;
  variant?: 'outline' | 'solid';
  arrow?: ArrowDirection;
  /** Opens in a new tab and announces it to screen readers. */
  external?: boolean;
};

/**
 * The one button of the site: strong type, a hairline frame and an arrow cell.
 * On hover the fill rises from the baseline and the arrow is swapped for a
 * fresh one travelling in the same direction. Internal pages go through the
 * page curtain; anchors and external links stay plain links.
 */
export function Button({
  href,
  children,
  variant = 'outline',
  arrow = 'up-right',
  external = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(styles.button, styles[variant], 'press', className);
  const content = (
    <>
      <span className={styles.text}>{children}</span>
      <span className={styles.icon} aria-hidden="true">
        <span className={styles.arrows}>
          <Arrow direction={arrow} />
          <Arrow direction={arrow} />
        </span>
      </span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );

  if (href.startsWith('/') && !external) {
    return (
      <TransitionLink href={href} className={classes} data-arrow={arrow} {...rest}>
        {content}
      </TransitionLink>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      data-arrow={arrow}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
