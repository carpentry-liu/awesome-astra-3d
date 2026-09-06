import type { Metadata } from 'next';
import './globals.css';
import './catalog.css';
import './video.css';
export const metadata: Metadata = { title: 'Astra 3D Atlas — GPT-6 Astra 三维作品档案', description: '收集可溯源的 GPT-6 Astra 3D 建模、交互场景、建筑与游戏案例，附原作者、证据、公开提示词与源码。' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="zh-CN" className="dark"><body>{children}</body></html>;}
