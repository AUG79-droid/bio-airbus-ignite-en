import { BioLabProvider, useBioLab } from "@/contexts/BioLabContext";
import BioLabNav from "@/components/biolab/BioLabNav";
import WelcomeScreen from "@/components/biolab/WelcomeScreen";
import HowItWorksScreen from "@/components/biolab/HowItWorksScreen";
import TeamsScreen from "@/components/biolab/TeamsScreen";
import ChallengeRoulette from "@/components/biolab/ChallengeRoulette";
import NatureLibrary from "@/components/biolab/NatureLibrary";
import MatchingScreen from "@/components/biolab/MatchingScreen";
import BioCanvasScreen from "@/components/biolab/BioCanvasScreen";
import PitchScreen from "@/components/biolab/PitchScreen";
import VotingScreen from "@/components/biolab/VotingScreen";
import ResultsScreen from "@/components/biolab/ResultsScreen";
import { AnimatePresence, motion } from "framer-motion";

function BioLabApp() {
  const { currentScreen, nextScreen, prevScreen, setScreen } = useBioLab();

  const screens = [
    <WelcomeScreen onNext={nextScreen} />,
    <HowItWorksScreen onNext={nextScreen} onBack={prevScreen} />,
    <TeamsScreen onNext={nextScreen} onBack={prevScreen} />,
    <ChallengeRoulette onNext={nextScreen} onBack={prevScreen} />,
    <NatureLibrary onNext={nextScreen} onBack={prevScreen} />,
    <MatchingScreen onNext={nextScreen} onBack={prevScreen} />,
    <BioCanvasScreen onNext={nextScreen} onBack={prevScreen} />,
    <PitchScreen onNext={nextScreen} onBack={prevScreen} />,
    <VotingScreen onNext={nextScreen} onBack={prevScreen} />,
    <ResultsScreen onRestart={() => setScreen(0)} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <BioLabNav />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={currentScreen > 0 ? "pt-14" : ""}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Index() {
  return (
    <BioLabProvider>
      <BioLabApp />
    </BioLabProvider>
  );
}
