import assert from 'node:assert/strict';
import { SITE_URL } from './generate-case-pages.mjs';

// Builds download playback files into videos/, so matching a filename suffix
// alone must not authorize a different directory, origin or source recording.
export function resolveArchivedVideo(caseId, video, manifest) {
  const original = manifest.videos.find(
    (item) => item.kind === 'original' && item.releaseUrl === video.downloadUrl,
  );
  assert(original, `${caseId}: original recording is absent from the manifest`);
  assert.equal(
    original.caseId,
    caseId,
    `${caseId}: original belongs to another case`,
  );
  assert.equal(
    original.sha256,
    video.sha256,
    `${caseId}: original SHA-256 mismatch`,
  );
  assert.equal(
    original.bytes,
    video.bytes,
    `${caseId}: original byte count mismatch`,
  );

  const filename = new URL(video.playbackUrl).pathname.split('/').at(-1);
  const web = manifest.videos.find(
    (item) => item.kind === 'web' && item.filename === filename,
  );
  assert(web, `${caseId}: playback recording is absent from the manifest`);
  assert.equal(
    web.caseId,
    caseId,
    `${caseId}: playback belongs to another case`,
  );
  assert.equal(
    web.mediaId,
    original.mediaId,
    `${caseId}: playback is a different recording`,
  );
  assert.equal(
    video.playbackUrl,
    new URL(`videos/${web.filename}`, SITE_URL).href,
    `${caseId}: playback URL must match the exported video path`,
  );
  assert.equal(
    original.sourceUrl,
    video.sourceUrl,
    `${caseId}: original source mismatch`,
  );
  assert.equal(
    web.sourceUrl,
    video.sourceUrl,
    `${caseId}: playback source mismatch`,
  );
  return { original, web };
}
