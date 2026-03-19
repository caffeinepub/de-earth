import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ProjectCard from "../components/ProjectCard";
import { useAllProjects } from "../hooks/useQueries";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Home() {
  const { data: projects = [] } = useAllProjects();
  const featured = projects
    .filter((p) => p.isFeatured && !p.isArchive)
    .slice(0, 3);
  const introRef = useScrollAnimation<HTMLDivElement>();
  const featuredRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div className="bg-background">
      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        data-ocid="home.section"
      >
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-sketch.dim_1400x700.png"
            alt="Architectural sketch"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-24 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="font-sans text-xs tracking-widest uppercase text-primary mb-6">
              Nurture &ndash; Create &ndash; Belong
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight max-w-4xl mb-6">
              Designing With Nature.
              <br />
              Creating Meaningful Spaces.
            </h1>
            <p className="font-sans text-base text-muted-foreground max-w-xl mb-10 leading-relaxed">
              A multidisciplinary architecture and urban design practice based
              in Kozhikode, Kerala, creating sustainable, context-driven, and
              emotionally engaging spaces.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link
                to="/contact"
                className="font-sans text-sm tracking-widest uppercase border border-foreground px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                data-ocid="home.start_project.button"
              >
                Start a Project
              </Link>
              <Link
                to="/works"
                className="font-sans text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                data-ocid="home.view_works.link"
              >
                View Works <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28"
        ref={introRef}
      >
        <div className="max-w-2xl">
          <p className="font-sans text-xs tracking-widest uppercase text-primary mb-6">
            About the Practice
          </p>
          <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed">
            de Earth is a Kozhikode-based architecture and urban design firm
            established in 2004. The practice focuses on sustainable,
            nature-inclusive, and context-driven design.
          </p>
          <p className="font-sans text-base text-muted-foreground leading-relaxed mt-6">
            With a multidisciplinary team, the firm delivers projects ranging
            from residential homes to large-scale urban developments,
            emphasizing cultural sensitivity, environmental responsibility, and
            experiential spaces.
          </p>
        </div>
        <div className="mt-10 border-t border-border" />
      </section>

      {/* Featured Projects */}
      <section
        className="max-w-7xl mx-auto px-6 md:px-12 pb-28"
        ref={featuredRef}
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl text-foreground">
            Selected Works
          </h2>
          <Link
            to="/works"
            className="font-sans text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            data-ocid="home.all_works.link"
          >
            All Works <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
