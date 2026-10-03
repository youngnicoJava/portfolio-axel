import { Wrench, Code2 } from "lucide-react";
import { additionalSkills, skillGroups } from "../data/portfolio";
import { SkillIcon } from "../components/SkillIcon";
import { useLanguage } from "../hooks/useLanguage";

function SkillList({
  skills,
  additional = false,
}: {
  skills: string[];
  additional?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <ul
      className={additional ? "skill-list additional-skill-list" : "skill-list"}
    >
      {skills.map((skill) => (
        <li key={skill}>
          <SkillIcon name={skill} />
          <span>{t(skill)}</span>
        </li>
      ))}
    </ul>
  );
}

export function EngineeringSkills() {
  const { t } = useLanguage();
  return (
    <section id="skills" className="section skills-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t("02 / ENGINEERING TOOLKIT")}</span>
          <h2>{t("More than a stack.")}</h2>
          <p>{t("Tools change. Clear thinking and solid foundations stay.")}</p>
        </div>
        <Code2 className="section-symbol" size={35} strokeWidth={1} />
      </div>
      <div className="skill-grid">
        {skillGroups.map((group, index) => (
          <div className="skill-group" key={group.title}>
            <span className="skill-number">0{index + 1}</span>
            <h3>{t(group.title)}</h3>
            <SkillList skills={group.skills} />
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
          <SkillList skills={additionalSkills} additional />
        ) : (
          <p className="additional-placeholder">
            {t("Technologies to be added")}
          </p>
        )}
      </div>
    </section>
  );
}
