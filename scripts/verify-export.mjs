import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  PAGE_SIZE,
  TOPICS,
  casePath,
  browsePath,
  sitemapEntries,
} from './generate-case-pages.mjs';
import { resolveArchivedVideo } from './video-contract.mjs';

// A successful bundler exit does not guarantee that static routes and assets exist.
const root = fileURLToPath(new URL('../dist/client/', import.meta.url));
const records = JSON.parse(
  fs.readFileSync(new URL('../data/cases.json', import.meta.url), 'utf8'),
);
const media = JSON.parse(
  fs.readFileSync(new URL('../data/videos.json', import.meta.url), 'utf8'),
);
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(html.includes('ASTRA'), 'Missing rendered homepage');
const base =
  process.env.GITHUB_PAGES === 'true' ? SITE_URL : 'https://local.invalid/';
const assets = [...html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css))"/g)].map(
  (match) => match[1],
);
assert(assets.length > 0, 'Missing application assets');
function localFile(relative, label) {
  const file = path.resolve(root, relative);
  const child = path.relative(root, file);
  assert(
    !child.startsWith('..') && !path.isAbsolute(child),
    `Path escapes export root: ${label}`,
  );
  assert(fs.existsSync(file), `Missing exported resource: ${label}`);
  return file;
}
for (const asset of assets) {
  const url = new URL(asset, base);
  assert(url.href.startsWith(base), `Asset outside deployment path: ${asset}`);
  localFile(decodeURIComponent(url.href.slice(base.length)), asset);
}

assert.deepEqual(
  JSON.parse(fs.readFileSync(path.join(root, 'cases.json'), 'utf8')),
  records,
  'Public JSON differs from the fact source',
);
for (const record of records) {
  const detailFile = localFile(`case-data/${record.id}.json`, record.id);
  assert.deepEqual(
    JSON.parse(fs.readFileSync(detailFile, 'utf8')),
    record,
    `Detail JSON differs from fact source: ${record.id}`,
  );
}

const unescape = (value) =>
  value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
const site = new URL(SITE_URL);
// CI fetches the large playback files after build. Only known, deployment-safe
// media paths may be missing here; an arbitrary /videos typo is still rejected.
const deferredMedia = new Set(
  records
    .flatMap((record) =>
      (record.archivedVideos || []).map((video) => {
        const { web } = resolveArchivedVideo(record.id, video, media);
        return `videos/${web.filename}`;
      }),
    ),
);

function metadata(pageHtml, attribute, key) {
  const expression = new RegExp(
    `<meta\\s+${attribute}="${key}"\\s+content="([^"<>]*)"`,
    'u',
  );
  const match = pageHtml.match(expression);
  assert(match, `Missing ${key}`);
  return unescape(match[1]);
}

let checkedReferences = 0;
function verifyPage(pagePath, { type = 'website', language = 'zh' } = {}) {
  const file = localFile(`${pagePath}index.html`, pagePath);
  const pageHtml = fs.readFileSync(file, 'utf8');
  const expectedCanonical = new URL(pagePath, SITE_URL).href;
  assert(
    pageHtml.includes(`<html lang="${language === 'en' ? 'en' : 'zh-CN'}">`),
    `Missing page language: ${pagePath}`,
  );
  assert(
    /<title>[^<>]+<\/title>/u.test(pageHtml),
    `Missing page title: ${pagePath}`,
  );
  assert(
    pageHtml.includes(`<link rel="canonical" href="${expectedCanonical}"/>`),
    `Invalid canonical: ${pagePath}`,
  );
  assert.equal(
    metadata(pageHtml, 'property', 'og:type'),
    type,
    `Wrong OG type: ${pagePath}`,
  );
  assert.equal(
    metadata(pageHtml, 'property', 'og:url'),
    expectedCanonical,
    `Wrong OG URL: ${pagePath}`,
  );
  const image = metadata(pageHtml, 'property', 'og:image');
  assert(
    ['https:', 'http:'].includes(new URL(image).protocol),
    `OG image must be absolute: ${pagePath}`,
  );
  const imageURL = new URL(image);
  if (
    imageURL.origin === site.origin &&
    imageURL.pathname.startsWith(site.pathname)
  )
    localFile(
      decodeURIComponent(imageURL.pathname.slice(site.pathname.length)),
      `OG image: ${pagePath}`,
    );
  assert.equal(
    metadata(pageHtml, 'name', 'twitter:image'),
    image,
    `OG/Twitter cover mismatch: ${pagePath}`,
  );
  assert.equal(
    metadata(pageHtml, 'name', 'twitter:card'),
    'summary_large_image',
    `Missing Twitter card: ${pagePath}`,
  );
  assert(
    metadata(pageHtml, 'name', 'description').length > 20,
    `Missing description: ${pagePath}`,
  );
  assert(
    pageHtml.includes('hreflang="en"') && pageHtml.includes('hreflang="zh-CN"'),
    `Missing translated route links: ${pagePath}`,
  );
  for (const match of pageHtml.matchAll(
    /\b(?:href|src|poster)="([^"<>]*)"/gu,
  )) {
    const reference = unescape(match[1]);
    if (!reference || reference.startsWith('#')) continue;
    const url = new URL(reference, expectedCanonical);
    assert(
      ['https:', 'http:'].includes(url.protocol),
      `Unsafe URL in ${pagePath}: ${reference}`,
    );
    if (url.origin !== site.origin) continue;
    assert(
      url.pathname.startsWith(site.pathname),
      `Reference escapes GitHub Pages base path in ${pagePath}: ${reference}`,
    );
    let relative = decodeURIComponent(url.pathname.slice(site.pathname.length));
    if (deferredMedia.has(relative)) {
      assert(
        !reference.startsWith('/'),
        `Playback must retain deployment base in ${pagePath}: ${reference}`,
      );
      continue;
    }
    if (relative.endsWith('/') || relative === '') relative += 'index.html';
    localFile(relative, `${pagePath} -> ${reference}`);
    checkedReferences++;
  }
  return pageHtml;
}

