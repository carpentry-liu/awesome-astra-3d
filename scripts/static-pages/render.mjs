import { readerStatus } from '../../src/case-copy.ts';
import { REPOSITORY_URL } from '../../src/site.mjs';
import { labels } from './labels.mjs';
import {
  PAGE_SIZE,
  SITE_URL,
  TOPICS,
  browsePath,
  casePath,
  escapeHtml,
  mediaHref,
  relativeHref,
  topicPath,
} from './routes.mjs';

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

export function renderTopic(topic, records, language) {
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

export function renderBrowse(records, page, language) {
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
