import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Briefcase,
  PenLine,
  Image as ImageIcon,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import avatar from "@/assets/avatar.jpg";
import { useTheme } from "./theme-provider";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/work", label: "Work", icon: Briefcase },
  { to: "/writing", label: "Writing", icon: PenLine },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
] as const;

const socials = [
  { href: "mailto:hello@example.com", label: "Email", icon: Mail },
  { href: "https://github.com", label: "GitHub", icon: Github },
  { href: "https://twitter.com", label: "X", icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
];

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="space-y-8">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-3 group">
          <img
            src={avatar}
            alt="Portrait"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
          />
          <div className="leading-tight">
            <div className="text-sm font-medium text-foreground">Your Name</div>
            <div className="text-xs text-muted-foreground">Software Developer & Data Analyst</div>
          </div>
        </Link>

        <nav className="flex flex-col gap-0.5">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={onNavigate}
                className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-0.5">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" strokeWidth={1.75} />
          ) : (
            <Moon className="h-4 w-4" strokeWidth={1.75} />
          )}
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </div>
  );
}

export function SiteSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
        <Link to="/" className="text-sm font-medium">
          Your Name
        </Link>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-2 hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside className="hidden md:block fixed inset-y-0 left-0 w-64 border-r border-sidebar-border bg-sidebar">
        <SidebarBody />
      </aside>
    </>
  );
}
