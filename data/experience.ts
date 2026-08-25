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
    org: "Ergonomic Assessment Desktop Application",
    description:
      "A guided assessment application for an ergonomic assessment service company, built with Electron and React and delivered to both Windows and macOS. An assessor works through an evaluation, attaches photographic evidence, captures a signature for sign-off, and exports the finished client report without leaving the application.",
    bullets: [
      "Built the evaluation as a guided flow over dynamic assessment fields, so the form follows the assessment being carried out rather than presenting one fixed questionnaire.",
      "Handled photographic evidence inside the assessment record — capture, attachment, and placement into the generated report next to the findings it supports.",
      "Implemented electronic signature capture, so an assessment can be signed off at the point the work is finished rather than in a separate paper step afterwards.",
      "Built PDF and Word import and export, turning a completed assessment into the client-ready report the company delivers, and reading existing documents back in.",
      "Shipped one Electron and React codebase to Windows and macOS, taking on the packaging, installer, and platform-difference work a desktop target carries over a web one.",
      "Replaced the spreadsheet-driven process the business had been running on — assessment, evidence, sign-off, and reporting now live in one application instead of in files passed between people.",
      "Removed the time and cost of maintaining several separate tools by covering the whole workflow in a single business application, connecting the assessors doing the work through to the executives reading the results.",
      "Made in-home evaluation and on-the-spot decisions possible: an assessment is completed, signed, and turned into its report before the assessor leaves the site.",
    ],
  },
  {
    type: "experience",
    period: "2024",
    title: "Independent Software Engineer (Freelance)",
    org: "LottoIQ — Statistical & ML Forecasting Platform",
    description:
      "A cross-platform analysis application over historical lottery draw data, built for web and the Google Play Store. Several independent statistical algorithms run across the historical record, and their combined output feeds a machine-learning model that produces a forecast set for the next draw.",
    bullets: [
      "Built the analysis pipeline in Python — ingestion and cleaning of the historical draw record, then a set of statistical algorithms whose results are combined into the feature set the model reads.",
      "Shipped a single Dart codebase to both web and Android, so the same interface and analysis views run in a browser and in the Play Store build.",
      "Backed the historical record in PostgreSQL and containerized the services with Docker for reproducible builds between development and deployment.",
      "Not yet launched publicly — algorithm and model detail is withheld until it is.",
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
