import ProjectCard from "../components/ProjectCard";
import { useAllProjects } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const publications = [
  {
    title: "The Climate-Responsive House",
    source: "Architecture+Design India",
    year: "2023",
  },
  {
    title: "Vernacular Revisited: de earth's Thrissur Library",
    source: "Domus",
    year: "2022",
  },
  {
    title: "Living with Laterite",
    source: "Architectural Review",
    year: "2022",
  },
  {
    title: "Five Emerging Studios from Kerala",
    source: "The Hindu",
    year: "2021",
  },
];

export default function Archives() {
  const { data: allProjects = [] } = useAllProjects();
  const archived = allProjects.filter((p) => p.isArchive);
  const headingRef = useScrollAnimation<HTMLDivElement>();
  const pressRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Archives
          </h1>
          <div className="border-b border-border mb-8" />
          <p className="font-sans text-base text-muted-foreground max-w-xl">
            Conceptual studies, unbuilt work, and research projects that
            continue to inform the studio's thinking.
          </p>
        </div>

        {archived.length === 0 ? (
          <div className="text-center py-24" data-ocid="archives.empty_state">
            <p className="font-serif text-2xl text-muted-foreground">
              No archived projects yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {archived.map((project, i) => (
              <div key={project.id} className="relative">
                <span className="absolute top-3 right-3 z-10 bg-background border border-border font-sans text-xs tracking-widest uppercase px-2 py-1">
                  Archive
                </span>
                <ProjectCard project={project} index={i + 1} />
              </div>
            ))}
          </div>
        )}

        <section ref={pressRef} className="border-t border-border pt-16">
          <h2 className="font-serif text-3xl text-foreground mb-10">
            Publications & Press
          </h2>
          <div className="divide-y divide-border">
            {publications.map((pub) => (
              <div
                key={pub.title}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                data-ocid="archives.press.item.1"
              >
                <div>
                  <p className="font-serif text-lg text-foreground">
                    {pub.title}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {pub.source}
                  </p>
                </div>
                <span className="font-sans text-sm text-muted-foreground">
                  {pub.year}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
