/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

module.exports = {
  exportTrailingSlash: true,
  outdir: 'out'
};

