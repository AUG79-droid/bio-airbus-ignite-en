import { motion } from "framer-motion";
import { STEPS } from "@/data/biolab-data";

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

        <div className="max-w-3xl mx-auto rounded-2xl border border-primary/15 bg-primary/5 p-5 mb-12">
          <h3 className="text-base font-semibold text-foreground mb-2">Expected outcome</h3>
          <p className="text-sm leading-7 text-muted-foreground">
            By the end of the session, each team will have a <strong className="text-foreground">clearly defined Airbus challenge</strong>, a <strong className="text-foreground">selected natural model</strong>, an <strong className="text-foreground">identified biomimetic principle</strong> and an <strong className="text-foreground">applicable idea</strong> ready for a short pitch.
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
