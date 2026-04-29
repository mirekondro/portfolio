import { createFileRoute } from "@tanstack/react-router";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";

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

const images = [
  { src: g1, caption: "Empty street, early morning" },
  { src: g2, caption: "Light through a window" },
  { src: g3, caption: "Long exposure, warm tones" },
  { src: g4, caption: "Texture study" },
];

function GalleryPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24 fade-in">
      <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>
      <p className="mt-1 text-muted-foreground">Photographs and visual experiments.</p>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 [&>*]:mb-4">
        {images.map((img) => (
          <figure key={img.caption} className="break-inside-avoid">
            <div className="overflow-hidden rounded-md border border-border bg-muted">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
            <figcaption className="mt-2 text-xs text-muted-foreground">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
