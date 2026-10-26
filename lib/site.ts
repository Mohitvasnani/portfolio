// Everything about me that isn't a project. Pages read from here so a fact
// only ever has to be corrected in one place.

/**
 * The site's own origin, used for metadataBase, the sitemap and robots.txt.
 *
 * VERCEL_PROJECT_PRODUCTION_URL is injected by Vercel automatically. There is
 * nothing to create in the dashboard. It holds the production domain with no
 * protocol (e.g. "portfolio-abc.vercel.app"), and it follows a custom domain
 * once one is attached, so this keeps working after the domain changes.
 *
 * NEXT_PUBLIC_SITE_URL overrides it if a value ever has to be forced.
 * Locally neither is set, so it falls back to localhost.
 */
function resolveSiteUrl(): string {
  const override = process.env.NEXT_PUBLIC_SITE_URL;
  if (override) return override.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const site = {
  name: "Mohit Vasnani",
  role: "Software Engineer",
  // The positioning line. Two languages, both real: Java for services,
  // Python for data and geospatial. Neither is framed as the fallback, and
  // neither is the whole headline.
  positioning:
    "Backend engineer. Java and Spring Boot for services that have to stay correct, Python for data and geospatial work.",
  intro:
    "MSc Advanced Computer Science at the University of Liverpool. I like the problems where correctness is the hard part, not the feature list: concurrency, state that must not corrupt, systems that stay honest under load.",
  location: "Liverpool, United Kingdom",
  availability: "Open to graduate software engineering roles, UK, from September 2026",
  email: "mohitvasnani47@gmail.com",
  // Must match the filename in public/ exactly. This is also the name it
  // lands under in a recruiter's downloads folder, so it is spelled out.
  cv: "/Mohit-Vasnani-CV.pdf",
  url: resolveSiteUrl(),
} as const;

export const socials = [
  { label: "GitHub", href: "https://github.com/mohitvasnani", handle: "mohitvasnani" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohit-vasnani-6b11041b8",
    handle: "Mohit Vasnani",
  },
  { label: "Email", href: `mailto:${site.email}`, handle: site.email },
] as const;

/** The strip under the hero. Facts, deliberately not vanity metrics. */
export const facts = [
  { label: "Based in", value: "Liverpool, UK" },
  { label: "Studying", value: "MSc Advanced Computer Science" },
  { label: "Works in", value: "Java · Spring Boot · Python" },
  { label: "Available", value: "September 2026" },
] as const;

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "NETPARAM Technologies",
    title: "Full-Stack Developer Intern",
    period: "Feb 2024 — Jul 2024",
    location: "Jaipur, India",
    summary:
      "Six months in a five-person agile team on Dealkarts, a live consumer marketplace selling electronics, fashion and handicrafts across India. It is still trading.",
    points: [
      "Worked across the stack on a real commercial codebase with real customers and real orders, not a greenfield project where mistakes cost nothing.",
      "Shipped into multi-category catalogue, search and account flows, to a sprint cadence with code review.",
      "Learned to read someone else's code before changing it, and that the small, boring, correct change beats the clever one.",
    ],
    stack: ["JavaScript", "React", "Node.js", "REST APIs", "Git"],
  },
];

export type Education = {
  institution: string;
  qualification: string;
  period: string;
  location: string;
  detail?: string;
};

export const education: Education[] = [
  {
    institution: "University of Liverpool",
    qualification: "MSc Advanced Computer Science",
    period: "2025 — 2026",
    location: "Liverpool, UK",
    detail:
      "Modules include Advanced Geovisualisation and Geographic Data Science, which is where the geospatial and data side of my Python work comes from. Dissertation supervised by Dr David Purser; write-up published here after 15 November 2026.",
  },
  {
    institution: "JECRC University",
    qualification: "BTech Computer Science (Cyber Security)",
    period: "2020 — 2024",
    location: "Jaipur, India",
  },
];

export const certifications = [
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council" },
  { name: "Certified Network Defender (CND)", issuer: "EC-Council" },
  { name: "Certified in Cybersecurity (CC)", issuer: "EC-Council" },
] as const;

export type SkillGroup = { group: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    group: "Backend",
    items: ["Java 21", "Spring Boot", "REST APIs", "JPA / Hibernate", "Flyway", "JUnit 5"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "SQL", "MongoDB", "Redis"],
  },
  {
    group: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Platform",
    items: ["Docker", "GitHub Actions", "Kubernetes", "Vercel"],
  },
  {
    group: "Python",
    items: ["Python", "Flask", "Pandas", "NumPy", "Jupyter"],
  },
  {
    group: "Geospatial",
    items: ["GeoPandas", "Shapely", "Leaflet", "Raster data", "Shapefiles"],
  },
];

/** The marquee strip. Short labels only, it scrolls past quickly. */
export const marquee = [
  "Java 21",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "TypeScript",
  "Next.js",
  "React",
  "Redis",
  "GitHub Actions",
  "Kubernetes",
  "Tailwind CSS",
  "Python",
  "Pandas",
  "GeoPandas",
  "Flask",
] as const;

export const tools = [
  { name: "IntelliJ IDEA", use: "Java and Spring", href: "https://www.jetbrains.com/idea/" },
  { name: "VS Code", use: "Everything web", href: "https://code.visualstudio.com/" },
  { name: "PostgreSQL", use: "The database I reach for", href: "https://www.postgresql.org/" },
  { name: "Docker", use: "Local parity with CI", href: "https://www.docker.com/" },
  { name: "DBeaver", use: "Reading the SQL JPA writes", href: "https://dbeaver.io/" },
  { name: "Obsidian", use: "Decisions and build logs", href: "https://obsidian.md/" },
  { name: "Claude Code", use: "Pairing, never autopilot", href: "https://claude.com/claude-code" },
  { name: "Vercel", use: "This site", href: "https://vercel.com/" },
] as const;
