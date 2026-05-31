import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow the placeholder logos served from the CDN used by the mock
    // data. Add real CDNs here when the backend lands.
    remotePatterns: [
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
    ],
  },
};

export default nextConfig;
