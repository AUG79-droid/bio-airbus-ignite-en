import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { TeamData, Challenge, Organism, createTeam, CanvasData } from "@/data/biolab-data";

const STORAGE_KEY = "bio-airbus-ignite-en-v2";

interface StoredSession {
  currentScreen: number;
  teams: TeamData[];
  activeTeamIndex: number;
  reviewCompleted: boolean;
}

interface BioLabState extends StoredSession {
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
  resetSession: () => void;
  canAccessScreen: (screen: number) => boolean;
  maxAccessibleScreen: number;
  activeTeam: TeamData | undefined;
  isCanvasComplete: (team?: TeamData) => boolean;
  isPitchComplete: (team?: TeamData) => boolean;
}

const BioLabContext = createContext<BioLabState | undefined>(undefined);

function loadStoredSession(): StoredSession {
  const fallback = { currentScreen: 0, teams: [], activeTeamIndex: 0, reviewCompleted: false };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StoredSession>;
    if (!Array.isArray(parsed.teams)) return fallback;

    return {
      currentScreen: Math.min(Math.max(Number(parsed.currentScreen) || 0, 0), 9),
      teams: parsed.teams,
      reviewCompleted: Boolean(parsed.reviewCompleted),
      activeTeamIndex: Math.min(
        Math.max(Number(parsed.activeTeamIndex) || 0, 0),
        Math.max(parsed.teams.length - 1, 0),
      ),
    };
  } catch {
    return fallback;
  }
}

function canvasIsComplete(team?: TeamData) {
  return Boolean(team && Object.values(team.canvas).every((value) => value.trim().length > 0));
}

function pitchIsComplete(team?: TeamData) {
  return Boolean(team?.pitchTitle.trim() && team?.pitchSummary.trim());
}

function getMaxAccessibleScreen(team?: TeamData, allTeams: TeamData[] = [], reviewCompleted = false) {
  if (!team) return 2;
  if (!team.challenge) return 3;
  if (!team.organism) return 4;
  if (!canvasIsComplete(team)) return 6;
  if (!pitchIsComplete(team)) return 7;
  if (allTeams.some((candidate) => !pitchIsComplete(candidate))) return 7;
  return reviewCompleted ? 9 : 8;
}

function getResumeScreen(team?: TeamData) {
  if (!team?.challenge) return 3;
  if (!team.organism) return 4;
  if (!canvasIsComplete(team)) return 6;
  if (!pitchIsComplete(team)) return 7;
  return 8;
}

export function BioLabProvider({ children }: { children: ReactNode }) {
  const [initialSession] = useState(loadStoredSession);
  const [currentScreen, setCurrentScreen] = useState(initialSession.currentScreen);
  const [teams, setTeams] = useState<TeamData[]>(initialSession.teams);
  const [activeTeamIndex, setActiveTeamIndex] = useState(initialSession.activeTeamIndex);
  const [reviewCompleted, setReviewCompleted] = useState(initialSession.reviewCompleted);

  const activeTeam = teams[activeTeamIndex];
  const maxAccessibleScreen = useMemo(
    () => getMaxAccessibleScreen(activeTeam, teams, reviewCompleted),
    [activeTeam, teams, reviewCompleted],
  );

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentScreen, teams, activeTeamIndex, reviewCompleted }),
    );
  }, [currentScreen, teams, activeTeamIndex, reviewCompleted]);

  useEffect(() => {
    if (currentScreen > 2 && currentScreen > maxAccessibleScreen) {
      setCurrentScreen(maxAccessibleScreen);
    }
  }, [currentScreen, maxAccessibleScreen]);

  const setScreen = (screen: number) => {
    const safeScreen = Math.min(Math.max(screen, 0), 9);
    setCurrentScreen(safeScreen <= 2 ? safeScreen : Math.min(safeScreen, maxAccessibleScreen));
  };

  const nextScreen = () => setCurrentScreen((screen) => {
    if (screen === 8) setReviewCompleted(true);
    return Math.min(screen + 1, 9);
  });
  const prevScreen = () => setCurrentScreen((screen) => Math.max(screen - 1, 0));

  const addTeam = (name: string, colorIndex: number) => {
    setTeams((previousTeams) => [...previousTeams, createTeam(name, colorIndex)]);
  };

  const removeTeam = (index: number) => {
    setTeams((previousTeams) => previousTeams.filter((_, teamIndex) => teamIndex !== index));
    setActiveTeamIndex((currentIndex) => {
      if (currentIndex > index) return currentIndex - 1;
      if (currentIndex === index) return Math.max(0, currentIndex - 1);
      return currentIndex;
    });
  };

  const selectTeam = (index: number) => {
    const selectedTeam = teams[index];
    if (!selectedTeam) return;
    setActiveTeamIndex(index);
    if (currentScreen >= 3) setCurrentScreen(getResumeScreen(selectedTeam));
  };

  const setTeamChallenge = (challenge: Challenge) => {
    setTeams((previousTeams) =>
      previousTeams.map((team, index) => (index === activeTeamIndex ? { ...team, challenge } : team)),
    );
  };

  const setTeamOrganism = (organism: Organism) => {
    setTeams((previousTeams) =>
      previousTeams.map((team, index) => (index === activeTeamIndex ? { ...team, organism } : team)),
    );
  };

  const updateCanvas = (field: keyof CanvasData, value: string) => {
    setTeams((previousTeams) =>
      previousTeams.map((team, index) =>
        index === activeTeamIndex ? { ...team, canvas: { ...team.canvas, [field]: value } } : team,
      ),
    );
  };

  const updatePitch = (title: string, summary: string) => {
    setTeams((previousTeams) =>
      previousTeams.map((team, index) =>
        index === activeTeamIndex ? { ...team, pitchTitle: title, pitchSummary: summary } : team,
      ),
    );
  };

  const voteForTeam = (teamIndex: number) => {
    setTeams((previousTeams) =>
      previousTeams.map((team, index) => (index === teamIndex ? { ...team, votes: team.votes + 1 } : team)),
    );
  };

  const resetVotes = () => {
    setTeams((previousTeams) => previousTeams.map((team) => ({ ...team, votes: 0 })));
  };

  const resetSession = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setCurrentScreen(0);
    setTeams([]);
    setActiveTeamIndex(0);
    setReviewCompleted(false);
  };

  return (
    <BioLabContext.Provider
      value={{
        currentScreen,
        teams,
        activeTeamIndex,
        reviewCompleted,
        setScreen,
        nextScreen,
        prevScreen,
        addTeam,
        removeTeam,
        setActiveTeam: selectTeam,
        setTeamChallenge,
        setTeamOrganism,
        updateCanvas,
        updatePitch,
        voteForTeam,
        resetVotes,
        resetSession,
        canAccessScreen: (screen) => screen <= 2 || screen <= maxAccessibleScreen,
        maxAccessibleScreen,
        activeTeam,
        isCanvasComplete: canvasIsComplete,
        isPitchComplete: pitchIsComplete,
      }}
    >
      {children}
    </BioLabContext.Provider>
  );
}

export function useBioLab() {
  const context = useContext(BioLabContext);
  if (!context) throw new Error("useBioLab must be used within BioLabProvider");
  return context;
}
