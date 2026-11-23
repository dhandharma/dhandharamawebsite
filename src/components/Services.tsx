import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesTabs } from "@/components/ServicesTabs";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal className="mb-10 lg:mb-12">
          <SectionHeading
            eyebrow="Comprehensive Financial Solutions"
            title={<span id="services-heading">Services for every financial need.</span>}
          />
        </Reveal>
        <ServicesTabs />
      </Container>
    </section>
  );
}
