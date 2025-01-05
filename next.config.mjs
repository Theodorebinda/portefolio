/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // Active strict mode
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
