import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { spanish } from "../data/translations";
import { LanguageContext } from "../hooks/useLanguage";
import type { Language } from "../hooks/useLanguage";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "en" ? "en" : "es";
    } catch {
      return "es";
    }
  });
  const t = useCallback(
    (text: string) => (language === "es" ? (spanish[text] ?? text) : text),
    [language],
  );
  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      localStorage.setItem("portfolio-language", next);
    } catch {
      /* The selector works without storage. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    const description =
      language === "es"
        ? "Axel Fecha — Desarrollador de software en Argentina. Proyectos destacados, habilidades técnicas y contacto."
        : "Axel Fecha — Software Developer in Argentina. Selected projects, engineering skills, and contact.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
