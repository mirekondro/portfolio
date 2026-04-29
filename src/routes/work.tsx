import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { ArrowUpRight } from "lucide-react";
import kntxt from "@/assets/kntxt.png";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Miroslav Ondroušek" },
      { name: "description", content: "Selected projects in software, data, and design." },
      { property: "og:title", content: "Work — Miroslav Ondroušek" },
      { property: "og:description", content: "Selected projects in software, data, and design." },
      { property: "og:image", content: kntxt },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    name: "KNTXT",
    year: "2025",
    role: "Design & engineering",
    desc: "Paired Coding — a peer-to-peer terminal chat with local AI intent-analysis. No servers, no API keys, total privacy.",
    href: "https://kntxt.dev/",
    image: kntxt,
  },
];

function WorkPage() {
  return (
    <Page>
      <h1 className="text-2xl font-semibold tracking-tight">Work</h1>
      <p className="mt-1 text-muted-foreground">A few projects I've built recently.</p>

      <div className="mt-12 space-y-16">
        {projects.map((p) => (
          <article key={p.name} className="group">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-lg border border-border bg-muted"
            >
              <img
                src={p.image}
                alt={p.name}
                width={800}
                height={500}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </a>
            <div className="mt-4 flex items-start justify-between gap-6">
              <div>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-foreground inline-flex items-center gap-1.5 link-underline"
                >
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                </a>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-xs text-muted-foreground">{p.year}</div>
                <div className="font-mono text-xs text-muted-foreground">{p.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
