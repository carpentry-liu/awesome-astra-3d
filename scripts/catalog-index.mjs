export const indexFields = [
  'id','title','titleEn','group','category','platform','platforms','author',
  'sourceUrl','addedAt','observedAt','modelLabel','evidenceLevel','summary',
  'outputType','imageUrl','imageKind','imageCaption','demoUrl','repositoryUrl','outcome',
];

export function makeCatalogIndex(records) {
  return records.map((record) => ({
    ...Object.fromEntries(indexFields.map((key) => [key, record[key]])),
    ...(record.archivedVideos?.length ? {
      archivedVideos: record.archivedVideos.map(({durationSeconds}) => ({durationSeconds})),
    } : {}),
  }));
}
