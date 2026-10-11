import { useState } from "react";
import type { TeamData } from "@/data/biolab-data";
import { referenceLabels, referenceSolutions } from "@/data/reference-solutions";
type Props = {teams: TeamData[]};

export default function ReferenceComparison({teams}:Props) {
  const [assessments,setAssessments] = useState<Record<string,boolean[]>>({});
  const [expanded,setExpanded] = useState<Record<string,boolean>>({});
  const toggle=(teamId:string,index:number)=>{
    setAssessments(current=>{
      const next=[...(current[teamId]??[false,false,false,false])];
      next[index]=!next[index];
      return {...current,[teamId]:next};
    });
  };
  return (
    <section className="max-w-6xl mx-auto biolab-card mb-8" aria-label="Final comparison with reference solutions">
      <span className="biolab-phase mb-4 inline-flex">Final learning · Comparison</span>
      <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">Compare your work with a reasoned reference solution</h2>
      <p className="text-base md:text-lg text-foreground leading-8 mb-3">
        You can now compare <strong>your team's six answers</strong> with a structured example for the
        <strong> same Airbus challenge</strong>. Identify what you explained clearly and which parts
        need more evidence before the idea could be defended.
      </p>
      <p className="text-base text-muted-foreground leading-7 mb-7">
        These are <strong>educational engineering hypotheses</strong>, not unique correct answers,
        approved aerospace designs or demonstrated improvements. An alternative natural model may
        also be valid if you can explain its mechanism and how you would test it.
        The application does not automatically grade the technical quality of your text.
      </p>
      <div className="space-y-5">
        {teams.map((team,index)=>{
          const ref=team.challenge?referenceSolutions[team.challenge.id]:undefined;
          const ticks=assessments[team.id]??[false,false,false,false];
          const count=ticks.filter(Boolean).length;
          return (
            <details key={team.id} className="rounded-2xl border border-border bg-background/70 p-4 md:p-6"
              open={expanded[team.id]??(index===0)}>
              <summary className="cursor-pointer text-lg font-bold text-primary leading-7"
                onClick={event=>{event.preventDefault();setExpanded(p=>({...p,[team.id]:!(p[team.id]??(index===0))}));}}>
                Team {team.name} · {team.challenge?.title??"Undefined challenge"} — open comparison
              </summary>
              {!ref ? <p className="mt-5 text-base text-muted-foreground">No reference available for this challenge. An expert review is required.</p> : (
                <div className="mt-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="rounded-xl bg-primary/5 border border-primary/20 p-4">
                      <span className="biolab-label block mb-2">Your team's chosen model</span>
                      <p className="font-semibold text-lg text-foreground">{team.organism?.name??"Not selected"}</p>
                      <p className="text-base text-muted-foreground mt-2">Your proposal must justify this choice.</p>
                    </div>
                    <div className="rounded-xl bg-white border border-border p-4">
                      <span className="biolab-label block mb-2">Suggested reference model</span>
                      <p className="font-semibold text-lg text-foreground">{ref.recommendedModel}</p>
                      <p className="text-base text-muted-foreground mt-2">{ref.mechanism}</p>
                    </div>
                  </div>
                  {team.organism?.name!==ref.recommendedModel&&
                    <p className="rounded-xl border border-amber-400 bg-amber-50 p-4 text-base text-amber-950 leading-7 mb-5">
                      <strong>Your chosen model differs from the reference.</strong> This does not automatically make your idea incorrect.
                      You need to show how the function could solve your challenge. If you cannot support
                      that connection, reconsider the model.
                    </p>}
                  <p className="text-base leading-7 text-foreground mb-3"><strong>Why this reference makes sense:</strong> {ref.explanation}</p>
                  <p className="text-base leading-7 text-foreground mb-6"><strong>Important limitations:</strong> {ref.caution}</p>
                  <div className="space-y-4">
                    {referenceLabels.map(({key,label})=>(
                      <div key={key} className="rounded-xl border border-border overflow-hidden">
                        <h3 className="bg-muted/70 text-foreground font-bold px-4 py-3 text-base">{label}</h3>
                        <div className="grid md:grid-cols-2 gap-0">
                          <div className="p-4 bg-white md:border-r border-b md:border-b-0 border-border min-w-0">
                            <p className="font-semibold text-primary mb-2">Your answer</p>
                            <p className="text-base text-foreground leading-7 whitespace-pre-wrap break-words">{team.canvas[key]||"No answer provided"}</p>
                          </div>
                          <div className="p-4 bg-slate-50 min-w-0">
                            <p className="font-semibold text-emerald-800 mb-2">Reasoned reference example</p>
                            <p className="text-base text-slate-900 leading-7">{ref.answer[key]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-2xl border border-primary/25 bg-white p-5 mt-6">
                    <h3 className="font-bold text-xl mb-2">Team check: what have we achieved?</h3>
                    <p className="text-base leading-7 text-muted-foreground mb-4">
                      Discuss these points after comparing both answers. Check a box only
                      if your own text supports the statement with a concrete explanation.
                    </p>
                    <div className="space-y-3">
                      {ref.check.map((question,idx)=>(
                        <label key={question} className="flex items-start gap-3 rounded-lg bg-muted/40 p-3 cursor-pointer">
                          <input type="checkbox" checked={Boolean(ticks[idx])} onChange={()=>toggle(team.id,idx)}
                            className="h-5 w-5 mt-1 accent-primary shrink-0"/>
                          <span className="text-base leading-7 text-foreground">{question}</span>
                        </label>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-lg font-semibold">{count}/4 criteria marked by the team</p>
                      <p className="text-base text-muted-foreground leading-7 mt-1">
                        {count===4?"All four criteria are marked. Check the evidence: this does not represent technical approval.":
                          `${4-count} criteria remain unchecked. Revisit your canvas or identify missing information and tests.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </details>
          );
        })}
      </div>
      <p className="mt-5 text-sm md:text-base text-muted-foreground leading-7">
        The aim is to identify a relevant mechanism and a test that could validate it.
        Rejecting an unjustified connection or choosing another model can be the correct learning outcome.
      </p>
    </section>
  );
}
