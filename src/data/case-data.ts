export type EntityKind =
  | "person"
  | "phone"
  | "account"
  | "vehicle"
  | "location"
  | "organization"
  | "social";

export type RelKind =
  | "CALLS"
  | "TRANSFERS"
  | "OWNS"
  | "VISITED"
  | "ASSOCIATED WITH"
  | "MEMBER OF";

export type AlertLevel = "high" | "medium" | "low" | "none";

export interface EntityNode {
  id: string;
  kind: EntityKind;
  label: string;
  sub?: string;
  alias?: string;
  role?: string;
  confidence?: number;
  alert: AlertLevel;
  cluster: string;
  x: number;
  y: number;
  sources: string[];
  identifiers?: { label: string; value: string }[];
  firstSeen?: string;
}

export interface EntityEdge {
  id: string;
  from: string;
  to: string;
  kind: RelKind;
  confidence: number;
  detail: string;
  source: string;
  count?: number;
  suspicious?: boolean;
}

export const ENTITY_KIND_META: Record<
  EntityKind,
  { label: string; shape: "circle" | "square" | "diamond" | "hex" | "pill" | "triangle"; token: string }
> = {
  person: { label: "Person", shape: "circle", token: "var(--ent-person)" },
  phone: { label: "Phone", shape: "pill", token: "var(--ent-phone)" },
  account: { label: "Bank Account", shape: "square", token: "var(--ent-account)" },
  vehicle: { label: "Vehicle", shape: "hex", token: "var(--ent-vehicle)" },
  location: { label: "Location", shape: "triangle", token: "var(--ent-location)" },
  organization: { label: "Organization", shape: "diamond", token: "var(--ent-org)" },
  social: { label: "Social Account", shape: "pill", token: "var(--ent-social)" },
};

export const REL_KINDS: RelKind[] = [
  "CALLS",
  "TRANSFERS",
  "OWNS",
  "VISITED",
  "ASSOCIATED WITH",
  "MEMBER OF",
];

