// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // 👈 expose the secret to the middleware
  },
   images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
