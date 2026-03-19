import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Maximize } from "lucide-react";
import { ProjectCategory } from "../backend.d";
import { projectImages } from "../data/sampleData";
import { useProject } from "../hooks/useQueries";

const categoryLabels: Record<ProjectCategory, string> = {
  [ProjectCategory.residential]: "Residential",
  [ProjectCategory.commercial]: "Commercial",
  [ProjectCategory.institutional]: "Institutional",
  [ProjectCategory.landscape]: "Landscape",
};

export default function WorkDetail() {
  const { id } = useParams({ strict: false }) as { id: string };
  const { data: project, isLoading } = useProject(id ?? "");

  if (isLoading) {
    return (
      <div
        className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12"
        data-ocid="work_detail.loading_state"
      >
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-[50vh] w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="pt-40 pb-24 max-w-7xl mx-auto px-6 md:px-12 text-center"
        data-ocid="work_detail.error_state"
      >
        <p className="font-serif text-3xl text-muted-foreground">
          Project not found.
        </p>
        <Link
          to="/works"
          className="font-sans text-sm tracking-widest uppercase text-primary mt-6 inline-block"
        >
          Back to Works
        </Link>
      </div>
    );
  }

  const imgSrc =
    project.imageIds.length > 0
      ? project.imageIds[0]
      : (projectImages[project.id] ??
        "/assets/generated/project-residence-1.dim_800x600.jpg");

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full aspect-[21/9] overflow-hidden bg-muted">
        <img
          src={imgSrc}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <Link
          to="/works"
          className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-10"
          data-ocid="work_detail.back.link"
        >
          <ArrowLeft size={14} /> Back to Works
        </Link>

        <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">
          {categoryLabels[project.category]}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
          {project.title}
        </h1>

        <div className="flex flex-wrap gap-8 border-y border-border py-6 mb-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} />
            <span className="font-sans text-sm">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={14} />
            <span className="font-sans text-sm">{project.year.toString()}</span>
          </div>
          {project.area && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Maximize size={14} />
              <span className="font-sans text-sm">{project.area}</span>
            </div>
          )}
        </div>

        <section className="mb-16">
          <h2 className="font-serif text-2xl text-foreground mb-5">Concept</h2>
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            {project.conceptDescription}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-border pt-12">
          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">
              Materials
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              {project.materials}
            </p>
          </section>
          <section>
            <h2 className="font-serif text-xl text-foreground mb-4">
              Sustainability
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              {project.sustainabilityHighlights}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
