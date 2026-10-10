import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
let reduced = true;
let dark = true;
let saved = null;
globalThis.matchMedia = query => ({ matches: query.includes('reduced-motion') ? reduced : dark });
globalThis.localStorage = { getItem: () => saved };
try {
  const { default: DemoDialog } = await server.ssrLoadModule('/src/components/DemoDialog.tsx');
  const { LanguageProvider } = await server.ssrLoadModule('/src/components/LanguageProvider.tsx');
  const { useLanguage } = await server.ssrLoadModule('/src/hooks/useLanguage.ts');
  const { ResumeLinks } = await server.ssrLoadModule('/src/components/ResumeLinks.tsx');
  const { profile } = await server.ssrLoadModule('/src/data/portfolio.ts');
  const { useTheme } = await server.ssrLoadModule('/src/hooks/useTheme.ts');
  const { projects } = await server.ssrLoadModule('/src/data/portfolio.ts');
  const project = { ...projects[0], demoVideo: undefined, demoGif: '/test-demo.gif' };
  const withLanguage = child => renderToStaticMarkup(createElement(LanguageProvider, null, child));
  const demo = () => withLanguage(createElement(DemoDialog, { project, onClose() {} }));
  assert(!demo().includes('src="/test-demo.gif"'), 'Reduced motion must not autoplay GIF');
  assert(demo().includes('Reproducir demo'), 'Demo stays available under reduced motion');
  reduced = false;
  assert(demo().includes('src="/test-demo.gif"'), 'Requested demo loads GIF with normal motion');
  const videoDemo = () => withLanguage(createElement(DemoDialog, { project: projects[0], onClose() {} }));
  assert(videoDemo().includes('<video'), 'Fixy supports an MP4 quick demo');
  assert.equal(projects[0].demoPlaybackRate, 1.5);
  reduced = true;
  assert(!videoDemo().includes('<video'), 'Reduced motion waits for explicit video playback');
  reduced = false;
  function ThemeProbe() { return createElement('span', null, useTheme().theme); }
  const theme = () => renderToStaticMarkup(createElement(ThemeProbe));
  assert.equal(theme(), '<span>dark</span>');
  dark = false;
  assert.equal(theme(), '<span>light</span>');
  saved = 'dark';
  assert.equal(theme(), '<span>dark</span>', 'Manual theme overrides system');
  saved = 'invalid';
  assert.equal(theme(), '<span>light</span>', 'Invalid stored theme falls back to system');
  function LanguageProbe() { const { language, t } = useLanguage(); return createElement('span', null, `${language}:${t('Projects')}`); }
  saved = null;
  assert.equal(withLanguage(createElement(LanguageProbe)), '<span>es:Proyectos</span>', 'Spanish is the default');
  saved = 'en';
  assert.equal(withLanguage(createElement(LanguageProbe)), '<span>en:Projects</span>', 'English preference is restored');
  profile.cv = '/cv.pdf';
  const resume = withLanguage(createElement(ResumeLinks));
  assert.match(resume, /href="\/cv.pdf" target="_blank" rel="noopener noreferrer"/);
  assert.match(resume, /download="Axel-Fecha-CV.pdf"/);
  profile.cv = undefined;
  const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8');
  const reducedRules = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reducedRules, /animation:\s*none\s*!important/);
  assert.match(reducedRules, /transition:\s*none\s*!important/);
  assert.match(reducedRules, /scroll-behavior:\s*auto/);
  console.log('Passed: theme, reduced motion, ES default, saved EN, PDF open and download actions.');
} finally { await server.close(); }
