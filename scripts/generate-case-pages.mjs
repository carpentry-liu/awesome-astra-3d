import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const SITE_URL = 'https://carpentry-liu.github.io/awesome-astra-3d/';
export const PAGE_SIZE = 36;
const REPOSITORY_URL = 'https://github.com/carpentry-liu/awesome-astra-3d';

const labels = {
  zh: {
    home: '交互案例库',
    browse: '全部作品',
    topics: '创作专题',
    star: 'GitHub · Star 收藏',
    source: '源码 / 工程',
    demo: '作者演示',
    original: '原始来源',
    process: '提示词 / 过程',
    astra: 'GPT-6 Astra 案例',
    reference: '独立方法参考 · 不计入 Astra',
    evidence: '来源与核查',
    materials: '作品与材料',
    prompt: '提示词与任务',
    rights: '作品权利',
    author: '作者',
    category: '类别',
    model: '原始模型声明',
    level: '来源等级',
    published: '原始日期',
    secondary: '转引发布日期',
    added: '收录日期',
    observed: '核查日期',
    unknown: '未公开 / 未核实',
    output: '产物',
    summary: '作品说明',
    note: '证据说明',
    access: '核查过程',
    outcome: '观察与局限',
    availability: '公开情况',
    excerpt: '原文短摘录',
    task: '任务概述',
    fullPrompt: '完整提示词请回原文查看。',
    noPrompt: '未公开完整提示词，保持未知，不补写为作者原文。',
    video: '完整视频',
    videoOriginal: '原始下载',
    videoSource: '录像原帖',
    videoUnavailable: '视频暂时无法播放。可查看作者效果图，或下载原始录像。',
    imageUnavailable: '作者效果图暂时不可用，请查看原始来源。',
    archiveNote: '完整原帖录像；来源未提供字幕轨道。',
    dateNote: '核查日期与收录日期不代表作品发布日期。来源声明不等于独立复现。',
    page: '页',
    prev: '上一页',
    next: '下一页',
    allPages: '目录各页',
    related: '继续探索',
    intro: '从作品找到工程、作者演示、完整录像与来源记录。',
    topicIntro:
      '材料以作者公开入口为准；具体环境、资产权利和已知限制见作品档案。',
    topicNote: '演示可达不等于独立复现。没有公开工程的作品仅供效果与过程参考。',
    methods: '参考作品单独标记，不纳入 GPT-6 Astra 案例数量。',
    skip: '跳到正文',
    credits: '第三方作品及媒体保留原有权利，不适用本库 MIT 许可证。',
    official: '官方展示',
    authorLevel: '作者自述',
    secondaryLevel: '转引待复核',
    referenceLevel: '方法参考',
  },
  en: {
    home: 'Interactive gallery',
    browse: 'All works',
    topics: 'Creative collections',
    star: 'GitHub · Star',
    source: 'Source / project',
    demo: 'Author demo',
    original: 'Original source',
    process: 'Prompt / process',
    astra: 'GPT-6 Astra example',
    reference: 'Separate method reference · excluded from Astra count',
    evidence: 'Sources & verification',
    materials: 'Work & materials',
    prompt: 'Prompt & task',
    rights: 'Rights & attribution',
    author: 'Creator',
    category: 'Category',
    model: 'Original model claim',
    level: 'Evidence level',
    published: 'Original publication',
    secondary: 'Secondary publication',
    added: 'Added to this index',
    observed: 'Last checked',
    unknown: 'Not public / unverified',
    output: 'Outputs',
    summary: 'Source-language note',
    note: 'Evidence note · source language',
    access: 'Checks · source language',
    outcome: 'Observations & limitations · source language',
    availability: 'Availability · source language',
    excerpt: 'Short original excerpt',
    task: 'Task summary · source language',
    fullPrompt: 'Read the source for the complete prompt.',
    noPrompt:
      'The complete prompt is not public. No author prompt is invented.',
    video: 'Complete video',
    videoOriginal: 'Download original',
    videoSource: 'Video source',
    videoUnavailable:
      'Video playback is unavailable. View the author image or download the original recording.',
    imageUnavailable:
      'The author image is unavailable. Visit the original source.',
    archiveNote:
      'Complete source recording. No subtitle track was supplied by the source.',
    dateNote:
      'Check and addition dates are not publication dates. A source claim is not independent reproduction.',
    page: 'Page',
    prev: 'Previous page',
    next: 'Next page',
    allPages: 'All directory pages',
    related: 'Keep exploring',
    intro:
      'Find public projects, author demos, full recordings and source records through real work.',
    topicIntro:
      'Materials refer to publicly shared author links. Open each record for environments, asset rights and limitations.',
    topicNote:
      'A reachable demo is not independent reproduction. Works without public projects are visual or process references.',
    methods:
      'Method references are labeled separately and excluded from the GPT-6 Astra count.',
    skip: 'Skip to main content',
    credits:
      'Third-party works and media retain their original rights and are excluded from this index’s MIT license.',
    official: 'Official showcase',
    authorLevel: 'Author claim',
    secondaryLevel: 'Secondary report',
    referenceLevel: 'Method reference',
  },
};

