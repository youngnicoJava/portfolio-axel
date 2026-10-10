import { useState } from "react";
import { Wrench, Code2, Check, X } from "lucide-react";
import { additionalSkills, skillGroups } from "../data/portfolio";
import { SkillIcon } from "../components/SkillIcon";
import { useLanguage } from "../hooks/useLanguage";
import {
  PROJECT_DRAG_TYPE,
  getStackSkills,
  resolveStackProject,
} from "../lib/projectStack";
import type { Project } from "../types/project";

function SkillList({
  skills,
  selectedProject,
  additional = false,
}: {
  skills: string[];
  selectedProject: Project | null;
  additional?: boolean;
}) {
  const { t } = useLanguage();
  const usedSkills = selectedProject ? getStackSkills(selectedProject) : [];
  return (
    <ul
      className={additional ? "skill-list additional-skill-list" : "skill-list"}
    >
      {skills.map((skill) => {
        const used = usedSkills.includes(skill);
        return (
          <li
            key={`${selectedProject?.slug ?? "all"}:${skill}`}
            className={used ? "skill-used" : ""}
            data-skill={skill}
            aria-label={
              used
                ? `${t(skill)} — ${t("Used in")} ${selectedProject?.title}`
                : undefined
            }
          >
            <span className="skill-marker">
              <SkillIcon name={skill} />
              {used && (
                <span className="skill-check" aria-hidden="true">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
            </span>
            <span>{t(skill)}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function EngineeringSkills({
  selectedProject,
  draggingProject,
  onSelectStack,
  onClear,
}: {
  selectedProject: Project | null;
  draggingProject: string | null;
  onSelectStack: (slug: string) => void;
  onClear: () => void;
}) {
  const { t } = useLanguage();
  const [dropActive, setDropActive] = useState(false);
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
      className={`section skills-section ${draggingProject ? "awaiting-project" : ""} ${dropActive && draggingProject ? "drop-active" : ""}`}
      onDragEnter={(event) => {
        if (
          draggingProject &&
          event.dataTransfer.types.includes(PROJECT_DRAG_TYPE)
        )
          event.preventDefault();
      }}
      onDragOver={(event) => {
        if (
          !draggingProject ||
          !event.dataTransfer.types.includes(PROJECT_DRAG_TYPE)
        )
          return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        setDropActive(true);
      }}
      onDragLeave={(event) => {
        if (
          !(event.relatedTarget instanceof Node) ||
          !event.currentTarget.contains(event.relatedTarget)
        )
          setDropActive(false);
      }}
      onDrop={(event) => {
        setDropActive(false);
        if (!event.dataTransfer.types.includes(PROJECT_DRAG_TYPE)) return;
        event.preventDefault();
        const project = resolveStackProject(
          event.dataTransfer.getData(PROJECT_DRAG_TYPE),
        );
        if (project) onSelectStack(project.slug);
      }}
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("02 / ENGINEERING TOOLKIT")}</span>
          <h2 id="skills-title">{t("Technical skills")}</h2>
          <p>{t("Languages, frameworks and tools I work with.")}</p>
        </div>
        <Code2 className="section-symbol" size={35} strokeWidth={1} />
      </div>
      <div className="stack-selection">
        <p role="status" aria-live="polite" aria-atomic="true">
          {draggingProject ? (
            t("Drop the project here to explore its stack")
          ) : selectedProject ? (
            <>
              <strong>{selectedProject.title}</strong> ·{" "}
              {t("Highlighted technologies used in this project")}
            </>
          ) : (
            t("Drag a project here or select View technologies on a card")
          )}
        </p>
        {selectedProject && (
          <button type="button" className="text-button" onClick={onClear}>
            <X size={14} aria-hidden="true" />
            {t("Clear selection")}
          </button>
        )}
      </div>
      <div className="skill-grid">
        {skillGroups.map((group, index) => (
          <div className="skill-group" key={group.title}>
            <span className="skill-number">0{index + 1}</span>
            <h3>{t(group.title)}</h3>
            <SkillList
              skills={group.skills}
              selectedProject={selectedProject}
            />
          </div>
        ))}
      </div>
      <div className="additional-skills" aria-labelledby="additional-title">
        <div className="additional-intro">
          <h3 id="additional-title">
            <Wrench size={17} strokeWidth={1.5} aria-hidden="true" />
            {t("Also in my toolkit")}
          </h3>
          <p>{t("Hands-on experience beyond my primary stack.")}</p>
        </div>
        {additionalSkills.length ? (
          <SkillList
            skills={additionalSkills}
            selectedProject={selectedProject}
            additional
          />
        ) : (
          <p className="additional-placeholder">
            {t("Technologies to be added")}
          </p>
        )}
      </div>
    </section>
  );
}
