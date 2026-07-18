import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: { bodySizeLimit: "10mb" } },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chateau-image.sfo3.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
