/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "unsplash.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
