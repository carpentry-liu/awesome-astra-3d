import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  filterCases,
  validateSearch,
  readCatalogSearch,
  writeCatalogSearch,
} from '../src/catalog.ts';
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
