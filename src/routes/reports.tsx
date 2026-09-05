import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, FileJson, FileText, Printer } from "lucide-react";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";
import { Chip, EvidenceLink, EvidenceViewer, SeverityTag } from "@/components/app/bits";
import { EDGES, NODES, PATTERNS, TIMELINE } from "@/data/case-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Investigation Report — Chanakya" },
      {
        name: "description",
        content:
          "Compiled investigation report separating observed evidence, AI-generated analysis and investigator notes, with export options.",
      },
      { property: "og:title", content: "Investigation Report — Chanakya" },
      { property: "og:description", content: "Case summary, key entities, network findings and source references." },
    ],
  }),
  component: Reports,
});

const SECTIONS = [
  "Case Summary",
  "Key Entities",
  "Network Summary",
  "Suspicious Patterns",
  "Timeline",
  "Relationship Evidence",
  "Source References",
];

function Reports() {
  const [evidenceId, setEvidenceId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fire = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const keyEntities = NODES.filter((n) => n.kind === "person" && n.role && n.alert !== "none").slice(0, 5);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Output"
        title="Investigation Report"
        description="Case OPERATION ALPHA · OP-2026-001 · Compiled 05 Sep 2026 by Insp. A. Verma"
        actions={
          <>
            <button
              type="button"
              onClick={() => fire("PDF export queued — report will be watermarked and logged.")}
              className="focus-ring inline-flex items-center gap-1.5 rounded-sm bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90"
            >
              <Download className="h-4 w-4" strokeWidth={1.75} />
              Export PDF
            </button>
            <button
              type="button"
              onClick={() => fire("JSON export queued — includes entity and edge graph.")}
              className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-border px-3.5 py-2 text-[13px] text-foreground hover:bg-surface-2"
            >
              <FileJson className="h-4 w-4" strokeWidth={1.75} />
              Export JSON
            </button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[210px_1fr]">
        <nav className="hidden xl:block">
          <div className="label-eyebrow mb-2">Sections</div>
          <ul className="space-y-1 border-l border-border">
            {SECTIONS.map((s) => (
              <li key={s}>
                <a
                  href={`#${s.replace(/\s+/g, "-").toLowerCase()}`}
                  className="block border-l-2 border-transparent -ml-px py-1 pl-3 text-[12.5px] text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2">
            <LegendRow tone="ok" label="Observed evidence" />
            <LegendRow tone="warn" label="AI-generated analysis" />
            <LegendRow tone="info" label="Investigator note" />
          </div>
        </nav>

        <article className="panel max-w-4xl p-7">
          <header className="border-b border-border pb-5">
            <div className="label-eyebrow">Restricted · For authorised investigative use only</div>
            <h2 className="mt-2 text-[20px] font-semibold tracking-tight text-foreground">
              OPERATION ALPHA — Network Analysis Report
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip>Case OP-2026-001</Chip>
              <Chip>6 evidence sources</Chip>
              <Chip>{NODES.length} entities</Chip>
              <Chip>{EDGES.length} relationships</Chip>
              <Chip tone="risk">{PATTERNS.length} open findings</Chip>
            </div>
          </header>

          <Section id="case-summary" title="Case Summary" tone="ok">
            <p>
              Evidence from FIRs, call detail records, financial statements, surveillance logs, criminal
              history extracts and open-source social intelligence was ingested between 04 Aug and 20 Aug
              2026. Correlation produced a single network of {NODES.length} entities linked by {EDGES.length}{" "}
              relationships, concentrated in four structural clusters: a Kochi core group, a financial ring,
              a transport arm and a Mumbai-side node.
            </p>
          </Section>

          <Section id="key-entities" title="Key Entities" tone="warn">
            <ul className="space-y-2.5">
              {keyEntities.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center gap-2.5">
                  <SeverityTag level={e.alert} />
                  <span className="text-foreground">{e.label}</span>
                  <span className="text-muted-foreground">— {e.role}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    confidence {e.confidence}%
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11.5px] text-muted-foreground">
              Roles above are AI-derived interpretations expressed as possibilities and require corroboration.
            </p>
          </Section>

          <Section id="network-summary" title="Network Summary" tone="ok">
            <p>
              The transport arm connects the Kochi core to the Mumbai node through a single high-betweenness
              subject. Removing that link would disconnect approximately one third of the network, which makes
              it the most analytically significant relationship currently observed.
            </p>
          </Section>

          <Section id="suspicious-patterns" title="Suspicious Patterns" tone="warn">
            <ul className="space-y-2">
              {PATTERNS.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center gap-2.5">
                  <SeverityTag level={p.severity} />
                  <span className="text-foreground">{p.name}</span>
                  <span className="text-muted-foreground">· {p.window}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">{p.confidence}%</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="timeline" title="Timeline" tone="ok">
            <ul className="space-y-1.5 font-mono text-[12px]">
              {TIMELINE.slice(0, 6).map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-24 shrink-0 text-muted-foreground">
                    {t.day} {t.time}
                  </span>
                  <span className="text-foreground/90">{t.title}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="relationship-evidence" title="Relationship Evidence" tone="ok">
            <ul className="space-y-1.5 text-[12.5px]">
              {EDGES.filter((e) => e.suspicious)
                .slice(0, 6)
                .map((e) => (
                  <li key={e.id} className="text-foreground/90">
                    <span className="font-mono text-[11px] text-primary">{e.kind}</span> — {e.detail}
                  </li>
                ))}
            </ul>
          </Section>

          <Section id="source-references" title="Source References" tone="ok">
            <div className="grid gap-1.5 sm:grid-cols-2">
              {["FIR-02", "CDR-114", "TXN-014", "TXN-019", "SUR-07", "SOC-01"].map((s) => (
                <EvidenceLink key={s} id={s} onOpen={setEvidenceId} />
              ))}
            </div>
          </Section>

          <Section id="investigator-note" title="Investigator Note" tone="info">
            <p>
              Merge decision on the “Ramesh Kumar / R. Kumar” identity cluster is pending verification of the
              subscriber record. No operational action to be taken on AI-derived roles until corroborated.
            </p>
          </Section>

          <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Printer className="h-3.5 w-3.5" strokeWidth={1.75} />
              Every export is watermarked and recorded in the audit log.
            </span>
            <span className="font-mono text-[10.5px] tracking-widest text-muted-foreground">
              CHANAKYA · OP-2026-001 · PAGE 1 OF 1
            </span>
          </footer>
        </article>
      </div>

      <AiNotice className="mt-5 max-w-4xl" />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-sm border border-border-strong bg-surface px-4 py-3 text-[12.5px] text-foreground shadow-xl">
          <FileText className="h-4 w-4 text-primary" strokeWidth={1.75} />
          {toast}
        </div>
      )}

      <EvidenceViewer id={evidenceId} onClose={() => setEvidenceId(null)} />
    </AppShell>
  );
}

function LegendRow({ tone, label }: { tone: "ok" | "warn" | "info"; label: string }) {
  const color = tone === "ok" ? "bg-success" : tone === "warn" ? "bg-warning" : "bg-primary";
  return (
    <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
      <span className={`h-2.5 w-0.5 ${color}`} />
      {label}
    </div>
  );
}

function Section({
  id,
  title,
  tone,
  children,
}: {
  id: string;
  title: string;
  tone: "ok" | "warn" | "info";
  children: React.ReactNode;
}) {
  const border =
    tone === "ok" ? "border-l-success/60" : tone === "warn" ? "border-l-warning/70" : "border-l-primary/70";
  const tag = tone === "ok" ? "Observed evidence" : tone === "warn" ? "AI-generated analysis" : "Investigator note";
  return (
    <section id={id} className={`mt-6 border-l-2 pl-4 ${border}`}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[14px] font-semibold text-foreground">{title}</h3>
        <span className="label-eyebrow">{tag}</span>
      </div>
      <div className="mt-2 text-[13px] leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}
