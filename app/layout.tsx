import type { Metadata } from 'next';
import './globals.css';
import './catalog.css';
import './video.css';
import './discovery.css';
import './welcome.css';
import './gallery.css';
import cases from '@/data/cases.json';
const count = cases.filter((c) => c.group === 'astra').length;
export const metadata: Metadata = {
  metadataBase: new URL('https://carpentry-liu.github.io/awesome-astra-3d/'),
  title: `GPT-6 Astra 3D Examples — ${count} Blender & Three.js 案例 | Astra 3D Atlas`,
  description: `浏览 ${count} 个 GPT-6 Astra 三维案例：Blender、Houdini、Rhino、Three.js、Godot、CAD 与空间重建。按源码、演示入口与完整视频筛选，附原作者、公开提示词和工程。`,
  alternates: {
    canonical: 'https://carpentry-liu.github.io/awesome-astra-3d/',
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Astra 3D Atlas',
    title: 'Awesome GPT-6 Astra 3D — Projects, Demos & Complete Videos',
    description: 'Explore public Blender projects, interactive worlds, browser games and complete source clips. Follow original creators and start from available materials.',
    url: 'https://carpentry-liu.github.io/awesome-astra-3d/',
    images: [{url:'https://carpentry-liu.github.io/awesome-astra-3d/share.jpg',alt:'Astra 3D Atlas — actual gallery preview'}],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awesome GPT-6 Astra 3D — Projects, Demos & Complete Videos',
    description: 'Public project links, playable demos, complete clips and original creator records.',
    images: ['https://carpentry-liu.github.io/awesome-astra-3d/share.jpg'],
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
