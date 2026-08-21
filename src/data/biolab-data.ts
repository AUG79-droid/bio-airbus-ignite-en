export interface Challenge {
  id: string;
  title: string;
  description: string;
  area: string;
  icon: string;
}

export interface Organism {
  id: string;
  name: string;
  strategy: string;
  principle: string;
  image: string;
  fact: string;
}

export interface CanvasData {
  problem: string;
  organism: string;
  principle: string;
  solution: string;
  benefit: string;
  implementation: string;
}

export interface TeamData {
  id: string;
  name: string;
  color: string;
  challenge?: Challenge;
  organism?: Organism;
  canvas: CanvasData;
  pitchTitle: string;
  pitchSummary: string;
  votes: number;
}

const natureImage = (fileName: string) =>
  `${import.meta.env.BASE_URL}images/nature/${fileName}`;

export const CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "Reduce structural weight",
    description: "Reduce the weight of fuselage structural components without compromising strength or safety.",
    area: "Structural Engineering",
    icon: "⚖️",
  },
  {
    id: "c2",
    title: "Improve aerodynamics",
    description: "Optimise aerodynamic surfaces to reduce drag and fuel consumption.",
    area: "Aerodynamics",
    icon: "🌊",
  },
  {
    id: "c3",
    title: "Improve energy efficiency in the plant",
    description: "Reduce the energy consumption of assembly lines and manufacturing processes.",
    area: "Industrial Operations",
    icon: "⚡",
  },
  {
    id: "c4",
    title: "Reduce cabin noise",
    description: "Lower the noise perceived by passengers during flight to improve comfort.",
    area: "Cabin Comfort",
    icon: "🔇",
  },
  {
    id: "c5",
    title: "Improve material fatigue resistance",
    description: "Extend the service life of components exposed to repeated pressurisation and vibration cycles.",
    area: "Advanced Materials",
    icon: "🔩",
  },
  {
    id: "c6",
    title: "Optimise spare-parts logistics",
    description: "Optimise the spare-parts supply chain to reduce downtime.",
    area: "Supply Chain",
    icon: "📦",
  },
  {
    id: "c7",
    title: "Speed up fuselage inspection",
    description: "Accelerate and improve non-destructive fuselage inspection processes.",
    area: "Maintenance",
    icon: "🔍",
  },
  {
    id: "c8",
    title: "Improve cabin ventilation",
    description: "Improve cabin airflow for better air quality and thermal efficiency.",
    area: "Cabin Systems",
    icon: "💨",
  },
];

export const ORGANISMS: Organism[] = [
  {
    id: "o1",
    name: "Kingfisher",
    strategy: "The shape of its beak enters the water with minimal disturbance, reducing resistance and turbulence.",
    principle: "Shape optimisation",
    image: natureImage("kingfisher.jpg"),
    fact: "Use it when your challenge involves reducing friction, drag, noise or energy losses while moving through a fluid.",
  },
  {
    id: "o2",
    name: "Termite mound",
    strategy: "Its structure regulates temperature and ventilation passively, without relying on continuous air conditioning.",
    principle: "Passive thermoregulation",
    image: natureImage("termite-mound.jpg"),
    fact: "It is particularly relevant to challenges involving ventilation, temperature, energy use, thermal comfort or passive design.",
  },
  {
    id: "o3",
    name: "Bird bones",
    strategy: "They combine cavities and internal reinforcements to achieve an excellent strength-to-weight ratio.",
    principle: "Hierarchical structure",
    image: natureImage("bird-bone.jpg"),
    fact: "It is useful when you need to lighten structures, parts or supports without compromising robustness or safety.",
  },
  {
    id: "o4",
    name: "Shark skin",
    strategy: "Its surface microtexture reduces friction and makes it harder for particles or organisms to adhere.",
    principle: "Friction reduction",
    image: natureImage("shark.jpg"),
    fact: "It can inspire surfaces with less friction, less dirt and less unwanted build-up.",
  },
  {
    id: "o5",
    name: "Spider web",
    strategy: "Its network distributes loads and absorbs impacts by combining strength, elasticity and minimal material.",
    principle: "Strength and flexibility",
    image: natureImage("spider-web.jpg"),
    fact: "Consider it when your challenge requires energy absorption, load distribution or greater flexibility without sacrificing strength.",
  },
  {
    id: "o6",
    name: "Gecko",
    strategy: "It adheres to surfaces reversibly and precisely without leaving permanent residue.",
    principle: "Residue-free adhesion",
    image: natureImage("gecko.jpg"),
    fact: "It is a strong model for temporary attachment, controlled grip, clean maintenance or reversible joining.",
  },
  {
    id: "o7",
    name: "Lotus leaf",
    strategy: "Its surface repels water and dirt through microstructures that create a self-cleaning effect.",
    principle: "Self-cleaning",
    image: natureImage("lotus-leaf.jpg"),
    fact: "Apply it when the problem involves cleaning, repellence, surface maintenance or reducing adhesion.",
  },
  {
    id: "o8",
    name: "School of fish",
    strategy: "Thousands of individuals coordinate without a central leader, reacting quickly and optimising collective movement.",
    principle: "Distributed intelligence",
    image: natureImage("fish-school.jpg"),
    fact: "It can inspire logistics coordination, flow management, distributed systems or decentralised decision-making.",
  },
  {
    id: "o9",
    name: "Nacre",
    strategy: "Its alternating hard and soft layers slow crack propagation and improve toughness.",
    principle: "Fracture resistance",
    image: natureImage("nacre.jpg"),
    fact: "It is useful when you need crack resistance, durability, damage absorption or multilayer materials.",
  },
  {
    id: "o10",
    name: "Bat",
    strategy: "It detects obstacles and navigates accurately using echolocation, even in complex, low-visibility environments.",
    principle: "Non-invasive detection",
    image: natureImage("bat.jpg"),
    fact: "Use it for inspection, early detection, navigation, monitoring or non-invasive maintenance challenges.",
  },
];

export const TEAM_COLORS = [
  { name: "Emerald", value: "hsl(160, 70%, 22%)" },
  { name: "Amber", value: "hsl(38, 92%, 50%)" },
  { name: "Ocean", value: "hsl(210, 70%, 40%)" },
  { name: "Coral", value: "hsl(10, 75%, 55%)" },
  { name: "Violet", value: "hsl(270, 60%, 45%)" },
  { name: "Forest", value: "hsl(140, 50%, 35%)" },
];

export const STEPS = [
  { number: 1, title: "Form teams", description: "Create or join a team of 3–5 people" },
  { number: 2, title: "Discover the challenge", description: "Spin the wheel to receive a real Airbus challenge" },
  { number: 3, title: "Explore nature", description: "Discover organisms and natural strategies" },
  { number: 4, title: "Connect the ideas", description: "Link the challenge, organism and biomimetic principle" },
  { number: 5, title: "Design the solution", description: "Complete your team's biomimicry canvas" },
  { number: 6, title: "Pitch and vote", description: "Present your idea and vote for the strongest proposals" },
];

export function createEmptyCanvas(): CanvasData {
  return {
    problem: "",
    organism: "",
    principle: "",
    solution: "",
    benefit: "",
    implementation: "",
  };
}

export function createTeam(name: string, colorIndex: number): TeamData {
  return {
    id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    color: TEAM_COLORS[colorIndex % TEAM_COLORS.length].value,
    canvas: createEmptyCanvas(),
    pitchTitle: "",
    pitchSummary: "",
    votes: 0,
  };
}
