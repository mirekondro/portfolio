import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Miroslav Ondroušek" },
      { name: "description", content: "A small collection of photographs and visual experiments." },
      { property: "og:title", content: "Gallery — Miroslav Ondroušek" },
      { property: "og:description", content: "A small collection of photographs and visual experiments." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <Page>
      <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
      <p className="mt-1 text-muted-foreground">Photographs and visual experiments.</p>

      <div className="mt-16 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-20 text-center">
        <Construction className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-foreground">In progress</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Working on it — check back soon.
        </p>
      </div>
    </Page>
  );
}
