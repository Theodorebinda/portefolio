/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // Active strict mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Doit être une chaîne
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // Ajoutez comme un autre objet
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com', // Ajoutez comme un autre objet
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-jnb2-1.xx.fbcdn.net', // Ajoutez comme un autre objet
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
