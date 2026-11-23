"use client";

import Image from "next/image";
import { useId } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { heroSlides } from "@/lib/site";
import { images } from "@/lib/images";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Autoplaying hero carousel (see useCarousel for the timing/pause rules).
 * All slides stay in the DOM and stacked in one grid cell, so the section height never changes
 * between slides (no layout shift) and every slide's text remains crawlable. Only the active slide
 * is visible and interactive.
 */
export function Hero() {
  const regionId = useId();
  const count = heroSlides.length;
  const { index, playing, canAutoplay, userPaused, togglePaused, goTo, next, prev, containerProps, swipeProps } =
    useCarousel({ count, interval: 3000 });

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured loans"
      className="relative overflow-hidden bg-brand text-white"
      {...containerProps}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[520px] rounded-full border border-white/[0.06]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-48 -top-48 size-[760px] rounded-full border border-white/[0.04]" />

      {/* aria-live stays off while rotating on its own (it would spam screen readers) and is polite when the user drives. */}
      <div id={regionId} aria-live={playing ? "off" : "polite"} className="relative grid touch-pan-y" {...swipeProps}>
        {heroSlides.map((slide, i) => {
          const active = i === index;
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={slide.lead}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={!active}
              // The slide fills the shared cell and its container stretches with it, so the photo sits at the
              // same spot on every slide even when the copy is shorter: centred on desktop, pinned to the
              // bottom on mobile (where it sits under the copy). No vertical jump during the fade.
              className={`col-start-1 row-start-1 flex transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Container className="grid grid-rows-[1fr_auto] items-start gap-10 py-14 md:py-20 lg:grid-cols-12 lg:grid-rows-none lg:items-center lg:gap-14 lg:py-24">
                <div className="flex flex-col gap-7 lg:col-span-6">
                  <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                    {slide.eyebrow}
                  </p>

                  <div className="flex flex-col gap-5">
                    <Heading className="font-serif text-display text-balance">
                      {slide.lead}
                      <br />
                      <span className="italic text-accent">{slide.emphasis}</span>
                    </Heading>
                    <p className="max-w-xl text-lg leading-8 text-white/75">{slide.body}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <ButtonLink href={slide.primary.href}>
                      {slide.primary.label}
                      <ArrowUpRight aria-hidden="true" className="size-[18px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </ButtonLink>
                    <ButtonLink href={slide.secondary.href} variant="outlineLight">
                      {slide.secondary.label}
                      <ArrowRight aria-hidden="true" className="size-[18px] text-accent transition-transform group-hover:translate-x-0.5" />
                    </ButtonLink>
                  </div>

                  <p className="flex items-center gap-4 pt-3 text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                    <span aria-hidden="true" className="h-px w-10 bg-accent/60" />
                    {slide.footnote}
                  </p>
                </div>

                <div className="w-full lg:col-span-6">
                  <div className="relative aspect-[4/3] w-full max-w-[720px] lg:ml-auto lg:max-w-[580px] overflow-hidden rounded-lg bg-brand-soft shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                    <Image
                      src={images[slide.image]}
                      alt={slide.imageAlt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 560px, 100vw"
                      style={{ objectPosition: slide.imagePosition }}
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-md bg-brand px-4 py-3.5 ring-1 ring-white/10">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded bg-accent text-brand">
                        <Icon name={slide.cardIcon} className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.95rem] font-semibold">{slide.cardTitle}</p>
                        <p className="text-sm leading-5 text-white/70">{slide.cardText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          );
        })}
      </div>

      <Container className="relative flex items-center justify-between pb-7">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.lead}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-controls={regionId}
                aria-current={i === index}
                onClick={() => goTo(i)}
                // The ::before enlarges the tap target to ~44px without changing the dot's look.
                className={`relative h-2 rounded-full transition-all duration-300 before:absolute before:-inset-x-1 before:-inset-y-4 before:content-[''] ${
                  i === index ? "w-8 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          {canAutoplay && (
            <button
              type="button"
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              aria-controls={regionId}
              onClick={togglePaused}
              className="flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-accent"
            >
              {userPaused ? (
                <Play aria-hidden="true" className="size-4" />
              ) : (
                <Pause aria-hidden="true" className="size-4" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {[
            { label: "Previous slide", icon: ChevronLeft, action: prev },
            { label: "Next slide", icon: ChevronRight, action: next },
          ].map(({ label, icon: ArrowIcon, action }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              aria-controls={regionId}
              onClick={action}
              className="flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-accent hover:bg-accent hover:text-brand"
            >
              <ArrowIcon aria-hidden="true" className="size-5" />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
