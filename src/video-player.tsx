'use client';
/* oxlint-disable jsx-a11y/media-has-caption -- Source clips have no verified caption tracks; do not fabricate transcripts. */
import {useState} from 'react';
import {Download, ExternalLink} from 'lucide-react';
import type {ArchivedVideo} from './catalog';

export function videoTime(seconds:number){const rounded=Math.round(seconds);return `${Math.floor(rounded/60)}:${String(rounded%60).padStart(2,'0')}`;}
export function VideoPlayer({video,title,poster}:{video:ArchivedVideo;title:string;poster?:string|null}){
 const [failed,setFailed]=useState(false);
 return <section className="archived-video" aria-label={`完整视频：${title}`}>
  {video.label && <h3 className="video-stage">{video.label}</h3>}
  {!failed ? <video controls playsInline preload="metadata" src={video.playbackUrl} poster={poster??undefined} aria-label={`${title}，完整视频`} onError={()=>setFailed(true)}>
   你的浏览器不支持视频播放，请使用下方下载链接。
  </video> : <>
   {poster && <img src={poster} alt={`${title} — 效果图`} referrerPolicy="no-referrer" style={{width:'100%',height:'auto'}} />}
   <output className="video-error">当前网络无法播放录像，已切换为效果图。可通过下方入口下载完整文件。</output>
  </>}
  <div className="video-meta"><span>完整视频 · {videoTime(video.durationSeconds)} · 未裁剪</span><a href={video.downloadUrl} target="_blank" rel="noreferrer"><Download size={14}/>下载最高画质 · {(video.bytes/1024/1024).toFixed(1)} MB</a><a href={video.sourceUrl} target="_blank" rel="noreferrer">视频原帖 <ExternalLink size={13}/></a></div>
 </section>;
}
