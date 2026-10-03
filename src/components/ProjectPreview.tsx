import { useLanguage } from "../hooks/useLanguage";
import { ArrowUpRight, Check, Search } from "lucide-react";
import type { Project } from "../types/project";
export function ProjectPreview({ project }: { project: Project }) {
  const { t } = useLanguage();
  if (project.image)
    return (
      <img
        className="project-image"
        src={project.image}
        alt={`${project.title} ${t("screenshot")}`}
        loading="lazy"
        width="900"
        height="560"
      />
    );
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
