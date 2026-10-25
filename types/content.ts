export type ContentStatus = "draft" | "published";

export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  slug: string;
  draft: ContentStatus;
  coverImage?: { src: string; alt: string };
};
