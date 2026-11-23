import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { mapsUrl, navLinks, services, site } from "@/lib/site";

const heading = "mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent";
const link = "text-white/75 transition-colors hover:text-white";

export function Footer() {
  const { address } = site;
  return (
    <footer className="bg-brand-deep text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-4">
          {/* The logo artwork has an opaque white background, so it sits on a white tile. */}
          <Link href="/" aria-label={`${site.name} – home`} className="self-start rounded-md bg-white px-4 py-3">
            <Logo className="h-14" />
          </Link>
          <p className="max-w-sm leading-7 text-white/70">
            {site.tagline} in {address.locality}, {address.district}, {address.region}. Gold loans, personal credit and
            customer-first financial assistance.
          </p>
        </div>

        <nav aria-label="Services" className="lg:col-span-2 lg:col-start-6">
          <h2 className={heading}>Services</h2>
          <ul className="flex flex-col gap-3">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`/#service-${s.id}`} className={link}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-2">
          <h2 className={heading}>Explore</h2>
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={heading}>Branch</h2>
          <address className="flex flex-col gap-4 not-italic">
            <p className="flex gap-3 text-white/75">
              <MapPin aria-hidden="true" className="mt-1 size-[18px] shrink-0 text-accent" />
              <span>
                {address.street}, {address.locality}
                <br />
                {address.district}, {address.region}, {address.country}
                <br />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Get directions<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </span>
            </p>
            <p className="flex gap-3 text-white/75">
              <Clock aria-hidden="true" className="mt-1 size-[18px] shrink-0 text-accent" />
              <span>
                {site.hours.days}
                <br />
                {site.hours.time}
              </span>
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden="true" className="mt-1 size-[18px] shrink-0 text-accent" />
              <a href={`tel:${site.phoneTel}`} className={link}>
                {site.phoneDisplay}
              </a>
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-6 text-sm text-white/55">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
