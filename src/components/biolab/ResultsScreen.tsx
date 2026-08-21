import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Clipboard, Printer, RotateCcw, ShieldCheck } from "lucide-react";
import { useBioLab } from "@/contexts/BioLabContext";
import type { TeamData } from "@/data/biolab-data";

interface ResultsScreenProps {
  onRestart: () => void;
}

function hasText(value?: string) {
  return Boolean(value?.trim());
}

function proposalTitle(team: TeamData) {
  if (hasText(team.pitchTitle)) return team.pitchTitle.trim();
  if (team.challenge && team.organism) return `${team.challenge.title} inspired by ${team.organism.name.toLowerCase()}`;
  return `${team.name} concept`;
}

function readinessChecks(team: TeamData) {
  return [
    {
      label: "Problem defined",
      text: "A specific aerospace need is stated.",
      passed: hasText(team.canvas.problem) && Boolean(team.challenge),
    },
    {
      label: "Mechanism abstracted",
      text: "The biological strategy and principle are explicit.",
      passed: Boolean(team.organism) && hasText(team.canvas.principle),
    },
    {
      label: "Transfer specified",
      text: "The principle becomes a concrete Airbus-context idea.",
      passed: hasText(team.canvas.solution),
    },
    {
      label: "Validation proposed",
      text: "A first test or comparison is identified.",
      passed: hasText(team.canvas.implementation),
    },
  ];
}

function fallback(value: string | undefined, emptyText: string) {
  return hasText(value) ? value!.trim() : emptyText;
}

