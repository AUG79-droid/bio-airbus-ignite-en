import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCw, Sparkles } from "lucide-react";
import { useBioLab, IS_DEMO_MODE } from "@/contexts/BioLabContext";
import { CHALLENGES } from "@/data/biolab-data";
import { CLIMATE_CHALLENGES } from "@/data/climate-challenges";
import { STRATEGIC_CHALLENGES, challengeTrack, type Track } from "@/data/resilience-expansion";
import { preferredTrack, PilotAssessment, hasBaseline } from "@/components/biolab/PilotAssessment";

interface ChallengeRouletteProps {
  onNext: () => void;
  onBack: () => void;
  lockedTrack?: Track;
}

const CHALLENGE_CODES = ["STR", "AERO", "OPS", "ACOU", "MAT", "LOG", "NDT", "AIR"];

export default function ChallengeRoulette({ onNext, onBack, lockedTrack }: ChallengeRouletteProps) {
  const { setTeamChallenge, activeTeam } = useBioLab();
  const [mode, setMode] = useState<Track>(() => lockedTrack ?? (activeTeam?.challenge ? challengeTrack(activeTeam.challenge.id) : preferredTrack()));
  const pool = mode === "climate" ? CLIMATE_CHALLENGES : mode === "resilience" ? STRATEGIC_CHALLENGES : CHALLENGES;
  const codes = mode === "climate" ? ["HEAT","DUST","HAIL","SUN","EROS","HUM","COLD"] : mode === "resilience" ? ["NET","REPR","COOR","LIFE"] : CHALLENGE_CODES;
  const angleStep = 360 / pool.length;
  const savedIndex = pool.findIndex((challenge) => challenge.id === activeTeam?.challenge?.id);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(savedIndex >= 0 ? savedIndex : 0);
  const [selected, setSelected] = useState(savedIndex >= 0);
  const [rotation, setRotation] = useState(-(savedIndex >= 0 ? savedIndex : 0) * angleStep);
  const [,refreshAssessment]=useState(0);
  const timerRef = useRef<number | null>(null);
  const challenge = pool[currentIndex];
  const chooseMode = (next: Track) => {
    if (isSpinning || next === mode) return;
    setMode(next); setCurrentIndex(0); setRotation(0); setSelected(false);
  };

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
      setCurrentIndex((index) => (index + 1) % pool.length);
      setRotation((angle) => angle - angleStep);

      if (completedSteps >= totalSteps) {
        setIsSpinning(false);
        setSelected(true);
        return;
      }

      const progress = completedSteps / totalSteps;
      timerRef.current = window.setTimeout(tick, 55 + Math.pow(progress, 2.4) * 260);
    };

    timerRef.current = window.setTimeout(tick, 70);
  }, [isSpinning, pool, angleStep]);

  const handleConfirm = () => {
    if(!IS_DEMO_MODE&&activeTeam&&!hasBaseline(activeTeam.id,mode,challenge.id))return;
    if (activeTeam?.challenge && activeTeam.challenge.id !== challenge.id && !window.confirm("Changing the challenge clears the active team's model, canvas and pitch. Continue?")) return;
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

        <section className="max-w-5xl mx-auto biolab-card mb-6" aria-label="Workshop mode">
          {lockedTrack?<div data-testid="locked-track" className="font-bold text-lg">Selected topic: {mode==="general"?"General innovation":mode==="climate"?"Climate adaptation":"Strategic resilience"} ({pool.length} challenges)</div>:<div className="flex flex-wrap gap-3">
            <button type="button" aria-pressed={mode === "general"} disabled={isSpinning} onClick={() => chooseMode("general")} className={mode === "general" ? "biolab-btn-primary" : "biolab-btn-ghost"}>General innovation (8 challenges)</button>
            <button type="button" aria-pressed={mode === "climate"} disabled={isSpinning} onClick={() => chooseMode("climate")} className={mode === "climate" ? "biolab-btn-primary" : "biolab-btn-ghost"}>Climate Resilience Lab (7 challenges)</button>
            <button type="button" aria-pressed={mode === "resilience"} disabled={isSpinning} onClick={() => chooseMode("resilience")} className={mode === "resilience" ? "biolab-btn-primary" : "biolab-btn-ghost"}>Strategic Resilience Lab (4 challenges)</button>
          </div>}
          {mode !== "general" && <><p className="text-sm text-muted-foreground mt-4 leading-6">{mode === "climate" ? "Learn to connect future physical hazards with product and support vulnerabilities. Heat, radiation, dust, hail, moisture and cold. No aircraft performance calculations or full adaptation coverage." : "Learn how Procurement, Engineering, Operations and Maintenance can reduce dependencies, preserve functions and support recovery. Results are learning hypotheses."}</p><div className="flex flex-wrap gap-2 mt-3">{pool.map((item,i)=><button key={item.id} type="button" disabled={isSpinning} aria-pressed={selected && currentIndex===i} className="biolab-btn-ghost" onClick={()=>{setCurrentIndex(i);setRotation(-i*angleStep);setSelected(true);}}>{item.title}</button>)}</div></>}
        </section>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[390px_1fr] gap-7 items-stretch">
          <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="biolab-card-dark biolab-wheel-panel">
            <div className="biolab-wheel-marker" aria-hidden="true" />
            <div className="biolab-wheel" style={mode === "climate" ? { background: "conic-gradient(from -60deg, #143c51 0deg 120deg, #25576a 120deg 240deg, #1a4558 240deg 360deg)" } : undefined} aria-label={`Current challenge: ${challenge.title}`}>
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: isSpinning ? 0.12 : 0.5, ease: isSpinning ? "linear" : "easeOut" }}
              >
                {pool.map((item, index) => {
                  const angle = index * angleStep;
                  const isCurrent = index === currentIndex;
                  return (
                    <div
                      key={item.id}
                      className={`biolab-wheel-node ${isCurrent ? "is-current" : ""}`}
                      style={{ transform: `rotate(${angle}deg) translateY(-132px) rotate(${-angle}deg)` }}
                    >
                      <span style={{ transform: `rotate(${currentIndex * angleStep}deg)` }}>{codes[index]}</span>
                    </div>
                  );
                })}
              </motion.div>
              <div className="biolab-wheel-core">
                <Sparkles className="h-5 w-5" />
                <span>REF-{challenge.id.toUpperCase()}</span>
                <strong>{codes[currentIndex]}</strong>
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
                      {(IS_DEMO_MODE||!activeTeam)&&<button onClick={handleConfirm} className="biolab-btn-primary">Confirm challenge <ArrowRight className="h-4 w-4" /></button>}
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

        {selected&&!IS_DEMO_MODE&&activeTeam&&<><PilotAssessment key={activeTeam.id+mode+challenge.id} teamId={activeTeam.id} track={mode} phase="pre" challengeId={challenge.id} onComplete={()=>refreshAssessment(n=>n+1)}/><div className="text-center"><button disabled={!hasBaseline(activeTeam.id,mode,challenge.id)} onClick={handleConfirm} className="biolab-btn-primary">Confirm challenge <ArrowRight className="h-4 w-4" /></button><p className="text-sm mt-2">Submit the four initial questions to continue. No minimum score is required.</p></div></>}
        <div className="flex justify-center mt-10">
          <button onClick={onBack} className="biolab-btn-ghost"><ArrowLeft className="h-4 w-4" /> Back</button>
        </div>
      </div>
    </div>
  );
}
