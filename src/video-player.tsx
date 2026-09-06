'use client';
/* oxlint-disable jsx-a11y/media-has-caption -- Source clips have no verified caption tracks; do not fabricate transcripts. */
import {useState} from 'react';
import {Download, ExternalLink} from 'lucide-react';
import type {ArchivedVideo} from './catalog';

export function videoTime(seconds:number){const rounded=Math.round(seconds);return `${Math.floor(rounded/60)}:${String(rounded%60).padStart(2,'0')}`;}
export function VideoPlayer({video,title,poster}:{video:ArchivedVideo;title:string;poster?:string|null}){
 const [failed,setFailed]=useState(false);
 return <section className="archived-video" aria-label={`完整视频：${title}`}>
  <video controls playsInline preload="metadata" poster={poster??undefined} aria-label={`${title}，完整视频`} onError={()=>setFailed(true)}>
   <source src={video.playbackUrl} type="video/mp4"/>
   你的浏览器不支持视频播放，请使用下方下载链接。
  </video>
  {failed&&<output className="video-error">视频加载失败，可以下载完整文件或查看原帖。</output>}
  <div className="video-meta"><span>完整视频 · {videoTime(video.durationSeconds)} · 未裁剪</span><a href={video.downloadUrl} target="_blank" rel="noreferrer"><Download size={14}/>下载最高画质 · {(video.bytes/1024/1024).toFixed(1)} MB</a><a href={video.sourceUrl} target="_blank" rel="noreferrer">视频原帖 <ExternalLink size={13}/></a></div>
 </section>;
}
