import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
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

test('GIF cards receive only the playback URL; static details opt into automatic playback with still fallback', () => {
  assert.deepEqual(makeCatalogIndex([gif])[0].animatedGif, {
    url: gif.animatedGif.url,
  });
  for (const lang of ['zh', 'en']) {
    const html = renderCase(gif, lang);
    assert(html.includes('data-gif="https://example.org/loop.gif"'));
    assert(html.includes('data-poster="https://example.org/still.jpg"'));
    assert(html.includes('data-autoplay="true"'));
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

test('static GIF playback starts automatically, honors motion preferences and recovers from media errors', () => {
  const script = fs.readFileSync(
    new URL('../public/static-pages.js', import.meta.url),
    'utf8',
  );
  for (const reduced of [false, true]) {
    const element = (dataset = {}) => {
      const attributes = new Map([['aria-pressed', 'false']]);
      return {
        dataset,
        hidden: true,
        listeners: {},
        addEventListener(type, callback) {
          this.listeners[type] = callback;
        },
        getAttribute(name) {
          return attributes.get(name);
        },
        setAttribute(name, value) {
          attributes.set(name, value);
        },
      };
    };
    const image = { ...element({ poster: 'still.jpg' }), src: 'still.jpg' };
    const button = element({ play: 'Play', stop: 'Stop' });
    const status = element();
    const preference = { ...element(), matches: reduced };
    const player = {
      dataset: { gif: 'original.gif', autoplay: 'true' },
      querySelector(selector) {
        return { img: image, button, '[role="status"]': status }[selector];
      },
    };
    vm.runInNewContext(script, {
      document: {
        querySelectorAll(selector) {
          return selector === '.gif-player[data-gif]' ? [player] : [];
        },
      },
      window: {
        matchMedia(query) {
          assert.equal(query, '(prefers-reduced-motion: reduce)');
          return preference;
        },
      },
    });
    assert.equal(image.src, reduced ? 'still.jpg' : 'original.gif');
    assert.equal(button.hidden, false);
    assert.equal(button.getAttribute('aria-pressed'), String(!reduced));
    // A visitor may override the default; a second activation always restores it.
    button.listeners.click();
    assert.equal(image.src, reduced ? 'original.gif' : 'still.jpg');
    button.listeners.click();
    assert.equal(image.src, reduced ? 'still.jpg' : 'original.gif');
    preference.matches = true;
    preference.listeners.change();
    assert.equal(image.src, 'still.jpg');
    preference.matches = false;
    preference.listeners.change();
    assert.equal(image.src, 'original.gif');
    image.listeners.error();
    assert.equal(image.src, 'still.jpg');
    assert.equal(status.hidden, false);
    assert.equal(button.getAttribute('aria-pressed'), 'false');
    button.listeners.click();
    assert.equal(image.src, 'original.gif');
    assert.equal(status.hidden, true);
  }
});
