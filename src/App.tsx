import { useLanguage } from "./hooks/useLanguage";
import { LanguageProvider } from "./components/LanguageProvider";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ArrowUpRight, Check, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { profile } from "./data/portfolio";
import type { Project } from "./types/project";
import Home from "./pages/Home";
const ProjectPage = lazy(() => import("./pages/ProjectPage"));
const DemoDialog = lazy(() => import("./components/DemoDialog"));
function Portfolio() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [demo, setDemo] = useState<Project | null>(null);
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const menuButton = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (location.hash)
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location]);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setToast(t("Email copied"));
    } catch {
      setToast(t("Could not copy. Select the email to copy manually."));
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 3000);
  }
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("Skip to content")}
      </a>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="wordmark" to="/" aria-label={t("Axel Fecha home")}>
            axel<span>fecha</span>
            <span className="brand-dot">.</span>
          </Link>
          <nav
            id="main-nav"
            className={menuOpen ? "navigation open" : "navigation"}
            aria-label={t("Main navigation")}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                menuButton.current?.focus();
              }
            }}
          >
            {["projects", "skills", "about", "contact"].map((section) => (
              <Link
                key={section}
                to={`/#${section}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(section.charAt(0).toUpperCase() + section.slice(1))}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <div
              className="language-selector"
              role="group"
              aria-label={language === "es" ? "Idioma" : "Language"}
            >
              <button
                onClick={() => setLanguage("es")}
                aria-label="Español"
                aria-pressed={language === "es"}
              >
                ES
              </button>
              <span aria-hidden="true">/</span>
              <button
                onClick={() => setLanguage("en")}
                aria-label="English"
                aria-pressed={language === "en"}
              >
                EN
              </button>
            </div>
            <span className="nav-note">
              {t("LET’S BUILD SOMETHING")}
              <ArrowUpRight size={13} />
            </span>
            <button
              className="icon-button theme-button"
              onClick={toggleTheme}
              aria-label={t(
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode",
              )}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              ref={menuButton}
              className="icon-button menu-button"
              aria-label={
                menuOpen ? t("Close navigation") : t("Open navigation")
              }
              aria-expanded={menuOpen}
              aria-controls="main-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      <Suspense
        fallback={
          <main className="section loading" aria-busy="true">
            {t("Loading project…")}
          </main>
        }
      >
        <Routes>
          <Route
            path="/"
            element={<Home onDemo={setDemo} onCopy={copyEmail} />}
          />
          <Route
            path="/projects/:slug"
            element={<ProjectPage onDemo={setDemo} />}
          />
          <Route
            path="*"
            element={
              <main id="main-content" className="section not-found">
                <h1>{t("Page not found.")}</h1>
                <Link to="/">{t("Back home")}</Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <footer className="section site-footer">
        <Link className="wordmark" to="/">
          axel<span>fecha</span>
          <span className="brand-dot">.</span>
        </Link>
        <span>© {new Date().getFullYear()} Axel Fecha</span>
        <span>{t("Built with intention.")}</span>
        <a className="back-to-top" href="#main-content">
          {t("Back to top ↑")}
        </a>
      </footer>
      {demo && (
        <Suspense
          fallback={
            <div className="toast visible" role="status">
              {t("Opening demo…")}
            </div>
          }
        >
          <DemoDialog project={demo} onClose={() => setDemo(null)} />
        </Suspense>
      )}
      <div
        className={toast ? "toast visible" : "toast"}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Check size={16} />
            {toast}
          </>
        )}
      </div>
    </>
  );
}
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    </LanguageProvider>
  );
}
