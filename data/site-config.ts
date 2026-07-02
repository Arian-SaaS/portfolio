export const siteConfig = {
  name: "Reza Salmanian",
  titles: [
    "Full-Stack Software Engineer",
    "Systems Architect",
    "AI Integration Engineer",
  ],
  headline:
    "Full-stack engineer and systems architect building production SaaS platforms, AI-enabled business applications, and secure APIs — from architecture through production release, as founder and lead engineer of CBSai.",
  email: "salmanian18@gmail.com",
  phone: "(916) 277-3273",
  location: "Sacramento, CA",
  social: {
    linkedin: "https://www.linkedin.com/in/reza-sal1",
    github: "https://github.com/Arian-SaaS",
  },
  url: "https://www.rezasalmanian.com",
  description:
    "Portfolio of Reza Salmanian — Full-Stack Software Engineer and Systems Architect, founder of CBSai, specializing in production SaaS platforms, secure API design, and LLM-integrated business applications.",
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
