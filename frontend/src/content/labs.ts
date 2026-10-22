export type LabPost = {
  slug: string;
  title: string;
  /** Publication date. */
  date: string;
  /** One-line summary used on cards and in the meta description. */
  excerpt: string;
  /** Body paragraphs. */
  body: string[];
  /** Topics the note is filed under. */
  tags: string[];
};

export const labPosts: LabPost[] = [
  {
    slug: "first-lab-note",
    title: "[LAB POST TITLE]",
    date: "[Date]",
    excerpt: "[One-line summary of the note.]",
    body: [
      "[Opening paragraph — what we tried and why it was worth trying.]",
      "[What we learned, and what we would do differently next time.]",
    ],
    tags: ["[TAG]", "[TAG]"],
  },
];

export function getLabPost(slug: string) {
  return labPosts.find((post) => post.slug === slug);
}
