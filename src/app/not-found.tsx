import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-[70vh] items-center bg-brand text-white">
      <Container className="py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Error 404</p>
        <h1 className="mt-4 font-serif text-display">
          We couldn&rsquo;t find <span className="italic text-accent">that page.</span>
        </h1>
        <p className="mt-5 max-w-lg text-lg text-white/70">
          The link may be out of date. Head back to the home page to explore our loans or contact the branch.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <Link href="/contact" className="inline-flex items-center px-2 py-3 font-semibold text-white underline underline-offset-4">
            Contact us
          </Link>
        </div>
      </Container>
    </main>
  );
}
