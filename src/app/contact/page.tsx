import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

const title = "Contact Us";
const description = `Call, visit or send an enquiry to ${site.name} in ${site.address.locality}, ${site.address.district}. Open ${site.hours.days}, ${site.hours.time}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", locale: "en_IN", siteName: site.name, title: `${title} | ${site.name}`, description, url: "/contact" },
  twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        overlap
        crumb="Contact"
        eyebrow="Get in Touch"
        title={
          <>
            Let&rsquo;s talk about <em>your loan.</em>
          </>
        }
        intro="Call the branch, drop in, or send an enquiry. An advisor will get back to you about gold valuation and your loan options."
      />
      <Contact />
    </main>
  );
}
