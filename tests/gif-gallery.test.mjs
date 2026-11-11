import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  filterCases,
  readCatalogSearch,
  writeCatalogSearch,
  collectionHref,
  validateSearch,
  writeLocale,
} from '../src/catalog.ts';
import { makeCatalogIndex } from '../scripts/catalog-index.mjs';
import { validateAnimatedGif } from '../scripts/gif-contract.mjs';
import { renderCase, renderBrowse } from '../scripts/static-pages/render.mjs';

const records = JSON.parse(
  fs.readFileSync(new URL('../data/cases.json', import.meta.url)),
);
const gif = {
  ...records[0],
  id: 'test-gif',
  group: 'gif',
  modelLabel: 'GPT-Image-2.6 Sunburst',
  evidenceLevel: 'official',
  imageUrl: 'https://example.org/still.jpg',
  imageKind: 'gif-frame',
  archivedVideos: undefined,
  animatedGif: {
    url: 'https://example.org/loop.gif',
    frames: 9,
    durationMs: 1800,
    width: 512,
    height: 512,
    bytes: 123456,
    sha256: 'a'.repeat(64),
    checkedAt: records[0].observedAt,
  },
};

test('GIF entry resets stale filters, preserves language/campaign and survives URL round trips', () => {
  const target = new URL(
    collectionHref(
      'all',
      'newest',
      '?lang=en&utm_source=x&q=old&category=3D&resource=video',
      'gif',
    ),
    'https://example.org/atlas/',
  );
  const filters = {
    query: '',
    group: 'gif',
    category: '全部',
    platform: '全部',
    resource: 'all',
    order: 'newest',
  };
  assert.deepEqual(readCatalogSearch(target.search), filters);
  assert.equal(target.hash, '#collection');
  assert.equal(target.searchParams.get('lang'), 'en');
  assert.equal(target.searchParams.get('utm_source'), 'x');
  assert.deepEqual(
    readCatalogSearch(
      writeLocale(writeCatalogSearch(target.search, filters), 'zh'),
    ),
    filters,
  );
  assert.deepEqual(validateSearch({ group: 'gif' }), { group: 'gif' });
});

test('GIFs stay separate from Astra, references and complete recordings in both indexes', () => {
  const all = [...records.filter((r) => r.group !== 'gif'), gif];
  for (const input of [all, makeCatalogIndex(all)]) {
    assert.deepEqual(
      filterCases(input, { group: 'gif' }).map((c) => c.id),
      ['test-gif'],
    );
    assert(!filterCases(input).some((c) => c.id === gif.id));
    assert(
      !filterCases(input, { group: 'reference' }).some((c) => c.id === gif.id),
    );
    assert.equal(
      filterCases(input, { group: 'gif', resource: 'video' }).length,
      0,
    );
  }
});

test('GIF contract rejects stills, unverified identity, unsafe URLs and missing checks', () => {
  assert.doesNotThrow(() => validateAnimatedGif(gif));
  for (const patch of [
    { frames: 1 },
    { durationMs: 0 },
    { sha256: 'missing' },
    { url: 'javascript:alert(1)' },
    { checkedAt: '2099-01-01' },
  ])
    assert.throws(() =>
      validateAnimatedGif({
        ...gif,
        animatedGif: { ...gif.animatedGif, ...patch },
      }),
    );
  for (const patch of [
    { animatedGif: undefined },
    { group: 'astra' },
    { evidenceLevel: 'secondary' },
    { imageUrl: gif.animatedGif.url },
  ])
    assert.throws(() => validateAnimatedGif({ ...gif, ...patch }));
});

test('static GIF pages expose original bytes and still preview without autoplay; directory counts stay separate', () => {
  for (const lang of ['zh', 'en']) {
    const html = renderCase(gif, lang);
    assert(html.includes('data-gif="https://example.org/loop.gif"'));
    assert(html.includes('data-poster="https://example.org/still.jpg"'));
    assert(html.includes('href="https://example.org/loop.gif"'));
    assert(!html.includes('src="https://example.org/loop.gif"'));
    assert(html.includes('<noscript>'));
    const browse = renderBrowse(
      [
        records.find((r) => r.group === 'astra'),
        records.find((r) => r.group === 'reference'),
        gif,
      ],
      1,
      lang,
    );
    assert(browse.includes('1 Astra · 1 GIF · 1 '));
    assert(browse.includes('data-group="gif"'));
  }
  assert.throws(
    () =>
      renderCase({
        ...gif,
        animatedGif: { ...gif.animatedGif, url: 'javascript:bad()' },
      }),
    /Unsafe source URL/,
  );
});
