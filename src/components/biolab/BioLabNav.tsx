import { motion } from "framer-motion";
import { Check, ChevronDown, LockKeyhole, RotateCcw, Save } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";

const SCREEN_LABELS = [
  "Home",
  "Briefing",
  "Teams",
  "Challenge",
  "Nature",
  "Connect",
  "Canvas",
  "Pitch",
  "Review",
  "Results",
];

export default function BioLabNav() {
  const {
    currentScreen,
    setScreen,
    activeTeam,
    activeTeamIndex,
    setActiveTeam,
    teams,
    canAccessScreen,
    resetSession,
  } = useBioLab();

  if (currentScreen === 0) return null;

  const completedStages = Math.max(0, currentScreen - 1);
  const progress = Math.min((currentScreen / 9) * 100, 100);

  const handleReset = () => {
    if (window.confirm("Start a new session? The teams and all saved work on this device will be removed.")) {
      resetSession();
    }
  };

  return (
    <motion.nav
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      className="biolab-topbar print:hidden"
      aria-label="Learning route"
    >
      <div className="biolab-container h-16 flex items-center gap-4">
        <button onClick={() => setScreen(1)} className="group flex min-w-0 items-center gap-3 text-left">
          <div className="h-9 w-9 shrink-0 rounded-xl bg-primary text-primary-foreground grid place-items-center font-display text-xs font-black shadow-sm">
            BI
          </div>
          <div className="hidden sm:block min-w-0">
            <span className="block truncate text-sm font-bold font-display text-foreground group-hover:text-primary transition-colors">
              Bio-Inspired Innovation Lab
            </span>
            <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Airbus-context simulation
            </span>
          </div>
        </button>

        <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
          {SCREEN_LABELS.slice(1).map((label, index) => {
            const screenIndex = index + 1;
            const isActive = currentScreen === screenIndex;
            const isPast = currentScreen > screenIndex;
            const isAvailable = canAccessScreen(screenIndex);

            return (
              <button
                key={label}
                onClick={() => setScreen(screenIndex)}
                disabled={!isAvailable}
                aria-current={isActive ? "step" : undefined}
                title={isAvailable ? label : "Complete the previous stage to unlock this step"}
                className={`biolab-route-step ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""}`}
              >
                <span className="biolab-route-dot">
                  {isPast ? <Check className="h-3 w-3" strokeWidth={3} /> : !isAvailable ? <LockKeyhole className="h-3 w-3" /> : screenIndex}
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative xl:hidden flex-1 max-w-[230px]">
          <select
            value={currentScreen}
            onChange={(event) => setScreen(Number(event.target.value))}
            className="biolab-nav-select"
            aria-label="Current stage"
          >
            {SCREEN_LABELS.slice(1).map((label, index) => {
              const screenIndex = index + 1;
              return (
                <option key={label} value={screenIndex} disabled={!canAccessScreen(screenIndex)}>
                  {screenIndex}. {label}{!canAccessScreen(screenIndex) ? " — locked" : ""}
                </option>
              );
            })}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-semibold text-muted-foreground" title="Progress is saved on this device">
            <Save className="h-3.5 w-3.5 text-success" />
            Saved locally
          </div>

          {teams.length > 0 && (
            <div className="relative hidden sm:block">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full" style={{ background: activeTeam?.color }} />
              <select
                value={activeTeamIndex}
                onChange={(event) => setActiveTeam(Number(event.target.value))}
                className="biolab-team-select"
                aria-label="Active team"
              >
                {teams.map((team, index) => (
                  <option key={team.id} value={index}>{team.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>
          )}

          <button onClick={handleReset} className="biolab-icon-btn" title="Start a new session" aria-label="Start a new session">
            <RotateCcw className="h-4 w-4" />
          </button>

          <div className="hidden lg:block w-20" aria-label={`${completedStages} stages completed`}>
            <div className="flex justify-between mb-1 text-[9px] font-mono text-muted-foreground">
              <span>PROGRESS</span><span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden bg-muted">
              <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
