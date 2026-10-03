import { createContext, useContext, useMemo } from "react";
import { projects } from "../data/portfolio";

export type Language = "es" | "en";
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
} | null>(null);
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}
export function useProjects() {
  const { t } = useLanguage();
  return useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        category: t(project.category),
        shortDescription: t(project.shortDescription),
        description: t(project.description),
        highlights: project.highlights.map(t),
      })),
    [t],
  );
}
