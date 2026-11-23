import { ArrowUpRight, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type CtaBandProps = {
  title: string;
  text: string;
  /** Hide the enquiry button on pages that are already the contact page. */
  enquiry?: boolean;
};

/** Closing call-to-action band: enquire online or call the branch. */
export function CtaBand({ title, text, enquiry = true }: CtaBandProps) {
  return (
    <section aria-label="Get in touch" className="relative overflow-hidden bg-brand-deep text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 top-1/2 size-[420px] -translate-y-1/2 rounded-full border border-white/[0.07]" />
      <Container className="relative flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between lg:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-serif text-title text-balance">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/70">{text}</p>
        </Reveal>
        <Reveal delay={100} className="flex flex-wrap gap-3">
          {enquiry && (
            <ButtonLink href="/contact">
              Send an enquiry
              <ArrowUpRight aria-hidden="true" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
          )}
          <ButtonLink href={`tel:${site.phoneTel}`} variant="outlineLight">
            <Phone aria-hidden="true" className="size-[18px] text-accent" />
            {site.phoneDisplay}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