/** Curated fictional network — laid out in clusters for readability. */
export const NODES: EntityNode[] = [
  // --- Core cluster (Kochi) ---
  {
    id: "p-ravi",
    kind: "person",
    label: "Ravi Kumar",
    alias: "R. Kumar",
    role: "Possible recruiter",
    confidence: 87,
    alert: "high",
    cluster: "Kochi core",
    x: 430,
    y: 330,
    sources: ["FIR-02", "CDR-114", "TXN-019", "SUR-07"],
    identifiers: [
      { label: "Phone", value: "98765 43210" },
      { label: "Vehicle", value: "KL-07-AB-1234" },
      { label: "Location", value: "Kochi" },
    ],
    firstSeen: "04 Aug 2026",
  },
  {
    id: "p-amit",
    kind: "person",
    label: "Amit Sasi",
    alias: "A. Sasi",
    role: "Possible coordinator",
    confidence: 74,
    alert: "medium",
    cluster: "Kochi core",
    x: 620,
    y: 220,
    sources: ["CDR-114", "SUR-03"],
    identifiers: [{ label: "Phone", value: "99887 21140" }],
    firstSeen: "04 Aug 2026",
  },
  {
    id: "p-devan",
    kind: "person",
    label: "Devan Pillai",
    role: "Possible financier",
    confidence: 81,
    alert: "high",
    cluster: "Finance ring",
    x: 300,
    y: 560,
    sources: ["TXN-014", "TXN-019", "FIR-02"],
    identifiers: [{ label: "Phone", value: "90011 55420" }],
    firstSeen: "06 Aug 2026",
  },
  {
    id: "p-suresh",
    kind: "person",
    label: "Suresh Nair",
    role: "Possible transporter",
    confidence: 69,
    alert: "medium",
    cluster: "Transport",
    x: 830,
    y: 520,
    sources: ["SUR-07", "CDR-140"],
    identifiers: [{ label: "Vehicle", value: "KA-05-MJ-7781" }],
    firstSeen: "07 Aug 2026",
  },
  {
    id: "p-farhan",
    kind: "person",
    label: "Farhan Iqbal",
    role: "Possible transporter",
    confidence: 63,
    alert: "medium",
    cluster: "Transport",
    x: 1000,
    y: 620,
    sources: ["SUR-11"],
  },
  {
    id: "p-meera",
    kind: "person",
    label: "Meera Joseph",
    role: "Possible account holder",
    confidence: 58,
    alert: "low",
    cluster: "Finance ring",
    x: 170,
    y: 430,
    sources: ["TXN-022"],
  },
  {
    id: "p-vinod",
    kind: "person",
    label: "Vinod Rajan",
    role: "Peripheral contact",
    confidence: 41,
    alert: "none",
    cluster: "Kochi core",
    x: 640,
    y: 400,
    sources: ["CDR-118"],
  },
  {
    id: "p-anil",
    kind: "person",
    label: "Anil Menon",
    role: "Peripheral contact",
    confidence: 37,
    alert: "none",
    cluster: "Kochi core",
    x: 520,
    y: 130,
    sources: ["CDR-121"],
  },
  {
    id: "p-zoya",
    kind: "person",
    label: "Zoya Rahman",
    role: "Possible intermediary",
    confidence: 55,
    alert: "low",
    cluster: "Mumbai node",
    x: 1160,
    y: 330,
    sources: ["SOC-04", "CDR-133"],
  },
  {
    id: "p-kiran",
    kind: "person",
    label: "Kiran Das",
    role: "Peripheral contact",
    confidence: 33,
    alert: "none",
    cluster: "Mumbai node",
    x: 1240,
    y: 200,
    sources: ["SOC-06"],
  },
  {
    id: "p-tariq",
    kind: "person",
    label: "Tariq Sheikh",
    role: "Possible organiser",
    confidence: 76,
    alert: "high",
    cluster: "Mumbai node",
    x: 1030,
    y: 250,
    sources: ["FIR-05", "CDR-133", "TXN-031"],
  },
  {
    id: "p-jose",
    kind: "person",
    label: "Jose Mathew",
    role: "Witness reference",
    confidence: 44,
    alert: "none",
    cluster: "Kochi core",
    x: 330,
    y: 190,
    sources: ["FIR-02"],
  },

  // --- Phones ---
  { id: "ph-1", kind: "phone", label: "98765 43210", sub: "Prepaid · Kochi", alert: "high", cluster: "Kochi core", x: 430, y: 200, sources: ["CDR-114"], confidence: 96 },
  { id: "ph-2", kind: "phone", label: "99887 21140", sub: "Prepaid · Kochi", alert: "medium", cluster: "Kochi core", x: 730, y: 150, sources: ["CDR-114"], confidence: 92 },
  { id: "ph-3", kind: "phone", label: "90011 55420", sub: "Postpaid", alert: "medium", cluster: "Finance ring", x: 200, y: 640, sources: ["CDR-118"], confidence: 88 },
  { id: "ph-4", kind: "phone", label: "70123 88190", sub: "Prepaid · Bengaluru", alert: "medium", cluster: "Transport", x: 900, y: 400, sources: ["CDR-140"], confidence: 84 },
  { id: "ph-5", kind: "phone", label: "80234 11902", sub: "Prepaid · Mumbai", alert: "low", cluster: "Mumbai node", x: 1150, y: 150, sources: ["CDR-133"], confidence: 79 },
  { id: "ph-6", kind: "phone", label: "76500 44118", sub: "Prepaid · unregistered", alert: "high", cluster: "Transport", x: 1090, y: 500, sources: ["CDR-140"], confidence: 71 },

  // --- Accounts ---
  { id: "ac-b", kind: "account", label: "A/C 4921", sub: "Coastal Co-op Bank", alert: "high", cluster: "Finance ring", x: 300, y: 720, sources: ["TXN-014"], confidence: 95 },
  { id: "ac-c", kind: "account", label: "A/C 7712", sub: "Metro Urban Bank", alert: "high", cluster: "Finance ring", x: 470, y: 660, sources: ["TXN-019"], confidence: 93 },
  { id: "ac-d", kind: "account", label: "A/C 3390", sub: "Metro Urban Bank", alert: "medium", cluster: "Finance ring", x: 120, y: 560, sources: ["TXN-022"], confidence: 86 },
  { id: "ac-e", kind: "account", label: "A/C 8845", sub: "Harbour Bank", alert: "medium", cluster: "Transport", x: 680, y: 690, sources: ["TXN-027"], confidence: 82 },
  { id: "ac-f", kind: "account", label: "A/C 2260", sub: "Harbour Bank", alert: "low", cluster: "Mumbai node", x: 1230, y: 430, sources: ["TXN-031"], confidence: 77 },

  // --- Vehicles ---
  { id: "v-1", kind: "vehicle", label: "KL-07-AB-1234", sub: "Silver hatchback", alert: "medium", cluster: "Kochi core", x: 560, y: 470, sources: ["SUR-07"], confidence: 90 },
  { id: "v-2", kind: "vehicle", label: "KA-05-MJ-7781", sub: "White panel van", alert: "high", cluster: "Transport", x: 830, y: 660, sources: ["SUR-07", "SUR-11"], confidence: 88 },
  { id: "v-3", kind: "vehicle", label: "MH-12-QT-4402", sub: "Blue sedan", alert: "low", cluster: "Mumbai node", x: 1300, y: 560, sources: ["SUR-14"], confidence: 74 },
  { id: "v-4", kind: "vehicle", label: "KL-11-CD-9087", sub: "Two-wheeler", alert: "none", cluster: "Kochi core", x: 690, y: 320, sources: ["SUR-09"], confidence: 66 },

  // --- Locations ---
  { id: "l-kochi", kind: "location", label: "Kochi — Warehouse 7", alert: "high", cluster: "Kochi core", x: 430, y: 470, sources: ["SUR-07", "FIR-02"], confidence: 91 },
  { id: "l-blr", kind: "location", label: "Bengaluru — Yeshwanthpur", alert: "medium", cluster: "Transport", x: 960, y: 760, sources: ["SUR-11"], confidence: 83 },
  { id: "l-mum", kind: "location", label: "Mumbai — Sewri Docks", alert: "medium", cluster: "Mumbai node", x: 1130, y: 660, sources: ["SUR-14"], confidence: 80 },
  { id: "l-cafe", kind: "location", label: "Kochi — Marine Cafe", alert: "low", cluster: "Kochi core", x: 250, y: 280, sources: ["SUR-03"], confidence: 62 },
  { id: "l-tvm", kind: "location", label: "Thiruvananthapuram Yard", alert: "none", cluster: "Transport", x: 760, y: 790, sources: ["SUR-16"], confidence: 58 },

  // --- Organizations ---
  { id: "o-logi", kind: "organization", label: "Meridian Logistics", sub: "Registered freight firm", alert: "medium", cluster: "Transport", x: 900, y: 250, sources: ["FIR-05", "TXN-027"], confidence: 78 },
  { id: "o-trade", kind: "organization", label: "Anchor Trading Co.", sub: "Import/export", alert: "low", cluster: "Mumbai node", x: 1330, y: 320, sources: ["TXN-031"], confidence: 70 },
  { id: "o-coop", kind: "organization", label: "Coastal Welfare Society", sub: "Registered society", alert: "none", cluster: "Finance ring", x: 130, y: 720, sources: ["FIR-02"], confidence: 52 },

  // --- Social ---
  { id: "s-ravi87", kind: "social", label: "@Ravi_87", sub: "Public profile", alert: "high", cluster: "Kochi core", x: 250, y: 380, sources: ["SOC-01"], confidence: 84 },
  { id: "s-tariq", kind: "social", label: "@t.sheikh.mum", sub: "Public profile", alert: "medium", cluster: "Mumbai node", x: 980, y: 110, sources: ["SOC-04"], confidence: 72 },
  { id: "s-zoya", kind: "social", label: "@zr_frames", sub: "Public profile", alert: "low", cluster: "Mumbai node", x: 1290, y: 100, sources: ["SOC-06"], confidence: 65 },
  { id: "s-transit", kind: "social", label: "@transit_desk", sub: "Group account", alert: "medium", cluster: "Transport", x: 1010, y: 390, sources: ["SOC-09"], confidence: 61 },
];

