/* oxlint-disable next/no-img-element -- Original creator media is displayed with attribution. */
'use client';
import { useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Play,
  Layers3,
  Star,
  Box,
  Gamepad2,
  Building2,
  Workflow,
} from 'lucide-react';
import { caseHref, type CaseIndex, type Locale } from '@/src/catalog';
import { messages, workTitle } from '@/src/i18n';
import { collectionHref, navigateToSection } from '@/src/section-navigation';

const github = 'https://github.com/carpentry-liu/awesome-astra-3d';
const spotlights = [
  {
    id: 'simonw-pelican-bicycle',
    name: [
      '三轮对话，一只骑车的鹈鹕',
      'A pelican, a bicycle, three iterations',
    ],
    label: 'BLENDER · .BLEND',
    note: [
      '可编辑工程 · Python 脚本与完整对话',
      'Editable project · Python scripts & transcript',
    ],
  },
  {
    id: 'ruofeng-orbital-core',
    name: ['从 Blender，来到你的浏览器', 'From Blender to your browser'],
    label: 'GLB · THREE.JS',
    note: [
      '双环能量核心 · 模型与前端代码',
      'Orbital Core · Model & frontend code',
    ],
  },
  {
    id: 'peter-van-gogh-town',
    name: ['走进梵高画里的小镇', 'Walk into a painted world'],
    label: 'THREE.JS · WORLD',
    note: [
      '可连续漫步 · 原始单文件网页',
      'A walkable town · Original single-file page',
    ],
  },
  {
    id: 'scottstts-jelly-baby',
    name: ['拉伸、抛掷，和果冻玩一会儿', 'Stretch, throw and play with jelly'],
    label: 'THREE.JS · GAME',
    note: [
      '果冻角色游乐场 · 演示与源码',
      'Jelly Baby playground · Demo & source',
    ],
  },
  {
    id: 'bambssquad-jetis-digital-twin',
    name: ['从厂区图纸，走进三维空间', 'From factory plans to a 3D space'],
    label: 'DWG · DIGITAL TWIN',
    note: [
      '可漫游工厂 · 原生 SketchUp 导出流程',
      'Walkable factory · Native SketchUp export workflow',
    ],
  },
  {
    id: 'az9713-refined-animations',
    name: ['把二十秒，讲成一个故事', 'Tell a story in twenty seconds'],
    label: 'THREE.JS / TSL · ANIMATION',
    note: [
      '五个程序场景 · 源码与制作讲解',
      'Five procedural scenes · Code & process',
    ],
  },
];

