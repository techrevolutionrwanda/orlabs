import type {
  CareerRole,
  ClientLogo,
  ContactChannel,
  IndustryItem,
  LabNote,
  PortalData,
  PortalProject,
  PortalTicket,
  PublicTeamMember,
  ServiceItem,
  SocialLink,
  StoredTask,
  TeamMember,
  WorkItem,
} from "./types";

/**
 * The content the site starts with.
 *
 * This file is the seed: it is committed to the repository, so a fresh clone
 * has something to show, and it is written to disk the first time the portal
 * store is used.
 *
 * Nothing here is a real client, a real person or a real figure. Names,
 * clients and addresses stay as `[PLACEHOLDERS]` until the team fills them in.
 */

/* -------------------------------------------------------------------------- */
/* Delivery                                                                     */
/* -------------------------------------------------------------------------- */

const projects: PortalProject[] = [
  {
    id: "prj-001",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "building",
    progress: 62,
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    team: ["tm-001", "tm-002", "tm-003"],
    startedOn: "2026-07-06",
    targetDate: "2026-11-27",
  },
  {
    id: "prj-002",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "review",
    progress: 88,
    stack: ["TypeScript", "React Native", "AWS"],
    team: ["tm-001", "tm-004"],
    startedOn: "2026-05-18",
    targetDate: "2026-10-30",
  },
  {
    id: "prj-003",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "planning",
    progress: 15,
    stack: ["Python", "PostgreSQL"],
    team: ["tm-003", "tm-004"],
    startedOn: "2026-10-05",
    targetDate: "2027-01-29",
  },
  {
    id: "prj-004",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "live",
    progress: 100,
    stack: ["Java", "Spring Boot", "Kubernetes"],
    team: ["tm-002"],
    startedOn: "2026-01-12",
    targetDate: "2026-06-26",
  },
  {
    id: "prj-005",
    name: "[PROJECT NAME]",
    client: "[CLIENT NAME]",
    summary: "[ONE-LINE SUMMARY]",
    status: "paused",
    progress: 34,
    stack: ["Go", "Docker"],
    team: ["tm-001"],
    startedOn: "2026-03-02",
    targetDate: "[TARGET DATE]",
  },
];

const tasks: StoredTask[] = [
  {
    id: "tsk-001",
    title: "Wire the authentication flow end to end",
    project: "prj-001",
    assignee: "tm-002",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-10-27",
    estimate: "3 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-002",
    title: "Review the reporting module",
    project: "prj-001",
    assignee: "tm-002",
    status: "todo",
    priority: "normal",
    dueDate: "2026-10-30",
    estimate: "1 day",
    note: "[NOTE]",
  },
  {
    id: "tsk-003",
    title: "Prepare the release notes for the mobile release",
    project: "prj-002",
    assignee: "tm-002",
    status: "review",
    priority: "normal",
    dueDate: "2026-10-24",
    estimate: "Half a day",
    note: "[NOTE]",
  },
  {
    id: "tsk-004",
    title: "Set up the delivery pipeline for the new service",
    project: "prj-001",
    assignee: "tm-001",
    status: "done",
    priority: "high",
    dueDate: "2026-10-17",
    estimate: "2 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-005",
    title: "Draft the discovery notes for the new engagement",
    project: "prj-003",
    assignee: "tm-004",
    status: "todo",
    priority: "normal",
    dueDate: "2026-11-03",
    estimate: "1 day",
    note: "[NOTE]",
  },
  {
    id: "tsk-006",
    title: "Update the design system with the new components",
    project: "prj-002",
    assignee: "tm-003",
    status: "in-progress",
    priority: "low",
    dueDate: "2026-10-29",
    estimate: "2 days",
    note: "[NOTE]",
  },
  {
    id: "tsk-007",
    title: "Document the on-call handover",
    project: "prj-004",
    assignee: "tm-002",
    status: "done",
    priority: "normal",
    dueDate: "2026-10-10",
    estimate: "Half a day",
    note: "[NOTE]",
  },
  {
    id: "tsk-008",
    title: "Investigate the slow export job",
    project: "prj-001",
    assignee: "tm-002",
    status: "todo",
    priority: "high",
    dueDate: "2026-10-22",
    estimate: "1 day",
    note: "[NOTE]",
  },
];