export const EDGES: EntityEdge[] = [
  { id: "e1", from: "p-ravi", to: "ph-1", kind: "OWNS", confidence: 96, detail: "Subscriber record matches FIR statement.", source: "CDR-114" },
  { id: "e2", from: "p-amit", to: "ph-2", kind: "OWNS", confidence: 92, detail: "Handset IMEI consistently paired.", source: "CDR-114" },
  { id: "e3", from: "ph-1", to: "ph-2", kind: "CALLS", confidence: 94, count: 61, detail: "61 calls across 22 days; 17 within a 15-minute window on 12 Aug.", source: "CDR-114", suspicious: true },
  { id: "e4", from: "p-ravi", to: "p-amit", kind: "ASSOCIATED WITH", confidence: 88, detail: "Co-located at Marine Cafe on three occasions.", source: "SUR-03" },
  { id: "e5", from: "p-ravi", to: "v-1", kind: "OWNS", confidence: 90, detail: "Registration matches investigator note.", source: "SUR-07" },
  { id: "e6", from: "v-1", to: "l-kochi", kind: "VISITED", confidence: 87, count: 6, detail: "Six sightings at Warehouse 7 between 04–14 Aug.", source: "SUR-07" },
  { id: "e7", from: "p-ravi", to: "ac-c", kind: "TRANSFERS", confidence: 89, count: 9, detail: "9 outbound transfers totalling ₹4.6 lakh.", source: "TXN-019", suspicious: true },
  { id: "e8", from: "p-devan", to: "ac-b", kind: "OWNS", confidence: 95, detail: "Primary account holder.", source: "TXN-014" },
  { id: "e9", from: "p-devan", to: "ac-c", kind: "TRANSFERS", confidence: 91, count: 14, detail: "14 transfers, several within 40 minutes of call events.", source: "TXN-014", suspicious: true },
  { id: "e10", from: "p-devan", to: "ph-3", kind: "OWNS", confidence: 88, detail: "Subscriber record.", source: "CDR-118" },
  { id: "e11", from: "ph-3", to: "ph-1", kind: "CALLS", confidence: 85, count: 23, detail: "23 calls, mostly preceding transfer events.", source: "CDR-118", suspicious: true },
  { id: "e12", from: "p-meera", to: "ac-d", kind: "OWNS", confidence: 86, detail: "Account holder of record.", source: "TXN-022" },
  { id: "e13", from: "ac-d", to: "ac-b", kind: "TRANSFERS", confidence: 79, count: 4, detail: "Four round-figure transfers.", source: "TXN-022" },
  { id: "e14", from: "p-meera", to: "o-coop", kind: "MEMBER OF", confidence: 64, detail: "Listed member in society register.", source: "FIR-02" },
  { id: "e15", from: "ac-c", to: "ac-e", kind: "TRANSFERS", confidence: 83, count: 7, detail: "Layered transfers via Harbour Bank.", source: "TXN-027", suspicious: true },
  { id: "e16", from: "p-suresh", to: "ac-e", kind: "OWNS", confidence: 82, detail: "Account holder.", source: "TXN-027" },
  { id: "e17", from: "p-suresh", to: "v-2", kind: "OWNS", confidence: 88, detail: "Registration linked to surveillance sighting.", source: "SUR-07" },
  { id: "e18", from: "v-2", to: "l-kochi", kind: "VISITED", confidence: 84, count: 3, detail: "Van observed at Warehouse 7 on 07, 09 and 12 Aug.", source: "SUR-07", suspicious: true },
  { id: "e19", from: "v-2", to: "l-blr", kind: "VISITED", confidence: 80, count: 2, detail: "Two sightings at Yeshwanthpur yard.", source: "SUR-11" },
  { id: "e20", from: "p-suresh", to: "ph-4", kind: "OWNS", confidence: 84, detail: "Subscriber record.", source: "CDR-140" },
  { id: "e21", from: "ph-4", to: "ph-1", kind: "CALLS", confidence: 78, count: 12, detail: "12 calls clustered around movement events.", source: "CDR-140" },
  { id: "e22", from: "p-farhan", to: "ph-6", kind: "OWNS", confidence: 71, detail: "Unregistered SIM, handset attribution.", source: "CDR-140" },
  { id: "e23", from: "ph-6", to: "ph-4", kind: "CALLS", confidence: 76, count: 18, detail: "18 short-duration calls.", source: "CDR-140" },
  { id: "e24", from: "p-farhan", to: "l-blr", kind: "VISITED", confidence: 73, detail: "Observed at yard entrance.", source: "SUR-11" },
  { id: "e25", from: "p-suresh", to: "o-logi", kind: "MEMBER OF", confidence: 77, detail: "Listed as contract driver.", source: "FIR-05" },
  { id: "e26", from: "o-logi", to: "ac-e", kind: "TRANSFERS", confidence: 74, count: 5, detail: "Freight payments to driver account.", source: "TXN-027" },
  { id: "e27", from: "p-tariq", to: "o-logi", kind: "ASSOCIATED WITH", confidence: 75, detail: "Named in freight documentation.", source: "FIR-05" },
  { id: "e28", from: "p-tariq", to: "ph-5", kind: "OWNS", confidence: 79, detail: "Subscriber record.", source: "CDR-133" },
  { id: "e29", from: "ph-5", to: "ph-2", kind: "CALLS", confidence: 81, count: 27, detail: "27 calls; burst pattern on 12 Aug.", source: "CDR-133", suspicious: true },
  { id: "e30", from: "p-tariq", to: "ac-f", kind: "TRANSFERS", confidence: 72, count: 6, detail: "Six transfers to Anchor Trading.", source: "TXN-031" },
  { id: "e31", from: "ac-f", to: "o-trade", kind: "TRANSFERS", confidence: 70, count: 3, detail: "Settlement transfers.", source: "TXN-031" },
  { id: "e32", from: "p-zoya", to: "s-zoya", kind: "OWNS", confidence: 65, detail: "Profile handle matches alias.", source: "SOC-06" },
  { id: "e33", from: "p-zoya", to: "p-tariq", kind: "ASSOCIATED WITH", confidence: 68, detail: "Repeated tagged posts at shared locations.", source: "SOC-04" },
  { id: "e34", from: "p-tariq", to: "s-tariq", kind: "OWNS", confidence: 72, detail: "Handle linked via phone recovery hint.", source: "SOC-04" },
  { id: "e35", from: "p-ravi", to: "s-ravi87", kind: "OWNS", confidence: 84, detail: "Alias 'Ravi_87' matches FIR alias and posted vehicle image.", source: "SOC-01", suspicious: true },
  { id: "e36", from: "s-ravi87", to: "s-transit", kind: "MEMBER OF", confidence: 61, detail: "Member of transit coordination group.", source: "SOC-09" },
  { id: "e37", from: "s-transit", to: "s-tariq", kind: "MEMBER OF", confidence: 60, detail: "Shared group membership.", source: "SOC-09" },
  { id: "e38", from: "p-ravi", to: "l-cafe", kind: "VISITED", confidence: 62, count: 3, detail: "Three observed meetings.", source: "SUR-03" },
  { id: "e39", from: "p-jose", to: "l-cafe", kind: "VISITED", confidence: 55, detail: "Witness statement places him nearby.", source: "FIR-02" },
  { id: "e40", from: "p-jose", to: "p-ravi", kind: "ASSOCIATED WITH", confidence: 49, detail: "Witness identifies subject.", source: "FIR-02" },
  { id: "e41", from: "p-vinod", to: "p-amit", kind: "ASSOCIATED WITH", confidence: 47, detail: "Frequent contact, no financial linkage.", source: "CDR-118" },
  { id: "e42", from: "p-anil", to: "ph-2", kind: "CALLS", confidence: 44, count: 5, detail: "Five calls, routine pattern.", source: "CDR-121" },
  { id: "e43", from: "p-kiran", to: "p-zoya", kind: "ASSOCIATED WITH", confidence: 38, detail: "Social connection only.", source: "SOC-06" },
  { id: "e44", from: "v-3", to: "l-mum", kind: "VISITED", confidence: 69, count: 2, detail: "Two sightings near dock gate.", source: "SUR-14" },
  { id: "e45", from: "p-tariq", to: "v-3", kind: "OWNS", confidence: 66, detail: "Registration attribution pending confirmation.", source: "SUR-14" },
  { id: "e46", from: "v-2", to: "l-mum", kind: "VISITED", confidence: 64, detail: "Single sighting, plate partially obscured.", source: "SUR-14" },
  { id: "e47", from: "p-ravi", to: "v-4", kind: "ASSOCIATED WITH", confidence: 40, detail: "Vehicle parked at same premises.", source: "SUR-09" },
  { id: "e48", from: "p-amit", to: "l-kochi", kind: "VISITED", confidence: 71, count: 4, detail: "Four sightings at warehouse.", source: "SUR-07" },
  { id: "e49", from: "l-blr", to: "l-mum", kind: "ASSOCIATED WITH", confidence: 58, detail: "Repeated same-week movement corridor.", source: "SUR-11" },
  { id: "e50", from: "p-farhan", to: "l-tvm", kind: "VISITED", confidence: 52, detail: "Single sighting.", source: "SUR-16" },
];

