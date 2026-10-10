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
    screenshots: [
      {
        src: "/projects/fixy/fixy-home.png",
        label: "Home",
      },
      {
        src: "/projects/fixy/auth-login.jpg",
        label: "Authentication",
      },
      {
        src: "/projects/fixy/client-dashboard.jpg",
        label: "Client dashboard",
      },
      {
        src: "/projects/fixy/worker-dashboard.jpg",
        label: "Worker dashboard",
      },
      {
        src: "/projects/fixy/address-modal.jpg",
        label: "Address selection",
      },
      {
        src: "/projects/fixy/request-matched-agreement.jpg",
        label: "Service agreement",
      },
      {
        src: "/projects/fixy/conversation-contract.jpg",
        label: "Conversation and agreement",
      },
    ],
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
    screenshots: [
      {
        src: "/projects/loan-origination/customer-dashboard.jpg",
        label: "Customer dashboard",
      },
      {
        src: "/projects/loan-origination/keycloak.jpg",
        label: "Authentication",
      },
      {
        src: "/projects/loan-origination/application-approved.jpg",
        label: "Approved application",
      },
      {
        src: "/projects/loan-origination/operations-dashboard.jpg",
        label: "Operations dashboard",
      },
      {
        src: "/projects/loan-origination/offer-detail.jpg",
        label: "Accepted offer",
      },
      {
        src: "/projects/loan-origination/loan-active.jpg",
        label: "Loan and repayment schedule",
      },
      {
        src: "/projects/loan-origination/audit-events.jpg",
        label: "Audit trail",
      },
    ],
    image: "/projects/loan-origination/customer-dashboard.jpg",
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
    screenshots: [
      {
        src: "/projects/credit-risk-engine/assessments.jpg",
        label: "Assessment history",
      },
      {
        src: "/projects/credit-risk-engine/keycloak.jpg",
        label: "Authentication",
      },
      {
        src: "/projects/credit-risk-engine/assessment-approve.jpg",
        label: "Approved assessment",
      },
      {
        src: "/projects/credit-risk-engine/assessment-explanation.jpg",
        label: "Score explanation",
      },
      {
        src: "/projects/credit-risk-engine/assessment-refer.jpg",
        label: "Manual review",
      },
      {
        src: "/projects/credit-risk-engine/assessment-reject.jpg",
        label: "Rejected assessment",
      },
    ],
    image: "/projects/credit-risk-engine/assessments.jpg",
    title: "Credit Risk Engine",
    repositoryUrl: "https://github.com/youngnicoJava/credit-risk-engine",
    category: "Credit risk",
    shortDescription:
      "Explainable credit decisions based on eligibility, affordability and scoring.",
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
    screenshots: [
      {
        src: "/projects/fraud-detection-engine/cases.jpg",
        label: "Investigation queue",
      },
      {
        src: "/projects/fraud-detection-engine/keycloak.jpg",
        label: "Authentication",
      },
      {
        src: "/projects/fraud-detection-engine/assessments.jpg",
        label: "Assessment history",
      },
      {
        src: "/projects/fraud-detection-engine/assessment-review.jpg",
        label: "Fraud signals",
      },
      {
        src: "/projects/fraud-detection-engine/case-resolved.jpg",
        label: "Case resolution",
      },
      {
        src: "/projects/fraud-detection-engine/case-history.jpg",
        label: "Investigation history",
      },
    ],
    image: "/projects/fraud-detection-engine/cases.jpg",
    title: "Fraud Detection Engine",
    repositoryUrl: "https://github.com/youngnicoJava/fraud-detection-engine",
    category: "Fraud detection",
    shortDescription:
      "Rule-based fraud signals with an investigation queue for analysts.",
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
