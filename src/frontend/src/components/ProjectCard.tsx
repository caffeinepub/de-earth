import { Link } from "@tanstack/react-router";
import { type Project, ProjectCategory } from "../backend.d";
import { projectImages } from "../data/sampleData";

const categoryLabels: Record<ProjectCategory, string> = {
  [ProjectCategory.residential]: "Residential",
  [ProjectCategory.commercial]: "Commercial",
  [ProjectCategory.institutional]: "Institutional",
  [ProjectCategory.landscape]: "Landscape",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 1 }: ProjectCardProps) {
  const imgSrc =
    project.imageIds.length > 0
      ? project.imageIds[0]
      : (projectImages[project.id] ??
        "/assets/generated/project-residence-1.dim_800x600.jpg");

  return (
    <Link
      to="/works/$id"
      params={{ id: project.id }}
      className="project-card group block overflow-hidden bg-card border border-border"
      data-ocid={`works.item.${index}`}
    >
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={imgSrc}
          alt={project.title}
          className="project-card-img w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <p className="font-sans text-xs tracking-widest uppercase text-primary mb-2">
          {categoryLabels[project.category]}
        </p>
        <h3 className="font-serif text-lg leading-snug text-foreground mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-muted-foreground">
          {project.location} — {project.year.toString()}
        </p>
      </div>
    </Link>
  );
}
