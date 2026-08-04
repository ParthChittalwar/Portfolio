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
"Designed and developed a production-ready portfolio using React, TypeScript, Tailwind CSS, Framer Motion, and React Three Fiber, incorporating advanced UI animations, interactive 3D elements, command palette navigation, dynamic content management, responsive design, and modern frontend best practices.",
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
  slug: "sketchboard-pro",
  number: "02",
  name: "SketchBoard Pro",
  category: "Productivity & Collaboration Platform",

  problem:
    "Most online whiteboard platforms are either expensive, overloaded with unnecessary features, or require constant internet connectivity. Educators, students, developers, and teams need a fast, lightweight, open-source whiteboard that supports drawing, presentations, note-taking, brainstorming, and future AI-powered workflows.",

  solution:
    "Built SketchBoard Pro, a modern infinite whiteboard application featuring rich drawing tools, presentation utilities, offline capabilities, export options, and an extensible architecture designed for optional AI-powered productivity features.",

  tech: [
    "TypeScript",
    "HTML5 Canvas",
    "Tailwind CSS",
    "Framer Motion",
    "Canvas API",
    "TanStack Router",
    "File API",
   "PDF.js",
  "IndexedDB",
  "Local Storage",
  ],

  github: "https://github.com/ParthChittalwar/SketchBoard-Pro",

  live: "https://sketchboard-pro.pages.dev/",

  status: "completed",

  timeline: "July 2026",

  features: [
    "Infinite Canvas",
    "Multi-page Whiteboards",
    "Layers",
    "Undo & Redo",
    "Zoom & Pan",
    "Grid & Snap to Grid",
    "Selection Tools",
    "Shapes, Text & Sticky Notes",
    "Image & SVG Support",
    "PDF Import",
    "PNG, JPG, SVG & PDF Export",
    "Presentation Mode",
    "Laser Pointer & Spotlight",
    "Graph Paper & Coordinate Grid",
    "White & Chalkboard Themes",
    "Timer & Stopwatch",
    "Classroom Templates",
    "Autosave",
    "Offline Support",
    "Keyboard Shortcuts",
    "Dark Mode",
    "Responsive Design",
    "AI-Ready Architecture",
    "OCR & Diagram Generation (Planned)"
  ],

  challenges: [
    "Designing an infinitely scalable canvas without sacrificing performance",
    "Managing complex drawing state and interaction workflows",
    "Building responsive controls for desktop and tablet users",
    "Creating a modular architecture for future AI integrations",
    "Supporting multiple export formats efficiently",
    "Maintaining smooth rendering with large whiteboard content"
  ],

  lessonsLearned: [
    "Canvas API fundamentals and rendering optimization",
    "Large-scale React application architecture",
    "State management for complex interactive interfaces",
    "Performance optimization for graphics-intensive applications",
    "Designing extensible feature-driven frontend systems",
    "Building production-ready developer tooling with Vite and TypeScript",
    "Creating scalable foundations for future AI-powered features"
  ]
}
,
{
  slug: "novaos-operating-system",

  number: "03",

  name: "NovaOS Operating System",

  category: "Systems Programming & Operating Systems",

  problem:
    "Understanding operating system internals requires hands-on implementation rather than theoretical study. Existing educational projects often hide low-level concepts behind abstractions, making it difficult to explore memory management, interrupt handling, scheduling, and kernel architecture from first principles.",

  solution:
    "Developed NovaOS, a modular 64-bit operating system from scratch using C++20 and NASM Assembly. The kernel boots through the Limine boot protocol, implements memory management, interrupt handling, multitasking, a virtual file system, device drivers, and an interactive shell running on bare-metal through QEMU.",

  tech: [
    "C++20",
    "NASM Assembly",
    "UEFI",
    "Limine Boot Protocol",
    "x86_64",
    "QEMU",
    "CMake",
    "Ninja"
  ],

  github:
    "https://github.com/ParthChittalwar/NovaOS-Operating-System",

  live: "",

  status: "completed",

  timeline: "July 2026",

  features: [
    "64-bit Higher-Half Kernel",
    "UEFI Boot using Limine",
    "GDT, IDT & TSS Implementation",
    "Exception & Interrupt Handling",
    "Kernel Panic Screen",
    "Bitmap Physical Memory Manager",
    "Kernel Heap Allocator",
    "8259 PIC Driver",
    "PIT Timer Driver",
    "PS/2 Keyboard Driver",
    "Framebuffer Console",
    "Preemptive Round-Robin Scheduler",
    "Context Switching",
    "Virtual File System (RAM Disk)",
    "Interactive Kernel Shell",
    "Bare-Metal Execution in QEMU"
  ],

  challenges: [
    "Understanding x86_64 architecture and CPU initialization",
    "Implementing interrupt and exception handling safely",
    "Managing physical memory without an operating system",
    "Building a custom kernel heap allocator",
    "Implementing multitasking using assembly context switching",
    "Debugging low-level kernel crashes with limited tooling",
    "Maintaining a modular kernel architecture"
  ],

  lessonsLearned: [
    "Operating system architecture fundamentals",
    "Low-level C++ systems programming",
    "x86_64 CPU initialization and memory management",
    "Assembly language integration with C++",
    "Interrupt-driven kernel development",
    "Process scheduling concepts",
    "Kernel debugging and systems programming best practices",
    "Bootloader and UEFI firmware workflow"
  ]
},
  {
  slug: "democratic-bharat-v2",
  number: "04",
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
    "React Router",
    "Responsive Design",
  "Accessibility (WCAG)"
  ],

  github: "https://github.com/ParthChittalwar/Advanced-Indian-EVM-Simulator-",

  live: "https://advanced-indian-evm-simulator.pages.dev/",

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
  ],

},

