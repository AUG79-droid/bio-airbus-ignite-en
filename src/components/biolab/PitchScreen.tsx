import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface PitchScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function PitchScreen({ onNext, onBack }: PitchScreenProps) {
  const { activeTeam, updatePitch } = useBioLab();
  if (!activeTeam) return null;

  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const canvas = activeTeam.canvas;

  const canvasPreview = [
    { label: "Airbus challenge", value: challenge?.title },
    { label: "Natural model", value: organism?.name },
    { label: "Principle", value: organism?.principle },
    { label: "Proposed solution", value: canvas.solution },
    { label: "Expected impact", value: canvas.benefit },
  ];

  const completedItems = canvasPreview.filter((item) => item.value && item.value.trim().length > 0).length;

  const suggestedPitch = [
    canvas.problem && `We are addressing ${canvas.problem}`,
    organism?.name && organism?.principle && `We drew inspiration from ${organism.name}, which performs this function through ${organism.principle.toLowerCase()}`,
    canvas.solution && `We propose ${canvas.solution}`,
    canvas.benefit && `This would enable ${canvas.benefit}`,
    canvas.implementation && `The first step would be ${canvas.implementation}`,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8"
        >
          <div>
            <span className="biolab-phase mb-4 inline-flex">Phase 06 — Pitch preparation</span>
            <h2 className="biolab-section-title mb-3">Now prepare how you will present the proposal</h2>
            <p className="biolab-subtitle max-w-3xl">
              This is <strong>step 6</strong>. You are no longer designing: <strong>you are summarising your idea</strong> so that you can present it in 60 seconds and then put it to a vote.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-7 rounded-sm ${i < completedItems ? "bg-success" : "bg-border"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Summary available</div>
              <div className="text-sm font-semibold text-foreground">{completedItems}/5 key blocks</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="biolab-card-dark px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  What you need to do here
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Turn your canvas into a clear, concise and defensible message
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  The aim is not elegant writing. It is to help anyone understand in one minute <strong>which Airbus problem you chose</strong>, <strong>what inspired you</strong>, <strong>what you propose</strong> and <strong>why it is worth exploring</strong>.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Recommended order</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Give the idea a <strong>simple, technical name</strong>.</li>
                    <li>• Use the summary on the left to draft the pitch.</li>
                    <li>• Once it is clear, press the yellow button to move on to <strong>voting</strong>.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Summarise the Airbus problem in one sentence: <strong>what you want to improve</strong> and <strong>why it matters</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Explain the natural inspiration and the principle you are borrowing, without digressions or unnecessary theory.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Finish with the solution, its expected impact and the first step towards validating it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
            <div className="biolab-card">
              <h3 className="biolab-label mb-4">Presentation-ready summary</h3>
              <div className="space-y-4">
                {canvasPreview.map((item) => (
                  <div key={item.label}>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">{item.label}</span>
                    <p className="text-sm text-foreground mt-1 leading-relaxed">{item.value || "Not completed yet"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="biolab-card overflow-hidden p-0">
              {organism?.image ? (
                <img
                  src={organism.image}
                  alt={organism.name}
                  className="w-full h-56 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-56 flex items-center justify-center text-muted-foreground">No image</div>
              )}
              <div className="p-5 border-t border-border">
                <span className="biolab-label block mb-2">What must be clear</span>
                <p className="text-sm text-muted-foreground leading-6">
                  The pitch must connect the <strong>Airbus challenge</strong>, <strong>natural inspiration</strong>, <strong>principle</strong> and <strong>concrete proposal</strong> without sounding abstract.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="biolab-card">
              <label className="biolab-label block mb-3">Proposal name</label>
              <input
                type="text"
                value={activeTeam.pitchTitle}
                onChange={(e) => updatePitch(e.target.value, activeTeam.pitchSummary)}
                placeholder="Example: Passive cabin ventilation inspired by termite mounds"
                className="biolab-input text-lg font-display font-semibold"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="biolab-card">
              <div className="flex items-center justify-between mb-3 gap-4">
                <label className="biolab-label">60-second pitch</label>
                <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">Clear, non-academic message</span>
              </div>
              <textarea
                value={activeTeam.pitchSummary}
                onChange={(e) => updatePitch(activeTeam.pitchTitle, e.target.value)}
                placeholder={suggestedPitch || "Example: We identified a cabin ventilation problem that calls for greater efficiency and comfort. We drew inspiration from termite mounds, which regulate temperature and airflow through passive circulation. We propose applying that principle to an Airbus ventilation architecture with optimised inlets and outlets. This could reduce energy demand and improve heat distribution. The next step would be to validate the concept through simulation and a prototype."}
                rows={8}
                className="biolab-input resize-none text-sm leading-relaxed"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="biolab-card-dark py-5 px-5">
              <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                Recommended structure
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-200/85">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">1. Airbus problem</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">2. Natural inspiration</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">3. Borrowed principle</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">4. Technical solution</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">5. Expected impact</div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">6. Next step</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={onBack} className="biolab-btn-ghost">← Back to the canvas</button>
          <button onClick={onNext} className="biolab-btn-accent">
            Go to step 7: open voting
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
