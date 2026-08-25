export type SkillIcon =
  | "code"
  | "frontend"
  | "server"
  | "database"
  | "cloud"
  | "ai"
  | "security"
  | "tooling";

/**
 * Which accent a category is drawn in. Purely presentational — it gives the
 * grid a rhythm so eight cards do not read as one undifferentiated wall, and
 * it does NOT encode seniority, preference, or how much of each is used.
 */
export type SkillAccent = "cyan" | "blue" | "sand";

export type SkillCategory = {
  category: string;
  size: "sm" | "md" | "lg";
  icon: SkillIcon;
  accent: SkillAccent;
  /** One line on how the category is actually used, shown under the title. */
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    size: "sm",
    icon: "code",
    accent: "cyan",
    blurb: "The day-to-day, across both ends of the stack.",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    category: "Frontend",
    size: "md",
    icon: "frontend",
    accent: "sand",
    blurb: "Interfaces built to survive a growing product, not a demo.",
    skills: ["React", "Redux", "Vite", "Tailwind CSS", "Component Architecture"],
  },
  {
    category: "Backend",
    size: "md",
    icon: "server",
    accent: "cyan",
    blurb: "Services and APIs that carry the business logic.",
    skills: [
      "Node.js",
      "Express.js",
      "Java",
      "JEE",
      "Spring Boot",
      "Spring MVC",
      "Spring Batch",
      "REST APIs",
    ],
  },
  {
    category: "Database",
    size: "sm",
    icon: "database",
    accent: "blue",
    blurb: "Modelling and querying data that belongs to many tenants at once.",
    skills: ["PostgreSQL", "Query Optimization", "Multi-Tenant Data Modeling"],
  },
  {
    category: "Cloud & DevOps",
    size: "md",
    icon: "cloud",
    accent: "blue",
    blurb: "Getting it deployed, observable, and repeatable.",
    skills: [
      "Google Cloud Run",
      "Google Cloud Storage",
      "Microsoft Azure",
      "AWS Fundamentals",
      "Docker",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    category: "AI & Automation",
    size: "md",
    icon: "ai",
    accent: "sand",
    blurb: "LLMs wired into real workflows, not bolted on the side.",
    skills: [
      "OpenAI API",
      "Claude API",
      "LLM Integration",
      "OCR Pipelines",
      "Prompt Engineering",
    ],
  },
  {
    category: "Security",
    size: "sm",
    icon: "security",
    accent: "cyan",
    blurb: "Access control enforced below the application layer.",
    skills: ["JWT", "OAuth 2.0", "RBAC", "Workspace-Scoped Access Control", "Secure API Design"],
  },
  {
    category: "Tooling & Quality",
    size: "md",
    icon: "tooling",
    accent: "blue",
    blurb: "How the work stays reviewable and shippable with other people on it.",
    skills: [
      "Git / GitHub",
      "Jira",
      "Postman",
      "Agile / Scrum",
      "Code Review",
      "Logging & Error Monitoring",
    ],
  },
];
