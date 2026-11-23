"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, services, site } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { NavLink } from "@/components/ui/NavLink";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape (returning focus to the toggle) and when resizing up to desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const close = () => setOpen(false);
  const itemClass = "block rounded-md px-3 py-3 text-base font-medium text-brand transition-colors hover:bg-brand-tint";

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-md border border-line text-brand transition-colors hover:bg-brand-tint"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-line bg-white shadow-lg"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-[1360px] px-5 pb-6 pt-3 md:px-10">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.id}>
                {/* Plain anchor: the service tabs listen for `hashchange`, which <Link> doesn't fire. */}
                <a href={`/#service-${s.id}`} onClick={close} className={itemClass}>
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="my-3 h-px bg-line" />
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  onClick={close}
                  className={itemClass}
                  activeClassName="bg-brand-tint border-l-4 border-accent"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ButtonLink href="/contact" onClick={close}>
              Apply for Loan
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneTel}`} variant="outline" onClick={close}>
              <Phone aria-hidden="true" className="size-4" />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
