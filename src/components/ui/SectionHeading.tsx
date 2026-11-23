import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  /** Use on dark (brand green) backgrounds. */
  onDark?: boolean;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, onDark = false, as: Tag = "h2", className = "" }: SectionHeadingProps) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] ${
          onDark ? "text-accent" : "text-accent-text"
        }`}
      >
        <span aria-hidden="true" className={`h-px w-8 ${onDark ? "bg-accent/60" : "bg-accent-text/50"}`} />
        {eyebrow}
      </p>
      <Tag className={`font-serif text-title ${onDark ? "text-white" : "text-brand"}`}>{title}</Tag>
    </div>
  );
}
