import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import {
  SITE_URL,
  PAGE_SIZE,
  TOPICS,
  escapeHtml,
  casePath,
  browsePath,
  relativeHref,
  mediaHref,
  renderCase,
  selectTopicRecords,
  sitemapEntries,
} from '../scripts/generate-case-pages.mjs';

const records = JSON.parse(
  fs.readFileSync(new URL('../data/cases.json', import.meta.url), 'utf8'),
);

test('nested static routes keep media inside the GitHub Pages deployment', () => {
  for (const page of [
    casePath('example'),
    casePath('example', 'en'),
    browsePath(2),
    browsePath(2, 'en'),
  ]) {
    for (const playback of [
      './media/example.mp4',
      `${SITE_URL}videos/example.mp4`,
    ]) {
      const href = mediaHref(playback, page);
      const expected = new URL(playback, SITE_URL).href;
      assert.equal(new URL(href, new URL(page, SITE_URL)).href, expected);
    }
  }
  assert.equal(
    mediaHref('https://example.com/original.mp4', casePath('example')),
    'https://example.com/original.mp4',
  );
  assert.equal(
    relativeHref(casePath('example'), '/?lang=en#collection'),
    '../../?lang=en#collection',
  );
  assert.throws(
    () => mediaHref('javascript:alert(1)', casePath('example')),
    /Unsafe media URL/u,
  );
});

test('source text and attributes are escaped, while unknown prompts stay unknown', () => {
  const fixture = {
    ...records[0],
    title: '<img src=x onerror="bad()">',
    summary: 'A & B <script>bad()</script>',
    promptExcerpt: null,
    promptSummary: null,
    promptUrl: null,
  };
  const html = renderCase(fixture, 'en');
  assert(!html.includes('<script>bad()'));
  assert(html.includes('&lt;script&gt;bad()&lt;/script&gt;'));
  assert(html.includes('<p>A &amp; B &lt;script&gt;bad()&lt;/script&gt;</p>'));
  assert(html.includes('No author prompt is invented'));
  assert(html.includes('Source-language note'));
  assert(!html.includes('Short original excerpt'));
  assert.equal(escapeHtml(`'"&<>`), '&#39;&quot;&amp;&lt;&gt;');
  assert.throws(
    () => renderCase({ ...records[0], id: '../../escape' }),
    /Unsafe case ID/u,
  );
  assert.throws(
    () => renderCase({ ...records[0], sourceUrl: 'javascript:alert(1)' }),
    /Unsafe source URL/u,
  );
  const pelican = records.find(
    (record) => record.id === 'simonw-pelican-bicycle',
  );
  const english = renderCase(pelican, 'en');
  const chinese = renderCase(pelican, 'zh');
  assert(
    english.includes('The complete prompt is linked at the original source.'),
  );
  assert(
    english.includes(
      'Work showcase; this collection has not independently reproduced its generation process.',
    ),
  );
  assert(chinese.includes('完整提示词见原始来源'));
  assert(
    !english.includes('<p>full</p>') && !english.includes('<p>showcase</p>'),
  );
  const shrine = renderCase(
    records.find((record) => record.id === 'cwc-komorebi-shrine'),
    'en',
  );
  assert(shrine.includes('The source explicitly mentions Astra.'));
  assert(!shrine.includes('<p>explicit-astra</p>'));
  const unknown = renderCase(
    {
      ...fixture,
      imageCaption: 'Author image',
      promptAvailability: 'unknown-status',
      outcome: 'unknown-status',
      evidenceStatus: 'unknown-status',
    },
    'en',
  );
  assert(
    unknown.includes('<p>Not public / unverified</p>') &&
      !unknown.includes('unknown-status'),
  );
  assert(unknown.includes('<figcaption>Author image'));
});

test('references have independent routes, attribution and correct counts', () => {
  const reference = records.find((record) => record.group === 'reference');
  const html = renderCase(reference, 'en');
  assert(html.includes('excluded from Astra count'));
  assert(html.includes('Rights &amp; attribution'));
  assert(html.includes(`href="${SITE_URL}en/cases/${reference.id}/"`));
  assert(html.includes('property="og:type" content="article"'));
  assert(html.includes('name="twitter:card" content="summary_large_image"'));
});

test('all four topics have stable 8–12 Astra records and actual advertised materials', () => {
  assert.equal(TOPICS.length, 4);
  for (const topic of TOPICS) {
    const selected = selectTopicRecords(topic, records);
    assert(selected.length >= 8 && selected.length <= 12);
    assert.equal(
      new Set(selected.map((record) => record.id)).size,
      selected.length,
    );
    assert(selected.every((record) => record.group === 'astra'));
    if (topic.slug === 'blender')
      assert(
        selected.every(
          (record) =>
            record.repositoryUrl &&
            /blender|\.blend/iu.test(
              [record.modelLabel, ...record.outputType, record.summary].join(
                ' ',
              ),
            ),
        ),
      );
    if (topic.slug === 'browser-games')
      assert(selected.every((record) => record.demoUrl));
  }
});

test('sitemap lists every bilingual case and all discoverable directory routes', () => {
  const entries = sitemapEntries(records),
    expected =
      1 +
      records.length * 2 +
      TOPICS.length * 2 +
      Math.ceil(records.length / PAGE_SIZE) * 2;
  assert.equal(entries.length, expected);
  assert.equal(new Set(entries.map((entry) => entry.pathname)).size, expected);
  assert(
    entries.some(
      (entry) =>
        entry.pathname ===
        browsePath(Math.ceil(records.length / PAGE_SIZE), 'en'),
    ),
  );
  for (const record of records)
    assert(
      entries.some(
        (entry) =>
          entry.pathname === casePath(record.id, 'en') &&
          entry.modified === record.observedAt,
      ),
    );
});
