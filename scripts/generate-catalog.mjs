import fs from 'node:fs';
const root=new URL('../',import.meta.url), data=JSON.parse(fs.readFileSync(new URL('data/cases.json',root),'utf8'));
const labels={official:'官方展示',author:'作者自述',secondary:'转引待复核',reference:'方法参考'};
const safe=s=>String(s??'未核实').replaceAll('|','\\|').replaceAll('\n',' ');
let text='# 案例目录\n\n由 `data/cases.json` 生成。检索日：2026-09-06。作品归属基于公开来源，不代表独立复现。\n\n';
for(const [group,title] of [['astra','GPT-6 Astra 案例'],['reference','独立方法参考']]){
 const rows=data.filter(c=>c.group===group);text+=`## ${title}（${rows.length}）\n\n`;
 for(const category of new Set(rows.map(c=>c.category))){text+=`### ${category}\n\n| 作品 | 作者 / 来源 | 证据 | 产物与过程 |\n|---|---|---|---|\n`;for(const c of rows.filter(c=>c.category===category)){const links=[c.demoUrl?`[在线作品](${c.demoUrl})`:null,c.repositoryUrl?`[源码](${c.repositoryUrl})`:null,c.videoUrl?`[视频](${c.videoUrl})`:null,c.promptUrl?`[提示词/过程](${c.promptUrl})`:null].filter(Boolean).join(' · ')||'原帖展示';text+=`| [${safe(c.title)}](${c.sourceUrl}) | ${safe(c.author)} · ${c.platform} | ${labels[c.evidenceLevel]} | ${links} |\n`;}text+='\n';}
}
fs.writeFileSync(new URL('CATALOG.md',root),text.trimEnd()+'\n');
fs.copyFileSync(new URL('data/cases.json',root),new URL('public/cases.json',root));
console.log(`Generated CATALOG.md and public/cases.json from ${data.length} source records.`);
