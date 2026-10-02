/* oxlint-disable next/no-img-element -- Original creator media is displayed with attribution. */
'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Play, Layers3 } from 'lucide-react';
import { type Case } from '@/src/catalog';
import { navigateToSection } from '@/src/section-navigation';

const spotlights = [
  { id: 'chatgpttest-coastal-cat-memory-off', credit: 'ChatGPT-Test', name: '骑着海风，去看看世界', label: 'Three.js · 海边骑行', note: '10 月 2 日独立实验 · Astra B 组' },
  { id: 'bambssquad-jetis-digital-twin', credit: 'bambssquad', name: '从厂区图纸，走进三维空间', label: 'DWG · 工厂数字孪生', note: '可漫游场景 · 原生 SketchUp 导出流程' },
  { id: 'az9713-refined-animations', credit: 'az9713', name: '把二十秒，讲成一个故事', label: 'Three.js / TSL · 三维动画', note: '五个程序场景 · 源码与制作讲解' },
];
export function Welcome({
  cases,
  onOpen,
  onExplore,
}: {
  cases: Case[];
  onOpen: (item: Case) => void;
  onExplore: (resource: string, order?: string) => void;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const astra = cases.filter((c) => c.group === 'astra');
  const latest = astra
    .map((c) => c.observedAt)
    .sort()
    .at(-1)!;
  const resources = [
    { value: 'all', count: astra.length, label: 'Astra 案例', icon: Layers3 },
    {
      value: 'source',
      count: astra.filter((c) => c.repositoryUrl).length,
      label: '源码 / 工程',
      icon: Code2,
    },
    {
      value: 'demo',
      count: astra.filter((c) => c.demoUrl).length,
      label: '演示入口',
      icon: ArrowUpRight,
    },
    {
      value: 'video',
      count: astra.reduce((n, c) => n + (c.archivedVideos?.length ?? 0), 0),
      label: '完整视频',
      icon: Play,
    },
  ];
  return (
    <>
      <section className="welcome" aria-labelledby="welcome-title">
        <div className="welcome-intro">
          <div>
            <p className="eyebrow">
              <span className="live-dot" /> THE OPEN 3D COLLECTION
            </p>
            <h1 id="welcome-title">
              让下一次创作，<span>从这里开始。</span>
            </h1>
            <p className="welcome-description">
              探索 GPT-6 Astra
              的空间、游戏与模型。找到作品，也找到作者、工程和创作过程。
            </p>
          </div>
          <div className="welcome-actions">
            <a
              href="#collection"
              className="primary-link"
              onClick={(event) => { if (navigateToSection(event, 'collection')) onExplore('all'); }}
            >
              探索案例 <ArrowRight size={18} />
            </a>
            <a
              href="#collection"
              className="latest-link"
              onClick={(event) => { if (navigateToSection(event, 'collection')) onExplore('all', 'newest'); }}
            >
              最新收录 <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="featured-heading">
          <span>
            本期精选 <span className="featured-divider">/</span> EDITOR&apos;S PICKS
          </span>
          <span>更新于 {latest.replaceAll('-', '.')}</span>
        </div>
        <div className="featured-grid">
          {spotlights.map((entry, index) => {
            const item = astra.find((c) => c.id === entry.id)!;
            return (
              <article className="featured-work" key={entry.id}>
                <button
                  className="featured-art"
                  onClick={() => onOpen(item)}
                  aria-label={`查看精选案例：${item.title}`}
                >
                  {item.imageUrl && !failedImages.includes(item.id) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.imageCaption}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((ids) => [...ids, item.id])
                      }
                    />
                  ) : (
                    <div className="spotlight-fallback">
                      <Layers3 size={40} />
                      <span>查看作者作品</span>
                    </div>
                  )}
                  <span className="featured-label">{entry.label}</span>
                  <span className="featured-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </button>
                <div className="featured-caption">
                  <h2>
                    <button onClick={() => onOpen(item)}>{entry.name}</button>
                  </h2>
                  <p>{entry.note}</p>
                  <div className="featured-credit">
                    <span>{entry.credit} · 作者作品预览</span>
                    {item.demoUrl ? (
                      <a href={item.demoUrl} target="_blank" rel="noreferrer">
                        打开演示 <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <button onClick={() => onOpen(item)}>
                        创作过程 <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <nav className="resource-paths" aria-label="探索作品资源">
        {resources.map(({ value, count, label, icon: Icon }) => (
          <a key={value} href="#collection" onClick={(event) => { if (navigateToSection(event, 'collection')) onExplore(value); }}>
            <Icon size={19} />
            <strong>{count}</strong>
            <span>{label}</span>
            <ArrowUpRight size={16} />
          </a>
        ))}
      </nav>
    </>
  );
}
