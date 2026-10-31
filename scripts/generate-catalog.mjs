import fs from 'node:fs';
import { prepareCatalog } from './catalog-index.mjs';
import { casePath, renderSitemap, SITE_URL } from './static-pages/routes.mjs';
const root = new URL('../', import.meta.url),
  data = prepareCatalog(root);
const labels = {
  official: '官方展示',
  author: '作者自述',
  secondary: '转引待复核',
  reference: '方法参考',
};
const safe = (s) =>
  String(s ?? '未核实')
    .replaceAll('|', '\\|')
    .replaceAll('\n', ' ');
const astra = data.filter((c) => c.group === 'astra');
const latest = data
  .map((c) => c.observedAt)
  .sort((a, b) => a.localeCompare(b))
  .at(-1);
const videoCount = astra.reduce(
  (n, c) => n + (c.archivedVideos?.length ?? 0),
  0,
);
const sourceCount = astra.filter((c) => c.repositoryUrl).length;
const demoCount = astra.filter((c) => c.demoUrl).length;
let text = `# 案例目录\n\n由 \`data/cases.json\` 生成。最近核查：${latest}。[上手路线](START_HERE.md) · [最新收录](UPDATES.md)。作品归属基于公开来源，不代表独立复现。\n\n`;
for (const [group, title] of [
  ['astra', 'GPT-6 Astra 案例'],
  ['reference', '独立方法参考'],
]) {
  const rows = data.filter((c) => c.group === group);
  text += `## ${title}（${rows.length}）\n\n`;
  for (const category of new Set(rows.map((c) => c.category))) {
    text += `### ${category}\n\n| 作品 | 作者 / 来源 | 证据 | 产物与过程 |\n|---|---|---|---|\n`;
    for (const c of rows.filter((c) => c.category === category)) {
      const links =
        [
          c.demoUrl ? `[在线作品](${c.demoUrl})` : null,
          c.repositoryUrl ? `[源码](${c.repositoryUrl})` : null,
          c.videoUrl ? `[视频](${c.videoUrl})` : null,
          c.promptUrl ? `[提示词/过程](${c.promptUrl})` : null,
        ]
          .filter(Boolean)
          .join(' · ') || '原帖展示';
      text += `| [${safe(c.title)}](${c.sourceUrl}) | ${safe(c.author)} · ${c.platform} | ${labels[c.evidenceLevel]} | ${links} |\n`;
    }
    text += '\n';
  }
}
fs.writeFileSync(new URL('CATALOG.md', root), text.trimEnd() + '\n');
let updates = `# 最新收录 / Latest additions\n\n按本库收录日期排列，不等同于作品首次发布日期。更新由事实源生成。[浏览网站](${SITE_URL}?order=newest#collection) · [收录规则](CONTRIBUTING.md)\n\n`;
for (const date of [...new Set(astra.map((c) => c.addedAt))].sort((a, b) =>
  b.localeCompare(a),
)) {
  const rows = astra.filter((c) => c.addedAt === date);
  updates += `## ${date} · ${rows.length} 个案例\n\n| 作品 / Example | 作者 | 可用材料 |\n| --- | --- | --- |\n`;
  for (const c of rows) {
    const materials =
      [
        c.repositoryUrl ? '源码 / 工程' : null,
        c.demoUrl ? '演示入口' : null,
        c.archivedVideos?.length ? '完整视频' : null,
        c.promptUrl ? '提示词 / 过程' : null,
      ]
        .filter(Boolean)
        .join(' · ') || '作者展示';
    updates += `| [${safe(c.title)}${c.titleEn ? ' / ' + safe(c.titleEn) : ''}](${SITE_URL}${casePath(c.id)}) | ${safe(c.author)} | ${materials} |\n`;
  }
  updates += '\n';
}
fs.writeFileSync(new URL('UPDATES.md', root), updates.trimEnd() + '\n');
for (const [file, summary] of [
  [
    'README.md',
    `截至 **${latest}（Asia/Shanghai）**：**${astra.length} 条 Astra 案例** · **${sourceCount} 条源码 / 工程** · **${demoCount} 个演示入口** · **${videoCount} 个完整视频**。另有 **${data.length - astra.length} 条独立方法参考**，不计入 Astra 数量。`,
  ],
  [
    'README.en.md',
    `Updated **${latest} (Asia/Shanghai)** · **${astra.length} Astra examples** · **${sourceCount} source / project links** · **${demoCount} demo links** · **${videoCount} complete videos** · **${data.length - astra.length} separate references**.`,
  ],
]) {
  const url = new URL(file, root),
    body = fs.readFileSync(url, 'utf8');
  const updated = replaceSection(body, file, 'summary', summary);
  const english = file === 'README.en.md';
  const newest = [...astra]
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, 8);
  let additions = english
    ? '| Example | Creator | Resources |\n| --- | --- | --- |\n'
    : '| 作品 | 原作者 | 直接入口 |\n| --- | --- | --- |\n';
  for (const c of newest) {
    const links = [
      c.demoUrl ? `[${english ? 'Demo' : '演示'}](${c.demoUrl})` : null,
      c.repositoryUrl
        ? `[${english ? 'Source' : '源码'}](${c.repositoryUrl})`
        : null,
      `[${english ? 'Original' : '原始来源'}](${c.sourceUrl})`,
    ]
      .filter(Boolean)
      .join(' · ');
    additions += `| [${safe(english ? (c.titleEn ?? c.title) : c.title)}](${SITE_URL}${casePath(c.id, english ? 'en' : 'zh')}) | ${safe(c.author)} | ${links} |\n`;
  }
  fs.writeFileSync(
    url,
    replaceSection(updated, file, 'latest', additions.trimEnd()),
  );
}
function replaceSection(body, file, name, value) {
  const start = `<!-- atlas:${name}:start -->`;
  const end = `<!-- atlas:${name}:end -->`;
  const a = body.indexOf(start),
    b = body.indexOf(end);
  if (
    a < 0 ||
    b < a + start.length ||
    body.lastIndexOf(start) !== a ||
    body.lastIndexOf(end) !== b
  )
    throw new Error(`${file}: expected one ordered pair of ${name} markers`);
  return body.slice(0, a + start.length) + '\n' + value + '\n' + body.slice(b);
}
fs.writeFileSync(new URL('public/sitemap.xml', root), renderSitemap(data));
console.log(
  `Generated catalogs, README statistics, public JSON and sitemap from ${data.length} source records.`,
);
