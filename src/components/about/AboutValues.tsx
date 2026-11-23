import { trustPoints } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AboutValues() {
  return (
    <section aria-labelledby="values-heading" className="bg-paper py-20 lg:py-28">
      <Container>
        <Reveal className="mb-12 max-w-2xl lg:mb-16">
          <SectionHeading
            eyebrow="How We Work"
            title={<span id="values-heading">What you can expect from us.</span>}
          />
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={i * 80}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-lg border border-line bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_40px_-24px_rgba(15,47,32,0.35)]"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-4 font-serif text-5xl italic text-brand/[0.07] transition-colors group-hover:text-accent/25"
              >
                0{i + 1}
              </span>
              <span className="flex size-12 items-center justify-center rounded-md bg-brand text-accent">
                <Icon name={point.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-brand">{point.title}</h3>
                <p className="mt-2 leading-7 text-muted">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
