import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Database,
  Eye,
  FileText,
  Globe,
  Lock,
  Phone,
  Upload,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Chip } from "@/components/app/bits";
import { INITIAL_FILES, type UploadedFile } from "@/data/case-data";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence Ingestion — Chanakya" },
      {
        name: "description",
        content:
          "Ingest FIRs, call detail records, financial transactions, criminal history, surveillance reports and social media intelligence into one case file.",
      },
      { property: "og:title", content: "Evidence Ingestion — Chanakya" },
      {
        property: "og:description",
        content: "Upload and track multi-source crime evidence for automated entity extraction.",
      },
    ],
  }),
  component: Evidence,
});

const SOURCES: {
  icon: LucideIcon;
  name: string;
  desc: string;
  formats: string;
}[] = [
  {
    icon: FileText,
    name: "FIR / Police Report",
    desc: "First information reports, case diaries and witness statements. Text is parsed for named subjects, locations and vehicles.",
    formats: "PDF, DOCX, TXT",
  },
  {
    icon: Phone,
    name: "Call Detail Records",
    desc: "Operator CDR exports. Builds communication links, call bursts and tower-based movement.",
    formats: "CSV, XLSX",
  },
  {
    icon: Building2,
    name: "Financial Transactions",
    desc: "Bank statement extracts and transfer logs. Detects layering, round-figure flows and timing correlation.",
    formats: "CSV, XLSX",
  },
  {
    icon: Database,
    name: "Criminal History",
    desc: "Prior records and antecedent data used to weight entity context. Never treated as proof of current involvement.",
    formats: "CSV, JSON",
  },
  {
    icon: Eye,
    name: "Surveillance Reports",
    desc: "Officer observation logs and vehicle sightings. Anchors entities to places and times.",
    formats: "PDF, TXT",
  },
  {
    icon: Globe,
    name: "Social Media Intelligence",
    desc: "Open-source profile and posting data. Resolves aliases and group affiliations.",
    formats: "JSON, CSV, TXT",
  },
];

function statusTone(s: UploadedFile["status"]) {
  return s === "Ready" ? "ok" : s === "Parsing" ? "info" : s === "Error" ? "risk" : "neutral";
}

function Evidence() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadedFile[]>(INITIAL_FILES);
  const [dragging, setDragging] = useState(false);

  const addFile = (source: string, format: string) => {
    const n = files.length + 1;
    setFiles((f) => [
      ...f,
      {
        name: `${source.toLowerCase().replace(/[^a-z]/g, "_")}_${n}.${format.toLowerCase()}`,
        source,
        format,
        size: `${(Math.random() * 6 + 0.5).toFixed(1)} MB`,
        uploaded: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
        status: "Queued",
      },
    ]);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Case · OP-2026-001"
        title="Evidence & Data Ingestion"
        description="Chanakya correlates six independent evidence streams. The more sources supplied, the stronger the cross-source corroboration."
        actions={
          <Chip tone="info">
            {files.filter((f) => f.status === "Ready").length} of {files.length} ready
          </Chip>
        }
      />

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {SOURCES.map((s) => (
          <div
            key={s.name}
            className="panel flex flex-col p-4 transition-colors hover:border-border-strong"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border bg-surface-2">
                <s.icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-medium text-foreground">{s.name}</div>
                <div className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
              <span className="font-mono text-[10.5px] tracking-wider text-muted-foreground">
                {s.formats}
              </span>
              <button
                type="button"
                onClick={() =>
                  addFile(s.name.split(" ")[0] ?? s.name, s.formats.split(",")[0]!.trim())
                }
                className="focus-ring inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1.5 text-[12px] text-foreground hover:border-primary/50 hover:bg-primary/10"
              >
                <Upload className="h-3.5 w-3.5" strokeWidth={1.75} />
                Upload
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFile("Mixed", "CSV");
        }}
        className={`mt-4 flex flex-col items-center justify-center rounded-sm border border-dashed px-6 py-8 text-center transition-colors ${
          dragging ? "border-primary bg-primary/8" : "border-border-strong bg-surface/50"
        }`}
      >
        <UploadCloud className="h-6 w-6 text-muted-foreground" strokeWidth={1.5} />
        <div className="mt-2 text-[13px] text-foreground">Drop evidence files here to upload</div>
        <div className="mt-1 text-[11.5px] text-muted-foreground">
          Source type is auto-detected from file structure · Max 250 MB per file
        </div>
      </div>

      <section className="panel mt-6 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="label-eyebrow">Uploaded Evidence</div>
          <span className="font-mono text-[11px] text-muted-foreground">{files.length} files</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                {["Filename", "Source", "Format", "Size", "Uploaded", "Status"].map((h) => (
                  <th key={h} className="label-eyebrow px-4 py-2 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {files.map((f, i) => (
                <tr key={i} className="hover:bg-surface-2/60">
                  <td className="px-4 py-2.5 font-mono text-foreground">{f.name}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{f.source}</td>
                  <td className="px-4 py-2.5 font-mono text-muted-foreground">{f.format}</td>
                  <td className="px-4 py-2.5 font-mono tabular-nums text-muted-foreground">
                    {f.size}
                  </td>
                  <td className="px-4 py-2.5 font-mono tabular-nums text-muted-foreground">
                    {f.uploaded}
                  </td>
                  <td className="px-4 py-2.5">
                    <Chip tone={statusTone(f.status)}>{f.status}</Chip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
          <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
          Case data is restricted to authorized investigators.
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/processing" })}
          className="focus-ring rounded-sm bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90"
        >
          Process Investigation
        </button>
      </div>
    </AppShell>
  );
}
