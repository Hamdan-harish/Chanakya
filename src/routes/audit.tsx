import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/app/AppShell";
import { Chip } from "@/components/app/bits";
import { AUDIT_LOG } from "@/data/case-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log — Chanakya" },
      {
        name: "description",
        content:
          "Immutable record of investigator actions: case access, entity views, merge reviews, searches and report exports.",
      },
      { property: "og:title", content: "Audit Log — Chanakya" },
      { property: "og:description", content: "Full accountability trail for every action taken in the workbench." },
    ],
  }),
  component: Audit,
});

const USERS = ["All investigators", "Insp. A. Verma", "Insp. S. Menon", "Insp. R. Thomas", "System", "Admin"];
const ACTIONS = ["All actions", "Open", "View", "Search", "Filter", "Review", "Upload", "Export", "Analysis", "Login", "Access"];

function Audit() {
  const [user, setUser] = useState(USERS[0]!);
  const [action, setAction] = useState(ACTIONS[0]!);

  const rows = AUDIT_LOG.filter(
    (r) => (user === USERS[0] || r.user === user) && (action === ACTIONS[0] || r.action === action),
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="System"
        title="Audit Log"
        description="Every interaction with case material is recorded. Entries cannot be edited or deleted by investigators."
        actions={
          <div className="flex flex-wrap gap-2">
            <input
              type="date"
              defaultValue="2026-09-05"
              className="focus-ring rounded-sm border border-input bg-background px-2.5 py-1.5 text-[12.5px] text-foreground"
            />
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="focus-ring rounded-sm border border-input bg-background px-2.5 py-1.5 text-[12.5px]"
            >
              {USERS.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="focus-ring rounded-sm border border-input bg-background px-2.5 py-1.5 text-[12.5px]"
            >
              {ACTIONS.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>
        }
      />

      <section className="panel overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <ShieldCheck className="h-3.5 w-3.5 text-success" strokeWidth={1.75} />
          <span className="label-eyebrow">Session trail · 05 Sep 2026</span>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground">{rows.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px]">
            <thead>
              <tr className="border-b border-border">
                {["Timestamp", "User", "Action", "Object", "Case"].map((h) => (
                  <th key={h} className="label-eyebrow px-4 py-2 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r, i) => (
                <tr key={i} className="hover:bg-surface-2/60">
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono tabular-nums text-muted-foreground">
                    {r.time}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-foreground">{r.user}</td>
                  <td className="px-4 py-2.5">
                    <Chip tone={r.action === "Export" ? "warn" : r.action === "Analysis" ? "info" : "neutral"}>
                      {r.action}
                    </Chip>
                  </td>
                  <td className="px-4 py-2.5 text-foreground/90">{r.object}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 font-mono text-muted-foreground">{r.caseId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
