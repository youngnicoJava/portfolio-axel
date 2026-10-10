import type { Project } from "../types/project";
// Draft data: replace before publishing.
export const profile = {
  name: "Axel Fecha",
  email: "axel.fecha.cit@gmail.com",
  phone: "+54 9 11 2462-2692",
  location: "GBA Norte, Buenos Aires, Argentina",
  github: "https://github.com/youngnicoJava",
  linkedin: "https://www.linkedin.com/in/axel-fecha-225837274/",
  cv: undefined as string | undefined,
};
export const projects: Project[] = [
  {
    slug: "fixy",
    liveDemoUrl: "https://youngnicoJava.github.io/fixy-demo-frontend/",
    demoRepositoryUrl: "https://github.com/youngnicoJava/fixy-demo-frontend",
    image: "/projects/fixy/fixy-home.png",
    demoVideo: "/projects/fixy/video-fixy.mp4",
    demoPlaybackRate: 1.5,
    title: "Fixy",
    repositoryUrl: "https://github.com/youngnicoJava/fixy-readme",
    category: "Service platform",
    shortDescription:
      "Connecting everyday problems with the right professionals.",
    description:
      "A service platform concept bringing requests, professionals and follow-up into one clear experience. This is placeholder project information.",
    technologies: ["Angular", "TypeScript", "Spring Boot", "PostgreSQL"],
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
    repositoryUrl: "https://github.com/youngnicoJava/loan-approval-engine",
    category: "Financial software",
    shortDescription:
      "From loan application to disbursement, with a traceable financial workflow.",
    description:
      "A modular loan origination platform covering customers, applications, evaluations, offers, loans, disbursements and installments. A hexagonal domain, role-based access, audit records and transactional outbox keep the financial workflow traceable.",
    technologies: ["Java", "Quarkus", "PostgreSQL", "React", "TypeScript"],
    highlights: [
      "Applications, evaluations and loan offers",
      "Disbursements and installment tracking",
      "Role-based access and audit trail",
    ],
    accent: "lavender",
    preview: "banking",
  },
  {
    slug: "credit-risk-engine",
    title: "Credit Risk Engine",
    repositoryUrl: "https://github.com/youngnicoJava/credit-risk-engine",
    category: "Credit risk",
    shortDescription: "Explainable credit decisions based on eligibility, affordability and scoring.",
    description:
      "An independent credit risk service with versioned policies and a framework-free hexagonal domain. It returns approval, review or rejection with reasons and score evidence. An analyst console explains assessments, while Kafka connects the service to loan origination.",
    technologies: ["Java", "Quarkus", "PostgreSQL", "Kafka", "React"],
    highlights: [
      "Eligibility, affordability and versioned scoring",
      "Decision explanations and score factors",
      "Filtered analyst console and Kafka integration",
    ],
    accent: "sand",
    preview: "banking",
  },
  {
    slug: "fraud-detection-engine",
    title: "Fraud Detection Engine",
    repositoryUrl: "https://github.com/youngnicoJava/fraud-detection-engine",
    category: "Fraud detection",
    shortDescription: "Rule-based fraud signals with an investigation queue for analysts.",
    description:
      "An independent service that evaluates suspicious loan application behavior using deterministic rules. Its modular layered architecture supports explained assessments and manual case investigation. Case resolutions are published through a transactional outbox and versioned Kafka events; loan origination retains ownership of credit decisions.",
    technologies: ["Java", "Quarkus", "PostgreSQL", "Kafka", "React"],
    highlights: [
      "Application velocity and financial-change signals",
      "Manual investigation and case resolution",
      "Auditable case actions and Kafka resolution events",
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
