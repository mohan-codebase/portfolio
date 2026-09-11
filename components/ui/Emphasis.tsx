/**
 * Renders copy written as "the *details*": words wrapped in asterisks become
 * the italic serif accent. Keeps typographic intent editable from /data.
 */
export function Emphasis({ text }: { text: string }) {
  return text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith('*') && part.endsWith('*') ? (
        <span key={index} className="serif">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    );
}
