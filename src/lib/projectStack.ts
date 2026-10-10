import { projects } from "../data/portfolio";
import type { Project } from "../types/project";

export const PROJECT_DRAG_TYPE = "application/x-portfolio-project";

// Only known project slugs may activate a stack; external text/files are ignored.
export function resolveStackProject(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getStackSkills(project: Project): string[] {
  return [...new Set(project.stackSkills ?? project.technologies)];
}
