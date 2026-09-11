/* oxlint-disable next/no-img-element -- Original creator media is displayed with attribution. */
'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Play, Layers3 } from 'lucide-react';
import { type Case } from '@/src/catalog';

const spotlights = [
  {
    id: 'xinz-xianlin-campus',
    credit: 'super-xinz',
    name: '把一座校园，存进三维世界',
    label: '建筑摄影',
    note: '仙林校园 · Blender 工程与 38 秒漫游',
  },
  {
    id: 'nick-op1-houdini',
    credit: '@_nscr',
    name: '从参考照片，到合成器的每个旋钮',
    label: 'Houdini 建模',
    note: 'OP-1 Field · 产品建模与材质练习',
  },
  {
    id: 'miya-komorebi-market',
    credit: '@miya00907380',
    name: '走进参考图里的那条小街',
    label: 'Three.js 街市',
    note: '三维街景与既有游戏角色的相遇',
  },
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
    .map((c) => c.addedAt)
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
              onClick={() => onExplore('all')}
            >
              探索案例 <ArrowRight size={18} />
            </a>
            <a
              href="#collection"
              className="latest-link"
              onClick={() => onExplore('all', 'newest')}
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
          <a key={value} href="#collection" onClick={() => onExplore(value)}>
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
