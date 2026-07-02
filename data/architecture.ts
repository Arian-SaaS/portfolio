export type ArchitectureDiagram = {
  slug: string;
  title: string;
  description: string;
  nodes: string[];
  size: "sm" | "md" | "lg";
};

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    slug: "enterprise-saas",
    title: "Enterprise SaaS Architecture",
    description:
      "The shared shape behind CBSai and its modules: a governed core wrapping independently deployable business domains.",
    nodes: [
      "Client (web)",
      "API gateway",
      "Module services (Finance, CRM, HR, ...)",
      "Shared data layer",
    ],
    size: "lg",
  },
  {
    slug: "multi-tenant",
    title: "Multi-Tenant Architecture",
    description:
      "Tenant isolation enforced at the data-access layer so no application-level bug can leak one customer's data into another's.",
    nodes: ["Tenant resolver", "Scoped data access layer", "Per-tenant storage boundary"],
    size: "md",
  },
  {
    slug: "auth-flow",
    title: "Authentication Flow",
    description:
      "Session issuance, token refresh, and identity propagation across services in a multi-tenant system.",
    nodes: ["Login / identity provider", "Session issuance", "Token verification per request"],
    size: "sm",
  },
  {
    slug: "rbac",
    title: "Role-Based Permissions",
    description:
      "A single permissions model shared by every module and by the AI layer, so access is defined once per tenant.",
    nodes: ["Roles & policies", "Permission check middleware", "Module & AI access enforcement"],
    size: "md",
  },
  {
    slug: "ai-orchestration",
    title: "AI Orchestration",
    description:
      "Cross-module AI reasoning implemented as orchestration over governed APIs, inheriting existing permission boundaries.",
    nodes: ["User query", "Reasoning/orchestration layer", "Governed module APIs", "Grounded response"],
    size: "lg",
  },
  {
    slug: "voice-pipeline",
    title: "Voice AI Pipeline",
    description:
      "Real-time voice transport decoupled from the reasoning engine so the same intelligence serves chat, voice, and automated briefings.",
    nodes: ["Real-time voice transport", "Speech-to-intent", "Reasoning engine", "Voice response"],
    size: "md",
  },
  {
    slug: "rest-api",
    title: "REST API Architecture",
    description:
      "Consistent resource modeling, versioning, and permission enforcement across services.",
    nodes: ["Resource routes", "Validation & auth middleware", "Service layer", "Data layer"],
    size: "sm",
  },
  {
    slug: "database-relationships",
    title: "Database Relationships",
    description:
      "High-level entity relationships showing tenancy boundaries and shared reference data across modules.",
    nodes: ["Tenant", "Core entities (user, account)", "Module-owned entities"],
    size: "md",
  },
  {
    slug: "cloud-deployment",
    title: "Cloud Deployment",
    description:
      "Independent scaling per module on cloud-native infrastructure, with CI/CD from commit to production.",
    nodes: ["CI/CD pipeline", "Cloud Functions / services", "Cloud storage", "Monitoring & scaling"],
    size: "lg",
  },
];
