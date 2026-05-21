/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Serve local image folders (Images/, Products/, ceteogry/, etc.) via API route
  // so they work without moving them into public/
  async rewrites() {
    const dirs = ['Images', 'Products', 'ceteogry', 'News', 'Certificate'];
    return dirs.map(dir => ({
      source: `/${dir}/:path*`,
      destination: `/api/static/${dir}/:path*`,
    }));
  },
};

export default nextConfig;
