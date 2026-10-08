import assert from 'node:assert/strict';
import test from 'node:test';
import { readerStatus } from '../src/case-copy.ts';

test('both detail renderers can translate stored statuses without exposing codes', () => {
  assert.equal(
    readerStatus('outcome', 'showcase', 'zh'),
    '作品效果展示；本库未独立复现生成过程。',
  );
  assert.equal(
    readerStatus('outcome', 'showcase', 'en'),
    'Work showcase; this collection has not independently reproduced its generation process.',
  );
  assert.equal(
    readerStatus('promptAvailability', 'full-linked', 'en'),
    'A link to the complete prompt is recorded. Read the original source.',
  );
});

test('authored limitations survive translation and unknown statuses remain unknown', () => {
  const limits = 'CAD 动画不是摩擦、粉体或变形仿真，本库未独立打印。';
  assert.equal(readerStatus('outcome', limits, 'zh'), limits);
  assert.equal(readerStatus('outcome', limits, 'en'), limits);
  for (const field of ['outcome', 'promptAvailability', 'evidenceStatus']) {
    assert.equal(
      readerStatus(field, 'unknown-status', 'en'),
      'Not public / unverified',
    );
    assert.equal(readerStatus(field, null, 'zh'), '未公开 / 未核实');
  }
});
