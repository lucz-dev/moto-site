import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the user's home makes Turbopack pick it as the
  // workspace root; pin the root to this project.
  turbopack: {
    root: path.join(__dirname),
  },
  // The root layout is app/[lang]/layout.tsx, so unmatched URLs need app/global-not-found.tsx.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