export const TOPICS = [
  {
    slug: 'blender',
    title: 'Blender 工程与建模',
    titleEn: 'Blender projects & modeling',
    description:
      '从公开 Blender 相关工程与作者过程继续研究建模、绑定、材质和镜头。',
    descriptionEn:
      'Explore public Blender-related projects and author processes for modeling, rigging, materials and cameras.',
    ids: [
      'simonw-pelican-bicycle',
      'gptblender-floor-plan-house',
      'realsee-editable-space',
      'magicyan-room-studio',
      'cwc-komorebi-shrine',
      'mizchi-traveler-walk',
      'ruofeng-orbital-core',
      'kingy-fieldnote-rover',
      'simonw-pluribus-egg',
      'cwc-sugarfall',
      'teshnizi-mechanical-iris',
      'xinz-xianlin-campus',
    ],
  },
  {
    slug: 'browser-games',
    title: '浏览器游戏与交互世界',
    titleEn: 'Browser games & interactive worlds',
    description:
      '从作者演示走进游戏、可探索世界与三维交互原型；公开源码另行标记。',
    descriptionEn:
      'Visit author demos of games, explorable worlds and interactive 3D prototypes. Public source links are labeled individually.',
    ids: [
      'openai-sunwake',
      'songkeys-little-flock',
      'scottstts-jelly-baby',
      'angello-drone-io',
      'emmtee-paperroute',
      'ilker-cabsolutely',
      'mrtwizzles-glider',
      'varun-hot-wheeler',
      'ayi-mosswing',
      'chongdashu-canteen-crashers',
      'kvickan-vesper',
      'berochlu-astrafloor',
    ],
  },
  {
    slug: 'architecture',
    title: '建筑、空间与数字孪生',
    titleEn: 'Architecture, spaces & digital twins',
    description: '从平面图、照片和场景参考探索建筑重建、空间漫游与可编辑工程。',
    descriptionEn:
      'Explore building reconstruction, spatial walkthroughs and author projects based on floor plans, photographs and scene references.',
    ids: [
      'bambssquad-jetis-digital-twin',
      'openai-solace-garden-house',
      'gptblender-floor-plan-house',
      'realsee-editable-space',
      'pantoja-astralod3',
      'routine-kyoto',
      'sldyns-pku-3d',
      'xinz-xianlin-campus',
      'magicyan-room-studio',
      'dan-chicago-fair',
      'airilab-rhino-building',
      'nickson-studio-photos',
    ],
  },
  {
    slug: 'exploded',
    title: '机械拆解与剖面交互',
    titleEn: 'Exploded views & mechanical interaction',
    description:
      '旋转、隔离和拆分部件；完整录像与公开材料分开标记，不把外观演示当作工程验证。',
    descriptionEn:
      'Explore rotating, isolating and separating parts. Full recordings and public materials are labeled separately from engineering verification.',
    ids: [
      'paruchh-time-undone',
      'marcel-transforming-car',
      'ashe-model-x',
      'tspy-microduck',
      'feraser-turbocharger',
      'teshnizi-mechanical-iris',
      'icooper-desktop-exploded',
      'kana-flower-shop',
      'derya-enterprise-cad',
    ],
  },
];

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function casePath(id, language = 'zh') {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id))
    throw new Error(`Unsafe case ID: ${id}`);
  return `${language === 'en' ? 'en/' : ''}cases/${id}/`;
}

export function browsePath(page = 1, language = 'zh') {
  return `${language === 'en' ? 'en/' : ''}browse/${page === 1 ? '' : `${page}/`}`;
}

function topicPath(slug, language = 'zh') {
  return `${language === 'en' ? 'en/' : ''}topics/${slug}/`;
}

