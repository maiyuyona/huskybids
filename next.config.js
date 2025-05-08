/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable the pages directory
  pageExtensions: ['jsx', 'js'],
  
  // Disable experimental features
  experimental: {},
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 60,
  },
  
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Enable HTTP compression
  compress: true,
  
  // Optimize fonts
  optimizeFonts: true,
  
  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
