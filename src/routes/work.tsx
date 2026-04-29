import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { ArrowUpRight } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Miroslav Ondroušek" },
      { name: "description", content: "Selected projects in software, data, and design." },
      { property: "og:title", content: "Work — Miroslav Ondroušek" },
      { property: "og:description", content: "Selected projects in software, data, and design." },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    name: "Pulse",
    year: "2025",
    role: "Design & engineering",
    desc: "Realtime analytics dashboard with streaming anomaly detection. Built with TypeScript, DuckDB and a custom WebGL chart layer.",
    image: p1,
  },
  {
    name: "Quill",
    year: "2024",
    role: "Solo project",
    desc: "An editor that quietly turns plain notes into structured datasets you can query later.",
    image: p2,
  },
  {
    name: "Atlas",
    year: "2023",
    role: "Engineering",
    desc: "Geospatial query engine and viewer for open civic data. Postgres + PostGIS + a thin React client.",
    image: p3,
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
            <a href="#" className="block overflow-hidden rounded-lg border border-border bg-muted">
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
                <h2 className="text-base font-medium text-foreground inline-flex items-center gap-1.5">
                  {p.name}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                </h2>
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
