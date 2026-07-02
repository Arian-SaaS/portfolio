export type TimelineEntry = {
  phase: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  summary: string;
  heroDescription: string;
  modules?: string[];
  /** Set only for projects with a real, public live product/demo link. */
  liveUrl?: string;
  executiveSummary: string;
  businessProblem: string;
  goals: string[];
  solutionOverview: string;
  architectureDecisions: string[];
  technicalChallenges: string[];
  engineeringDecisions: string[];
  responsibilities: string[];
  techStack: string[];
  results: string[];
  lessonsLearned: string[];
  timeline: TimelineEntry[];
  screenshots: { label: string }[];
  diagram: { label: string; nodes: string[] };
  accent: "blue" | "cyan";
};
