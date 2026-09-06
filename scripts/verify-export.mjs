import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';

// A successful bundler exit does not guarantee the static route was emitted.
const root=fileURLToPath(new URL('../dist/client/',import.meta.url));
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert(html.includes('ASTRA'),'Missing rendered homepage');
const base=process.env.GITHUB_PAGES==='true'?'https://carpentry-liu.github.io/awesome-astra-3d/':'https://local.invalid/';
const assets=[...html.matchAll(/(?:src|href)="([^"<>]+\.(?:js|css))"/g)].map(m=>m[1]);
assert(assets.length>0,'Missing application assets');
for(const asset of assets){
 const url=new URL(asset,base);
 assert(url.href.startsWith(base),`Asset outside deployment path: ${asset}`);
 const relative=decodeURIComponent(url.href.slice(base.length));
 const file=path.resolve(root,relative);
 assert(file.startsWith(root)&&fs.existsSync(file),`Missing asset: ${relative}`);
}
fs.writeFileSync(path.join(root,'.nojekyll'),'');
console.log(`Verified exported homepage and ${assets.length} asset references.`);
