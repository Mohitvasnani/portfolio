// Single source of truth for project content. Pages read from this array
// rather than hardcoding copy, so a project only has to be edited once.

/**
 * A union type: `status` can only ever be one of these four strings.
 * TypeScript will reject a typo like "Live" at compile time, which is the
 * whole point of doing it this way instead of using `string`.
 */
export type ProjectStatus =
  | "live"
  | "in progress"
  | "archived"
  | "public 15 Nov";

/** "case-study" projects get their own subpage. "card" projects don't. */
export type ProjectTier = "case-study" | "card";

/** One block of a case study. Rendered in order on the subpage. */
export type CaseStudySection = {
  heading: string;
  body: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** One line. Shown under the name on a card. */
  tagline: string;
  /** 2-3 lines. The card body. */
  summary: string;
  stack: string[];
  tier: ProjectTier;
  status: ProjectStatus;
  /** Featured projects appear on the home page. */
  featured: boolean;
  /** Sort key. Lower numbers come first. */
  order: number;
  /** Shown on the card and the case-study header. */
  year: string;
  /** `?` means optional. A project with nothing to link to omits this. */
  links?: {
    demo?: string;
    repo?: string;
  };
  /** Shown in place of links when there's a reason there are none. */
  note?: string;
  /** Only present on `tier: "case-study"` projects. */
  caseStudy?: {
    /** The one-sentence version of what the project had to get right. */
    premise: string;
    /** Label/value pairs in the case-study header. */
    meta: { label: string; value: string }[];
    sections: CaseStudySection[];
  };
};

export const projects: Project[] = [
  {
    slug: "cinebook",
    name: "CineBook",
    tagline: "Cinema seat booking backend",
    summary:
      "A booking API built around one hard guarantee: two people must never end up with the same seat. Seats move through a state machine with time-limited holds, and the booking path uses optimistic locking to settle the race.",
    stack: [
      "Java 21",
      "Spring Boot 4",
      "PostgreSQL",
      "Flyway",
      "Testcontainers",
      "Docker",
    ],
    tier: "case-study",
    status: "in progress",
    featured: true,
    order: 1,
    year: "2026",
    // TODO: add the repo link once the repo is public.
    caseStudy: {
      premise:
        "Two people tap the same seat at the same moment. Exactly one of them must get it, and the other must get a clean, honest refusal.",
      meta: [
        { label: "Type", value: "Personal project" },
        { label: "Role", value: "Solo, backend" },
        { label: "Year", value: "2026" },
        { label: "Status", value: "In build" },
      ],
      sections: [
        {
          heading: "Why this problem",
          body: [
            "Seat booking was the cleanest concurrency problem I could find. The domain fits in one sentence, and the failure is impossible to argue with: two bookings on one seat means the system is wrong.",
            "I picked it because I wanted the difficulty to sit in correctness under contention. A long feature list proves nothing I care about. A test that fires two bookings at one seat and watches one of them lose does.",
          ],
        },
        {
          heading: "How it is built",
          body: [
            "A Spring Boot API over PostgreSQL, with the schema owned by Flyway migrations rather than by Hibernate's auto-DDL. Every change to the database is a numbered file in the repo, which means the schema has a history I can read.",
            "A seat moves through three states: AVAILABLE, HELD and BOOKED. A hold carries a time-to-live, so a checkout someone abandons does not strand a seat forever. Expired holds return to AVAILABLE on their own.",
            "The endpoints are deliberately boring: list showtimes, list the seats for a showtime, hold a seat, book a held seat.",
          ],
        },
        {
          heading: "The part that was actually hard",
          body: [
            "Two requests arriving in the same millisecond for the same seat. The naive version reads the seat, sees AVAILABLE, and writes BOOKED. Both requests do that, and both succeed.",
            "I went with optimistic locking: each seat row carries a version, and an update only lands if the version is the one the request read. The second writer finds the version has moved, the write is rejected, and the API returns a conflict rather than a silent double booking.",
            "I chose optimistic over pessimistic locking because most seats in a showtime are never contended, so a lock on every booking would mean paying for the rare case on the common path. Locking hot showtimes specifically can come later.",
            "The test fires two concurrent bookings at one seat and asserts that exactly one wins. It runs against a real PostgreSQL instance through Testcontainers, because an in-memory database has different isolation behaviour and this is a bug that lives in that difference.",
          ],
        },
        {
          heading: "Where it stands",
          body: [
            "In build. The concurrency core is the milestone that matters and everything else on the list exists to support it: Dockerfile, CI running the tests on every push, and OpenAPI docs.",
            "Not in this version: authentication, Redis-backed holds, payments. Each is real work, and each would have pulled attention off the thing I was trying to get right.",
            "The next step is scale. Holds in PostgreSQL work for a single instance, and moving them to Redis is what it would take to run more than one.",
          ],
        },
      ],
    },
  },
  {
    slug: "device-depot",
    name: "Device Depot",
    tagline: "MERN e-commerce application",
    summary:
      "Built solo and deployed: product catalogue, cart, checkout, and an admin side for stock. The goal was getting a whole stack working end to end, which it does.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    tier: "card",
    status: "live",
    featured: true,
    order: 2,
    year: "2026",
    links: {
      demo: "https://device-depot-gilt.vercel.app/",
      repo: "https://github.com/mohitvasnani/DeviceDepot",
    },
  },
  {
    slug: "trainradar",
    name: "TrainRadar",
    tagline: "MSc dissertation project",
    summary:
      "My MSc dissertation, submitted September 2026 at the University of Liverpool. Finished and marked. The write-up is under an academic embargo until mid-November.",
    stack: [],
    // On 15 Nov 2026: change `tier` to "case-study", add the stack back, add
    // the repo link, and add a `caseStudy` block. The page generates itself.
    tier: "card",
    status: "public 15 Nov",
    featured: true,
    order: 3,
    year: "2026",
    note: "Full write-up and code go up on 15 November 2026.",
  },
];

/**
 * `.filter()` returns a new array of the items where the callback is true.
 * It doesn't change `projects`, which is why this is safe to call anywhere.
 * `.sort()` does mutate, so it runs on the copy `filter` just made.
 */
export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const allProjects = [...projects].sort((a, b) => a.order - b.order);

/** Only these slugs get a /projects/[slug] page generated for them. */
export const caseStudies = allProjects.filter(
  (p) => p.tier === "case-study" && p.caseStudy,
);

/** `find` returns the match or `undefined`, which the page turns into a 404. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
