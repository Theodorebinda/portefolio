/** @type {import('next').NextConfig} */

import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true, // Active strict mode
  // Optimisations de performance
  swcMinify: true, // Utilise SWC pour la minification (plus rapide que Terser)
  compress: true, // Active la compression Gzip
  poweredByHeader: false, // Cache le header X-Powered-By
  // Optimisation des images
  images: {
    formats: ['image/avif', 'image/webp'], // Formats modernes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', 
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photos.app.goo.gl', 
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
        hostname: 'scontent.ffih1-2.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-jnb2-1.xx.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photos.fife.usercontent.google.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Optimisation du bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Optimisation des exports
  output: 'standalone',
  // Optimisation webpack pour réduire le bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimisation pour réduire le bundle client
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Grouper styled-components
            styledComponents: {
              name: 'styled-components',
              test: /[\\/]node_modules[\\/]styled-components[\\/]/,
              chunks: 'all',
              priority: 10,
            },
            // Grouper framer-motion
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 10,
            },
            // Grouper react-icons
            reactIcons: {
              name: 'react-icons',
              test: /[\\/]node_modules[\\/]react-icons[\\/]/,
              chunks: 'all',
              priority: 10,
            },
            // Grouper lucide-react
            lucideReact: {
              name: 'lucide-react',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: 'all',
              priority: 10,
            },
            // Grouper les autres vendor
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 5,
            },
          },
        },
      };
    }
    return config;
  },
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons', 'styled-components'],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