const tickets: PortalTicket[] = [
  {
    id: "tkt-001",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "high",
    status: "open",
    updatedOn: "2026-10-21",
    channel: "Email",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-002",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "medium",
    status: "waiting",
    updatedOn: "2026-10-20",
    channel: "Phone",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-003",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "low",
    status: "open",
    updatedOn: "2026-10-18",
    channel: "Support portal",
    body: "[TICKET BODY]",
  },
  {
    id: "tkt-004",
    subject: "[TICKET SUBJECT]",
    requester: "[CLIENT NAME]",
    severity: "medium",
    status: "resolved",
    updatedOn: "2026-10-15",
    channel: "Email",
    body: "[TICKET BODY]",
  },
];

const team: TeamMember[] = [
  {
    id: "tm-001",
    name: "[TEAM MEMBER]",
    discipline: "Engineering",
    location: "Kigali, Rwanda",
    availability: "available",
    since: "2023-04-01",
  },
  {
    id: "tm-002",
    name: "[TEAM MEMBER]",
    discipline: "Engineering",
    location: "Kigali, Rwanda",
    availability: "partly-booked",
    since: "2024-01-15",
  },
  {
    id: "tm-003",
    name: "[TEAM MEMBER]",
    discipline: "Design",
    location: "Kigali, Rwanda",
    availability: "available",
    since: "2023-09-01",
  },
  {
    id: "tm-004",
    name: "[TEAM MEMBER]",
    discipline: "Delivery",
    location: "Kigali, Rwanda",
    availability: "away",
    since: "2022-11-07",
  },
];

/* -------------------------------------------------------------------------- */
/* The public website                                                           */
/* -------------------------------------------------------------------------- */

const work: WorkItem[] = [
  {
    id: "wrk-001",
    slug: "first-case-study",
    name: "[Project name]",
    client: "[CLIENT NAME]",
    result: "[one-line result]",
    summary: "Problem → solution → result. Add your first client project here.",
    problem: "[The problem the client came to us with.]",
    solution: "[What we built, and how we built it.]",
    outcome: "[What changed for the client after launch.]",
    stack: ["[TECHNOLOGY]", "[TECHNOLOGY]", "[TECHNOLOGY]"],
    quote: "[CLIENT QUOTE — what changed after working with OrLabs.]",
    quoteName: "[Name]",
    quoteRole: "[Role, Company]",
    imageUrl: "",
    state: "published",
    order: 0,
  },
];

const services: ServiceItem[] = [
  {
    id: "svc-001",
    slug: "custom-software",
    title: "Custom Software",
    short:
      "Business systems built around how you actually work — ERPs, portals and management platforms.",
    problem:
      "Teams outgrow spreadsheets and off-the-shelf tools, and every workaround costs more time than it saves.",
    includes: [
      "Discovery workshop and process mapping",
      "Custom web, desktop and back-office applications",
      "Dashboards, roles and permissions",
      "Documentation and handover",
      "Support and iteration after launch",
    ],
    state: "published",
    order: 0,
  },
  {
    id: "svc-002",
    slug: "web-mobile-apps",
    title: "Web & Mobile Apps",
    short:
      "Fast, beautiful apps for Android, iOS and the web, designed for African users and networks.",
    problem:
      "Customers expect fast, reliable apps — and many users are on mobile, prepaid data and intermittent connections.",
    includes: [
      "Android and iOS applications",
      "Responsive web applications",
      "Offline-first and low-bandwidth modes",
      "Store publishing and release management",
      "Analytics and crash monitoring",
    ],
    state: "published",
    order: 1,
  },
  {
    id: "svc-003",
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    short:
      "Secure hosting, migration and infrastructure that scales as you grow.",
    problem:
      "Manual servers slow teams down, and every unplanned outage stops the business.",
    includes: [
      "Cloud migration and managed hosting",
      "CI/CD pipelines and release automation",
      "Monitoring, alerting and on-call runbooks",
      "Backups and disaster recovery",
      "Cost and capacity planning",
    ],
    state: "published",
    order: 2,
  },
  {
    id: "svc-004",
    slug: "data-ai-automation",
    title: "Data, AI & Automation",
    short:
      "Dashboards, analytics and smart automation that turn your data into decisions.",
    problem:
      "The data exists, but decisions still rely on manual reports and gut feel.",
    includes: [
      "Data pipelines and reporting models",
      "Dashboards for teams and leadership",
      "Workflow automation",
      "Applied AI and machine learning",
      "Data quality, privacy and governance",
    ],
    state: "published",
    order: 3,
  },
  {
    id: "svc-005",
    slug: "integrations-fintech",
    title: "Integrations & Fintech",
    short:
      "Mobile money, payment gateways, government and third-party API integrations.",
    problem:
      "Payments, mobile money and government systems rarely speak to each other out of the box.",
    includes: [
      "Mobile money and payment gateway integration",
      "Government and third-party API integration",
      "API design and documentation",
      "Reconciliation and transaction reporting",
      "Security and compliance review",
    ],
    state: "published",
    order: 4,
  },
  {
    id: "svc-006",
    slug: "it-consulting",
    title: "IT Consulting",
    short:
      "Strategy, audits and roadmaps to take your organisation digital, step by step.",
    problem:
      "Technology decisions made without a clear roadmap turn into expensive rework.",
    includes: [
      "Digital strategy and system audits",
      "Architecture and vendor reviews",
      "Roadmaps and prioritisation",
      "Process digitisation",
      "Team enablement and training",
    ],
    state: "published",
    order: 5,
  },
];

