import { useEffect } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData, isCanvasEntryReady, isLegacyCanvasExample, MIN_CANVAS_CHARS } from "@/data/biolab-data";

interface BioCanvasScreenProps { onNext: () => void; onBack: () => void; }
type FieldGuide = {
  key: keyof CanvasData; short: string; title: string; question: string;
  explain: string; thinkAbout: string[]; placeholder: string;
};
const GUIDES: FieldGuide[] = [
  {key:"problem",short:"Problem",title:"Define the Airbus problem",question:"Exactly what do you need to improve, and in which operation?",
   explain:"You do not need a solution yet. Describe the current situation, the improvement sought and the constraints.",
   thinkAbout:["Which part, system or process is affected?","What specific difficulty exists today?","How could you measure an improvement?"],
   placeholder:"Describe the technical problem, where it occurs and what outcome you want to improve."},
  {key:"organism",short:"Natural model",title:"Explain how the natural model works",question:"What function does the organism perform, and how?",
   explain:"Describe the natural mechanism, not merely the organism's name or appearance.",
   thinkAbout:["What function does it perform?","Which structure or behaviour causes that function?","What evidence would confirm that mechanism?"],
   placeholder:"Explain the organism's function and the natural mechanism you wish to investigate."},
  {key:"principle",short:"Principle",title:"Extract a functional principle",question:"What functional principle might transfer to engineering?",
   explain:"Translate the natural strategy into a technical function. Visual resemblance is not enough.",
   thinkAbout:["What causes the natural effect?","Why might it help solve your chosen challenge?","Which parts would not transfer to aerospace?"],
   placeholder:"State the functional principle, its underlying mechanism and the expected effect."},
  {key:"solution",short:"Solution",title:"Propose a concrete Airbus application",question:"What would you change in a part, tool or process, and why might it help?",
   explain:"This is the core of your proposal. Link problem and mechanism as a hypothesis, not as a proven result.",
   thinkAbout:["What exactly would change, and where?","Why would that natural mechanism cause an improvement?","Which safety, weight, material, certification or maintenance constraints apply?"],
   placeholder:"We propose changing [part or process] by [mechanism] because [technical link]. We would need to check [constraint]."},
  {key:"benefit",short:"Expected benefit",title:"Define the improvement you want to test",question:"Which outcome do you expect if the idea works?",
   explain:"State an expected improvement, not a measured saving or already-demonstrated benefit.",
   thinkAbout:["Which metric would you compare with the current solution?","What negative effects could appear?","Which data do you still need to quantify the improvement?"],
   placeholder:"Our hypothesis is to improve [metric] over [current baseline], provided [risk or constraint] is assessed."},
  {key:"implementation",short:"First test",title:"Plan an initial feasibility test",question:"What test could show whether the proposal deserves further work?",
   explain:"You are not creating an industrial rollout plan. Define a first check that could support or reject the hypothesis.",
   thinkAbout:["Would you start with a simulation, laboratory test or comparative trial?","What would you measure against what reference?","Which result would make you revise or reject your idea?"],
   placeholder:"First, we would compare [concept] with [baseline] using [test], measuring [indicator and criterion]."}
];

