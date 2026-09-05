import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Banknote, MapPin, MessageSquare, Phone, FileText } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { EvidenceViewer } from "@/components/app/bits";
import { TIMELINE, type TimelineEvent } from "@/data/case-data";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Investigation Timeline — Chanakya" },
      {
        name: "description",
        content:
          "Chronological view of calls, transactions, sightings, reports and social activity across the investigation window.",
      },
      { property: "og:title", content: "Investigation Timeline — Chanakya" },
      { property: "og:description", content: "Correlated case events ordered in time, linked to their source records." },
    ],
  }),
  component: Timeline,
});

const KIND_META = {
  Call: { icon: Phone, tone: "text-ent-phone" },
  Transaction: { icon: Banknote, tone: "text-ent-account" },
  Location: { icon: MapPin, tone: "text-ent-location" },
  Report: { icon: FileText, tone: "text-ent-person" },
  Social: { icon: MessageSquare, tone: "text-ent-social" },
} as const;

const FILTERS = ["Call", "Transaction", "Location", "Report", "Social"] as const;

function Timeline() {
  const [active, setActive] = useState<Set<string>>(new Set(FILTERS));
  const [evidenceId, setEvidenceId] = useState<string | null>(null);

  const events = TIMELINE.filter((e) => active.has(e.kind));
  const days = [...new Set(events.map((e) => e.day))];

  return (
    <AppShell>
      <PageHeader
        eyebrow="Investigate"
        title="Investigation Timeline"
        description="Events from every evidence stream placed on one clock. Clusters in time are often more revealing than clusters in the graph."
        actions={
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => {
              const on = active.has(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    const n = new Set(active);
                    if (on) n.delete(f);
                    else n.add(f);
                    setActive(n);
                  }}
                  className={`focus-ring rounded-sm border px-2.5 py-1.5 text-[12px] transition-colors ${
                    on
                      ? "border-primary/45 bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-surface-2"
                  }`}
                >
                  {f === "Call" ? "Calls" : f === "Transaction" ? "Transactions" : f === "Location" ? "Locations" : f === "Report" ? "Reports" : "Social activity"}
                </button>
              );
            })}
          </div>
        }
      />

      <div className="max-w-4xl">
        {days.map((day) => (
          <section key={day} className="mb-6">
            <div className="sticky top-0 z-10 -mx-1 mb-3 bg-background/95 px-1 py-1.5">
              <span className="font-mono text-[12px] tracking-[0.2em] text-foreground">{day}</span>
              <span className="ml-2 text-[11px] text-muted-foreground">
                {events.filter((e) => e.day === day).length} events
              </span>
            </div>
            <ol className="relative space-y-2 pl-6">
              <span className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
              {events
                .filter((e) => e.day === day)
                .map((e) => (
                  <EventRow key={`${e.day}-${e.time}-${e.title}`} event={e} onOpen={setEvidenceId} />
                ))}
            </ol>
          </section>
        ))}
        {events.length === 0 && (
          <p className="panel px-4 py-8 text-center text-[13px] text-muted-foreground">
            No events match the selected filters.
          </p>
        )}
      </div>

      <EvidenceViewer id={evidenceId} onClose={() => setEvidenceId(null)} />
    </AppShell>
  );
}

function EventRow({ event, onOpen }: { event: TimelineEvent; onOpen: (id: string) => void }) {
  const meta = KIND_META[event.kind];
  return (
    <li className="relative">
      <span className="absolute -left-[22px] top-3.5 h-2 w-2 rounded-full border border-border-strong bg-surface" />
      <div
        className={`panel flex flex-wrap items-center gap-3 px-3.5 py-2.5 ${
          event.flagged ? "border-destructive/35" : ""
        }`}
      >
        <span className="font-mono text-[12px] tabular-nums text-muted-foreground">{event.time}</span>
        <meta.icon className={`h-4 w-4 shrink-0 ${meta.tone}`} strokeWidth={1.75} />
        <div className="min-w-0 flex-1">
          <div className="text-[13px] text-foreground">{event.title}</div>
          <div className="text-[11.5px] text-muted-foreground">{event.detail}</div>
        </div>
        {event.flagged && (
          <span className="flex items-center gap-1 text-[11px] text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.75} />
            Suspicious activity spike
          </span>
        )}
        <button
          type="button"
          onClick={() => onOpen(event.source)}
          className="focus-ring rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-primary hover:bg-primary/10"
        >
          {event.source}
        </button>
        <Link
          to="/network"
          search={{ node: event.focus[0] }}
          className="focus-ring rounded-sm border border-border px-2 py-1 text-[11.5px] text-foreground hover:bg-surface-2"
        >
          Focus graph
        </Link>
      </div>
    </li>
  );
}
