import type { NextConfig } from 'next';
import { SITE_URL } from './src/site.mjs';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Pages already mounts the export at the repository path. Prefix asset URLs
  // without changing the route that vinext must prerender at build time.
  assetPrefix:
    process.env.GITHUB_PAGES === 'true'
      ? SITE_URL.slice(0, -1)
      : '',
};

export default nextConfig;