let pageCount = 0;
for (const language of ['zh', 'en']) {
  for (const record of records) {
    const page = verifyPage(casePath(record.id, language), {
      type: 'article',
      language,
    });
    assert(
      page.includes(new URL(record.sourceUrl).href.replaceAll('&', '&amp;')),
      `Missing source link: ${record.id}`,
    );
    assert(
      page.includes(record.observedAt),
      `Missing check date: ${record.id}`,
    );
    assert(
      page.includes(
        language === 'en' ? 'Rights &amp; attribution' : '作品权利',
      ),
      `Missing rights section: ${record.id}`,
    );
    if (record.group === 'reference')
      assert(
        page.includes(
          language === 'en' ? 'excluded from Astra count' : '不计入 Astra',
        ),
        `Reference is not distinguished: ${record.id}`,
      );
    pageCount++;
  }
  for (const topic of TOPICS) {
    const page = verifyPage(
      `${language === 'en' ? 'en/' : ''}topics/${topic.slug}/`,
      { language },
    );
    assert.equal(
      [...page.matchAll(/data-case-id="/gu)].length,
      topic.ids.length,
      `Wrong topic size: ${topic.slug}`,
    );
    assert(
      !page.includes('data-group="reference"'),
      `Reference counted as Astra in topic: ${topic.slug}`,
    );
    pageCount++;
  }
  const allDirectoryIDs = [];
  const directoryCount = Math.ceil(records.length / PAGE_SIZE);
  for (let page = 1; page <= directoryCount; page++) {
    const pageHtml = verifyPage(browsePath(page, language), { language });
    const ids = [...pageHtml.matchAll(/data-case-id="([^"]+)"/gu)].map(
      (match) => match[1],
    );
    assert(
      ids.length <= PAGE_SIZE && ids.length > 0,
      `Invalid directory size: ${page}`,
    );
    allDirectoryIDs.push(...ids);
    if (page < directoryCount)
      assert(
        pageHtml.includes('rel="next"'),
        `Missing next directory link: ${page}`,
      );
    if (page > 1)
      assert(
        pageHtml.includes('rel="prev"'),
        `Missing previous directory link: ${page}`,
      );
    pageCount++;
  }
  assert.equal(
    allDirectoryIDs.length,
    records.length,
    `Directory does not cover all ${language} records`,
  );
  assert.deepEqual(
    [...allDirectoryIDs].sort((a, b) => a.localeCompare(b)),
    records.map((record) => record.id).sort((a, b) => a.localeCompare(b)),
    `Directory has duplicate or missing ${language} cases`,
  );
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) =>
  unescape(match[1]),
);
assert.deepEqual(
  locations,
  sitemapEntries(records).map(
    ({ pathname }) => new URL(pathname, SITE_URL).href,
  ),
  'Sitemap does not match generated routes',
);
assert.equal(
  fs.readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8'),
  sitemap,
  'Public/export sitemap mismatch',
);
fs.writeFileSync(path.join(root, '.nojekyll'), '');
console.log(
  `Verified homepage (${assets.length} assets), ${pageCount} static pages, ${checkedReferences} local references, ${records.length} detail JSON files and ${locations.length} sitemap URLs.`,
);