{
  slug: "ai-interview-preparation-platform",

  number: "05",

  name: "AI Interview Preparation Platform",

  category: "Full Stack AI SaaS Platform",

  problem:
    "Job seekers often struggle to prepare for interviews because generic interview questions fail to match their resume, target role, and required skills. They need a personalized interview preparation system that generates technical questions, behavioral questions, skill-gap analysis, preparation roadmaps, and downloadable interview reports.",

  solution:
    "Developed a full-stack AI Interview Preparation Platform that analyzes a user's resume and target job description using Google Gemini AI to generate personalized interview reports, technical and behavioral questions, skill-gap analysis, match score, preparation roadmap, and downloadable PDF reports. The platform features secure authentication, cloud deployment, and a responsive modern user interface.",

  tech: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB Atlas",
    "Mongoose",
    "JWT",
    "Axios",
    "Google Gemini AI",
    "Puppeteer",
    "Render"
  ],

  github:
    "https://github.com/ParthChittalwar/Interview-Intelligence",

  live:
    "https://interview-intelligence-8l7z.onrender.com/login",

  status: "completed",

  timeline: "August 2026",

  features: [
    "JWT Authentication using HTTP-only Cookies",
    "User Registration & Login",
    "Resume Upload (PDF/DOCX)",
    "AI-Powered Interview Report Generation",
    "Personalized Technical Questions",
    "Behavioral Interview Questions",
    "Skill Gap Analysis",
    "AI Match Score",
    "Personalized Preparation Roadmap",
    "Interview History Dashboard",
    "Protected Routes",
    "Resume PDF Generation",
    "Responsive Design",
    "Render Cloud Deployment"
  ],

  challenges: [
    "Integrating Google Gemini AI for structured interview generation",
    "Parsing uploaded resumes and extracting useful information",
    "Managing authentication securely using HTTP-only cookies",
    "Generating downloadable PDF reports using Puppeteer",
    "Handling asynchronous AI requests and long-running operations",
    "Deploying a full-stack MERN application with MongoDB Atlas on Render"
  ],

  lessonsLearned: [
    "Building production-ready MERN applications",
    "REST API architecture with Express.js",
    "JWT authentication and secure cookie handling",
    "MongoDB schema design using Mongoose",
    "Integrating Large Language Models into web applications",
    "Generating PDFs using Puppeteer",
    "Deploying frontend and backend services on Render",
    "Managing environment variables for production deployments"
  ]
}


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
