import { useLanguage } from "../hooks/useLanguage";
import { useEffect, useRef, useState } from "react";
import { X, Image, Pause, Play } from "lucide-react";
import type { Project } from "../types/project";
import { ProjectPreview } from "./ProjectPreview";
export default function DemoDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const [playDemo, setPlayDemo] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [loadFailed, setLoadFailed] = useState(false);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (query.matches) setPlayDemo(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="demo-dialog"
      aria-labelledby="demo-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-heading">
        <div>
          <span className="eyebrow">{t("QUICK DEMO")}</span>
          <h2 id="demo-title">{project.title}</h2>
        </div>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={t("Close demo")}
        >
          <X />
        </button>
      </div>
      {project.demoVideo && playDemo ? (
        <video
          className="demo-image"
          src={project.demoVideo}
          poster={project.image}
          controls
          playsInline
          autoPlay
          muted
          preload="metadata"
          aria-label={`${project.title} ${t("quick demo")}`}
          onLoadedMetadata={(event) => {
            event.currentTarget.defaultPlaybackRate = project.demoPlaybackRate ?? 1;
            event.currentTarget.playbackRate = project.demoPlaybackRate ?? 1;
          }}
          onError={() => {
            setLoadFailed(true);
            setPlayDemo(false);
          }}
        />
      ) : project.demoGif && playDemo ? (
        <img
          className="demo-image"
          src={project.demoGif}
          alt={`${project.title} ${t("quick demo")}`}
          onError={(event) => {
            event.currentTarget.hidden = true;
            setLoadFailed(true);
            setPlayDemo(false);
          }}
        />
      ) : (
        <ProjectPreview project={project} />
      )}
      <div className="dialog-caption">
        {project.demoGif || project.demoVideo ? (
          <button
            className="text-button"
            onClick={() => {
              setLoadFailed(false);
              setPlayDemo(!playDemo);
            }}
          >
            {playDemo ? <Pause size={16} /> : <Play size={16} />}
            {playDemo ? t("Stop demo") : t("Play demo")}
          </button>
        ) : (
          <p>
            <Image size={16} />
            {t("Demo placeholder · The optimized GIF will appear here.")}
          </p>
        )}
        <span>{t("Esc to close")}</span>
      </div>
      {loadFailed && (
        <p className="draft-note" role="status">
          {t(
            "The demo could not load. You can try again or close this preview.",
          )}
        </p>
      )}
    </dialog>
  );
}
