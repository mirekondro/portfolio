import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Your Name" },
      { name: "description", content: "Notes and essays on software, data, and design." },
      { property: "og:title", content: "Writing — Your Name" },
      { property: "og:description", content: "Notes and essays on software, data, and design." },
    ],
  }),
  component: WritingPage,
});

const posts = [
  {
    title: "Designing dashboards that respect attention",
    date: "2025-03-12",
    excerpt:
      "What I learned shipping analytics tools to teams that already had too many tabs open.",
  },
  {
    title: "The query is the product",
    date: "2025-01-28",
    excerpt:
      "Why I now treat SQL queries as first-class artifacts in every data project.",
  },
  {
    title: "Small interactions, large trust",
    date: "2024-11-04",
    excerpt: "A short list of UI details that quietly earn (or lose) a user's confidence.",
  },
  {
    title: "Notes on building tools alone",
    date: "2024-08-16",
    excerpt:
      "Patterns and habits from two years of working on side projects in evenings and weekends.",
  },
];

const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

function WritingPage() {
  return (
    <Page>
      <h1 className="text-2xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-1 text-muted-foreground">Occasional notes on what I'm learning.</p>

      <ul className="mt-12 divide-y divide-border border-y border-border">
        {posts.map((post) => (
          <li key={post.title}>
            <a href="#" className="group block py-5">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-medium text-foreground group-hover:text-foreground/80">
                  {post.title}
                </h2>
                <time className="font-mono text-xs text-muted-foreground shrink-0">
                  {formatter.format(new Date(post.date))}
                </time>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
}
