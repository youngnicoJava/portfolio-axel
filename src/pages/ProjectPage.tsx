import { useLanguage } from "../hooks/useLanguage";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import { Github } from "../components/BrandIcons";
import { useProjects } from "../hooks/useLanguage";
import { ProjectPreview } from "../components/ProjectPreview";
import { ProfessionalLink } from "../components/ProfessionalLink";
import type { Project } from "../types/project";
export default function ProjectPage({
  onDemo,
}: {
  onDemo: (project: Project) => void;
}) {
  const { t } = useLanguage();
  const { slug } = useParams();
  const projects = useProjects();
  const project = projects.find((item) => item.slug === slug);
  useEffect(() => {
    document.title = project
      ? `${project.title} — Axel Fecha`
      : t("Project not found — Axel Fecha");
    return () => {
      document.title = "Axel Fecha — Software Developer";
    };
  }, [project, t]);
  if (!project)
    return (
      <main id="main-content" className="section not-found">
        <span className="eyebrow">{t("404 / NOT FOUND")}</span>
        <h1>{t("Nothing here yet.")}</h1>
        <Link className="button primary" to="/#projects">
          <ArrowLeft size={16} />
          {t("Back to projects")}
        </Link>
      </main>
    );
  return (
    <main id="main-content" className="section project-page">
      <Link className="back-link" to="/#projects">
        <ArrowLeft size={16} />
        {t("All projects")}
      </Link>
      <span className="eyebrow">
        {project.category} / {t("PROJECT OVERVIEW")}
      </span>
      <h1>{project.title}</h1>
      <p className="project-page-lead">{project.shortDescription}</p>
      <div className="tags">
        {project.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <ProjectPreview project={project} />
      <div className="project-detail-grid">
        <div>
          <span className="eyebrow">{t("THE IDEA")}</span>
          <h2>{t("Problem to product.")}</h2>
          <p>{project.description}</p>
        </div>
        <div>
          <span className="eyebrow">{t("KEY CAPABILITIES")}</span>
          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flow-summary">
        <span className="eyebrow">{t("BUSINESS FLOW · ILLUSTRATIVE")}</span>
        <div>
          <span>{t("Request / application")}</span>
          <span>→</span>
          <span>{t("Review & processing")}</span>
          <span>→</span>
          <span>{t("Outcome & tracking")}</span>
        </div>
      </div>
      <div className="project-actions">
        <button className="button primary" onClick={() => onDemo(project)}>
          <Play size={16} />
          {t("View demo")}
        </button>
        <ProfessionalLink
          className="button secondary"
          href={project.repositoryUrl}
        >
          <Github size={16} />
          {t("View repository")}
        </ProfessionalLink>
        {project.videoUrl && (
          <ProfessionalLink className="text-button" href={project.videoUrl}>
            {t("Watch walkthrough")}
          </ProfessionalLink>
        )}
      </div>
      <p className="draft-note">
        {t(
          "The repository README will cover architecture, decisions, and setup.",
        )}
      </p>
    </main>
  );
}
