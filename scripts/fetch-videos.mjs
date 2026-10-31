import { createHash, randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

// Preserve a previous verified copy when the network or an integrity check fails.
export async function downloadPlayback(video, destination, fetchFile = fetch) {
  const { filename } = video;
  if (!/^[a-z0-9-]+\.mp4$/.test(filename))
    throw new Error('Invalid video filename');
  const url = new URL(video.releaseUrl);
  if (url.origin !== 'https://github.com' || url.username || url.password)
    throw new Error('Unexpected release origin');
  const response = await fetchFile(url, {
    signal: AbortSignal.timeout(180_000),
  });
  if (!response.ok || !response.body)
    throw new Error(`Video download failed: ${filename} (${response.status})`);

  const hash = createHash('sha256');
  let bytes = 0;
  const meter = new Transform({
    transform(chunk, _encoding, callback) {
      bytes += chunk.length;
      if (bytes > video.bytes)
        return callback(new Error(`Video integrity mismatch: ${filename}`));
      hash.update(chunk);
      callback(null, chunk);
    },
  });
  const partial = new URL(`${filename}.${randomUUID()}.part`, destination);
  try {
    await pipeline(
      Readable.fromWeb(response.body),
      meter,
      createWriteStream(partial, { flags: 'wx' }),
    );
    if (bytes !== video.bytes || hash.digest('hex') !== video.sha256)
      throw new Error(`Video integrity mismatch: ${filename}`);
    await fs.rename(partial, new URL(filename, destination));
  } finally {
    await fs.rm(partial, { force: true });
  }
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const manifest = JSON.parse(
    await fs.readFile(new URL('../data/videos.json', import.meta.url), 'utf8'),
  );
  const destination = new URL('../dist/client/videos/', import.meta.url);
  await fs.mkdir(destination, { recursive: true });
  for (const video of manifest.videos.filter((item) => item.kind === 'web')) {
    await downloadPlayback(video, destination);
    console.log(
      `Verified complete video: ${video.filename} (${video.bytes} bytes)`,
    );
  }
}
