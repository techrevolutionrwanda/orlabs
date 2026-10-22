export type Service = {
  slug: string;
  title: string;
  /** One-line summary used on cards. */
  short: string;
  /** The problem the service solves. */
  problem: string;
  /** What a delivery includes. */
  includes: string[];
};

export const services: Service[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
