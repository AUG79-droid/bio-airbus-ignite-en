import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CanvasData } from "@/data/biolab-data";

interface BioCanvasScreenProps {
  onNext: () => void;
  onBack: () => void;
}

const CANVAS_FIELDS: {
  key: keyof CanvasData;
  label: string;
  sublabel: string;
  helper: string;
  placeholder: string;
  span?: boolean;
}[] = [
  {
    key: "problem",
    label: "01 — Define the Airbus problem",
    sublabel: "What specific challenge will you solve?",
    helper: "Describe the problem in specific technical terms. Avoid generic statements.",
    placeholder:
      "Example: The cabin needs more efficient ventilation and thermal control to reduce energy consumption and maintain comfort without increasing system complexity.",
  },
  {
    key: "organism",
    label: "02 — Explain the natural model",
    sublabel: "Which organism or natural system have you selected?",
    helper: "Describe what it does in nature and why it is relevant to this challenge.",
    placeholder:
      "Example: The termite mound regulates temperature and ventilation through passive airflow, without continuous air conditioning.",
  },
  {
    key: "principle",
    label: "03 — Formulate the principle to emulate",
    sublabel: "Which functional mechanism will you transfer?",
    helper: "Do not copy the form itself; capture the functional logic behind it.",
    placeholder:
      "Example: Use passive circulation, thermal gradients and optimised air inlets and outlets to stabilise temperature with less energy.",
  },
  {
    key: "solution",
    label: "04 — Translate it into an Airbus solution",
    sublabel: "How does it become a real proposal?",
    helper: "Apply the idea to a specific Airbus part, system, area or process.",
    placeholder:
      "Example: Design a termite-inspired cabin ventilation architecture with optimised passive inlets and outlets to reduce demand on the active system.",
    span: true,
  },
  {
    key: "benefit",
    label: "05 — Expected impact",
    sublabel: "What improvement would it deliver?",
    helper: "Consider efficiency, weight, energy, maintenance, comfort, robustness or cost.",
    placeholder:
      "Example: Lower energy consumption, better thermal distribution and less reliance on active air conditioning during specific operating phases.",
  },
  {
    key: "implementation",
    label: "06 — Next step",
    sublabel: "What would you validate first?",
    helper: "Do not plan the entire project—focus on the first useful validation step.",
    placeholder:
      "Example: Model airflow using CFD and compare a conventional configuration with a termite-inspired alternative.",
  },
];

function cleanSentence(text?: string) {
  return (text || "").trim().replace(/\s+/g, " ").replace(/[.]$/, "");
}

function buildExamples(challenge?: { title?: string; description?: string }, organism?: { name?: string; strategy?: string; principle?: string }) {
  const challengeTitle = challenge?.title || "the selected Airbus challenge";
  const challengeDescription = cleanSentence(challenge?.description) || "address a specific technical need";
  const organismName = organism?.name || "the selected natural model";
  const organismStrategy = cleanSentence(organism?.strategy) || "performs this function efficiently in nature";
  const principle = cleanSentence(organism?.principle) || "a useful biomimetic principle";

  return {
    problem: `The team wants to address ${challengeTitle.toLowerCase()} at Airbus. The specific problem is to ${challengeDescription.toLowerCase()} through a technically viable solution without adding unnecessary complexity.`,
    organism: `${organismName} is relevant because it ${organismStrategy.toLowerCase()}. It is a useful reference because it performs a function similar to the Airbus challenge efficiently.`,
    principle: `The principle we want to emulate is ${principle.toLowerCase()}. We are not copying the organism's form; we are transferring the functional logic it uses to solve the problem.`,
    solution: `We propose translating ${principle.toLowerCase()} into an Airbus solution for ${challengeTitle.toLowerCase()}. The idea is to design a technical proposal inspired by ${organismName.toLowerCase()} that improves system performance without significantly increasing weight, energy consumption or maintenance.`,
    benefit: `The expected impact is improved performance for ${challengeTitle.toLowerCase()}, fewer operational inefficiencies and a stronger technical basis for future tests or pilots.`,
    implementation: `A reasonable next step would be an initial validation: a simulation, functional mock-up or comparative analysis between the current solution and an alternative inspired by ${organismName.toLowerCase()}.`,
  } satisfies Record<keyof CanvasData, string>;
}

