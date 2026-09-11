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
  title: `GPT-6 Astra 3D Examples — ${count} Blender & Three.js 案例 | Astra 3D Atlas`,
  description: `浏览 ${count} 个 GPT-6 Astra 三维案例：Blender 模型、Three.js 游戏、建筑和交互场景。按源码、演示入口与完整视频筛选，附原作者、公开提示词和工程。`,
  alternates: {
    canonical: 'https://carpentry-liu.github.io/awesome-astra-3d/',
  },
  robots: { index: true, follow: true },
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
