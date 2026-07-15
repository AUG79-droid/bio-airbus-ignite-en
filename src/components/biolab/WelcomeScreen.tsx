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
        <span className="font-mono-label" style={{ color: "hsl(210, 15%, 50%)" }}>Airbus Innovation Lab</span>
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
            Practical session for Airbus teams
          </span>
        </motion.div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-bold tracking-tight mb-6" style={{ color: "hsl(0, 0%, 98%)" }}>
            <span className="block text-5xl md:text-7xl lg:text-8xl">BioLab</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl text-gradient-accent mt-1">Airbus</span>
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
            <strong className="text-white">This is not a quiz.</strong> It is a guided team exercise: receive an Airbus challenge, explore natural models, identify the biomimetic principle and translate it into a defensible proposal.
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

        <div className="text-center mb-12">
          <p className="text-sm max-w-2xl mx-auto mb-6" style={{ color: "hsl(210, 15%, 58%)" }}>
            Biomimicry learns from nature to solve human challenges. In this session, we will use it to generate useful ideas for Airbus—not to memorise theory.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="biolab-btn-accent text-lg px-14 py-5"
          >
            See how it works and start
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-center gap-8"
        >
          {[
            { n: "6", label: "stages" },
            { n: "8", label: "Airbus challenges" },
            { n: "10", label: "natural models" },
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
