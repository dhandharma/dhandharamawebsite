import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "accent" | "dark" | "outline" | "outlineLight";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[0.95rem] font-semibold tracking-[0.01em] transition duration-200 active:translate-y-px focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  accent: "bg-accent text-brand hover:bg-accent-hover shadow-sm",
  dark: "bg-brand text-white hover:bg-brand-soft shadow-sm",
  outline: "border border-brand/25 text-brand hover:border-brand hover:bg-brand-tint",
  outlineLight: "border border-white/30 text-white hover:border-white/70 hover:bg-white/10",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

/** Anchor/Link styled as a button. Use for navigation and tel: links. */
export function ButtonLink({ variant = "accent", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
  className?: string;
};

export function Button({ variant = "accent", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
