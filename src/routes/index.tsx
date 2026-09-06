import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Activity, AlertTriangle, Share2, Users } from "lucide-react";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";
import { Chip } from "@/components/app/bits";
import { CASES, RECENT_ACTIVITY } from "@/data/case-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Case Overview — Chanakya Criminal Network Analysis" },
      {
        name: "description",
        content:
          "Active investigations, entity and relationship counts, and open alerts across the Chanakya criminal network analysis workbench.",
      },
      { property: "og:title", content: "Case Overview — Chanakya" },
      {
        property: "og:description",
        content:
          "Investigator workbench for correlating FIRs, CDRs, financial and surveillance evidence.",
      },
    ],
  }),
  component: Overview,
});

function statusTone(status: string) {
  if (status === "Active") return "ok" as const;
  if (status === "Under Review") return "warn" as const;
  return "neutral" as const;
}

function Overview() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Case"
        title="Active Investigations"
        description="Each investigation aggregates fragmented evidence into a single correlated network. Open one to continue analysis."
        actions={
          <Link
            to="/new-investigation"
            className="focus-ring inline-flex items-center gap-2 rounded-sm bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Investigation
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {CASES.map((c) => (
            <article
              key={c.id}
              className="panel group px-5 py-4 transition-colors hover:border-border-strong"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-[15px] font-semibold tracking-wide text-foreground">
                      {c.name}
                    </h2>
                    <span className="font-mono text-[11px] text-muted-foreground">{c.id}</span>
                    <Chip tone={statusTone(c.status)}>{c.status}</Chip>
                    {c.priority === "High" && <Chip tone="risk">Priority: High</Chip>}
                  </div>
                  <div className="mt-1.5 text-[12px] text-muted-foreground">
                    {c.type} · Created {c.created} · Owner {c.owner}
                  </div>
                </div>
                <Link
                  to="/network"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-[12.5px] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                >
                  Open Investigation
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-4">
                <Metric icon={Users} label="Entities" value={c.entities} />
                <Metric icon={Share2} label="Relationships" value={c.relationships} />
                <Metric
                  icon={AlertTriangle}
                  label="Alerts"
                  value={c.alerts}
                  tone={c.alerts > 0 ? "risk" : undefined}
                />
                <Metric icon={Activity} label="Last activity" value={c.updated} small />
              </div>
            </article>
          ))}
        </div>

        <div className="space-y-4">
          <section className="panel">
            <div className="border-b border-border px-4 py-3">
              <div className="label-eyebrow">Recent Activity</div>
            </div>
            <ul className="divide-y divide-border">
              {RECENT_ACTIVITY.map((a, i) => (
                <li key={i} className="flex gap-3 px-4 py-2.5">
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {a.time}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[12.5px] text-foreground">{a.what}</div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {a.who} · {a.ctx}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-4 py-2.5">
              <Link to="/audit" className="text-[12px] text-primary hover:underline">
                View full audit log →
              </Link>
            </div>
          </section>

          <AiNotice />
        </div>
      </div>
    </AppShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
  small,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  tone?: "risk" | undefined;
  small?: boolean | undefined;
}) {
  return (
    <div className="bg-surface px-3.5 py-3">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
        <span className="label-eyebrow">{label}</span>
      </div>
      <div
        className={`mt-1 font-mono tabular-nums ${small ? "text-[12.5px]" : "text-lg"} ${
          tone === "risk" ? "text-destructive" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
