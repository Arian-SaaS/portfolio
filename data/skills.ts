export type SkillCategory = {
  category: string;
  size: "sm" | "md" | "lg";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming",
    size: "sm",
    skills: ["JavaScript", "TypeScript", "SQL"],
  },
  {
    category: "Frontend",
    size: "md",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend",
    size: "md",
    skills: ["Node.js", "Express", "REST APIs"],
  },
  {
    category: "Database",
    size: "sm",
    skills: ["PostgreSQL", "Firebase"],
  },
  {
    category: "Cloud",
    size: "md",
    skills: [
      "Google Cloud Platform",
      "Firebase",
      "Cloud Storage",
      "Cloud Functions",
      "CI/CD",
    ],
  },
  {
    category: "AI",
    size: "lg",
    skills: [
      "OpenAI API",
      "OpenAI Realtime API",
      "Conversational AI",
      "Voice AI",
      "AI Workflow Automation",
      "Long-Term AI Context",
      "Prompt Engineering",
    ],
  },
  {
    category: "Architecture",
    size: "lg",
    skills: [
      "Enterprise SaaS",
      "Multi-Tenant Systems",
      "RBAC",
      "Cloud-Native Systems",
      "Secure API Design",
      "Workflow Engines",
      "Performance Optimization",
    ],
  },
];
