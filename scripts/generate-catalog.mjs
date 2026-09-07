import fs from 'node:fs';
const root=new URL('../',import.meta.url), data=JSON.parse(fs.readFileSync(new URL('data/cases.json',root),'utf8'));
const labels={official:'官方展示',author:'作者自述',secondary:'转引待复核',reference:'方法参考'};
const safe=s=>String(s??'未核实').replaceAll('|','\\|').replaceAll('\n',' ');
const astra=data.filter(c=>c.group==='astra');
const latest=data.map(c=>c.observedAt).sort((a,b)=>a.localeCompare(b)).at(-1);
const videoCount=astra.reduce((n,c)=>n+(c.archivedVideos?.length??0),0);
const sourceCount=astra.filter(c=>c.repositoryUrl).length;
let text=`# 案例目录\n\n由 \`data/cases.json\` 生成。最近核查：${latest}。[上手路线](START_HERE.md) · [最新收录](UPDATES.md)。作品归属基于公开来源，不代表独立复现。\n\n`;
for(const [group,title] of [['astra','GPT-6 Astra 案例'],['reference','独立方法参考']]){
 const rows=data.filter(c=>c.group===group);text+=`## ${title}（${rows.length}）\n\n`;
 for(const category of new Set(rows.map(c=>c.category))){text+=`### ${category}\n\n| 作品 | 作者 / 来源 | 证据 | 产物与过程 |\n|---|---|---|---|\n`;for(const c of rows.filter(c=>c.category===category)){const links=[c.demoUrl?`[在线作品](${c.demoUrl})`:null,c.repositoryUrl?`[源码](${c.repositoryUrl})`:null,c.videoUrl?`[视频](${c.videoUrl})`:null,c.promptUrl?`[提示词/过程](${c.promptUrl})`:null].filter(Boolean).join(' · ')||'原帖展示';text+=`| [${safe(c.title)}](${c.sourceUrl}) | ${safe(c.author)} · ${c.platform} | ${labels[c.evidenceLevel]} | ${links} |\n`;}text+='\n';}
}
fs.writeFileSync(new URL('CATALOG.md',root),text.trimEnd()+'\n');
fs.copyFileSync(new URL('data/cases.json',root),new URL('public/cases.json',root));
let updates='# 最新收录 / Latest additions\n\n按本库收录日期排列，不等同于作品首次发布日期。更新由事实源生成。[浏览网站](https://carpentry-liu.github.io/awesome-astra-3d/?order=newest#collection) · [收录规则](CONTRIBUTING.md)\n\n';
for(const date of [...new Set(astra.map(c=>c.addedAt))].sort((a,b)=>b.localeCompare(a))){
 const rows=astra.filter(c=>c.addedAt===date);
 updates+=`## ${date} · ${rows.length} 个案例\n\n| 作品 / Example | 作者 | 可用材料 |\n| --- | --- | --- |\n`;
 for(const c of rows){const materials=[c.repositoryUrl?'源码 / 工程':null,c.demoUrl?'演示入口':null,c.archivedVideos?.length?'完整视频':null,c.promptUrl?'提示词 / 过程':null].filter(Boolean).join(' · ')||'作者展示';updates+=`| [${safe(c.title)}${c.titleEn?' / '+safe(c.titleEn):''}](https://carpentry-liu.github.io/awesome-astra-3d/#case=${c.id}) | ${safe(c.author)} | ${materials} |\n`;}
 updates+='\n';
}
fs.writeFileSync(new URL('UPDATES.md',root),updates.trimEnd()+'\n');
for(const [file,summary] of [
 ['README.md',`截至 **${latest}（Asia/Shanghai）**，收录 **${astra.length} 条 Astra 案例 + ${data.length-astra.length} 条独立方法参考**；**${sourceCount} 条有源码 / 工程链接，${videoCount} 个完整视频**。首批收录于 2026-09-06。`],
 ['README.en.md',`Updated **${latest} (Asia/Shanghai)** · **${astra.length} Astra examples** · **${sourceCount} with source / project links** · **${videoCount} complete videos** · **${data.length-astra.length} separately labeled references**.`]
]){
 const url=new URL(file,root),body=fs.readFileSync(url,'utf8');
 if(!body.includes('<!-- atlas:summary:start -->'))throw new Error('Missing stats marker in '+file);
 fs.writeFileSync(url,body.replace(/<!-- atlas:summary:start -->[\s\S]*?<!-- atlas:summary:end -->/,`<!-- atlas:summary:start -->\n${summary}\n<!-- atlas:summary:end -->`));
}
fs.writeFileSync(new URL('public/sitemap.xml',root),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://carpentry-liu.github.io/awesome-astra-3d/</loc><lastmod>${latest}</lastmod></url></urlset>\n`);
console.log(`Generated catalogs, README statistics, public JSON and sitemap from ${data.length} source records.`);
