import { motion } from "framer-motion";
import { STEPS } from "@/data/biolab-data";

const BIOMIMICRY_RULES = [
  {
    number: "A",
    title: "Define the function",
    text: "Frame what the design must achieve—reduce drag, distribute load or detect damage—before looking for an organism.",
  },
  {
    number: "B",
    title: "Abstract the mechanism",
    text: "Describe how the biological system works without simply copying its visible shape or naming the animal.",
  },
  {
    number: "C",
    title: "Translate with constraints",
    text: "Adapt the principle to aerospace realities such as safety, certification, mass, materials, maintenance and manufacturability.",
  },
  {
    number: "D",
    title: "Test before claiming impact",
    text: "Treat the idea as a hypothesis. Define evidence, comparison criteria and a first validation step before claiming benefits.",
  },
];

interface HowItWorksScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HowItWorksScreen({ onNext, onBack }: HowItWorksScreenProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="biolab-phase mb-5 inline-flex">How it works</span>
          <h2 className="biolab-section-title mb-4">What you will do in this session</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            The exercise follows a few simple steps: work as a team, receive an Airbus challenge, explore natural strategies and develop a proposal ready to pitch and vote on.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="biolab-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-semibold shrink-0 bg-primary/8 text-primary border border-primary/15">
                  {String(step.number).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-base font-semibold font-display text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto biolab-card-dark mb-8">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-7 items-start">
            <div>
              <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>Essential theory</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Four rules for credible biomimicry</h3>
              <p className="text-sm md:text-base text-slate-300 leading-7">
                A nature-inspired idea becomes useful only when the team explains the causal bridge between a biological strategy and a technical application.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {BIOMIMICRY_RULES.map((rule) => (
                <div key={rule.number} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="h-7 w-7 rounded-lg grid place-items-center bg-accent text-accent-foreground text-xs font-mono font-bold">{rule.number}</span>
                    <h4 className="font-display font-semibold text-white">{rule.title}</h4>
                  </div>
                  <p className="text-sm text-slate-300 leading-6">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-primary/5 p-5 mb-12">
          <h3 className="text-base font-semibold text-foreground mb-2">Expected outcome</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            By the end of the session, each team will have a <strong className="text-foreground">clearly defined Airbus challenge</strong>, a <strong className="text-foreground">selected natural model</strong>, an <strong className="text-foreground">identified biomimetic principle</strong>, a <strong className="text-foreground">constrained application hypothesis</strong> and a <strong className="text-foreground">first validation step</strong> ready for review.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Back</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Form teams
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
