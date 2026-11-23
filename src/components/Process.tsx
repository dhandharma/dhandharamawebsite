import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { site, steps } from "@/lib/site";
import { images } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  return (
    <section id="how-it-works" aria-labelledby="process-heading" className="bg-brand py-20 text-white lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <Reveal className="flex flex-col gap-5">
            <SectionHeading
              onDark
              eyebrow="Simple & Swift Process"
              title={
                <span id="process-heading">
                  A simple 3-step loan.
                  <br />
                  <span className="italic text-accent">Clear and secure.</span>
                </span>
              }
            />
            <p className="max-w-xl text-lg leading-8 text-white/70">
              Walk into our {site.address.locality} branch with your gold ornaments or call ahead. We appraise your gold
              in front of you, then pay out by bank transfer or spot cash.
            </p>
          </Reveal>

          <ol className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 90}
                className="flex flex-col gap-5 rounded-lg border border-white/10 bg-brand-soft/60 p-6 transition-colors duration-200 hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-md bg-accent text-brand">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <span aria-hidden="true" className="font-serif text-3xl italic text-white/25">
                    0{i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-[1.05rem] font-semibold">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-white/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 self-start font-semibold text-accent transition-colors hover:text-white"
          >
            Talk to an advisor
            <ArrowRight aria-hidden="true" className="size-[18px] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <Reveal delay={120} className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-lg ring-1 ring-white/10">
            <Image
              src={images.gold}
              alt="Gold jewellery and an appraisal scale"
              fill
              sizes="(min-width: 1024px) 460px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-md bg-brand px-4 py-3.5 ring-1 ring-white/10">
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-accent text-brand">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-[0.95rem] font-semibold">Secure custody</p>
                <p className="text-sm text-white/70">Sealed in tamper-evident packing</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
