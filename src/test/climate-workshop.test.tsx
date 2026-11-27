// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BioLabProvider } from "@/contexts/BioLabContext";
import ChallengeRoulette from "@/components/biolab/ChallengeRoulette";
import ReferenceComparison from "@/components/biolab/ReferenceComparison";
import BioCanvasScreen from "@/components/biolab/BioCanvasScreen";
import { CHALLENGES, createTeam, ORGANISMS } from "@/data/biolab-data";
import { CLIMATE_CHALLENGES } from "@/data/climate-challenges";
const storage = "bio-airbus-ignite-en-v2";
const stored = (team: ReturnType<typeof createTeam>) => window.localStorage.setItem(storage,JSON.stringify({currentScreen:3,teams:[team],activeTeamIndex:0,reviewCompleted:false}));
describe("Climate workshop integration", () => {
 beforeEach(()=>window.localStorage.clear());
 afterEach(()=>{cleanup();vi.restoreAllMocks();});
 it("selects a climate challenge without changing an existing team until explicitly confirmed", async ()=>{
 const team={...createTeam("Lab",0),challenge:CHALLENGES[0],organism:ORGANISMS[0],pitchTitle:"Existing proposal"};
 team.canvas.problem="A previously written answer describing the original issue.";
 stored(team);
 const next=vi.fn();
 vi.spyOn(window,"confirm").mockReturnValueOnce(false).mockReturnValueOnce(true);
 render(<BioLabProvider><ChallengeRoulette onNext={next} onBack={vi.fn()}/></BioLabProvider>);
 fireEvent.click(screen.getByRole("button",{name:/(Climate Resilience Lab)/i}));
 fireEvent.click(screen.getByRole("button",{name:CLIMATE_CHALLENGES[0].title}));
 for(const field of screen.getAllByRole("group").filter(f=>f.querySelector('input[type="radio"]'))) {const radio=field.querySelector('input[type="radio"]');if(radio)fireEvent.click(radio);}
 const save=screen.getByRole("button",{name:"Save assessment"});fireEvent.click(save);
 const confirm=await screen.findByRole("button",{name:/^Confirm challenge$/i});
 fireEvent.click(confirm);expect(next).not.toHaveBeenCalled();expect(JSON.parse(window.localStorage.getItem(storage)!).teams[0].challenge.id).toBe("c1");
 fireEvent.click(confirm);expect(next).toHaveBeenCalledTimes(1);
 await waitFor(()=>{const t=JSON.parse(window.localStorage.getItem(storage)!).teams[0];expect(t.challenge.id).toBe("c9");expect(t.organism).toBeUndefined();expect(t.canvas.problem).toBe("");expect(t.pitchTitle).toBe("");});
 });
 it("displays all five climate reference checks and counts them accurately",()=>{
 const team={...createTeam("Lab",0),challenge:CLIMATE_CHALLENGES[1],organism:ORGANISMS[6]};
 render(<ReferenceComparison teams={[team]}/>);
 const checks=screen.getAllByRole("checkbox");
 expect(checks).toHaveLength(5);checks.forEach(c=>fireEvent.click(c));
 expect(screen.getByText(/5\/5/)).toBeInTheDocument();
 });
 it("shows climate-specific guidance while keeping six original canvas fields",()=>{
 const team={...createTeam("Lab",0),challenge:CLIMATE_CHALLENGES[2],organism:ORGANISMS[8]};
 stored(team);
 render(<BioLabProvider><BioCanvasScreen onNext={vi.fn()} onBack={vi.fn()}/></BioLabProvider>);
 expect(screen.getByRole("region",{name:"Climate adaptation guide"})).toBeInTheDocument();
 expect(screen.getAllByRole("textbox")).toHaveLength(6);
 });
});