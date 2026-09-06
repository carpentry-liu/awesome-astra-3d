import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 output: 'export',
 images: { unoptimized: true },
 // Pages already mounts the export at the repository path. Prefix asset URLs
 // without changing the route that vinext must prerender at build time.
 assetPrefix: process.env.GITHUB_PAGES === 'true' ? 'https://carpentry-liu.github.io/awesome-astra-3d' : '',
};

export default nextConfig;
