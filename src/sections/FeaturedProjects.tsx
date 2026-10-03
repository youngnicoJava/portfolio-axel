import { useLanguage } from "../hooks/useLanguage";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Github } from "../components/BrandIcons";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useLanguage";
import type { Project } from "../types/project";
import { ProjectPreview } from "../components/ProjectPreview";
import { ProfessionalLink } from "../components/ProfessionalLink";
export function FeaturedProjects({
  onDemo,
}: {
  onDemo: (project: Project) => void;
}) {
  const { t } = useLanguage();
  const track = useRef<HTMLDivElement>(null);
  const projects = useProjects();
  function move(direction: number) {
    const element = track.current;
    const card = element?.querySelector("article");
    if (element && card)
      element.scrollBy({
        left: direction * (card.getBoundingClientRect().width + 24),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  return (
    <section id="projects" className="section projects-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("01 / SELECTED WORK")}</span>
          <h2>
            {t("Built to solve.")}
            <br className="mobile-break" /> {t("Designed to work.")}
          </h2>
          <p>
            {t(
              "A selection of applications, systems, and the thinking behind them.",
            )}
          </p>
        </div>
        <div className="carousel-controls">
          <button
            className="icon-button"
            aria-label={t("Previous projects")}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={19} />
          </button>
          <button
            className="icon-button"
            aria-label={t("Next projects")}
            onClick={() => move(1)}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <div
        className="project-track"
        ref={track}
        tabIndex={0}
        aria-label={t("Featured projects, scroll horizontally for more")}
      >
        <div className="project-track-inner">
          {projects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <Link
                to={`/projects/${project.slug}`}
                className="preview-link"
                aria-label={`${t("Explore")} ${project.title}`}
              >
                <ProjectPreview project={project} />
              </Link>
              <div className="project-meta">
                <span>{project.category}</span>
                <span>0{index + 1}</span>
              </div>
              <Link className="project-title" to={`/projects/${project.slug}`}>
                <h3>{project.title}</h3>
                <ArrowUpRight size={23} />
              </Link>
              <p>{project.shortDescription}</p>
              <div className="tags">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-actions">
                <button
                  className="button demo-button"
                  onClick={() => onDemo(project)}
                >
                  <Play size={15} />
                  {t("View demo")}
                </button>
                <ProfessionalLink
                  href={project.repositoryUrl}
                  className="text-button"
                >
                  <Github size={16} /> GitHub
                </ProfessionalLink>
                {project.videoUrl && (
                  <ProfessionalLink
                    href={project.videoUrl}
                    className="text-button"
                  >
                    {t("Watch walkthrough")}
                  </ProfessionalLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="project-footnote">
        <span>{t("04 projects · Draft content")}</span>
        <span>
          {t("Scroll to explore")}
          <ArrowRight size={14} />
        </span>
      </div>
    </section>
  );
}
