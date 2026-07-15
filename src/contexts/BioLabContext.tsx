import React, { createContext, useContext, useState, ReactNode } from "react";
import { TeamData, Challenge, Organism, createTeam, createEmptyCanvas, CanvasData } from "@/data/biolab-data";

interface BioLabState {
  currentScreen: number;
  teams: TeamData[];
  activeTeamIndex: number;
  setScreen: (screen: number) => void;
  nextScreen: () => void;
  prevScreen: () => void;
  addTeam: (name: string, colorIndex: number) => void;
  removeTeam: (index: number) => void;
  setActiveTeam: (index: number) => void;
  setTeamChallenge: (challenge: Challenge) => void;
  setTeamOrganism: (organism: Organism) => void;
  updateCanvas: (field: keyof CanvasData, value: string) => void;
  updatePitch: (title: string, summary: string) => void;
  voteForTeam: (teamIndex: number) => void;
  resetVotes: () => void;
  activeTeam: TeamData | undefined;
}

const BioLabContext = createContext<BioLabState | undefined>(undefined);

export function BioLabProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const activeTeam = teams[activeTeamIndex];

  const nextScreen = () => setCurrentScreen((s) => Math.min(s + 1, 9));
  const prevScreen = () => setCurrentScreen((s) => Math.max(s - 1, 0));

  const addTeam = (name: string, colorIndex: number) => {
    setTeams((prev) => [...prev, createTeam(name, colorIndex)]);
  };

  const removeTeam = (index: number) => {
    setTeams((prev) => prev.filter((_, i) => i !== index));
    if (activeTeamIndex >= teams.length - 1) setActiveTeamIndex(Math.max(0, teams.length - 2));
  };

  const setTeamChallenge = (challenge: Challenge) => {
    setTeams((prev) =>
      prev.map((t, i) => (i === activeTeamIndex ? { ...t, challenge } : t))
    );
  };

  const setTeamOrganism = (organism: Organism) => {
    setTeams((prev) =>
      prev.map((t, i) => (i === activeTeamIndex ? { ...t, organism } : t))
    );
  };

  const updateCanvas = (field: keyof CanvasData, value: string) => {
    setTeams((prev) =>
      prev.map((t, i) =>
        i === activeTeamIndex ? { ...t, canvas: { ...t.canvas, [field]: value } } : t
      )
    );
  };

  const updatePitch = (title: string, summary: string) => {
    setTeams((prev) =>
      prev.map((t, i) =>
        i === activeTeamIndex ? { ...t, pitchTitle: title, pitchSummary: summary } : t
      )
    );
  };

  const voteForTeam = (teamIndex: number) => {
    setTeams((prev) =>
      prev.map((t, i) => (i === teamIndex ? { ...t, votes: t.votes + 1 } : t))
    );
  };

  const resetVotes = () => {
    setTeams((prev) => prev.map((t) => ({ ...t, votes: 0 })));
  };

  return (
    <BioLabContext.Provider
      value={{
        currentScreen,
        teams,
        activeTeamIndex,
        setScreen: setCurrentScreen,
        nextScreen,
        prevScreen,
        addTeam,
        removeTeam,
        setActiveTeam: setActiveTeamIndex,
        setTeamChallenge,
        setTeamOrganism,
        updateCanvas,
        updatePitch,
        voteForTeam,
        resetVotes,
        activeTeam,
      }}
    >
      {children}
    </BioLabContext.Provider>
  );
}

export function useBioLab() {
  const ctx = useContext(BioLabContext);
  if (!ctx) throw new Error("useBioLab must be used within BioLabProvider");
  return ctx;
}
