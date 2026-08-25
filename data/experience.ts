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
    type: "experience",
    period: "2023",
    title: "Independent Software Engineer (Freelance)",
    org: "Ergonomic Evaluation Desktop Application",
    description:
      "Cross-platform desktop application for Windows and macOS that runs dynamic ergonomic assessments, delivered end to end as an independent contractor.",
    bullets: [
      "Shipped one codebase to both Windows and macOS, taking on the packaging, installer, and platform-difference work that a desktop target carries over a web one.",
      "Built the assessment as a dynamic evaluation rather than a fixed questionnaire, so the analysis responds to inputs as they are entered instead of only at submission.",
      "Owned the engagement end to end — requirements, build, and delivery — working directly with the client rather than through a team.",
    ],
  },
  {
    type: "experience",
    period: "2024 – 2026",
    title: "Independent Software Engineer (Freelance)",
    org: "LottoIQ — Statistical & ML Forecasting Platform",
    description:
      "A cross-platform analysis application over historical lottery draw data, built for web and the Google Play Store. Several independent statistical algorithms run across the historical record, and their combined output feeds a machine-learning model that produces a forecast set for the next draw.",
    bullets: [
      "Built the analysis pipeline in Python — ingestion and cleaning of the historical draw record, then a set of statistical algorithms whose results are combined into the feature set the model reads.",
      "Shipped a single Dart codebase to both web and Android, so the same interface and analysis views run in a browser and in the Play Store build.",
      "Backed the historical record in PostgreSQL and containerised the services with Docker for reproducible builds between development and deployment.",
      "Launching publicly in 2026, web first with Android following. Algorithm and model detail is withheld until then.",
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
