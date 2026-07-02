export type ExperienceEntry = {
  type: "education" | "experience" | "milestone";
  period: string;
  title: string;
  org: string;
  description: string;
};

export const experience: ExperienceEntry[] = [
  {
    type: "education",
    period: "Earlier",
    title: "Computer Science / Software Engineering Education",
    org: "University",
    description:
      "Foundational study in computer science and software engineering, building the base for architecture-first, systems-level thinking.",
  },
  {
    type: "experience",
    period: "Early career",
    title: "Software Engineer",
    org: "Enterprise software teams",
    description:
      "Built full-stack features for production business applications, developing the fundamentals of API design, database modeling, and collaborative engineering practice.",
  },
  {
    type: "milestone",
    period: "Mid career",
    title: "Transition to Architecture & Technical Leadership",
    org: "Enterprise SaaS products",
    description:
      "Moved from feature delivery into system architecture and technical leadership — owning multi-tenant design, RBAC, and cloud deployment strategy for growing SaaS platforms.",
  },
  {
    type: "milestone",
    period: "Recent",
    title: "AI Systems Engineering",
    org: "CBSai · Artemis",
    description:
      "Led the design of AI-native enterprise systems — conversational and voice AI, cross-module business reasoning, and long-term AI context — integrated into governed, multi-tenant platforms.",
  },
  {
    type: "experience",
    period: "Ongoing",
    title: "Senior Software Engineer / Software Architect / AI Systems Engineer",
    org: "Independent & product engineering",
    description:
      "Designing and building enterprise operating systems, executive AI platforms, and business-critical modules end-to-end — from architecture through production support.",
  },
];
