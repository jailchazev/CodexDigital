/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server output is required for the authenticated SUNAT API routes.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
