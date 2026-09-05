import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, AiNotice } from "@/components/app/AppShell";
import { Chip } from "@/components/app/bits";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Chanakya" },
      {
        name: "description",
        content:
          "Analysis thresholds, data retention, access control and workspace preferences for the Chanakya investigation platform.",
      },
      { property: "og:title", content: "Settings — Chanakya" },
      { property: "og:description", content: "Configure confidence thresholds, retention and access policy." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="System"
        title="Settings"
        description="Workspace configuration. Changes to analysis thresholds affect how findings are surfaced, not how evidence is stored."
      />

      <div className="grid max-w-4xl gap-4">
        <Panel title="Analysis Thresholds">
          <Row label="Minimum entity confidence to display" value="30%">
            <input type="range" min={0} max={95} defaultValue={30} className="w-48 accent-primary" />
          </Row>
          <Row label="Auto-merge identities" value="Disabled">
            <Chip tone="ok">Manual review required</Chip>
          </Row>
          <Row label="Pattern sensitivity" value="Balanced">
            <select className="focus-ring rounded-sm border border-input bg-background px-2.5 py-1.5 text-[12.5px]">
              <option>Conservative</option>
              <option>Balanced</option>
              <option>Sensitive</option>
            </select>
          </Row>
        </Panel>

        <Panel title="Data Handling">
          <Row label="Case data retention" value="As per departmental policy" />
          <Row label="Export watermarking" value="Enabled on all formats" />
          <Row label="Source provenance recording" value="Always on" />
        </Panel>

        <Panel title="Access & Accountability">
          <Row label="Clearance level" value="L3 — Investigator" />
          <Row label="Session timeout" value="20 minutes idle" />
          <Row label="Audit logging" value="Immutable, department-wide" />
        </Panel>

        <AiNotice />
      </div>
    </AppShell>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel">
      <div className="border-b border-border px-4 py-3">
        <div className="label-eyebrow">{title}</div>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}

function Row({ label, value, children }: { label: string; value: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] text-foreground">{label}</div>
        <div className="text-[11.5px] text-muted-foreground">{value}</div>
      </div>
      {children}
    </div>
  );
}
