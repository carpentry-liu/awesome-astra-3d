/* oxlint-disable next/no-img-element -- Source media stays on original hosts; no image proxy or transformations. */
'use client';
import {
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react';
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
  Star,
  Languages,
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
  readCatalogSearch,
  writeCatalogSearch,
  readLocale,
  writeLocale,
  caseHref,
  type Case,
  type CaseIndex,
  type Locale,
} from '@/src/catalog';
import { messages, categoryLabel, evidenceLabel, workTitle } from '@/src/i18n';
import { readerStatus } from '@/src/case-copy';
import { registerCatalogTool } from '@/src/webmcp';
import casesData from '@/data/catalog-index.json';
import { VideoPlayer, videoTime } from '@/src/video-player';
import { Welcome } from './welcome';
import { navigateToSection } from '@/src/section-navigation';

const allCases = casesData as CaseIndex[];
const github = 'https://github.com/carpentry-liu/awesome-astra-3d';
const latestAdded =
  allCases
    .map((c) => c.addedAt)
    .sort()
    .at(-1) ?? '';
const pageSize = 36;
const imageKinds: Record<string, [string, string]> = {
  illustration: ['模型示意图', 'Illustration'],
  comparison: ['对照媒体', 'Comparison'],
  'concept-art': ['概念图', 'Concept art'],
  'generated-cover': ['生成封面', 'Generated cover'],
  'edited-screenshot': ['编辑截图', 'Edited screenshot'],
  'initial-output': ['初始版本', 'Initial output'],
  'final-output': ['完成版本', 'Final output'],
  render: ['场景渲染', 'Scene render'],
  'gameplay-screenshot': ['实机截图', 'Gameplay screenshot'],
  'source-media': ['来源媒体', 'Source media'],
  'author-screenshot': ['作者作品图', 'Creator screenshot'],
  'author-render': ['作者渲染图', 'Creator render'],
  'author-comparison': ['作者对照图', 'Creator comparison'],
  'video-poster': ['视频封面', 'Video poster'],
  'editorial-cover': ['分享卡片', 'Editorial cover'],
};
function plainActivation(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}
function Preview({
  item,
  locale,
  priority = false,
}: {
  item: CaseIndex;
  locale: Locale;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const t = messages[locale];
  return item.imageUrl && !failed ? (
    <img
      src={item.imageUrl}
      data-image-kind={item.imageKind}
      alt={workTitle(item, locale)}
      loading={priority ? 'eager' : 'lazy'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className="media-note">
      <span>{item.platform.toUpperCase()}</span>
      <Play size={28} />
      <p>{failed ? t.imageFailed : t.imageSource}</p>
      <small>{t.imageContext}</small>
    </div>
  );
}
function OutLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}
function validDetail(value: unknown, id: string): value is Case {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<Case>;
  return (
    item.id === id &&
    typeof item.title === 'string' &&
    typeof item.summary === 'string' &&
    typeof item.sourceUrl === 'string' &&
    Array.isArray(item.evidenceUrls) &&
    Array.isArray(item.outputType)
  );
}

export default function Home() {
  const [query, setQuery] = useState(''),
    [group, setGroup] = useState('astra'),
    [category, setCategory] = useState('全部'),
    [platform, setPlatform] = useState('全部');
  const [resource, setResource] = useState('all'),
    [order, setOrder] = useState('curated');
  const [locale, setLocale] = useState<Locale>('zh'),
    [urlReady, setUrlReady] = useState(false);
  const [currentSearch, setCurrentSearch] = useState(''),
    [pageHash, setPageHash] = useState('');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'failed'>(
    'idle',
  );
  const [sharedFilters, setSharedFilters] = useState('');
  const filterSignature = JSON.stringify({
    query,
    group,
    category,
    platform,
    resource,
    order,
  });
  const shareSignature = `${filterSignature}:${locale}`;
  const activeSearch = writeLocale(
    writeCatalogSearch(currentSearch, {
      query,
      group,
      category,
      platform,
      resource,
      order,
    }),
    locale,
  );
  const [pagination, setPagination] = useState({
    signature: '',
    count: pageSize,
  });
  const visibleCount =
    pagination.signature === filterSignature ? pagination.count : pageSize;
  const [selectedId, setSelectedId] = useState<string | null>(null),
    [selected, setSelected] = useState<Case | null>(null);
  const [detailError, setDetailError] = useState(false),
    [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>(
      'idle',
    );
  const detailCache = useRef(new Map<string, Case>());
  const selectCase = useCallback((id: string | null) => {
    setSelectedId(id);
    setSelected(id ? (detailCache.current.get(id) ?? null) : null);
    setDetailError(false);
    setCopyStatus('idle');
  }, []);
  const t = messages[locale];
  const selectedIndex = allCases.find((c) => c.id === selectedId);
  const astraCount = allCases.filter((c) => c.group === 'astra').length;
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
      setLocale(readLocale(window.location.search));
      setCurrentSearch(window.location.search);
      setPageHash(window.location.hash);
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
      window.location.pathname + activeSearch + window.location.hash,
    );
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
  }, [activeSearch, locale, urlReady]);
  useEffect(() => {
    const sync = () => {
      const id = new URLSearchParams(window.location.hash.slice(1)).get('case');
      selectCase(allCases.some((c) => c.id === id) ? id : null);
      setPageHash(window.location.hash);
    };
    sync();
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [selectCase]);
  useEffect(() => registerCatalogTool(allCases), []);
  useEffect(() => {
    if (!selectedId || detailCache.current.has(selectedId)) return;
    const lifecycle = new AbortController();
    void fetch(`./case-data/${encodeURIComponent(selectedId)}.json`, {
      signal: lifecycle.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('Case response unavailable');
        const value: unknown = await response.json();
        if (!validDetail(value, selectedId))
          throw new Error('Case response mismatch');
        if (lifecycle.signal.aborted) return;
        detailCache.current.set(selectedId, value);
        setSelected(value);
      })
      .catch(() => {
        if (!lifecycle.signal.aborted) setDetailError(true);
      });
    return () => lifecycle.abort();
  }, [selectedId]);

  function openCase(event: MouseEvent<HTMLAnchorElement>, item: CaseIndex) {
    if (!plainActivation(event)) return;
    event.preventDefault();
    selectCase(item.id);
    const hash = `#case=${encodeURIComponent(item.id)}`;
    history.replaceState(
      history.state,
      '',
      window.location.pathname + window.location.search + hash,
    );
    setPageHash(hash);
  }
  function closeCase() {
    selectCase(null);
    history.replaceState(
      history.state,
      '',
      window.location.pathname + window.location.search,
    );
    setPageHash('');
  }
  function sectionLink(
    event: MouseEvent<HTMLAnchorElement>,
    section: 'top' | 'collection',
  ) {
    if (navigateToSection(event, section)) setPageHash(`#${section}`);
  }
  async function copyCase() {
    if (!selectedId) return;
    try {
      await navigator.clipboard.writeText(
        new URL(caseHref(selectedId, locale), window.location.href).href,
      );
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }
  async function copyCollection() {
    setSharedFilters(shareSignature);
    try {
      const url = new URL(window.location.href);
      url.search = writeLocale(
        writeCatalogSearch(url.search, {
          query,
          group,
          category,
          platform,
          resource,
          order,
        }),
        locale,
      );
      url.hash = 'collection';
      await navigator.clipboard.writeText(url.href);
      setShareStatus('copied');
    } catch {
      setShareStatus('failed');
    }
  }
  function resetFilters() {
    setQuery('');
    setCategory('全部');
    setPlatform('全部');
    setResource('all');
  }
  function changeGroup(value: unknown) {
    setGroup(String(value));
    resetFilters();
    setOrder('curated');
  }
  const resourceOptions = {
    all: t.allMaterials,
    source: t.sourceFilter,
    demo: t.demo,
    video: t.video,
  };
  const grid = (
    <div className="catalog-layout">
      <aside className="catalog-sidebar" aria-label={t.searchLabel}>
        <h3>
          <Layers3 size={15} />
          {t.types}
        </h3>
        <div className="filter-row" aria-label={t.types}>
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? 'filter active' : 'filter'}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
            >
              {categoryLabel(c, locale)}
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
          {t.origins}
        </h3>
        <div className="platforms" aria-label={t.origins}>
          {platforms.map((p) => (
            <button
              aria-pressed={platform === p}
              className={platform === p ? 'selected' : ''}
              onClick={() => setPlatform(p)}
              key={p}
            >
              {p === '全部' ? t.all : p}
            </button>
          ))}
        </div>
        <p className="sidebar-note">{t.sidebarNote}</p>
      </aside>
      <div className="catalog-results">
        <div className="material-row">
          <div className="material-filters" aria-label={t.allMaterials}>
            {Object.entries(resourceOptions).map(([value, label]) => (
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
              {order === 'newest' ? t.newestFirst : t.newest}
            </button>
            <button onClick={copyCollection}>
              <Link2 size={14} />
              {sharedFilters === shareSignature && shareStatus !== 'idle'
                ? shareStatus === 'copied'
                  ? t.filtersCopied
                  : t.shareFailure
                : t.shareFilters}
            </button>
          </div>
        </div>
        {resource === 'demo' && <p className="resource-note">{t.demoNote}</p>}
        <div className="result-bar">
          <span aria-live="polite">
            <strong>{cases.length}</strong> {t.results} <i>/</i>{' '}
            {group === 'astra' ? t.sourceGrade : t.referenceGrade}
          </span>
        </div>
        {cases.length ? (
          <>
            <div className="case-grid">
              {cases.slice(0, visibleCount).map((item, i) => {
                const href = caseHref(item.id, locale);
                return (
                  <article className="case-card" key={item.id}>
                    <a
                      className="case-image"
                      href={href}
                      onClick={(event) => openCase(event, item)}
                      aria-label={`${t.openArchive}: ${workTitle(item, locale)}`}
                    >
                      <Preview item={item} locale={locale} priority={i < 3} />
                      <span className="image-index">
                        {String(scoped.indexOf(item) + 1).padStart(2, '0')} /{' '}
                        {categoryLabel(item.category, locale)}
                      </span>
                      <span className="image-open">
                        <ArrowUpRight size={22} />
                      </span>
                      {item.archivedVideos?.length ? (
                        <span className="image-kind video-badge">
                          <Play size={12} />
                          {t.video} ·{' '}
                          {videoTime(item.archivedVideos[0].durationSeconds)}
                        </span>
                      ) : (
                        item.imageUrl && (
                          <span className="image-kind">
                            {item.imageKind === 'video-poster'
                              ? t.staticImage
                              : (imageKinds[item.imageKind]?.[
                                  locale === 'en' ? 1 : 0
                                ] ??
                                (locale === 'en'
                                  ? 'Source media'
                                  : '来源媒体'))}
                          </span>
                        )
                      )}
                    </a>
                    <div className="card-content">
                      <p className="case-meta">
                        <span>{item.platform}</span>
                        <span className={`evidence ${item.evidenceLevel}`}>
                          {evidenceLabel(item.evidenceLevel, locale)}
                        </span>
                        {item.addedAt === latestAdded && (
                          <span className="new-case">{t.newCase}</span>
                        )}
                        {item.outcome === 'failure' && (
                          <span className="failure">{t.failure}</span>
                        )}
                      </p>
                      <h3>
                        <a
                          href={href}
                          onClick={(event) => openCase(event, item)}
                        >
                          {workTitle(item, locale)}
                        </a>
                      </h3>
                      <p className="case-summary">{item.summary}</p>
                      <div className="tags">
                        {item.outputType.slice(0, 2).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="card-resources">
                        {item.repositoryUrl && (
                          <OutLink href={item.repositoryUrl}>
                            <Code2 size={14} />
                            {t.source}
                          </OutLink>
                        )}
                        {item.demoUrl && (
                          <OutLink href={item.demoUrl}>
                            <ArrowUpRight size={14} />
                            {t.openDemo}
                          </OutLink>
                        )}
                      </div>
                      <div className="card-bottom">
                        <span>{item.author ?? t.unknownAuthor}</span>
                        <a
                          href={href}
                          onClick={(event) => openCase(event, item)}
                        >
                          {t.openArchive}
                          <ArrowRight size={15} />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="catalog-pagination">
              <p aria-live="polite">
                {t.showing} {Math.min(visibleCount, cases.length)} /{' '}
                {cases.length}
              </p>
              {visibleCount < cases.length && (
                <button
                  onClick={() =>
                    setPagination({
                      signature: filterSignature,
                      count: visibleCount + pageSize,
                    })
                  }
                >
                  {t.loadMore}
                  <ArrowRight size={16} />
                </button>
              )}
              <a href={`./${locale === 'en' ? 'en/' : ''}browse/`}>
                {t.crawlCatalog}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </>
        ) : (
          <div className="empty">
            <Search size={30} />
            <h3>{t.emptyTitle}</h3>
            <p>{t.emptyNote}</p>
            <button onClick={resetFilters}>
              <RotateCcw size={15} />
              {t.clear}
            </button>
          </div>
        )}
      </div>
    </div>
  );
  return (
    <main id="top" tabIndex={-1}>
      <a
        className="skip-link"
        href="#collection"
        onClick={(event) => sectionLink(event, 'collection')}
      >
        {t.skip}
      </a>
      <header className="masthead">
        <a
          className="brand"
          href="#top"
          aria-label={t.home}
          onClick={(event) => sectionLink(event, 'top')}
        >
          <span className="brand-mark">
            <Box size={23} />
          </span>
          <span>
            ASTRA<span className="brand-light"> / 3D ATLAS</span>
          </span>
        </a>
        <nav>
          <a
            href="#collection"
            onClick={(event) => sectionLink(event, 'collection')}
          >
            {t.explore}
          </a>
          <OutLink
            className="starter-link"
            href={`${github}/blob/main/START_HERE${locale === 'en' ? '.en' : ''}.md`}
          >
            {t.starter}
          </OutLink>
          <OutLink
            className="nav-contribute"
            href={`${github}/issues/new?template=case.yml`}
          >
            {t.contribute}
          </OutLink>
          <a
            className="language-switch"
            href={`./${writeLocale(activeSearch, locale === 'en' ? 'zh' : 'en')}${pageHash}`}
            lang={locale === 'en' ? 'zh-CN' : 'en'}
            onClick={(event) => {
              if (plainActivation(event)) {
                event.preventDefault();
                setLocale(locale === 'en' ? 'zh' : 'en');
              }
            }}
          >
            <Languages size={16} />
            {locale === 'en' ? '中文' : 'English'}
          </a>
          <OutLink className="nav-star" href={github}>
            <Star size={16} />
            {t.star}
            <ArrowUpRight size={14} />
          </OutLink>
        </nav>
      </header>
      <Welcome
        cases={allCases}
        locale={locale}
        search={activeSearch}
        onOpen={openCase}
        onExplore={(nextResource, nextOrder = 'curated') => {
          setGroup('astra');
          resetFilters();
          setResource(nextResource);
          setOrder(nextOrder);
          setPageHash('#collection');
        }}
      />
      <section id="collection" className="collection" tabIndex={-1}>
        <div className="collection-head">
          <div>
            <Layers3 size={19} />
            <h2>{t.collectionTitle}</h2>
            <p className="collection-subtitle">{t.collectionNote}</p>
          </div>
          <label className="search" htmlFor="case-search">
            <Search size={18} />
            <Input
              id="case-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchLabel}
              disabled={group === 'about'}
            />
          </label>
        </div>
        {locale === 'en' && (
          <p className="source-language-note">{t.sourceLanguage}</p>
        )}
        <Tabs
          value={group}
          onValueChange={changeGroup}
          className="catalog-tabs"
        >
          <TabsList variant="line" className="group-tabs">
            <TabsTrigger value="astra">
              {t.astra} <span>{astraCount}</span>
            </TabsTrigger>
            <TabsTrigger value="reference">
              {t.reference} <span>{allCases.length - astraCount}</span>
            </TabsTrigger>
            <TabsTrigger value="about">{t.about}</TabsTrigger>
          </TabsList>
          <TabsContent value="astra">{grid}</TabsContent>
          <TabsContent value="reference">
            <p className="reference-notice">{t.referenceNotice}</p>
            {grid}
          </TabsContent>
          <TabsContent value="about">
            <section className="about">
              <div>
                <p className="eyebrow">HOW WE CURATE</p>
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutIntro}</p>
                <h3>{t.evidenceTitle}</h3>
                <dl className="evidence-guide">
                  <dt>{evidenceLabel('official', locale)}</dt>
                  <dd>{t.officialNote}</dd>
                  <dt>{evidenceLabel('author', locale)}</dt>
                  <dd>{t.authorNote}</dd>
                  <dt>{evidenceLabel('secondary', locale)}</dt>
                  <dd>{t.secondaryNote}</dd>
                  <dt>{evidenceLabel('reference', locale)}</dt>
                  <dd>{t.referenceNote}</dd>
                </dl>
                <h3>{t.mediaTitle}</h3>
                <p>{t.mediaNote}</p>
              </div>
              <div>
                <h3>
                  {t.coverage} · {latestAdded.replaceAll('-', '.')}
                </h3>
                <ul className="coverage">
                  <li>
                    <b>OpenAI / GitHub</b>
                    <span>{t.coverageOpenAI}</span>
                  </li>
                  <li>
                    <b>X / Twitter</b>
                    <span>{t.coverageX}</span>
                  </li>
                  <li>
                    <b>Reddit / YouTube / Personal sites</b>
                    <span>{t.coveragePersonal}</span>
                  </li>
                  <li>
                    <b>Bilibili / Chinese & Japanese media</b>
                    <span>{t.coverageRegional}</span>
                  </li>
                </ul>
                <h3>{t.referencesContribute}</h3>
                <OutLink
                  className="reference-link"
                  href="https://github.com/freestylefly/awesome-gpt-image-2"
                >
                  freestylefly / awesome-gpt-image-2
                  <ArrowUpRight size={16} />
                </OutLink>
                <OutLink
                  className="reference-link"
                  href="https://github.com/wuyoscar/GPT-Image2-Skill"
                >
                  wuyoscar / GPT-Image2-Skill
                  <ArrowUpRight size={16} />
                </OutLink>
                <p>{t.contributionNote}</p>
                <div className="about-actions">
                  <OutLink href={`${github}/issues/new?template=case.yml`}>
                    {t.submit}
                    <ArrowUpRight size={16} />
                  </OutLink>
                  <a href="./cases.json" download>
                    <FileJson size={16} />
                    {t.downloadJson}
                  </a>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </section>
      <footer>
        <span>ASTRA / 3D ATLAS</span>
        <p>{t.footerNote}</p>
        <div className="footer-links">
          <OutLink href={`${github}/blob/main/CONTRIBUTING.md`}>
            {t.contributionGuide}
            <ArrowUpRight size={14} />
          </OutLink>
          <a href="./cases.json" download>
            {t.openIndex}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
      <Dialog
        open={!!selectedId}
        onOpenChange={(open) => {
          if (!open) closeCase();
        }}
      >
        <DialogContent className="case-dialog">
          {selectedId && (!selected || selected.id !== selectedId) && (
            <div className="detail-loading">
              <DialogTitle className="detail-title">
                {selectedIndex
                  ? workTitle(selectedIndex, locale)
                  : t.openArchive}
              </DialogTitle>
              <DialogDescription aria-live="polite">
                {detailError ? t.detailFailure : t.loadingDetail}
              </DialogDescription>
              <a className="text-link" href={caseHref(selectedId, locale)}>
                {t.staticPage}
                <ArrowUpRight size={16} />
              </a>
            </div>
          )}
          {selected && selected.id === selectedId && (
            <>
              <div className="detail-head">
                <p className="case-meta">
                  {categoryLabel(selected.category, locale)} ·{' '}
                  {evidenceLabel(selected.evidenceLevel, locale)}
                </p>
                <DialogTitle className="detail-title">
                  {workTitle(selected, locale)}
                </DialogTitle>
                <DialogDescription className="detail-description">
                  {selected.summary}
                </DialogDescription>
              </div>
              {locale === 'en' && (
                <p className="source-language-note">{t.sourceLanguage}</p>
              )}
              <div className="detail-media-wrapper">
                {selected.archivedVideos?.length ? (
                  selected.archivedVideos.map((video) => (
                    <VideoPlayer
                      key={video.playbackUrl}
                      video={video}
                      locale={locale}
                      title={video.label ?? selected.title}
                      poster={video.posterUrl ?? selected.imageUrl}
                    />
                  ))
                ) : (
                  <div className="detail-media">
                    <Preview
                      key={selected.id}
                      item={selected}
                      locale={locale}
                      priority
                    />
                  </div>
                )}
              </div>
              <p className="caption">{selected.imageCaption}</p>
              <div className="detail-actions">
                <OutLink href={selected.sourceUrl}>
                  {t.original}
                  <ExternalLink size={16} />
                </OutLink>
                {selected.demoUrl && (
                  <OutLink href={selected.demoUrl}>
                    {t.openWork}
                    <Play size={16} />
                  </OutLink>
                )}
                {selected.repositoryUrl && (
                  <OutLink href={selected.repositoryUrl}>
                    {t.source}
                    <Code2 size={16} />
                  </OutLink>
                )}
                <button onClick={copyCase}>
                  <Link2 size={16} />
                  {copyStatus === 'copied'
                    ? t.copied
                    : copyStatus === 'failed'
                      ? t.copyFailure
                      : t.copyCase}
                </button>
                <a href={caseHref(selected.id, locale)}>
                  {t.staticPage}
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <dl className="facts">
                <div>
                  <dt>{t.author}</dt>
                  <dd>{selected.author ?? t.unknown}</dd>
                </div>
                <div>
                  <dt>{t.model}</dt>
                  <dd>{selected.modelLabel}</dd>
                </div>
                <div>
                  <dt>{t.sourceDate}</dt>
                  <dd>{selected.sourceDate ?? t.noDate}</dd>
                </div>
                <div>
                  <dt>{t.checked}</dt>
                  <dd>{selected.observedAt}</dd>
                </div>
                <div>
                  <dt>{t.outputs}</dt>
                  <dd>{selected.outputType.join(' · ')}</dd>
                </div>
              </dl>
              <div className="detail-section">
                <h3>{t.evidence}</h3>
                <p>{selected.evidenceNote}</p>
                <p className="subtle">{selected.sourceAccess}</p>
                {selected.secondaryPublishedAt && (
                  <p className="subtle">
                    {t.secondaryDate}: {selected.secondaryPublishedAt} ·{' '}
                    {t.notSourceDate}
                  </p>
                )}
                {selected.evidenceUrls.length > 0 && (
                  <div className="supporting">
                    {selected.evidenceUrls.map((url, i) => (
                      <OutLink href={url} key={url}>
                        {t.supporting} {i + 1} · {new URL(url).hostname}
                        <ArrowUpRight size={13} />
                      </OutLink>
                    ))}
                  </div>
                )}
              </div>
              <div className="detail-section">
                <h3>{t.outcome}</h3>
                <p>{readerStatus('outcome', selected.outcome, locale)}</p>
              </div>
              <div className="detail-section">
                <h3>{t.prompt}</h3>
                {selected.promptExcerpt ? (
                  <blockquote>
                    {selected.promptExcerpt}
                    <small>{t.excerpt}</small>
                  </blockquote>
                ) : (
                  <p>
                    {selected.promptSummary ??
                      (selected.promptUrl ? t.promptLinked : t.noPrompt)}
                  </p>
                )}
                {selected.promptExcerpt && selected.promptSummary && (
                  <p>{selected.promptSummary}</p>
                )}
                {selected.promptUrl && (
                  <OutLink className="text-link" href={selected.promptUrl}>
                    {t.promptSource}
                    <ArrowUpRight size={15} />
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
