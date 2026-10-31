import path from 'node:path';
import topics from '../../data/topics.json' with { type: 'json' };
import { assertCaseId, PAGE_SIZE, SITE_URL } from '../../src/site.mjs';

export { topics as TOPICS };
export { PAGE_SIZE, SITE_URL };

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function casePath(id, language = 'zh') {
  assertCaseId(id);
  return `${language === 'en' ? 'en/' : ''}cases/${id}/`;
}

export function browsePath(page = 1, language = 'zh') {
  return `${language === 'en' ? 'en/' : ''}browse/${page === 1 ? '' : `${page}/`}`;
}

export function topicPath(slug, language = 'zh') {
  if (typeof slug !== 'string' || !/^[a-z]+(?:-[a-z]+)*$/.test(slug))
    throw new Error(`Unsafe topic slug: ${slug}`);
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
    for (const topic of topics)
      entries.push({
        pathname: topicPath(topic.slug, language),
        modified: latest,
      });
    for (let page = 1; page <= Math.ceil(records.length / PAGE_SIZE); page++)
      entries.push({ pathname: browsePath(page, language), modified: latest });
  }
  return entries;
}

export function renderSitemap(records) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries(
    records,
  )
    .map(
      ({ pathname, modified }) =>
        `<url><loc>${escapeHtml(new URL(pathname, SITE_URL).href)}</loc><lastmod>${escapeHtml(modified)}</lastmod></url>`,
    )
    .join('\n')}\n</urlset>\n`;
}
