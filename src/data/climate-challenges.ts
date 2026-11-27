import { EXTRA_CLIMATE, expansionReferences, expansionSources } from "./resilience-expansion";
import type { Challenge } from "./biolab-data";
import type { ReferenceSolution } from "./reference-solutions";
// Fictional educational exercises, not real aircraft performance or approved engineering.
export const CLIMATE_CHALLENGES: Challenge[] = [
  {
    "id": "c9",
    "icon": "🌡️",
    "title": "Protect equipment against extreme heat",
    "area": "Thermal Engineering & In-Service",
    "description": "Under hypothetical longer heat episodes, explore protection for an experimental non-critical equipment enclosure. Preserve function, safety and maintenance access."
  },
  {
    "id": "c10",
    "icon": "🌬️",
    "title": "Reduce dust accumulation and assess durability",
    "area": "Materials & Maintenance",
    "description": "Under hypothetical changing dust exposure, propose a self-cleaning surface for a non-critical coupon. Assess deposition, cleaning and abrasion separately."
  },
  {
    "id": "c11",
    "icon": "⛈️",
    "title": "Limit hail-impact damage",
    "area": "Materials Engineering & Durability",
    "description": "Under hypothetical future hail exposure, explore layered architecture in a non-critical panel coupon. Do not extrapolate to aircraft storm resistance."
  },
  ...EXTRA_CLIMATE,
];
export const climateReferenceSolutions: Record<string, ReferenceSolution> = {
  ...expansionReferences,
  "c9": {
    "recommendedModel": "Termite mound",
    "mechanism": "In certain species, daily temperature oscillations drive ventilation.",
    "caution": "Passive airflow does not guarantee cooling when ambient air is hot or replace thermal controls or qualification.",
    "explanation": "The aim is reduced future heat exposure, not merely energy savings.",
    "answer": {
      "problem": "Compare an experimental non-critical enclosure with its reference during a hypothetical heat event, preserving function and access.",
      "organism": "Some termite mounds exploit thermal differences to move air and exchange gases.",
      "principle": "Manage heat exchange and airflow; identify when the gradient is unfavourable.",
      "solution": "Propose an experimental variant and compare with the reference under equivalent conditions, without modifying actual aircraft.",
      "benefit": "Hypothesis: reduced heat exposure. Measure maximum temperature and time outside the test criterion; consider mass and energy.",
      "implementation": "Thermal Engineering, Systems and Maintenance should define exposure and criteria, compare specimens and record adverse findings and evidence gaps."
    },
    "check": [
      "Does it identify future hazard, exposure and consequence?",
      "Does it justify the thermal mechanism and its limits?",
      "Are function and exposure equivalent?",
      "Are thermal indicators, mass and safety trade-offs defined?",
      "Are tests, owners and evidence gaps identified?"
    ]
  },
  "c10": {
    "recommendedModel": "Lotus leaf",
    "mechanism": "Surface microstructure and chemistry support water repellence and removal of certain contaminants by droplets.",
    "caution": "Water repellence does not imply dry-dust repellence or abrasion resistance. Texture can degrade.",
    "explanation": "Deposition and wear are distinct outcomes requiring distinct evidence.",
    "answer": {
      "problem": "Compare particle retention and durability of an experimental surface under hypothetical future exposure, preserving function.",
      "organism": "The leaf's hierarchical surface and waxes help droplets carry away certain particles.",
      "principle": "Explore low adhesion and self-cleaning under defined conditions, without equating them with mechanical resistance.",
      "solution": "Propose a treated coupon and compare it with a reference through separate deposition, cleaning and abrasion tests.",
      "benefit": "Hypothesis: less retained dust or lower cleaning effort. Measure mass per area and property loss after wear; durability may worsen.",
      "implementation": "Materials, Maintenance and Quality should define particles, conditions and criteria; review degradation, compatibility, waste and repeatability."
    },
    "check": [
      "Are deposition and abrasion distinguished?",
      "Is it explained why the lotus effect does not guarantee dry-dust repellence?",
      "Is there a reference with equivalent exposure?",
      "Are cleaning and property loss measured separately?",
      "Are adverse effects, uncertainty and technical review considered?"
    ]
  },
  "c11": {
    "recommendedModel": "Nacre",
    "mechanism": "Mineral layers and organic interfaces can deflect cracks and dissipate energy.",
    "caution": "Layered architecture does not guarantee impact resistance; it may introduce delamination, mass or inspection challenges. Hail does not represent all storm hazards.",
    "explanation": "One damage mode is studied. Regional hail trends require specific assessment.",
    "answer": {
      "problem": "Compare non-critical coupons of equivalent function and acceptance criteria under specialist-defined impact exposure.",
      "organism": "Nacre combines mineral layers and organic interfaces that enable crack deflection and energy dissipation.",
      "principle": "Explore interfaces that limit damage propagation without equating toughness with universal impact resistance.",
      "solution": "Propose a layered coupon and study damage against a reference in comparable conditions, without modifying actual aircraft structures.",
      "benefit": "Hypothesis: less damage extent under the defined test. Assess areal mass, inspectability and repair; do not claim storm protection.",
      "implementation": "Materials, Structures and Quality should define criteria, inspection and tests, and record uncertainty and failure modes before deciding further research."
    },
    "check": [
      "Is the problem limited to hail and a specific function?",
      "Is the mechanism explained without promising universal resistance?",
      "Are coupons compared with equivalent criteria?",
      "Are residual damage, mass, inspection and repair considered?",
      "Are tests and extrapolation limits identified?"
    ]
  }
};
export const climateSources: Record<string,string> = {
  ...expansionSources,
  "c9": "https://pubmed.ncbi.nlm.nih.gov/26316023/",
  "c10": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10753341/",
  "c11": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5090675/"
};
