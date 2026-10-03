import type { Project } from "../types/project";
// Draft data: replace before publishing.
export const profile = {
  name: "Axel Fecha",
  email: "example@email.com",
  phone: "+54 9 XX XXXX XXXX",
  location: "Argentina",
  github: undefined as string | undefined,
  linkedin: undefined as string | undefined,
  cv: undefined as string | undefined,
};
export const projects: Project[] = [
  {
    slug: "fixy",
    title: "Fixy",
    category: "Service platform",
    shortDescription:
      "Connecting everyday problems with the right professionals.",
    description:
      "A service platform concept bringing requests, professionals and follow-up into one clear experience. This is placeholder project information.",
    technologies: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    highlights: [
      "Discover a professional",
      "Manage service requests",
      "Track progress",
    ],
    accent: "mint",
    preview: "service",
  },
  {
    slug: "loan-origination",
    title: "Loan Origination Platform",
    category: "Financial software",
    shortDescription:
      "A clearer path from loan application to credit decision.",
    description:
      "A banking workflow concept for reviewing applications and keeping credit decisions traceable. Final implementation details will be added later.",
    technologies: ["Angular", "Java", "Spring Boot", "Oracle"],
    highlights: [
      "Application intake",
      "Review and decision workflow",
      "Traceable status",
    ],
    accent: "lavender",
    preview: "banking",
  },
  {
    slug: "banking-project-2",
    title: "Banking Project 2",
    category: "Banking · working title",
    shortDescription: "Reliable workflows for day-to-day banking operations.",
    description:
      "Reserved for a banking project. Business context and technical details will be provided later.",
    technologies: ["Kotlin", "Quarkus", "PostgreSQL"],
    highlights: [
      "Business flow to be added",
      "Architecture summary to be added",
    ],
    accent: "sand",
    preview: "banking",
  },
  {
    slug: "banking-project-3",
    title: "Banking Project 3",
    category: "Banking · working title",
    shortDescription: "Making complex financial processes easier to navigate.",
    description:
      "Reserved for a banking project. Business context and technical details will be provided later.",
    technologies: ["Java", "Angular", "Docker"],
    highlights: [
      "Business flow to be added",
      "Architecture summary to be added",
    ],
    accent: "blue",
    preview: "banking",
  },
];
export const skillGroups = [
  {
    title: "Backend engineering",
    skills: ["Java", "Kotlin", "Spring Boot", "Quarkus"],
  },
  { title: "Frontend", skills: ["Angular", "TypeScript"] },
  { title: "Data", skills: ["PostgreSQL", "Oracle", "Kafka", "SQL", "Flyway"] },
  {
    title: "Architecture",
    skills: [
      "Hexagonal architecture",
      "Layered architecture",
      "Microservices",
      "Domain modeling",
    ],
  },
  { title: "Infrastructure", skills: ["Docker", "Linux", "CI/CD", "GitLab"] },
];

// Technologies with practical experience outside the primary stack.
export const additionalSkills: string[] = [
  "React",
  "AWS",
  "Go",
  "Python",
  "Excel",
  "Power BI",
];
