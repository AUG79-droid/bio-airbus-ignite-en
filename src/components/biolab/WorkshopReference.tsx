import {useState} from "react";
import {referenceSolutions,referenceLabels} from "@/data/reference-solutions";
import {climateSources} from "@/data/climate-challenges";
import {challengeFor,modelPool,type Session,type Proposal} from "@/data/workshop";
export default function WorkshopReference({session,proposals}:{session:Session;proposals:Proposal[]}){
 const [slot,setSlot]=useState(proposals[0]?.slot??1);
 const reference=referenceSolutions[session.challengeId];
 const selected=proposals.find(p=>p.slot===slot)??proposals[0];
 const model=reference&&modelPool.find(m=>m.name===reference.recommendedModel);
 if(!reference||!selected)return <p role="alert">No reference is available for this challenge. Proposals cannot be assessed without expert review.</p>;
 const chosen=modelPool.find(m=>m.id===selected.organismId);
 return <div className="space-y-6">
  <section className="biolab-card-dark p-5 md:p-7" data-testid="common-reference">
    <span className="biolab-label block mb-2" style={{color:"#ffce55"}}>REFERENCE SOLUTION · SAME FOR ALL</span>
    <h3 className="text-2xl font-bold text-white mb-4">{challengeFor(session).title}</h3>
    <div className="grid md:grid-cols-[240px_1fr] gap-5 items-start">
      {model?.image&&<img src={model.image} alt={reference.recommendedModel} className="w-full h-44 object-cover rounded-xl"/>}
      <div className="min-w-0"><p className="text-sm text-slate-200">Recommended natural model</p><h4 className="text-xl font-bold text-white my-2" data-testid="reference-model">{reference.recommendedModel}</h4><p className="text-base leading-7 text-slate-100">{reference.mechanism}</p><p className="mt-3 text-sm leading-6 text-slate-200">{reference.explanation}</p></div>
    </div>
    <div className="rounded-xl border border-white/15 bg-white/5 p-4 mt-5"><h4 className="font-bold text-white mb-2">Proposed solution</h4><p className="text-base leading-7 text-slate-100" data-testid="reference-solution">{reference.answer.solution}</p><h4 className="font-bold text-white mt-4 mb-2">How to test whether it works</h4><p className="text-base leading-7 text-slate-100">{reference.answer.implementation}</p></div>
    <p className="text-sm text-slate-200 leading-6 mt-4"><strong>Limits:</strong> {reference.caution}</p>
    {climateSources[session.challengeId]&&<a className="underline text-sm text-white mt-3 inline-block" href={climateSources[session.challengeId]} target="_blank" rel="noreferrer">Source for the biological mechanism</a>}
  </section>
  <section className="rounded-xl border p-4 md:p-5">
    <h3 className="font-bold text-xl mb-2">Compare each team against the reference</h3>
    <p className="text-sm leading-6 mb-4">Select a team. Its original answers appear on the left and the six model answers on the right. Review differences and possible improvements without deciding a winner.</p>
    <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Team to compare">{proposals.map(p=><button type="button" key={p.slot} data-testid={"compare-team-"+p.slot} aria-pressed={selected.slot===p.slot} className={selected.slot===p.slot?"biolab-btn-primary":"biolab-btn-ghost border border-border"} onClick={()=>setSlot(p.slot)}>Team {p.slot}</button>)}</div>
    <div className="rounded-xl border bg-muted/40 p-4 mb-4 min-w-0"><h4 className="font-bold text-base break-words" style={{overflowWrap:"anywhere"}} data-testid="selected-proposal">{selected.pitchTitle}</h4><p className="text-sm leading-6 whitespace-pre-wrap break-words mt-2" style={{overflowWrap:"anywhere"}}>{selected.pitchSummary}</p><p className="text-sm mt-3"><strong>Selected model:</strong> {chosen?.name} · {selected.language.toUpperCase()}</p></div>
    <p className="text-sm leading-6 mb-4">A different model can be valid if the causal mechanism and a testable solution are explained. Matching the model's name does not guarantee a good answer.</p>
    <div className="space-y-3">{referenceLabels.map(({key,label})=><div key={key} data-testid={"reference-field-"+key} className="rounded-xl border overflow-hidden"><h4 className="bg-muted/70 font-bold px-4 py-3">{label}</h4><div className="grid md:grid-cols-2"><div className="p-4 min-w-0 border-b md:border-b-0 md:border-r"><p className="font-semibold text-primary mb-2">Team answer {selected.slot}</p><p className="text-base leading-7 whitespace-pre-wrap break-words" style={{overflowWrap:"anywhere"}}>{selected.canvas[key]}</p></div><div className="p-4 bg-primary/5 min-w-0"><p className="font-semibold text-primary mb-2">Reference answer</p><p className="text-base leading-7">{reference.answer[key]}</p></div></div></div>)}</div>
  </section>
  <section className="rounded-xl border bg-muted/40 p-5"><h3 className="font-bold text-lg mb-3">What a well-founded answer should contain</h3><ul className="list-disc pl-5 space-y-2 text-base leading-7">{reference.check.map(q=><li key={q}>{q}</li>)}</ul><p className="text-sm leading-6 mt-4">These criteria support learning, not peer grading. The reference is an educational example of a technical hypothesis, not a certified solution or the only possible alternative. Effectiveness requires testing.</p></section>
 </div>;
}