export default function ResultsScreen({ onRestart }: ResultsScreenProps) {
  const { teams } = useBioLab();
  const [copied, setCopied] = useState(false);
  const sorted = [...teams].sort((a, b) => b.votes - a.votes);
  const totalVotes = sorted.reduce((sum, team) => sum + team.votes, 0);
  const competitive = sorted.length > 1 && totalVotes > 0;
  const topTeam = sorted[0];

  if (!topTeam) return null;

  const checks = readinessChecks(topTeam);
  const readiness = checks.filter((check) => check.passed).length;
  const title = proposalTitle(topTeam);
  const summary = [
    `BIO-INSPIRED INNOVATION LAB — CONCEPT SUMMARY`,
    `Team: ${topTeam.name}`,
    `Proposal: ${title}`,
    `Challenge: ${fallback(topTeam.challenge?.title, "Not defined")}`,
    `Natural model: ${fallback(topTeam.organism?.name, "Not selected")}`,
    `Design principle: ${fallback(topTeam.organism?.principle, "Not defined")}`,
    `Proposed solution: ${fallback(topTeam.canvas.solution, "Not defined")}`,
    `Expected impact: ${fallback(topTeam.canvas.benefit, "Not defined")}`,
    `First validation step: ${fallback(topTeam.canvas.implementation, "Not defined")}`,
    `Design readiness: ${readiness}/4 checks`,
    `Status: Workshop hypothesis — not a validated technical or environmental claim.`,
  ].join("\n");

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col py-20 biolab-grid-pattern">
      <div className="biolab-container">
        <motion.header initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="biolab-stage-header mb-10">
          <div>
            <span className="biolab-phase mb-5 inline-flex">Stage 08 — Design review</span>
            <h2 className="biolab-section-title mb-3">From workshop idea to evidence-ready concept</h2>
            <p className="biolab-subtitle max-w-3xl">
              {competitive
                ? "The group has identified the most promising concept. The readiness review below shows what is strong and what must be validated next."
                : "This is a design review, not a winner screen. It shows how clearly the concept connects biology, engineering and a testable next step."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 print:hidden">
            <button onClick={copySummary} className="biolab-btn-ghost">
              {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              {copied ? "Copied" : "Copy summary"}
            </button>
            <button onClick={() => window.print()} className="biolab-btn-primary"><Printer className="h-4 w-4" /> Print / save PDF</button>
          </div>
        </motion.header>

        <motion.section initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-6xl mx-auto mb-7">
          <div className="biolab-card-dark p-0 overflow-hidden">
            <div className="h-1.5" style={{ background: "var(--gradient-accent)" }} />
            <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  <span className="biolab-evidence-chip">WORKSHOP OUTPUT</span>
                  {competitive && <span className="biolab-evidence-chip">MOST VOTED · {topTeam.votes} {topTeam.votes === 1 ? "VOTE" : "VOTES"}</span>}
                </div>
                <p className="biolab-label mb-2">Team {topTeam.name}</p>
                <h3 className="text-3xl md:text-5xl leading-tight font-display font-bold text-white mb-5">{title}</h3>
                <p className="text-base md:text-lg text-slate-300 leading-8 mb-7">
                  {fallback(topTeam.pitchSummary, "The concept needs a concise pitch before it can be reviewed outside this workshop.")}
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    ["Challenge", fallback(topTeam.challenge?.title, "Not defined")],
                    ["Natural model", fallback(topTeam.organism?.name, "Not selected")],
                    ["Principle", fallback(topTeam.organism?.principle, "Not defined")],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <span className="biolab-label block mb-2">{label}</span>
                      <p className="text-sm font-semibold text-slate-100 leading-6">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[320px] border-t lg:border-t-0 lg:border-l border-white/10">
                {topTeam.organism?.image ? (
                  <img src={topTeam.organism.image} alt={topTeam.organism.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-white/5 text-slate-400">No natural model image</div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/95 to-transparent">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Biological reference</p>
                  <p className="text-xl font-display font-bold text-white">{fallback(topTeam.organism?.name, "Not selected")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-7">
          <div className="biolab-card">
            <div className="flex items-start justify-between gap-5 mb-6">
              <div>
                <span className="biolab-label block mb-2">Design readiness</span>
                <h3 className="text-2xl font-display font-bold text-foreground">{readiness}/4 evidence gates</h3>
              </div>
              <div className="h-14 w-14 rounded-2xl grid place-items-center bg-primary/8 text-primary"><ShieldCheck className="h-7 w-7" /></div>
            </div>
            <div className="space-y-3">
              {checks.map((check) => (
                <div key={check.label} className={`biolab-check-row ${check.passed ? "is-passed" : ""}`}>
                  <span>{check.passed ? <Check className="h-4 w-4" strokeWidth={3} /> : "—"}</span>
                  <div><strong>{check.label}</strong><small>{check.text}</small></div>
                </div>
              ))}
            </div>
          </div>

          <div className="biolab-card">
            <span className="biolab-label block mb-4">Technical handoff</span>
            <div className="space-y-4">
              {[
                ["Proposed solution", fallback(topTeam.canvas.solution, "Make the proposed application more specific.")],
                ["Expected impact", fallback(topTeam.canvas.benefit, "Define the expected technical, operational or environmental improvement.")],
                ["First validation step", fallback(topTeam.canvas.implementation, "Specify a simulation, prototype or comparative analysis.")],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-border bg-muted/35 p-4">
                  <strong className="text-sm font-display text-foreground">{label}</strong>
                  <p className="text-sm text-muted-foreground leading-6 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {sorted.length > 1 && (
          <section className="max-w-6xl mx-auto biolab-card mb-7">
            <div className="flex flex-wrap justify-between gap-3 mb-5">
              <div><span className="biolab-label block mb-2">Team comparison</span><h3 className="text-xl font-display font-bold text-foreground">Voting overview</h3></div>
              <p className="text-sm text-muted-foreground">Votes indicate preference, not technical validation.</p>
            </div>
            <div className="space-y-3">
              {sorted.map((team, index) => (
                <div key={team.id} className="flex items-center gap-4 rounded-2xl border border-border p-4">
                  <span className="font-mono text-sm font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-8 w-2 rounded-full" style={{ background: team.color }} />
                  <div className="flex-1 min-w-0"><strong className="block truncate text-foreground">{proposalTitle(team)}</strong><small className="text-muted-foreground">Team {team.name}</small></div>
                  <strong className="text-xl font-display text-foreground">{team.votes}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="max-w-6xl mx-auto biolab-callout mb-8">
          <strong>Responsible interpretation</strong>
          <p>This output is an early design hypothesis. A nature-inspired concept should not be presented as technically feasible or environmentally beneficial until testing, lifecycle implications and unintended effects have been assessed.</p>
        </section>

        <div className="text-center print:hidden">
          <p className="text-sm text-muted-foreground mb-5">Bio-Inspired Innovation Lab completed · progress remains saved on this device</p>
          <button onClick={onRestart} className="biolab-btn-ghost"><RotateCcw className="h-4 w-4" /> Start a new session</button>
        </div>
      </div>
    </div>
  );
}
