import {openPdfReport,type Report} from "@/data/report-export";
import { useState } from "react";
import type { Track } from "@/data/resilience-expansion";
type PilotTrack=Track;
type Phase="pre"|"post";
type Question=[string,string,string,string,number];
const bank:Record<PilotTrack,Record<Phase,Question[]>>={
  general:{"pre":[["An organism looks like a component. What makes the inspiration meaningful?","The function, causal mechanism and transfer limitations","Visual resemblance alone","The popularity of the inspiration",0],["A biomimetic idea promises to reduce a vulnerability. How should it be assessed?","Accept the improvement because it is biological","Measure only the number of ideas","An equivalent baseline, metrics and tests that could refute it",2],["A team identifies future heat or a supply dependency. What must its proposal connect?","Solution and cost without analysing function","Hazard, vulnerable function, proposed mechanism and verification owner","Organism and a generic sustainability promise",1],["A proposal is promising but untested. What can be stated?","It is a learning hypothesis requiring verification","It is approved for real use","Operational improvement is proven",0]],"post":[["A natural structure has an appealing shape. What should you investigate first?","Visual resemblance alone","The popularity of the inspiration","The function, causal mechanism and transfer limitations",2],["A proposal mimics a natural strategy and claims durability. What is missing?","Measure only the number of ideas","An equivalent baseline, metrics and tests that could refute it","Accept the improvement because it is biological",1],["A hypothesis affects a component or process. How can it link to professional work?","Hazard, vulnerable function, proposed mechanism and verification owner","Organism and a generic sustainability promise","Solution and cost without analysing function",0],["The idea looks promising after the workshop. What conclusion is justified?","It is approved for real use","Operational improvement is proven","It is a learning hypothesis requiring verification",2]]},
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
type RecordData={pairedVersion?:number;attemptId?:string;pre?:number[];post?:number[];utility?:number;clarity?:number;transfer?:number;confidence?:number;action?:string;challengeId?:string};
function read(id:string,track:PilotTrack):RecordData {try{return JSON.parse(localStorage.getItem(key(id,track))||"{}")||{};}catch{return {};}}
function write(id:string,track:PilotTrack,value:RecordData){localStorage.setItem(key(id,track),JSON.stringify(value));}
export function preferredTrack():Track {try{const v=localStorage.getItem(PREF);return v==="climate"||v==="resilience"?v:"general";}catch{return "general";}}
export function setPreferredTrack(track:Track){try{localStorage.setItem(PREF,track);}catch{/* default remains general */}}
const actionOptions=[["discuss","Discuss with my area or owner"],["seek_evidence","Seek evidence or requirements"],["apply_learning","Apply learning in an authorised activity"],["none","No planned action"],["not_applicable","Not applicable"]];
const explanations:Record<Track,string[][]>={"general":[["Visual resemblance does not explain how a structure works.","Popularity does not demonstrate technical usefulness.","Function and causal mechanism allow us to study transfer and its limitations."],["Counting ideas does not measure durability.","An equivalent baseline, metrics and tests can confirm or refute the benefit.","Natural origin does not demonstrate improvement."],["Linking hazard, function, mechanism and owner makes the idea a testable hypothesis.","A generic promise does not explain reduced vulnerability.","Cost alone does not show that function is preserved."],["The workshop does not authorise real use.","Operational improvement requires comparative tests.","A reasoned idea remains a hypothesis until verified."]],"climate":[["Carbon offsets address mitigation, not direct heat protection.","Assessing exposure and testing protection addresses future physical vulnerability.","Changing colour without measuring does not establish a lower temperature."],["Equivalent function, exposure and criteria allow the effect of each design to be compared.","Price does not demonstrate impact resistance.","Natural inspiration does not establish hail resistance."],["Reporting the benefit contradicts the test.","Creativity does not replace evidence.","When data do not support the hypothesis, revise or reject it."],["Appearance does not measure wear or lost performance.","Reduced dust retention does not guarantee durability; erosion requires separate tests.","Reduced deposition does not validate all properties."]],"resilience":[["An unverified alternative may not be available when needed.","Resilience preserves or restores function during disruption through viable alternatives.","Reducing consumption alone does not prove continuity."],["Checking dependencies and qualification avoids mistaking shared vulnerability for redundancy.","Two routes sharing a critical resource are not independent.","Ignoring dependency hides a possible common failure."],["Sealing a crack does not establish recovered strength.","Life extension requires durability data.","Recovered function and residual damage must be measured."],["Disassembly time does not demonstrate that the joint works.","Function, damage and cycles establish repeatability and acceptance.","One test does not establish full resilience."]]};
const initialExplanations:Record<Track,string[][]>={"general":[["Function and causal mechanism explain what can be transferred and its limits.","External resemblance does not establish equivalent function.","Popularity is not evidence of usefulness."],["Biological origin does not guarantee a benefit.","Counting ideas does not measure vulnerability or the effect of a solution.","An equivalent baseline, metrics and tests can confirm or refute the hypothesis."],["Without examining the vulnerable function, cost cannot establish resilience.","Connecting hazard, function, mechanism and verification owner makes the proposed check concrete.","A generic promise does not explain reduced vulnerability."],["An untested idea is a hypothesis requiring verification.","A learning activity is not technical approval.","Without test results, improvement is not established."]],"climate":[["Reducing exposure to future heat addresses a physical climate risk.","Reducing emissions is mitigation; it does not itself reduce physical heat exposure.","Changing branding does not alter physical vulnerability."],["An organism's name does not identify exposure or technical requirements.","Scenario, exposure, vulnerability and requirements define what the solution must withstand.","An unsupported savings estimate does not demonstrate adaptation."],["A biological analogy is not certification.","An analogy does not guarantee risk reduction.","An analogy creates a hypothesis requiring tests."],["Water repellency does not establish abrasion resistance.","Erosion and deposition are distinct mechanisms requiring specific tests.","A surface property does not eliminate all climate risks."]],"resilience":[["Resilience preserves or restores a function during disruption.","Lower cost does not establish continuity or recovery.","Buying more resources does not guarantee their viability during disruption."],["Logos do not reveal shared dependencies.","A shared factory can cause a common failure; check independent qualified alternatives.","Two suppliers are not necessarily redundant when they share a factory."],["Availability requires evidence.","Airworthiness requires qualification and approval processes.","Without testing, only an improvement hypothesis can be stated."],["Image counts do not measure repairability.","Time and damage under equivalent conditions allow repair processes to be compared.","Idea counts do not measure repair outcomes."]]};
const valid=(a:number[]|undefined)=>Array.isArray(a)&&a.length===4&&a.every(n=>Number.isInteger(n)&&n>=0&&n<=3);
export function hasBaseline(teamId:string,track:Track,challengeId?:string){const r=read(teamId,track);return r.pairedVersion===4&&r.challengeId===challengeId&&valid(r.pre);}
const score=(answers:number[]|undefined,qs:Question[])=>valid(answers)?qs.filter((q,i)=>answers![i]===q[4]).length:null;
export function PilotAssessment({teamId,track,challengeId,phase="post",onComplete}:{teamId:string;track:PilotTrack;phase?:Phase;challengeId?:string;onComplete?:()=>void}){
 const [record,setRecord]=useState(()=>{const data=read(teamId,track);return data.challengeId===challengeId&&(phase==="pre"?data.pairedVersion===4&&valid(data.pre):valid(data.post)||data.pairedVersion===4&&valid(data.pre))?data:{};});
 const [answers,setAnswers]=useState<number[]>(()=>record[phase]??[-1,-1,-1,-1]);
 const [utility,setUtility]=useState(record.utility??-1),[clarity,setClarity]=useState(record.clarity??-1),[transfer,setTransfer]=useState(record.transfer??-1),[confidence,setConfidence]=useState(record.confidence??-1),[action,setAction]=useState(record.action??"");
 const [error,setError]=useState(false);
 const questions=bank[track][phase],locked=valid(record[phase]),after=score(record.post,bank[track].post),before=record.pairedVersion===4?score(record.pre,bank[track].pre):null,currentScore=score(record[phase],questions),reasons=phase==="pre"?initialExplanations[track]:explanations[track];
 const option=(q:Question,n:number)=>n===3?"I do not know yet":String(q[n+1]);
 const status=(i:number)=>record[phase]?.[i]===questions[i][4]?"Correct":"Incorrect";
 const reason=(i:number)=>record[phase]?.[i]===3?"You indicated that you do not know yet. Review the explanation of the correct answer.":reasons[i][record[phase]?.[i]??0];
 const save=()=>{if(!valid(answers)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action)))return;try{
 const next:RecordData={...record,attemptId:record.attemptId??attemptId(),challengeId,[phase]:answers,...(phase==="pre"?{pairedVersion:4,post:undefined}:{utility,clarity,transfer,confidence,action})};
 const initial=next.pairedVersion===4?score(next.pre,bank[track].pre):null,final=score(next.post,bank[track].post);
 write(teamId,track,next);
 localStorage.setItem("biolab-pilot-result-v2:"+next.attemptId,JSON.stringify({schema:1,assessmentVersion:"biolab-pilot-v4",assessmentMode:initial===null?"final-only":"paired-with-feedback",resourceId:"bio-inspired-innovation-lab",language:"en",unit:"session/team",sessionKey:next.attemptId,track,challengeId:challengeId??null,preScore:initial,postScore:final,maxScore:4,preAnswers:initial===null?null:next.pre,postAnswers:next.post,utility:next.utility,clarity:next.clarity,transfer:next.transfer,confidence:next.confidence,action:next.action,limitation:"Descriptive scores on different, uncalibrated forms; initial feedback is part of learning. No causal or technical accreditation."}));setRecord(next);setError(false);onComplete?.();}catch{setError(true);}};
 const report=():Report=>({language:"en",title:"Learning assessment",subtitle:track+" · "+(challengeId??"")+" · "+(before===null?"No initial assessment":"Initial: "+before+"/4")+(after===null?"":" · Final: "+after+"/4"),blocks:[...(["pre","post"] as const).flatMap(ph=>{const ans=record[ph];if(!valid(ans)||(ph==="pre"&&record.pairedVersion!==4))return [];const qs=bank[track][ph],ex=ph==="pre"?initialExplanations[track]:explanations[track];return [{heading:ph==="pre"?"Initial assessment":"Final assessment",paragraphs:qs.flatMap((q,i)=>[(i+1)+". "+q[0],"Your answer: "+option(q,ans![i])+" — "+(ans![i]===q[4]?"Correct":"Incorrect"),ans![i]===3?"You indicated that you do not know yet.":ex[i][ans![i]],"Correct answer: "+option(q,q[4]),ex[i][q[4]]])}];}),...(after===null?[]:[{heading:"Usefulness and transfer",paragraphs:["Usefulness / clarity / application / confidence: "+[utility,clarity,transfer,confidence].map(x=>x===0?"Not applicable":x+"/5").join(" · "),"Next step: "+(actionOptions.find(([v])=>v===action)?.[1]??action)]}]),{heading:"Interpretation",paragraphs:[before!==null&&after!==null?"Descriptive change: "+(after-before)+" correct answers out of 4.":"Two comparable scores are not available yet.","The questions differ and are not calibrated. Initial feedback is part of learning; the change does not establish causality or technical accreditation."]}]});
 return <section data-testid={phase==="pre"?"initial-assessment":"final-assessment"} className="max-w-6xl mx-auto biolab-card my-6" aria-label={phase==="pre"?"Initial assessment":"Final assessment"}>
 <h2 className="font-display text-2xl font-bold mb-3">{phase==="pre"?"Initial assessment · What do you already know?":"Final assessment · What have you learned?"}</h2>
 <p className="text-muted-foreground mb-4">{phase==="pre"?"Before investigating the challenge, answer four questions about the selected topic. You will see the correct answers and reasons when you submit them. No minimum score is required to continue.":"After reviewing the reference solution, answer four different questions on the same concepts. You will see what you got right, what to review and why."}</p>
 <p className="rounded-lg border bg-muted/40 p-3 mb-4 text-sm">Your results are saved only in this browser and device. They are not sent to Airbus or the host. You can save the PDF report and share it through an authorised channel if requested.</p>
 {!locked&&<div className="space-y-4">{questions.map((q,i)=><fieldset key={i} className="border rounded-xl p-4"><legend className="font-semibold px-2">{i+1}. {q[0]}</legend>{[...q.slice(1,4),"I do not know yet"].map((o,j)=><label key={j} className="flex items-start gap-2 py-2"><input type="radio" name={teamId+track+i} checked={answers[i]===j} onChange={()=>setAnswers(prev=>prev.map((x,k)=>k===i?j:x))}/><span>{o}</span></label>)}</fieldset>)}
 {phase==="post"&&<div className="grid md:grid-cols-3 gap-3">{([["Usefulness for my work",utility,setUtility],["Clarity without facilitator",clarity,setClarity],["Ability to apply learning",transfer,setTransfer],["Perceived confidence in analysing decisions",confidence,setConfidence]] as [string,number,(n:number)=>void][]).map(([label,value,set])=><label className="border rounded-xl p-3" key={label}><span className="block font-semibold mb-2">{label}</span><select className="w-full border rounded p-2 bg-background" value={value} onChange={e=>set(Number(e.target.value))}><option value={-1}>Select 1–5</option><option value={0}>Not applicable</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?"Very low":n===5?"Very high": ""}</option>)}</select></label>)}<label className="border rounded-xl p-3"><span className="block font-semibold mb-2">Intended next step</span><select className="w-full border rounded p-2 bg-background" value={action} onChange={e=>setAction(e.target.value)}><option value="">Select</option>{actionOptions.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label></div>}
 <button type="button" data-testid="correct-assessment" className="biolab-btn-primary" disabled={!valid(answers)||(phase==="post"&&([utility,clarity,transfer,confidence].some(v=>v<0)||!action))} onClick={save}>Correct and save assessment</button></div>}
 {error&&<p role="alert">Could not save in browser. Check local storage is available.</p>}
 {locked&&<div className="mt-4 space-y-4"><p data-testid={phase==="pre"?"initial-score":"final-score"} className="font-bold text-xl">{phase==="pre"?"Initial result:":"Final result:"} {currentScore}/4</p><p className="text-sm">Assessment saved in this browser.</p>{phase==="post"&&<p data-testid="paired-summary" className="rounded-lg border p-3 text-sm">{before===null?"No comparable initial assessment in this session.":"Initial: "+before+"/4 · Final: "+after+"/4 · Descriptive change: "+(after!-before)+" correct answers. The questions differ and are not calibrated; initial feedback is part of learning."}</p>}{questions.map((q,i)=><div key={i} data-testid={"feedback-"+i} className={"rounded-xl border p-4 "+(record[phase]![i]===q[4]?"bg-emerald-50 border-emerald-300 text-emerald-950":"bg-amber-50 border-amber-300 text-amber-950")}><strong>{i+1}. {q[0]}</strong><p className="font-bold mt-2">{status(i)}</p><p className="mt-2">Your answer: {option(q,record[phase]![i])}</p><p className="mt-1">Why: {reason(i)}</p><p className="mt-2 font-semibold">Correct answer: {option(q,q[4])}</p>{record[phase]![i]!==q[4]&&<p className="mt-1">{reasons[i][q[4]]}</p>}</div>)}<button data-testid="assessment-pdf" className="biolab-btn-primary" onClick={()=>{if(!openPdfReport(report()))alert("Allow a new tab to open.");}}>Save assessment as PDF</button></div>}
 </section>;
}
