import { useState } from "react";
import { setPreferredTrack } from "@/components/biolab/PilotAssessment";
import type { Track } from "@/data/resilience-expansion";
import Workshop from "@/components/biolab/Workshop";
import { BioLabProvider, useBioLab } from "@/contexts/BioLabContext";
import BioLabNav from "@/components/biolab/BioLabNav";
import BioLabGuide from "@/components/biolab/BioLabGuide";
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
  const { currentScreen, nextScreen, prevScreen, resetSession, activeTeam, teams, setScreen } = useBioLab();
  const [landing,setLanding]=useState(true);
  const startTrack=(track:Track)=>{
    if(teams.length>0){
      if(!window.confirm("Start a new challenge? The saved individual session in this browser will be replaced."))return;
      resetSession();
    }
    setPreferredTrack(track);
    setLanding(false);
    setScreen(1);
  };
  const resume=()=>{setLanding(false);if(currentScreen===0)setScreen(1);};
  if(landing||currentScreen===0)return <div className="min-h-screen bg-background"><WelcomeScreen onNext={startTrack} onResume={currentScreen>0||teams.length>0?resume:undefined}/><BioLabGuide stageOverride={0}/></div>;

  const screens = [
    <WelcomeScreen onNext={startTrack} />,
    <HowItWorksScreen onNext={nextScreen} onBack={prevScreen} />,
    <TeamsScreen onNext={nextScreen} onBack={prevScreen} />,
    <ChallengeRoulette key={activeTeam?.id ?? "none"} onNext={nextScreen} onBack={prevScreen} />,
    <NatureLibrary onNext={nextScreen} onBack={prevScreen} />,
    <MatchingScreen onNext={nextScreen} onBack={prevScreen} />,
    <BioCanvasScreen onNext={nextScreen} onBack={prevScreen} />,
    <PitchScreen onNext={nextScreen} onBack={prevScreen} />,
    <VotingScreen onNext={nextScreen} onBack={prevScreen} />,
    <ResultsScreen onRestart={resetSession} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <BioLabNav />
      <BioLabGuide />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={currentScreen > 0 ? "pt-20" : ""}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Index() {
  if(new URLSearchParams(window.location.search).get('workshop')==='1')return <Workshop/>;
  return (
    <BioLabProvider>
      <BioLabApp />
    </BioLabProvider>
  );
}
