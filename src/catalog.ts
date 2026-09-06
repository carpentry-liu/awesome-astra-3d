export type EvidenceLevel = 'official' | 'author' | 'secondary' | 'reference';
export type Case = {
 id:string; title:string; titleEn:string|null; group:'astra'|'reference'; category:string; platform:string; platforms:string[]; author:string|null;
 sourceUrl:string; sourceDate:string|null; secondaryPublishedAt:string|null; observedAt:string; modelLabel:string; evidenceLevel:EvidenceLevel; evidenceStatus:string; evidenceNote:string; sourceAccess:string;
 summary:string; outputType:string[]; promptAvailability:string; promptExcerpt:string|null; promptSummary:string|null; promptUrl:string|null;
 imageUrl:string|null; imageKind:string; imageCaption:string; demoUrl:string|null; videoUrl:string|null; repositoryUrl:string|null; evidenceUrls:string[]; licenseNotes:string; outcome:string;
};
export const evidenceLabels:Record<EvidenceLevel,string>={official:'官方展示',author:'作者自述',secondary:'转引待复核',reference:'方法参考'};
export type Filters={query?:string;group?:string;category?:string;platform?:string};
export function filterCases(cases:Case[],{query='',group='astra',category='全部',platform='全部'}:Filters={}){
 const words=query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
 return cases.filter(c=>c.group===group && (category==='全部'||c.category===category) && (platform==='全部'||c.platform===platform) && words.every(w=>[c.title,c.titleEn,c.author,c.category,c.modelLabel,c.platform,...c.platforms,...c.outputType,c.summary].join(' ').toLocaleLowerCase().includes(w)));
}
export function validateSearch(input:unknown):Filters{
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Expected a search object');
 const obj=input as Record<string,unknown>;
 for(const [key,value] of Object.entries(obj)){if(!['query','group','category','platform'].includes(key)||typeof value!=='string')throw new Error('Unknown field or non-string value');}
 if(obj.group && !['astra','reference'].includes(obj.group as string))throw new Error('Unknown group');
 return obj as Filters;
}
