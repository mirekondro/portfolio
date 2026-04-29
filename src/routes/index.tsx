import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Page, SectionHeading } from "@/components/page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Miroslav Ondroušek — Software Developer & Data Analyst" },
      {
        name: "description",
        content:
          "Software developer and data analyst building thoughtful tools and clear data stories.",
      },
      { property: "og:title", content: "Miroslav Ondroušek — Software Developer & Data Analyst" },
      {
        property: "og:description",
        content: "Software developer and data analyst building thoughtful tools and clear data stories.",
      },
    ],
  }),
  component: Index,
});

const projects = [
  {
    name: "Pulse",
    desc: "Realtime analytics dashboard with anomaly detection",
    href: "#",
  },
  {
    name: "Quill",
    desc: "Editor that turns notes into structured datasets",
    href: "#",
  },
  {
    name: "Atlas",
    desc: "Geospatial query engine for civic data",
    href: "#",
  },
];

const experience = [
  {
    role: "SW Global Insights Data Platforms",
    org: "the LEGO Group · Billund, Denmark",
    time: "Mar 2026 — Present",
  },
  {
    role: "Software Developer",
    org: "KLEMPOS-STŘECHY s.r.o · Prague, Czechia",
    time: "Jul 2024 — Aug 2025",
  },
  {
    role: "Software Engineer Intern",
    org: "Blogic · Zlín, Czechia",
    time: "May 2023 — Jun 2023",
  },
  {
    role: "VR Department",
    org: "Zlín Film Festival · Zlín, Czechia",
    time: "May 2022 — May 2023",
  },
  {
    role: "Frontend Developer (Intern)",
    org: "Blogic · Zlín, Czechia",
    time: "May 2022 — Jun 2022",
  },
];

function Index() {
  return (
    <Page>
      <h1 className="text-2xl font-semibold tracking-tight">Miroslav Ondroušek</h1>
      <p className="mt-1 text-muted-foreground">Software Developer & Data Analyst</p>

      <p className="mt-6 text-base leading-relaxed text-foreground/85">
        I build software where data feels honest. My focus is on clean interfaces,
        reliable pipelines, and the small interactions that make a tool worth returning to.
      </p>

      <SectionHeading>What I'm working on</SectionHeading>
      <ul className="divide-y divide-border border-y border-border">
        {projects.map((p) => (
          <li key={p.name}>
            <a
              href={p.href}
              className="group flex items-center justify-between gap-6 py-4 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-foreground">{p.name}</div>
                <div className="text-sm text-muted-foreground">{p.desc}</div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                strokeWidth={1.75}
              />
            </a>
          </li>
        ))}
      </ul>

      <SectionHeading>Experience</SectionHeading>
      <ul className="space-y-3">
        {experience.map((e) => (
          <li key={e.role} className="flex items-baseline justify-between gap-4 text-sm">
            <div>
              <span className="font-medium text-foreground">{e.role}</span>
              <span className="text-muted-foreground"> · {e.org}</span>
            </div>
            <span className="font-mono text-xs text-muted-foreground">{e.time}</span>
          </li>
        ))}
      </ul>

      <SectionHeading>Contact</SectionHeading>
      <p className="text-base leading-relaxed text-foreground/85">
        Always open to interesting problems and collaborations. Reach me at{" "}
        <a className="link-underline font-medium" href="mailto:hello@example.com">
          hello@example.com
        </a>
        .
      </p>
    </Page>
  );
}
