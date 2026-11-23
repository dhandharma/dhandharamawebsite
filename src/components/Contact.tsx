import type { ReactNode } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { mapsUrl, site } from "@/lib/site";

function InfoCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 rounded-lg border border-line bg-white p-6 shadow-[0_20px_36px_-26px_rgba(15,47,32,0.3)]">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand text-accent">{icon}</span>
      <div className="min-w-0">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</h3>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}

/** Contact details + enquiry form. Pulls up over the page hero (the hero reserves space with `overlap`). */
export function Contact() {
  const { address } = site;
  return (
    // flow-root stops the container's negative top margin collapsing through the section,
    // which would otherwise paint this section's background over the bottom of the hero.
    <section aria-label="Contact details and enquiry form" className="relative flow-root bg-paper pb-20 lg:pb-28">
      <Container className="relative z-10 -mt-20 grid gap-6 md:-mt-24 lg:-mt-32 lg:grid-cols-12 lg:gap-8">
        {/* Form first on small screens: it's the main action. */}
        <Reveal className="order-first lg:order-last lg:col-span-7">
          <div className="rounded-lg border border-line bg-white p-6 shadow-[0_40px_70px_-30px_rgba(15,47,32,0.45)] sm:p-10">
            <h2 className="font-serif text-[2rem] leading-tight text-brand">Send us an enquiry</h2>
            <p className="mb-8 mt-2 text-muted">Tell us what you need and we&rsquo;ll point you to the right loan.</p>
            <ContactForm />
          </div>
        </Reveal>

        <div className="flex flex-col gap-4 lg:col-span-5">
          <Reveal delay={60}>
            <InfoCard icon={<Phone aria-hidden="true" className="size-6" />} label="Call the branch">
              <a
                href={`tel:${site.phoneTel}`}
                className="text-2xl font-semibold text-brand underline-offset-4 hover:text-accent-text hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </InfoCard>
          </Reveal>

          <Reveal delay={120}>
            <InfoCard icon={<MapPin aria-hidden="true" className="size-6" />} label="Visit us">
              <address className="not-italic">
                <p className="font-semibold leading-snug text-brand">
                  {site.name}
                  <br />
                  {address.street}, {address.locality}
                  <br />
                  {address.district}, {address.region}
                </p>
                <div className="mt-4">
                  <ButtonLink href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline" className="px-4 py-2 text-sm">
                    Get directions
                    <span className="sr-only"> (opens in a new tab)</span>
                  </ButtonLink>
                </div>
              </address>
            </InfoCard>
          </Reveal>

          <Reveal delay={180}>
            <InfoCard icon={<Clock aria-hidden="true" className="size-6" />} label="Opening hours">
              <p className="font-semibold text-brand">
                {site.hours.days}
                <span className="ml-2 font-normal text-muted">{site.hours.time}</span>
              </p>
            </InfoCard>
          </Reveal>

          <Reveal delay={240}>
            <div className="rounded-lg bg-brand p-6 text-white">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Areas we serve</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areas.map((area) => (
                  <li key={area} className="rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-white/90">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
