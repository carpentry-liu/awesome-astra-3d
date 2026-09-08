/* oxlint-disable next/no-img-element -- Original creator media is displayed with attribution. */
'use client';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Code2, Play, Layers3 } from 'lucide-react';
import { type Case } from '@/src/catalog';

const spotlights = [
  {
    id: 'openai-solace-garden-house',
    name: 'SOLACE',
    subtitle: '从建筑概念，到可以走入的空间',
    label: '01 / 建筑空间',
  },
  {
    id: 'openai-sunwake',
    name: 'SUNWAKE',
    subtitle: '在实时海浪中，驶向最后一束光',
    label: '02 / 交互游戏',
  },
  {
    id: 'ruofeng-orbital-core',
    name: 'ORBITAL CORE',
    subtitle: '从 Blender 模型，到交互网页',
    label: '03 / 三维创作',
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
  const [active, setActive] = useState(0);
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const astra = cases.filter((c) => c.group === 'astra');
  const latest = astra
    .map((c) => c.addedAt)
    .sort((a, b) => a.localeCompare(b))
    .at(-1)!;
  const spotlight = spotlights[active];
  const item = astra.find((c) => c.id === spotlight.id)!;
  const resources = [
    {
      value: 'all',
      count: astra.length,
      label: 'Astra 案例',
      icon: Layers3,
      note: '按来源分级收录',
    },
    {
      value: 'source',
      count: astra.filter((c) => c.repositoryUrl).length,
      label: '源码 / 工程',
      icon: Code2,
      note: '打开项目，继续探索',
    },
    {
      value: 'demo',
      count: astra.filter((c) => c.demoUrl).length,
      label: '演示入口',
      icon: ArrowUpRight,
      note: '进入作者的三维世界',
    },
    {
      value: 'video',
      count: astra.reduce((n, c) => n + (c.archivedVideos?.length ?? 0), 0),
      label: '完整视频',
      icon: Play,
      note: '看清作品的动态细节',
    },
  ];
  return (
    <>
      <section className="welcome" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            THE OPEN 3D COLLECTION
          </p>
          <h1 id="welcome-title">
            想法有了
            <br />
            <span>三维的形状。</span>
          </h1>
          <p className="welcome-description">
            探索 GPT-6 Astra 创作的空间、游戏与模型。
            <br className="desktop-break" />
            从一件作品出发，找到作者、源码和创作过程。
          </p>
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
          <p className="welcome-date">
            持续整理的开放档案 <span>/</span> 更新于{' '}
            {latest.replaceAll('-', '.')}
          </p>
        </div>
        <div className="spotlight">
          <button
            className="spotlight-art"
            onClick={() => onOpen(item)}
            aria-label={`查看精选案例：${item.title}`}
          >
            {item.imageUrl && failedImage !== item.id ? (
              <img
                key={item.id}
                src={item.imageUrl}
                alt={item.imageCaption}
                fetchPriority="high"
                referrerPolicy="no-referrer"
                onError={() => setFailedImage(item.id)}
              />
            ) : (
              <div className="spotlight-fallback">
                <Layers3 size={48} />
                <span>查看作者作品与创作过程</span>
              </div>
            )}
            <span className="spotlight-kicker">
              FEATURED EXPLORATION <ArrowUpRight size={19} />
            </span>
            <span className="spotlight-caption">
              <span>{spotlight.name}</span>
              <small>{spotlight.subtitle}</small>
            </span>
          </button>
          <div className="spotlight-links">
            <button onClick={() => onOpen(item)}>
              查看作品档案 <ArrowRight size={14} />
            </button>
            {item.demoUrl ? (
              <a href={item.demoUrl} target="_blank" rel="noreferrer">
                打开演示 <ArrowUpRight size={14} />
              </a>
            ) : (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                阅读创作过程 <ArrowUpRight size={14} />
              </a>
            )}
          </div>
          <div className="spotlight-selector" aria-label="精选作品">
            {spotlights.map((entry, index) => (
              <button
                key={entry.id}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                {entry.label}
                <span />
              </button>
            ))}
          </div>
          <p className="spotlight-credit">
            {item.author} ·{' '}
            {item.imageKind === 'render'
              ? '作者场景渲染'
              : item.imageKind === 'source-media'
                ? '原帖视频封面'
                : '作者作品预览'}{' '}
            · 图片归原作者
          </p>
        </div>
      </section>
      <nav className="resource-paths" aria-label="探索作品资源">
        {resources.map(({ value, count, label, icon: Icon, note }) => (
          <a key={value} href="#collection" onClick={() => onExplore(value)}>
            <Icon size={19} />
            <div>
              <strong>
                {count.toString().padStart(2, '0')} <span>{label}</span>
              </strong>
              <p>{note}</p>
            </div>
            <ArrowUpRight size={17} />
          </a>
        ))}
      </nav>
    </>
  );
}
