import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { ORGANISMS, Organism } from "@/data/biolab-data";

interface NatureLibraryProps {
  onNext: () => void;
  onBack: () => void;
}

export default function NatureLibrary({ onNext, onBack }: NatureLibraryProps) {
  const { setTeamOrganism, activeTeam } = useBioLab();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(activeTeam?.organism?.id ?? null);

  const handleSelect = (org: Organism) => {
    setSelectedId(org.id);
    setTeamOrganism(org);
  };

  const selectedOrganism = ORGANISMS.find((org) => org.id === selectedId);

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="biolab-phase mb-5 inline-flex">Stage 03 — Exploration</span>
          <h2 className="biolab-section-title mb-3">Choose the natural model that can help you most</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            There is no single correct answer here. Choose <strong>one model from nature</strong> that can inspire a solution to your Airbus challenge.
          </p>
        </motion.div>

        {activeTeam?.challenge && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto mb-6">
            <div className="biolab-card flex items-center gap-4 py-4 px-5 border-primary/15">
              <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="biolab-label block">Challenge you will solve</span>
                <span className="text-base font-semibold text-foreground">{activeTeam.challenge.title}</span>
                <p className="text-sm text-muted-foreground mt-1">{activeTeam.challenge.description}</p>
              </div>
              <span className="biolab-badge shrink-0">{activeTeam.challenge.area}</span>
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
          <div className="biolab-card-dark px-6 py-5">
            <div className="flex flex-wrap items-start gap-6">
              <div className="min-w-[180px]">
                <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 65%)" }}>What to do here</span>
                <p className="text-sm leading-6" style={{ color: "hsl(210, 15%, 78%)" }}>
                  Review the images, read each strategy and choose <strong>just one natural model</strong> for your team.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 1</span>
                  <p className="text-sm text-muted-foreground">Review two or three cards and consider which natural function is most relevant to your challenge.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 2</span>
                  <p className="text-sm text-muted-foreground">Select <strong>“Choose this model”</strong> on the best-fitting card.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">Step 3</span>
                  <p className="text-sm text-muted-foreground">Once you are ready, use the blue button below to continue.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {selectedOrganism && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
            <div className="biolab-card flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-primary/25 ring-1 ring-primary/15">
              <div>
                <span className="biolab-label block mb-1">Model selected for your team</span>
                <p className="text-base font-semibold text-foreground">{selectedOrganism.name}</p>
                <p className="text-sm text-muted-foreground">You can now select <strong>“Go to step 4”</strong>.</p>
              </div>
              <button onClick={onNext} className="biolab-btn-primary">
                Go to step 4
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </button>
            </div>
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {ORGANISMS.map((org, i) => {
            const isExpanded = expandedId === org.id;
            const isSelected = selectedId === org.id;
            return (
              <motion.div
                key={org.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`biolab-card-interactive overflow-hidden ${isSelected ? "ring-2 ring-primary border-primary/40 shadow-lg shadow-primary/10" : ""}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold font-display text-foreground">{org.name}</h3>
                        <span className="font-mono text-[10px] text-muted-foreground">#{org.id.toUpperCase()}</span>
                      </div>
                      <span className="biolab-badge text-[11px]">{org.principle}</span>
                    </div>
                    {isSelected && <span className="biolab-badge">Selected</span>}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{org.strategy}</p>

                  <div className="rounded-xl bg-muted/50 border border-border p-3 mb-4">
                    <span className="biolab-label block mb-1">How it can help</span>
                    <p className="text-sm text-foreground/90 leading-relaxed">{org.fact}</p>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-xl border border-primary/15 bg-primary/5 p-3 mb-4">
                          <span className="biolab-label block mb-1">Decision tip</span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Do not look for an animal that resembles Airbus. Look for a <strong>function</strong> that resembles the problem you want to solve.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleSelect(org)}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {isSelected ? "✓ Model selected" : "Choose this model"}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : org.id)}
                      className="px-4 py-2.5 rounded-lg text-sm font-semibold border border-border bg-background hover:bg-muted transition-colors"
                    >
                      {isExpanded ? "Hide guidance" : "Show decision guidance"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Back</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={!selectedId}>
            Go to step 4: connect challenge and principle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
