import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, GitMerge, Split, Users } from "lucide-react";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";
import { Chip, Confidence, EvidenceLink, EvidenceViewer } from "@/components/app/bits";
import { ENTITY_KIND_META, MERGE_CANDIDATES, NODES } from "@/data/case-data";

export const Route = createFileRoute("/entities")({
  head: () => ({
    meta: [
      { title: "Entity Resolution — Chanakya" },
      {
        name: "description",
        content:
          "Review possible duplicate identities across sources and decide whether to merge or keep entities separate.",
      },
      { property: "og:title", content: "Entity Resolution — Chanakya" },
      { property: "og:description", content: "Investigator-reviewed identity matching across fragmented records." },
    ],
  }),
  component: Entities,
});

function Entities() {
  const [decisions, setDecisions] = useState<Record<string, "merged" | "separate">>({});
  const [evidenceId, setEvidenceId] = useState<string | null>(null);

  const pending = MERGE_CANDIDATES.filter((c) => !decisions[c.id]).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Investigate"
        title="Entity Resolution"
        description="The same person can appear differently across an FIR, a bank record and a social profile. Suggested matches are never merged automatically — every decision is yours and is logged."
        actions={<Chip tone={pending ? "warn" : "ok"}>{pending} awaiting review</Chip>}
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {MERGE_CANDIDATES.map((c) => {
            const decision = decisions[c.id];
            return (
              <article key={c.id} className="panel p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="label-eyebrow">Possible identity match</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {c.variants.map((v, i) => (
                        <span key={v} className="flex items-center gap-2">
                          {i > 0 && <span className="text-muted-foreground">≈</span>}
                          <span className="rounded-sm border border-border bg-surface-2 px-2 py-1 text-[13px] text-foreground">
                            {v}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="w-40">
                    <div className="label-eyebrow mb-1">Match confidence</div>
                    <Confidence value={c.confidence} />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="label-eyebrow mb-2">Matching signals</div>
                    <ul className="space-y-1.5">
                      {c.signals.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-[12.5px] text-foreground/90">
                          <Check className="h-3.5 w-3.5 shrink-0 text-success" strokeWidth={2.2} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="label-eyebrow mb-2">Evidence</div>
                    <div className="space-y-1.5">
                      {c.sources.map((s) => (
                        <EvidenceLink key={s} id={s} onOpen={setEvidenceId} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                  {decision ? (
                    <Chip tone={decision === "merged" ? "ok" : "neutral"}>
                      {decision === "merged" ? "Merged by Insp. A. Verma" : "Kept separate by Insp. A. Verma"}
                    </Chip>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setDecisions((d) => ({ ...d, [c.id]: "merged" }))}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[12.5px] font-medium text-primary-foreground hover:opacity-90"
                      >
                        <GitMerge className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Merge Entities
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecisions((d) => ({ ...d, [c.id]: "separate" }))}
                        className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-[12.5px] text-foreground hover:bg-surface-2"
                      >
                        <Split className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Keep Separate
                      </button>
                    </>
                  )}
                  <span className="ml-auto text-[11px] text-muted-foreground">
                    Requires review · decision recorded in audit log
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="space-y-4">
          <section className="panel">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Users className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
              <span className="label-eyebrow">Entity Inventory</span>
            </div>
            <ul className="divide-y divide-border">
              {(Object.keys(ENTITY_KIND_META) as (keyof typeof ENTITY_KIND_META)[]).map((k) => (
                <li key={k} className="flex items-center gap-2 px-4 py-2.5 text-[12.5px]">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: `color-mix(in oklab, ${ENTITY_KIND_META[k].token} 35%, transparent)`,
                      border: `1px solid ${ENTITY_KIND_META[k].token}`,
                    }}
                  />
                  <span className="flex-1 text-muted-foreground">{ENTITY_KIND_META[k].label}</span>
                  <span className="font-mono tabular-nums text-foreground">
                    {NODES.filter((n) => n.kind === k).length}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border px-4 py-2.5">
              <Link to="/network" className="text-[12px] text-primary hover:underline">
                Open network workspace →
              </Link>
            </div>
          </section>
          <AiNotice />
        </div>
      </div>

      <EvidenceViewer id={evidenceId} onClose={() => setEvidenceId(null)} />
    </AppShell>
  );
}
