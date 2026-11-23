import type { Metadata } from "next";
import { AboutServices } from "@/components/about/AboutServices";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

const title = "About Us";
const description = `Learn about ${site.name}: transparent gold appraisal, minimal paperwork and careful custody at our ${site.address.locality} branch in ${site.address.district}, ${site.address.region}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", locale: "en_IN", siteName: site.name, title: `${title} | ${site.name}`, description, url: "/about" },
  twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        crumb="About"
        eyebrow="About Us"
        title={
          <>
            Finance built on <em>trust,</em> not just collateral.
          </>
        }
        intro={`${site.name} offers gold loans, personal loans, business loans and loans against property from our branch in ${site.address.locality}, ${site.address.district}.`}
      />
      <AboutStory />
      <AboutValues />
      <AboutServices />
      <CtaBand
        title={`Visit our ${site.address.locality} branch.`}
        text="Bring your gold or your questions. Call ahead or send an enquiry and an advisor will help you with the next step."
      />
    </main>
  );
}
