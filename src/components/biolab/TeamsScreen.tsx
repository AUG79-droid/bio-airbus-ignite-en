import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import { TEAM_COLORS } from "@/data/biolab-data";

interface TeamsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function TeamsScreen({ onNext, onBack }: TeamsScreenProps) {
  const { teams, addTeam, removeTeam, setActiveTeam, activeTeamIndex } = useBioLab();
  const [newName, setNewName] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);

  const handleAdd = () => {
    if (newName.trim()) {
      addTeam(newName.trim(), selectedColor);
      setNewName("");
      setSelectedColor((selectedColor + 1) % TEAM_COLORS.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="biolab-phase mb-5 inline-flex">Stage 01</span>
          <h2 className="biolab-section-title mb-3">Team setup</h2>
          <p className="biolab-subtitle">Create one or more teams for the exercise. If you are testing the app on your own, you can also create a single team.</p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="biolab-card mb-8">
            <label className="biolab-label block mb-3">Team name</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder="E.g. Bionic Wing, Team Gecko, ThermoLab..."
                className="biolab-input flex-1 text-base"
              />
              <button onClick={handleAdd} className="biolab-btn-primary shrink-0 px-6 py-3">
                Add
              </button>
            </div>
            <div className="flex gap-2.5 mt-4">
              <span className="biolab-label self-center mr-1">Colour</span>
              {TEAM_COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(i)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${i === selectedColor ? "border-foreground scale-110 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}
                  style={{ background: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {teams.map((team, i) => (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`biolab-card-interactive mb-3 ${i === activeTeamIndex ? "ring-2 ring-primary border-primary/30" : ""}`}
                onClick={() => setActiveTeam(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-lg" style={{ background: team.color }} />
                    <div>
                      <h3 className="text-base font-semibold font-display text-foreground">{team.name}</h3>
                      {i === activeTeamIndex && <span className="biolab-label text-primary">Active</span>}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeTeam(i); }}
                    className="text-muted-foreground hover:text-destructive transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {teams.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm">Add at least one team to begin the exercise</p>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <button onClick={onBack} className="biolab-btn-ghost">← Back</button>
          <button onClick={onNext} className="biolab-btn-primary" disabled={teams.length === 0}>
            Assign challenges
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
