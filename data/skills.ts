export type SkillCategory = {
  category: string;
  size: "sm" | "md" | "lg";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    size: "sm",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    category: "Frontend",
    size: "md",
    skills: ["React", "Redux", "Vite", "Tailwind CSS", "Component Architecture"],
  },
  {
    category: "Backend",
    size: "md",
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
    skills: ["PostgreSQL", "Query Optimization", "Multi-Tenant Data Modeling"],
  },
  {
    category: "Cloud & DevOps",
    size: "md",
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
    skills: ["JWT", "OAuth 2.0", "RBAC", "Workspace-Scoped Access Control", "Secure API Design"],
  },
  {
    category: "Tooling & Quality",
    size: "md",
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
