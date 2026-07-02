export type ArchitectureIcon =
  | "layers"
  | "users"
  | "key"
  | "shield"
  | "bot"
  | "audio"
  | "webhook"
  | "database"
  | "cloud";

export type ArchitectureNode = {
  label: string;
  detail: string;
  tech?: string[];
};

export type ArchitectureDiagram = {
  slug: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  size: "sm" | "md" | "lg";
  icon: ArchitectureIcon;
};

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS Architecture",
    description:
      "The shared shape behind CBSai and its modules: a governed core wrapping independently deployable business domains.",
    nodes: [
      {
        label: "Client (web)",
        detail: "React/Redux SPA — the single entry point for every module.",
        tech: ["React", "Redux", "Vite"],
      },
      {
        label: "API gateway",
        detail: "Validates JWTs and routes requests to the right module service.",
        tech: ["Express.js", "JWT"],
      },
      {
        label: "Module services",
        detail: "Finance, CRM, HR, and more — independently deployable domains sharing one core.",
        tech: ["Node.js", "REST APIs"],
      },
      {
        label: "Shared data layer",
        detail: "Workspace-scoped PostgreSQL, isolated per tenant.",
        tech: ["PostgreSQL"],
      },
    ],
    size: "lg",
    icon: "layers",
  },
  {
    slug: "multi-tenant",
    title: "Multi-Tenant Architecture",
    description:
      "Tenant isolation enforced at the data-access layer so no application-level bug can leak one customer's data into another's.",
    nodes: [
      {
        label: "Tenant resolver",
        detail: "Resolves the active workspace from the auth token before any query runs.",
        tech: ["JWT"],
      },
      {
        label: "Scoped data access layer",
        detail: "Every query is automatically scoped to the caller's workspace.",
        tech: ["PostgreSQL", "RBAC"],
      },
      {
        label: "Per-tenant storage boundary",
        detail: "No query can cross a tenant boundary, even with a bug in application code.",
        tech: ["PostgreSQL"],
      },
    ],
    size: "md",
    icon: "users",
  },
  {
    slug: "auth-flow",
    title: "Authentication Flow",
    description:
      "Session issuance, token refresh, and identity propagation across services in a multi-tenant system.",
    nodes: [
      {
        label: "Login / identity provider",
        detail: "Credentials exchanged for a signed session token.",
        tech: ["OAuth 2.0", "JWT"],
      },
      {
        label: "Session issuance",
        detail: "Short-lived access token plus refresh token issued per session.",
        tech: ["JWT"],
      },
      {
        label: "Token verification per request",
        detail: "Every API call verifies signature, expiry, and workspace scope.",
        tech: ["JWT", "Express.js"],
      },
    ],
    size: "sm",
    icon: "key",
  },
  {
    slug: "rbac",
    title: "Role-Based Permissions",
    description:
      "A single permissions model shared by every module and by the AI layer, so access is defined once per tenant.",
    nodes: [
      {
        label: "Roles & policies",
        detail: "Roles and permissions defined once per tenant, not per module.",
        tech: ["RBAC"],
      },
      {
        label: "Permission check middleware",
        detail: "Every request passes through the same permission check, regardless of module.",
        tech: ["Express.js", "RBAC"],
      },
      {
        label: "Module & AI access enforcement",
        detail: "The AI layer is treated as just another caller — same permission checks apply.",
        tech: ["RBAC", "OpenAI API"],
      },
    ],
    size: "md",
    icon: "shield",
  },
  {
    slug: "ai-orchestration",
    title: "AI Orchestration",
    description:
      "Cross-module AI reasoning implemented as orchestration over governed APIs, inheriting existing permission boundaries.",
    nodes: [
      {
        label: "User query",
        detail: "A natural-language question from a user or workflow trigger.",
      },
      {
        label: "Reasoning / orchestration layer",
        detail: "Breaks the query into module-level requests and grounds the answer in real data.",
        tech: ["OpenAI API", "Claude API"],
      },
      {
        label: "Governed module APIs",
        detail: "Same permission-checked APIs the UI uses — no separate ungoverned data path.",
        tech: ["REST APIs", "RBAC"],
      },
      {
        label: "Grounded response",
        detail: "Final answer traced back to the real records that produced it.",
        tech: ["LLM Integration"],
      },
    ],
    size: "lg",
    icon: "bot",
  },
  {
    slug: "voice-pipeline",
    title: "Voice AI Pipeline",
    description:
      "Real-time voice transport decoupled from the reasoning engine so the same intelligence serves chat, voice, and automated briefings.",
    nodes: [
      {
        label: "Real-time voice transport",
        detail: "Handles the live audio stream independently of the reasoning engine.",
      },
      {
        label: "Speech-to-intent",
        detail: "Transcribes and extracts intent before handing off to reasoning.",
        tech: ["OCR Pipelines"],
      },
      {
        label: "Reasoning engine",
        detail: "The same orchestration layer used for chat and automated briefings.",
        tech: ["OpenAI API"],
      },
      {
        label: "Voice response",
        detail: "Synthesized reply, with graceful fallback to text if voice fails.",
      },
    ],
    size: "md",
    icon: "audio",
  },
  {
    slug: "rest-api",
    title: "REST API Architecture",
    description:
      "Consistent resource modeling, versioning, and permission enforcement across services.",
    nodes: [
      {
        label: "Resource routes",
        detail: "Consistent resource-oriented routing across every service.",
        tech: ["Express.js"],
      },
      {
        label: "Validation & auth middleware",
        detail: "Input validation and JWT verification before any handler runs.",
        tech: ["JWT"],
      },
      {
        label: "Service layer",
        detail: "Business logic, decoupled from the HTTP and data layers.",
        tech: ["Node.js"],
      },
      {
        label: "Data layer",
        detail: "Query building and schema access, isolated from the service layer.",
        tech: ["PostgreSQL"],
      },
    ],
    size: "sm",
    icon: "webhook",
  },
  {
    slug: "database-relationships",
    title: "Database Relationships",
    description:
      "High-level entity relationships showing tenancy boundaries and shared reference data across modules.",
    nodes: [
      {
        label: "Tenant",
        detail: "The root scoping entity every other record hangs off of.",
        tech: ["PostgreSQL"],
      },
      {
        label: "Core entities",
        detail: "User and account records — shared reference data used across every module.",
        tech: ["PostgreSQL"],
      },
      {
        label: "Module-owned entities",
        detail: "Data owned exclusively by one module, referencing the shared core.",
        tech: ["PostgreSQL"],
      },
    ],
    size: "md",
    icon: "database",
  },
  {
    slug: "cloud-deployment",
    title: "Cloud Deployment",
    description:
      "Independent scaling per module on cloud-native infrastructure, with CI/CD from commit to production.",
    nodes: [
      {
        label: "CI/CD pipeline",
        detail: "Automated build, test, and deploy on every push.",
        tech: ["GitHub Actions", "CI/CD"],
      },
      {
        label: "Cloud Functions / services",
        detail: "Independently scalable compute per module.",
        tech: ["Google Cloud Run"],
      },
      {
        label: "Cloud storage",
        detail: "Object storage for documents and OCR pipeline inputs.",
        tech: ["Google Cloud Storage"],
      },
      {
        label: "Monitoring & scaling",
        detail: "Health checks, logging, and error tracking driving autoscaling.",
        tech: ["Docker"],
      },
    ],
    size: "lg",
    icon: "cloud",
  },
];
