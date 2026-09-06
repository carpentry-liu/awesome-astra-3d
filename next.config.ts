import type { NextConfig } from 'next';

const nextConfig: NextConfig = { output: 'export', images: { unoptimized: true }, basePath: process.env.GITHUB_PAGES === 'true' ? '/awesome-astra-3d' : '' };

export default nextConfig;
