export const siteConfig = {
  name: "Reza Salmanian",
  titles: [
    "Senior Software Engineer",
    "Software Architect",
    "AI Systems Engineer",
  ],
  headline:
    "I build enterprise software that combines AI, cloud architecture, and scalable SaaS platforms to solve complex business problems.",
  email: "salmanian18@gmail.com",
  location: "United States",
  social: {
    linkedin: "https://linkedin.com/in/reza-salmanian",
    github: "https://github.com/reza-salmanian",
  },
  url: "https://rezasalmanian.dev",
  description:
    "Portfolio of Reza Salmanian — Senior Software Engineer, Software Architect, and AI Systems Engineer specializing in enterprise SaaS, cloud architecture, and AI-driven business platforms.",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "/about", description: "Engineering story and philosophy" },
  { label: "Skills", href: "/skills", description: "Technical skill categories" },
  { label: "Projects", href: "/projects", description: "Featured production systems" },
  { label: "Architecture", href: "/architecture", description: "System design gallery" },
  { label: "Principles", href: "/principles", description: "Engineering principles" },
  { label: "Process", href: "/process", description: "Technical project leadership" },
  { label: "Experience", href: "/experience", description: "Professional timeline" },
  { label: "Resume", href: "/resume", description: "Interactive resume" },
  { label: "Testimonials", href: "/testimonials", description: "Recommendations" },
  { label: "Contact", href: "/contact", description: "Get in touch" },
];
