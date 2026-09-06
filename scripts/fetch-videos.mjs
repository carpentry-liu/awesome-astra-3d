import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {Readable, Transform} from 'node:stream';
import {createWriteStream} from 'node:fs';
import {pipeline} from 'node:stream/promises';

// Full-length, source-provided playback renditions. Original highest-quality files
// remain available as release attachments; never trim or transcode during builds.
const manifest=JSON.parse(await fs.readFile(new URL('../data/videos.json',import.meta.url),'utf8'));
const destination=new URL('../dist/client/videos/',import.meta.url);
await fs.mkdir(destination,{recursive:true});
for(const video of manifest.videos.filter(v=>v.kind==='web')){
 if(!/^[a-z0-9-]+\.mp4$/.test(video.filename))throw new Error('Invalid video filename');
 const url=new URL(video.releaseUrl);
 if(url.protocol!=='https:'||url.hostname!=='github.com')throw new Error('Unexpected release origin');
 const response=await fetch(url,{signal:AbortSignal.timeout(180000)});
 if(!response.ok||!response.body)throw new Error(`Video download failed: ${video.filename} (${response.status})`);
 const hash=createHash('sha256');let bytes=0;
 const meter=new Transform({transform(chunk,encoding,callback){hash.update(chunk);bytes+=chunk.length;callback(null,chunk);}});
 const output=path.join(destination.pathname,video.filename);
 const file=new URL(video.filename,destination);
 await pipeline(Readable.fromWeb(response.body),meter,createWriteStream(file));
 if(bytes!==video.bytes||hash.digest('hex')!==video.sha256){await fs.unlink(file);throw new Error(`Video integrity mismatch: ${video.filename}`);}
 console.log(`Verified complete video: ${path.basename(output)} (${bytes} bytes)`);
}
