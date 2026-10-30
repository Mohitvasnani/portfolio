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
  | "complete"
  | "archived";

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
    tagline: "Live positions for trains that do not report them",
    summary:
      "A live map of GB trains, which broadcast nothing. The system interpolates between timing reports and places each service along the real curved track from OpenStreetMap. Median error 644 m across 1,205 measured positions.",
    stack: [
      "Python",
      "Flask",
      "React",
      "Leaflet",
      "OSMnx",
      "NetworkX",
      "Shapely",
      "pytest",
    ],
    tier: "case-study",
    status: "live",
    featured: true,
    order: 3,
    year: "2026",
  
    links: {
    demo: "https://trainradar-uk.vercel.app/",
    repo: "https://github.com/mohitvasnani/trainradar",
    },
   
    caseStudy: {
      premise:
        "Aircraft broadcast where they are. British trains do not. A train is recorded only when it passes a reporting point, so anything that draws one on a map has to work out the position in between, and then be honest about how wrong it is.",
      meta: [
        { label: "Type", value: "MSc dissertation" },
        { label: "Role", value: "Solo" },
        { label: "Year", value: "2026" },
        { label: "Status", value: "Submitted and marked" },
      ],
      sections: [
        {
          heading: "Why this problem",
          body: [
            "Flightradar24 is not doing anything clever. Aircraft transmit their own position several times a second over ADS-B, and the site draws what it is handed. Nothing equivalent exists on the GB rail network. A train is logged when it passes a reporting point, a signal box or a station, and between those points nobody knows where it is.",
            "So a train map cannot display a position. It has to estimate one.",
            "The academic name for this is map matching, and this is the awkward version of it. Most of the literature assumes a GPS fix every second or two, so the vehicle barely moves between readings. Realtime Trains reports can be minutes and several kilometres apart.",
          ],
        },
        {
          heading: "Getting the track right",
          body: [
            "Geometry comes from OpenStreetMap through OSMnx, and the first version was broken in a way that took a while to see.",
            "OSMnx simplifies a graph as it loads, merging runs of degree-two nodes into single edges. For road routing that is the sensible default. For railways it destroys the thing you need, because those intermediate vertices are what hold a curve together. With simplification on, the Liverpool to Manchester corridor came apart into 61 disconnected components and only 4 of its 14 legs could be routed at all.",
            "Turning it off took the graph from 5,587 nodes to 76,303 and made 12 of the 14 legs routable. Thirteen times the data in exchange for the real shape of the track, which is the whole point of the project.",
            "The second problem only showed up once real data met the code. The OSM extract includes Manchester Metrolink, and trams share corridors with trains, so routes were picking up tram track and inventing loops no train would take. A filter at graph-build time keeps heavy rail and drops trams, light rail, subway, monorail and funicular. The phantom loops went with them.",
          ],
        },
        {
          heading: "Deciding when not to draw a train",
          body: [
            "Three checks decide whether a leg is trustworthy enough to put a train on.",
            "Stations arrive as a single latitude and longitude, and that point almost never sits on the track graph. Usually it is on the platform or the station building. So it gets snapped to the nearest graph node, and the snap is trusted only within 300 metres. That threshold came from real cases rather than instinct: Ryder Brow snaps at 13 metres and is kept, Brinnington was snapping to a node 1,276 metres away and gets rejected rather than starting a train on the wrong piece of railway.",
            "Once a route exists, its length along the track is divided by the straight-line distance between its endpoints. Legs that were obviously right came out between 0.98 and 1.20. Legs that had doubled back or wandered through a siding came out at 1.74, 3.3 and 5.6. There is clear air between those two groups, so the threshold sits at 1.5.",
            "The third way a leg fails is that no path exists at all. One leg near Ryder Brow would not route, and after checking the snap and then the direction, the answer turned out to be a genuine gap in the OpenStreetMap rail network. The choice was to bridge it with a straight line or leave it undrawn. A straight line there would have run through parks and houses. It is not drawn. A train shown on a route it did not take is worse than a train not shown, and that principle runs through the evaluation too.",
          ],
        },
        {
          heading: "Measuring the error instead of asserting it",
          body: [
            "There is no ground truth. GB trains do not publish their positions, which is the reason the project exists and also the reason it cannot be checked directly.",
            "What it can be checked against is itself, afterwards. Every timing point carries a booked time and, once the train has passed, an actual one. So the estimator runs twice over identical geometry: once on the schedule, as the live system does, and once on the actual times, which only exist later. The distance between the two positions is the error. Geometry and interpolation are the same in both runs, so what is isolated is the timing data.",
            "That measures consistency, not absolute accuracy. It is worth saying plainly rather than dressing up: if a train runs exactly to schedule, both runs get the same input and the error is zero by construction.",
            "Four sessions on separate days, 1,205 observations once duplicates were removed, covering 241 legs across 128 stations. Median error 644 metres, with 82.7% inside two kilometres. Two kilometres is roughly suburban station spacing, so an estimate inside it usually places the train between the correct pair of stations. The mean is 1,443 metres and the distribution is strongly right-skewed, which is why the median is the headline figure.",
            "Lateness drives the error, not leg length. Spearman correlation of 0.65 against how far the departure deviated from the booked time, against 0.38 for scheduled duration, and the two are nearly independent of each other at 0.13. Trains leaving on time had a median error of 236 metres. Trains more than five minutes late had 2,772. The worst single case was Stoke-on-Trent to Stockport at 37.7 km: a 25-minute leg on a train that left 26 minutes late, so the schedule put it near Stockport while the actual times put it north of Stoke.",
          ],
        },
        {
          heading: "The ceiling",
          body: [
            "Polling is the limit, and that was measured rather than assumed. Sustained polling returns 429s, escalating until the board call itself fails. No amount of caching fixes that for a national network.",
            "What is there holds the load down. The refresh token is exchanged once and reused until a minute before expiry. Station boards cache for 120 seconds, services for 300, and built routes for the whole session, since track geometry does not change while the process is up. A pre-filter drops services that cannot be running before any of them are requested, taking a busy board from 64 candidates down to 34.",
            "The real answer is to stop polling. Network Rail's feeds push movements between signalling berths rather than at calling points, which shortens the reporting interval and addresses both error sources at once. The cost is architectural: a long-running consumer, persistent train state instead of cached polling, and a mapping from berth identifiers to positions on the network. The linear referencing core carries over unchanged.",
          ],
        },
        {
          heading: "What it does not do",
          body: [
            "It can reject an implausible path through a junction but cannot choose between two plausible ones.",
            "It does not communicate uncertainty, which is the cheapest improvement available and the one I would do first. The quantities already exist: time since the last report, length of the current leg and lateness of the service are all known, and all three were measured against error.",
            "Five people worked through six tasks and filled in a System Usability Scale questionnaire. The mean was 85.5, which is a number I would not lean on. All five were recruited by me and all knew the system was mine. The useful results were the failures. Three expected a station departure board and got a text filter instead. Three managed to pin a service and then could not say what pinning was for.",
            "34 pytest tests cover the estimation, geometry and parsing layers. Nothing below the HTTP layer imports Flask, so they call the functions directly with ordinary Python values, with no server and no mocking. One of them builds a right-angled track and asserts that the halfway position is the corner rather than the midpoint of the straight line between the ends. Without it, a change to the interpolation call could silently reintroduce straight-line behaviour while every other test still passed.",
          ],
        },
      ],
    },
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