export interface CaseRecord {
  id: string;
  name: string;
  status: "Active" | "Under Review" | "Archived" | "Draft";
  created: string;
  updated: string;
  entities: number;
  relationships: number;
  alerts: number;
  owner: string;
  type: string;
  priority: "High" | "Medium" | "Low";
}

export const CASES: CaseRecord[] = [
  {
    id: "OP-2026-001",
    name: "OPERATION ALPHA",
    status: "Active",
    created: "04 Aug 2026",
    updated: "12 minutes ago",
    entities: 23,
    relationships: 47,
    alerts: 4,
    owner: "Insp. A. Verma",
    type: "Organised network",
    priority: "High",
  },
  {
    id: "OP-2026-002",
    name: "OPERATION BRAVO",
    status: "Under Review",
    created: "22 Jul 2026",
    updated: "3 hours ago",
    entities: 18,
    relationships: 31,
    alerts: 2,
    owner: "Insp. S. Menon",
    type: "Financial trail",
    priority: "Medium",
  },
  {
    id: "OP-2026-003",
    name: "OPERATION CITADEL",
    status: "Active",
    created: "11 Jul 2026",
    updated: "yesterday",
    entities: 41,
    relationships: 96,
    alerts: 7,
    owner: "Insp. R. Thomas",
    type: "Cross-border movement",
    priority: "High",
  },
  {
    id: "OP-2026-004",
    name: "OPERATION DELTA",
    status: "Archived",
    created: "02 May 2026",
    updated: "18 Jun 2026",
    entities: 12,
    relationships: 19,
    alerts: 0,
    owner: "Insp. K. Nair",
    type: "Local racket",
    priority: "Low",
  },
];

