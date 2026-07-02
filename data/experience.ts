export type ExperienceEntry = {
  type: "education" | "experience" | "milestone";
  period: string;
  title: string;
  org: string;
  description: string;
  bullets?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    type: "education",
    period: "2022",
    title: "B.S. Computer Science",
    org: "California State University, Sacramento",
    description:
      "Foundational study in computer science, building the base for full-stack engineering and systems architecture.",
  },
  {
    type: "experience",
    period: "2021 – 2024",
    title: "Operations & Internal Tools Lead",
    org: "A1 Residential Improvements",
    description:
      "Designed and built internal scheduling, budget-tracking, and vendor coordination tools to automate manual operational workflows.",
    bullets: [
      "Reduced administrative overhead by 20% and helped keep 95% of projects on schedule with purpose-built internal tools.",
      "Translated field operations requirements into lightweight software workflows, dashboards, and reporting processes that improved project visibility and coordination between crews, vendors, and management.",
    ],
  },
  {
    type: "experience",
    period: "Jan 2022 – Dec 2022",
    title: "Software Developer",
    org: "Card2Manage",
    description:
      "Built and optimized an inventory and transaction management system using Java, JEE, Spring Boot, Spring MVC, and Spring Batch.",
    bullets: [
      "Improved backend processing performance by 20% through query tuning and batch workflow optimization.",
      "Designed and maintained backend data validation and transaction consistency workflows for reliable processing across high-volume operations.",
      "Deployed and supported application components on Microsoft Azure, gaining production experience with cloud environments and deployment validation.",
      "Modernized the desktop UI, simplifying transaction-heavy workflows and reducing user friction.",
    ],
  },
  {
    type: "milestone",
    period: "Mid 2024 – Present",
    title: "Lead Full-Stack Engineer & Architect",
    org: "CBSai SaaS Platform",
    description:
      "Leading architecture and full-stack development for CBSai, an AI-powered multi-tenant SaaS platform supporting SMB workflows across finance, CRM, HR/payroll, vendor management, inventory, OCR, and business intelligence.",
    bullets: [
      "Built the platform on React, Redux, Vite, Node.js, Express.js, and PostgreSQL, supporting secure workspace-isolated data across multiple business clients.",
      "Designed workspace-scoped PostgreSQL data models and secured REST APIs with JWT authentication, RBAC, and input validation to protect multi-tenant data.",
      "Integrated OpenAI and local LLM workflows for document parsing, OCR post-processing, and AI-assisted business analysis, reducing manual data entry time by an estimated 30% across document-heavy workflows.",
      "Established GitHub Actions CI/CD pipelines for automated build, test, and deployment to Google Cloud, improving release consistency and reducing deployment risk.",
      "Implemented backend unit/integration tests, logging, error tracking, and Cloud Run health checks to improve production reliability and accelerate issue diagnosis.",
    ],
  },
];
