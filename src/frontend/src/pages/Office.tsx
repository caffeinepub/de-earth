import { Compass, Leaf, Sun } from "lucide-react";
import { useAllTeamMembers } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const philosophyPillars = [
  {
    icon: Leaf,
    title: "Sustainable Design",
    description:
      "Every project begins with an energy audit of its site. We use passive cooling, rainwater harvesting, and locally sourced materials to reduce the ecological footprint of each building.",
  },
  {
    icon: Compass,
    title: "Context-Driven Architecture",
    description:
      "We resist the import of styles. Our buildings are shaped by their immediate landscape — its topography, vegetation, vernacular traditions, and social patterns.",
  },
  {
    icon: Sun,
    title: "Climate Responsiveness",
    description:
      "Kerala's high humidity and heavy monsoon demand architecture that breathes. Overhanging eaves, cross-ventilation, and shaded walkways are structural commitments, not aesthetic choices.",
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
              de earth was founded with the belief that architecture should grow
              from its context.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Our work is shaped by the land, the climate, and the people of
              Kerala. We are a small studio — by choice. Close collaboration
              with each client allows us to understand a project's
              particularities deeply before the first line is drawn. We do not
              have a signature style; our buildings look like the places they
              come from.
            </p>
          </div>
        </div>

        <section ref={philosophyRef} className="mb-24">
          <h2 className="font-serif text-3xl text-foreground mb-10">
            Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <section ref={teamRef} className="mb-24">
          <h2 className="font-serif text-3xl text-foreground mb-10">Team</h2>
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
              Studio Culture
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-4">
              We work from a small studio in Thrissur, Kerala. Our practice is
              deliberately unhurried. Each project receives sustained attention
              through every phase, from concept to construction.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              We welcome visits to our studio and to sites under construction.
              If you are an architecture student or recent graduate interested
              in working with us, we accept a small number of interns each year.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
