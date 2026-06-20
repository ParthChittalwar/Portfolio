import type { Project } from "@/types";

/**
 * Featured projects, rendered by the Projects section and individual
 * /projects/:slug detail pages.
 *
 * To add a project: append an object with a unique `slug` (used in the
 * URL), `number` (display index), and the fields below.
 *
 * Optional fields (omit/leave empty and the related UI hides itself):
 *  - `features` / `challenges` — string arrays for the detail page.
 *  - `lessonsLearned` — key takeaways shown in a dedicated section on the detail page.
 *  - `image` — card/detail hero image (import from src/assets/images).
 *  - `images` — additional screenshots for a gallery on the detail page.
 *  - `status` — "completed" | "in-progress" | "planned" (defaults to "completed").
 *  - `timeline` — free-form date range, e.g. "Jan 2026 – Mar 2026".
 *  - `ogImage` — per-project Open Graph / Twitter card image; falls back
 *    to /og-image.png if omitted.
 *
 * Project search (Projects section) matches against `name`, `tech`, and
 * `category`/`problem`/`solution` keywords. Filters are generated from the
 * union of every project's `tech` array — add a new technology here and it
 * automatically becomes a filter option, no UI changes needed.
 */
export const projects: Project[] = [
  {
slug: "portfolio-v4",
number: "01",
name: "Personal Portfolio Website",
category: "Frontend Development",
problem:
"Needed a modern platform to showcase my skills, projects, certifications, and development journey while maintaining strong performance, accessibility, and responsiveness across devices.",
solution:
"Designed and developed a production-ready portfolio using React, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber.",
tech: [
"React",
"TypeScript",
"Tailwind CSS",
"Framer Motion",
"React Three Fiber",
],
github: "https://github.com/ParthChittalwar/Portfolio",
live: "https://portfolio-5yf.pages.dev/",
status: "completed",
timeline: "Jun 2026",

features: [
"Interactive 3D Hero Section",
"Command Palette (Ctrl + K)",
"Project Search and Filtering",
"Dynamic Project Detail Pages",
"Resume Preview and Download",
"Dark and Light Theme Support",
"Responsive Design",
"SEO Optimization",
"Accessibility Enhancements"
],

challenges: [
"Optimizing Three.js performance for different devices",
"Creating responsive layouts across screen sizes",
"Balancing animations with performance",
"Designing a scalable data-driven content architecture"
],

lessonsLearned: [
"Advanced React component architecture",
"Performance optimization techniques",
"Modern frontend project organization",
"Accessibility and SEO best practices",
"Integrating React Three Fiber into production applications"
]
}
,
{
slug: "advanced-workforce-management-system",
number: "02",
name: "Advanced Workforce Management System",
category: "Business Management Platform",

problem:
"Managing employees, assigning tasks, tracking progress, and monitoring workforce productivity becomes increasingly complex as organizations grow. Traditional manual processes often lead to inefficiencies, poor visibility, and administrative overhead.",

solution:
"Built a workforce management platform with admin and employee dashboards, task management, authentication, and progress tracking using React and TypeScript.",

tech: [
"React",
"TypeScript",
"Tailwind CSS",
"Framer Motion",
"React Router",

],

github:
"https://github.com/ParthChittalwar/Advanced-Workforce-Management-System",

live:
"https://advanced-workforce-management-system.pages.dev/",

status: "completed",

timeline: "June 2026",

features: [
"Admin Dashboard",
"Employee Dashboard",
"Employee Management",
"Task Assignment System",
"Task Progress Tracking",
"Authentication System",
"Protected Routes",
"Responsive Design",
"State Management with Zustand",
"Modern UI Architecture"
],

challenges: [
"Designing a scalable application architecture",
"Managing shared application state across dashboards",
"Implementing route protection and access control",
"Building responsive interfaces across devices",
"Creating reusable and maintainable components"
],

lessonsLearned: [
"TypeScript integration in React applications",
"State management using Zustand",
"Protected routing and authentication workflows",
"Component architecture and reusability",
"Scalable frontend application development"
]
}
,
  {
  slug: "democratic-bharat-v2",
  number: "03",
  name: "Democratic Bharat V2.0",
  category: "Civic Technology Platform",

  problem:
    "Many citizens, first-time voters, and rural communities lack access to clear and engaging resources that explain India's electoral process, EVM technology, voting procedures, and democratic participation. Existing information is often fragmented, difficult to understand, or presented in a non-interactive format.",

  solution:
    "Developed a comprehensive civic education platform designed to simplify India's electoral system through interactive simulations, multilingual support, realistic EVM and VVPAT demonstrations, election workflow visualizations, myth-busting modules, and educational content focused on democratic literacy and voter awareness.",

  tech: [
    "React",
    "i18next",
    "Lucide React",
    "Framer Motion",
    "React Router"
  ],

  github: "https://github.com/ParthChittalwar/Democratic-Bharat",

  live: "https://democratic-bharat-voting-awareness-platform.pages.dev/",

  status: "completed",

  timeline: "2026",

  features: [
    "Interactive EVM Simulation",
    "VVPAT Demonstration",
    "Multi-Language Support",
    "Election Type Explorer",
    "Polling Booth Simulation",
    "Voting Process Visualizations",
    "Myths vs Facts Knowledge Center",
    "Election Timeline Explorer",
    "Strong Room Security Simulation",
    "Voting Awareness Modules",
    "Democracy Education Content",
    "Accessibility Features",
    "Civic Awareness Quiz System",
    "Mobile Responsive Design"
  ],

  challenges: [
    "Simplifying complex electoral concepts for non-technical users",
    "Designing realistic EVM workflows while maintaining educational clarity",
    "Creating multilingual content architecture",
    "Balancing visual engagement with factual accuracy",
    "Building accessible experiences for diverse audiences",
    "Presenting politically neutral educational content"
  ],

  lessonsLearned: [
    "Educational product design",
    "Information architecture for complex systems",
    "Multilingual application structure",
    "Interactive visualization techniques",
    "Accessibility-first development",
    "Civic technology and public awareness design",
    "Building scalable React and TypeScript applications"
  ]
},
];

/** Look up a project by its slug — used by the ProjectDetail page. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Unique technologies across all projects, in first-seen order — powers
 * the Projects section filter pills. Add a new `tech` entry to any project
 * above and it appears as a filter automatically.
 */
export function getProjectTechFilters(): string[] {
  const seen = new Set<string>();
  for (const project of projects) {
    for (const tech of project.tech) seen.add(tech);
  }
  return Array.from(seen);
}
