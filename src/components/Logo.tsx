import Image from "next/image";
import { site } from "@/lib/site";

// public/logo.png is the uploaded brand logo with its empty white margin trimmed (aspect 1070:618).
const RATIO = { width: 720, height: 416 };

/** Brand logo. The artwork has an opaque white background, so keep it on white. */
export function Logo({ className = "h-12 lg:h-16", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt={`${site.name} logo`}
      width={RATIO.width}
      height={RATIO.height}
      priority={priority}
      sizes="(min-width: 1024px) 100px, 84px"
      className={`w-auto ${className}`}
    />
  );
}
