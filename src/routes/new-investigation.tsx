import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";

export const Route = createFileRoute("/new-investigation")({
  head: () => ({
    meta: [
      { title: "Create Investigation — Chanakya" },
      {
        name: "description",
        content: "Register a new criminal network investigation with type, priority and assigned investigator.",
      },
      { property: "og:title", content: "Create Investigation — Chanakya" },
      { property: "og:description", content: "Register a new criminal network investigation case file." },
    ],
  }),
  component: NewInvestigation,
});

const field =
  "focus-ring w-full rounded-sm border border-input bg-background px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/70";

function NewInvestigation() {
  const navigate = useNavigate();
  const [name, setName] = useState("OPERATION ALPHA");
  const caseId = "OP-2026-005";

  return (
    <AppShell>
      <PageHeader
        eyebrow="Case"
        title="Create Investigation"
        description="A case file groups all evidence, extracted entities and analytical findings under one auditable record."
      />

      <form
        className="max-w-3xl"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/evidence" });
        }}
      >
        <div className="panel divide-y divide-border">
          <Row label="Case Name" hint="Operation codename used across the workbench.">
            <input
              className={field}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. OPERATION ALPHA"
              required
            />
          </Row>

          <Row label="Case ID" hint="Auto-generated and immutable.">
            <input className={`${field} font-mono text-muted-foreground`} value={caseId} readOnly />
          </Row>

          <Row label="Investigation Type">
            <select className={field} defaultValue="Organised network">
              {[
                "Organised network",
                "Financial trail",
                "Cross-border movement",
                "Narcotics distribution",
                "Cyber-enabled fraud",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Row>

          <Row label="Description" hint="Brief investigative context. Avoid entering personal data here.">
            <textarea
              className={`${field} min-h-24 resize-y`}
              placeholder="Summary of the reported activity, jurisdiction and initial leads…"
            />
          </Row>

          <Row label="Priority">
            <div className="flex gap-2">
              {["High", "Medium", "Low"].map((p, i) => (
                <label
                  key={p}
                  className="focus-ring flex cursor-pointer items-center gap-2 rounded-sm border border-border bg-background px-3 py-2 text-[13px] has-checked:border-primary/50 has-checked:bg-primary/10"
                >
                  <input type="radio" name="priority" defaultChecked={i === 0} className="accent-primary" />
                  {p}
                </label>
              ))}
            </div>
          </Row>

          <Row label="Assigned Investigator">
            <select className={field} defaultValue="Insp. A. Verma">
              {["Insp. A. Verma", "Insp. S. Menon", "Insp. R. Thomas", "Insp. K. Nair"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Row>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
            Case creation is recorded in the audit log.
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="focus-ring rounded-sm border border-border px-3.5 py-2 text-[13px] text-foreground hover:bg-surface-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="focus-ring rounded-sm bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90"
            >
              Create Investigation
            </button>
          </div>
        </div>
      </form>
    </AppShell>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 px-5 py-4 sm:grid-cols-[190px_1fr] sm:gap-6">
      <div>
        <div className="text-[13px] text-foreground">{label}</div>
        {hint && <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
