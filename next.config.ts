import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Optional — helps with new app directory and static optimization
  experimental: {
    optimizePackageImports: ["@headlessui/react", "@heroicons/react"], // example
  },
};

export default nextConfig;
