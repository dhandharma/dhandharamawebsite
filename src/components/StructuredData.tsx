import { SITE_URL, site } from "@/lib/site";

/**
 * schema.org FinancialService, using only details that exist in the site content.
 * Postal code, geo coordinates and social profiles are intentionally omitted until confirmed.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.name,
    description: site.description,
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    logo: `${SITE_URL}/logo.png`,
    telephone: site.phoneTel,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: "IN",
    },
    areaServed: site.areas.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "18:00",
    },
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
