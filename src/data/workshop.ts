import { CHALLENGES, ORGANISMS, createTeam, isCanvasEntryReady, isPitchTitleReady, isPitchSummaryReady, type CanvasData, type TeamData, type Challenge } from "./biolab-data";
import { CLIMATE_CHALLENGES } from "./climate-challenges";
import { STRATEGIC_CHALLENGES, EXTRA_MODELS, type Track } from "./resilience-expansion";

export const pools: Record<Track, Challenge[]> = { general: CHALLENGES, climate: CLIMATE_CHALLENGES, resilience: STRATEGIC_CHALLENGES };
export const tracks: Track[] = ["general","climate","resilience"];
export const canvasKeys: (keyof CanvasData)[] = ["problem","organism","principle","solution","benefit","implementation"];
export const modelPool = [...ORGANISMS,...EXTRA_MODELS];
export const rubricKeys = ["mechanism","innovation","feasibility","contribution","evidence"] as const;
export type Rating = (number | null)[];
export type Session = { id:string; track:Track; challengeId:string; count:number };
export type Proposal = { schema:"biolab-workshop-proposal-v1"; code:string; slot:number; language:"es"|"en"; organismId:string; canvas:CanvasData; pitchTitle:string; pitchSummary:string };
const letters = { general:"G",climate:"C",resilience:"R" };
export function codeFor(s:Session){return ["BL1",letters[s.track],s.challengeId.toUpperCase(),s.id.toUpperCase(),s.count].join("-");}
export function parseCode(input:string):Session|null{
 const m=input.trim().toUpperCase().match(/^BL1-([GCR])-([CR][0-9]{1,2})-([0-9A-F]{16})-([2-6])$/);
 if(!m)return null;
 const track=tracks.find(t=>letters[t]===m[1])!;
 const challengeId=m[2].toLowerCase();
 if(!pools[track].some(c=>c.id===challengeId))return null;
 return {id:m[3],track,challengeId,count:Number(m[4])};
}
export function createSession(track:Track,count:number, random:()=>number=Math.random):Session{
 if(!tracks.includes(track)||!Number.isInteger(count)||count<2||count>6)throw Error("invalid configuration");
 const pool=pools[track], index=Math.floor(random()*pool.length);
 if(!pool[index])throw Error("invalid draw");
 const bytes=crypto.getRandomValues(new Uint8Array(8));
 return {id:Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("").toUpperCase(),track,challengeId:pool[index].id,count};
}
export function challengeFor(s:Session){return pools[s.track].find(c=>c.id===s.challengeId)!;}
export function validSlot(s:Session,slot:number){return Number.isInteger(slot)&&slot>=1&&slot<=s.count;}
export function teamFor(s:Session,slot:number,name:string,language:string):TeamData{
 if(!validSlot(s,slot))throw Error("invalid team");
 return {...createTeam(name,slot-1),id:"workshop-"+s.id+"-"+slot+"-"+language,challenge:challengeFor(s)};
}
export function validateProposal(value:unknown,s:Session):Proposal|null{
 if(!value||typeof value!=="object")return null;
 const p=value as Partial<Proposal>;
 if(p.schema!=="biolab-workshop-proposal-v1"||p.code!==codeFor(s)||!validSlot(s,p.slot??0)||!["es","en"].includes(p.language??"")||!modelPool.some(o=>o.id===p.organismId))return null;
 if(typeof p.pitchTitle!=="string"||p.pitchTitle.length>500||!isPitchTitleReady(p.pitchTitle)||typeof p.pitchSummary!=="string"||p.pitchSummary.length>12000||!isPitchSummaryReady(p.pitchSummary))return null;
 if(!p.canvas||typeof p.canvas!=="object"||!canvasKeys.every(k=>typeof p.canvas![k]==="string"&&p.canvas![k].length<=12000&&isCanvasEntryReady(k,p.canvas![k])))return null;
 return {schema:"biolab-workshop-proposal-v1",code:codeFor(s),slot:p.slot!,language:p.language!,organismId:p.organismId!,pitchTitle:p.pitchTitle,pitchSummary:p.pitchSummary,canvas:Object.fromEntries(canvasKeys.map(k=>[k,p.canvas![k]])) as unknown as CanvasData};
}
export function proposalFor(s:Session,slot:number,team:TeamData,language:"es"|"en"){return validateProposal({schema:"biolab-workshop-proposal-v1",code:codeFor(s),slot,language,organismId:team.organism?.id,canvas:team.canvas,pitchTitle:team.pitchTitle,pitchSummary:team.pitchSummary},s);}
export function addProposal(list:Proposal[],p:Proposal,s:Session):Proposal[]{
 const valid=validateProposal(p,s);if(!valid||list.some(x=>x.slot===valid.slot))throw Error("invalid or duplicate proposal");
 return [...list,valid].sort((a,b)=>a.slot-b.slot);
}
export function allReceived(s:Session,list:Proposal[]){return Array.from({length:s.count},(_,i)=>i+1).every(slot=>list.some(p=>p.slot===slot));}
export function ratingTotal(r?:Rating){return r?.length===rubricKeys.length&&r.every(n=>typeof n==="number"&&Number.isInteger(n)&&n>=1&&n<=5)?r.reduce<number>((a,n)=>a+(n??0),0):null;}
export function ranking(s:Session,list:Proposal[],ratings:Record<number,Rating>){
 if(!allReceived(s,list)||list.some(p=>ratingTotal(ratings[p.slot])===null))return [];
 return list.map(p=>({slot:p.slot,total:ratingTotal(ratings[p.slot])!})).sort((a,b)=>b.total-a.total||a.slot-b.slot).map((p,_,all)=>({...p,rank:all.findIndex(x=>x.total===p.total)+1}));
}
export function toTeam(s:Session,p:Proposal,name:string):TeamData{return {...teamFor(s,p.slot,name,p.language),organism:modelPool.find(o=>o.id===p.organismId),canvas:p.canvas,pitchTitle:p.pitchTitle,pitchSummary:p.pitchSummary};}
