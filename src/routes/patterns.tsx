import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";
import { Chip, Confidence, SeverityTag, StatBlock } from "@/components/app/bits";
import { PATTERNS } from "@/data/case-data";

export const Route = createFileRoute("/patterns")({
  head: () => ({
    meta: [
      { title: "Suspicious Patterns — Chanakya" },
      {
        name: "description",
        content:
          "Ranked list of potentially suspicious patterns detected across communication, financial and movement evidence.",
      },
      { property: "og:title", content: "Suspicious Patterns — Chanakya" },
      {
        property: "og:description",
        content: "Communication bursts, layered financial flows and cross-location activity.",
      },
    ],
  }),
  component: Patterns,
});

function Patterns() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Investigate"
        title="Suspicious Patterns"
        description="Patterns are statistical observations across correlated sources. Each requires investigator review before any operational action."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <StatBlock label="Open findings" value={PATTERNS.length} tone="risk" />
        <StatBlock
          label="High severity"
          value={PATTERNS.filter((p) => p.severity === "HIGH").length}
          tone="risk"
        />
        <StatBlock
          label="Entities implicated"
          value={PATTERNS.reduce((a, p) => a + p.entities, 0)}
        />
        <StatBlock label="Sources correlated" value={6} tone="info" />
      </div>

      <div className="space-y-3">
        {PATTERNS.map((p, i) => (
          <article key={p.id} className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                  <SeverityTag level={p.severity} />
                  <h2 className="text-[15px] font-semibold text-foreground">{p.name}</h2>
                </div>
                <p className="mt-2 max-w-3xl text-[12.5px] leading-relaxed text-muted-foreground">
                  {p.reason}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>{p.entities} entities affected</Chip>
                  <Chip>{p.window}</Chip>
                  <Chip tone="info">{p.metric}</Chip>
                  <Chip>{p.sources} sources</Chip>
                </div>
              </div>
              <div className="flex w-full max-w-56 flex-col items-end gap-3">
                <div className="w-full">
                  <div className="label-eyebrow mb-1">Confidence</div>
                  <Confidence value={p.confidence} />
                </div>
                <Link
                  to="/network"
                  search={{ pattern: p.id }}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-[12.5px] text-foreground hover:border-primary/50 hover:bg-primary/10"
                >
                  Investigate
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <AiNotice className="mt-5" />
    </AppShell>
  );
}
