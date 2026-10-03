import { useLanguage } from "../hooks/useLanguage";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Copy,
  Phone,
  MapPin,
  UserRound,
} from "lucide-react";
import { Github, Linkedin } from "../components/BrandIcons";
import { profile } from "../data/portfolio";
import { ProfessionalLink } from "../components/ProfessionalLink";
import { ShapeGrid } from "../components/ShapeGrid";
import { WarpText } from "../components/WarpText";
import { FeaturedProjects } from "../sections/FeaturedProjects";
import { ResumeLinks } from "../components/ResumeLinks";
import { EngineeringSkills } from "../sections/EngineeringSkills";
import type { Project } from "../types/project";
export default function Home({
  onDemo,
  onCopy,
}: {
  onDemo: (project: Project) => void;
  onCopy: () => void;
}) {
  const { t } = useLanguage();
  return (
    <main id="main-content">
      <section className="hero section">
        <ShapeGrid />
        <div className="hero-content">
          <div className="eyebrow hero-intro">
            <span className="status-dot" />{" "}
            {t("Thoughtful code. Useful software.")}
          </div>
          <h1>
            <WarpText>{profile.name}</WarpText>
            <span className="hero-role">{t("Software Developer")}</span>
          </h1>
          <p className="hero-description">
            {t(
              "I build reliable applications that turn complex problems into straightforward experiences.",
            )}
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#projects">
              {t("Explore my work")}
              <ArrowDown size={17} />
            </a>
            <ResumeLinks />
          </div>
          <div className="hero-links">
            <span>
              <MapPin size={14} /> {profile.location}
            </span>
            <span className="link-divider" />
            <ProfessionalLink href={profile.github}>
              <Github size={15} /> GitHub
            </ProfessionalLink>
            <ProfessionalLink href={profile.linkedin}>
              <Linkedin size={15} /> LinkedIn
            </ProfessionalLink>
          </div>
          <div className="hero-contact">
            <div className="hero-email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <button
                className="icon-button"
                onClick={onCopy}
                aria-label={t("Copy email")}
              >
                <Copy size={15} />
              </button>
            </div>
            <span className="hero-phone" title={t("Phone · to be added")}>
              <Phone size={14} /> {profile.phone}
            </span>
          </div>
        </div>
        <div className="portrait-composition">
          <div className="portrait-frame">
            <span className="portrait-top">
              {t("THE PERSON BEHIND THE CODE")}
            </span>
            <div className="portrait-placeholder">
              <UserRound strokeWidth={0.7} />
              <span>{t("Personal photo")}</span>
            </div>
            <div className="portrait-bottom">
              <span>Axel Fecha</span>
              <Code2 size={20} />
            </div>
          </div>
          <span className="portrait-coordinate">
            {t("A human approach to software.")}
          </span>
          <span className="portrait-mark" aria-hidden="true">
            +
          </span>
        </div>
        <div className="hero-bottom">
          <span>{t("BACKEND MINDSET. FULL-STACK PERSPECTIVE.")}</span>
          <a href="#projects">
            {t("Take a closer look")}
            <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <FeaturedProjects onDemo={onDemo} />
      <EngineeringSkills />
      <section id="about" className="section about-section">
        <div>
          <span className="eyebrow">{t("03 / ABOUT ME")}</span>
          <h2>{t("A little more about me.")}</h2>
        </div>
        <div>
          <p className="about-lead">
            {t("Clear systems. Intentional decisions.")}
            <br />
            {t("Room for the people who use them.")}
          </p>
          <p className="muted">
            {t(
              "I’m Axel Fecha, a software developer based in Argentina. This portfolio brings together my projects and the technologies I work with.",
            )}
          </p>
          <p className="muted biography-detail">
            {t(
              "This biography will soon include my professional background, my role in each project, and the types of challenges I want to take on next.",
            )}
          </p>
          <span className="draft-note">
            {t("Biography draft · Professional background to be added")}
          </span>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <span className="eyebrow">{t("04 / LET’S CONNECT")}</span>
        <div className="contact-layout">
          <div>
            <h2>
              {t("Have something")}
              <br />
              {t("in mind?")}
            </h2>
            <p>{t("Let’s start with a conversation.")}</p>
          </div>
          <div className="contact-links">
            <div className="email-row">
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <ArrowUpRight size={21} />
              </a>
              <button
                className="icon-button"
                onClick={onCopy}
                aria-label={t("Copy email")}
              >
                <Copy size={18} />
              </button>
            </div>
            <div className="contact-socials">
              <div className="contact-phone" title={t("Phone · to be added")}>
                <Phone size={16} aria-hidden="true" />
                <span>{profile.phone}</span>
              </div>
              <ProfessionalLink href={profile.github}>GitHub</ProfessionalLink>
              <ProfessionalLink href={profile.linkedin}>
                LinkedIn
              </ProfessionalLink>
              <ResumeLinks compact />
            </div>
            <span className="draft-note">
              {t("Placeholder email · Replace before publishing")}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
