import { describe, expect, it } from "vitest";
import { EXTRA_MODELS, STRATEGIC_CHALLENGES } from "./resilience-expansion";
import { CHALLENGES, ORGANISMS } from "./biolab-data";
import { CLIMATE_CHALLENGES, climateSources } from "./climate-challenges";
import { referenceSolutions } from "./reference-solutions";
describe("Climate Resilience Lab", () => {
 it("preserves eight general challenges and adds seven climate and four resilience challenges", () => { expect(CHALLENGES).toHaveLength(8); expect(CLIMATE_CHALLENGES).toHaveLength(7); expect(STRATEGIC_CHALLENGES).toHaveLength(4); expect(new Set([...CHALLENGES,...CLIMATE_CHALLENGES,...STRATEGIC_CHALLENGES].map(c=>c.id)).size).toBe(19); });
 it("has complete references, five checks, existing natural models and public sources", () => { for (const c of [...CLIMATE_CHALLENGES,...STRATEGIC_CHALLENGES]) {const ref=referenceSolutions[c.id]; expect(ref).toBeDefined(); expect([...ORGANISMS,...EXTRA_MODELS].some(o=>o.name===ref.recommendedModel)).toBe(true); expect(Object.keys(ref.answer)).toHaveLength(6); expect(Object.values(ref.answer).every(v=>v.length>30)).toBe(true); expect(ref.check).toHaveLength(5); expect(climateSources[c.id]).toMatch(/^https:/);} });
});