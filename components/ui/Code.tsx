import { tokenize } from '@/lib/tokenize';

import styles from './Code.module.css';

/** Server-rendered, lightly highlighted code — no highlighter ships to the client. */
export function Code({ code }: { code: string }) {
  return (
    <pre className={styles.pre}>
      <code>
        {tokenize(code).map((tokens, line) => (
          <span key={line} className={styles.line}>
            {tokens.map((token, index) => (
              <span key={index} className={styles[token.type]}>
                {token.text}
              </span>
            ))}
            {'\n'}
          </span>
        ))}
      </code>
    </pre>
  );
}
