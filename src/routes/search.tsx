import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Chip, SeverityTag } from "@/components/app/bits";
import { EDGES, ENTITY_KIND_META, NODES, nodeById } from "@/data/case-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Global Search — Chanakya" },
      {
        name: "description",
        content:
          "Search people, phone numbers, vehicles, bank accounts, locations and cases across every ingested evidence source.",
      },
      { property: "og:title", content: "Global Search — Chanakya" },
      {
        property: "og:description",
        content: "Heterogeneous entity search across the full case index.",
      },
    ],
  }),
  component: GlobalSearch,
});

const SUGGESTIONS = ["98765 43210", "Ravi Kumar", "KA-05-MJ-7781", "A/C 7712", "Warehouse 7"];

function GlobalSearch() {
  const [q, setQ] = useState("98765 43210");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return NODES.filter(
      (n) =>
        n.label.toLowerCase().includes(s) ||
        (n.alias ?? "").toLowerCase().includes(s) ||
        (n.sub ?? "").toLowerCase().includes(s) ||
        n.sources.some((src) => src.toLowerCase().includes(s)),
    );
  }, [q]);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Search"
        title="Global Search"
        description="One query across every entity type, every source and every case in your clearance scope."
      />

      <div className="max-w-4xl">
        <div className="relative">
          <SearchIcon
            className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground"
            strokeWidth={1.75}
          />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search people, phones, vehicles, accounts, locations, cases…"
            className="focus-ring w-full rounded-sm border border-border-strong bg-surface py-3.5 pl-11 pr-4 text-[14px] text-foreground placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <span className="label-eyebrow">Try</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQ(s)}
              className="focus-ring rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="label-eyebrow">
            {results.length} result{results.length === 1 ? "" : "s"} across{" "}
            {new Set(results.map((r) => r.kind)).size} entity types
          </div>

          {results.map((r) => {
            const links = EDGES.filter((e) => e.from === r.id || e.to === r.id);
            const related = links.map((e) => (e.from === r.id ? e.to : e.from));
            const counts: Record<string, number> = {};
            related.forEach((id) => {
              const n = nodeById(id);
              if (n) counts[n.kind] = (counts[n.kind] ?? 0) + 1;
            });
            const person = related.map(nodeById).find((n) => n?.kind === "person");

            return (
              <article key={r.id} className="panel p-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: `color-mix(in oklab, ${ENTITY_KIND_META[r.kind].token} 35%, transparent)`,
                          border: `1px solid ${ENTITY_KIND_META[r.kind].token}`,
                        }}
                      />
                      <span className="label-eyebrow">{ENTITY_KIND_META[r.kind].label}</span>
                      {r.alert !== "none" && <SeverityTag level={r.alert} />}
                    </div>
                    <h2 className="mt-1.5 font-mono text-[15px] text-foreground">{r.label}</h2>
                    {r.sub && <div className="text-[12px] text-muted-foreground">{r.sub}</div>}

                    <div className="mt-3 grid gap-x-8 gap-y-2 text-[12.5px] sm:grid-cols-3">
                      {person && (
                        <div>
                          <div className="label-eyebrow">Associated person</div>
                          <div className="mt-0.5 text-foreground">{person.label}</div>
                        </div>
                      )}
                      <div>
                        <div className="label-eyebrow">Associated case</div>
                        <div className="mt-0.5 font-mono text-foreground">OP-2026-001</div>
                      </div>
                      <div>
                        <div className="label-eyebrow">Related entities</div>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {Object.entries(counts).map(([k, v]) => (
                            <Chip key={k}>
                              {v}{" "}
                              {ENTITY_KIND_META[
                                k as keyof typeof ENTITY_KIND_META
                              ].label.toLowerCase()}
                              {v > 1 ? "s" : ""}
                            </Chip>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/network"
                    search={{ node: r.id }}
                    className="focus-ring shrink-0 rounded-sm border border-border px-3 py-1.5 text-[12.5px] text-foreground hover:border-primary/50 hover:bg-primary/10"
                  >
                    Open Investigation
                  </Link>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                  <span className="label-eyebrow mr-1">Sources</span>
                  {r.sources.map((s) => (
                    <span key={s} className="font-mono text-[11px] text-primary">
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}

          {q && results.length === 0 && (
            <p className="panel px-4 py-8 text-center text-[13px] text-muted-foreground">
              No indexed entity matches “{q}”.
            </p>
          )}
        </div>
      </div>
    </AppShell>
  );
}
