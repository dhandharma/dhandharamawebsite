import Image from "next/image";
import { images } from "@/lib/images";
import { services, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Figures below are counted from the site's own content, not invented.
const glance = [
  { value: String(services.length), label: "Loan types" },
  { value: String(site.areas.length), label: "Areas served" },
  { value: "6", label: "Days a week" },
] as const;

export function AboutStory() {
  return (
    <section aria-labelledby="story-heading" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[460px] pb-14 pr-8 lg:mx-0">
            <div aria-hidden="true" className="absolute -left-4 -top-4 h-[calc(100%-3.5rem)] w-[calc(100%-2rem)] rounded-lg border-2 border-accent/50" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-brand-soft">
              <Image
                src={images.gold}
                alt="Gold jewellery, coins and an appraisal scale on a dark wooden surface"
                fill
                sizes="(min-width: 1024px) 420px, 80vw"
                style={{ objectPosition: "42% 50%" }}
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 aspect-[4/3] w-[58%] overflow-hidden rounded-lg border-[6px] border-white bg-brand-soft shadow-[0_24px_40px_-16px_rgba(15,47,32,0.45)]">
              <Image
                src={images.advisor}
                alt="An advisor assisting a customer with paperwork at a branch desk"
                fill
                sizes="(min-width: 1024px) 260px, 45vw"
                style={{ objectPosition: "60% 50%" }}
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8 lg:col-span-7">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story & Commitment"
              title={
                <span id="story-heading">
                  Your gold carries more than{" "}
                  <span className="italic text-brand-soft">its weight in value.</span>
                </span>
              }
            />
          </Reveal>
          <Reveal delay={80} className="flex flex-col gap-5 text-lg leading-8 text-muted">
            <p>
              We understand that your gold ornaments carry deep emotional and family value. At {site.name}, we focus on
              fair, transparent valuation per gram, prompt financial assistance without cumbersome procedures, and
              careful custody of your gold at our {site.address.locality} branch in {site.address.district}.
            </p>
            <p>
              Whether you need cash against gold, support for a family need or capital for your business, our advisors
              at the {site.address.locality} branch are here to help you find the right option.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
              {glance.map((item) => (
                <div key={item.label} className="px-4 py-6 first:pl-0 sm:px-8">
                  <dd className="font-serif text-[2.5rem] leading-none text-brand">{item.value}</dd>
                  <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{item.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
