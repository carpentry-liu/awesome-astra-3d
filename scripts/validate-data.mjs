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
 for(const key of ['sourceUrl','imageUrl','demoUrl','videoUrl','repositoryUrl','promptUrl'])if(c[key])validUrl(c[key]);
 for(const u of c.evidenceUrls)validUrl(u);
 if(c.demoUrl)assert(!/youtube\.com|youtu\.be|\.(mp4|webm)(\?|$)/i.test(c.demoUrl),`${c.id}: video is not a live demo`);
 assert(c.outputType.length>0);if(c.promptExcerpt)assert(c.promptExcerpt.trim().split(/\s+/).length<=25,`${c.id}: excerpt exceeds 25 words`);
 if(c.imageUrl)assert(c.imageCaption&&c.imageKind);
}
console.log(`Validated ${cases.length} records: ${cases.filter(c=>c.group==='astra').length} Astra, ${cases.filter(c=>c.group==='reference').length} references; URLs, provenance, dates and media types checked.`);
