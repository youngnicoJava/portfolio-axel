export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  technologies: string[];
  stackSkills?: string[];
  image?: string;
  screenshots?: { src: string; label: string }[];
  demoGif?: string;
  demoVideo?: string;
  demoPlaybackRate?: number;
  videoUrl?: string;
  repositoryUrl?: string;
  liveDemoUrl?: string;
  demoRepositoryUrl?: string;
  highlights: string[];
  accent: string;
  preview: "service" | "banking";
}