export function relativeHref(fromPath, toPath) {
  const suffixIndex = toPath.search(/[?#]/u);
  const target = (
    suffixIndex === -1 ? toPath : toPath.slice(0, suffixIndex)
  ).replace(/^\/+/, '');
  const suffix = suffixIndex === -1 ? '' : toPath.slice(suffixIndex);
  const relative = path.posix.relative(fromPath, target || '.') || '.';
  return `${relative}${target.endsWith('/') || target === '' ? '/' : ''}${suffix}`;
}

// Same-site URLs must retain the deployment prefix when served under GitHub Pages.
// Keep external originals intact; normalize local playback paths by page depth.
export function mediaHref(value, currentPath) {
  if (!value) return null;
  const absolute = new URL(value, SITE_URL);
  if (!['https:', 'http:'].includes(absolute.protocol))
    throw new Error(`Unsafe media URL: ${value}`);
  const site = new URL(SITE_URL);
  if (
    absolute.origin === site.origin &&
    absolute.pathname.startsWith(site.pathname)
  ) {
    return (
      relativeHref(
        currentPath,
        decodeURIComponent(absolute.pathname.slice(site.pathname.length)),
      ) +
      absolute.search +
      absolute.hash
    );
  }
  return absolute.href;
}

function external(value) {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol))
    throw new Error(`Unsafe source URL: ${value}`);
  return escapeHtml(url.href);
}

function imageAbsolute(value) {
  return value
    ? new URL(value, SITE_URL).href
    : new URL('share.jpg', SITE_URL).href;
}
function languageTitle(record, lang) {
  return lang === 'en' ? record.titleEn || record.title : record.title;
}
function evidenceLabel(level, lang) {
  const t = labels[lang];
  return (
    {
      official: t.official,
      author: t.authorLevel,
      secondary: t.secondaryLevel,
      reference: t.referenceLevel,
    }[level] || t.unknown
  );
}
function link(url, text, className = '') {
  return `<a${className ? ` class="${escapeHtml(className)}"` : ''} href="${external(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}<span class="sr-only"> ↗</span></a>`;
}

// These fields mix authored notes with historical machine-readable statuses.
// Translate only the known statuses; never invent facts for an unknown value.
const statusCopy = {
  promptAvailability: {
    'not-found': [
      '未找到公开的原始提示词。',
      'No public original prompt was found.',
    ],
    linked: [
      '已记录提示词或过程入口；完整内容请回源核对。',
      'A prompt or process link is recorded. Check the source for its complete context.',
    ],
    full: [
      '完整提示词见原始来源；请保留原文上下文。',
      'The complete prompt is linked at the original source. Read it in context.',
    ],
    'brief-summary-only': [
      '仅有任务摘要，未取得完整原始提示词。',
      'Only a task summary is available; the complete original prompt was not obtained.',
    ],
    'full-prompt-on-source': [
      '原始来源公开完整提示词；本页仅保留短摘录或摘要。',
      'The source provides the complete prompt; this page keeps only a short excerpt or summary.',
    ],
    'full-linked': [
      '已记录完整提示词入口；请回原文查看。',
      'A link to the complete prompt is recorded. Read the original source.',
    ],
    partial: [
      '仅公开部分提示词或任务要求，不能视为完整上下文。',
      'Only part of the prompt or task requirements is public, not the full context.',
    ],
    'linked-unreadable': [
      '已记录原始提示词入口，但本次未能读取全文。',
      'The original prompt link is recorded, but its full text could not be read during the check.',
    ],
    'full-prompt-in-repository': [
      '仓库收录完整提示词；请回仓库核对上下文。',
      'The repository includes the complete prompt. Read it there in context.',
    ],
    'full-prompt-and-reply-links-in-repository': [
      '仓库收录完整提示词与回复入口；请回源核对上下文。',
      'The repository includes the complete prompt and reply links. Check their original context.',
    ],
    'full-prompt-and-reply-link-in-repository': [
      '仓库收录完整提示词与回复入口；请回源核对上下文。',
      'The repository includes the complete prompt and a reply link. Check their original context.',
    ],
    'full-prompt-in-repository-and-source-linked': [
      '仓库收录完整提示词并附来源入口；请核对原文。',
      'The repository includes the complete prompt and a source link. Check the original text.',
    ],
    'author-description': [
      '仅记录作者描述，未找到完整原始提示词。',
      'Only the creator’s description is recorded; no complete original prompt was found.',
    ],
    excerpt: [
      '仅提供原文短摘录；完整上下文请回原始来源。',
      'Only a short original excerpt is provided. Visit the source for its full context.',
    ],
  },
  outcome: {
    showcase: [
      '作品效果展示；本库未独立复现生成过程。',
      'Work showcase; this collection has not independently reproduced its generation process.',
    ],
    comparison: [
      '对照展示；本库未独立复现或重跑评测。',
      'Comparison showcase; this collection has not independently reproduced the work or rerun the evaluation.',
    ],
    'showcase-with-limitations': [
      '作品展示含已知局限；具体限制见来源与证据说明。',
      'The showcase has known limitations. See the source and evidence notes for details.',
    ],
    reference: [
      '独立方法参考；不计入 Astra 案例，也不代表已验证模型归属。',
      'Separate method reference, excluded from Astra cases; its model attribution is not independently verified.',
    ],
  },
  evidenceStatus: {
    'author-repo-readme': [
      '作者仓库 README 提供模型归属声明；不代表独立复现。',
      'The creator’s repository README provides a model attribution statement, not independent reproduction.',
    ],
    'official-astra': [
      '官方来源标注 Astra；具体生成与验证边界见证据说明。',
      'An official source labels the work Astra. See the evidence notes for generation and verification limits.',
    ],
    'explicit-astra': [
      '来源明确提到 Astra；具体模型设置以原文为准，未独立复现。',
      'The source explicitly mentions Astra. Consult the original model settings; the work is not independently reproduced.',
    ],
    'source-available-author-attributed': [
      '作者公开源码并提供模型归属声明；本库未独立复现。',
      'Public source code and a creator attribution statement are available; this collection has not independently reproduced the work.',
    ],
    'first-party-live-demo-and-prompt': [
      '作者提供演示与提示词或任务材料；不代表本库独立复现。',
      'The creator provides a demo and prompt or task materials; this is not independent reproduction by the collection.',
    ],
    'reference-only-non-astra': [
      '独立方法参考，没有可核实的 Astra 归属，不计入 Astra 案例。',
      'Separate method reference without verified Astra attribution, excluded from Astra cases.',
    ],
    'reference-only-model-mismatch': [
      '独立方法参考，没有可核实的 Astra 归属，不计入 Astra 案例。',
      'Separate method reference without verified Astra attribution, excluded from Astra cases.',
    ],
    'mirror-astra': [
      '依据原帖镜像或转引中的 Astra 声明；原始读取与核查限制见证据说明。',
      'Attribution relies on an Astra statement in a mirror or quotation. See the evidence notes for source-access and verification limits.',
    ],
    'mirror-astra-statement': [
      '镜像保留作者的 Astra 声明；工具分工与未核实部分见证据说明。',
      'A mirror retains the creator’s Astra statement. See the evidence notes for tool roles and unverified details.',
    ],
  },
};

