import type { Challenge, Organism } from "./biolab-data";
import type { ReferenceSolution } from "./reference-solutions";
export const EXTRA_CLIMATE: Challenge[] = [
  {
    "id": "c12",
    "icon": "☀️",
    "title": "Protection against solar heat",
    "area": "Thermal Engineering",
    "description": "Experimental non-critical equipment faces hypothetically stronger heat and solar exposure. Explore a surface that limits thermal load without changing its function."
  },
  {
    "id": "c13",
    "icon": "🌪️",
    "title": "Resistance to particle erosion",
    "area": "Materials & Durability",
    "description": "A hypothetical future scenario involves increased abrasive particle exposure. Study wear on a non-critical coupon, distinguishing erosion from dust accumulation."
  },
  {
    "id": "c14",
    "icon": "💧",
    "title": "Respond to humidity cycles",
    "area": "Materials & Facilities",
    "description": "Test equipment experiences hypothetical changing humidity and drying cycles. Explore an experimental passive exposure indicator without replacing certified sensors."
  },
  {
    "id": "c15",
    "icon": "❄️",
    "title": "Thermal protection in cold environments",
    "area": "Infrastructure & Energy",
    "description": "Non-critical auxiliary equipment faces a hypothetical cold scenario with moisture and thaw cycles. Arctic planning must account for variability, not assume the climate is becoming colder."
  }
];
export const STRATEGIC_CHALLENGES: Challenge[] = [
  {
    "id": "r1",
    "icon": "🕸️",
    "title": "Redundancy without hidden dependencies",
    "area": "Procurement & Supply Chain",
    "description": "A fictional supply network loses a supplier. Compare alternative routes and check that they do not share the same critical dependency."
  },
  {
    "id": "r2",
    "icon": "🌱",
    "title": "Limit damage and support repair",
    "area": "Materials Engineering & In-Service",
    "description": "An experimental non-critical protective layer experiences repeated superficial damage. Explore sealing and recovery without assuming restored structural strength."
  },
  {
    "id": "r3",
    "icon": "🔄",
    "title": "Coordination during disruption",
    "area": "Operations & Logistics",
    "description": "A fictional logistics flow loses access to a resource. Explore distributed coordination while maintaining accountability and decision traceability."
  },
  {
    "id": "r4",
    "icon": "🧩",
    "title": "Reversible design and longevity",
    "area": "Engineering & In-Service",
    "description": "A non-critical experimental assembly contains a part that needs periodic replacement. Explore a reversible joint to avoid replacing the whole assembly."
  }
];
export const expansionReferences: Record<string,ReferenceSolution> = {
  "c12": {
    "recommendedModel": "Saharan silver ant",
    "mechanism": "Specialised hairs reflect part of incident sunlight and enhance infrared thermal emission.",
    "caution": "Response depends on spectrum, orientation, surroundings and ageing; cooling is not guaranteed.",
    "explanation": "Experimental non-critical equipment faces hypothetically stronger heat and solar exposure. Explore a surface that limits thermal load without changing its function.",
    "answer": {
      "problem": "Compare temperature and heat load on specimens under equivalent radiation.",
      "organism": "Specialised hairs reflect part of incident sunlight and enhance infrared thermal emission.",
      "principle": "Solar reflection and thermal emission",
      "solution": "Investigate an experimental surface with selective optical response; do not modify an actual product.",
      "benefit": "Measure temperature, absorption and emission; check mass, ageing and cleaning.",
      "implementation": "Thermal Engineering and Materials: compare specimens under controlled exposure and repeat after ageing."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "c13": {
    "recommendedModel": "Desert scorpion",
    "mechanism": "Its surface geometry has inspired research into sand erosion resistance.",
    "caution": "Results depend on material, particle trajectories and conditions; a texture is not universally erosion-resistant.",
    "explanation": "A hypothetical future scenario involves increased abrasive particle exposure. Study wear on a non-critical coupon, distinguishing erosion from dust accumulation.",
    "answer": {
      "problem": "Compare deterioration of specimens with the same function and specialist-defined exposure.",
      "organism": "Its surface geometry has inspired research into sand erosion resistance.",
      "principle": "Investigate how surface geometry influences particle contact and material loss, without assuming a universal erosion benefit.",
      "solution": "Explore textures on coupons and compare wear against a smooth reference.",
      "benefit": "Measure mass loss and surface properties; assess cleaning, inspection and fabrication.",
      "implementation": "Materials and Quality: define representative exposure, tests and criteria; record adverse effects."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "c14": {
    "recommendedModel": "Pine cone",
    "mechanism": "Scale layers change dimensions differently with moisture, producing movement.",
    "caution": "Humidity is not the same as rain or condensation; response may be slow, irreversible or temperature-dependent.",
    "explanation": "Test equipment experiences hypothetical changing humidity and drying cycles. Explore an experimental passive exposure indicator without replacing certified sensors.",
    "answer": {
      "problem": "Compare humidity-cycle detection against an instrumented reference.",
      "organism": "Scale layers change dimensions differently with moisture, producing movement.",
      "principle": "Differential hygroscopic response",
      "solution": "Explore a dimensional-change indicator in the laboratory, not as a safety system.",
      "benefit": "Measure response, repeatability, hysteresis and false indications under equivalent cycles.",
      "implementation": "Materials and Instrumentation: compare with a reference sensor and record temperature and ageing."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "c15": {
    "recommendedModel": "Penguin feathers",
    "mechanism": "Feather microstructure contributes to insulation of the coat.",
    "caution": "Insulation may lose effectiveness when wet and cannot alone solve icing, fuel or energy security.",
    "explanation": "Non-critical auxiliary equipment faces a hypothetical cold scenario with moisture and thaw cycles. Arctic planning must account for variability, not assume the climate is becoming colder.",
    "answer": {
      "problem": "Compare heat losses from experimental equipment under equivalent cold conditions.",
      "organism": "Feather microstructure contributes to insulation of the coat.",
      "principle": "Structural insulation and trapped air",
      "solution": "Study an insulating layer on coupons with equivalent space and reference function.",
      "benefit": "Measure heat flux and wet-condition behaviour; consider mass, maintenance and safety.",
      "implementation": "Thermal Engineering and Facilities: define cold-moisture cycles and compare dry and wet specimens."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "r1": {
    "recommendedModel": "Physarum polycephalum",
    "mechanism": "This slime mould reorganises transport networks between food sources; its efficiency and fault tolerance have been studied.",
    "caution": "A biological network does not establish supplier independence, quality, capacity or lead times.",
    "explanation": "A fictional supply network loses a supplier. Compare alternative routes and check that they do not share the same critical dependency.",
    "answer": {
      "problem": "Compare a fictional concentrated network with independent alternatives for the same supply need.",
      "organism": "This slime mould reorganises transport networks between food sources; its efficiency and fault tolerance have been studied.",
      "principle": "Adaptive networks and redundancy",
      "solution": "Draw a generic network and compare connectivity after removing a node or shared dependency.",
      "benefit": "Measure nodes with no alternative route, estimated recovery time and redundancy cost without claiming real benefits.",
      "implementation": "Procurement, Quality and Logistics: verify common dependencies, qualification and capacity in a tabletop exercise."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "r2": {
    "recommendedModel": "Plant wound sealing",
    "mechanism": "Some plants seal wounds through exudates or mechanical responses; later repair can be a distinct process.",
    "caution": "Sealing a crack does not demonstrate restored strength or airworthiness; it may conceal damage.",
    "explanation": "An experimental non-critical protective layer experiences repeated superficial damage. Explore sealing and recovery without assuming restored structural strength.",
    "answer": {
      "problem": "Compare an experimental coating with its reference after defined superficial damage.",
      "organism": "Some plants seal wounds through exudates or mechanical responses; later repair can be a distinct process.",
      "principle": "Self-sealing and functional repair",
      "solution": "Explore a coupon self-sealing concept and check whether barrier function is restored.",
      "benefit": "Measure barrier recovery, repeatability, inspection and cost; do not infer life extension.",
      "implementation": "Materials, Maintenance and Quality: test residual damage and rejection criteria."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "r3": {
    "recommendedModel": "School of fish",
    "mechanism": "Individuals can respond to neighbours and generate collective coordination without one central controller.",
    "caution": "The analogy does not justify removing authority, safety or change control; it does not predict availability.",
    "explanation": "A fictional logistics flow loses access to a resource. Explore distributed coordination while maintaining accountability and decision traceability.",
    "answer": {
      "problem": "Compare a fictional flow dependent on a single information point with one retaining alternatives.",
      "organism": "Individuals can respond to neighbours and generate collective coordination without one central controller.",
      "principle": "Local coordination and collective response",
      "solution": "Plan a coordination exercise with clear rules, escalation and decision records.",
      "benefit": "Measure blocked tasks, time to decision, errors and coordination workload.",
      "implementation": "Operations and Logistics: run a tabletop exercise with equivalent interruptions and review accountability."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  },
  "r4": {
    "recommendedModel": "Gecko",
    "mechanism": "Toe microstructures allow reversible adhesion through surface interactions.",
    "caution": "Biological adhesion does not establish load capability, durability, safety or compatibility of an aircraft joint.",
    "explanation": "A non-critical experimental assembly contains a part that needs periodic replacement. Explore a reversible joint to avoid replacing the whole assembly.",
    "answer": {
      "problem": "Compare a test assembly with limited access against a removable alternative of equivalent function.",
      "organism": "Toe microstructures allow reversible adhesion through surface interactions.",
      "principle": "Explore reversible adhesion to separate attachment from assembly replacement and test repeatability over comparable cycles.",
      "solution": "Investigate a reversible attachment concept on a bench while retaining interfaces and inspection requirements.",
      "benefit": "Measure disassembly time, damage and repeatability; examine mass and maintenance.",
      "implementation": "Engineering and Maintenance: verify mechanical criteria, use cycles and rejection conditions in the laboratory."
    },
    "check": [
      "Does it define the hazard or disruption, exposure, vulnerability and consequence?",
      "Does it explain the biological mechanism and its limitations?",
      "Does it define a comparison with equivalent function and conditions?",
      "Does it identify metrics, trade-offs and possible adverse outcomes?",
      "Does it propose tests, owners and criteria to accept or reject the hypothesis?"
    ]
  }
};
export const expansionSources: Record<string,string> = {
  "c12": "https://pubmed.ncbi.nlm.nih.gov/26089358/",
  "c13": "https://pubmed.ncbi.nlm.nih.gov/22208552/",
  "c14": "https://pubmed.ncbi.nlm.nih.gov/19570796/",
  "c15": "https://pubmed.ncbi.nlm.nih.gov/31005607/",
  "r1": "https://pubmed.ncbi.nlm.nih.gov/20093467/",
  "r2": "https://pubmed.ncbi.nlm.nih.gov/31105211/",
  "r3": "https://pubmed.ncbi.nlm.nih.gov/22065759/",
  "r4": "https://doi.org/10.1038/35015073"
};
export const EXTRA_MODELS: Organism[] = [
  {
    "id": "o11",
    "name": "Saharan silver ant",
    "strategy": "Specialised hairs reflect part of incident sunlight and enhance infrared thermal emission.",
    "principle": "Solar reflection and thermal emission",
    "fact": "Response depends on spectrum, orientation, surroundings and ageing; cooling is not guaranteed.",
    "image": "o11.svg"
  },
  {
    "id": "o12",
    "name": "Desert scorpion",
    "strategy": "Its surface geometry has inspired research into sand erosion resistance.",
    "principle": "Particle-impact management",
    "fact": "Results depend on material, particle trajectories and conditions; a texture is not universally erosion-resistant.",
    "image": "o12.svg"
  },
  {
    "id": "o13",
    "name": "Pine cone",
    "strategy": "Scale layers change dimensions differently with moisture, producing movement.",
    "principle": "Differential hygroscopic response",
    "fact": "Humidity is not the same as rain or condensation; response may be slow, irreversible or temperature-dependent.",
    "image": "o13.svg"
  },
  {
    "id": "o14",
    "name": "Penguin feathers",
    "strategy": "Feather microstructure contributes to insulation of the coat.",
    "principle": "Structural insulation and trapped air",
    "fact": "Insulation may lose effectiveness when wet and cannot alone solve icing, fuel or energy security.",
    "image": "o14.svg"
  },
  {
    "id": "o15",
    "name": "Physarum polycephalum",
    "strategy": "This slime mould reorganises transport networks between food sources; its efficiency and fault tolerance have been studied.",
    "principle": "Adaptive networks and redundancy",
    "fact": "A biological network does not establish supplier independence, quality, capacity or lead times.",
    "image": "o15.svg"
  },
  {
    "id": "o16",
    "name": "Plant wound sealing",
    "strategy": "Some plants seal wounds through exudates or mechanical responses; later repair can be a distinct process.",
    "principle": "Self-sealing and functional repair",
    "fact": "Sealing a crack does not demonstrate restored strength or airworthiness; it may conceal damage.",
    "image": "o16.svg"
  }
].map(o=>({...o,image:import.meta.env.BASE_URL+"images/nature/"+o.image}));
export const challengeTrack = (id?: string) => id && STRATEGIC_CHALLENGES.some(c=>c.id===id) ? "resilience" : id && /^(c9|c10|c11|c12|c13|c14|c15)$/.test(id) ? "climate" : "general";
export type Track = "general" | "climate" | "resilience";
