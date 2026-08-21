import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCw, Sparkles } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import { CHALLENGES } from "@/data/biolab-data";

interface ChallengeRouletteProps {
  onNext: () => void;
  onBack: () => void;
}

const CHALLENGE_CODES = ["STR", "AERO", "OPS", "ACOU", "MAT", "LOG", "NDT", "AIR"];

export default function ChallengeRoulette({ onNext, onBack }: ChallengeRouletteProps) {
  const { setTeamChallenge, activeTeam } = useBioLab();
  const savedIndex = CHALLENGES.findIndex((challenge) => challenge.id === activeTeam?.challenge?.id);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(savedIndex >= 0 ? savedIndex : 0);
  const [selected, setSelected] = useState(savedIndex >= 0);
  const [rotation, setRotation] = useState(-(savedIndex >= 0 ? savedIndex : 0) * 45);
  const timerRef = useRef<number | null>(null);
  const challenge = CHALLENGES[currentIndex];

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelected(false);

    const totalSteps = 22 + Math.floor(Math.random() * 10);
    let completedSteps = 0;

    const tick = () => {
      completedSteps += 1;
      setCurrentIndex((index) => (index + 1) % CHALLENGES.length);
      setRotation((angle) => angle - 45);

      if (completedSteps >= totalSteps) {
        setIsSpinning(false);
        setSelected(true);
        return;
      }

      const progress = completedSteps / totalSteps;
      timerRef.current = window.setTimeout(tick, 55 + Math.pow(progress, 2.4) * 260);
    };

    timerRef.current = window.setTimeout(tick, 70);
  }, [isSpinning]);

  const handleConfirm = () => {
    setTeamChallenge(challenge);
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="biolab-stage-header">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Stage 02 — Challenge assignment</span>
            <h2 className="biolab-section-title mb-3">Spin for an aerospace innovation challenge</h2>
            <p className="biolab-subtitle max-w-3xl">
              The wheel assigns a functional problem. Your team will then search nature for a strategy—not a shape—to address it.
            </p>
          </div>
          {activeTeam && (
            <div className="biolab-team-ticket">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeTeam.color }} />
              <div><small>ACTIVE TEAM</small><strong>{activeTeam.name}</strong></div>
            </div>
          )}
        </motion.header>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-[390px_1fr] gap-7 items-stretch">
          <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="biolab-card-dark biolab-wheel-panel">
            <div className="biolab-wheel-marker" aria-hidden="true" />
            <div className="biolab-wheel" aria-label={`Current challenge: ${challenge.title}`}>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: isSpinning ? 0.12 : 0.5, ease: isSpinning ? "linear" : "easeOut" }}
              >
                {CHALLENGES.map((item, index) => {
                  const angle = index * 45;
                  const isCurrent = index === currentIndex;
                  return (
                    <div
                      key={item.id}
                      className={`biolab-wheel-node ${isCurrent ? "is-current" : ""}`}
                      style={{ transform: `rotate(${angle}deg) translateY(-132px) rotate(${-angle}deg)` }}
                    >
                      <span style={{ transform: `rotate(${currentIndex * 45}deg)` }}>{CHALLENGE_CODES[index]}</span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="biolab-wheel-core">
                <Sparkles className="h-5 w-5" />
                <span>REF-{challenge.id.toUpperCase()}</span>
                <strong>{CHALLENGE_CODES[currentIndex]}</strong>
              </div>
            </div>

            <div className="text-center mt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45 mb-2">Innovation domain</p>
              <p className="font-display font-semibold text-white">{challenge.area}</p>
            </div>
          </motion.section>

          <AnimatePresence mode="wait">
            <motion.section
              key={currentIndex}
              initial={{ opacity: 0, y: isSpinning ? -8 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: isSpinning ? 0.09 : 0.28 }}
              className={`biolab-card flex flex-col justify-between ${selected ? "ring-2 ring-accent border-accent/40" : ""}`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="biolab-badge">{challenge.area}</span>
                  <span className="biolab-evidence-chip">FUNCTION-FIRST BRIEF</span>
                </div>
                <span className="biolab-label block mb-3">Assigned problem</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display text-foreground leading-tight mb-5">
                  {challenge.title}
                </h3>
                <p className="text-base text-muted-foreground leading-7 mb-8">
                  {challenge.description}
                </p>

                <div className="biolab-callout">
                  <strong>Design question</strong>
                  <p>How does nature perform this function efficiently, and which underlying mechanism could be translated into an aerospace constraint?</p>
                </div>
              </div>

              <div className="pt-7 mt-7 border-t border-border">
                {selected ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-success">
                      <Check className="h-4 w-4" strokeWidth={3} /> Challenge ready to confirm
                    </span>
                    <div className="flex flex-wrap gap-3">
                      <button onClick={spin} className="biolab-btn-ghost"><RotateCw className="h-4 w-4" /> Spin again</button>
                      <button onClick={handleConfirm} className="biolab-btn-primary">Confirm challenge <ArrowRight className="h-4 w-4" /></button>
                    </div>
                  </div>
                ) : (
                  <button onClick={spin} disabled={isSpinning} className="biolab-btn-accent w-full justify-center text-base py-4">
                    <RotateCw className={`h-5 w-5 ${isSpinning ? "animate-spin" : ""}`} />
                    {isSpinning ? "Assigning challenge…" : "Spin the innovation wheel"}
                  </button>
                )}
              </div>
            </motion.section>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={onBack} className="biolab-btn-ghost"><ArrowLeft className="h-4 w-4" /> Back</button>
        </div>
      </div>
    </div>
  );
}