function readerStatus(field, value, lang) {
  if (typeof value !== 'string' || !value.trim()) return labels[lang].unknown;
  const copy = statusCopy[field];
  if (Object.hasOwn(copy, value)) return copy[value][lang === 'en' ? 1 : 0];
  return /^[a-z][a-z0-9_-]*$/iu.test(value) ? labels[lang].unknown : value;
}

function sourceLanguageAttribute(text, lang) {
  return lang === 'en' &&
    /[\u3400-\u9fff]/u.test(text || '') &&
    !/[\u3040-\u30ff]/u.test(text || '')
    ? ' lang="zh-Hans"'
    : '';
}
function sourceText(text, lang) {
  // Descriptions are normalized in Chinese, but labels and missing-value copy
  // may be English. Do not mark every source field as Chinese indiscriminately.
  const languageAttribute = sourceLanguageAttribute(text, lang);
  return `<p${languageAttribute}>${escapeHtml(text || labels[lang].unknown)}</p>`;
}
function metaRow(name, value, lang, sourceLanguage = false) {
  return `<div><dt>${escapeHtml(name)}</dt><dd${sourceLanguage ? sourceLanguageAttribute(value, lang) : ''}>${escapeHtml(value || labels[lang].unknown)}</dd></div>`;
}
function resources(record, lang) {
  const t = labels[lang];
  return `<div class="resource-links">${[
    record.repositoryUrl
      ? link(record.repositoryUrl, t.source, 'button primary')
      : null,
    record.demoUrl ? link(record.demoUrl, t.demo, 'button') : null,
    link(record.sourceUrl, t.original, 'button'),
    record.promptUrl ? link(record.promptUrl, t.process, 'button') : null,
  ]
    .filter(Boolean)
    .join('')}</div>`;
}

function imageMarkup(
  url,
  alt,
  currentPath,
  lang,
  className = '',
  eager = false,
) {
  const t = labels[lang];
  return `<div class="image-container ${className}">${url ? `<img src="${escapeHtml(mediaHref(url, currentPath))}" alt="${escapeHtml(alt)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"/>` : ''}<p class="image-fallback"${url ? ' hidden' : ''}>${escapeHtml(t.imageUnavailable)}</p></div>`;
}