export const RECENT_ACTIVITY = [
  { time: "12:46", who: "Insp. A. Verma", what: "Exported investigation report", ctx: "OP-2026-001" },
  { time: "12:44", who: "Insp. A. Verma", what: "Reviewed entity merge suggestion", ctx: "Ramesh Kumar / R. Kumar" },
  { time: "12:43", who: "Insp. A. Verma", what: "Viewed entity Ravi Kumar", ctx: "OP-2026-001" },
  { time: "12:42", who: "Insp. A. Verma", what: "Opened case", ctx: "OP-2026-001" },
  { time: "11:58", who: "Insp. S. Menon", what: "Uploaded cdr_august.csv", ctx: "OP-2026-002" },
  { time: "11:20", who: "System", what: "Pattern analysis completed — 7 findings", ctx: "OP-2026-001" },
];

export interface UploadedFile {
  name: string;
  source: string;
  format: string;
  size: string;
  uploaded: string;
  status: "Ready" | "Parsing" | "Queued" | "Error";
}

export const INITIAL_FILES: UploadedFile[] = [
  { name: "FIR_002.pdf", source: "FIR", format: "PDF", size: "2.4 MB", uploaded: "13:42", status: "Ready" },
  { name: "cdr_august.csv", source: "CDR", format: "CSV", size: "8.1 MB", uploaded: "13:43", status: "Ready" },
  { name: "transactions.csv", source: "Financial", format: "CSV", size: "4.7 MB", uploaded: "13:44", status: "Ready" },
  { name: "surveillance_log_07.pdf", source: "Surveillance", format: "PDF", size: "1.2 MB", uploaded: "13:45", status: "Ready" },
  { name: "criminal_history.json", source: "Criminal History", format: "JSON", size: "760 KB", uploaded: "13:46", status: "Parsing" },
  { name: "social_intel_aug.json", source: "Social Intelligence", format: "JSON", size: "3.3 MB", uploaded: "13:47", status: "Queued" },
];

export interface Pattern {
  id: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  name: string;
  entities: number;
  window: string;
  reason: string;
  confidence: number;
  sources: number;
  focus: string[];
  metric: string;
}

export const PATTERNS: Pattern[] = [
  {
    id: "pat-1",
    severity: "HIGH",
    name: "Coordinated Communication Burst",
    entities: 23,
    window: "12 Aug · 18:40–19:05",
    reason: "17 calls between 6 handsets inside 15 minutes, followed by three transfers within the hour.",
    confidence: 91,
    sources: 3,
    metric: "17 calls / 15 min",
    focus: ["ph-1", "ph-2", "ph-3", "ph-4", "ph-5", "ph-6", "p-ravi", "p-amit", "p-tariq"],
  },
  {
    id: "pat-2",
    severity: "MEDIUM",
    name: "Unusual Financial Flow",
    entities: 7,
    window: "04–14 Aug",
    reason: "₹18.4 lakh moved through 7 accounts in layered round-figure transfers with short dwell time.",
    confidence: 84,
    sources: 2,
    metric: "₹18.4 lakh / 7 accounts",
    focus: ["ac-b", "ac-c", "ac-d", "ac-e", "ac-f", "p-devan", "p-ravi"],
  },
  {
    id: "pat-3",
    severity: "MEDIUM",
    name: "Repeated Cross-Location Activity",
    entities: 9,
    window: "07–18 Aug",
    reason: "Same vehicle observed on the Kochi → Bengaluru → Mumbai corridor on three consecutive weeks.",
    confidence: 78,
    sources: 2,
    metric: "Kochi → Bengaluru → Mumbai",
    focus: ["v-2", "l-kochi", "l-blr", "l-mum", "p-suresh", "p-farhan"],
  },
  {
    id: "pat-4",
    severity: "LOW",
    name: "Alias Convergence Across Sources",
    entities: 4,
    window: "04–20 Aug",
    reason: "Social handle '@Ravi_87' shares alias, vehicle image and location with an FIR-named subject.",
    confidence: 69,
    sources: 3,
    metric: "3 sources agree",
    focus: ["s-ravi87", "p-ravi", "v-1", "l-kochi"],
  },
];

export interface TimelineEvent {
  day: string;
  time: string;
  kind: "Call" | "Transaction" | "Location" | "Report" | "Social";
  title: string;
  detail: string;
  source: string;
  focus: string[];
  flagged?: boolean;
}

