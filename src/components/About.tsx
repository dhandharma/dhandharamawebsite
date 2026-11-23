import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Our Commitment"
            title={
              <span id="about-heading">
                Finance that values
                <br />
                <span className="italic text-brand-soft">your trust, not just collateral.</span>
              </span>
            }
          />
        </Reveal>

        <Reveal delay={100} className="flex flex-col gap-7 lg:col-span-7 lg:border-l lg:border-line lg:pl-14">
          <p className="text-lg leading-8 text-muted">
            We understand that your gold ornaments carry deep emotional and family value. At {site.name}, we focus on
            fair, transparent valuation per gram, prompt financial assistance without cumbersome procedures, and careful
            custody of your gold at our {site.address.locality} branch in {site.address.district}.
          </p>
          <div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-accent-text"
            >
              Learn more about us
              <ArrowRight aria-hidden="true" className="size-[18px] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