function pageTemplate({
  currentPath,
  language,
  title,
  description,
  image,
  body,
  type = 'website',
  modified,
}) {
  const t = labels[language];
  const canonical = new URL(currentPath, SITE_URL).href;
  const english = currentPath.startsWith('en/')
    ? currentPath
    : `en/${currentPath}`;
  const chinese = currentPath.startsWith('en/')
    ? currentPath.slice(3)
    : currentPath;
  const home =
    relativeHref(currentPath, '') + (language === 'en' ? '?lang=en' : '');
  const zhURL = new URL(chinese, SITE_URL).href,
    enURL = new URL(english, SITE_URL).href;
  const cover = imageAbsolute(image);
  return `<!doctype html>
<html lang="${language === 'en' ? 'en' : 'zh-CN'}"><head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${escapeHtml(title)} · Astra 3D Atlas</title><meta name="description" content="${escapeHtml(description)}"/>
<meta name="robots" content="index, follow"/><link rel="canonical" href="${canonical}"/>
<link rel="alternate" hreflang="zh-CN" href="${zhURL}"/><link rel="alternate" hreflang="en" href="${enURL}"/><link rel="alternate" hreflang="x-default" href="${zhURL}"/>
<meta property="og:type" content="${type}"/><meta property="og:site_name" content="Astra 3D Atlas"/><meta property="og:title" content="${escapeHtml(title)}"/><meta property="og:description" content="${escapeHtml(description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${escapeHtml(cover)}"/><meta property="og:locale" content="${language === 'en' ? 'en_US' : 'zh_CN'}"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escapeHtml(title)}"/><meta name="twitter:description" content="${escapeHtml(description)}"/><meta name="twitter:image" content="${escapeHtml(cover)}"/>
${type === 'article' && modified ? `<meta property="article:modified_time" content="${escapeHtml(modified)}"/>` : ''}
<link rel="icon" href="${relativeHref(currentPath, 'favicon.svg')}" type="image/svg+xml"/><link rel="stylesheet" href="${relativeHref(currentPath, 'static-pages.css')}"/>
<script src="${relativeHref(currentPath, 'static-pages.js')}" defer></script></head>
<body><a class="skip-link" href="#main">${t.skip}</a>
<header class="site-header"><a class="brand" href="${home}">ASTRA<span>3D ATLAS</span></a><nav aria-label="${language === 'en' ? 'Main navigation' : '主导航'}"><a href="${home}#collection">${t.home}</a><a href="${relativeHref(currentPath, browsePath(1, language))}">${t.browse}</a><a href="${relativeHref(currentPath, topicPath('blender', language))}">${t.topics}</a><a href="${relativeHref(currentPath, language === 'en' ? chinese : english)}" lang="${language === 'en' ? 'zh-CN' : 'en'}">${language === 'en' ? '中文' : 'English'}</a>${link(REPOSITORY_URL, t.star, 'star-link')}</nav></header>
<main id="main" tabindex="-1">${body}</main>
<footer><a class="brand" href="${home}">ASTRA<span>3D ATLAS</span></a><p>${t.credits}</p>${link(REPOSITORY_URL, t.star)}</footer>
</body></html>\n`;
}

function card(record, currentPath, lang) {
  const t = labels[lang],
    title = languageTitle(record, lang);
  const badges = [
    record.repositoryUrl ? t.source : null,
    record.demoUrl ? t.demo : null,
    record.archivedVideos?.length
      ? `${record.archivedVideos.length} ${t.video}`
      : null,
  ].filter(Boolean);
  return `<article class="work-card" data-case-id="${escapeHtml(record.id)}" data-group="${escapeHtml(record.group)}"><a class="card-image" href="${relativeHref(currentPath, casePath(record.id, lang))}">${imageMarkup(record.imageUrl, title, currentPath, lang)}</a><div class="card-content"><p class="eyebrow">${escapeHtml(record.group === 'astra' ? t.astra : t.reference)}</p><h3><a href="${relativeHref(currentPath, casePath(record.id, lang))}">${escapeHtml(title)}</a></h3><p class="creator">${escapeHtml(record.author || t.unknown)} · ${escapeHtml(record.platform)}</p><div class="badges">${badges.map((v) => `<span>${escapeHtml(v)}</span>`).join('')}</div>${resources(record, lang)}</div></article>`;
}

function topicLinks(currentPath, lang) {
  return `<div class="topic-links">${TOPICS.map((topic) => `<a href="${relativeHref(currentPath, topicPath(topic.slug, lang))}">${escapeHtml(lang === 'en' ? topic.titleEn : topic.title)}</a>`).join('')}</div>`;
}

