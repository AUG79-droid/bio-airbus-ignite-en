import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";
import type { TeamData } from "@/data/biolab-data";

interface ResultsScreenProps {
  onRestart: () => void;
}

function hasText(value?: string) {
  return Boolean(value && value.trim().length > 0);
}

function makeTitle(team: TeamData) {
  if (hasText(team.pitchTitle)) return team.pitchTitle.trim();

  const challenge = team.challenge?.title?.trim();
  const organism = team.organism?.name?.trim();

  if (challenge && organism) {
    return `${challenge} inspired by ${organism.toLowerCase()}`;
  }

  if (challenge) return `Proposal for ${challenge.toLowerCase()}`;
  if (organism) return `Idea inspired by ${organism.toLowerCase()}`;
  return team.name || "Team proposal";
}

function fallbackText(value: string | undefined, fallback: string) {
  return hasText(value) ? value!.trim() : fallback;
}

function completeness(team: TeamData) {
  const fields = [
    team.challenge?.title,
    team.organism?.name,
    team.organism?.principle,
    team.canvas?.solution,
    team.canvas?.benefit,
    team.canvas?.implementation,
  ];

  return fields.filter((f) => hasText(f)).length;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const totalVotes = sorted.reduce((sum, team) => sum + team.votes, 0);
  const maxVotes = sorted[0]?.votes ?? 0;
  const singleTeamMode = sorted.length <= 1;
  const hasMeaningfulRanking = sorted.length > 1 && totalVotes > 0;
  const topTeam = sorted[0];

  if (!topTeam) return null;

  const topTitle = makeTitle(topTeam);
  const topCompletion = completeness(topTeam);

  if (!hasMeaningfulRanking) {
    return (
      <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
        <div className="biolab-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="biolab-phase mb-5 inline-flex">Phase 08 — Summary</span>
            <h2 className="biolab-section-title mb-3">What this workshop has produced</h2>
            <p className="biolab-subtitle max-w-3xl mx-auto">
              {singleTeamMode
                ? "As there was only one team, this screen does not show a winner. It shows the proposal you built during the session and its final level of maturity."
                : "There are not yet enough votes to create a ranking. This is a summary of the proposal you generated and the areas worth strengthening before presenting it outside the workshop."}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-10">
            <div className="biolab-card-dark px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
                <div>
                  <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                    How to read this summary
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-white mb-4 leading-tight">
                    It does not judge whether the idea is right. It shows what you have defined and what still needs to be clarified.
                  </h3>
                  <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-6">
                    In applied biomimicry, there is rarely a single valid answer. The real value lies in connecting the <strong>Airbus challenge</strong>, <strong>natural model</strong>, <strong>biomimetic principle</strong> and <strong>verifiable next step</strong> effectively.
                  </p>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-4">
                    <span className="biolab-label block mb-2">How to interpret it</span>
                    <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                      <li>• If there was only one team, this is a <strong>session summary</strong>, not a ranking.</li>
                      <li>• If no votes were cast, there is no “winner”; there is a <strong>proposal at its current level of maturity</strong>.</li>
                      <li>• The next step is to decide whether it deserves a <strong>pilot</strong>, improvement or another iteration.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Level of progress achieved</span>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className={`w-2.5 h-9 rounded-sm ${i < topCompletion ? "bg-success" : "bg-white/10"}`} />
                        ))}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{topCompletion}/6 well-defined blocks</p>
                        <p className="text-sm text-slate-300">The closer it is to 6, the more ready the proposal is for presentation outside the workshop.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <span className="biolab-label block mb-3">Resulting proposal</span>
                  <h4 className="text-2xl font-display font-bold text-white mb-4">{topTitle}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Airbus challenge</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.challenge?.title, "Challenge still to be defined")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Natural model</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.organism?.name, "Natural model still to be selected")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Principle</span>
                      <p className="text-slate-100 font-medium">{fallbackText(topTeam.organism?.principle, "Principle not yet translated")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Status</span>
                      <p className="text-slate-100 font-medium">{topCompletion >= 5 ? "Mature enough for review" : topCompletion >= 3 ? "A sound basis, but more work is needed" : "Still very preliminary"}</p>
                    </div>
                  </div>

                  {topTeam.organism?.image && (
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4">
                      <img src={topTeam.organism.image} alt={topTeam.organism.name} className="w-full h-44 object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}

                  <div className="space-y-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Proposed solution</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.solution, "You have not yet finalised a solution. The workshop logic is in place, but the technical proposal should be made more concrete.")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Expected impact</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.benefit, "The expected impact has not yet been quantified. The next step would be to estimate the operational, technical or environmental improvement it could deliver.")}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-1">Next step</span>
                      <p className="text-slate-200/85 leading-7">{fallbackText(topTeam.canvas.implementation, "You have not yet defined the immediate validation step. The logical next move would be to specify a pilot, prototype or initial analysis to review the idea.")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-6">Sustainable Innovation Lab session completed</p>
            <button onClick={onRestart} className="biolab-btn-ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              New session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="biolab-phase mb-5 inline-flex">Phase 08 — Results</span>
          <h2 className="biolab-section-title mb-3">Most-voted proposal</h2>
          <p className="biolab-subtitle max-w-3xl mx-auto">
            This does not mean “right answer”. It means the group considered this the <strong>most promising proposal</strong> to continue exploring at Airbus.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-10">
          <div className="biolab-card-dark py-10 px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "var(--gradient-accent)" }} />
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <span className="biolab-label block mb-2" style={{ color: "hsl(45, 95%, 60%)" }}>Most-voted proposal</span>
                <h3 className="text-3xl md:text-4xl font-bold font-display mb-3 text-white">{topTitle}</h3>
                <p className="text-sm mb-5 text-slate-300">Team {topTeam.name}</p>
                <p className="text-base leading-relaxed max-w-2xl mb-6 text-slate-200/85">
                  {fallbackText(
                    topTeam.pitchSummary,
                    "The proposal received the most votes, although it still needs a more polished executive summary before it can be presented outside the workshop."
                  )}
                </p>
                <div className="flex flex-wrap items-center gap-8 text-center">
                  <div>
                    <span className="block text-3xl font-display font-bold" style={{ color: "hsl(45, 95%, 60%)" }}>{topTeam.votes}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>{topTeam.votes === 1 ? "vote" : "votes"}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-100">{fallbackText(topTeam.challenge?.title, "No challenge")}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>challenge</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-slate-100">{fallbackText(topTeam.organism?.name, "No model")}</span>
                    <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>model</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                {topTeam.organism?.image ? (
                  <img src={topTeam.organism.image} alt={topTeam.organism.name} className="w-full h-64 object-cover rounded-2xl" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-64 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 text-sm">
                    No image available
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-3 mb-16">
          {sorted.slice(1).map((team, i) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="biolab-card"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-lg font-bold text-muted-foreground w-8 text-center">{String(i + 2).padStart(2, "0")}</span>
                <div className="w-3 h-8 rounded-sm" style={{ background: team.color }} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold font-display text-foreground">{makeTitle(team)}</h3>
                  <span className="text-xs text-muted-foreground">Team {team.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${maxVotes > 0 ? (team.votes / maxVotes) * 100 : 0}%` }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                      className="h-full rounded-full"
                      style={{ background: team.color }}
                    />
                  </div>
                  <span className="font-display font-bold text-foreground text-lg w-8 text-right">{team.votes}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6">Sustainable Innovation Lab session completed</p>
          <button onClick={onRestart} className="biolab-btn-ghost">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            New session
          </button>
        </div>
      </div>
    </div>
  );
}
