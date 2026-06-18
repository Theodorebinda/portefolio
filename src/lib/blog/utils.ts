export const BLOG_POSTS_PER_PAGE = 6;

const COMBINING_MARKS_REGEX = /[\u0300-\u036f]/g;

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS_REGEX, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

export function normalizeTagName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 40);
}

export function normalizeTagNames(values: string[] = []) {
  const seen = new Set<string>();

  return values
    .map(normalizeTagName)
    .filter(Boolean)
    .filter((name) => {
      const key = slugify(name);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);
}

export function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[#>*_\-[\]()+.!|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function estimateReadingTime(markdown: string) {
  const words = stripMarkdown(markdown).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function formatPostDate(value: Date | string | null) {
  if (!value) return "Non publie";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function getBlogPostUrl(slug: string) {
  return `/blog/${slug}`;
}
