/** Placeholder while a project page loads; keeps the footer from jumping up. */
export default function Loading() {
  return (
    <main id="main" className="min-h-svh" aria-busy="true">
      <p role="status" className="sr-only">
        Loading project…
      </p>
    </main>
  );
}
