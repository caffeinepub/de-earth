import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { ProjectCategory } from "../backend.d";
import ProjectCard from "../components/ProjectCard";
import { useDebounce } from "../hooks/useDebounce";
import { useAllProjects, useSearchProjects } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const filters = [
  { label: "All", value: "" },
  { label: "Residential", value: ProjectCategory.residential },
  { label: "Commercial", value: ProjectCategory.commercial },
  { label: "Institutional", value: ProjectCategory.institutional },
  { label: "Landscape", value: ProjectCategory.landscape },
];

export default function Works() {
  const [activeFilter, setActiveFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data: allProjects = [] } = useAllProjects();
  const { data: searchResults } = useSearchProjects(debouncedSearch);

  const projects = useMemo(() => {
    const base =
      debouncedSearch.length > 0 && searchResults ? searchResults : allProjects;
    const nonArchive = base.filter((p) => !p.isArchive);
    if (!activeFilter) return nonArchive;
    return nonArchive.filter((p) => p.category === activeFilter);
  }, [allProjects, searchResults, debouncedSearch, activeFilter]);

  const headingRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={headingRef} className="mb-12">
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Works
          </h1>
          <div className="border-b border-border mb-10" />

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <fieldset
              className="flex flex-wrap gap-2 border-0 p-0 m-0"
              aria-label="Filter by category"
            >
              <legend className="sr-only">Filter projects by category</legend>
              {filters.map((f) => (
                <button
                  type="button"
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  data-ocid="works.filter.tab"
                  className={`font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                    activeFilter === f.value
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </fieldset>
            <div className="w-full md:w-64">
              <Input
                placeholder="Search projects…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-ocid="works.search_input"
                className="bg-card border-border font-sans text-sm"
              />
            </div>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-24" data-ocid="works.empty_state">
            <p className="font-serif text-2xl text-muted-foreground">
              No projects found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