export function renderCase(record, language = 'zh') {
  const t = labels[language],
    currentPath = casePath(record.id, language),
    title = languageTitle(record, language);
  const description =
    language === 'en'
      ? `${title}. ${record.group === 'astra' ? 'GPT-6 Astra source record' : 'Separate method reference'} by ${record.author || 'an uncredited creator'}, with public materials and attribution.`
      : `${record.group === 'reference' ? '独立方法参考（不计入 Astra）。' : ''}${title}。${record.summary}`.slice(
          0,
          200,
        );
  const videos = (record.archivedVideos || [])
    .map((v, i) => {
      const playback = mediaHref(v.playbackUrl, currentPath);
      const poster = v.posterUrl || record.imageUrl;
      const heading = `${t.video} ${i + 1}`;
      return `<article class="clip"><h3>${heading}</h3>${v.label ? sourceText(v.label, language) : ''}<video controls playsinline preload="none"${poster ? ` poster="${escapeHtml(mediaHref(poster, currentPath))}"` : ''} src="${escapeHtml(playback)}" aria-label="${escapeHtml(title + ' — ' + heading)}">${t.videoUnavailable}</video><div class="video-fallback" hidden>${imageMarkup(poster, record.imageCaption || title, currentPath, language)}<p role="status">${t.videoUnavailable}</p></div><p class="media-note">${t.archiveNote} · ${Math.round(v.durationSeconds)}s</p><div class="resource-links">${link(v.downloadUrl, t.videoOriginal, 'button')}${link(v.sourceUrl, t.videoSource, 'button')}</div></article>`;
    })
    .join('');
  const prompt = record.promptExcerpt
    ? `<h3>${t.excerpt}</h3><blockquote>${escapeHtml(record.promptExcerpt)}</blockquote>`
    : '';
  const body = `<div class="breadcrumbs"><a href="${relativeHref(currentPath, browsePath(1, language))}">${t.browse}</a><span aria-hidden="true">/</span><span>${escapeHtml(record.group === 'astra' ? t.astra : t.reference)}</span></div>
<section class="record-heading"><p class="eyebrow">${escapeHtml(record.category)} · ${escapeHtml(evidenceLabel(record.evidenceLevel, language))}</p><h1>${escapeHtml(title)}</h1><p class="creator">${escapeHtml(record.author || t.unknown)} · ${escapeHtml(record.platform)}</p>${record.group === 'reference' ? `<p class="notice">${t.methods}</p>` : ''}${resources(record, language)}</section>
<figure class="hero-image">${imageMarkup(record.imageUrl, record.imageCaption || title, currentPath, language, '', true)}<figcaption${sourceLanguageAttribute(record.imageCaption, language)}>${escapeHtml(record.imageCaption)} · ${escapeHtml(record.author || t.unknown)}</figcaption></figure>
<div class="record-layout"><div class="record-main"><section aria-labelledby="summary"><h2 id="summary">${t.summary}</h2>${sourceText(record.summary, language)}<h3>${t.output}</h3><ul${language === 'en' ? ' lang="zh-Hans"' : ''}>${record.outputType.map((output) => `<li>${escapeHtml(output)}</li>`).join('')}</ul></section>
${videos ? `<section aria-labelledby="videos"><h2 id="videos">${t.video}</h2><div class="clips">${videos}</div></section>` : ''}
<section aria-labelledby="prompt"><h2 id="prompt">${t.prompt}</h2><h3>${t.availability}</h3>${sourceText(readerStatus('promptAvailability', record.promptAvailability, language), language)}${prompt}${record.promptSummary ? `<h3>${t.task}</h3>${sourceText(record.promptSummary, language)}` : ''}<p>${record.promptUrl ? t.fullPrompt : t.noPrompt}</p>${record.promptUrl ? link(record.promptUrl, t.process, 'button') : ''}</section>
<section aria-labelledby="evidence"><h2 id="evidence">${t.evidence}</h2><h3>${t.note}</h3>${sourceText(record.evidenceNote, language)}<h3>${t.access}</h3>${sourceText(record.sourceAccess, language)}<h3>${t.outcome}</h3>${sourceText(readerStatus('outcome', record.outcome, language), language)}<ul class="evidence-links">${[...new Set([record.sourceUrl, ...(record.evidenceUrls || [])])].map((url) => `<li>${link(url, url)}</li>`).join('')}</ul></section>
<section aria-labelledby="rights"><h2 id="rights">${escapeHtml(t.rights)}</h2>${sourceText(record.licenseNotes, language)}</section></div>
<aside class="record-facts" aria-label="${language === 'en' ? 'Record facts' : '档案信息'}"><h2>${t.materials}</h2><dl>${metaRow(t.author, record.author, language)}${metaRow(t.model, record.modelLabel, language, true)}${metaRow(t.level, evidenceLabel(record.evidenceLevel, language), language)}${metaRow(t.published, record.sourceDate, language)}${metaRow(t.secondary, record.secondaryPublishedAt, language)}${metaRow(t.added, record.addedAt, language)}${metaRow(t.observed, record.observedAt, language)}</dl><p class="media-note">${t.dateNote}</p>${record.evidenceStatus ? sourceText(readerStatus('evidenceStatus', record.evidenceStatus, language), language) : ''}</aside></div>
<section class="related"><h2>${t.related}</h2>${topicLinks(currentPath, language)}<a class="button" href="${relativeHref(currentPath, browsePath(1, language))}">${t.browse}</a></section>`;
  return pageTemplate({
    currentPath,
    language,
    title,
    description,
    image: record.imageUrl,
    body,
    type: 'article',
    modified: record.observedAt,
  });
}

