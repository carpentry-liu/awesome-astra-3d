/* oxlint-disable next/no-img-element -- Original creator media is displayed with attribution. */
'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Play, Layers3 } from 'lucide-react';
import { type Case } from '@/src/catalog';

const spotlights = [
  { id: 'gptblender-floor-plan-house', credit: 'GPTBlender', name: '从一张平面图，走进完整房屋', label: 'Blender 场景 · GLB 工程', note: '四卧室住宅 · 模型下载与阶段回放' },
  { id: 'givros-forest-village', credit: 'Givros', name: '沿森林小径，寻找湖心村庄', label: 'Astra Light · 三维环境', note: 'Clairval · 42 秒完整场景录像' },
  { id: 'fuguai-windfield-editor', credit: 'ふぐあい', name: '让冒险世界，拥有编辑入口', label: '三维游戏 · 地形编辑原型', note: 'Windfield · 风车、塔楼与人物' },
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
