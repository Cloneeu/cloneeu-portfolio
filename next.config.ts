import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
    unoptimized: true,
  },
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
