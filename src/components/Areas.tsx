import { Clock, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mapsUrl, site } from "@/lib/site";

export function Areas() {
  const { address } = site;
  return (
    <section id="areas" aria-labelledby="areas-heading" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            eyebrow="Find Us"
            title={<span id="areas-heading">Serving Malappuram &amp; coastal Kerala</span>}
          />
          <p className="text-lg leading-8 text-muted">
            Our main branch is in {address.locality}, on {address.street}. Walk in, or call ahead to speak with an advisor.
          </p>
          <div>
            <ButtonLink href={mapsUrl} target="_blank" rel="noopener noreferrer" variant="outline">
              <MapPin aria-hidden="true" className="size-[18px]" />
              Get directions
              <span className="sr-only"> (opens in a new tab)</span>
            </ButtonLink>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal delay={80}>
            <address className="grid gap-px overflow-hidden rounded-lg border border-line bg-line not-italic sm:grid-cols-3">
              <div className="flex flex-col gap-2 bg-white p-6">
                <MapPin aria-hidden="true" className="size-5 text-accent-text" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Branch</p>
                <p className="font-semibold leading-snug text-brand">
                  {address.street}, {address.locality}
                  <br />
                  {address.district}, {address.region}
                </p>
              </div>
              <div className="flex flex-col gap-2 bg-white p-6">
                <Clock aria-hidden="true" className="size-5 text-accent-text" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Hours</p>
                <p className="font-semibold leading-snug text-brand">
                  {site.hours.days}
                  <br />
                  {site.hours.time}
                </p>
              </div>
              <div className="flex flex-col gap-2 bg-white p-6">
                <Phone aria-hidden="true" className="size-5 text-accent-text" />
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Phone</p>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="font-semibold leading-snug text-brand underline-offset-4 hover:text-accent-text hover:underline"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </address>
          </Reveal>

          <Reveal delay={140}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Areas we serve</h3>
            <ul className="flex flex-wrap gap-2.5">
              {site.areas.map((area) => (
                <li
                  key={area}
                  className="rounded-md border border-line bg-paper px-4 py-2 text-[0.95rem] font-semibold text-brand"
                >
                  {area}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
