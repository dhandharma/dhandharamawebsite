"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link> & {
  /** Classes applied when this link points at the current page. */
  activeClassName?: string;
};

/** Link that marks itself as the current page (aria-current) when its path matches. Hash links never match. */
export function NavLink({ href, className = "", activeClassName = "", ...props }: NavLinkProps) {
  const pathname = usePathname();
  const target = typeof href === "string" ? href : (href.pathname ?? "");
  const active = !target.includes("#") && pathname === target;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : ""}`}
      {...props}
    />
  );
}
