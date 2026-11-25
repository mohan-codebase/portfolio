import { cacheLife } from "next/cache";

/**
 * Current year for the copyright line. Cached so the page stays fully
 * prerendered; it refreshes at most a day after the year changes.
 */
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
