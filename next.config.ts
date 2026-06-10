import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server (and its HMR / internal resources) to be loaded from
  // a phone on the same Wi-Fi via the machine's LAN IP. Without this, Next.js 16
  // treats http://192.168.x.x:3000 as a cross-origin dev request and blocks the
  // dev runtime, so the page renders but never hydrates (content stays hidden).
  // If your PC's IP changes, add it here (run `ipconfig` to check).
  allowedDevOrigins: [
    "192.168.0.108",
    "192.168.0.*",
    "192.168.1.*",
    "10.0.0.*",
  ],
};

export default nextConfig;
