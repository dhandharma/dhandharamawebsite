// Plain ESM (not next.config.ts) on purpose: Next.js compiles a TypeScript config with SWC
// every time `next start` boots, and the native SWC binary cannot load on the Hostinger server
// (it needs glibc >= 2.30). A .mjs config is loaded directly by Node, so the production server
// starts without needing any compiler.

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
