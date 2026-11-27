import { useState } from "react";
import type { Track } from "@/data/resilience-expansion";
type PilotTrack=Track;
type Phase="pre"|"post";
type Question=[string,string,string,string,number];
const bank:Record<PilotTrack,Record<Phase,Question[]>>={
  general:{"pre":[["An organism looks like a component. What makes the inspiration meaningful?","The function, causal mechanism and transfer limitations","Visual resemblance alone","The popularity of the inspiration",0],["A biomimetic idea promises to reduce a vulnerability. How should it be assessed?","Accept the improvement because it is biological","Measure only the number of ideas","An equivalent baseline, metrics and tests that could refute it",2],["A team identifies future heat or a supply dependency. What must its proposal connect?","Solution and cost without analysing function","Hazard, vulnerable function, proposed mechanism and verification owner","Organism and a generic sustainability promise",1],["A proposal is promising but untested. What can be stated?","It is a learning hypothesis requiring verification","It is approved for real use","Operational improvement is proven",0]],"post":[["A natural structure has an appealing shape. What should you investigate first?","Visual resemblance alone","The popularity of the inspiration","The function, causal mechanism and transfer limitations",2],["A proposal mimics a natural strategy and claims durability. What is missing?","Measure only the number of ideas","An equivalent baseline, metrics and tests that could refute it","Accept the improvement because it is biological",1],["A hypothesis affects a component or process. How can it link to professional work?","Hazard, vulnerable function, proposed mechanism and verification owner","Organism and a generic sustainability promise","Solution and cost without analysing function",0],["The idea scores well in the workshop. What conclusion is justified?","It is approved for real use","Operational improvement is proven","It is a learning hypothesis requiring verification",2]]},
  "climate": {
    "pre": [
      [
        "Which is an example of climate adaptation?",
        "Reducing equipment exposure to future heat",
        "Reducing manufacturing CO₂ alone",
        "Changing equipment branding",
        0
      ],
      [
        "Before changing a material for a future hazard, what do you need?",
        "The organism's name",
        "Scenario, exposure, vulnerability and requirements",
        "A savings estimate without data",
        1
      ],
      [
        "What does a biological analogy establish?",
        "Automatic certification",
        "Guaranteed risk reduction",
        "A hypothesis requiring tests",
        2
      ],
      [
        "A coating repels water. What can you conclude?",
        "It resists all abrasion",
        "Erosion and deposition require separate tests",
        "It removes all climate risks",
        1
      ]
    ],
    "post": [
      [
        "An enclosure could overheat in future summers. Which action is adaptation?",
        "Buying carbon offsets",
        "Review thermal exposure and test protection",
        "Change its colour without measurement",
        1
      ],
      [
        "What makes a hail comparison defensible?",
        "Equivalent function, exposure and test criteria",
        "Lowest price",
        "The second design is nature-inspired",
        0
      ],
      [
        "Humidity testing does not support the expected response. What next?",
        "Report the benefit anyway",
        "Increase the creativity score",
        "Revise or reject the hypothesis",
        2
      ],
      [
        "A surface retains less dry dust. What remains to check?",
        "Its appearance alone",
        "Durability and erosion under relevant conditions",
        "Nothing, it is validated",
        1
      ]
    ]
  },
  "resilience": {
    "pre": [
      [
        "What is process resilience?",
        "Preserving or restoring a function during disruption",
        "Reducing every cost",
        "Always buying more resources",
        0
      ],
      [
        "Two suppliers use the same factory. What should you review?",
        "Their logo colours",
        "Common dependency and qualified alternatives",
        "Nothing, redundancy is already established",
        1
      ],
      [
        "What can a biomimetic concept without tests establish?",
        "Proven higher availability",
        "Airworthiness",
        "An improvement hypothesis",
        2
      ],
      [
        "Which metric can test improved repairability?",
        "Number of design images",
        "Intervention time and damage under equivalent conditions",
        "Number of ideas proposed",
        1
      ]
    ],
    "post": [
      [
        "A resource becomes unavailable. What would demonstrate resilience?",
        "Many unverified alternatives",
        "Preserving or restoring function through a viable alternative",
        "Reducing electricity consumption alone",
        1
      ],
      [
        "A supply alternative shares a critical sub-supplier. Which action makes sense?",
        "Verify independence and qualification",
        "Count both routes as independent",
        "Ignore the dependency",
        0
      ],
      [
        "A material self-seals but its strength is unmeasured. Which statement is valid?",
        "Full structural function is restored",
        "Service life has increased",
        "Check which function is restored and what damage remains",
        2
      ],
      [
        "A reversible joint saves disassembly time in a test. What remains?",
        "Only communicate savings",
        "Verify function, damage, cycles and acceptance conditions",
        "Nothing, full resilience is proven",
        1
      ]
    ]
  }
};
const PREF="biolab-pilot-track-v1";
const key=(id:string,track:PilotTrack)=>"biolab-pilot-v2:en:"+id+":"+track;
const attemptId=()=>globalThis.crypto?.randomUUID?.()??("bio-"+Date.now()+"-"+Math.random().toString(36).slice(2));
type RecordData={attemptId?:string;pre?:number[];post?:number[];utility?:number;clarity?:number;transfer?:number;confidence?:number;action?:string;challengeId?:string};
function read(id:string,track:PilotTrack):RecordData {try{return JSON.parse(localStorage.getItem(key(id,track))||"{}")||{};}catch{return {};}}
function write(id:string,track:PilotTrack,value:RecordData){localStorage.setItem(key(id,track),JSON.stringify(value));}
export function preferredTrack():Track {try{const v=localStorage.getItem(PREF);return v==="climate"||v==="resilience"?v:"general";}catch{return "general";}}
export function setPreferredTrack(track:Track){try{localStorage.setItem(PREF,track);}catch{/* default remains general */}}
export function hasBaseline(id:string,track:PilotTrack,challengeId?:string){const data=read(id,track),p=data.pre;return Array.isArray(p)&&p.length===4&&p.every(x=>Number.isInteger(x)&&x>=0&&x<=3)&&!(challengeId&&data.post&&data.challengeId!==challengeId);}
const score=(answers:number[]|undefined,qs:Question[])=>answers?.length===qs.length?answers.filter((a,i)=>a===qs[i][4]).length:null;
const actionOptions=[["discuss","Discuss with my area or owner"],["seek_evidence","Seek evidence or requirements"],["apply_learning","Apply learning in an authorised activity"],["none","No planned action"],["not_applicable","Not applicable"]];
function resultData(record:RecordData,track:PilotTrack){return {schema:1,assessmentVersion:"biolab-pilot-v2",resourceId:"bio-inspired-innovation-lab",language:"en",unit:"session/team",sessionKey:record.attemptId,track,challengeId:record.challengeId??null,preScore:score(record.pre,bank[track].pre),postScore:score(record.post,bank[track].post),maxScore:4,utility:record.utility,clarity:record.clarity,transfer:record.transfer,confidence:record.confidence,action:record.action,limitation:"Self-reported use; descriptive uncalibrated learning assessment; no identity or technical approval."};}
export function PilotAssessment({teamId,track,phase,challengeId}:{teamId:string;track:PilotTrack;phase:Phase;challengeId?:string}){
 const [record,setRecord]=useState(()=>{const data=read(teamId,track);return phase==="post"&&data.challengeId&&data.challengeId!==challengeId?{}:data;});
 const [answers,setAnswers]=useState<number[]>(()=>record[phase]??[-1,-1,-1,-1]);
 const [utility,setUtility]=useState(record.utility??-1),[clarity,setClarity]=useState(record.clarity??-1),[transfer,setTransfer]=useState(record.transfer??-1),[confidence,setConfidence]=useState(record.confidence??-1),[action,setAction]=useState(record.action??"");
 const [error,setError]=useState(false);
 const questions=bank[track][phase],locked=record[phase]?.length===4;
 const before=score(record.pre,bank[track].pre),after=score(record.post,bank[track].post);
 const save=()=>{try{const next={...record,attemptId:record.attemptId??attemptId(),[phase]:answers,...(phase==="post"?{utility,clarity,transfer,confidence,action,challengeId}: {})};write(teamId,track,next);if(phase==="post")localStorage.setItem("biolab-pilot-result-v2:"+next.attemptId,JSON.stringify(resultData(next,track)));setRecord(next);setError(false);}catch{setError(true);}};
 const restart=()=>{if(!window.confirm("Start a new assessment? The previous result remains in local records. Repeat the learning journey from the beginning."))return;try{write(teamId,track,{});setRecord({});setAnswers([-1,-1,-1,-1]);setError(false);}catch{setError(true);}};
 const exportResult=()=>{const data=resultData(record,track);const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="biolab-pilot-result.json";a.click();URL.revokeObjectURL(url);};
 return <section className="max-w-6xl mx-auto biolab-card my-6" aria-label={phase==="pre"?"Initial assessment":"Final assessment"}>
 <h2 className="font-display text-2xl font-bold mb-3">{phase==="pre"?"Before the challenge · 4 questions":"After the challenge · learning and usefulness"}</h2>
 <p className="text-muted-foreground mb-4">{phase==="pre"?"Answer without consulting references. Answers are not revealed until the end; no pass score is required, only four completed responses.":"Answer after reviewing the proposal and example. Rate the usefulness of the route. Scores are indicative, not technical competence accreditation."}</p>
 {phase==="post"&&before===null&&<p className="mb-3 text-amber-800">No initial assessment is recorded; learning gain will not be calculated.</p>}
 {!locked&&<div className="space-y-4">{questions.map((q,i)=><fieldset key={i} className="border rounded-xl p-4"><legend className="font-semibold px-2">{i+1}. {q[0]}</legend>{[...q.slice(1,4),"I do not know yet"].map((option,j)=><label key={j} className="flex items-start gap-2 py-2"><input type="radio" name={teamId+track+phase+i} checked={answers[i]===j} onChange={()=>setAnswers(prev=>prev.map((x,k)=>k===i?j:x))}/><span>{option}</span></label>)}</fieldset>)}
 {phase==="post"&&<div className="grid md:grid-cols-3 gap-3">{([["Usefulness for my work",utility,setUtility],["Clarity without facilitator",clarity,setClarity],["Ability to apply learning",transfer,setTransfer],["Perceived confidence in analysing decisions",confidence,setConfidence]] as [string,number,(n:number)=>void][]).map(([label,value,set])=><label className="border rounded-xl p-3" key={label}><span className="block font-semibold mb-2">{label}</span><select className="w-full border rounded p-2 bg-background" value={value} onChange={e=>set(Number(e.target.value))}><option value={-1}>Select 1–5</option><option value={0}>Not applicable</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?"Very low":n===5?"Very high": ""}</option>)}</select></label>)}<label className="border rounded-xl p-3"><span className="block font-semibold mb-2">Intended next step</span><select className="w-full border rounded p-2 bg-background" value={action} onChange={e=>setAction(e.target.value)}><option value="">Select</option>{actionOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}
 <button type="button" className="biolab-btn-primary" disabled={answers.some(a=>a<0)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action))} onClick={save}>Save assessment</button></div>}
 {error&&<p role="alert">Could not save in browser. Check local storage is available.</p>}
 {locked&&<p className="font-semibold text-primary">Assessment recorded.</p>}
 {locked&&phase==="pre"&&record.post&&<button type="button" className="biolab-btn-ghost" onClick={restart}>New assessment for another journey</button>}
 {locked&&phase==="post"&&<div className="mt-4 space-y-3"><p className="font-bold text-lg">Initial: {before??"—"}/4 · Final: {after}/4 {before!==null&&after!==null&&` · ${(after-before)*25} pp`}</p><p className="text-sm text-muted-foreground">Descriptive change across uncalibrated parallel forms. Does not establish causality or business results.</p>{questions.map((q,i)=><p className="text-sm" key={i}><strong>{q[0]}</strong> — {q[q[4]+1]}</p>)}<button type="button" className="biolab-btn-primary" onClick={exportResult}>Export unnamed results (JSON)</button><p className="text-sm">Share the file only through the authorised pilot channel. Nothing is sent automatically.</p></div>}
 </section>;
}
