import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { downloadPlayback } from '../scripts/fetch-videos.mjs';

test('only a complete verified response can replace a published playback file', async (t) => {
  const dir = await fs.mkdtemp(path.join(tmpdir(), 'atlas-media-'));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const destination = pathToFileURL(dir + path.sep);
  const content = Buffer.from('complete source recording');
  const video = {
    filename: 'clip.mp4',
    releaseUrl:
      'https://github.com/example/atlas/releases/download/media/clip.mp4',
    bytes: content.length,
    sha256: createHash('sha256').update(content).digest('hex'),
  };
  const file = new URL(video.filename, destination);
  await fs.writeFile(file, 'previous good recording');
  async function* interrupted() {
    yield content.subarray(0, 4);
    throw new Error('connection reset');
  }
  for (const response of [
    new Response(Readable.toWeb(Readable.from(interrupted()))),
    new Response(content.subarray(0, 4)),
    new Response(Buffer.alloc(content.length)),
    new Response(Buffer.alloc(content.length + 1)),
  ]) {
    await assert.rejects(
      downloadPlayback(video, destination, async () => response),
      /connection reset|integrity mismatch/,
    );
    assert.equal(await fs.readFile(file, 'utf8'), 'previous good recording');
    assert.deepEqual(await fs.readdir(dir), ['clip.mp4']);
  }
  await downloadPlayback(video, destination, async () => new Response(content));
  assert.deepEqual(await fs.readFile(file), content);
  assert.deepEqual(await fs.readdir(dir), ['clip.mp4']);
});
