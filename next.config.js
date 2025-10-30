/** @type {import('next').NextConfig} */
const nextConfig = {
  // Clean production config - no experimental flags needed for Next.js 14
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
