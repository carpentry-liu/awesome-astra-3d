import assert from 'node:assert/strict';

export function validateAnimatedGif(record) {
  const gif = record.animatedGif;
  assert.equal(
    record.group === 'gif',
    !!gif,
    `${record.id}: GIF group requires verified animation metadata`,
  );
  if (!gif) return;
  assert(
    /gpt[ -]?image/i.test(record.modelLabel),
    `${record.id}: missing image-model attribution`,
  );
  assert(
    ['official', 'author'].includes(record.evidenceLevel),
    `${record.id}: GIF requires primary attribution`,
  );
  const url = new URL(gif.url);
  assert(
    url.protocol === 'https:' && !url.username && !url.password,
    `${record.id}: unsafe GIF URL`,
  );
  assert(!/[?&](?:token|access_token|xsec_token)=/i.test(gif.url));
  assert(
    record.imageUrl &&
      record.imageUrl !== gif.url &&
      record.imageKind === 'gif-frame',
    `${record.id}: GIF requires a separate still preview`,
  );
  assert(
    Number.isInteger(gif.frames) && gif.frames > 1,
    `${record.id}: GIF must contain multiple frames`,
  );
  for (const key of ['durationMs', 'width', 'height', 'bytes'])
    assert(
      Number.isInteger(gif[key]) && gif[key] > 0,
      `${record.id}: invalid GIF ${key}`,
    );
  assert.match(gif.sha256, /^[a-f0-9]{64}$/);
  assert.match(gif.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert(
    gif.checkedAt <= record.observedAt,
    `${record.id}: GIF checked after observation`,
  );
}
