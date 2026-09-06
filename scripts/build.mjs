import { spawnSync } from 'node:child_process';
import './generate-catalog.mjs';
// Node 24.14 on Windows aborts during Vinext prerender shutdown (libuv async.c).
// Use the verified Node 22 runtime from the official npm distribution there.
const needsCompatibleRuntime=process.platform==='win32'&&Number(process.versions.node.split('.')[0])>=24;
const result=needsCompatibleRuntime
 ? spawnSync('npm.cmd',['exec','--yes','--package=node@22.22.0','--','node','node_modules/vinext/dist/cli.js','build'],{stdio:'inherit',shell:true})
 : spawnSync(process.execPath,['node_modules/vinext/dist/cli.js','build'],{stdio:'inherit'});
if(result.error){console.error(result.error.message);process.exit(1);}
if(result.status!==0)process.exit(result.status??1);
await import('./verify-export.mjs');
