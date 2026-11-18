import type { Metadata } from 'next';
import './globals.css';
import './catalog.css';
import './video.css';
import './discovery.css';
import './welcome.css';
import './gallery.css';
import cases from '@/data/catalog-index.json';
import { SITE_URL } from '@/src/site.mjs';
const shareImage = new URL('share.jpg', SITE_URL).href;
const title = 'GPT-6.2 Astra, GPT-6 Astra & Fable 5.2 3D Examples | Astra 3D Atlas';
const astraCount = cases.filter((c) => c.group === 'astra').length;
const fableCount = cases.filter((c) => c.group === 'fable').length;
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: `浏览 ${astraCount} 个 GPT-6 / 6.2 Astra 三维案例与 ${fableCount} 个 Claude Fable 5.2 案例。查看 Blender 工程、Three.js 演示、完整录像、原作者过程与 GPT-Image-2.6 GIF 动图。`,
  alternates: {
    canonical: SITE_URL,
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Astra 3D Atlas',
    title,
    description: 'Explore public Blender projects, Three.js demos and complete creator recordings, plus native GPT-Image-2.6 GIF loops.',
    url: SITE_URL,
    images: [{url:shareImage,alt:'Astra 3D Atlas — actual gallery preview'}],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: 'Public project links, playable demos, complete clips and original creator records.',
    images: [shareImage],
  },
  icons: { icon: './favicon.svg' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="dark">
      <body>{children}</body>
    </html>
  );
}
