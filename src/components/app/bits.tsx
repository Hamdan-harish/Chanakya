import { AlertTriangle, FileText, X } from "lucide-react";
import type { ReactNode } from "react";
import { EVIDENCE } from "@/data/case-data";
import { cn } from "@/lib/utils";

export function Confidence({ value, className }: { value: number; className?: string }) {
  const tone =
    value >= 80 ? "bg-primary" : value >= 60 ? "bg-warning" : "bg-muted-foreground";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1 w-full min-w-14 overflow-hidden rounded-full bg-surface-2">
        <div className={cn("h-full rounded-full", tone)} style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{value}%</span>
    </div>
  );
}

export function SeverityTag({ level }: { level: string }) {
  const l = level.toUpperCase();
  const cls =
    l === "HIGH"
      ? "border-destructive/40 bg-destructive/12 text-destructive"
      : l === "MEDIUM"
        ? "border-warning/40 bg-warning/12 text-warning"
        : l === "LOW"
          ? "border-primary/35 bg-primary/12 text-primary"
          : "border-border bg-surface-2 text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-0.5 font-mono text-[10px] tracking-widest",
        cls,
      )}
    >
      {l}
    </span>
  );
}

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "info" | "risk" | "warn" | "ok";
  className?: string;
}) {
  const map = {
    neutral: "border-border bg-surface-2 text-muted-foreground",
    info: "border-primary/30 bg-primary/10 text-primary",
    risk: "border-destructive/35 bg-destructive/10 text-destructive",
    warn: "border-warning/35 bg-warning/10 text-warning",
    ok: "border-success/35 bg-success/10 text-success",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[11px]",
        map[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatBlock({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "risk" | "info";
}) {
  return (
    <div className="rounded-sm border border-border bg-surface px-3.5 py-3">
      <div className="label-eyebrow">{label}</div>
      <div
        className={cn(
          "mt-1.5 font-mono text-xl tabular-nums",
          tone === "risk" ? "text-destructive" : tone === "info" ? "text-primary" : "text-foreground",
        )}
      >
        {value}
      </div>
      {hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function EvidenceLink({
  id,
  label,
  onOpen,
}: {
  id: string;
  label?: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      className="focus-ring group inline-flex w-full items-center gap-2 rounded-sm border border-border bg-surface-2/50 px-2.5 py-2 text-left transition-colors hover:border-primary/40 hover:bg-primary/8"
    >
      <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-primary" strokeWidth={1.75} />
      <span className="font-mono text-[11px] text-primary">{id}</span>
      {label && <span className="truncate text-[12px] text-muted-foreground">{label}</span>}
    </button>
  );
}

export function EvidenceViewer({
  id,
  onClose,
}: {
  id: string | null;
  onClose: () => void;
}) {
  if (!id) return null;
  const rec = EVIDENCE[id];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[80vh] w-full max-w-xl overflow-auto rounded-sm border border-border-strong bg-surface shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <div className="label-eyebrow">Source record · raw evidence</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-mono text-sm text-primary">{id}</span>
              <span className="text-sm text-foreground">{rec?.title ?? "Record unavailable"}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-sm p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {rec ? (
          <div className="space-y-4 px-5 py-4">
            <div className="flex flex-wrap gap-2">
              <Chip>{rec.type}</Chip>
              <Chip>{rec.captured}</Chip>
            </div>
            <div className="rounded-sm border border-border bg-background px-3.5 py-3 text-[13px] leading-relaxed text-foreground/90">
              {rec.body}
            </div>
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {rec.fields.map((f) => (
                <div key={f.label} className="bg-surface px-3 py-2">
                  <dt className="label-eyebrow">{f.label}</dt>
                  <dd className="mt-0.5 font-mono text-[12px] text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex items-start gap-2 text-[11px] text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
              Raw source material. Fictional demonstration data — no real personal information.
            </div>
          </div>
        ) : (
          <div className="px-5 py-8 text-center text-[13px] text-muted-foreground">
            No preview available for this record.
          </div>
        )}
      </div>
    </div>
  );
}
