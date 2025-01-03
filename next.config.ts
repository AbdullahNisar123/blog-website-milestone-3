/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // Add this to allow Sanity-hosted images
  },
};

module.exports = nextConfig;
