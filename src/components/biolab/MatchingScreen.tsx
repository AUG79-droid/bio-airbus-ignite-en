import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface MatchingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function MatchingScreen({ onNext, onBack }: MatchingScreenProps) {
  const { activeTeam } = useBioLab();
  if (!activeTeam) return null;

  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const principle = activeTeam.organism?.principle;

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="biolab-phase mb-5 inline-flex">Stage 04 — Connection</span>
          <h2 className="biolab-section-title mb-3">Now connect the challenge, nature and principle</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            This step is not about guessing. It establishes the <strong>guiding idea</strong> your team will take into the canvas.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="biolab-card-dark px-6 py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  What to do here
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Turn your selection into a clear working statement
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  You have selected an <strong>Airbus challenge</strong> and a <strong>natural model</strong>. The app now shows the connection between them so that you understand <strong>which principle you will transfer</strong> before opening the canvas.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">What to check</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• The natural model genuinely fits the challenge you are addressing.</li>
                    <li>• You understand the <strong>biomimetic principle</strong> you want to emulate.</li>
                    <li>• The guiding question is useful for beginning to design an Airbus solution.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Review the three blocks below: <strong>challenge</strong>, <strong>model</strong> and <strong>principle</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Read the <strong>guiding question</strong>. This is the question your team should begin to answer.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    If the connection makes sense, use the blue button to open the canvas and turn it into a proposal.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6"
          >
            <div className="biolab-card p-0 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-0 h-full">
                <div className="p-6 md:p-7">
                  <span className="biolab-label block mb-3">Connection selected by your team</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                    {challenge?.title ?? "No challenge assigned"}
                  </h3>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Airbus challenge</span>
                      <p className="font-semibold text-foreground">{challenge?.title ?? "Not assigned"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{challenge?.description ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <span className="biolab-label block mb-2">Selected natural model</span>
                      <p className="font-semibold text-foreground">{organism?.name ?? "Not selected"}</p>
                      <p className="text-sm text-muted-foreground mt-1">{organism?.strategy ?? ""}</p>
                    </div>

                    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                      <span className="biolab-label block mb-2">Biomimetic principle you will transfer</span>
                      <p className="text-lg font-bold font-display text-foreground">{principle ?? "Not selected"}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/40 border-t md:border-t-0 md:border-l border-border p-4 md:p-5 flex flex-col">
                  <span className="biolab-label block mb-3">Visual model</span>
                  <div className="rounded-2xl overflow-hidden bg-muted aspect-[4/3] mb-4">
                    {organism?.image ? (
                      <img
                        src={organism.image}
                        alt={organism.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-4 mt-auto">
                    <span className="biolab-label block mb-2">When this choice makes sense</span>
                    <p className="text-sm text-muted-foreground leading-7">{organism?.fact ?? ""}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="biolab-card-dark px-6 py-6"
              >
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  Your team's guiding question
                </span>
                <p className="text-lg md:text-xl leading-8 text-slate-100">
                  How might we apply the principle of <strong style={{ color: "hsl(45, 95%, 65%)" }}>{principle?.toLowerCase() ?? "..."}</strong>,
                  observed in <strong>{organism?.name ?? "..."}</strong>, to address the challenge of <strong>{challenge?.title?.toLowerCase() ?? "..."}</strong> at Airbus?
                </p>
              </motion.div>

              <div className="biolab-card">
                <span className="biolab-label block mb-3">What happens after this screen</span>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>1. Open the canvas.</p>
                  <p>2. Describe the problem in Airbus terms.</p>
                  <p>3. Translate the natural principle into a concrete solution.</p>
                  <p>4. Prepare a short pitch to present and vote on.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="biolab-card"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <div className="lg:max-w-xs">
                <span className="biolab-label block mb-2">Learning capsule</span>
                <h3 className="text-xl font-display font-bold text-foreground">Copy the logic, not the look</h3>
              </div>
              <div className="biolab-transfer-chain flex-1" aria-label="Biomimicry translation sequence">
                {[
                  ["1", "Function", "What must improve?"],
                  ["2", "Biological strategy", "How does nature do it?"],
                  ["3", "Design principle", "What logic is transferable?"],
                  ["4", "Application", "Where and how could it work?"],
                ].map(([number, title, text]) => (
                  <div key={number} className="biolab-transfer-step">
                    <span>{number}</span><div><strong>{title}</strong><small>{text}</small></div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground leading-6">
              A resemblance alone is not biomimicry. Your proposal should explain a causal mechanism and recognise that further engineering, lifecycle analysis and validation are still required.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Back to natural models</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Go to step 5: open the canvas
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