const industries: IndustryItem[] = [
  {
    id: "ind-001",
    slug: "finance-microfinance",
    name: "Finance & microfinance",
    challenge:
      "Financial institutions need reliable ledgers, clear audit trails and mobile money payments without adding friction for the people they serve.",
    help: "Core banking portals, mobile money integrations and reporting tools built for the way financial operations actually run.",
    state: "published",
    order: 0,
  },
  {
    id: "ind-002",
    slug: "health",
    name: "Health",
    challenge:
      "Care teams need patient information that is accurate, private and available the moment it is needed.",
    help: "Clinical records, appointment and patient portals, and integrations with the health information systems you already run.",
    state: "published",
    order: 1,
  },
  {
    id: "ind-003",
    slug: "agriculture",
    name: "Agriculture",
    challenge:
      "Farmers and cooperatives need fair prices, traceable produce and a straightforward route to buyers and inputs.",
    help: "Market platforms, mobile tools for field teams, and simple systems for aggregation, grading and traceability.",
    state: "published",
    order: 2,
  },
  {
    id: "ind-004",
    slug: "construction-real-estate",
    name: "Construction & real estate",
    challenge:
      "Projects run on drawings, messages and spreadsheets, and site teams rarely see the same information as the office.",
    help: "Project portals, mobile site reporting, asset and maintenance systems, and customer-facing property platforms.",
    state: "published",
    order: 3,
  },
  {
    id: "ind-005",
    slug: "logistics-transport",
    name: "Logistics & transport",
    challenge:
      "Fleet and delivery operations need live visibility to keep goods moving and customers informed.",
    help: "Fleet tracking, dispatch and route tools, proof of delivery, and customer tracking portals.",
    state: "published",
    order: 4,
  },
  {
    id: "ind-006",
    slug: "education",
    name: "Education",
    challenge:
      "Schools need to manage enrolment, learning and reporting without adding more paperwork for teachers.",
    help: "Student and parent portals, attendance and grading tools, and learning platforms that work on low bandwidth.",
    state: "published",
    order: 5,
  },
  {
    id: "ind-007",
    slug: "hospitality-tourism",
    name: "Hospitality & tourism",
    challenge:
      "Operators need bookings, payments and guest information to work together, including on a phone.",
    help: "Booking and reservation systems, property management tools, and mobile guest experiences.",
    state: "published",
    order: 6,
  },
  {
    id: "ind-008",
    slug: "government-ngos",
    name: "Government & NGOs",
    challenge:
      "Public programmes need to reach the people they serve, track delivery and report on outcomes.",
    help: "Citizen portals, mobile-first registration and payments, programme dashboards, and offline data collection.",
    state: "published",
    order: 7,
  },
  {
    id: "ind-009",
    slug: "retail-ecommerce",
    name: "Retail & e-commerce",
    challenge:
      "Retailers need to sell across channels while keeping stock, orders and payments in step.",
    help: "Storefronts and marketplaces, inventory and order management, and payment and delivery integrations.",
    state: "published",
    order: 8,
  },
];

