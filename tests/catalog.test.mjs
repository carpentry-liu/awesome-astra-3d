import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  filterCases,
  validateSearch,
  readCatalogSearch,
  writeCatalogSearch,
  collectionHref,
  caseHref,
  readLocale,
  writeLocale,
} from '../src/catalog.ts';
import {makeCatalogIndex} from '../scripts/catalog-index.mjs';
const cases = JSON.parse(
  fs.readFileSync(new URL('../data/cases.json', import.meta.url), 'utf8'),
);
test('default search never mixes reference images into Astra results', () => {
  const result = filterCases(cases);
  assert(result.length > 0);
  assert(result.every((c) => c.group === 'astra'));
});
test('reference selection has separate counts', () => {
  assert.equal(
    filterCases(cases, { group: 'reference' }).length,
    cases.filter((c) => c.group === 'reference').length,
  );
});
test('search combines words across author and output fields', () => {
  assert(
    filterCases(cases, { query: 'SIMON blender' }).some(
      (c) => c.id === 'simonw-pelican-bicycle',
    ),
  );
});
test('category and platform filters intersect, not union', () => {
  const result = filterCases(cases, {
    category: '3D 游戏',
    platform: 'OpenAI',
  });
  assert(result.length > 0);
  assert(
    result.every((c) => c.category === '3D 游戏' && c.platform === 'OpenAI'),
  );
});
test('unknown query returns an honest empty state', () => {
  assert.equal(filterCases(cases, { query: 'does-not-exist-9f13' }).length, 0);
});
test('read-only WebMCP input rejects invalid values', () => {
  assert.throws(() => validateSearch({ group: 'everything' }));
  assert.throws(() => validateSearch({ query: 3 }));
  assert.throws(() => validateSearch({ token: 'x' }));
  assert.throws(() => validateSearch(null));
  assert.deepEqual(validateSearch({ query: 'Blender' }), { query: 'Blender' });
});
test('quoted repost dates and video destinations remain distinct', () => {
  for (const id of ['anshu-concept-to-game', 'aibattle-sonic-godot']) {
    const c = cases.find((c) => c.id === id);
    assert.equal(c.sourceDate, null);
    assert(c.secondaryPublishedAt);
  }
  for (const id of ['claire-fashion-game', 'claire-family-journey']) {
    const c = cases.find((c) => c.id === id);
    assert.equal(c.demoUrl, null);
    assert(c.videoUrl);
  }
});
test('source filter includes implementations but not a media-only comparison report', () => {
  const result = filterCases(cases, { resource: 'source' });
  assert(result.some((c) => c.id === 'amsminn-smash-karts'));
  assert(!result.some((c) => c.id === 'cagri-civilization-lab'));
  assert(result.every((c) => c.repositoryUrl));
});
test('full video filter requires an archive rather than an external video link', () => {
  const result = filterCases(cases, { resource: 'video' });
  assert(result.some((c) => c.id === 'peter-van-gogh-town'));
  assert(!result.some((c) => c.id === 'claire-fashion-game'));
});
test('newest means collection date, without mutating curated order', () => {
  const before = cases.map((c) => c.id);
  const result = filterCases(cases, { order: 'newest' });
  assert.equal(
    result[0].addedAt,
    [...cases]
      .filter((c) => c.group === 'astra')
      .map((c) => c.addedAt)
      .sort((a, b) => a.localeCompare(b))
      .at(-1),
  );
  assert.deepEqual(
    cases.map((c) => c.id),
    before,
  );
});
test('share URL restores filters while preserving campaign parameters', () => {
  const filters = {
    query: 'Blender 模型',
    group: 'astra',
    category: 'Blender 建模',
    platform: 'GitHub',
    resource: 'source',
    order: 'newest',
  };
  const search = writeCatalogSearch(
    '?utm_source=juejin&resource=demo',
    filters,
  );
  assert.deepEqual(readCatalogSearch(search), filters);
  assert.equal(new URLSearchParams(search).get('utm_source'), 'juejin');
  assert.equal(new URLSearchParams(search).get('resource'), 'source');
  assert.equal(writeCatalogSearch('?utm_source=x&q=old', {}), '?utm_source=x');
  assert.equal(
    readCatalogSearch('?resource=private&order=random&group=bad').resource,
    'all',
  );
});
test('entry URLs reset stale filters for native navigation while retaining language and campaign', () => {
  const current = '?q=old&category=3D+游戏&platform=X&group=reference&resource=source&order=curated&lang=en&utm_source=juejin';
  for (const resource of ['all','source','demo','video']) {
    const target = new URL(collectionHref(resource,'curated',current),`https://example.org/atlas/${current}#case=old`);
    assert.equal(target.hash,'#collection');
    assert.deepEqual(readCatalogSearch(target.search),{query:'',group:'astra',category:'全部',platform:'全部',resource,order:'curated'});
    assert.equal(readLocale(target.search),'en');
    assert.equal(target.searchParams.get('utm_source'),'juejin');
  }
  assert.equal(readCatalogSearch(new URL(collectionHref('all','newest',current),'https://example.org/').search).order,'newest');
  const reset = new URL(collectionHref('all','curated','?q=old&group=reference'), 'https://example.org/atlas/?q=old&group=reference#collection');
  assert.equal(reset.search,'');
  assert.equal(readCatalogSearch(reset.search).group,'astra');
});
test('language switches preserve gallery filters and shared case URLs stay under the Pages path', () => {
  const search = '?resource=source&order=newest&utm_source=x';
  assert.equal(readLocale(writeLocale(search,'en')),'en');
  assert.deepEqual(readCatalogSearch(writeLocale(search,'en')),readCatalogSearch(search));
  assert.equal(writeLocale(writeLocale(search,'en'),'zh'),search);
  const chineseURL = new URL(`./${writeLocale('?lang=en','zh')}#collection`,'https://example.org/awesome-astra-3d/?lang=en#collection');
  assert.equal(chineseURL.search,'');
  assert.equal(readLocale(chineseURL.search),'zh');
  for (const locale of ['zh','en']) {
    const url = new URL(caseHref('simonw-pelican-bicycle',locale),'https://example.org/awesome-astra-3d/');
    assert(url.pathname.startsWith('/awesome-astra-3d/'));
    assert(url.pathname.endsWith('/cases/simonw-pelican-bicycle/'));
  }
});
test('lightweight index preserves every existing query and resource result without full evidence manifests', () => {
  const index = makeCatalogIndex(cases);
  for (const filters of [{},{query:'SIMON blender'},{query:'three.js'},{resource:'source'},{resource:'demo'},{resource:'video'},{group:'reference'},{category:'3D 游戏',platform:'OpenAI'},{order:'newest'}]) {
    assert.deepEqual(filterCases(index,filters).map(c=>c.id),filterCases(cases,filters).map(c=>c.id));
  }
  assert(!JSON.stringify(index).includes('playbackUrl'));
  assert(!JSON.stringify(index).includes('evidenceNote'));
  const recorded = JSON.parse(fs.readFileSync(new URL('../data/catalog-index.json',import.meta.url),'utf8'));
  assert.deepEqual(recorded,index,'Run npm run catalog to synchronize the card index');
});
