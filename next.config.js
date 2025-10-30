/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: { serverActions: true },
  webpack: (config) => {
    // Alias '@' => raíz del proyecto
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};

module.exports = nextConfig;
