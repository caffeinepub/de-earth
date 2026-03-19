import { Compass, Leaf, Sun, Users } from "lucide-react";
import { useAllTeamMembers } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const philosophyPillars = [
  {
    icon: Leaf,
    title: "Nature-Inclusive Architecture",
    description:
      "Our design philosophy begins with nature. We create spaces that are deeply connected to the land, the climate, and the living environment — reducing ecological impact while enhancing human experience.",
  },
  {
    icon: Compass,
    title: "Contextually Responsive Design",
    description:
      "Every building is shaped by its immediate context — its topography, vegetation, vernacular traditions, and social patterns. We resist imported styles; our buildings look like the places they come from.",
  },
  {
    icon: Sun,
    title: "Climate Responsiveness",
    description:
      "Kerala's humid climate demands architecture that breathes. We integrate passive cooling, cross-ventilation, natural light, and shaded walkways as structural commitments, not aesthetic choices.",
  },
  {
    icon: Users,
    title: "Cultural & Social Sensitivity",
    description:
      "We design environments that are sensible to client needs, sensitive to nature, and rooted in cultural context — creating a harmonious relationship between built environments and their surroundings.",
  },
];

export default function Office() {
  const { data: team = [] } = useAllTeamMembers();
  const headingRef = useScrollAnimation<HTMLDivElement>();
  const philosophyRef = useScrollAnimation<HTMLDivElement>();
  const teamRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">
            Office
          </h1>
          <div className="border-b border-border mb-10" />
          <div className="max-w-2xl">
            <p className="font-serif text-2xl text-foreground leading-relaxed mb-6">
              de Earth was founded with the belief that architecture should grow
              from its context.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
              Established in 2004 by a group of young graduates from the
              National Institute of Technology Calicut under the name "de
              incorporated," the firm was later rebranded as "de Earth" in 2009
              to reflect its philosophy centred around nature-based design.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              The practice operates as the consultancy wing of de3.2 Architects
              Pvt. Ltd. and has grown into a multidisciplinary team of
              architects, urban designers, engineers, and social thinkers —
              creating spaces that are both environmentally responsible and
              emotionally meaningful.
            </p>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="font-serif text-3xl text-foreground mb-6">
            Achievements
          </h2>
          <div className="border border-border p-8 max-w-2xl">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="font-sans text-xs tracking-widest uppercase text-primary mt-1">
                  2015
                </span>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Recognized among Top 50 Emerging Design Practices in India
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-sans text-xs tracking-widest uppercase text-primary mt-1">
                  ——
                </span>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Projects published in national and international design
                  platforms
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-sans text-xs tracking-widest uppercase text-primary mt-1">
                  ——
                </span>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  Award-winning work across residential and hospitality
                  categories
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section ref={philosophyRef} className="mb-24">
          <h2 className="font-serif text-3xl text-foreground mb-10">
            Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {philosophyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="border border-border p-8"
                  data-ocid="office.philosophy.card"
                >
                  <Icon size={24} className="text-primary mb-5" />
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-3xl text-foreground mb-10">
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Architecture",
                items: [
                  "Residential design",
                  "Commercial buildings",
                  "Institutional projects",
                ],
              },
              {
                title: "Urban Design",
                items: [
                  "Master planning",
                  "Layout design",
                  "Public space development",
                ],
              },
              {
                title: "Project Development",
                items: [
                  "Concept development",
                  "Feasibility studies",
                  "Costing and evaluation",
                ],
              },
              {
                title: "Engineering",
                items: ["MEP services", "Construction management"],
              },
            ].map((service) => (
              <div key={service.title} className="border border-border p-6">
                <h3 className="font-serif text-lg text-foreground mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section ref={teamRef} className="mb-24">
          <h2 className="font-serif text-3xl text-foreground mb-4">Team</h2>
          <p className="font-sans text-sm text-muted-foreground mb-10">
            The firm is led by Ar. Vivek P.P and Ar. Nishan M, supported by a
            multidisciplinary team of architects, engineers, and consultants.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={member.id} data-ocid={`office.team.item.${i + 1}`}>
                <div className="w-full aspect-square bg-muted mb-5 overflow-hidden">
                  {member.imageId ? (
                    <img
                      src={member.imageId}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif text-4xl text-muted-foreground">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="font-sans text-xs tracking-widest uppercase text-primary mb-1">
                  {member.role}
                </p>
                <h3 className="font-serif text-xl text-foreground mb-3">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border pt-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-foreground mb-6">
              Design Approach
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
              Our work is driven by climate-responsive architecture, use of
              local and natural materials, and the integration of indoor and
              outdoor spaces. We place strong emphasis on light, ventilation,
              and landscape.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              We aim to create dynamic, soulful spaces that evolve with time and
              human interaction — a harmonious relationship between built
              environments and their surroundings, aiming for a greener and
              better future.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
