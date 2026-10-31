import assert from 'node:assert/strict';
import fs from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';
import { prepareCatalog } from '../scripts/catalog-index.mjs';

function checkout(t, cases) {
  const dir = fs.mkdtempSync(path.join(tmpdir(), 'atlas-catalog-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const root = pathToFileURL(dir + path.sep);
  fs.mkdirSync(new URL('data/', root));
  const save = (records) =>
    fs.writeFileSync(
      new URL('data/cases.json', root),
      JSON.stringify(records, null, 2),
    );
  const read = (name) => fs.readFileSync(new URL(name, root), 'utf8');
  save(cases);
  return { root, save, read };
}

test('a fresh checkout serves full case data; removing a listing also removes its old detail', (t) => {
  const first = { id: 'first', title: 'First', evidenceNote: 'Source details' };
  const second = { id: 'second', title: 'Second' };
  const { root, save, read } = checkout(t, [first, second]);
  prepareCatalog(root);
  assert.deepEqual(JSON.parse(read('public/case-data/first.json')), first);
  assert.equal(read('public/cases.json'), read('data/cases.json'));
  assert(!('evidenceNote' in JSON.parse(read('data/catalog-index.json'))[0]));
  // An unchanged detail should not trigger a Vite file-watch reload.
  const retained = new URL('public/case-data/second.json', root);
  fs.utimesSync(retained, 1_700_000_000, 1_700_000_000);
  const retainedTime = fs.statSync(retained).mtimeMs;
  save([second]);
  prepareCatalog(root);
  assert.equal(fs.statSync(retained).mtimeMs, retainedTime);
  assert(!fs.existsSync(new URL('public/case-data/first.json', root)));
  assert.deepEqual(JSON.parse(read('public/case-data/second.json')), second);
});

test('invalid or duplicate IDs cannot partially replace a previously working catalog', (t) => {
  const { root, save, read } = checkout(t, [{ id: 'valid' }]);
  prepareCatalog(root);
  const published = read('public/cases.json');
  for (const ids of [['changed', '../escape'], ['new', 'new'], [null]]) {
    save(ids.map((id) => ({ id })));
    assert.throws(
      () => prepareCatalog(root),
      /Unsafe case ID|Duplicate case ID/,
    );
    assert.deepEqual(fs.readdirSync(new URL('public/case-data/', root)), [
      'valid.json',
    ]);
    assert.equal(read('public/cases.json'), published);
  }
});
