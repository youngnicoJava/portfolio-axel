import { PROJECT_DRAG_TYPE } from "../lib/projectStack";
import { useLanguage } from "../hooks/useLanguage";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Play,
  GripVertical,
} from "lucide-react";
import { Github } from "../components/BrandIcons";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useLanguage";
import type { Project } from "../types/project";
import { ProjectPreview } from "../components/ProjectPreview";
import { ProfessionalLink } from "../components/ProfessionalLink";
export function FeaturedProjects({
  onDemo,
  onSelectStack,
  onDragProject,
  draggingProject,
  selectedStack,
}: {
  onDemo: (project: Project) => void;
  onSelectStack: (slug: string) => void;
  onDragProject: (slug: string | null) => void;
  draggingProject: string | null;
  selectedStack: string | null;
}) {
  const { t } = useLanguage();
  const track = useRef<HTMLDivElement>(null);
  const projects = useProjects();
  const section = useRef<HTMLElement>(null);
  const pulseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const [pulse, setPulse] = useState<"left" | "right" | null>(null);
  const move = useCallback((direction: number) => {
    const element = track.current;
    const card = element?.querySelector("article");
    if (element && card)
      element.scrollBy({
        left: direction * (card.getBoundingClientRect().width + 24),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  }, []);
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (draggingProject) return;
      const key = event.key.toLowerCase();
      if (
        (key !== "q" && key !== "e") ||
        event.repeat ||
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      )
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]',
        )
      )
        return;
      if (document.querySelector('dialog[open], [aria-modal="true"]')) return;
      const bounds = section.current?.getBoundingClientRect();
      if (
        !bounds ||
        bounds.top >= innerHeight * 0.8 ||
        bounds.bottom <= innerHeight * 0.2
      )
        return;
      event.preventDefault();
      move(key === "q" ? -1 : 1);
      setPulse(key === "q" ? "left" : "right");
      clearTimeout(pulseTimer.current);
      pulseTimer.current = setTimeout(() => setPulse(null), 450);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(pulseTimer.current);
    };
  }, [move, draggingProject]);
  return (
    <section ref={section} id="projects" className="section projects-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("01 / SELECTED WORK")}</span>
          <h2>{t("Projects")}</h2>
          <p>
            {t(
              "A selection of applications, systems, and the thinking behind them.",
            )}
          </p>
        </div>
      </div>
      <div className="project-carousel">
        <button
          type="button"
          className={`project-nav left ${pulse === "left" ? "key-pulse" : ""}`}
          aria-label={t("Previous projects")}
          aria-keyshortcuts="Q"
          onClick={() => move(-1)}
        >
          <ChevronLeft size={20} />
          <kbd>Q</kbd>
        </button>
        <button
          type="button"
          className={`project-nav right ${pulse === "right" ? "key-pulse" : ""}`}
          aria-label={t("Next projects")}
          aria-keyshortcuts="E"
          onClick={() => move(1)}
        >
          <ChevronRight size={20} />
          <kbd>E</kbd>
        </button>
        <div
          className="project-track"
          ref={track}
          tabIndex={0}
          aria-label={t("Featured projects, scroll horizontally for more")}
        >
          <div className="project-track-inner">
            {projects.map((project, index) => (
              <article
                className={`project-card ${draggingProject === project.slug ? "is-dragging" : ""}`}
                key={project.slug}
              >
                <ProjectPreview
                  project={project}
                  href={`/projects/${project.slug}`}
                />
                <div className="project-meta">
                  <span>
                    {project.category}{" "}
                    <span className="project-source-divider" aria-hidden="true">
                      |
                    </span>{" "}
                    {project.slug === "fixy"
                      ? t("Demo open-source")
                      : "Open-source"}
                  </span>
                  <span>0{index + 1}</span>
                </div>
                <Link
                  className="project-title"
                  to={`/projects/${project.slug}`}
                >
                  <h3>{project.title}</h3>
                  <ArrowUpRight size={23} />
                </Link>
                <p>{project.shortDescription}</p>
                <div className="tags">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-stack-action">
                  <button
                    type="button"
                    className="stack-handle"
                    draggable
                    aria-label={`${t("View technologies")}: ${project.title}`}
                    aria-pressed={selectedStack === project.slug}
                    title={t("Drag to skills or click to view the stack")}
                    onClick={() => onSelectStack(project.slug)}
                    onDragStart={(event) => {
                      event.dataTransfer.setData(
                        PROJECT_DRAG_TYPE,
                        project.slug,
                      );
                      event.dataTransfer.effectAllowed = "copy";
                      onDragProject(project.slug);
                    }}
                    onDragEnd={() => onDragProject(null)}
                  >
                    <GripVertical size={15} aria-hidden="true" />{" "}
                    {t("View technologies")}
                  </button>
                </div>
                <div className="project-actions">
                  {project.liveDemoUrl && (
                    <ProfessionalLink
                      href={project.liveDemoUrl}
                      className="button secondary"
                    >
                      {t("Interactive demo")}
                    </ProfessionalLink>
                  )}
                  {project.demoRepositoryUrl && (
                    <ProfessionalLink
                      href={project.demoRepositoryUrl}
                      className="text-button"
                    >
                      <Github size={16} /> {t("GitHub repository")}
                    </ProfessionalLink>
                  )}
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
                    <Github size={16} /> {t("GitHub repository")}
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
      </div>
      <div className="project-footnote">
        <span>{t("04 projects · Draft content")}</span>
        <span>
          {t("Drag a project to Skills or choose View technologies")}
          <ArrowRight size={14} />
        </span>
      </div>
    </section>
  );
}
