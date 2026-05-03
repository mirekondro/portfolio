import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Briefcase,
  Image as ImageIcon,
  Mail,
  Github,
  Linkedin,
  Sun,
  Moon,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import avatar from "@/assets/avatar.jpg";
import { useTheme } from "./theme-provider";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/work", label: "Work", icon: Briefcase },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
] as const;

const socials = [
  { href: "mailto:mirekondro@post.cz", label: "Email", icon: Mail },
  { href: "https://github.com/mirekondro", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/mirekondro/", label: "LinkedIn", icon: Linkedin },
];

function SidebarBody({
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
  const railIconClass = collapsed ? "h-[18px] w-[18px]" : "h-4 w-4";

  return (
    <div className="flex h-full flex-col justify-between p-3 md:p-4">
      <div className="space-y-8">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}>
          <Link
            to="/"
            onClick={onNavigate}
            className={`group flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}
            title="Miroslav Ondroušek"
          >
            <img
              src={avatar}
              alt="Portrait"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-1 ring-border"
            />
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-sm font-medium text-foreground">Miroslav Ondroušek</div>
                <div className="text-xs text-muted-foreground">Software Developer & Data Analyst</div>
              </div>
            )}
          </Link>
          {onToggleCollapse && !collapsed && (
            <button
              onClick={onToggleCollapse}
              aria-label="Collapse sidebar"
              className="hidden md:inline-flex rounded-md p-1.5 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        {onToggleCollapse && collapsed && (
          <button
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            className="hidden md:flex mx-auto h-10 w-10 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <PanelLeftOpen className={railIconClass} strokeWidth={1.75} />
          </button>
        )}

        <nav className="flex flex-col gap-0.5">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                onClick={onNavigate}
                title={collapsed ? label : undefined}
                className={`group flex items-center rounded-md text-sm transition-colors ${
                  collapsed ? "mx-auto h-10 w-10 justify-center px-0 py-0" : "gap-3 px-3 py-2"
                } ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className={railIconClass} strokeWidth={1.75} />
                {!collapsed && <span>{label}</span>}
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
              title={collapsed ? label : undefined}
              className={`group flex items-center rounded-md text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground ${
                collapsed ? "mx-auto h-10 w-10 justify-center px-0 py-0" : "gap-3 px-3 py-2"
              }`}
            >
              <Icon className={railIconClass} strokeWidth={1.75} />
              {!collapsed && <span>{label}</span>}
            </a>
          ))}
        </div>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          title={collapsed ? (theme === "dark" ? "Light mode" : "Dark mode") : undefined}
          className={`flex items-center rounded-md text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground ${
            collapsed ? "mx-auto h-10 w-10 justify-center px-0 py-0" : "w-full gap-3 px-3 py-2"
          }`}
        >
          {theme === "dark" ? (
            <Sun className={railIconClass} strokeWidth={1.75} />
          ) : (
            <Moon className={railIconClass} strokeWidth={1.75} />
          )}
          {!collapsed && <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
        </button>
      </div>
    </div>
  );
}

export function SiteSidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "1") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed((c) => {
      const next = !c;
      localStorage.setItem("sidebar-collapsed", next ? "1" : "0");
      document.documentElement.classList.toggle("sidebar-collapsed", next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("sidebar-collapsed", collapsed);
  }, [collapsed]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur">
        <Link to="/" className="text-sm font-medium">
          Miroslav Ondroušek
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
      <aside
        className={`hidden md:block fixed inset-y-0 left-0 border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <SidebarBody collapsed={collapsed} onToggleCollapse={toggleCollapse} />
      </aside>
    </>
  );
}
