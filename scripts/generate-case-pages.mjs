import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PAGE_SIZE,
  TOPICS,
  browsePath,
  casePath,
  renderSitemap,
  sitemapEntries,
  topicPath,
} from './static-pages/routes.mjs';
import {
  renderBrowse,
  renderCase,
  renderTopic,
} from './static-pages/render.mjs';

// Keep the original script entry points for consumers and standalone tooling.
export {
  PAGE_SIZE,
  SITE_URL,
  TOPICS,
  browsePath,
  casePath,
  escapeHtml,
  mediaHref,
  relativeHref,
  sitemapEntries,
} from './static-pages/routes.mjs';
export { renderCase, selectTopicRecords } from './static-pages/render.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
function readCases() {
  return JSON.parse(
    fs.readFileSync(path.join(projectRoot, 'data/cases.json'), 'utf8'),
  );
}

export function generateSitemap(records = readCases()) {
  const content = renderSitemap(records);
  fs.writeFileSync(path.join(projectRoot, 'public/sitemap.xml'), content);
  return content;
}

export function generateStaticPages({
  outputRoot = path.join(projectRoot, 'dist/client'),
} = {}) {
  const records = readCases();
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
  for (const asset of ['static-pages.css', 'static-pages.js']) {
    fs.copyFileSync(
      path.join(projectRoot, 'public', asset),
      path.join(outputRoot, asset),
    );
  }
  fs.writeFileSync(
    path.join(outputRoot, 'sitemap.xml'),
    renderSitemap(records),
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
