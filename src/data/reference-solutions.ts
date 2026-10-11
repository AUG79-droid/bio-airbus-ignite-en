import type { CanvasData } from "./biolab-data";
/** Learning references, not Airbus-approved engineering solutions or proven performance claims. */
export type ReferenceSolution = {
  recommendedModel: string; mechanism: string; caution: string; explanation: string;
  answer: CanvasData; check: string[];
};
export const referenceSolutions: Record<string, ReferenceSolution> = {
 c1:{
  recommendedModel:"Bird bones",
  mechanism:"Internal cavities and reinforcement can distribute loads while reducing the material volume.",
  caution:"A biological structure is not automatically an airworthy component. Stiffness, fatigue, manufacturability and inspection requirements must be verified.",
  explanation:"The analogy is relevant because both the engineering challenge and natural structure concern the balance between mass and strength.",
  answer:{
   problem:"Reduce the mass of a defined secondary fuselage bracket while preserving the necessary stiffness, load capacity and inspectability.",
   organism:"Bird bones use cavities, strong walls and internal struts to distribute forces while limiting the amount of material.",
   principle:"Place material along load paths, removing it from lower-stress regions without compromising buckling resistance or strength.",
   solution:"Investigate a bracket with optimised internal ribs, preserving external interfaces and assessing applicable structural loads, fabrication, inspection and approval constraints.",
   benefit:"Hypothesis: lower bracket mass at equivalent strength and stiffness, with cost and manufacturing trade-offs assessed against the baseline.",
   implementation:"Analyse baseline and alternative geometries using finite-element modelling, then test fabricated coupons or prototypes under representative structural and fatigue loads."
  },
  check:["Is the component and its loading specified?","Does the load-path mechanism explain the mass reduction?","Are fatigue and fabrication constraints addressed?","Is there a measurable structural and mass comparison?"]
 },
 c2:{
  recommendedModel:"Kingfisher",
  mechanism:"Geometry controls the way fluid flows around a profile and can influence pressure distribution and resistance.",
  caution:"A beak moving through water does not prove the same effect on a component exposed to airflow; operating conditions and scales differ.",
  explanation:"This is a geometric inspiration for an aerodynamic hypothesis, not a direct copy of the animal's shape.",
  answer:{
   problem:"Assess the aerodynamic drag of a specific secondary external aircraft element at a defined flight condition while preserving safety and maintenance access.",
   organism:"The kingfisher beak provides inspiration for shapes that manage how fluid moves around a surface.",
   principle:"Alter the profile geometry to influence pressure distribution and possible flow separation in relevant operating conditions.",
   solution:"Study alternative profiles for a non-critical fairing or external element while preserving its interfaces and checking integration requirements.",
   benefit:"Hypothesis: lower drag than the baseline element. Do not claim fuel savings before mission-level calculations and verified data.",
   implementation:"Run comparable computational fluid dynamics simulations and, where appropriate, wind-tunnel tests at the same representative conditions."
  },
  check:["Is the component and flight regime defined?","Is the mechanism about flow rather than appearance?","Are differences between air and water acknowledged?","Is drag compared using equivalent test conditions?"]
 },
 c3:{
  recommendedModel:"Termite mound",
  mechanism:"Airflow routes and thermal gradients can be influenced by the geometry of ventilation passages.",
  caution:"A factory cannot simply imitate a termite mound. Worker safety, air quality, extraction and fire protection remain mandatory.",
  explanation:"This natural strategy offers a plausible ventilation-management hypothesis, but measured energy savings cannot be assumed.",
  answer:{
   problem:"Reduce heating, cooling or ventilation energy use in a specified industrial zone while maintaining process conditions, safe working conditions and air quality.",
   organism:"Termite mound geometries and thermal gradients can inspire the study of airflow paths and natural thermal regulation.",
   principle:"Design airflow paths and temperature controls to avoid unnecessary energy losses while meeting ventilation requirements.",
   solution:"Evaluate non-invasive airflow, duct or control changes in one plant area, compatible with local extraction and safety requirements.",
   benefit:"Hypothesis: lower ventilation-related energy use at equivalent occupancy, process load and required air quality.",
   implementation:"Establish measured baselines for energy, airflow, temperature and air quality. Simulate alternatives and compare results in a controlled pilot."
  },
  check:["Is an actual plant area and demand identified?","Is the airflow mechanism explained?","Are safety and air-quality conditions protected?","Can energy use be compared against a controlled baseline?"]
 },
 c4:{
  recommendedModel:"Kingfisher",
  mechanism:"Profile transitions may influence flow disturbances and associated aerodynamic noise.",
  caution:"Cabin noise can be mechanical, structural or aerodynamic. This analogy is only relevant to a demonstrated airflow-related noise source.",
  explanation:"It can inspire a study of ventilation-related sound, but cannot be assumed to address every cabin noise source.",
  answer:{
   problem:"Reduce a confirmed aerodynamic noise source in a specified cabin ventilation duct or outlet while maintaining airflow.",
   organism:"The geometry of a kingfisher beak can inspire smoother profile transitions and fluid-flow management.",
   principle:"Optimise duct transitions to reduce local flow separation and disturbances that may contribute to sound.",
   solution:"Assess modified duct-section profiles while maintaining airflow, pressure limits, integration and certification constraints.",
   benefit:"Hypothesis: less noise from the test section without reducing ventilation performance. Do not infer a whole-cabin improvement.",
   implementation:"Measure noise spectra and locate the source first, then compare candidate ducts at the same airflow using pressure and acoustic tests."
  },
  check:["Is the specific noise source identified?","Does the natural mechanism relate to that source?","Are airflow and pressure constraints maintained?","Is there an equivalent acoustic comparison?"]
 },
 c5:{
  recommendedModel:"Nacre",
  mechanism:"Layered architectures and interfaces can redirect or slow crack propagation.",
  caution:"Fracture toughness is not the same as fatigue resistance. Crack growth under repeated loads must be tested explicitly.",
  explanation:"This is a relevant damage-tolerance analogy, but its performance under cyclic loading requires evidence.",
  answer:{
   problem:"Investigate fatigue crack growth in a specified component or material under representative cyclic loads.",
   organism:"Nacre uses hard layers and softer interfaces that can deflect cracks and dissipate energy.",
   principle:"Use controlled layering and interfaces to influence crack paths and energy dissipation.",
   solution:"Study test coupons with different layer layouts and interfaces, without assuming suitability for immediate use in primary structures.",
   benefit:"Hypothesis: slower crack growth or greater damage tolerance at similar mass and conditions, subject to fatigue testing.",
   implementation:"Compare baseline and proposed specimens using cyclic crack-growth tests, including material defects and manufacturing constraints."
  },
  check:["Does the proposal distinguish fatigue from toughness?","Is the layered architecture specified?","Are mass, defects and production considered?","Is cyclic crack-growth testing included?"]
 },
 c6:{
  recommendedModel:"School of fish",
  mechanism:"Distributed coordination can use local information and shared response rules.",
  caution:"This analogy does not remove aerospace traceability, compatibility checks or approved supply-chain decision authority.",
  explanation:"The natural behaviour provides a plausible analogy for coordination across spare-parts sites, not for copying animal movement.",
  answer:{
   problem:"Reduce the time needed to locate and transfer approved spares across service sites when stock information is fragmented.",
   organism:"Fish schools coordinate their movement through local signals and rules rather than individually directing every movement centrally.",
   principle:"Share real-time state information and use consistent local response and prioritisation rules, with oversight.",
   solution:"Investigate a cross-site recommendation and alert process that considers part compatibility, availability, approval and traceability.",
   benefit:"Hypothesis: shorter average response time and fewer emergency shipments without affecting availability or traceability.",
   implementation:"Run a historical-data simulation and compare response time, wrong-part risks and shipment counts with the existing workflow."
  },
  check:["Is a specific logistics issue defined?","Are distributed rules translated into a process?","Are approval, compatibility and traceability protected?","Are lead time and errors compared with a baseline?"]
 },
 c7:{
  recommendedModel:"Bat",
  mechanism:"Emitting acoustic signals and interpreting reflections is a functional analogy to existing ultrasonic inspection approaches.",
  caution:"Echolocation does not, on its own, invent a new non-destructive testing method. Qualified ultrasonic inspection methods and procedures already exist.",
  explanation:"The emission-and-echo mechanism directly relates to sensing. Shark skin primarily concerns friction and adhesion, which does not by itself explain how internal defects could be detected.",
  answer:{
   problem:"Improve the detection or characterisation of discontinuities in a defined fuselage region using non-destructive testing while maintaining detection performance.",
   organism:"Bats emit acoustic signals and process returning echoes to understand their surroundings.",
   principle:"Transmit a controlled signal, measure its response and interpret timing or amplitude changes to infer discontinuity location or properties.",
   solution:"Explore improved scan coverage or signal interpretation for an already qualified ultrasonic inspection approach without claiming that a natural analogy replaces the existing procedure.",
   benefit:"Hypothesis: improved repeatability or faster interpretation at equivalent detection capability; time savings require measured comparison.",
   implementation:"Test known-defect reference pieces using the current method and an experimental configuration, comparing detection probability, false alarms and time."
  },
  check:["Are the defect type and inspection area specified?","Does the organism provide a genuine sensing mechanism?","Is qualified inspection preserved?","Are detection, false alarms and time compared?"]
 },
 c8:{
  recommendedModel:"Termite mound",
  mechanism:"Ventilation passage geometry and thermal gradients may guide airflow distribution.",
  caution:"An aircraft environmental control system cannot simply be replaced by passive ventilation. Pressurisation, thermal comfort, safety, required airflow and certification constraints are essential.",
  explanation:"The analogy is useful for investigating duct and airflow design within a controlled aerospace ventilation system.",
  answer:{
   problem:"Investigate pressure losses and airflow distribution in a defined cabin ventilation section while preserving required airflow and comfort.",
   organism:"Termite mound structures can suggest geometries that guide air movement and manage temperature differences.",
   principle:"Optimise channel geometry and airflow paths to distribute air with lower pressure losses.",
   solution:"Design and study alternative duct or diffuser geometries inspired by airflow management, integrated into an active, controlled environmental system.",
   benefit:"Hypothesis: reduced pressure drop at the same airflow with acceptable thermal distribution; savings must be measured and validated.",
   implementation:"Compare baseline and proposed configurations by flow simulation and physical tests of airflow, pressure, temperature, noise and maintenance access."
  },
  check:["Is the modified part of the ventilation system specified?","Is the airflow mechanism explained?","Are aviation environmental-control requirements preserved?","Are pressure drop and distribution measured at equal flow?"]
 }
};
export const referenceLabels: { key: keyof CanvasData; label: string }[] = [
 {key:"problem",label:"01 · Problem"},
 {key:"organism",label:"02 · Natural model"},
 {key:"principle",label:"03 · Functional principle"},
 {key:"solution",label:"04 · Technical proposal"},
 {key:"benefit",label:"05 · Expected benefit"},
 {key:"implementation",label:"06 · First validation test"},
];
