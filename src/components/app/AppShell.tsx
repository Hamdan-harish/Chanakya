import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  ClipboardList,
  Cpu,
  FileText,
  FolderOpen,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Clock,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { CASES } from "@/data/case-data";
import { cn } from "@/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Case",
    items: [
      { to: "/", label: "Overview", icon: FolderOpen },
      { to: "/evidence", label: "Evidence", icon: FileText },
      { to: "/processing", label: "Processing", icon: Cpu },
    ],
  },
  {
    group: "Investigate",
    items: [
      { to: "/network", label: "Network", icon: Share2 },
      { to: "/entities", label: "Entities", icon: Users, badge: "4" },
      { to: "/patterns", label: "Patterns", icon: Activity, badge: "4" },
      { to: "/timeline", label: "Timeline", icon: Clock },
    ],
  },
  { group: "Output", items: [{ to: "/reports", label: "Reports", icon: ClipboardList }] },
  {
    group: "System",
    items: [
      { to: "/audit", label: "Audit Log", icon: ShieldCheck },
      { to: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-[228px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-primary/40 bg-primary/10">
          <Share2 className="h-4.5 w-4.5 text-primary" />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-sm font-semibold tracking-[0.22em] text-foreground">
            CHANAKYA
          </div>
          <div className="truncate text-[11px] text-muted-foreground">
            Criminal Network Analysis
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {NAV.map((group) => (
          <div key={group.group} className="mb-5">
            <div className="label-eyebrow px-3 pb-2">{group.group}</div>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={cn(
                        "focus-ring group flex items-center gap-2.5 rounded-sm border border-transparent px-3 py-2 text-[13px] transition-colors",
                        active
                          ? "border-primary/25 bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <item.icon
                        className={cn("h-4 w-4 shrink-0", active && "text-primary")}
                        strokeWidth={1.75}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="rounded-sm bg-destructive/15 px-1.5 font-mono text-[10px] text-destructive">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-success" />
          Secure session · TLS
        </div>
        <div className="mt-1 font-mono text-[10px] text-muted-foreground/70">
          BUILD 2026.09.05 · CLASSIFIED
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  const active = CASES[0];
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-surface px-4">
      <div className="hidden min-w-0 items-baseline gap-3 lg:flex">
        <span className="truncate text-sm font-semibold tracking-wide text-foreground">
          {active.name}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{active.id}</span>
        <span className="rounded-sm border border-success/30 bg-success/10 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-success">
          ACTIVE
        </span>
      </div>

      <Link
        to="/search"
        className="focus-ring group flex h-9 flex-1 items-center gap-2 rounded-sm border border-border bg-background px-3 text-left text-[13px] text-muted-foreground transition-colors hover:border-border-strong"
      >
        <Search className="h-4 w-4" strokeWidth={1.75} />
        <span className="truncate">
          Search people, phones, vehicles, accounts, locations, cases…
        </span>
        <kbd className="ml-auto hidden rounded-sm border border-border px-1.5 font-mono text-[10px] text-muted-foreground sm:block">
          /
        </kbd>
      </Link>

      <Link
        to="/patterns"
        className="focus-ring relative flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Alerts"
      >
        <Bell className="h-4 w-4" strokeWidth={1.75} />
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-mono text-[10px] text-destructive-foreground">
          4
        </span>
      </Link>

      <div className="flex items-center gap-2.5 border-l border-border pl-4">
        <div className="hidden text-right sm:block">
          <div className="text-[12px] leading-tight text-foreground">Insp. A. Verma</div>
          <div className="font-mono text-[10px] text-muted-foreground">CLEARANCE L3</div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-border-strong bg-surface-2 font-mono text-[11px] text-foreground">
          AV
        </div>
      </div>
    </header>
  );
}

export function AppShell({
  children,
  padded = true,
}: {
  children: ReactNode;
  padded?: boolean;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className={cn("min-h-0 flex-1 overflow-auto", padded && "p-6")}>{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="label-eyebrow mb-1.5">{eyebrow}</div>}
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-2xl text-[13px] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function AiNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-sm border border-warning/25 bg-warning/8 px-3 py-2 text-[11.5px] leading-relaxed text-warning",
        className,
      )}
    >
      <SlidersHorizontal className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
      <span>AI analysis supports investigators. Findings require human verification.</span>
    </div>
  );
}
