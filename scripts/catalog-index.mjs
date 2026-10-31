import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertCaseId } from '../src/site.mjs';

export const indexFields = [
  'id',
  'title',
  'titleEn',
  'group',
  'category',
  'platform',
  'platforms',
  'author',
  'sourceUrl',
  'addedAt',
  'observedAt',
  'modelLabel',
  'evidenceLevel',
  'summary',
  'outputType',
  'imageUrl',
  'imageKind',
  'imageCaption',
  'demoUrl',
  'repositoryUrl',
  'outcome',
];

export function makeCatalogIndex(records) {
  return records.map((record) => ({
    ...Object.fromEntries(indexFields.map((key) => [key, record[key]])),
    ...(record.archivedVideos?.length
      ? {
          archivedVideos: record.archivedVideos.map(({ durationSeconds }) => ({
            durationSeconds,
          })),
        }
      : {}),
  }));
}

// Vite watches these files. Updating one case should not reload every other one.
function writeChanged(file, text) {
  const bytes = Buffer.from(text);
  if (fs.existsSync(file) && fs.readFileSync(file).equals(bytes)) return;
  fs.writeFileSync(file, bytes);
}

// Dev serves these files directly; production must publish the same bytes.
export function prepareCatalog(root = new URL('../', import.meta.url)) {
  const source = fs.readFileSync(new URL('data/cases.json', root), 'utf8');
  const records = JSON.parse(source);
  const details = new URL('public/case-data/', root);
  const files = new Set();
  for (const { id } of records) {
    assertCaseId(id);
    const name = id + '.json';
    if (files.has(name)) throw new Error('Duplicate case ID: ' + id);
    files.add(name);
  }

  fs.mkdirSync(details, { recursive: true });
  for (const record of records) {
    writeChanged(
      new URL(record.id + '.json', details),
      JSON.stringify(record) + '\n',
    );
  }
  writeChanged(
    new URL('data/catalog-index.json', root),
    JSON.stringify(makeCatalogIndex(records)) + '\n',
  );
  writeChanged(new URL('public/cases.json', root), source);
  // A removed listing must not remain accessible through its old detail JSON.
  for (const entry of fs.readdirSync(details, { withFileTypes: true })) {
    if (
      entry.isFile() &&
      /^[a-z0-9][a-z0-9-]*\.json$/.test(entry.name) &&
      !files.has(entry.name)
    ) {
      fs.unlinkSync(new URL(entry.name, details));
    }
  }
  return records;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  console.log(`Prepared runtime data for ${prepareCatalog().length} records.`);
}
