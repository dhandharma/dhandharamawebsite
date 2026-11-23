import { ArrowRight } from "lucide-react";
import { services, type ServiceId } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const serviceIcon: Record<ServiceId, IconName> = {
  gold: "gem",
  personal: "wallet",
  business: "store",
  property: "landmark",
};

export function AboutServices() {
  return (
    <section aria-labelledby="offer-heading" className="bg-white py-20 lg:py-28">
      <Container>
        <Reveal className="mb-12 max-w-2xl lg:mb-16">
          <SectionHeading
            eyebrow="What We Offer"
            title={
              <span id="offer-heading">
                Four ways we can <span className="italic text-brand-soft">help you.</span>
              </span>
            }
          />
        </Reveal>

        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.id} delay={(i % 2) * 90}>
              {/* Plain anchor: the home page's service tabs react to the #service-<id> hash on load. */}
              <a
                href={`/#service-${s.id}`}
                className="group flex h-full gap-5 rounded-lg border border-line bg-paper p-7 transition duration-300 hover:border-brand hover:bg-brand hover:text-white sm:gap-6"
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-md bg-brand text-accent transition-colors group-hover:bg-accent group-hover:text-brand">
                  <Icon name={serviceIcon[s.id]} className="size-7" />
                </span>
                <span className="flex flex-col gap-2">
                  <span className="font-serif text-2xl text-brand transition-colors group-hover:text-white">{s.name}</span>
                  <span className="leading-7 text-muted transition-colors group-hover:text-white/75">{s.lead}</span>
                  <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-accent-text transition-colors group-hover:text-accent">
                    Learn more
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
