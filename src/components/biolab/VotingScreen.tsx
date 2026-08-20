import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useBioLab } from "@/contexts/BioLabContext";

interface VotingScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VotingScreen({ onNext, onBack }: VotingScreenProps) {
  const { teams, activeTeamIndex, voteForTeam } = useBioLab();
  const [votedTeams, setVotedTeams] = useState<Set<number>>(new Set());

  const totalVotes = useMemo(() => teams.reduce((sum, team) => sum + team.votes, 0), [teams]);
  const hasCompetitiveVoting = teams.length > 1;
  const maxVotes = Math.max(...teams.map((t) => t.votes), 1);

  const handleVote = (index: number) => {
    if (votedTeams.has(index)) return;
    voteForTeam(index);
    setVotedTeams((prev) => new Set(prev).add(index));
  };

  if (!hasCompetitiveVoting) {
    const team = teams[0];

    return (
      <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
        <div className="biolab-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <span className="biolab-phase mb-5 inline-flex">Phase 07 — Proposal review</span>
            <h2 className="biolab-section-title mb-3">There is no “right answer” here</h2>
            <p className="biolab-subtitle max-w-3xl mx-auto">
              As this session has only <strong>one team</strong>, this screen is not a competition. It provides a <strong>quick review</strong> before the session closes.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto mb-8">
            <div className="biolab-card-dark px-6 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
                <div>
                  <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                    What this result means
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                    This is not the “right” idea. It is the proposal your team has built.
                  </h3>
                  <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                    Sustainable Innovation Lab is not about finding one single solution. It is about generating a <strong>coherent</strong>, <strong>defensible</strong> proposal with a <strong>reasonable next step</strong>.
                  </p>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Check this before you finish</span>
                    <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                      <li>• Does the proposal genuinely address the Airbus challenge?</li>
                      <li>• Does the natural inspiration fit what you are proposing?</li>
                      <li>• Is the first pilot or validation step clear?</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Team</span>
                    <p className="text-lg font-semibold text-white">{team?.name || "Team"}</p>
                    <p className="text-sm text-slate-300 mt-1">1 proposal generated · no competitive comparison</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Challenge</span>
                    <p className="text-sm text-slate-200/85 leading-6">{team?.challenge?.title || "No challenge assigned"}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">Natural model</span>
                    <p className="text-sm text-slate-200/85 leading-6">{team?.organism?.name || "No model selected"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4">
            <button onClick={onBack} className="biolab-btn-ghost">← Back to the pitch</button>
            <button onClick={onNext} className="biolab-btn-primary">
              Go to step 8: view session summary
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-8">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Phase 07 — Voting</span>
            <h2 className="biolab-section-title mb-3">Now choose the most promising proposal</h2>
            <p className="biolab-subtitle max-w-3xl">
              This is not an exam. Compare the proposals and decide which seems the most <strong>robust</strong>, <strong>original</strong> and <strong>useful to Airbus</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-sm">
            <div className="flex gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`w-2.5 h-7 rounded-sm ${i < Math.min(totalVotes, 3) ? "bg-success" : "bg-border"}`} />
              ))}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Votes cast</div>
              <div className="text-sm font-semibold text-foreground">{totalVotes} {totalVotes === 1 ? "proposal" : "proposals"} rated</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto mb-8">
          <div className="biolab-card-dark px-6 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
              <div>
                <span className="biolab-label block mb-3" style={{ color: "hsl(45, 95%, 65%)" }}>
                  What you need to do here
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                  Compare the proposals and vote for the one that best concludes the workshop
                </h3>
                <p className="text-base md:text-lg leading-8 text-slate-200/90 mb-5">
                  Read each proposal as if you were on an internal innovation committee. Do not vote for the prettiest one: vote for the proposal that best combines <strong>clarity</strong>, <strong>biomimetic logic</strong> and <strong>real pilot potential</strong>.
                </p>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="biolab-label block mb-2">How to vote in this demo</span>
                  <ul className="space-y-2 text-sm md:text-base text-slate-200/85 leading-7">
                    <li>• Review the title, challenge, natural model and summary.</li>
                    <li>• Use the three criteria on the right as a guide.</li>
                    <li>• Press <strong>“Give 1 vote”</strong> only for proposals you consider genuinely defensible.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
                {[
                  ["Criterion 1", "Technical feasibility", "Could it be piloted or analysed at Airbus with a reasonable next step?"],
                  ["Criterion 2", "Originality", "Do the natural inspiration and its translation to Airbus add an interesting idea?"],
                  ["Criterion 3", "Potential impact", "Could it improve efficiency, sustainability, maintenance or performance?"],
                ].map(([step, title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="biolab-label block mb-2">{step}</span>
                    <p className="text-white font-semibold mb-2">{title}</p>
                    <p className="text-sm text-slate-200/75 leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-5 mb-12">
          {teams.map((team, i) => {
            const ownTeam = i === activeTeamIndex;
            const alreadyVoted = votedTeams.has(i);

            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="biolab-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_170px_120px] gap-4 items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white" style={{ background: team.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-display text-foreground">{team.pitchTitle || `Team ${team.name} proposal`}</h3>
                        <p className="text-sm text-muted-foreground">Team {team.name}</p>
                      </div>
                      {ownTeam && <span className="biolab-badge">Your team</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 text-xs">
                      {team.challenge && <span className="biolab-badge">Challenge: {team.challenge.title}</span>}
                      {team.organism && <span className="biolab-badge">Model: {team.organism.name}</span>}
                      {team.organism?.principle && <span className="biolab-badge">Principle: {team.organism.principle}</span>}
                    </div>

                    <p className="text-sm text-muted-foreground leading-7 mb-4">
                      {team.pitchSummary || "This proposal still needs a clearer summary before the final session."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">What to assess when voting</span>
                        <p className="text-xs text-muted-foreground leading-5"><strong>Feasibility</strong><br />Is a realistic next step clear?</p>
                      </div>
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">Originality</span>
                        <p className="text-xs text-muted-foreground leading-5">Does the nature–Airbus connection make sense and deserve further review?</p>
                      </div>
                      <div className="rounded-xl border border-border bg-muted/40 p-3">
                        <span className="biolab-label block mb-1">Impact</span>
                        <p className="text-xs text-muted-foreground leading-5">Could it deliver a tangible improvement?</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-border bg-muted/30">
                    {team.organism?.image ? (
                      <img src={team.organism.image} alt={team.organism.name} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">No image</div>
                    )}
                    <div className="p-3 border-t border-border">
                      <span className="biolab-label block mb-1">Current score</span>
                      <p className="text-sm text-muted-foreground">Total votes</p>
                      <p className="text-2xl font-display font-bold text-foreground mt-1">{team.votes}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleVote(i)}
                      disabled={ownTeam || alreadyVoted}
                      className={`w-full ${ownTeam || alreadyVoted ? "biolab-btn-ghost opacity-60 cursor-not-allowed" : "biolab-btn-primary"}`}
                    >
                      {ownTeam ? "Cannot vote" : alreadyVoted ? "Vote cast" : "Give 1 vote"}
                    </button>
                    <div className="rounded-xl border border-border bg-muted/40 p-3">
                      <span className="biolab-label block mb-1">Tip</span>
                      <p className="text-xs text-muted-foreground leading-5">
                        Vote for the proposal you would take to an internal review without needing to explain too much additional context.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="biolab-btn-ghost">← Back to the pitch</button>
          <button onClick={onNext} className="biolab-btn-primary">
            Go to step 8: view results
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
