import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  /** Page <h1>. Wrap the emphasised words in <em> to get the italic orange accent. */
  title: ReactNode;
  intro: string;
  /** Current page name for the breadcrumb. */
  crumb: string;
  /** Extra bottom padding so a card below can overlap the hero. */
  overlap?: boolean;
};

/** Dark-green page header with breadcrumb, shared by the inner pages. */
export function PageHero({ eyebrow, title, intro, crumb, overlap = false }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 size-[520px] rounded-full border border-white/[0.07]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-52 -top-56 size-[780px] rounded-full border border-white/[0.04]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 size-[360px] rounded-full border border-accent/20" />

      <Container className={`relative pt-12 md:pt-16 lg:pt-20 ${overlap ? "pb-28 md:pb-32 lg:pb-40" : "pb-16 md:pb-20 lg:pb-24"}`}>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 text-sm text-white/60">
            <li>
              <Link href="/" className="rounded transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="font-medium text-white/90">
              {crumb}
            </li>
          </ol>
        </nav>

        <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-serif text-display text-balance [&_em]:italic [&_em]:text-accent">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{intro}</p>
      </Container>
    </section>
  );
}
