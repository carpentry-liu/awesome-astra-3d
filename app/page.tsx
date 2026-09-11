/* oxlint-disable next/no-img-element -- Source media stays on original hosts; no image proxy or transformations. */
'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  ArrowUpRight,
  Search,
  ArrowRight,
  Code2,
  Layers3,
  ExternalLink,
  Play,
  FileJson,
  Link2,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  filterCases,
  evidenceLabels,
  resourceLabels,
  readCatalogSearch,
  writeCatalogSearch,
  type Case,
} from '@/src/catalog';
import { registerCatalogTool } from '@/src/webmcp';
import casesData from '@/data/cases.json';
import { VideoPlayer, videoTime } from '@/src/video-player';
import { Welcome } from './welcome';

const allCases = casesData as Case[];
const github = 'https://github.com/carpentry-liu/awesome-astra-3d';
const latestAdded = allCases
  .map((c) => c.addedAt)
  .sort((a, b) => a.localeCompare(b))
  .at(-1)!;
const imageKinds: Record<string, string> = {
  illustration: '模型示意图',
  comparison: '对照媒体',
  'concept-art': '概念图',
  'generated-cover': '生成封面',
  'edited-screenshot': '编辑截图',
  'initial-output': '初始版本',
  'final-output': '完成版本',
  render: '场景渲染',
  'gameplay-screenshot': '实机截图',
  'source-media': '来源媒体',
  'author-screenshot': '作者作品图',
  'video-poster': '视频封面',
  'editorial-cover': '分享卡片',
};
function Preview({
  item,
  priority = false,
}: {
  item: Case;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return item.imageUrl && !failed ? (
    <img
      src={item.imageUrl}
      alt={`${item.title}${item.titleEn ? ' / ' + item.titleEn : ''}`}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="media-note">
      <span>{item.platform.toUpperCase()}</span>
      <Play size={28} />
      <p>{failed ? '图片加载失败' : '预览见原始来源'}</p>
      <small>保留作者发布的完整上下文 ↗</small>
    </div>
  );
}
function OutLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  const [query, setQuery] = useState(''),
    [group, setGroup] = useState('astra'),
    [category, setCategory] = useState('全部'),
    [platform, setPlatform] = useState('全部');
  const [resource, setResource] = useState('all'),
    [order, setOrder] = useState('curated'),
    [urlReady, setUrlReady] = useState(false),
    [shareMessage, setShareMessage] = useState('分享当前筛选');
  const [sharedFilters, setSharedFilters] = useState('');
  const filterSignature = JSON.stringify({
    query,
    group,
    category,
    platform,
    resource,
    order,
  });
  const [selected, setSelected] = useState<Case | null>(null),
    [copyMessage, setCopyMessage] = useState('复制案例链接');
  const astraCount = allCases.filter((c) => c.group === 'astra').length;
  const referenceCount = allCases.length - astraCount;
  const scoped = allCases.filter((c) => c.group === group);
  const categories = ['全部', ...new Set(scoped.map((c) => c.category))];
  const platforms = ['全部', ...new Set(scoped.map((c) => c.platform))];
  const cases = useMemo(
    () =>
      filterCases(allCases, {
        query,
        group,
        category,
        platform,
        resource,
        order,
      }),
    [query, group, category, platform, resource, order],
  );
  useEffect(() => {
    const sync = () => {
      const f = readCatalogSearch(window.location.search);
      setQuery(f.query);
      setGroup(f.group);
      setCategory(f.category);
      setPlatform(f.platform);
      setResource(f.resource);
      setOrder(f.order);
      setUrlReady(true);
    };
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  useEffect(() => {
    if (!urlReady) return;
    history.replaceState(
      history.state,
      '',
      window.location.pathname +
        writeCatalogSearch(window.location.search, {
          query,
          group,
          category,
          platform,
          resource,
          order,
        }) +
        window.location.hash,
    );
  }, [query, group, category, platform, resource, order, urlReady]);
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.hash.slice(1)).get('case');
      setSelected(allCases.find((c) => c.id === id) ?? null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => registerCatalogTool(allCases), []);
  function openCase(item: Case) {
    setSelected(item);
    setCopyMessage('复制案例链接');
    history.replaceState(null, '', `#case=${item.id}`);
  }
  function closeCase() {
    setSelected(null);
    history.replaceState(
      null,
      '',
      window.location.pathname + window.location.search,
    );
  }
  async function copyCase() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage('链接已复制');
    } catch {
      setCopyMessage('复制失败，请复制地址栏链接');
    }
  }
  async function copyCollection() {
    setSharedFilters(filterSignature);
    try {
      const url = new URL(window.location.href);
      url.search = writeCatalogSearch(url.search, {
        query,
        group,
        category,
        platform,
        resource,
        order,
      });
      url.hash = 'collection';
      await navigator.clipboard.writeText(url.href);
      setShareMessage('筛选链接已复制');
    } catch {
      setShareMessage('请复制地址栏分享');
    }
  }
  function changeGroup(value: unknown) {
    setGroup(String(value));
    setCategory('全部');
    setPlatform('全部');
    setQuery('');
    setResource('all');
    setOrder('curated');
  }
  const grid = (
    <div className="catalog-layout">
      <aside className="catalog-sidebar" aria-label="案例筛选">
        <h3>
          <Layers3 size={15} />
          作品类型
        </h3>
        <div className="filter-row" aria-label="按类型筛选">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? 'filter active' : 'filter'}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {c}
              <span>
                {c === '全部'
                  ? scoped.length
                  : scoped.filter((item) => item.category === c).length}
              </span>
            </button>
          ))}
        </div>
        <h3>
          <SlidersHorizontal size={15} />
          原始来源
        </h3>
        <div className="platforms" aria-label="按来源筛选">
          {platforms.map((p) => (
            <button
              aria-pressed={platform === p}
              className={platform === p ? 'selected' : ''}
              onClick={() => setPlatform(p)}
              key={p}
            >
              {p}
            </button>
          ))}
        </div>
        <p className="sidebar-note">
          每件作品均附原作者与来源。完整提示词和工程，以作者公开材料为准。
        </p>
      </aside>
      <div className="catalog-results">
        <div className="material-row">
          <div className="material-filters" aria-label="按可用材料筛选">
            {Object.entries(resourceLabels).map(([value, label]) => (
              <button
                key={value}
                aria-pressed={resource === value}
                className={resource === value ? 'material active' : 'material'}
                onClick={() => setResource(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="collection-tools">
            <button
              aria-pressed={order === 'newest'}
              onClick={() =>
                setOrder(order === 'newest' ? 'curated' : 'newest')
              }
            >
              {order === 'newest' ? '最新收录优先' : '按最新收录'}
            </button>
            <button onClick={copyCollection}>
              <Link2 size={14} />
              {sharedFilters === filterSignature
                ? shareMessage
                : '分享当前筛选'}
            </button>
          </div>
        </div>
        {resource === 'demo' && (
          <p className="resource-note">
            作者提供的演示入口；部分站点可能需要登录，未逐一独立试玩。
          </p>
        )}
        <div className="result-bar">
          <span aria-live="polite">
            <strong>{cases.length}</strong> 个结果 <i>/</i>{' '}
            {group === 'astra'
              ? '按来源分级收录 · 尚未独立复现'
              : '独立参考分组 · 不计入 Astra 数量'}
          </span>
        </div>
        {cases.length ? (
          <div className="case-grid">
            {cases.map((item, i) => (
              <article className="case-card" key={item.id}>
                <button
                  className="case-image"
                  onClick={() => openCase(item)}
                  aria-label={`查看案例：${item.title}`}
                >
                  <Preview item={item} priority={i < 3} />
                  <span className="image-index">
                    {String(scoped.indexOf(item) + 1).padStart(2, '0')} /{' '}
                    {item.category}
                  </span>
                  <span className="image-open">
                    <ArrowUpRight size={22} />
                  </span>
                  {item.archivedVideos?.length ? (
                    <span className="image-kind video-badge">
                      <Play size={12} />
                      完整视频 ·{' '}
                      {videoTime(item.archivedVideos[0].durationSeconds)}
                    </span>
                  ) : (
                    item.imageUrl && (
                      <span className="image-kind">
                        {imageKinds[item.imageKind] ?? '来源媒体'}
                      </span>
                    )
                  )}
                </button>
                <div className="card-content">
                  <p className="case-meta">
                    <span>{item.platform}</span>
                    <span className={`evidence ${item.evidenceLevel}`}>
                      {evidenceLabels[item.evidenceLevel]}
                    </span>
                    {item.addedAt === latestAdded && (
                      <span className="new-case">新收录</span>
                    )}
                    {item.outcome === 'failure' && (
                      <span className="failure">失败样本</span>
                    )}
                  </p>
                  <h3>
                    <button onClick={() => openCase(item)}>{item.title}</button>
                  </h3>
                  <p className="case-summary">{item.summary}</p>
                  <div className="tags">
                    {item.outputType.slice(0, 2).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="card-resources">
                    {item.repositoryUrl && (
                      <OutLink href={item.repositoryUrl}>
                        <Code2 size={14} />
                        源码 / 工程
                      </OutLink>
                    )}
                    {item.demoUrl && (
                      <OutLink href={item.demoUrl}>
                        <ArrowUpRight size={14} />
                        打开演示
                      </OutLink>
                    )}
                  </div>
                  <div className="card-bottom">
                    <span>{item.author ?? '作者未核实'}</span>
                    <button onClick={() => openCase(item)}>
                      查看档案 <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty">
            <Search size={30} />
            <h3>没有匹配的案例</h3>
            <p>试试 Blender、Three.js 或作者名称。</p>
            <button
              onClick={() => {
                setQuery('');
                setCategory('全部');
                setPlatform('全部');
                setResource('all');
              }}
            >
              <RotateCcw size={15} />
              清除筛选
            </button>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <main id="top">
      <a className="skip-link" href="#collection">
        跳转到案例索引
      </a>
      <header className="masthead">
        <a className="brand" href="#top" aria-label="Astra 3D Atlas 首页">
          <span className="brand-mark">
            <Box size={23} />
          </span>
          <span>
            ASTRA<span className="brand-light"> / 3D ATLAS</span>
          </span>
        </a>
        <nav>
          <a href="#collection">探索案例</a>
          <OutLink
            className="starter-link"
            href={`${github}/blob/main/START_HERE.md`}
          >
            上手路线
          </OutLink>
          <OutLink
            className="nav-contribute"
            href={`${github}/issues/new?template=case.yml`}
          >
            贡献案例
          </OutLink>
          <OutLink href={github}>
            <Code2 size={17} /> GitHub <ArrowUpRight size={14} />
          </OutLink>
        </nav>
      </header>
      <Welcome
        cases={allCases}
        onOpen={openCase}
        onExplore={(nextResource, nextOrder = 'curated') => {
          setGroup('astra');
          setQuery('');
          setCategory('全部');
          setPlatform('全部');
          setResource(nextResource);
          setOrder(nextOrder);
        }}
      />
      <section id="collection" className="collection">
        <div className="collection-head">
          <div>
            <Layers3 size={19} />
            <h2>探索作品</h2>
            <p className="collection-subtitle">让下一次创作，有一个起点。</p>
          </div>
          <label className="search" htmlFor="case-search">
            <Search size={18} />
            <Input
              id="case-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索作品、作者、工具…"
              aria-label="搜索案例"
              disabled={group === 'about'}
            />
          </label>
        </div>
        <Tabs
          value={group}
          onValueChange={changeGroup}
          className="catalog-tabs"
        >
          <TabsList variant="line" className="group-tabs">
            <TabsTrigger value="astra">
              Astra 案例 <span>{astraCount}</span>
            </TabsTrigger>
            <TabsTrigger value="reference">
              方法参考 <span>{referenceCount}</span>
            </TabsTrigger>
            <TabsTrigger value="about">收录说明</TabsTrigger>
          </TabsList>
          <TabsContent value="astra">{grid}</TabsContent>
          <TabsContent value="reference">
            <p className="reference-notice">
              来自两个参考仓库的构图与提示词方法。3D
              风格图片与可编辑三维资产分别记录；模型归属不明的保留原说明。
            </p>
            {grid}
          </TabsContent>
          <TabsContent value="about">
            <section className="about">
              <div>
                <p className="eyebrow">HOW WE CURATE</p>
                <h2>每条作品，都有出处。</h2>
                <p>
                  这里记录公开作品、生成过程与可获得的产物。案例收录不代表效果保证，也不代表我们已经独立复现。
                </p>
                <h3>证据怎么读</h3>
                <dl className="evidence-guide">
                  <dt>官方展示</dt>
                  <dd>OpenAI 作品详情明确标注 Astra。</dd>
                  <dt>作者自述</dt>
                  <dd>可读取的作者原帖、文章或仓库明确写出模型。</dd>
                  <dt>转引待复核</dt>
                  <dd>X 原页访问受限，依据作者文字的镜像、引文或整理页。</dd>
                  <dt>方法参考</dt>
                  <dd>两个参考仓库里的图片与提示词，不纳入 Astra 数量。</dd>
                </dl>
                <h3>提示词和素材</h3>
                <p>
                  只摘录短句或提供中文摘要；完整提示词请回到作者原文。图片引用来源网站。X
                  案例附完整视频，播放器使用原平台提供的较小清晰度版本，可另行下载最高画质；均未裁剪或转码。概念图、编辑封面和实机截图分别标注。
                </p>
              </div>
              <div>
                <h3>检索覆盖 · {latestAdded.replaceAll('-', '.')}</h3>
                <ul className="coverage">
                  <li>
                    <b>OpenAI / GitHub</b>
                    <span>逐页核对模型标签、源码及原始链接。</span>
                  </li>
                  <li>
                    <b>X / Twitter</b>
                    <span>保留原帖，原页受限的展示转引证据。</span>
                  </li>
                  <li>
                    <b>Reddit / YouTube / 个人网站</b>
                    <span>收录作者作品、制作过程、对照及失败样本。</span>
                  </li>
                  <li>
                    <b>Bilibili / 中文与日文媒体</b>
                    <span>
                      收录建模、动画与交互实践；转载用于发现原始作者，不重复计数。
                    </span>
                  </li>
                </ul>
                <h3>参考与贡献</h3>
                <OutLink
                  className="reference-link"
                  href="https://github.com/freestylefly/awesome-gpt-image-2"
                >
                  freestylefly / awesome-gpt-image-2 <ArrowUpRight size={16} />
                </OutLink>
                <OutLink
                  className="reference-link"
                  href="https://github.com/wuyoscar/GPT-Image2-Skill"
                >
                  wuyoscar / GPT-Image2-Skill <ArrowUpRight size={16} />
                </OutLink>
                <p>
                  欢迎补充原帖、可运行作品、公开提示词或纠错。请提供模型声明，缺失信息保留未知。
                </p>
                <div className="about-actions">
                  <OutLink href={`${github}/issues/new?template=case.yml`}>
                    提交案例 <ArrowUpRight size={16} />
                  </OutLink>
                  <a href="./cases.json" download>
                    <FileJson size={16} />
                    下载 JSON
                  </a>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
      <footer>
        <span>ASTRA / 3D ATLAS</span>
        <p>独立整理，非 OpenAI 官方项目。作品版权归原作者。</p>
        <div className="footer-links">
          <OutLink href={`${github}/blob/main/CONTRIBUTING.md`}>
            贡献指南 <ArrowUpRight size={14} />
          </OutLink>
          <a href="./cases.json" download>
            开放索引 <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) closeCase();
        }}
      >
        <DialogContent className="case-dialog">
          {selected && (
            <>
              <div className="detail-head">
                <p className="case-meta">
                  {selected.category} · {evidenceLabels[selected.evidenceLevel]}
                </p>
                <DialogTitle className="detail-title">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="detail-description">
                  {selected.summary}
                </DialogDescription>
              </div>
              <div className="detail-media-wrapper">
                {selected.archivedVideos?.length ? (
                  selected.archivedVideos.map((video) => (
                    <VideoPlayer
                      key={video.playbackUrl}
                      video={video}
                      title={video.label ?? selected.title}
                      poster={video.posterUrl ?? selected.imageUrl}
                    />
                  ))
                ) : (
                  <div className="detail-media">
                    <Preview key={selected.id} item={selected} priority />
                  </div>
                )}
              </div>
              <p className="caption">{selected.imageCaption}</p>
              <div className="detail-actions">
                <OutLink href={selected.sourceUrl}>
                  原始来源 <ExternalLink size={16} />
                </OutLink>
                {selected.demoUrl && (
                  <OutLink href={selected.demoUrl}>
                    打开作品 <Play size={16} />
                  </OutLink>
                )}
                {selected.repositoryUrl && (
                  <OutLink href={selected.repositoryUrl}>
                    源码 <Code2 size={16} />
                  </OutLink>
                )}
                {selected.videoUrl && (
                  <OutLink href={selected.videoUrl}>
                    观看视频 <Play size={16} />
                  </OutLink>
                )}
                <button onClick={copyCase}>
                  <Link2 size={16} />
                  {copyMessage}
                </button>
              </div>
              <dl className="facts">
                <div>
                  <dt>作者</dt>
                  <dd>{selected.author ?? '未核实'}</dd>
                </div>
                <div>
                  <dt>模型声明</dt>
                  <dd>{selected.modelLabel}</dd>
                </div>
                <div>
                  <dt>原始日期</dt>
                  <dd>{selected.sourceDate ?? '未标注 / 未核实'}</dd>
                </div>
                <div>
                  <dt>本次核查</dt>
                  <dd>{selected.observedAt}</dd>
                </div>
                <div>
                  <dt>输出形式</dt>
                  <dd>{selected.outputType.join(' · ')}</dd>
                </div>
              </dl>
              <div className="detail-section">
                <h3>来源证据</h3>
                <p>{selected.evidenceNote}</p>
                <p className="subtle">{selected.sourceAccess}</p>
                {selected.secondaryPublishedAt && (
                  <p className="subtle">
                    转引发布日期：{selected.secondaryPublishedAt}
                    ，不等同原帖日期。
                  </p>
                )}
                {selected.evidenceUrls.length > 0 && (
                  <div className="supporting">
                    {selected.evidenceUrls.map((url, i) => (
                      <OutLink href={url} key={url}>
                        佐证 {i + 1} · {new URL(url).hostname}
                        <ArrowUpRight size={13} />
                      </OutLink>
                    ))}
                  </div>
                )}
              </div>
              <div className="detail-section">
                <h3>提示词与过程</h3>
                {selected.promptExcerpt ? (
                  <blockquote>
                    {selected.promptExcerpt}
                    <small>原文短摘 · 完整上下文见来源</small>
                  </blockquote>
                ) : (
                  <p>
                    {selected.promptSummary ??
                      (selected.promptUrl
                        ? '参考页面有提示词或任务说明，本库未复制完整内容。'
                        : '未找到公开提示词，不补写或推断。')}
                  </p>
                )}
                {selected.promptUrl && (
                  <OutLink className="text-link" href={selected.promptUrl}>
                    查看提示词来源 <ArrowUpRight size={15} />
                  </OutLink>
                )}
              </div>
              <p className="rights">{selected.licenseNotes}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
