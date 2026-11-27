// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { PilotAssessment, hasBaseline, preferredTrack, setPreferredTrack } from "@/components/biolab/PilotAssessment";
const saveLabel="Save assessment";
const fill=(indices:number[])=>{const fields=screen.getAllByRole("group").filter(f=>f.querySelector('input[type="radio"]'));expect(fields).toHaveLength(4);fields.forEach((f,i)=>fireEvent.click(f.querySelectorAll('input[type="radio"]')[indices[i]]));};
describe("Independent pilot assessment",()=>{
 beforeEach(()=>localStorage.clear());afterEach(cleanup);
 it("keeps the selected track and isolates assessments by team and track",()=>{
 setPreferredTrack("resilience");expect(preferredTrack()).toBe("resilience");
 const {unmount}=render(<PilotAssessment teamId="one" track="resilience" phase="pre"/>);
 expect(screen.getByRole("button",{name:saveLabel})).toBeDisabled();
 fill([0,1,2,1]);fireEvent.click(screen.getByRole("button",{name:saveLabel}));expect(hasBaseline("one","resilience")).toBe(true);expect(hasBaseline("two","resilience")).toBe(false);expect(hasBaseline("one","climate")).toBe(false);unmount();
 render(<PilotAssessment teamId="one" track="resilience" phase="pre"/>);expect(screen.queryByRole("button",{name:saveLabel})).not.toBeInTheDocument();
 });
 it("calculates paired scores only after feedback and enables voluntary export",()=>{
 const {unmount}=render(<PilotAssessment teamId="one" track="climate" phase="pre"/>);fill([0,0,2,1]);fireEvent.click(screen.getByRole("button",{name:saveLabel}));unmount();
 render(<PilotAssessment teamId="one" track="climate" phase="post" challengeId="c9"/>);fill([1,0,2,1]);expect(screen.getByRole("button",{name:saveLabel})).toBeDisabled();screen.getAllByRole("combobox").forEach(c=>fireEvent.change(c,{target:{value:c.querySelector('option[value="4"]')?"4":"seek_evidence"}}));fireEvent.click(screen.getByRole("button",{name:saveLabel}));expect(screen.getByText(/3\/4.*4\/4.*25 pp/)).toBeInTheDocument();expect(screen.getByRole("button",{name:/JSON/i})).toBeInTheDocument();
 });
});

it("supports the general innovation baseline independently from the climate and resilience tracks",()=>{render(<PilotAssessment teamId="general-one" track="general" phase="pre"/>);fill([0,2,1,0]);fireEvent.click(screen.getByRole("button",{name:saveLabel}));expect(hasBaseline("general-one","general")).toBe(true);expect(hasBaseline("general-one","climate")).toBe(false);});

it("requires a new baseline before a different challenge after a completed attempt",()=>{const {unmount}=render(<PilotAssessment teamId="repeat" track="climate" phase="pre"/>);fill([0,1,2,1]);fireEvent.click(screen.getByRole("button",{name:saveLabel}));unmount();render(<PilotAssessment teamId="repeat" track="climate" phase="post" challengeId="c9"/>);fill([1,0,2,1]);screen.getAllByRole("combobox").forEach(c=>fireEvent.change(c,{target:{value:c.querySelector('option[value="4"]')?"4":"seek_evidence"}}));fireEvent.click(screen.getByRole("button",{name:saveLabel}));expect(hasBaseline("repeat","climate","c9")).toBe(true);expect(hasBaseline("repeat","climate","c10")).toBe(false);});
