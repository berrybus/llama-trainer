/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/llama-trainer",
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
