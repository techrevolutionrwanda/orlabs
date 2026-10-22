export type Industry = {
  slug: string;
  name: string;
  /** The kind of pressure the sector works under. */
  challenge: string;
  /** How OrLabs helps. */
  help: string;
};

export const industries: Industry[] = [
  {
    slug: "finance-microfinance",
    name: "Finance & microfinance",
    challenge:
      "Financial institutions need reliable ledgers, clear audit trails and mobile money payments without adding friction for the people they serve.",
    help: "Core banking portals, mobile money integrations and reporting tools built for the way financial operations actually run.",
  },
  {
    slug: "health",
    name: "Health",
    challenge:
      "Care teams need patient information that is accurate, private and available the moment it is needed.",
    help: "Clinical records, appointment and patient portals, and integrations with the health information systems you already run.",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    challenge:
      "Farmers and cooperatives need fair prices, traceable produce and a straightforward route to buyers and inputs.",
    help: "Market platforms, mobile tools for field teams, and simple systems for aggregation, grading and traceability.",
  },
  {
    slug: "construction-real-estate",
    name: "Construction & real estate",
    challenge:
      "Projects run on drawings, messages and spreadsheets, and site teams rarely see the same information as the office.",
    help: "Project portals, mobile site reporting, asset and maintenance systems, and customer-facing property platforms.",
  },
  {
    slug: "logistics-transport",
    name: "Logistics & transport",
    challenge:
      "Fleet and delivery operations need live visibility to keep goods moving and customers informed.",
    help: "Fleet tracking, dispatch and route tools, proof of delivery, and customer tracking portals.",
  },
  {
    slug: "education",
    name: "Education",
    challenge:
      "Schools need to manage enrolment, learning and reporting without adding more paperwork for teachers.",
    help: "Student and parent portals, attendance and grading tools, and learning platforms that work on low bandwidth.",
  },
  {
    slug: "hospitality-tourism",
    name: "Hospitality & tourism",
    challenge:
      "Operators need bookings, payments and guest information to work together, including on a phone.",
    help: "Booking and reservation systems, property management tools, and mobile guest experiences.",
  },
  {
    slug: "government-ngos",
    name: "Government & NGOs",
    challenge:
      "Public programmes need to reach the people they serve, track delivery and report on outcomes.",
    help: "Citizen portals, mobile-first registration and payments, programme dashboards, and offline data collection.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & e-commerce",
    challenge:
      "Retailers need to sell across channels while keeping stock, orders and payments in step.",
    help: "Storefronts and marketplaces, inventory and order management, and payment and delivery integrations.",
  },
];
