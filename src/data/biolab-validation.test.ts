import { describe, expect, it } from "vitest";
import {
  isCanvasEntryReady,
  isObviousFillerText,
  isPitchSummaryReady,
  isPitchTitleReady,
} from "./biolab-data";

describe("canvas and pitch input completeness", () => {
  const validSpanish = "Diseñar un soporte aligerado inspirado en los huesos de las aves, manteniendo la resistencia estructural.";
  const validEnglish = "Develop a lightweight structural support inspired by bird bones while preserving the required structural resistance.";

  it("rejects long strings of a single repeated character", () => {
    for (const text of ["c".repeat(90), "a".repeat(130), "x".repeat(20) + " ".repeat(5)]) {
      expect(isObviousFillerText(text)).toBe(true);
      expect(isCanvasEntryReady("solution", text)).toBe(false);
    }
  });

  it("rejects repeated tokens and unbroken placeholder strings", () => {
    expect(isCanvasEntryReady("benefit", "test ".repeat(30))).toBe(false);
    expect(isCanvasEntryReady("solution", "abc".repeat(25))).toBe(false);
  });

  it("keeps legitimate explanatory content in both languages", () => {
    expect(isCanvasEntryReady("solution", validSpanish)).toBe(true);
    expect(isCanvasEntryReady("solution", validEnglish)).toBe(true);
    expect(isObviousFillerText(validSpanish)).toBe(false);
    expect(isObviousFillerText(validEnglish)).toBe(false);
  });

  it("rejects test-only pitch text, not just texts shorter than the character minimum", () => {
    expect(isPitchTitleReady("cccccccccccccccc")).toBe(false);
    expect(isPitchSummaryReady("c".repeat(180))).toBe(false);
    expect(isPitchTitleReady("Bioestructura ligera")).toBe(true);
    expect(isPitchSummaryReady(validSpanish + " " + validEnglish)).toBe(true);
    expect(isPitchSummaryReady("Short text")).toBe(false);
  });

  it("does not treat the character gate as semantic or engineering validation", () => {
    expect(isCanvasEntryReady("solution", "Proponer una comparación inicial entre una pieza base y tres variantes.") ).toBe(true);
  });
});
