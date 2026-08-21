// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { BioLabProvider, useBioLab } from "@/contexts/BioLabContext";
import { CHALLENGES, ORGANISMS } from "@/data/biolab-data";

function Harness() {
  const lab = useBioLab();
  const completeCanvas = () => {
    (["problem", "organism", "principle", "solution", "benefit", "implementation"] as const)
      .forEach((field) => lab.updateCanvas(field, `Completed ${field}`));
  };

  return (
    <div>
      <output data-testid="screen">{lab.currentScreen}</output>
      <output data-testid="limit">{lab.maxAccessibleScreen}</output>
      <output data-testid="results-access">{String(lab.canAccessScreen(9))}</output>
      <button onClick={() => lab.addTeam("Flight Lab", 0)}>add team</button>
      <button onClick={() => lab.setTeamChallenge(CHALLENGES[0])}>set challenge</button>
      <button onClick={() => lab.setTeamOrganism(ORGANISMS[0])}>set organism</button>
      <button onClick={completeCanvas}>complete canvas</button>
      <button onClick={() => lab.updatePitch("Bionic structure", "A testable bio-inspired proposal.")}>complete pitch</button>
      <button onClick={() => lab.setScreen(8)}>open review</button>
      <button onClick={lab.nextScreen}>finish review</button>
    </div>
  );
}

describe("BioLab learning route", () => {
  beforeEach(() => window.localStorage.clear());

  it("unlocks stages only after their required learning outputs", async () => {
    render(<BioLabProvider><Harness /></BioLabProvider>);

    expect(screen.getByTestId("limit")).toHaveTextContent("2");
    fireEvent.click(screen.getByRole("button", { name: "add team" }));
    expect(screen.getByTestId("limit")).toHaveTextContent("3");
    fireEvent.click(screen.getByRole("button", { name: "set challenge" }));
    expect(screen.getByTestId("limit")).toHaveTextContent("4");
    fireEvent.click(screen.getByRole("button", { name: "set organism" }));
    expect(screen.getByTestId("limit")).toHaveTextContent("6");
    fireEvent.click(screen.getByRole("button", { name: "complete canvas" }));
    expect(screen.getByTestId("limit")).toHaveTextContent("7");
    fireEvent.click(screen.getByRole("button", { name: "complete pitch" }));
    expect(screen.getByTestId("limit")).toHaveTextContent("8");
    expect(screen.getByTestId("results-access")).toHaveTextContent("false");

    fireEvent.click(screen.getByRole("button", { name: "open review" }));
    fireEvent.click(screen.getByRole("button", { name: "finish review" }));
    expect(screen.getByTestId("screen")).toHaveTextContent("9");
    expect(screen.getByTestId("results-access")).toHaveTextContent("true");

    await waitFor(() => {
      expect(window.localStorage.getItem("bio-airbus-ignite-en-v2")).toContain("Bionic structure");
    });
  });
});
