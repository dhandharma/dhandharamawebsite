"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { services, type ServiceId } from "@/lib/site";
import { images } from "@/lib/images";
import { ButtonLink } from "@/components/ui/Button";

const ids = services.map((s) => s.id);

/**
 * Accessible tabs (WAI-ARIA tabs pattern). Every panel stays in the DOM so the content is
 * crawlable; inactive panels are `hidden`. Also reacts to #service-<id> deep links.
 */
export function ServicesTabs() {
  const [active, setActive] = useState<ServiceId>("gold");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#service-", "") as ServiceId;
      if (window.location.hash.startsWith("#service-") && ids.includes(id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = ids.indexOf(active);
    const next =
      e.key === "ArrowRight" ? (i + 1) % ids.length
      : e.key === "ArrowLeft" ? (i - 1 + ids.length) % ids.length
      : e.key === "Home" ? 0
      : e.key === "End" ? ids.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(ids[next]);
    tabRefs.current[ids[next]]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Loan services"
        onKeyDown={onKeyDown}
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-4 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((s) => {
          const selected = s.id === active;
          return (
            <button
              key={s.id}
              id={`service-${s.id}`}
              ref={(el) => {
                tabRefs.current[s.id] = el;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`service-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(s.id)}
              className={`shrink-0 rounded-md border px-5 py-3 text-[0.95rem] font-semibold transition-colors duration-200 ${
                selected
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-muted hover:border-brand/40 hover:text-brand"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {services.map((s) => (
        <div
          key={s.id}
          role="tabpanel"
          id={`service-panel-${s.id}`}
          aria-labelledby={`service-${s.id}`}
          hidden={s.id !== active}
          className="mt-4 grid items-stretch overflow-hidden rounded-lg border border-line bg-white lg:grid-cols-12"
        >
          <div className="flex flex-col gap-7 p-6 sm:p-9 lg:col-span-6 lg:p-12">
            <div className="flex flex-col gap-3">
              <p className="self-start rounded bg-brand-tint px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand">
                {s.eyebrow}
              </p>
              <h3 className="font-serif text-[2rem] leading-tight tracking-tight text-brand">{s.headline}</h3>
              <p className="text-lg font-medium text-accent-text">{s.lead}</p>
              <p className="leading-7 text-muted">{s.body}</p>
            </div>

            <dl className="grid grid-cols-2 gap-3">
              {s.facts.map((fact) => (
                <div key={fact.label} className="rounded-md border border-line bg-paper p-4">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                  <dd className="mt-1 font-semibold leading-snug text-brand">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <ButtonLink href="/contact" variant="dark">
                {s.cta}
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-64 bg-brand-soft lg:col-span-6 lg:min-h-[26rem]">
            <Image
              src={images[s.image]}
              alt={s.imageAlt}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              style={{ objectPosition: s.imagePosition }}
              className="object-cover"
            />
          </div>
        </div>
      ))}

      <p className="mt-6 text-sm text-muted">
        Not sure which loan fits?{" "}
        <Link href="/contact" className="font-semibold text-brand underline decoration-accent decoration-2 underline-offset-4">
          Ask an advisor
        </Link>
        .
      </p>
    </div>
  );
}
