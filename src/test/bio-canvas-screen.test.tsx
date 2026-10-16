// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import BioCanvasScreen from "@/components/biolab/BioCanvasScreen";
import { BioLabProvider } from "@/contexts/BioLabContext";
import { CHALLENGES, createTeam, ORGANISMS } from "@/data/biolab-data";

describe("BioCanvasScreen", () => {
  beforeEach(() => {
    window.localStorage.clear();
    const team = {
      ...createTeam("Flight Lab", 0),
      challenge: CHALLENGES[0],
      organism: ORGANISMS[0],
    };
    window.localStorage.setItem("bio-airbus-ignite-en-v2", JSON.stringify({
      currentScreen: 6,
      teams: [team],
      activeTeamIndex: 0,
      reviewCompleted: false,
    }));
  });

  it("shows all six questions and answer boxes at the same time", () => {
    render(
      <BioLabProvider>
        <BioCanvasScreen onNext={vi.fn()} onBack={vi.fn()} />
      </BioLabProvider>,
    );

    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByLabelText(/1 of 6: Exactly what do you need to improve/i)).toBeVisible();
    expect(screen.getByLabelText(/6 of 6: What test could show whether/i)).toBeVisible();
    expect(screen.queryByRole("button", { name: /Next section/i })).not.toBeInTheDocument();
  });

  it("updates an answer without hiding the other five fields", () => {
    render(
      <BioLabProvider>
        <BioCanvasScreen onNext={vi.fn()} onBack={vi.fn()} />
      </BioLabProvider>,
    );

    const firstAnswer = screen.getByLabelText(/1 of 6: Exactly what do you need to improve/i);
    fireEvent.change(firstAnswer, { target: { value: "A sufficiently detailed original technical problem statement." } });

    expect(firstAnswer).toHaveValue("A sufficiently detailed original technical problem statement.");
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByText("1/6 written")).toBeVisible();
  });
});
