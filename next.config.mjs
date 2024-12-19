/** @type {import('next').NextConfig} */

const withPWA = import("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {};

module.exports = withPWA(nextConfig);