export const TIMELINE: TimelineEvent[] = [
  { day: "04 AUG", time: "09:42", kind: "Call", title: "Call · Ravi Kumar → Amit Sasi", detail: "Duration 4m 12s", source: "CDR-114", focus: ["ph-1", "ph-2"] },
  { day: "04 AUG", time: "11:10", kind: "Transaction", title: "Transfer ₹50,000", detail: "A/C 4921 → A/C 7712", source: "TXN-014", focus: ["ac-b", "ac-c"] },
  { day: "04 AUG", time: "16:20", kind: "Report", title: "FIR registered", detail: "Witness statement naming subject and alias", source: "FIR-02", focus: ["p-ravi", "p-jose"] },
  { day: "07 AUG", time: "18:30", kind: "Location", title: "Vehicle sighting · KA-05-MJ-7781", detail: "Kochi — Warehouse 7", source: "SUR-07", focus: ["v-2", "l-kochi"] },
  { day: "07 AUG", time: "19:04", kind: "Call", title: "Call · Amit Sasi → Tariq Sheikh", detail: "Duration 1m 03s", source: "CDR-133", focus: ["ph-2", "ph-5"] },
  { day: "09 AUG", time: "13:15", kind: "Transaction", title: "Transfer ₹80,000", detail: "Ravi Kumar → A/C 7712", source: "TXN-019", focus: ["p-ravi", "ac-c"] },
  { day: "09 AUG", time: "22:05", kind: "Social", title: "Post by @Ravi_87", detail: "Image containing vehicle KL-07-AB-1234", source: "SOC-01", focus: ["s-ravi87", "v-1"] },
  { day: "12 AUG", time: "18:40", kind: "Call", title: "Communication burst", detail: "17 calls across 6 handsets in 15 minutes", source: "CDR-114", focus: ["ph-1", "ph-2", "ph-3", "ph-4"], flagged: true },
  { day: "12 AUG", time: "19:22", kind: "Transaction", title: "Transfer ₹1,20,000", detail: "A/C 7712 → A/C 8845", source: "TXN-027", focus: ["ac-c", "ac-e"], flagged: true },
  { day: "14 AUG", time: "07:55", kind: "Location", title: "Vehicle sighting · KA-05-MJ-7781", detail: "Bengaluru — Yeshwanthpur", source: "SUR-11", focus: ["v-2", "l-blr"] },
  { day: "18 AUG", time: "21:10", kind: "Location", title: "Vehicle sighting · KA-05-MJ-7781", detail: "Mumbai — Sewri Docks", source: "SUR-14", focus: ["v-2", "l-mum"], flagged: true },
];

export interface MergeCandidate {
  id: string;
  variants: string[];
  confidence: number;
  signals: string[];
  sources: string[];
}

export const MERGE_CANDIDATES: MergeCandidate[] = [
  {
    id: "mc-1",
    variants: ["Ramesh Kumar", "R. Kumar", "Ramesh K.", "रमेश कुमार"],
    confidence: 94,
    signals: ["Similar name", "Same phone number", "Same location", "Overlapping network connections"],
    sources: ["FIR-02", "CDR-114", "TXN-019"],
  },
  {
    id: "mc-2",
    variants: ["Suresh Nair", "S. Nair", "Suresh N."],
    confidence: 88,
    signals: ["Similar name", "Shared vehicle registration", "Same employer record"],
    sources: ["FIR-05", "SUR-07", "TXN-027"],
  },
  {
    id: "mc-3",
    variants: ["Tariq Sheikh", "T. Shaikh"],
    confidence: 71,
    signals: ["Phonetic name match", "Overlapping call circle"],
    sources: ["CDR-133", "SOC-04"],
  },
  {
    id: "mc-4",
    variants: ["Meera Joseph", "Meera J.", "M. Joseph"],
    confidence: 63,
    signals: ["Similar name", "Same bank branch"],
    sources: ["TXN-022"],
  },
];

export interface EvidenceRecord {
  id: string;
  type: string;
  title: string;
  captured: string;
  body: string;
  fields: { label: string; value: string }[];
}