export default function BioCanvasScreen({onNext,onBack}:BioCanvasScreenProps) {
  const {activeTeam,updateCanvas,setScreen,setGuideSubstep}=useBioLab();
  useEffect(()=>setGuideSubstep(0),[setGuideSubstep]);
  if(!activeTeam) return null;
  const challenge=activeTeam.challenge;
  const organism=activeTeam.organism;
  const count=GUIDES.filter(g=>isCanvasEntryReady(g.key,activeTeam.canvas[g.key])).length;
  const canContinue=count===GUIDES.length;
  const mismatch=challenge?.id==="c7" && organism?.id==="o4";

  return (
    <div className="min-h-screen py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} className="max-w-6xl mx-auto mb-6">
          <span className="biolab-phase mb-4 inline-flex">Stage 05 of 06 · Design your solution</span>
          <h1 className="biolab-section-title mb-3">Now build your own proposal</h1>
          <p className="biolab-subtitle max-w-4xl">
            Your task is to explain <strong>how a natural strategy might solve a real Airbus-context challenge</strong>.
            Complete the six clearly labelled answers below, in your own words. The app does not supply a ready-made answer.
          </p>
        </motion.header>
        <section className="max-w-6xl mx-auto biolab-card-dark mb-6" aria-label="Canvas instructions">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-3">What do I do on this screen?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-100 leading-7">
            <p><strong className="text-amber-300">1. Review</strong> the challenge and natural model you selected.</p>
            <p><strong className="text-amber-300">2. Write</strong> an original answer for each section. Hints are there to help you think.</p>
            <p><strong className="text-amber-300">3. Check</strong> that the technical link makes sense and proceed to the pitch.</p>
          </div>
          <p className="mt-4 text-sm md:text-base text-slate-300">
            Your work is saved locally in this browser as you type. The progress counter checks whether the sections
            contain enough original text; it <strong>does not certify technical viability</strong>.
          </p>
        </section>
        <section className="max-w-6xl mx-auto biolab-card mb-6" aria-label="Previous selections">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Your starting point (already selected)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Airbus challenge</span>
              <h3 className="text-lg font-semibold">{challenge?.title??"No challenge"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">{challenge?.description}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Natural inspiration</span>
              <h3 className="text-lg font-semibold">{organism?.name??"No model"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">{organism?.strategy}</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <span className="biolab-label block mb-2">Observed principle</span>
              <h3 className="text-lg font-semibold">{organism?.principle??"No principle"}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-2 leading-relaxed">
                Your job is to justify <strong>whether the principle actually fits your challenge</strong>.
              </p>
            </div>
          </div>
        </section>
        {mismatch && (
          <section className="max-w-6xl mx-auto rounded-2xl border-2 border-amber-500 bg-amber-50 px-5 py-5 mb-6 text-slate-900" role="status">
            <h2 className="text-lg font-bold mb-2">Caution: this connection is not yet justified</h2>
            <p className="text-base leading-7 mb-4">
              Shark skin can inspire surfaces affecting friction and adhesion. That does <strong>not, by itself,
              explain how non-destructive fuselage inspections could be accelerated</strong>. You must justify
              a specific applicable mechanism and a suitable test, or choose a model more closely related to
              detection. Bats and echolocation could provide a functional sensing analogy, but that also needs validation.
            </p>
            <button type="button" className="biolab-btn-primary" onClick={()=>setScreen(4)}>Choose another natural model</button>
          </section>
        )}
        <section className="max-w-6xl mx-auto biolab-card mb-6" aria-label="Proposal canvas editor">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
            <div>
              <h2 className="text-xl md:text-2xl font-display font-bold">Your proposal · 6 answers</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Answer every question below. All six sections remain visible so you can review and edit the complete proposal.
              </p>
            </div>
            <div aria-live="polite" className="shrink-0 rounded-full bg-primary/10 px-4 py-2 text-base font-bold text-primary">
              {count}/6 written
            </div>
          </div>
          <div className="space-y-5">
            {GUIDES.map((guide,index)=>{
              const answer=activeTeam.canvas[guide.key];
              const isLegacy=isLegacyCanvasExample(guide.key,answer);
              const isReady=isCanvasEntryReady(guide.key,answer);
              return (
                <article key={guide.key} className={`rounded-2xl border-2 p-5 md:p-7 transition-colors ${isReady?"border-emerald-300 bg-emerald-50/40":"border-primary/20 bg-primary/5"}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="biolab-label block mb-2">Answer {String(index+1).padStart(2,"0")} of 06 · {guide.short}</span>
                      <h3 className="text-xl md:text-2xl font-bold font-display">{guide.title}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-bold ${isReady?"bg-emerald-100 text-emerald-800":"bg-white text-muted-foreground border border-border"}`}>
                      {isReady?"✓ Written":"Pending"}
                    </span>
                  </div>
                  <label htmlFor={`canvas-${guide.key}`} className="block text-lg md:text-xl font-semibold mb-3">
                    {guide.question}
                  </label>
                  <p className="text-base text-muted-foreground leading-7 mb-4">{guide.explain}</p>
                  <details className="rounded-xl border border-border bg-white p-4 mb-4">
                    <summary className="cursor-pointer text-base font-semibold text-primary">Need help? View thinking prompts</summary>
                    <ul className="mt-3 pl-5 list-disc space-y-2 text-base text-foreground leading-7">
                      {guide.thinkAbout.map(item=><li key={item}>{item}</li>)}
                    </ul>
                  </details>
                  <textarea id={`canvas-${guide.key}`} value={answer}
                    aria-label={`${index+1} of 6: ${guide.question}`}
                    onFocus={()=>setGuideSubstep(index)}
                    onChange={event=>updateCanvas(guide.key,event.target.value)}
                    placeholder={guide.placeholder} rows={5}
                    className="biolab-input resize-y text-base md:text-lg leading-relaxed min-h-[140px] bg-white"/>
                  {isLegacy&&<p className="mt-3 rounded-lg border border-amber-400 bg-amber-100 px-4 py-3 text-base text-amber-950" role="status">
                    This field still contains a previously inserted sample answer. We have kept it, but <strong>you need to rewrite
                    it in your own words</strong> to count this section as written.
                  </p>}
                  <div className="flex flex-wrap justify-between gap-3 mt-3 text-sm md:text-base">
                    <span className="text-muted-foreground" aria-live="polite">
                      {isReady?"✓ Text entered. Review its technical quality.":isLegacy?"Rewrite the old sample to continue":
                        `Write at least ${MIN_CANVAS_CHARS} characters to register this answer.`}
                    </span>
                    <span className="text-muted-foreground">{answer.trim().length} characters</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className="max-w-6xl mx-auto rounded-2xl border border-border bg-white px-5 py-5 mb-7">
          <h2 className="text-lg font-bold mb-3">Before you present, review your proposal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base leading-7">
            <p>□ Have you defined a specific technical problem?</p>
            <p>□ Have you explained <strong>how</strong> the natural mechanism could help?</p>
            <p>□ Have you considered safety and operational constraints?</p>
            <p>□ Have you proposed a test that could support or reject the hypothesis?</p>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mt-3">These are self-review prompts, not automated quality assessments.</p>
        </section>
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-4 pb-10">
          <button type="button" onClick={onBack} className="biolab-btn-ghost">← Back to connection</button>
          <button type="button" onClick={onNext} className="biolab-btn-primary" disabled={!canContinue}
            title={!canContinue?"Write all six sections in your own words before preparing the pitch.":undefined}>
            I have written all six sections · Prepare my pitch →
          </button>
          {!canContinue&&<p className="w-full text-center text-sm md:text-base text-muted-foreground" role="status">
            {GUIDES.length-count} sections still need original text. You do not need to copy any sample.
          </p>}
        </div>
      </div>
    </div>
  );
}
