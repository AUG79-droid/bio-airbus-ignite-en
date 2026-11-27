import ResetBioLabButton from "./ResetBioLabButton";
import { useState, useRef } from "react";
import type { Track } from "@/data/resilience-expansion";
import { motion } from "framer-motion";
interface WelcomeScreenProps {
  onNext: (track: Track, participation: "single" | "competition") => void;
  onResume?: () => void;
}

const QUICK_FLOW = [
  { n: "1", title: "Receive an Airbus challenge", text: "The app assigns or lets you choose a real aeronautics, plant or maintenance challenge." },
  { n: "2", title: "Explore nature", text: "Discover how organisms and ecosystems perform similar functions." },
  { n: "3", title: "Translate the principle", text: "Turn that natural strategy into an idea that can be applied at Airbus." },
  { n: "4", title: "Present and vote", text: "Each team prepares a short pitch and the group votes for the most promising proposals." },
];

export default function WelcomeScreen({ onNext, onResume }: WelcomeScreenProps) {
  const [track,setTrack]=useState<Track|null>(null);
  const modeRef=useRef<HTMLElement>(null);
  const names={general:"General innovation",climate:"Climate adaptation",resilience:"Strategic resilience"};
  const choose=(value:Track)=>{setTrack(value);requestAnimationFrame(()=>modeRef.current?.scrollIntoView({behavior:"smooth",block:"center"}));};
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}hero-biolab.jpg`}
        alt="Biomimicry: nature and engineering"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 biolab-hero-overlay" />
      <div className="absolute inset-0 biolab-grid-pattern-dark" />

      <div className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-3 px-4 md:px-8 py-4 md:py-6">
        <div className="flex items-center gap-2 opacity-70">
          <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: "hsl(45, 95%, 52%)" }} />
          <span className="font-mono-label" style={{ color: "hsl(210, 15%, 65%)" }}>Guided biomimicry workshop</span>
        </div>
        <span className="hidden sm:block font-mono-label" style={{ color: "hsl(210, 15%, 60%)" }}>Airbus-context learning simulation</span>
        <ResetBioLabButton dark/>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-16"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8 text-center"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-mono uppercase tracking-[0.15em] border"
            style={{
              color: "hsl(45, 95%, 65%)",
              borderColor: "hsl(45, 95%, 52%, 0.2)",
              background: "hsl(45, 95%, 52%, 0.06)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Guided biomimicry design experience
          </span>
        </motion.div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-bold tracking-tight mb-6" style={{ color: "hsl(0, 0%, 98%)" }}>
            <span className="block text-5xl md:text-7xl lg:text-8xl">Bio-Inspired</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl text-gradient-accent mt-1">Innovation Lab</span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mx-auto mb-8 h-px w-48"
            style={{ background: "linear-gradient(90deg, transparent, hsl(45, 95%, 52%, 0.4), transparent)" }}
          />

          <p className="text-xl md:text-2xl font-light mb-4 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 15%, 82%)" }}>
            Turn strategies from nature into ideas for <strong className="font-semibold text-white">aeronautics, plant operations and maintenance</strong>.
          </p>

          <p className="text-sm md:text-base mb-8 max-w-3xl mx-auto leading-relaxed" style={{ color: "hsl(210, 15%, 68%)" }}>
            <strong className="text-white">This is not a quiz.</strong> It combines essential biomimicry theory with a guided team exercise: define a challenge, study biological strategies and translate one into a testable proposal.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {QUICK_FLOW.map((item) => (
            <div
              key={item.n}
              className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-sm p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.16)]"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-mono font-semibold mb-4 bg-primary/10 text-primary border border-primary/20">
                {item.n}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm leading-6" style={{ color: "hsl(210, 15%, 74%)" }}>{item.text}</p>
            </div>
          ))}
        </div>

        <section className="max-w-5xl mx-auto mb-8 rounded-2xl bg-slate-950/80 border border-white/20 p-5 text-white">
          <h2 className="font-display text-2xl font-bold mb-2">01 · Choose your topic</h2>
          <p className="text-slate-200 mb-4">Choose what you want to learn. Then decide whether to play with one team or multiple teams.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">General Innovation</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Explore bio-inspired solutions for design, operations and maintenance. 8 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center mt-auto shrink-0" style={{ height: 64, minHeight: 64, padding: "10px 12px", boxSizing: "border-box", whiteSpace: "normal", lineHeight: 1.3 }} data-testid="topic-general" aria-pressed={track==="general"} onClick={()=>choose("general")}>{track==="general"?"✓ Selected":"Choose general innovation"}</button></div>
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">Climate Adaptation</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Identify future physical vulnerabilities and formulate testable adaptation ideas. 7 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center mt-auto shrink-0" style={{ height: 64, minHeight: 64, padding: "10px 12px", boxSizing: "border-box", whiteSpace: "normal", lineHeight: 1.3 }} data-testid="topic-climate" aria-pressed={track==="climate"} onClick={()=>choose("climate")}>{track==="climate"?"✓ Selected":"Choose climate adaptation"}</button></div>
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">Strategic Resilience</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Explore dependencies, recovery, coordination and longevity. 4 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center mt-auto shrink-0" style={{ height: 64, minHeight: 64, padding: "10px 12px", boxSizing: "border-box", whiteSpace: "normal", lineHeight: 1.3 }} data-testid="topic-resilience" aria-pressed={track==="resilience"} onClick={()=>choose("resilience")}>{track==="resilience"?"✓ Selected":"Choose strategic resilience"}</button></div>
          </div>
          <p className="text-sm text-slate-300 mt-3">Indicative duration: 25–40 min per challenge. Initial and final checks on the selected topic, with explained corrections and a downloadable report.</p>
        </section>
        {track&&<motion.section ref={modeRef} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="max-w-5xl mx-auto mb-8 rounded-2xl bg-slate-950/80 border border-white/20 p-5 text-white" data-testid="participation-choice">
          <h2 className="font-display text-2xl font-bold mb-2">02 · How will you play?</h2>
          <p className="text-slate-200 mb-4" data-testid="selected-topic">Selected topic: <strong>{names[track]}</strong></p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">One team</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Play individually or in a group, on one computer. Compare your proposal with the reference.</p><button data-testid="single-entry" type="button" className="biolab-btn-accent w-full justify-center text-center mt-auto" style={{minHeight:64}} onClick={()=>onNext(track,"single")}>Continue with one team</button></div>
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">Multiple teams</h3><p className="mt-2 mb-4 text-slate-200 flex-1">One common challenge and one wheel. Each team works on its own computer, then you compare proposals.</p><button data-testid="competition-entry" type="button" className="biolab-btn-accent w-full justify-center text-center mt-auto" style={{minHeight:64}} onClick={()=>onNext(track,"competition")}>Continue with multiple teams</button></div>
          </div>
        </motion.section>}
        <div className="max-w-5xl mx-auto mb-8 flex flex-wrap justify-center items-center gap-4">
          {onResume && <button type="button" data-testid="resume-session" onClick={onResume} className="rounded-xl border border-white/25 px-5 py-3 text-white font-semibold hover:bg-white/10">Resume my saved session</button>}
        </div>

        <div className="text-center mb-12">
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "hsl(210, 15%, 58%)" }}>
            Biomimicry studies how living systems perform functions and translates those strategies into human design. You will move from function to biological mechanism, design principle, application and validation.
          </p>

        </div>

        <div className="max-w-3xl mx-auto mb-9 rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md px-5 py-4 text-center">
          <p className="text-xs md:text-sm leading-6" style={{ color: "hsl(210, 15%, 74%)" }}>
            <strong className="text-white">Learning-use notice:</strong> this independent educational simulation uses Airbus-relevant scenarios. It does not represent an official Airbus process, technical recommendation or environmental claim.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-8"
        >
          {[
            { n: "6", label: "stages" },
            { n: "19", label: "challenges" },
            { n: "16", label: "natural models" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block text-2xl font-display font-bold" style={{ color: "hsl(45, 95%, 60%)" }}>{stat.n}</span>
              <span className="font-mono-label" style={{ color: "hsl(210, 15%, 45%)" }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