export const EVIDENCE: Record<string, EvidenceRecord> = {
  "TXN-014": {
    id: "TXN-014",
    type: "Financial transaction",
    title: "₹45,000 → A/C 4921",
    captured: "04 Aug 2026 · 11:10",
    body: "Round-figure IMPS transfer recorded in bank statement extract. Beneficiary account opened 11 weeks prior to transfer with minimal prior activity.",
    fields: [
      { label: "Amount", value: "₹45,000" },
      { label: "From", value: "A/C 3390 · Metro Urban Bank" },
      { label: "To", value: "A/C 4921 · Coastal Co-op Bank" },
      { label: "Channel", value: "IMPS" },
      { label: "File", value: "transactions.csv · row 412" },
    ],
  },
  "TXN-019": {
    id: "TXN-019",
    type: "Financial transaction",
    title: "₹80,000 → A/C 7712",
    captured: "09 Aug 2026 · 13:15",
    body: "Transfer initiated 38 minutes after a recorded call event between the same two network members.",
    fields: [
      { label: "Amount", value: "₹80,000" },
      { label: "From", value: "A/C 4921 · Coastal Co-op Bank" },
      { label: "To", value: "A/C 7712 · Metro Urban Bank" },
      { label: "Channel", value: "NEFT" },
      { label: "File", value: "transactions.csv · row 588" },
    ],
  },
  "TXN-027": {
    id: "TXN-027",
    type: "Financial transaction",
    title: "₹1,20,000 → A/C 8845",
    captured: "12 Aug 2026 · 19:22",
    body: "Transfer occurred 17 minutes after the coordinated communication burst window closed.",
    fields: [
      { label: "Amount", value: "₹1,20,000" },
      { label: "From", value: "A/C 7712 · Metro Urban Bank" },
      { label: "To", value: "A/C 8845 · Harbour Bank" },
      { label: "Channel", value: "RTGS" },
      { label: "File", value: "transactions.csv · row 903" },
    ],
  },
  "CDR-114": {
    id: "CDR-114",
    type: "Call detail record",
    title: "Call with Suspect B",
    captured: "12 Aug 2026 · 18:44",
    body: "Extracted from operator CDR export. Cell tower location consistent with Warehouse 7 vicinity.",
    fields: [
      { label: "A-party", value: "98765 43210" },
      { label: "B-party", value: "99887 21140" },
      { label: "Duration", value: "0m 41s" },
      { label: "Cell ID", value: "KL-EKM-0447" },
      { label: "File", value: "cdr_august.csv · row 11,204" },
    ],
  },
  "CDR-118": {
    id: "CDR-118",
    type: "Call detail record",
    title: "Recurring call pair",
    captured: "04–18 Aug 2026",
    body: "23 calls between the two handsets, of which 9 precede a financial transfer within 60 minutes.",
    fields: [
      { label: "A-party", value: "90011 55420" },
      { label: "B-party", value: "98765 43210" },
      { label: "Calls", value: "23" },
      { label: "File", value: "cdr_august.csv" },
    ],
  },
  "CDR-133": {
    id: "CDR-133",
    type: "Call detail record",
    title: "Inter-city call cluster",
    captured: "07–18 Aug 2026",
    body: "27 calls between Kochi and Mumbai handsets, with burst behaviour on 12 Aug.",
    fields: [
      { label: "A-party", value: "80234 11902" },
      { label: "B-party", value: "99887 21140" },
      { label: "Calls", value: "27" },
      { label: "File", value: "cdr_august.csv" },
    ],
  },
  "CDR-140": {
    id: "CDR-140",
    type: "Call detail record",
    title: "Transport handset activity",
    captured: "07–20 Aug 2026",
    body: "Short-duration calls clustered around vehicle movement windows.",
    fields: [
      { label: "A-party", value: "70123 88190" },
      { label: "B-party", value: "76500 44118" },
      { label: "Calls", value: "18" },
      { label: "File", value: "cdr_august.csv" },
    ],
  },
  "FIR-02": {
    id: "FIR-02",
    type: "FIR / Police report",
    title: "Witness reference",
    captured: "04 Aug 2026 · 16:20",
    body: "Witness statement refers to an individual known locally by the alias 'R. Kumar' seen loading goods at a coastal warehouse premises. Statement is uncorroborated and requires verification.",
    fields: [
      { label: "Station", value: "Ernakulam Central" },
      { label: "Sections", value: "Withheld in prototype" },
      { label: "Witness", value: "Redacted" },
      { label: "File", value: "FIR_002.pdf · page 3" },
    ],
  },
  "FIR-05": {
    id: "FIR-05",
    type: "FIR / Police report",
    title: "Freight firm reference",
    captured: "22 Jul 2026",
    body: "Report names a registered freight firm in connection with irregular consignment documentation.",
    fields: [
      { label: "Station", value: "Bengaluru North" },
      { label: "File", value: "FIR_005.pdf · page 2" },
    ],
  },
  "SUR-03": {
    id: "SUR-03",
    type: "Surveillance report",
    title: "Cafe meeting observation",
    captured: "06 Aug 2026 · 17:05",
    body: "Two subjects observed meeting for approximately 25 minutes. No exchange of items observed.",
    fields: [
      { label: "Location", value: "Kochi — Marine Cafe" },
      { label: "Officer", value: "Redacted" },
      { label: "File", value: "surveillance_log_07.pdf" },
    ],
  },
  "SUR-07": {
    id: "SUR-07",
    type: "Surveillance report",
    title: "Warehouse 7 vehicle log",
    captured: "07 Aug 2026 · 18:30",
    body: "Panel van observed entering premises and departing after 51 minutes. Partial plate confirmed against registry.",
    fields: [
      { label: "Location", value: "Kochi — Warehouse 7" },
      { label: "Vehicle", value: "KA-05-MJ-7781" },
      { label: "File", value: "surveillance_log_07.pdf" },
    ],
  },
  "SUR-11": {
    id: "SUR-11",
    type: "Surveillance report",
    title: "Yeshwanthpur yard sighting",
    captured: "14 Aug 2026 · 07:55",
    body: "Same panel van observed at transit yard; second individual present at gate.",
    fields: [
      { label: "Location", value: "Bengaluru — Yeshwanthpur" },
      { label: "File", value: "surveillance_log_11.pdf" },
    ],
  },
  "SUR-14": {
    id: "SUR-14",
    type: "Surveillance report",
    title: "Sewri dock sighting",
    captured: "18 Aug 2026 · 21:10",
    body: "Vehicle observed near dock gate. Plate partially obscured; attribution marked low confidence.",
    fields: [
      { label: "Location", value: "Mumbai — Sewri Docks" },
      { label: "File", value: "surveillance_log_14.pdf" },
    ],
  },
  "SUR-16": {
    id: "SUR-16",
    type: "Surveillance report",
    title: "Yard sighting",
    captured: "20 Aug 2026",
    body: "Single observation, low evidentiary weight.",
    fields: [{ label: "Location", value: "Thiruvananthapuram Yard" }],
  },
  "SUR-09": {
    id: "SUR-09",
    type: "Surveillance report",
    title: "Premises parking log",
    captured: "10 Aug 2026",
    body: "Two-wheeler recorded parked at same premises on three dates.",
    fields: [{ label: "Vehicle", value: "KL-11-CD-9087" }],
  },
  "SOC-01": {
    id: "SOC-01",
    type: "Social media intelligence",
    title: "Alias profile '@Ravi_87'",
    captured: "09 Aug 2026 · 22:05",
    body: "Public profile using alias consistent with FIR reference. Posted image contains a vehicle matching a registered plate in the case.",
    fields: [
      { label: "Handle", value: "@Ravi_87" },
      { label: "Visibility", value: "Public" },
      { label: "File", value: "social_intel_aug.json" },
    ],
  },
  "SOC-04": {
    id: "SOC-04",
    type: "Social media intelligence",
    title: "Tagged post cluster",
    captured: "11 Aug 2026",
    body: "Repeated co-tagging between two profiles at overlapping locations.",
    fields: [{ label: "File", value: "social_intel_aug.json" }],
  },
  "SOC-06": {
    id: "SOC-06",
    type: "Social media intelligence",
    title: "Profile linkage",
    captured: "13 Aug 2026",
    body: "Handle linked to subject via publicly visible recovery hint.",
    fields: [{ label: "File", value: "social_intel_aug.json" }],
  },
  "SOC-09": {
    id: "SOC-09",
    type: "Social media intelligence",
    title: "Group membership record",
    captured: "15 Aug 2026",
    body: "Three case-linked handles share membership of a transit coordination group.",
    fields: [{ label: "File", value: "social_intel_aug.json" }],
  },
  "TXN-022": {
    id: "TXN-022",
    type: "Financial transaction",
    title: "Round-figure transfers",
    captured: "05–16 Aug 2026",
    body: "Four transfers of identical value between two accounts.",
    fields: [{ label: "File", value: "transactions.csv" }],
  },
  "TXN-031": {
    id: "TXN-031",
    type: "Financial transaction",
    title: "Settlement transfers",
    captured: "16 Aug 2026",
    body: "Transfers to an import/export entity account.",
    fields: [{ label: "File", value: "transactions.csv" }],
  },
  "CDR-121": {
    id: "CDR-121",
    type: "Call detail record",
    title: "Routine contact",
    captured: "08 Aug 2026",
    body: "Five calls with no correlation to other event types.",
    fields: [{ label: "File", value: "cdr_august.csv" }],
  },
};

