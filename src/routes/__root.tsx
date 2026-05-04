import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteSidebar } from "@/components/site-sidebar";
import { InteractiveBackground } from "@/components/interactive-background";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Miroslav Ondroušek - Portfolio" },
      { name: "description", content: "A personal portfolio website showcasing projects, experience, and contact information." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Miroslav Ondroušek - Portfolio" },
      { property: "og:description", content: "A personal portfolio website showcasing projects, experience, and contact information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Miroslav Ondroušek - Portfolio" },
      { name: "twitter:description", content: "A personal portfolio website showcasing projects, experience, and contact information." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/977825e7-7dd7-41e1-bc49-7b4e4947699b/id-preview-6cf854a5--e49adcbb-8b03-4ea7-960f-27d837841c83.lovable.app-1777502584466.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/977825e7-7dd7-41e1-bc49-7b4e4947699b/id-preview-6cf854a5--e49adcbb-8b03-4ea7-960f-27d837841c83.lovable.app-1777502584466.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <InteractiveBackground />
        <SiteSidebar />
        <main className="md:pl-64 [.sidebar-collapsed_&]:md:pl-20 transition-[padding] duration-200">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
