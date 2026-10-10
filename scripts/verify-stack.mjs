import assert from "node:assert/strict";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
globalThis.localStorage = { getItem: () => null };
try {
  const { projects, skillGroups, additionalSkills } =
    await server.ssrLoadModule("/src/data/portfolio.ts");
  const { resolveStackProject, getStackSkills } = await server.ssrLoadModule(
    "/src/lib/projectStack.ts",
  );
  const { EngineeringSkills } = await server.ssrLoadModule(
    "/src/sections/EngineeringSkills.tsx",
  );
  const { LanguageProvider } = await server.ssrLoadModule(
    "/src/components/LanguageProvider.tsx",
  );
  const knownSkills = new Set([
    ...skillGroups.flatMap((group) => group.skills),
    ...additionalSkills,
  ]);
  for (const project of projects) {
    assert.equal(resolveStackProject(project.slug).slug, project.slug);
    assert(
      getStackSkills(project).every((skill) => knownSkills.has(skill)),
      "Every project skill must map to a visible skill",
    );
  }
  for (const input of [
    "",
    "__proto__",
    "unknown",
    "https://example.com",
    '{"slug":"fixy"}',
  ]) {
    assert.equal(
      resolveStackProject(input),
      null,
      "Foreign or malformed drag payloads must not select a project",
    );
  }
  const render = (selectedProject) =>
    renderToStaticMarkup(
      createElement(
        LanguageProvider,
        null,
        createElement(EngineeringSkills, {
          selectedProject,
          draggingProject: null,
          onSelectStack() {},
          onClear() {},
        }),
      ),
    );
  const fixy = render(resolveStackProject("fixy"));
  assert.match(fixy, /aria-label="Angular — Utilizado en Fixy"/);
  assert.match(fixy, /aria-label="Go — Utilizado en Fixy"/);
  assert(!fixy.includes("React — Utilizado en Fixy"));
  assert(!fixy.includes("Quarkus — Utilizado en Fixy"));
  assert.equal(
    (fixy.match(/class="skill-check"/g) ?? []).length,
    getStackSkills(resolveStackProject("fixy")).length,
  );
  const loan = render(resolveStackProject("loan-origination"));
  assert.match(loan, /React — Utilizado en Loan Origination Platform/);
  assert.match(loan, /Flyway — Utilizado en Loan Origination Platform/);
  assert(!loan.includes("Angular — Utilizado en Loan Origination Platform"));
  assert(!loan.includes("Go — Utilizado en Loan Origination Platform"));
  const empty = render(null);
  assert(!empty.includes('class="skill-check"'));
  assert(!empty.includes("Limpiar selección"));
  console.log(
    "Passed: known/invalid project payloads, complete skill mapping, project-specific highlights, replacement and cleared state.",
  );
} finally {
  await server.close();
}
