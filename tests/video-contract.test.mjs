import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { SITE_URL } from '../scripts/generate-case-pages.mjs';
import { resolveArchivedVideo } from '../scripts/video-contract.mjs';

const cases = JSON.parse(
  fs.readFileSync(new URL('../data/cases.json', import.meta.url), 'utf8'),
);
const manifest = JSON.parse(
  fs.readFileSync(new URL('../data/videos.json', import.meta.url), 'utf8'),
);
const example = cases.find((record) => record.archivedVideos?.length);
const video = example.archivedVideos[0];

test('every archived case resolves to its actual exported playback and original source', () => {
  let count = 0;
  for (const record of cases) {
    for (const clip of record.archivedVideos || []) {
      const { original, web } = resolveArchivedVideo(record.id, clip, manifest);
      assert.equal(clip.downloadUrl, original.releaseUrl);
      assert.equal(
        clip.playbackUrl,
        new URL(`videos/${web.filename}`, SITE_URL).href,
      );
      count++;
    }
  }
  assert(count > 0);
});

test('a valid filename cannot authorize the wrong directory, host or URL query', () => {
  const { web } = resolveArchivedVideo(example.id, video, manifest);
  for (const playbackUrl of [
    new URL(`typo/${web.filename}`, SITE_URL).href,
    new URL(`videos/${web.filename}`, 'https://example.org/').href,
    `${video.playbackUrl}?stale=1`,
  ]) {
    assert.throws(
      () =>
        resolveArchivedVideo(example.id, { ...video, playbackUrl }, manifest),
      /playback URL must match the exported video path/u,
    );
  }
});

test('a case cannot silently point to another case or another source recording', () => {
  const { original, web } = resolveArchivedVideo(example.id, video, manifest);
  for (const [target, field, value, message] of [
    [original, 'caseId', 'different-case', /original belongs to another case/u],
    [web, 'caseId', 'different-case', /playback belongs to another case/u],
    [
      web,
      'mediaId',
      'different-recording',
      /playback is a different recording/u,
    ],
    [
      original,
      'sourceUrl',
      'https://example.org/wrong-post',
      /original source mismatch/u,
    ],
    [
      web,
      'sourceUrl',
      'https://example.org/wrong-post',
      /playback source mismatch/u,
    ],
  ]) {
    const changed = {
      ...manifest,
      videos: manifest.videos.map((item) =>
        item === target ? { ...item, [field]: value } : item,
      ),
    };
    assert.throws(
      () => resolveArchivedVideo(example.id, video, changed),
      message,
    );
  }
});
