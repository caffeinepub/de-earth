import { type Project, ProjectCategory, type TeamMember } from "../backend.d";

export const sampleProjects: Project[] = [
  {
    id: "p1",
    title: "Malabar Hillside Residence",
    order: 1n,
    area: "3,800 sq ft",
    year: 2023n,
    conceptDescription:
      "A family home carved into the laterite hillside of North Kerala. The design honours the topography, with split levels that allow each room to open to a different slice of landscape. Rainwater harvesting and passive cooling through cross-ventilation reduce the home's dependence on mechanical systems.",
    imageIds: [],
    isFeatured: true,
    isArchive: false,
    materials:
      "Laterite stone, reclaimed teak, polished concrete, hand-plastered walls",
    category: ProjectCategory.residential,
    sustainabilityHighlights:
      "Rainwater harvesting, passive cooling, locally sourced laterite, solar water heating, grey-water recycling for garden irrigation.",
    location: "Kannur, Kerala",
  },
  {
    id: "p2",
    title: "Kumarakom Waterside Retreat",
    order: 2n,
    area: "12,000 sq ft",
    year: 2022n,
    conceptDescription:
      "An eco-resort at the edge of Vembanad Lake, where architecture dissolves into the backwaters. Floating decks, reed-thatched pavilions and open corridors frame views of the lake at every turn. The resort operates on near-zero imported energy.",
    imageIds: [],
    isFeatured: true,
    isArchive: false,
    materials:
      "Bamboo, reed thatch, reclaimed wood, natural fibre ropes, stone base",
    category: ProjectCategory.commercial,
    sustainabilityHighlights:
      "Solar micro-grid, composting toilets, biogas from kitchen waste, on-site water treatment, native landscaping.",
    location: "Kumarakom, Kerala",
  },
  {
    id: "p3",
    title: "Thrissur Community Library",
    order: 3n,
    area: "6,200 sq ft",
    year: 2022n,
    conceptDescription:
      "A library for a small town that doubles as a cultural commons. The plan is organized around a shaded courtyard, a traditional 'nalukettu' arrangement reinterpreted for a civic programme. Shelves are arranged radially, pulling readers toward natural light.",
    imageIds: [],
    isFeatured: true,
    isArchive: false,
    materials:
      "Exposed brick, timber lattice screens, Mangalore tiles, blue Kadapa stone flooring",
    category: ProjectCategory.institutional,
    sustainabilityHighlights:
      "Daylighting strategy eliminates artificial light during daytime, courtyard provides natural ventilation, rainwater pond for groundwater recharge.",
    location: "Thrissur, Kerala",
  },
  {
    id: "p4",
    title: "Spice Garden Landscape, Wayanad",
    order: 4n,
    area: "4.5 acres",
    year: 2023n,
    conceptDescription:
      "A working spice plantation transformed into a therapeutic landscape. Footpaths meander through pepper vines, cardamom groves and coffee plants. Seating alcoves are carved from existing stone outcrops. The design makes no distinction between garden and forest.",
    imageIds: [],
    isFeatured: false,
    isArchive: false,
    materials:
      "Local granite, coir rope, reclaimed railway sleepers, live bamboo fencing",
    category: ProjectCategory.landscape,
    sustainabilityHighlights:
      "Zero-chemical maintenance plan, native species only, composting trails, wildlife corridors preserved.",
    location: "Kalpetta, Wayanad",
  },
  {
    id: "p5",
    title: "Kochi Office Courtyard",
    order: 5n,
    area: "8,500 sq ft",
    year: 2021n,
    conceptDescription:
      "A creative office in Fort Kochi that layers old warehouse bones with a new lightweight steel structure. The original brick walls are retained and celebrated. A central courtyard anchors circulation and provides a pause from the open-plan floors above.",
    imageIds: [],
    isFeatured: false,
    isArchive: false,
    materials:
      "Exposed brick, structural steel, glass, polished cement, antique Athangudi tiles",
    category: ProjectCategory.commercial,
    sustainabilityHighlights:
      "Adaptive reuse of existing structure, natural ventilation through courtyard stack effect, rooftop solar, LED throughout.",
    location: "Fort Kochi, Kerala",
  },
  {
    id: "p6",
    title: "Backwater House — Study",
    order: 6n,
    area: "2,100 sq ft",
    year: 2019n,
    conceptDescription:
      "An unbuilt conceptual study for a house that sits on stilts above a paddy field. The programme is compressed into a single linear bar, lifted to preserve the agricultural land beneath and frame the horizon of Kerala's midlands.",
    imageIds: [],
    isFeatured: false,
    isArchive: true,
    materials: "Conceptual — steel, glass, bamboo",
    category: ProjectCategory.residential,
    sustainabilityHighlights:
      "Minimal footprint on agricultural land, elevated to allow flood water passage.",
    location: "Kuttanad, Kerala",
  },
];

export const sampleTeamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Arjun Nair",
    role: "Principal Architect",
    bio: "Arjun founded de earth after a decade working in Mumbai and Amsterdam. His work draws on Kerala's vernacular traditions while engaging rigorously with contemporary material and climate concerns. He holds a Master's in Sustainable Architecture from TU Delft.",
    order: 1n,
    imageId: "",
  },
  {
    id: "t2",
    name: "Priya Menon",
    role: "Design Architect",
    bio: "Priya leads the design of residential and hospitality projects. Her sensitivity to interior experience and material detail has shaped some of the studio's most celebrated interiors. She studied at the School of Planning and Architecture, New Delhi.",
    order: 2n,
    imageId: "",
  },
  {
    id: "t3",
    name: "Rohan Varma",
    role: "Landscape & Sustainability",
    bio: "Rohan is responsible for the integration of landscape and passive-design strategies across all projects. He is a certified GRIHA evaluator and brings a deep knowledge of native Kerala plant species and water management systems.",
    order: 3n,
    imageId: "",
  },
];

export const projectImages: Record<string, string> = {
  p1: "/assets/generated/project-residence-1.dim_800x600.jpg",
  p2: "/assets/generated/project-resort-1.dim_800x600.jpg",
  p3: "/assets/generated/project-commercial-1.dim_800x600.jpg",
  p4: "/assets/generated/project-landscape-1.dim_800x600.jpg",
  p5: "/assets/generated/project-commercial-1.dim_800x600.jpg",
  p6: "/assets/generated/project-interior-1.dim_800x600.jpg",
};