export function selectTopicRecords(topic, records) {
  return topic.ids.map((id) => {
    const record = records.find(
      (item) => item.id === id && item.group === 'astra',
    );
    if (!record)
      throw new Error(`Missing Astra topic record: ${topic.slug}/${id}`);
    return record;
  });
}

function renderTopic(topic, records, language) {
  const t = labels[language],
    currentPath = topicPath(topic.slug, language),
    selected = selectTopicRecords(topic, records);
  const title = language === 'en' ? topic.titleEn : topic.title,
    description = language === 'en' ? topic.descriptionEn : topic.description;
  const body = `<section class="directory-heading"><p class="eyebrow">ASTRA 3D ATLAS / ${t.topics}</p><h1>${escapeHtml(title)}</h1><p class="lede">${escapeHtml(description)}</p><p>${t.topicIntro}</p><p class="media-note">${t.topicNote}</p>${topicLinks(currentPath, language)}</section><section aria-label="${escapeHtml(title)}"><div class="work-grid">${selected.map((record) => card(record, currentPath, language)).join('')}</div></section><section class="related"><h2>${t.related}</h2><a class="button" href="${relativeHref(currentPath, browsePath(1, language))}">${t.browse}</a>${link(REPOSITORY_URL, t.star, 'button primary')}</section>`;
  return pageTemplate({
    currentPath,
    language,
    title,
    description,
    image: selected[0]?.imageUrl,
    body,
  });
}

function renderBrowse(records, page, language) {
  const t = labels[language],
    currentPath = browsePath(page, language),
    pageCount = Math.ceil(records.length / PAGE_SIZE);
  const selected = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const astra = records.filter((record) => record.group === 'astra').length,
    reference = records.length - astra;
  const title = `${t.browse} · ${t.page} ${page} / ${pageCount}`;
  const description =
    language === 'en'
      ? `${astra} Astra records and ${reference} separate method references. ${t.intro}`
      : `${astra} 条 Astra 案例与 ${reference} 条独立方法参考。${t.intro}`;
  const sections = ['astra', 'reference']
    .map((group) => {
      const groupRecords = selected.filter((record) => record.group === group);
      return groupRecords.length
        ? `<section class="directory-group" aria-labelledby="${group}"><h2 id="${group}">${group === 'astra' ? t.astra : t.reference}</h2><div class="work-grid">${groupRecords.map((record) => card(record, currentPath, language)).join('')}</div></section>`
        : '';
    })
    .join('');
  const body = `<section class="directory-heading"><p class="eyebrow">ASTRA 3D ATLAS / INDEX</p><h1>${t.browse}</h1><p class="lede">${t.intro}</p><p>${astra} Astra · ${reference} ${language === 'en' ? 'separate references' : '独立参考'} · ${t.page} ${page} / ${pageCount}</p><p class="media-note">${t.methods}</p>${topicLinks(currentPath, language)}</section>${sections}
<nav class="pagination" aria-label="${t.allPages}">${page > 1 ? `<a class="button" rel="prev" href="${relativeHref(currentPath, browsePath(page - 1, language))}">${t.prev}</a>` : ''}<div class="page-links">${Array.from({ length: pageCount }, (_, i) => `<a href="${relativeHref(currentPath, browsePath(i + 1, language))}"${page === i + 1 ? ' aria-current="page"' : ''}>${i + 1}</a>`).join('')}</div>${page < pageCount ? `<a class="button" rel="next" href="${relativeHref(currentPath, browsePath(page + 1, language))}">${t.next}</a>` : ''}</nav>`;
  return pageTemplate({ currentPath, language, title, description, body });
}

