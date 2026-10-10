import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Search,
} from "lucide-react";
import type { Project } from "../types/project";
export function ProjectPreview({
  project,
  href,
}: {
  project: Project;
  href?: string;
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const screenshots = project.screenshots?.length
    ? project.screenshots
    : project.image
      ? [{ src: project.image, label: "screenshot" }]
      : [];
  if (screenshots.length) {
    const current = selected % screenshots.length;
    const move = (direction: number) =>
      setSelected(
        (index) =>
          (index + direction + screenshots.length) % screenshots.length,
      );
    const viewport = (
      <div className="project-gallery-viewport">
        <div
          className="project-gallery-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {screenshots.map((shot, index) => (
            <div
              className="project-gallery-slide"
              key={shot.src}
              aria-hidden={index !== current}
            >
              <img
                className="project-image"
                src={shot.src}
                alt={
                  index === current ? `${project.title} — ${t(shot.label)}` : ""
                }
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    );
    return (
      <div
        className={`project-preview has-gallery ${project.accent}`}
        role="region"
        aria-label={`${project.title}: ${t("Image gallery")}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            event.stopPropagation();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {href ? (
          <Link
            className="project-gallery-link"
            to={href}
            aria-label={`${t("Explore")} ${project.title}`}
          >
            {viewport}
          </Link>
        ) : (
          viewport
        )}
        <div className="project-gallery-footer">
          <span
            className="project-gallery-caption"
            aria-live="polite"
            aria-atomic="true"
          >
            {t(screenshots[current].label)}
          </span>
          {screenshots.length > 1 && (
            <div className="project-gallery-controls">
              <button
                type="button"
                className="gallery-arrow"
                aria-label={`${t("Previous image")}: ${project.title}`}
                onClick={() => move(-1)}
              >
                <ArrowLeft size={17} />
              </button>
              <span className="project-gallery-count" aria-hidden="true">
                {current + 1} / {screenshots.length}
              </span>
              <button
                type="button"
                className="gallery-arrow"
                aria-label={`${t("Next image")}: ${project.title}`}
                onClick={() => move(1)}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`project-preview ${project.accent}`}
      role="img"
      aria-label={`${project.title}: ${t("illustrative preview, not a real screenshot")}`}
    >
      <div className="mock-window" aria-hidden="true">
        <div className="mock-bar">
          <span className="mock-brand">
            {project.preview === "service" ? "fixy" : "originate"}
            <span>®</span>
          </span>
          <span>{t("Workspace")}</span>
          <span className="mock-avatar">AF</span>
        </div>
        <div className="mock-body">
          <div className="mock-sidebar">
            <span className="mock-selected">{t("Overview")}</span>
            <span>
              {project.preview === "service"
                ? t("My requests")
                : t("Applications")}
            </span>
            <span>{t("Messages")}</span>
            <span>{t("Settings")}</span>
            <div className="mock-sidebar-bottom">
              {t("Your workspace.")}
              <br />
              {t("Simplified.")}
            </div>
          </div>
          <div className="mock-content">
            <div className="mock-eyebrow">
              {project.preview === "service"
                ? t("A little help goes a long way")
                : t("CREDIT OPERATIONS")}
            </div>
            <strong>
              {project.preview === "service"
                ? t("What can we fix today?")
                : t("Every decision. One place.")}
            </strong>
            <div className="mock-search">
              <Search size={12} />
              {project.preview === "service"
                ? t("Find a service near you")
                : t("Search applications")}
              <ArrowUpRight size={12} />
            </div>
            <div className="mock-stats">
              {(project.preview === "service"
                ? [t("Home repairs"), t("Electrical"), t("Plumbing")]
                : [t("24 applications"), t("08 in review"), t("16 approved")]
              ).map((text, i) => (
                <div key={text}>
                  <span className="mock-stat-icon">
                    {i === 0 ? "↗" : i === 1 ? "⌁" : "◈"}
                  </span>
                  <b>{t(text)}</b>
                  <small>
                    {project.preview === "service"
                      ? t("Explore professionals")
                      : t("This month")}
                  </small>
                </div>
              ))}
            </div>
            <div className="mock-list">
              <div>
                <b>
                  {project.preview === "service"
                    ? t("Recent requests")
                    : t("Recent applications")}
                </b>
                <span>{t("View all ↗")}</span>
              </div>
              {["001", "002"].map((id, i) => (
                <div key={id}>
                  <span className="mock-item-icon">
                    <Check size={12} />
                  </span>
                  <span>
                    {project.preview === "service"
                      ? i
                        ? t("Kitchen maintenance")
                        : t("Electrical installation")
                      : `${t("Application")} #102${id}`}
                    <small>
                      {i ? t("Updated 2 hours ago") : t("Updated just now")}
                    </small>
                  </span>
                  <span className="mock-status">
                    {i ? t("In review") : t("Completed")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="preview-label">{t("Illustrative preview")}</span>
    </div>
  );
}