export default function BioCanvasScreen({ onNext, onBack }: BioCanvasScreenProps) {
  const { activeTeam, updateCanvas } = useBioLab();
  if (!activeTeam) return null;

  const completedFields = CANVAS_FIELDS.filter((f) => activeTeam.canvas[f.key].trim().length > 0).length;
  const challenge = activeTeam.challenge;
  const organism = activeTeam.organism;
  const examples = buildExamples(challenge, organism);

  const injectExample = (key: keyof CanvasData) => {
    if (!activeTeam.canvas[key].trim()) {
      updateCanvas(key, examples[key]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8"
        >
          <div>
            <span className="biolab-phase mb-4 inline-flex">Stage 05 — Design</span>
            <h2 className="biolab-section-title mb-3">Now turn your idea into a proposal</h2>
            <p className="biolab-subtitle max-w-3xl">
              This is step 5 of 6. Define <strong>which problem you will solve</strong>, <strong>which natural principle you will emulate</strong> and <strong>how it will translate to Airbus</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {CANVAS_FIELDS.map((f) => (
                <div
                  key={f.key}
                  className={`w-2.5 h-7 rounded-sm ${activeTeam.canvas[f.key].trim() ? "bg-success" : "bg-border"}`}
                />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Completed blocks</div>
              <div className="text-sm font-semibold text-foreground">{completedFields}/{CANVAS_FIELDS.length}</div>
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
                  What to do here
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Build your proposal with Airbus logic, not vague statements
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  You have selected a <strong>challenge</strong> and a <strong>natural model</strong>. Now write a proposal that others can understand, defend and present. Do not aim for perfection: begin with the first three blocks, then make the solution concrete.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Recommended order</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Start with <strong>01 Problem</strong>, <strong>02 Biological model</strong> and <strong>03 Principle</strong>.</li>
                    <li>• Then move to <strong>04 Proposed solution</strong>, the most important section.</li>
                    <li>• Finish with <strong>05 Expected impact</strong> and <strong>06 Next step</strong>.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 1</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Make sure the <strong>challenge</strong>, <strong>natural model</strong> and <strong>principle</strong> fit together.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 2</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    If you get stuck, use the <strong>starter examples</strong> below and adapt them to your case.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 3</span>
                  <p className="text-sm text-slate-200/80 leading-6">
                    Once all six blocks are reasonably clear, use the blue button to move to the <strong>pitch</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_340px] gap-5 items-stretch">
            <div className="biolab-card p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Challenge you will solve</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{challenge?.title ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{challenge?.description ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Selected natural model</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-3">{organism?.name ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">{organism?.strategy ?? "—"}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <span className="biolab-label block mb-2">Principle you will transfer</span>
                  <h4 className="text-lg font-semibold font-display text-foreground mb-2">{organism?.principle ?? "—"}</h4>
                  <p className="text-sm text-muted-foreground leading-6">This is the functional mechanism you will now turn into an Airbus solution.</p>
                </div>
              </div>
            </div>

            <div className="biolab-card overflow-hidden p-0">
              {organism?.image ? (
                <img
                  src={organism.image}
                  alt={organism.name}
                  className="w-full h-full min-h-[240px] object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="min-h-[240px] flex items-center justify-center text-muted-foreground">No image</div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
          <div className="biolab-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <span className="biolab-label block mb-2">Starter examples to unlock the canvas</span>
                <h3 className="text-xl font-display font-bold text-foreground">Do not copy them word for word: adapt them to your case</h3>
              </div>
              <div className="text-sm text-muted-foreground max-w-xl">
                They are generated from your <strong>Airbus challenge</strong>, <strong>selected natural model</strong> and <strong>biomimetic principle</strong>.
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {CANVAS_FIELDS.map((field) => (
                <div key={field.key} className="rounded-2xl border border-border bg-background/70 p-4 flex flex-col gap-3">
                  <div>
                    <h4 className="text-sm font-semibold font-display text-foreground">{field.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{field.sublabel}</p>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{examples[field.key]}</p>
                  <button
                    type="button"
                    onClick={() => injectExample(field.key)}
                    className="biolab-btn-ghost self-start"
                  >
                    Use this starter example
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {CANVAS_FIELDS.map((field, i) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`biolab-card ${field.span ? "md:col-span-2" : ""}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h3 className="text-sm font-semibold font-display text-foreground">{field.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{field.sublabel}</p>
                </div>
                <button
                  type="button"
                  onClick={() => injectExample(field.key)}
                  className="biolab-btn-ghost"
                >
                  Insert example
                </button>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/60 px-3 py-2 mb-3">
                <p className="text-xs text-muted-foreground leading-5">{field.helper}</p>
              </div>
              <textarea
                value={activeTeam.canvas[field.key]}
                onChange={(e) => updateCanvas(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.span ? 5 : 4}
                className="biolab-input resize-none text-sm leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={onBack} className="biolab-btn-ghost">← Back to connection</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Go to step 6: prepare the pitch
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
