import { setPreferredTrack } from "@/components/biolab/PilotAssessment";
import { motion } from "framer-motion";
interface WelcomeScreenProps {
  onNext: () => void;
}

const QUICK_FLOW = [
  { n: "1", title: "Receive an Airbus challenge", text: "The app assigns or lets you choose a real aeronautics, plant or maintenance challenge." },
  { n: "2", title: "Explore nature", text: "Discover how organisms and ecosystems perform similar functions." },
  { n: "3", title: "Translate the principle", text: "Turn that natural strategy into an idea that can be applied at Airbus." },
  { n: "4", title: "Present and vote", text: "Each team prepares a short pitch and the group votes for the most promising proposals." },
];

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
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

      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2 opacity-70">
          <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color: "hsl(45, 95%, 52%)" }} />
          <span className="font-mono-label" style={{ color: "hsl(210, 15%, 65%)" }}>Guided biomimicry workshop</span>
        </div>
        <span className="hidden sm:block font-mono-label" style={{ color: "hsl(210, 15%, 60%)" }}>Airbus-context learning simulation</span>
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
          <h2 className="font-display text-2xl font-bold mb-2">Choose your learning objective</h2>
          <p className="text-slate-200 mb-4">Work individually or in a team. Follow the instructions, solve one challenge and compare your proposal with a reference. No facilitator required.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">General Innovation</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Explore bio-inspired solutions for design, operations and maintenance. 8 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center" onClick={()=>{setPreferredTrack("general");onNext();}}>Start general innovation</button></div>
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">Climate Adaptation</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Identify future physical vulnerabilities and formulate testable adaptation ideas. 7 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center" onClick={()=>{setPreferredTrack("climate");onNext();}}>Start climate adaptation</button></div>
            <div className="rounded-xl border border-white/20 p-4 flex flex-col"><h3 className="text-xl font-bold">Strategic Resilience</h3><p className="mt-2 mb-4 text-slate-200 flex-1">Explore dependencies, recovery, coordination and longevity. 4 challenges.</p><button type="button" className="biolab-btn-accent w-full justify-center text-center" onClick={()=>{setPreferredTrack("resilience");onNext();}}>Start strategic resilience</button></div>
          </div>
          <p className="text-sm text-slate-300 mt-3">Indicative duration: 25–40 min per challenge. Initial and final assessments; voluntary export of unnamed learning data.</p>
        </section>
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
