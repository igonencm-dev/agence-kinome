import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    // path.resolve() sans argument = cwd = racine du projet pendant build/dev.
    // (Évite __dirname, indéfini quand Next 16 charge ce config en ESM sous Node 24.)
    root: path.resolve(),
  },
};

export default nextConfig;
