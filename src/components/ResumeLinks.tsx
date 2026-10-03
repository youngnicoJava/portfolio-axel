import { Download, FileText } from "lucide-react";
import { profile } from "../data/portfolio";
import { useLanguage } from "../hooks/useLanguage";
import { ProfessionalLink } from "./ProfessionalLink";

export function ResumeLinks({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return (
    <div className={compact ? "resume-links compact" : "resume-links"}>
      <ProfessionalLink
        href={profile.cv}
        className={compact ? "" : "button secondary"}
      >
        {!compact && <FileText size={16} />} {t("Open CV")}
      </ProfessionalLink>
      {profile.cv ? (
        <a
          className="icon-button resume-download"
          href={profile.cv}
          download="Axel-Fecha-CV.pdf"
          aria-label={t("Download CV")}
          title={t("Download CV")}
        >
          <Download size={16} />
        </a>
      ) : (
        <span
          className="icon-button resume-download pending-download"
          aria-label={t("Download CV")}
          title={t("Download CV")}
        >
          <Download size={16} />
        </span>
      )}
    </div>
  );
}
