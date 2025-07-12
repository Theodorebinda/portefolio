/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // Active strict mode
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.ffih1-2.fna.fbcdn.net', // Doit être une chaîne
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
      {
        protocol: 'https',
        hostname: 'photos.fife.usercontent.google.com', // Ajoutez comme un autre objet
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
