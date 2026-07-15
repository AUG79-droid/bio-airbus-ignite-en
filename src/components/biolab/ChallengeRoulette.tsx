import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { CHALLENGES } from "@/data/biolab-data";

interface ChallengeRouletteProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ChallengeRoulette({ onNext, onBack }: ChallengeRouletteProps) {
  const { setTeamChallenge, activeTeam } = useBioLab();
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const countRef = useRef(0);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelected(false);
    countRef.current = 0;

    const totalSteps = 20 + Math.floor(Math.random() * 12);

    const tick = () => {
      countRef.current++;
      setCurrentIndex((prev) => (prev + 1) % CHALLENGES.length);

      if (countRef.current >= totalSteps) {
        setIsSpinning(false);
        setSelected(true);
        return;
      }

      // Deceleration curve
      const progress = countRef.current / totalSteps;
      const delay = 60 + Math.pow(progress, 2) * 300;
      setTimeout(tick, delay);
    };

    setTimeout(tick, 60);
  }, [isSpinning]);

  const challenge = CHALLENGES[currentIndex];

  const handleConfirm = () => {
    setTeamChallenge(challenge);
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="biolab-phase mb-5 inline-flex">Stage 02 — Challenge assignment</span>
          <h2 className="biolab-section-title mb-3">Select the challenge your team will solve</h2>
          {activeTeam && (
            <p className="biolab-subtitle">
              Team <strong className="text-foreground font-semibold">{activeTeam.name}</strong>: the selected challenge will be the Airbus problem you address through biomimicry.
            </p>
          )}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Challenge strip — shows adjacent challenges */}
          <div className="relative mb-6">
            <div className="flex items-center gap-3 overflow-hidden py-2">
              {[-1, 0, 1].map((offset) => {
                const idx = (currentIndex + offset + CHALLENGES.length) % CHALLENGES.length;
                const c = CHALLENGES[idx];
                const isCenter = offset === 0;
                return (
                  <motion.div
                    key={`${idx}-${offset}`}
                    layout
                    className={`flex-1 min-w-0 transition-all duration-200 ${
                      isCenter ? "" : "opacity-30 scale-95"
                    }`}
                  >
                    <div className={`rounded-lg border px-4 py-3 text-center ${
                      isCenter
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-card/50"
                    }`}>
                      <span className="text-xs font-mono text-muted-foreground">{c.area}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {/* Center indicator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-primary" />
          </div>

          {/* Main challenge display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: isSpinning ? -8 : 0, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: isSpinning ? 0.08 : 0.3 }}
              className={`biolab-card mb-8 ${
                selected ? "ring-2 ring-accent border-accent/30" : isSpinning ? "border-primary/40" : ""
              }`}
            >
              <div className="text-center py-6">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="biolab-badge">{challenge.area}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    REF-{challenge.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
                  {challenge.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
                  {challenge.description}
                </p>

                {selected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-5 border-t border-border"
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Challenge assigned
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All challenges preview strip */}
          <div className="flex justify-center gap-1.5 mb-10">
            {CHALLENGES.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? "w-8 bg-primary"
                    : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            {!selected ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={spin}
                disabled={isSpinning}
                className="biolab-btn-accent text-lg px-12 py-5"
              >
                {isSpinning ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Spinning...
                  </>
                ) : (
                  "Spin the wheel"
                )}
              </motion.button>
            ) : (
              <>
                <button onClick={spin} className="biolab-btn-ghost">Spin again</button>
                <button onClick={handleConfirm} className="biolab-btn-primary">
                  Confirm challenge
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={onBack} className="biolab-btn-ghost">← Back</button>
        </div>
      </div>
    </div>
  );
}