export interface FlagExplanation {
  role: string;
  confidence: number;
  signals: string[];
  evidence: { id: string; label: string }[];
}

export const FLAG_EXPLANATIONS: Record<string, FlagExplanation> = {
  "p-ravi": {
    role: "RECRUITER",
    confidence: 87,
    signals: [
      "Contact initiation with 9 distinct network members, 6 of whom appear later in financial records",
      "Alias '@Ravi_87' converges with FIR-named alias across three independent sources",
      "Vehicle observed at Warehouse 7 on six occasions during the investigation window",
      "Communication volume increased 3.4× after 09 Aug relative to the preceding baseline",
    ],
    evidence: [
      { id: "FIR-02", label: "Witness reference" },
      { id: "CDR-114", label: "Call with Suspect B" },
      { id: "TXN-019", label: "₹80,000 → A/C 7712" },
      { id: "SOC-01", label: "Alias profile '@Ravi_87'" },
      { id: "SUR-07", label: "Warehouse 7 vehicle log" },
    ],
  },
  "p-devan": {
    role: "FINANCIER",
    confidence: 81,
    signals: [
      "14 transactions with 3 network members",
      "9 transactions occurred shortly after communication events",
      "Connected to 2 suspected transporters through layered account transfers",
      "Activity increased significantly during the investigation period",
    ],
    evidence: [
      { id: "TXN-014", label: "₹45,000 → A/C 4921" },
      { id: "TXN-019", label: "₹80,000 → A/C 7712" },
      { id: "CDR-118", label: "Recurring call pair" },
      { id: "FIR-02", label: "Witness reference" },
    ],
  },
  "p-suresh": {
    role: "TRANSPORTER",
    confidence: 69,
    signals: [
      "Registered vehicle observed on the Kochi → Bengaluru → Mumbai corridor three times",
      "Short-duration calls cluster around each movement window",
      "Receives freight payments from an entity also linked to a second subject",
    ],
    evidence: [
      { id: "SUR-07", label: "Warehouse 7 vehicle log" },
      { id: "SUR-11", label: "Yeshwanthpur yard sighting" },
      { id: "CDR-140", label: "Transport handset activity" },
      { id: "TXN-027", label: "₹1,20,000 → A/C 8845" },
    ],
  },
  "p-tariq": {
    role: "ORGANISER",
    confidence: 76,
    signals: [
      "Bridges the Kochi cluster and the Mumbai cluster — highest betweenness in the network",
      "Named in freight documentation attached to an FIR",
      "27 calls with the Kochi core, including burst behaviour on 12 Aug",
    ],
    evidence: [
      { id: "FIR-05", label: "Freight firm reference" },
      { id: "CDR-133", label: "Inter-city call cluster" },
      { id: "TXN-031", label: "Settlement transfers" },
      { id: "SOC-04", label: "Tagged post cluster" },
    ],
  },
};

export const AUDIT_LOG = [
  { time: "12:46:10", user: "Insp. A. Verma", action: "Export", object: "Investigation report (PDF)", caseId: "OP-2026-001" },
  { time: "12:44:52", user: "Insp. A. Verma", action: "Review", object: "Entity merge · Ramesh Kumar", caseId: "OP-2026-001" },
  { time: "12:43:31", user: "Insp. A. Verma", action: "View", object: "Entity · Ravi Kumar", caseId: "OP-2026-001" },
  { time: "12:42:07", user: "Insp. A. Verma", action: "Open", object: "Case OP-2026-001", caseId: "OP-2026-001" },
  { time: "12:31:19", user: "System", action: "Analysis", object: "Pattern analysis completed (7 findings)", caseId: "OP-2026-001" },
  { time: "12:18:44", user: "Insp. S. Menon", action: "Upload", object: "cdr_august.csv", caseId: "OP-2026-002" },
  { time: "11:52:03", user: "Insp. R. Thomas", action: "Search", object: "Query '98765 43210'", caseId: "OP-2026-003" },
  { time: "11:40:58", user: "Insp. A. Verma", action: "Filter", object: "Network filter · Financial only", caseId: "OP-2026-001" },
  { time: "10:22:12", user: "Admin", action: "Access", object: "Role granted · Insp. K. Nair", caseId: "—" },
  { time: "09:05:47", user: "Insp. A. Verma", action: "Login", object: "Session started", caseId: "—" },
];

export const nodeById = (id: string) => NODES.find((n) => n.id === id);
export const neighborsOf = (id: string) =>
  EDGES.filter((e) => e.from === id || e.to === id).map((e) => (e.from === id ? e.to : e.from));
