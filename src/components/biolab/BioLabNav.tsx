import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

const SCREEN_LABELS = [
  "Home", "How it works", "Teams", "Airbus challenge", "Natural models",
  "Connection", "Canvas", "Pitch", "Voting", "Results"
];

export default function BioLabNav() {
  const { currentScreen, setScreen, activeTeam, teams } = useBioLab();

  if (currentScreen === 0) return null;

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border"
      style={{ background: "hsl(var(--card) / 0.92)", backdropFilter: "blur(12px)" }}
    >
      <div className="biolab-container flex items-center justify-between h-12">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-foreground text-sm">BioLab</span>
          <span className="text-gradient-accent font-display font-bold text-sm">Airbus</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {SCREEN_LABELS.slice(1).map((label, i) => {
            const screenIndex = i + 1;
            const isActive = currentScreen === screenIndex;
            const isPast = currentScreen > screenIndex;
            return (
              <button
                key={label}
                onClick={() => setScreen(screenIndex)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "text-primary hover:bg-primary/8"
                    : "text-muted-foreground/60 hover:text-muted-foreground"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {activeTeam && (
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: activeTeam.color }} />
              <span className="text-xs font-medium text-foreground">{activeTeam.name}</span>
            </div>
          )}
          <span className="font-mono text-[10px] text-muted-foreground/50">{teams.length} {teams.length === 1 ? "team" : "teams"}</span>
        </div>
      </div>
    </motion.nav>
  );
}
