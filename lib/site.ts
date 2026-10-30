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
    "MSc Advanced Computer Science at the University of Liverpool. The work I like best is the kind where getting it right is the difficult part. Concurrency, mostly, and state that cannot be allowed to corrupt.",
  location: "Liverpool, United Kingdom",
  availability: "Open to graduate software engineering roles, UK, from September 2026",
  email: "mohitvasnani47@gmail.com",
  // Must match the filename in public/ exactly. This is also the name it
  // lands under in a recruiter's downloads folder, so it is spelled out.
  cv: "/Mohit-Vasnani-CV.pdf",
  // Path to the portrait in public/, or null for the monogram fallback.
  // Set this the moment the file is in place; nothing else needs changing.
  photo: null as string | null,
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
      "Worked across the stack on a codebase that already had customers and orders in it. Nothing I touched was a blank page.",
      "Shipped changes into the catalogue, search and account flows, on a sprint cadence with code review.",
      "The habit I took away was reading the surrounding code before changing it, which I learned the slow way.",
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
      "Modules include Advanced Geovisualisation and Geographic Data Science, which is where the geospatial and data side of my Python work comes from. Dissertation supervised by Dr David Purser, and written up here as a case study.",
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

// Grouped by what each thing actually is, so a reader can tell a language
// from a framework from a database. Nothing goes in here that does not exist
// yet: Redis and Kubernetes come back when there is work behind them.
export const skills: SkillGroup[] = [
  {
    group: "Languages",
    items: ["Java 21", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Backend frameworks",
    items: ["Spring Boot", "JPA / Hibernate", "Flask", "Node.js", "Express"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Databases and migrations",
    items: ["PostgreSQL", "MongoDB", "Flyway"],
  },
  {
    group: "Testing and CI",
    items: ["JUnit 5", "Testcontainers", "Docker", "GitHub Actions"],
  },
  {
    group: "Data and geospatial",
    items: ["Pandas", "NumPy", "GeoPandas", "Shapely", "Leaflet", "Raster data", "Jupyter"],
  },
];

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
