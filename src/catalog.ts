export type EvidenceLevel = 'official' | 'author' | 'secondary' | 'reference';
export type ArchivedVideo = {label?:string;posterUrl?:string;playbackUrl:string;downloadUrl:string;durationSeconds:number;bytes:number;sha256:string;sourceUrl:string};
export type Case = {
 id:string; title:string; titleEn:string|null; group:'astra'|'reference'; category:string; platform:string; platforms:string[]; author:string|null;
 sourceUrl:string; sourceDate:string|null; secondaryPublishedAt:string|null; observedAt:string; addedAt:string; modelLabel:string; evidenceLevel:EvidenceLevel; evidenceStatus:string; evidenceNote:string; sourceAccess:string;
 summary:string; outputType:string[]; promptAvailability:string; promptExcerpt:string|null; promptSummary:string|null; promptUrl:string|null;
 imageUrl:string|null; imageKind:string; imageCaption:string; demoUrl:string|null; videoUrl:string|null; repositoryUrl:string|null; evidenceUrls:string[]; licenseNotes:string; outcome:string; archivedVideos?:ArchivedVideo[];
};
// Only fields needed by cards/search. Source evidence and full video manifests
// are loaded from the per-case JSON after a visitor opens a detail.
export type CaseIndex = Pick<Case,
 'id'|'title'|'titleEn'|'group'|'category'|'platform'|'platforms'|'author'|
 'sourceUrl'|'addedAt'|'observedAt'|'modelLabel'|'evidenceLevel'|'summary'|
 'outputType'|'imageUrl'|'imageKind'|'imageCaption'|'demoUrl'|'repositoryUrl'|'outcome'
> & {archivedVideos?:Pick<ArchivedVideo,'durationSeconds'>[]};
export type Locale = 'zh'|'en';
export function readLocale(search:string):Locale{return new URLSearchParams(search).get('lang')==='en'?'en':'zh';}
export function writeLocale(search:string,locale:Locale):string{
 const params=new URLSearchParams(search);
 if(locale==='en')params.set('lang','en');else params.delete('lang');
 return params.size?'?'+params.toString():'';
}
export function caseHref(id:string,locale:Locale='zh'):string{return `./${locale==='en'?'en/':''}cases/${encodeURIComponent(id)}/`;}
export function collectionHref(resource='all',order='curated',search=''):string {
 return `./${writeCatalogSearch(search,{group:'astra',resource,order})}#collection`;
}
export const resourceLabels={all:'全部材料',source:'有源码',demo:'演示入口',video:'完整视频'};
export type Filters={query?:string;group?:string;category?:string;platform?:string;resource?:string;order?:string};
export function filterCases<T extends CaseIndex>(cases:T[],{query='',group='astra',category='全部',platform='全部',resource='all',order='curated'}:Filters={}):T[]{
 const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 const result=cases.filter(c=>c.group===group && (category==='全部'||c.category===category) && (platform==='全部'||c.platform===platform) && (resource==='all'||(resource==='source'&&!!c.repositoryUrl)||(resource==='demo'&&!!c.demoUrl)||(resource==='video'&&!!c.archivedVideos?.length)) && words.every(w=>[c.title,c.titleEn,c.author,c.category,c.modelLabel,c.platform,...c.platforms,...c.outputType,c.summary].join(' ').toLocaleLowerCase().includes(w)));
 return order==='newest'?result.sort((a,b)=>b.addedAt.localeCompare(a.addedAt)):result;
}
const searchFields={query:'q',group:'group',category:'category',platform:'platform',resource:'resource',order:'order'} as const;
const defaults:Required<Filters>={query:'',group:'astra',category:'全部',platform:'全部',resource:'all',order:'curated'};
export function readCatalogSearch(search:string):Required<Filters>{
 const params=new URLSearchParams(search),result={...defaults};
 for(const [field,param] of Object.entries(searchFields)){
  const value=params.get(param);if(value!==null)result[field as keyof Filters]=value.slice(0,256);
 }
 if(!['astra','reference','about'].includes(result.group))result.group='astra';
 if(!Object.hasOwn(resourceLabels,result.resource))result.resource='all';
 if(!['curated','newest'].includes(result.order))result.order='curated';
 return result;
}
export function writeCatalogSearch(search:string,filters:Filters):string{
 const params=new URLSearchParams(search);
 for(const [field,param] of Object.entries(searchFields)){
  const value=filters[field as keyof Filters]??defaults[field as keyof Filters];
  if(value===defaults[field as keyof Filters])params.delete(param);else params.set(param,value);
 }
 return params.size?'?'+params.toString():'';
}
export function validateSearch(input:unknown):Filters{
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Expected a search object');
 const obj=input as Record<string,unknown>;
 for(const [key,value] of Object.entries(obj)){if(!Object.hasOwn(searchFields,key)||typeof value!=='string')throw new Error('Unknown field or non-string value');}
 if(obj.group && !['astra','reference'].includes(obj.group as string))throw new Error('Unknown group');
 if(obj.resource&&!Object.hasOwn(resourceLabels,obj.resource as string))throw new Error('Unknown resource');
 if(obj.order&&!['curated','newest'].includes(obj.order as string))throw new Error('Unknown order');
 return obj as Filters;
}