const labNotes: LabNote[] = [
  {
    id: "lab-001",
    slug: "first-lab-note",
    title: "[LAB POST TITLE]",
    date: "[Date]",
    excerpt: "[One-line summary of the note.]",
    body: [
      "[Opening paragraph — what we tried and why it was worth trying.]",
      "[What we learned, and what we would do differently next time.]",
    ],
    tags: ["[TAG]", "[TAG]"],
    state: "published",
    order: 0,
  },
];

const roles: CareerRole[] = [
  {
    id: "rol-001",
    title: "[ROLE]",
    discipline: "[Team or discipline]",
    location: "Kigali, Rwanda · [Employment type]",
    summary: "[One-line description of the role.]",
    state: "published",
    order: 0,
  },
  {
    id: "rol-002",
    title: "[ROLE]",
    discipline: "[Team or discipline]",
    location: "Kigali, Rwanda · [Employment type]",
    summary: "[One-line description of the role.]",
    state: "published",
    order: 1,
  },
  {
    id: "rol-003",
    title: "[ROLE]",
    discipline: "[Team or discipline]",
    location: "Kigali, Rwanda · [Employment type]",
    summary: "[One-line description of the role.]",
    state: "published",
    order: 2,
  },
];

const publicTeam: PublicTeamMember[] = [
  {
    id: "ptm-001",
    name: "[Name]",
    role: "[Role]",
    bio: "[A sentence about what this person does.]",
    photoUrl: "",
    state: "published",
    order: 0,
  },
  {
    id: "ptm-002",
    name: "[Name]",
    role: "[Role]",
    bio: "[A sentence about what this person does.]",
    photoUrl: "",
    state: "published",
    order: 1,
  },
  {
    id: "ptm-003",
    name: "[Name]",
    role: "[Role]",
    bio: "[A sentence about what this person does.]",
    photoUrl: "",
    state: "published",
    order: 2,
  },
  {
    id: "ptm-004",
    name: "[Name]",
    role: "[Role]",
    bio: "[A sentence about what this person does.]",
    photoUrl: "",
    state: "published",
    order: 3,
  },
];

/**
 * The logos of the "Trusted by teams across Rwanda" row.
 *
 * Four empty slots, so the row looks the way it does today. The names stay
 * placeholders until the team knows who the row belongs to.
 */
const clients: ClientLogo[] = [
  {
    id: "cl-001",
    name: "[CLIENT NAME]",
    logoUrl: "",
    websiteUrl: "",
    order: 0,
    state: "published",
  },
  {
    id: "cl-002",
    name: "[CLIENT NAME]",
    logoUrl: "",
    websiteUrl: "",
    order: 1,
    state: "published",
  },
  {
    id: "cl-003",
    name: "[CLIENT NAME]",
    logoUrl: "",
    websiteUrl: "",
    order: 2,
    state: "published",
  },
  {
    id: "cl-004",
    name: "[CLIENT NAME]",
    logoUrl: "",
    websiteUrl: "",
    order: 3,
    state: "published",
  },
];

const contactChannels: ContactChannel[] = [
  {
    id: "cc-001",
    kind: "address",
    label: "[Street address], Kigali, Rwanda",
    value: "[Street address], Kigali, Rwanda",
    href: "",
    order: 0,
    state: "published",
  },
  {
    id: "cc-002",
    kind: "phone",
    label: "[PHONE / WHATSAPP]",
    value: "[PHONE / WHATSAPP]",
    href: "",
    order: 1,
    state: "published",
  },
  {
    id: "cc-003",
    kind: "email",
    label: "[EMAIL]",
    value: "[EMAIL]",
    href: "mailto:[EMAIL]",
    order: 2,
    state: "published",
  },
];

/**
 * The social links of the footer.
 *
 * Empty on purpose: a link to a social network is a fact about the company
 * that we do not know yet. They are added through the portal.
 */
const socialLinks: SocialLink[] = [];

/* -------------------------------------------------------------------------- */
/* The seed                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * A fresh copy of the seed.
 *
 * The copy matters: the store hands records out and writes them back, and two
 * requests must never share the same objects.
 */
export function seedPortalData(): PortalData {
  return structuredClone({
    projects,
    tasks,
    tickets,
    team,
    work,
    services,
    industries,
    labNotes,
    roles,
    publicTeam,
    clients,
    contactChannels,
    socialLinks,
  });
}
