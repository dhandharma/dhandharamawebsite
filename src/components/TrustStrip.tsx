import { trustPoints } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function TrustStrip() {
  return (
    <section aria-label="Why customers choose us" className="border-b border-line bg-paper">
      <Container className="py-10 lg:py-12">
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point, i) => (
            <Reveal as="li" key={point.title} delay={i * 70} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand text-accent">
                <Icon name={point.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-brand">{point.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">{point.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
