import { filterCases, validateSearch, type Case } from './catalog';
type ModelContext={registerTool:(tool:unknown,options:{signal:AbortSignal})=>void|Promise<void>};
export function registerCatalogTool(cases:Case[]){
 const context=(document as Document & {modelContext?:ModelContext}).modelContext;
 if(!context?.registerTool)return;
 const lifecycle=new AbortController();
 try{void Promise.resolve(context.registerTool({name:'search_astra_cases',title:'搜索三维案例',description:'Read the curated case index using the same filters as the visible gallery. Does not change the page or visit external sources.',inputSchema:{type:'object',properties:{query:{type:'string'},group:{type:'string',enum:['astra','reference']},category:{type:'string'},platform:{type:'string'}},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute(input:unknown){const records=filterCases(cases,validateSearch(input));return {count:records.length,cases:records.map(({id,title,sourceUrl,evidenceLevel})=>({id,title,sourceUrl,evidenceLevel}))};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
 return ()=>lifecycle.abort();
}
