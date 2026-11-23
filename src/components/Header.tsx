import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navLinks, services, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/Logo";
import { MobileNav } from "@/components/MobileNav";
import { NavLink } from "@/components/ui/NavLink";

const linkClass =
  "rounded px-1 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-brand";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="flex h-[72px] items-center justify-between gap-6 lg:h-20">
        <Link href="/" aria-label={`${site.name} – home`} className="shrink-0 rounded">
          <Logo priority />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
          <div className="group relative">
            <Link href="/#services" className={`${linkClass} inline-flex items-center gap-1`}>
              Services
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="rounded-lg border border-line bg-white p-2 shadow-[0_18px_40px_-12px_rgba(15,47,32,0.18)]">
                {services.map((s) => (
                  <li key={s.id}>
                    {/* Plain anchor on purpose: the tabs listen for `hashchange`, which <Link> doesn't fire. */}
                    <a
                      href={`/#service-${s.id}`}
                      className="block rounded-md px-3 py-2.5 transition-colors hover:bg-brand-tint"
                    >
                      <span className="block text-[0.95rem] font-semibold text-brand">{s.name}</span>
                      <span className="block text-sm text-muted">{s.short}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={linkClass}
              activeClassName="text-brand! font-semibold underline decoration-accent decoration-2 underline-offset-[10px]"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact" className="hidden px-5 py-2.5 sm:inline-flex">
            Apply for Loan
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
