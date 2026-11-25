import { profile, socials } from "@/content/site";

/** schema.org Person + WebSite data for search engines. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.url}/#person`,
        name: profile.name,
        url: profile.url,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        description: profile.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location.split(",")[0].trim(),
          addressCountry: profile.location.split(",").at(-1)?.trim(),
        },
        sameAs: socials.filter((link) => link.href).map((link) => link.href),
      },
      {
        "@type": "WebSite",
        "@id": `${profile.url}/#website`,
        url: profile.url,
        name: `${profile.name} — Portfolio`,
        author: { "@id": `${profile.url}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
