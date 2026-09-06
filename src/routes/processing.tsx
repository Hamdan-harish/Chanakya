import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, CircleDot, Circle } from "lucide-react";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";

export const Route = createFileRoute("/processing")({
  head: () => ({
    meta: [
      { title: "Processing Evidence — Chanakya" },
      {
        name: "description",
        content:
          "Live extraction pipeline converting raw case evidence into entities, relationships and candidate suspicious patterns.",
      },
      { property: "og:title", content: "Processing Evidence — Chanakya" },
      {
        property: "og:description",
        content: "Entity extraction, resolution and network construction in progress.",
      },
    ],
  }),
  component: Processing,
});

const STEPS = [
  "Documents ingested",
  "Text extracted",
  "Entities extracted",
  "Relationships identified",
  "Entity resolution",
  "Graph construction",
  "Pattern analysis",
  "Network analysis",
];

const SOURCE_TARGETS: [string, number][] = [
  ["FIR / Police reports", 100],
  ["Call detail records", 100],
  ["Financial transactions", 100],
  ["Criminal history", 100],
  ["Surveillance reports", 92],
  ["Social intelligence", 64],
];

function Processing() {
  const navigate = useNavigate();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => (v >= 100 ? v : v + 1)), 90);
    return () => clearInterval(t);
  }, []);

  const stepProgress = (tick / 100) * STEPS.length;
  const done = tick >= 100;

  const stat = (target: number) => Math.round((Math.min(tick, 100) / 100) * target);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Case · OP-2026-001"
        title="Processing Evidence"
        description="Raw evidence is parsed, entities are extracted and resolved, and a unified investigation network is constructed."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,340px)_1fr]">
        <section className="panel p-5">
          <div className="label-eyebrow mb-4">Extraction Pipeline</div>
          <ol className="relative space-y-1">
            <span className="absolute bottom-3 left-[9px] top-3 w-px bg-border" />
            {STEPS.map((s, i) => {
              const state = stepProgress > i + 1 ? "done" : stepProgress > i ? "active" : "idle";
              return (
                <li key={s} className="relative flex items-center gap-3 py-1.5">
                  <span className="relative z-10 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-surface">
                    {state === "done" ? (
                      <Check className="h-4 w-4 text-success" strokeWidth={2.5} />
                    ) : state === "active" ? (
                      <CircleDot className="pulse-dot h-4 w-4 text-primary" strokeWidth={2} />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={2} />
                    )}
                  </span>
                  <span
                    className={`text-[13px] ${
                      state === "idle"
                        ? "text-muted-foreground/60"
                        : state === "active"
                          ? "text-foreground"
                          : "text-foreground/85"
                    }`}
                  >
                    {s}
                  </span>
                </li>
              );
            })}
          </ol>
        </section>

        <div className="space-y-4">
          <section className="panel p-5">
            <div className="label-eyebrow mb-4">Live Processing Statistics</div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
              {[
                ["Documents processed", stat(17), false],
                ["Entities identified", stat(126), false],
                ["Relationships identified", stat(243), false],
                ["Possible duplicate identities", stat(19), false],
                ["Potential suspicious patterns", stat(7), true],
                ["Sources correlated", stat(6), false],
              ].map(([label, value, risk]) => (
                <div key={label as string} className="bg-surface px-3.5 py-3">
                  <dt className="label-eyebrow">{label as string}</dt>
                  <dd
                    className={`mt-1 font-mono text-xl tabular-nums ${
                      risk ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {value as number}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="panel p-5">
            <div className="label-eyebrow mb-4">Source Progress</div>
            <div className="space-y-3">
              {SOURCE_TARGETS.map(([name, target]) => {
                const pct = Math.min(target, Math.round((tick / 100) * 118));
                return (
                  <div key={name}>
                    <div className="mb-1 flex items-center justify-between text-[12.5px]">
                      <span className="text-foreground/90">{name}</span>
                      <span className="font-mono tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <AiNotice />

          <div className="flex items-center justify-between gap-3 pb-2">
            <span className="font-mono text-[11px] text-muted-foreground">
              {done ? "PIPELINE COMPLETE" : `PROCESSING… ${tick}%`}
            </span>
            <button
              type="button"
              disabled={!done}
              onClick={() => navigate({ to: "/network" })}
              className="focus-ring rounded-sm bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Enter Investigation Workspace
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