export function sitemapEntries(records) {
  const latest = records
    .map((record) => record.observedAt)
    .sort((a, b) => a.localeCompare(b))
    .at(-1);
  const entries = [{ pathname: '', modified: latest }];
  for (const language of ['zh', 'en']) {
    for (const record of records)
      entries.push({
        pathname: casePath(record.id, language),
        modified: record.observedAt,
      });
    for (const topic of TOPICS)
      entries.push({
        pathname: topicPath(topic.slug, language),
        modified: latest,
      });
    for (let page = 1; page <= Math.ceil(records.length / PAGE_SIZE); page++)
      entries.push({ pathname: browsePath(page, language), modified: latest });
  }
  return entries;
}

export function generateSitemap(
  records = JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'data/cases.json'), 'utf8'),
  ),
) {
  const content = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries(
    records,
  )
    .map(
      ({ pathname, modified }) =>
        `<url><loc>${escapeHtml(new URL(pathname, SITE_URL).href)}</loc><lastmod>${escapeHtml(modified)}</lastmod></url>`,
    )
    .join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(projectRoot, 'public/sitemap.xml'), content);
  return content;
}

const mediaScript = `for (const image of document.querySelectorAll('.image-container img')) {
 const fail = () => { image.hidden = true; const fallback=image.parentElement.querySelector('.image-fallback'); if(fallback) fallback.hidden=false; };
 image.addEventListener('error',fail);
 if(image.complete && image.naturalWidth===0) fail();
}
for (const video of document.querySelectorAll('.clip video')) {
 const fail = () => { video.hidden=true; const fallback=video.parentElement.querySelector('.video-fallback'); if(fallback) fallback.hidden=false; };
 video.addEventListener('error',fail);
 if(video.error) fail();
}
`;

export function generateStaticPages({
  outputRoot = path.join(projectRoot, 'dist/client'),
} = {}) {
  const records = JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'data/cases.json'), 'utf8'),
  );
  fs.mkdirSync(outputRoot, { recursive: true });
  const manifestFile = path.join(outputRoot, 'static-route-manifest.json');
  const generatedPaths = sitemapEntries(records)
    .map((entry) => entry.pathname)
    .filter(Boolean);
  if (fs.existsSync(manifestFile)) {
    const previous = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    for (const obsolete of previous.filter(
      (route) => !generatedPaths.includes(route),
    )) {
      // Delete only previously generated pages, after resolving their containment.
      // Never recursively remove a directory or unlisted user/build files.
      if (
        !/^(?:en\/)?(?:cases\/[a-z0-9][a-z0-9-]*|topics\/[a-z-]+|browse(?:\/[0-9]+)?)\/$/.test(
          obsolete,
        )
      )
        throw new Error('Unsafe prior static route');
      const staleFile = path.resolve(outputRoot, obsolete, 'index.html');
      const relative = path.relative(path.resolve(outputRoot), staleFile);
      if (relative.startsWith('..') || path.isAbsolute(relative))
        throw new Error('Prior route escapes export root');
      if (fs.existsSync(staleFile)) fs.unlinkSync(staleFile);
    }
  }
  const writePage = (pathname, html) => {
    const directory = path.join(outputRoot, pathname);
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, 'index.html'), html);
  };
  for (const language of ['zh', 'en']) {
    for (const record of records)
      writePage(casePath(record.id, language), renderCase(record, language));
    for (const topic of TOPICS)
      writePage(
        topicPath(topic.slug, language),
        renderTopic(topic, records, language),
      );
    for (let page = 1; page <= Math.ceil(records.length / PAGE_SIZE); page++)
      writePage(
        browsePath(page, language),
        renderBrowse(records, page, language),
      );
  }
  fs.copyFileSync(
    path.join(projectRoot, 'public/static-pages.css'),
    path.join(outputRoot, 'static-pages.css'),
  );
  fs.writeFileSync(path.join(outputRoot, 'static-pages.js'), mediaScript);
  fs.writeFileSync(
    path.join(outputRoot, 'sitemap.xml'),
    generateSitemap(records),
  );
  fs.writeFileSync(
    manifestFile,
    JSON.stringify(generatedPaths, null, 2) + '\n',
  );
  console.log(
    `Generated ${records.length * 2} bilingual case pages, ${TOPICS.length * 2} topic pages and ${Math.ceil(records.length / PAGE_SIZE) * 2} directory pages.`,
  );
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  if (process.argv.includes('--sitemap-only')) generateSitemap();
  else generateStaticPages();
}
