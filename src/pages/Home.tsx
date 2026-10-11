import { useState } from "react";
import { resolveStackProject } from "../lib/projectStack";
import { useLanguage } from "../hooks/useLanguage";
import { ArrowDown, ArrowUpRight, Copy, Phone, MapPin } from "lucide-react";
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
  const [selectedStack, setSelectedStack] = useState<Project | null>(null);
  const [selectionVersion, setSelectionVersion] = useState(0);
  const [draggingProject, setDraggingProject] = useState<string | null>(null);
  function selectStack(slug: string) {
    const project = resolveStackProject(slug);
    if (!project) return;
    setSelectedStack(project);
    setSelectionVersion((version) => version + 1);
    const skills = document.getElementById("skills");
    skills?.focus({ preventScroll: true });
    skills?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
  }
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
        <div className="portrait-composition round-portrait">
          <div className="portrait-frame has-photo">
            <img
              className="portrait-photo"
              src={profile.photo}
              alt={profile.name}
              width={1200}
              height={1600}
              decoding="async"
            />
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
      <FeaturedProjects
        onDemo={onDemo}
        onSelectStack={selectStack}
        onDragProject={setDraggingProject}
        draggingProject={draggingProject}
        selectedStack={selectedStack?.slug ?? null}
      />
      <EngineeringSkills
        selectedProject={selectedStack}
        selectionVersion={selectionVersion}
        draggingProject={draggingProject}
        onSelectStack={selectStack}
        onClear={() => setSelectedStack(null)}
      />
      <section id="about" className="section about-section">
        <div>
          <span className="eyebrow">{t("03 / ABOUT ME")}</span>
          <h2>{t("About")}</h2>
        </div>
        <div>
          <p className="muted">
            {t(
              "I’m Axel Fecha, a software developer born in Buenos Aires. At eight, I built my first computer with my father. Since then, I’ve been passionate about software and computers, and soon afterwards I knew I wanted to make this my career.",
            )}
          </p>
          <p className="muted biography-detail">
            {t(
              "I think about everything we could still simplify with software: the tasks that take up our time every day and could be handled more efficiently. I’m excited about what’s ahead, and I want to be there, helping make it happen.",
            )}
          </p>
        </div>
      </section>
      <section id="contact" className="section contact-section">
        <span className="eyebrow">{t("04 / LET’S CONNECT")}</span>
        <div className="contact-layout">
          <div>
            <h2>{t("Contact")}</h2>
            <p>{t("My contact details and professional profiles.")}</p>
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
          </div>
        </div>
      </section>
    </main>
  );
}
