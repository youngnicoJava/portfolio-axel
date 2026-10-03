export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  technologies: string[];
  image?: string;
  demoGif?: string;
  videoUrl?: string;
  repositoryUrl?: string;
  highlights: string[];
  accent: string;
  preview: "service" | "banking";
}
