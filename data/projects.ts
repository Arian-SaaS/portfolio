import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "cbsai",
    name: "CBSai",
    title: "AI-Powered Enterprise Business Operating System",
    category: "Enterprise SaaS · AI",
    summary:
      "A multi-tenant business operating system that unifies Finance, CRM, HR, Payroll, Inventory, Vendor Management, and Projects behind a single AI-assisted executive layer.",
    heroDescription:
      "CBSai replaces a patchwork of disconnected point solutions with one modular operating system, letting mid-market and enterprise operators run finance, people, and operations from a single source of truth — with an AI layer that reasons across all of it.",
    modules: [
      "Finance",
      "CRM",
      "HR",
      "Payroll",
      "Inventory",
      "Vendor Management",
      "Projects",
      "Executive AI",
    ],
    executiveSummary:
      "CBSai is a multi-tenant enterprise operating system that consolidates the core back-office functions of a growing business — finance, sales, people, payroll, inventory, vendors, and project delivery — into one architecture, with an AI executive layer that can reason across modules instead of being confined to one.",
    businessProblem:
      "Growing businesses typically run seven or eight disconnected SaaS tools to cover finance, CRM, HR, payroll, inventory, and vendor management. Each tool has its own data model, its own login, and its own reporting surface. Leadership ends up assembling a real picture of the business by hand, in spreadsheets, days after the numbers were current. The market need was a single operating system where every module shares one data and permission model, so business questions that span departments can actually be answered.",
    goals: [
      "Give every module a shared data and identity model instead of bolting integrations onto separate products",
      "Support many independent client organizations on one deployment without data leaking across tenants",
      "Let an AI layer reason across modules (e.g. cash position + open sales pipeline + payroll run) rather than being scoped to a single app",
      "Keep the system extensible so new modules can be added without re-architecting existing ones",
    ],
    solutionOverview:
      "CBSai is built around a shared core (identity, tenancy, permissions, audit) with each business module — Finance, CRM, HR, Payroll, Inventory, Vendor Management, Projects — implemented as a bounded domain on top of that core. An Executive AI layer sits above all modules with read access governed by the same permission model as a human user, so it can answer cross-module questions without becoming a separate, ungoverned data path.",
    architectureDecisions: [
      "Multi-tenant data isolation enforced at the data-access layer, not just in application code, so a bug in one module cannot leak another tenant's records",
      "A single role-based access control (RBAC) model shared by every module, so permissions are defined once per tenant rather than per app",
      "Modules communicate through well-defined internal contracts rather than reaching into each other's data directly, which keeps modules independently deployable",
      "The AI layer is treated as a consumer of the same APIs and permission checks as the UI — it cannot see anything a given user role could not otherwise see",
      "Cloud-native deployment with independent scaling per module so a heavy reporting workload in Finance doesn't degrade Payroll processing",
    ],
    technicalChallenges: [
      "Designing a tenancy model that scales from a five-person company to a multi-entity enterprise without a migration",
      "Keeping cross-module AI reasoning fast when the underlying data lives in several logically separate domains",
      "Building an audit and compliance trail that covers financial and HR data to the standard each domain individually requires",
      "Avoiding a monolith while still giving users the feeling of one coherent product, not eight apps stitched together",
    ],
    engineeringDecisions: [
      "Chose a modular monolith over microservices at launch — independent modules, shared deployment — to avoid distributed-systems overhead before the product-market fit was proven",
      "Standardized on one workflow engine for approvals (payroll runs, purchase orders, deal stages) instead of each module inventing its own state machine",
      "Invested early in a permissions and tenancy layer, treating it as core infrastructure rather than a per-feature concern",
    ],
    responsibilities: [
      "Owned the overall system architecture and the shared core (tenancy, RBAC, audit)",
      "Designed the module boundary contracts so Finance, CRM, HR, Payroll, Inventory, and Vendor Management could evolve independently",
      "Led the design of the Executive AI integration layer and its permission model",
      "Directed cloud deployment, scaling, and security posture",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Google Cloud Platform",
      "Cloud Functions",
      "OpenAI API",
      "CI/CD",
    ],
    results: [
      "Consolidated seven-plus point tools into a single operating system for pilot customers",
      "Cut the time to produce a cross-department leadership report from days to minutes",
      "Established a tenancy and permissions foundation that let new modules ship without re-architecting existing ones",
    ],
    lessonsLearned: [
      "Getting tenancy and RBAC right before building feature modules paid for itself many times over as the module count grew",
      "AI features are only trustworthy in an enterprise context if they inherit the same permission boundaries as everything else — that has to be designed in from day one, not retrofitted",
    ],
    timeline: [
      { phase: "Discovery & architecture", detail: "Defined tenancy model, RBAC design, and module boundaries" },
      { phase: "Core platform", detail: "Built shared identity, tenancy, and workflow engine" },
      { phase: "Module rollout", detail: "Shipped Finance, CRM, HR, Payroll, Inventory, Vendor Management, Projects" },
      { phase: "Executive AI", detail: "Layered cross-module AI reasoning on top of the governed core" },
    ],
    screenshots: [
      { label: "Executive dashboard overview" },
      { label: "Cross-module reporting view" },
      { label: "Module navigation and tenant switcher" },
    ],
    diagram: {
      label: "CBSai platform architecture",
      nodes: [
        "Shared core: identity, tenancy, RBAC, audit",
        "Finance / CRM / HR / Payroll / Inventory / Vendor / Projects modules",
        "Executive AI reasoning layer (permission-scoped)",
        "Cloud-native deployment (GCP)",
      ],
    },
    accent: "blue",
  },
  {
    slug: "artemis",
    name: "Artemis",
    title: "Executive AI Intelligence Platform",
    category: "Conversational AI · Voice AI",
    summary:
      "An executive intelligence platform that replaces static dashboards with a conversational, voice-capable AI that reasons across business modules and retains long-term workspace context.",
    heroDescription:
      "Artemis gives executives a single place to ask business questions in natural language or voice, and get answers that draw on live data across finance, sales, and operations — with memory of prior conversations and decisions.",
    executiveSummary:
      "Artemis is an AI layer purpose-built for executive decision-making: conversational and voice-driven, with cross-module business reasoning and long-term context, designed to replace the reflex of building another static dashboard every time leadership has a new question.",
    businessProblem:
      "Traditional dashboards answer the questions they were built to answer, and nothing else. Every new leadership question — 'why did margin drop in the region with the new hires' — becomes a request to an analyst or a new dashboard ticket. Executives needed a way to ask ad hoc, cross-functional questions and get a governed, data-backed answer immediately, in the format that fits how they actually work — including by voice, in meetings.",
    goals: [
      "Answer ad hoc business questions across modules instead of only the metrics a dashboard was designed to show",
      "Support real-time voice interaction suitable for use during meetings, not just typed queries",
      "Maintain long-term context across sessions so the assistant remembers prior decisions and workspace history",
      "Automate recurring executive workflows (briefings, exception alerts) instead of requiring a person to remember to check a dashboard",
    ],
    solutionOverview:
      "Artemis combines a conversational reasoning layer, a real-time voice pipeline, and a long-term memory store scoped to each workspace. Business questions are decomposed into module-level queries, executed against governed data sources, and reassembled into a single coherent answer — with the same access controls a human user would have.",
    architectureDecisions: [
      "Separated the voice transport layer from the reasoning layer, so the underlying AI reasoning can be reused across chat, voice, and automated briefings",
      "Built a long-term context store per workspace, distinct from a single conversation's memory, so the assistant retains relevant history across sessions without re-ingesting everything on every request",
      "Cross-module reasoning is implemented as orchestration over existing governed APIs rather than a direct data lake query, preserving the same permission boundaries as the rest of the platform",
      "Designed for graceful degradation — if voice fails, the same reasoning engine is still available over text",
    ],
    technicalChallenges: [
      "Keeping voice latency low enough to feel conversational in a live meeting setting",
      "Deciding what belongs in long-term memory versus what should be re-fetched fresh from source systems, to avoid the assistant acting on stale context",
      "Orchestrating multi-step reasoning across modules while keeping each intermediate step auditable, which matters when the outputs inform business decisions",
      "Avoiding hallucinated figures by grounding every quantitative answer in a traceable query against real data",
    ],
    engineeringDecisions: [
      "Used OpenAI's Realtime API for the voice pipeline rather than building a custom speech stack, to focus engineering effort on business reasoning quality",
      "Adopted a retrieval-plus-verification pattern: the model proposes what data it needs, the system fetches it from governed sources, and the final answer is only generated once the underlying numbers are confirmed",
      "Built prompt and context management as a first-class engineering discipline (versioned, tested) rather than ad hoc string templates",
    ],
    responsibilities: [
      "Designed the overall AI orchestration architecture and long-term memory model",
      "Built the voice pipeline integration and its fallback-to-text behavior",
      "Defined the grounding/verification pattern used to keep quantitative answers accurate",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "OpenAI API",
      "OpenAI Realtime API",
      "PostgreSQL",
      "Google Cloud Platform",
    ],
    results: [
      "Reduced time-to-answer for ad hoc executive questions from a multi-day analyst request to a live conversation",
      "Enabled voice-driven business queries during live meetings for the first time",
      "Long-term memory reduced repeated context-setting across sessions for recurring executive workflows",
    ],
    lessonsLearned: [
      "Conversational AI in an executive context lives or dies on grounding — a fluent wrong answer is worse than a dashboard, so verification against source data had to be non-negotiable",
      "Voice interfaces need an equally strong text fallback; treating voice as the only path was a mistake caught early in testing",
    ],
    timeline: [
      { phase: "Research", detail: "Evaluated conversational and voice AI approaches for executive workflows" },
      { phase: "Reasoning engine", detail: "Built cross-module orchestration and grounding/verification pattern" },
      { phase: "Voice pipeline", detail: "Integrated real-time voice with fallback to text" },
      { phase: "Memory layer", detail: "Added long-term, workspace-scoped context" },
    ],
    screenshots: [
      { label: "Conversational executive briefing" },
      { label: "Voice session in progress" },
      { label: "Cross-module answer with source trace" },
    ],
    diagram: {
      label: "Artemis AI orchestration architecture",
      nodes: [
        "Voice / chat transport layer",
        "Reasoning & orchestration engine",
        "Governed module APIs (grounding + verification)",
        "Long-term workspace memory store",
      ],
    },
    accent: "cyan",
  },
  {
    slug: "finance-platform",
    name: "Finance Platform",
    title: "Financial Operations & Executive Insights Platform",
    category: "Finance · Analytics",
    summary:
      "A financial operations module covering dashboards, OCR-based document capture, KPI analytics, forecasting, and executive reporting.",
    heroDescription:
      "The Finance Platform turns raw financial documents and transactions into forecasts, KPIs, and executive-ready reporting without manual reconciliation.",
    executiveSummary:
      "A finance module that automates the path from source documents to executive insight: OCR-based capture, standardized KPI tracking, forecasting, and reporting, built to remove manual reconciliation from the monthly close cycle.",
    businessProblem:
      "Finance teams at growing companies spend a disproportionate amount of time on manual data entry and reconciliation — retyping invoices, cross-checking spreadsheets, and rebuilding the same reports every month. That manual work delays the numbers leadership needs to make decisions and introduces avoidable error.",
    goals: [
      "Automate document capture so invoices and statements don't require manual re-entry",
      "Standardize KPI definitions so every report uses the same underlying calculation",
      "Provide forecasting based on historical trends rather than a rebuilt spreadsheet each cycle",
      "Give executives a reporting view that updates continuously instead of at month-end",
    ],
    solutionOverview:
      "Documents are captured and parsed through an OCR pipeline into structured records, which feed a KPI layer with standardized definitions shared across dashboards, forecasts, and exports. Forecasting models run against historical actuals to project forward, and an executive reporting layer packages the results without a manual rebuild step.",
    architectureDecisions: [
      "Separated document capture (OCR/ingestion) from KPI computation, so improving one doesn't require touching the other",
      "Defined KPIs once in a shared calculation layer consumed by every dashboard and export, eliminating the classic problem of two reports disagreeing on the same metric",
      "Built forecasting as a scheduled, versioned process so historical forecasts remain auditable rather than being overwritten",
    ],
    technicalChallenges: [
      "Handling inconsistent source-document formats reliably enough that OCR output could be trusted without manual review of every line",
      "Designing KPI definitions general enough to serve multiple report types without duplicating logic",
      "Balancing forecast responsiveness (reacting to recent trends) against stability (not swinging wildly on noisy data)",
    ],
    engineeringDecisions: [
      "Added a human-in-the-loop review step for low-confidence OCR extractions rather than forcing full automation on day one",
      "Built the KPI layer as a queryable data model rather than pre-baked reports, so new report types could be added without new pipelines",
    ],
    responsibilities: [
      "Designed the data pipeline from document ingestion through KPI computation to reporting",
      "Built the forecasting architecture and its versioning approach",
      "Owned the executive reporting layer and its data visualization strategy",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Google Cloud Platform",
      "Cloud Storage",
      "Cloud Functions",
    ],
    results: [
      "Cut manual data entry time on recurring financial documents substantially",
      "Reduced discrepancies between reports by standardizing KPI definitions in one place",
      "Moved leadership reporting from a month-end event to a continuously current view",
    ],
    lessonsLearned: [
      "Full automation of document capture was less valuable than automation plus a fast human review step for edge cases — trust mattered more than speed alone",
      "Centralizing KPI definitions early avoided a much more expensive migration later, once multiple teams had built reports on inconsistent calculations",
    ],
    timeline: [
      { phase: "Ingestion", detail: "Built OCR-based document capture pipeline" },
      { phase: "KPI layer", detail: "Standardized shared KPI definitions and data model" },
      { phase: "Forecasting", detail: "Added versioned, trend-based forecasting" },
      { phase: "Reporting", detail: "Shipped executive reporting and dashboards" },
    ],
    screenshots: [
      { label: "Financial KPI dashboard" },
      { label: "Document capture and review queue" },
      { label: "Forecast vs. actuals view" },
    ],
    diagram: {
      label: "Finance platform data pipeline",
      nodes: [
        "Document ingestion & OCR",
        "Human-in-the-loop review (low confidence)",
        "Shared KPI calculation layer",
        "Forecasting engine & executive reporting",
      ],
    },
    accent: "blue",
  },
  {
    slug: "crm-platform",
    name: "CRM Platform",
    title: "Sales, Service & Dispatch Operations Platform",
    category: "CRM · Workflow Automation",
    summary:
      "A CRM covering sales pipeline, customer management, work orders, dispatch, marketing, and an AI sales assistant.",
    heroDescription:
      "A CRM built around the full customer lifecycle — from pipeline and marketing through service work orders and field dispatch — with an AI assistant embedded in the sales workflow.",
    executiveSummary:
      "A CRM platform spanning sales pipeline management, customer records, service work orders, field dispatch, marketing, and an AI sales assistant, designed so service and sales share one customer record instead of living in separate systems.",
    businessProblem:
      "Businesses that both sell and service customers (installations, work orders, field visits) typically run a CRM for sales and a completely separate system for dispatch and service. Customer context gets lost at the handoff, and sales reps have no visibility into open service issues that affect a renewal conversation.",
    goals: [
      "Unify sales pipeline and service/dispatch operations around one customer record",
      "Give dispatch and field teams a workflow built for their operations, not a sales tool repurposed for service",
      "Automate routine sales tasks (follow-ups, lead qualification) with an embedded AI assistant",
      "Support marketing campaigns that connect directly to pipeline data instead of a separate tool",
    ],
    solutionOverview:
      "A shared customer and account model underpins sales pipeline, marketing, work orders, and dispatch, so any team sees the same history. An AI sales assistant is embedded directly in the pipeline workflow to draft follow-ups and flag at-risk deals, and dispatch operates as its own scheduling and routing workflow against the same account data.",
    architectureDecisions: [
      "Modeled customers/accounts as a shared entity referenced by sales, service, and marketing rather than duplicated per module",
      "Built dispatch/work-order scheduling as an independent workflow engine so field operations aren't bottlenecked by sales-pipeline logic",
      "Placed the AI sales assistant as an overlay on pipeline data with clearly scoped write actions (drafts, suggestions) rather than autonomous actions on customer records",
    ],
    technicalChallenges: [
      "Reconciling sales-cycle data models (deals, stages) with service-cycle data models (work orders, dispatch) without forcing one to distort the other",
      "Building dispatch scheduling that accounts for real-world constraints (technician location, skill, availability) without over-engineering a generic solver",
      "Keeping the AI assistant's suggestions useful without letting it take actions a rep didn't explicitly approve",
    ],
    engineeringDecisions: [
      "Kept the AI sales assistant strictly suggestion/draft-based at this stage rather than autonomous, based on early user feedback that reps wanted control over customer-facing communication",
      "Built marketing campaign data as a consumer of the shared pipeline model instead of a bolt-on integration",
    ],
    responsibilities: [
      "Designed the shared customer/account data model across sales, service, and marketing",
      "Built the dispatch and work-order scheduling workflow",
      "Directed integration of the AI sales assistant into the pipeline UI",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "Firebase",
      "OpenAI API",
    ],
    results: [
      "Gave sales reps visibility into open service issues before renewal conversations for the first time",
      "Reduced dispatch scheduling time through a purpose-built workflow instead of a repurposed sales tool",
      "AI-drafted follow-ups reduced time spent on routine pipeline admin",
    ],
    lessonsLearned: [
      "Sharing one customer record across sales and service required real data-modeling discipline up front, but eliminated an entire category of handoff bugs later",
      "Users trusted an AI assistant far more once its actions were limited to drafts they approved, rather than autonomous sends",
    ],
    timeline: [
      { phase: "Data model", detail: "Unified customer/account model across sales and service" },
      { phase: "Pipeline & marketing", detail: "Built sales pipeline and connected marketing campaigns" },
      { phase: "Dispatch", detail: "Shipped work-order and field dispatch scheduling" },
      { phase: "AI assistant", detail: "Embedded AI drafting and deal-risk flags into pipeline" },
    ],
    screenshots: [
      { label: "Sales pipeline board" },
      { label: "Dispatch scheduling view" },
      { label: "AI assistant suggestion panel" },
    ],
    diagram: {
      label: "CRM platform architecture",
      nodes: [
        "Shared customer/account model",
        "Sales pipeline & marketing",
        "Work orders & dispatch scheduling",
        "AI sales assistant (suggestion-scoped)",
      ],
    },
    accent: "cyan",
  },
  {
    slug: "hr-payroll",
    name: "HR & Payroll",
    title: "Compliance-Ready HR & Payroll Platform",
    category: "HR · Payroll · Compliance",
    summary:
      "Employee management, payroll workflows, leave management, and approvals built on a compliance-ready, fully audited architecture.",
    heroDescription:
      "An HR and payroll module designed around audit and compliance requirements from day one, with an AI assistant to help HR teams handle routine employee questions.",
    executiveSummary:
      "An HR and payroll platform covering employee records, payroll runs, leave management, and multi-step approvals, architected around audit logging and compliance requirements rather than adding them after the fact.",
    businessProblem:
      "Payroll and HR data carry legal and financial consequences that most internal tools aren't built to handle — every change needs a defensible audit trail, and approval workflows need to reflect real organizational policy, not a generic status field. Businesses often outgrow spreadsheet-based HR processes long before they can justify a full enterprise HR suite.",
    goals: [
      "Build employee management and payroll on an architecture that treats audit logging as a core requirement, not an add-on",
      "Support configurable, multi-step approval workflows (leave, payroll exceptions) that mirror real company policy",
      "Give HR teams an AI assistant for routine questions without exposing sensitive employee data beyond its authorized scope",
      "Keep payroll processing correct and traceable across pay periods",
    ],
    solutionOverview:
      "Every write to employee, payroll, or leave records passes through an audit-logging layer that captures who changed what and why. Approval workflows are modeled as configurable multi-step processes rather than a single status field, and an AI HR assistant answers common employee questions against a permission-scoped subset of HR data.",
    architectureDecisions: [
      "Built audit logging as a cross-cutting concern applied to every write path, rather than a feature added to individual screens",
      "Modeled approvals as a configurable workflow engine so different companies' policies (number of approval steps, who can approve what) don't require code changes",
      "Scoped the AI HR assistant's data access explicitly narrower than a human HR admin's, since its answers are self-service and need a tighter blast radius",
    ],
    technicalChallenges: [
      "Designing an audit trail detailed enough to satisfy compliance review without slowing down every write operation",
      "Making the approval workflow engine flexible enough for different company policies without becoming impossible to reason about",
      "Defining what an AI assistant should and shouldn't be allowed to answer about payroll and personal employee data",
    ],
    engineeringDecisions: [
      "Treated compliance and audit logging as launch-blocking requirements rather than a fast-follow, given the legal exposure of getting payroll wrong",
      "Kept the AI HR assistant read-only against a narrowly scoped data view, with no ability to modify payroll or employee records",
    ],
    responsibilities: [
      "Designed the audit logging architecture applied across employee, payroll, and leave data",
      "Built the configurable multi-step approval workflow engine",
      "Defined the access-scoping model for the AI HR assistant",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "Google Cloud Platform",
      "OpenAI API",
    ],
    results: [
      "Delivered a payroll and HR system with a full audit trail from day one, ahead of compliance review",
      "Replaced spreadsheet-based leave and approval tracking with a configurable workflow",
      "Reduced routine HR question volume to human staff via the scoped AI assistant",
    ],
    lessonsLearned: [
      "Building compliance and audit logging in from the start was significantly cheaper than the alternative of retrofitting it once payroll data already existed in production",
      "An AI assistant over sensitive HR data needs its access model designed before its conversational behavior — the scoping question comes first",
    ],
    timeline: [
      { phase: "Compliance architecture", detail: "Designed audit logging and access model" },
      { phase: "Employee & payroll core", detail: "Built employee management and payroll processing" },
      { phase: "Approvals", detail: "Shipped configurable multi-step approval workflows" },
      { phase: "AI assistant", detail: "Added scoped AI HR assistant for routine questions" },
    ],
    screenshots: [
      { label: "Employee record view" },
      { label: "Payroll run summary" },
      { label: "Approval workflow configuration" },
    ],
    diagram: {
      label: "HR & Payroll compliance architecture",
      nodes: [
        "Employee & payroll core data",
        "Cross-cutting audit logging layer",
        "Configurable approval workflow engine",
        "Scoped AI HR assistant (read-only)",
      ],
    },
    accent: "blue",
  },
  {
    slug: "vendor-inventory",
    name: "Vendor & Inventory",
    title: "Vendor Risk & Inventory Operations Platform",
    category: "Operations · Procurement",
    summary:
      "Vendor management, inventory tracking, risk monitoring, procurement workflows, and business reporting in one operations module.",
    heroDescription:
      "A vendor and inventory module that tracks stock levels, procurement workflows, and vendor risk together, so purchasing decisions account for both cost and reliability.",
    executiveSummary:
      "A vendor and inventory platform unifying stock tracking, procurement workflows, vendor risk monitoring, and business reporting, so operations teams can make purchasing decisions with both inventory and vendor-reliability data in view at once.",
    businessProblem:
      "Inventory systems and vendor management tools are usually separate, which means purchasing decisions get made without visibility into vendor reliability, and vendor risk gets assessed without visibility into current stock exposure. Operations teams needed one view that connects what's in stock to who supplies it and how reliable that supplier has been.",
    goals: [
      "Track inventory levels and movement in real time across locations",
      "Give procurement a workflow that reflects real approval and ordering policy",
      "Monitor vendor risk (delivery reliability, pricing volatility) alongside inventory data, not separately",
      "Provide operational reporting that connects stock, procurement, and vendor performance",
    ],
    solutionOverview:
      "Inventory levels, procurement requests, and vendor performance data share a common data model, so a low-stock alert can be evaluated alongside the reliability of the vendors who supply that item. Procurement workflows route through configurable approval steps, and a reporting layer surfaces the combined view for operations leadership.",
    architectureDecisions: [
      "Linked inventory records directly to vendor performance history rather than treating vendor data as a separate reference table",
      "Built procurement as a workflow (request → approval → order → receipt) rather than a single-step purchase form",
      "Designed risk monitoring as a scoring layer over vendor history (delivery timing, price changes) rather than a manual rating field",
    ],
    technicalChallenges: [
      "Keeping inventory counts accurate across multiple locations and concurrent updates",
      "Defining a vendor risk score that's meaningful without access to external credit or financial data sources",
      "Balancing procurement workflow flexibility against the complexity of configuring it for a new customer",
    ],
    engineeringDecisions: [
      "Started vendor risk scoring from internal signals only (on-time delivery, price stability) rather than waiting on third-party data integrations, to ship value sooner",
      "Modeled procurement as an explicit state machine so every request has a clear, auditable status at all times",
    ],
    responsibilities: [
      "Designed the shared inventory/vendor data model",
      "Built the procurement workflow state machine",
      "Directed the vendor risk scoring approach and operational reporting layer",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Google Cloud Platform",
      "Cloud Functions",
    ],
    results: [
      "Gave operations a single view connecting stock levels to vendor reliability for the first time",
      "Reduced procurement cycle time with a clear, auditable workflow",
      "Surfaced vendor risk signals that previously required manual review of order history",
    ],
    lessonsLearned: [
      "Connecting inventory and vendor data in one model, rather than integrating two separate systems, made the risk-scoring feature possible in the first place",
      "Shipping a risk score from internal signals first, instead of waiting for external data sources, delivered most of the value much sooner",
    ],
    timeline: [
      { phase: "Data model", detail: "Unified inventory and vendor performance model" },
      { phase: "Procurement workflow", detail: "Built request-to-receipt procurement state machine" },
      { phase: "Risk monitoring", detail: "Added vendor risk scoring from internal signals" },
      { phase: "Reporting", detail: "Shipped combined operations reporting" },
    ],
    screenshots: [
      { label: "Inventory tracking dashboard" },
      { label: "Procurement workflow status" },
      { label: "Vendor risk scorecard" },
    ],
    diagram: {
      label: "Vendor & inventory architecture",
      nodes: [
        "Shared inventory / vendor data model",
        "Procurement workflow state machine",
        "Vendor risk scoring layer",
        "Operations reporting",
      ],
    },
    accent: "cyan",
  },
  {
    slug: "card2manage",
    name: "Card2Manage",
    title: "Sports Trading Marketplace",
    category: "Marketplace · Consumer",
    summary:
      "A two-sided marketplace for sports trading card collectors covering listings, inventory, and structured trading workflows.",
    heroDescription:
      "Card2Manage is a marketplace purpose-built for sports card collectors and traders, with an inventory and trading workflow that reflects how collectors actually value and exchange cards.",
    executiveSummary:
      "Card2Manage is a two-sided marketplace for the sports trading card community, covering user collections, listings, inventory management, and a structured trading workflow, rather than a generic classifieds template repurposed for collectibles.",
    businessProblem:
      "Generic marketplace and classifieds platforms don't model how collectors think about their inventory — condition, set, grading, and trade value all matter, and a simple buy/sell listing doesn't support structured trades where both sides offer cards instead of cash. Collectors were using a mix of forums, social media, and general marketplaces with no purpose-built workflow.",
    goals: [
      "Model collections and listings around attributes collectors actually care about (set, condition, grading)",
      "Support structured trading — card-for-card or card-plus-cash — not just simple sales",
      "Build user and inventory management that scales with active traders managing large collections",
      "Keep the trading workflow safe and clear for both parties in a trade",
    ],
    solutionOverview:
      "User collections are modeled with collector-relevant attributes, listings support both sale and trade intents, and a structured trading workflow walks both parties through offer, counter-offer, and confirmation steps rather than relying on informal message-based negotiation.",
    architectureDecisions: [
      "Modeled inventory items with collector-specific attributes (set, condition, grading) as first-class fields rather than free-text descriptions",
      "Built trading as an explicit multi-step workflow (offer, counter, accept) instead of overloading the messaging system to carry deal terms",
      "Designed user inventory management to handle large collections without performance degradation",
    ],
    technicalChallenges: [
      "Designing a trade workflow that's flexible enough for card-for-card, card-plus-cash, and multi-item trades without becoming confusing",
      "Keeping search and browse performant over large, attribute-rich inventories",
      "Balancing trust and safety in peer-to-peer trades without over-engineering a full escrow system at this stage",
    ],
    engineeringDecisions: [
      "Chose an explicit offer/counter-offer state machine for trades over freeform negotiation in chat, so both parties always have a clear, unambiguous record of the current terms",
      "Prioritized attribute-rich inventory modeling early, since it's the foundation both search and trade-matching depend on",
    ],
    responsibilities: [
      "Designed the marketplace and inventory data model",
      "Built the structured trading workflow (offer, counter, confirmation)",
      "Directed the overall platform architecture and technology choices",
    ],
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "Google Cloud Platform",
    ],
    results: [
      "Gave collectors a purpose-built alternative to informal forum and social-media trading",
      "Structured trade workflow reduced disputes compared to informal message-based negotiation",
      "Attribute-rich inventory model enabled meaningfully better search and trade matching",
    ],
    lessonsLearned: [
      "Modeling domain-specific attributes properly from the start (rather than generic listing fields) is what made trade-matching and search actually useful",
      "An explicit trade-workflow state machine removed most of the ambiguity that caused disputes in informal negotiation",
    ],
    timeline: [
      { phase: "Marketplace core", detail: "Built listings, inventory, and user collections" },
      { phase: "Trading workflow", detail: "Shipped structured offer/counter-offer trading" },
      { phase: "Scale & search", detail: "Optimized browse and search over large collections" },
    ],
    screenshots: [
      { label: "Collection inventory view" },
      { label: "Listing detail page" },
      { label: "Trade offer workflow" },
    ],
    diagram: {
      label: "Card2Manage marketplace architecture",
      nodes: [
        "User collections & attribute-rich inventory",
        "Listings (sale & trade intents)",
        "Structured trade workflow engine",
        "Search & browse",
      ],
    },
    accent: "blue",
  },
  {
    slug: "ergonomics-desktop",
    name: "Ergonomics Desktop Application",
    title: "Workplace Ergonomics Desktop Application",
    category: "Desktop Software · Reporting",
    summary:
      "A desktop application for workplace ergonomics assessment, reporting, and workflow optimization.",
    heroDescription:
      "A focused desktop application that helps ergonomics professionals capture assessments, manage data, and generate reports without the overhead of a web platform.",
    executiveSummary:
      "A desktop application built for workplace ergonomics assessment and reporting, designed around the offline-friendly, data-heavy workflow ergonomics professionals actually use in the field and at their desks.",
    businessProblem:
      "Ergonomics assessments generate detailed, structured data that needs to turn into clear reports quickly, but the professionals doing this work often aren't well served by heavyweight web platforms built for other industries. They needed a focused desktop tool matched to their actual workflow — capture data, manage it locally, produce a report — without unnecessary complexity.",
    goals: [
      "Streamline the assessment-to-report workflow so professionals spend less time on data entry and formatting",
      "Give users reliable local data management without depending on constant connectivity",
      "Reduce turnaround time from assessment to a client-ready report",
    ],
    solutionOverview:
      "The application provides structured data capture for ergonomics assessments, local data management, and a reporting engine that turns captured data directly into formatted, client-ready reports.",
    architectureDecisions: [
      "Built as a desktop application to support a reliable offline-first workflow, rather than assuming constant connectivity",
      "Structured assessment data explicitly so reports could be generated directly from it, instead of professionals reformatting data by hand",
    ],
    technicalChallenges: [
      "Designing a data model detailed enough for meaningful ergonomics analysis without making data entry burdensome",
      "Keeping the reporting engine flexible enough for different report formats without duplicating logic per template",
    ],
    engineeringDecisions: [
      "Prioritized a fast, low-friction data entry workflow, since professionals were often capturing data during a live assessment where time is the constraint",
      "Built reporting as a template-driven engine over structured data, so new report formats don't require touching the data model",
    ],
    responsibilities: [
      "Designed the application architecture and data model",
      "Built the reporting engine and report templates",
      "Owned the end-to-end workflow design based on how professionals actually use the tool",
    ],
    techStack: ["TypeScript", "JavaScript", "Node.js", "SQL"],
    results: [
      "Reduced the time from assessment to client-ready report significantly",
      "Gave professionals a reliable offline-friendly workflow suited to real field conditions",
    ],
    lessonsLearned: [
      "Designing the data model around what the report ultimately needs to say, rather than what was easiest to capture, made the reporting engine far simpler",
      "Offline-first design decisions made early avoided much more painful retrofits later",
    ],
    timeline: [
      { phase: "Workflow design", detail: "Mapped the real assessment-to-report workflow with users" },
      { phase: "Data capture", detail: "Built structured, low-friction assessment entry" },
      { phase: "Reporting engine", detail: "Shipped template-driven report generation" },
    ],
    screenshots: [
      { label: "Assessment data entry screen" },
      { label: "Generated report preview" },
    ],
    diagram: {
      label: "Ergonomics application architecture",
      nodes: [
        "Structured assessment data capture",
        "Local data management (offline-first)",
        "Template-driven reporting engine",
      ],
    },
    accent: "cyan",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