export function Welcome({
  cases,
  locale,
  search,
  onOpen,
  onExplore,
}: {
  cases: CaseIndex[];
  locale: Locale;
  search: string;
  onOpen: (event: MouseEvent<HTMLAnchorElement>, item: CaseIndex) => void;
  onExplore: (resource: string, order?: string) => void;
}) {
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const t = messages[locale];
  const languageIndex = locale === 'en' ? 1 : 0;
  const astra = cases.filter((c) => c.group === 'astra');
  const latest =
    astra
      .map((c) => c.addedAt)
      .sort()
      .at(-1) ?? '';
  const resources = [
    { value: 'all', count: astra.length, label: t.astra, icon: Layers3 },
    {
      value: 'source',
      count: astra.filter((c) => c.repositoryUrl).length,
      label: t.source,
      icon: Code2,
    },
    {
      value: 'demo',
      count: astra.filter((c) => c.demoUrl).length,
      label: t.demo,
      icon: ArrowUpRight,
    },
    {
      value: 'video',
      count: astra.reduce((n, c) => n + (c.archivedVideos?.length ?? 0), 0),
      label: t.video,
      icon: Play,
    },
  ];
  const starts = [
    {
      anchor: 'blender',
      icon: Box,
      title: t.blenderTitle,
      materials: t.blenderNote,
      step: t.blenderStep,
    },
    {
      anchor: 'web',
      icon: Code2,
      title: t.webTitle,
      materials: t.webNote,
      step: t.webStep,
    },
    {
      anchor: 'game',
      icon: Gamepad2,
      title: t.gameTitle,
      materials: t.gameNote,
      step: t.gameStep,
    },
  ];
  const topics = [
    {
      slug: 'blender',
      icon: Box,
      title: t.topicBlender,
      note: t.topicBlenderNote,
    },
    {
      slug: 'browser-games',
      icon: Gamepad2,
      title: t.topicGames,
      note: t.topicGamesNote,
    },
    {
      slug: 'architecture',
      icon: Building2,
      title: t.topicArchitecture,
      note: t.topicArchitectureNote,
    },
    {
      slug: 'exploded',
      icon: Workflow,
      title: t.topicExploded,
      note: t.topicExplodedNote,
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
              {t.hero}
              <span>{t.heroAccent}</span>
            </h1>
            <p className="welcome-description">{t.description}</p>
          </div>
          <div className="welcome-actions">
            <a
              href={collectionHref('all', 'curated', search)}
              className="primary-link"
              onClick={(event) => {
                if (navigateToSection(event, 'collection')) onExplore('all');
              }}
            >
              {t.explore} <ArrowRight size={18} />
            </a>
            <a
              href={collectionHref('all', 'newest', search)}
              className="latest-link"
              onClick={(event) => {
                if (navigateToSection(event, 'collection'))
                  onExplore('all', 'newest');
              }}
            >
              {t.latest} <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <nav className="resource-paths" aria-label={t.allMaterials}>
          {resources.map(({ value, count, label, icon: Icon }) => (
            <a
              key={value}
              href={collectionHref(value, 'curated', search)}
              onClick={(event) => {
                if (navigateToSection(event, 'collection')) onExplore(value);
              }}
            >
              <Icon size={19} />
              <strong>{count}</strong>
              <span>{label}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
        <div className="featured-heading">
          <span>
            {t.picks} <span className="featured-divider">/</span> SIX STARTING
            POINTS
          </span>
          <span>
            {t.updated} {latest.replaceAll('-', '.')}
          </span>
        </div>
        <div className="featured-grid">
          {spotlights.map((entry, index) => {
            const item = astra.find((c) => c.id === entry.id);
            if (!item) return null;
            const href = caseHref(item.id, locale);
            return (
              <article className="featured-work" key={entry.id}>
                <a
                  href={href}
                  className="featured-art"
                  onClick={(event) => onOpen(event, item)}
                  aria-label={`${t.openArchive}: ${workTitle(item, locale)}`}
                >
                  {item.imageUrl && !failedImages.includes(item.id) ? (
                    <img
                      src={item.imageUrl}
                      alt={item.imageCaption}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((ids) => [...ids, item.id])
                      }
                    />
                  ) : (
                    <div className="spotlight-fallback">
                      <Layers3 size={40} />
                      <span>{t.openArchive}</span>
                    </div>
                  )}
                  <span className="featured-label">{entry.label}</span>
                  <span className="featured-arrow">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
                <div className="featured-caption">
                  <h2>
                    <a href={href} onClick={(event) => onOpen(event, item)}>
                      {entry.name[languageIndex]}
                    </a>
                  </h2>
                  <p>{entry.note[languageIndex]}</p>
                  <div className="featured-credit">
                    <span>
                      {item.author} · {t.preview}
                    </span>
                    {item.demoUrl ? (
                      <a href={item.demoUrl} target="_blank" rel="noreferrer">
                        {t.openDemo} <ArrowUpRight size={14} />
                      </a>
                    ) : (
                      <a href={href} onClick={(event) => onOpen(event, item)}>
                        {t.process} <ArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="starter-paths" aria-labelledby="starter-title">
        <div className="path-heading">
          <h2 id="starter-title">{t.startTitle}</h2>
          <p>{t.startNote}</p>
        </div>
        <div className="starter-grid">
          {starts.map(
            ({ anchor, icon: Icon, title, materials, step }, index) => (
              <a
                className="starter-card"
                key={anchor}
                href={`${github}/blob/main/START_HERE${locale === 'en' ? '.en' : ''}.md#${anchor}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="path-number">
                  0{index + 1}
                  <Icon size={22} />
                </span>
                <h3>{title}</h3>
                <p className="path-materials">{materials}</p>
                <p className="path-step">{step}</p>
                <span className="path-action">
                  {t.firstStep}
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ),
          )}
        </div>
        <p className="materials-disclaimer">{t.materialNote}</p>
      </section>
      <section className="topic-paths" aria-labelledby="topics-title">
        <div className="path-heading">
          <h2 id="topics-title">{t.topics}</h2>
          <p>{t.topicsNote}</p>
        </div>
        <div className="topic-grid">
          {topics.map(({ slug, icon: Icon, title, note }) => (
            <a
              key={slug}
              href={`./${locale === 'en' ? 'en/' : ''}topics/${slug}/`}
            >
              <Icon size={22} />
              <span>
                <strong>{title}</strong>
                <small>{note}</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>
      <aside className="star-invitation">
        <div>
          <strong>{t.starTitle}</strong>
          <p>{t.starNote}</p>
        </div>
        <a href={github} target="_blank" rel="noreferrer">
          <Star size={18} />
          {t.star}
          <ArrowUpRight size={16} />
        </a>
      </aside>
    </>
  );
}
