import fs from 'node:fs';
import assert from 'node:assert/strict';
const cases=JSON.parse(fs.readFileSync(new URL('../data/cases.json',import.meta.url),'utf8'));
const ids=new Set();
const validUrl=url=>{const u=new URL(url);assert.equal(u.protocol,'https:');assert(!u.username&&!u.password);assert(!/[?&](?:token|access_token|xsec_token)=/i.test(url));};
for(const c of cases){
 assert(!ids.has(c.id),`Duplicate id ${c.id}`);ids.add(c.id);assert.match(c.id,/^[a-z0-9-]+$/);
 for(const k of ['title','sourceUrl','modelLabel','evidenceLevel','evidenceNote','summary','category','observedAt','licenseNotes'])assert(typeof c[k]==='string'&&c[k].trim(),`${c.id}: missing ${k}`);
 assert(['astra','reference'].includes(c.group));assert(['official','author','secondary','reference'].includes(c.evidenceLevel));
 assert((c.group==='reference')===(c.evidenceLevel==='reference'),`${c.id}: group mismatch`);
 if(c.group==='astra')assert(/astra/i.test(c.modelLabel),`${c.id}: no Astra statement`);
 for(const k of ['sourceDate','secondaryPublishedAt'])assert(c[k]===null||/^\d{4}-\d{2}-\d{2}$/.test(c[k]),`${c.id}: invalid ${k}`);
 assert(/^\d{4}-\d{2}-\d{2}$/.test(c.addedAt),`${c.id}: invalid addedAt`);
 assert(c.addedAt<=c.observedAt,`${c.id}: added after observation`);
 for(const key of ['sourceUrl','imageUrl','demoUrl','videoUrl','repositoryUrl','promptUrl'])if(c[key])validUrl(c[key]);
 for(const u of c.evidenceUrls)validUrl(u);
 if(c.demoUrl)assert(!/youtube\.com|youtu\.be|\.(mp4|webm)(\?|$)/i.test(c.demoUrl),`${c.id}: video is not a live demo`);
 assert(c.outputType.length>0);if(c.promptExcerpt)assert(c.promptExcerpt.trim().split(/\s+/).length<=25,`${c.id}: excerpt exceeds 25 words`);
 if(c.imageUrl)assert(c.imageCaption&&c.imageKind);
 for(const video of c.archivedVideos??[]){
  for(const key of ['playbackUrl','downloadUrl','sourceUrl'])validUrl(video[key]);
  assert(video.durationSeconds>0&&video.bytes>0);assert.match(video.sha256,/^[a-f0-9]{64}$/);
 }
}
const media=JSON.parse(fs.readFileSync(new URL('../data/videos.json',import.meta.url),'utf8'));
for(const video of media.videos){
 assert(ids.has(video.caseId));validUrl(video.downloadUrl);validUrl(video.releaseUrl);validUrl(video.metadataSource);
 assert(video.complete===true&&video.transcoded===false);assert(video.bytes>0);assert.match(video.sha256,/^[a-f0-9]{64}$/);
 assert(Math.abs(video.durationSeconds-video.expectedDurationSeconds)<=0.2,`${video.filename}: incomplete duration`);
}
for(const c of cases)for(const video of c.archivedVideos??[]){
 const original=media.videos.find(v=>v.releaseUrl===video.downloadUrl&&v.kind==='original');
 assert(original&&original.sha256===video.sha256&&original.bytes===video.bytes);
 const web=media.videos.find(v=>video.playbackUrl.endsWith('/'+v.filename)&&v.kind==='web');
 assert(web&&web.mediaId===original.mediaId&&web.caseId===c.id);
}
console.log(`Validated ${cases.length} records: ${cases.filter(c=>c.group==='astra').length} Astra, ${cases.filter(c=>c.group==='reference').length} references; URLs, provenance, dates and media types checked.`);
