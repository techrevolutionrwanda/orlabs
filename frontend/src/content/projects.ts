export type Project = {
  slug: string;
  /** Client and project name. */
  name: string;
  /** One-line outcome. */
  result: string;
  /** Short summary used on cards. */
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  /** Technologies used. */
  stack: string[];
  quote: string;
  quoteName: string;
  quoteRole: string;
};

export const projects: Project[] = [
  {
    slug: "first-case-study",
    name: "[Project name]",
    result: "[one-line result]",
    summary: "Problem → solution → result. Add your first client project here.",
    problem: "[The problem the client came to us with.]",
    solution: "[What we built, and how we built it.]",
    outcome: "[What changed for the client after launch.]",
    stack: ["[TECHNOLOGY]", "[TECHNOLOGY]", "[TECHNOLOGY]"],
    quote: "[CLIENT QUOTE — what changed after working with OrLabs.]",
    quoteName: "[Name]",
    quoteRole: "[Role, Company]",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
