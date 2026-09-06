# Chanakya — AI-Powered Criminal Network Analysis System (CrimNet-X)

[![SIH Problem Statement 26189](https://img.shields.io/badge/SIH-Problem_26189-blue.svg)](https://www.sih.gov.in/)
[![Framework](https://img.shields.io/badge/Frontend-TanStack_Start_%2B_React_19-cyan.svg)](https://tanstack.com/start)
[![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-06B6D4.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Chanakya (CrimNet-X)** is a **provenance-first investigator workbench** designed for law enforcement and intelligence analysts. It ingests fragmented, heterogeneous crime data—including FIRs, CDRs, financial records, surveillance logs, criminal histories, and social media intelligence—to automatically extract entities, resolve identities, correlate multi-hop relationships, and render an explainable criminal network graph.

---

## 🌟 Key Highlights & Differentiators

Unlike generic dashboards or black-box LLM systems, **Chanakya (CrimNet-X)** prioritizes **traceability, low false-merge rates, and explicit uncertainty handling**:

- 🔍 **First-Class Epistemic Provenance**: Every node and edge retains an immutable evidence trail pointing back to the exact source document, page number, OCR bounding box, and text span.
- 🌐 **Multilingual & Code-Mixed Support**: Combines **IndicTrans2** (22 Indian languages), **IndicNER**, and zero-shot **GLiNER** to parse Hindi, Tamil, Telugu, English, and code-mixed Indian text without heavy model retraining.
- 🔀 **Probabilistic Entity Resolution (ER)**: Implements **Splink** (Fellegi-Sunter model with blocking) to minimize false merges between individuals sharing similar names or aliases.
- ⏰ **Bi-Temporal Knowledge Graph**: Tracks both **valid time** (_when event happened in real world_) and **observed/recorded time** (_when reported/ingested_). Conflicting claims are preserved rather than silently overwritten.
- 📊 **Classical Social Network Analysis (SNA)**: Identifies key influencers, hubs, brokers, and covert gangs using **PageRank**, **Betweenness Centrality**, and **Louvain Community Detection**.
- 🛡️ **Human-in-the-Loop Verification**: Low-confidence extractions, ambiguous entity merges, and contradictory claims are flagged for investigator review, creating a transparent decision-support workflow.

---

## 🏗️ System Architecture (CrimNet-X)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             HETEROGENEOUS DATA SOURCES                           │
│     [ FIRs / PDFs ]   [ CDR CSVs ]   [ Bank Txns ]   [ Surveillance ]   [ OSINT ]  │
└─────────────────────────┬────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         DOCUMENT AI & INGESTION LAYER                            │
│     • EasyOCR / Cloud OCR       • Language Detection (langdetect)                │
│     • IndicTrans2 Translation   • Layout & Text Normalization                    │
└─────────────────────────┬────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                       HYBRID EXTRACTION & RESOLUTION LAYER                       │
│     • Multilingual NER: spaCy + IndicNER + GLiNER (Zero-shot)                    │
│     • Relation Extraction: GLiNER-Relex & Pattern Rules                        │
│     • Entity Resolution: Splink (Fellegi-Sunter) with Phonetic/Attribute Blocking │
└─────────────────────────┬────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                       EPISTEMIC & BI-TEMPORAL KNOWLEDGE GRAPH                    │
│     • Neo4j Graph DB: Person, Org, Phone, Vehicle, Account, Event, Claim nodes   │
│     • Temporal Fields: valid_from, valid_to, observed_at, recorded_at             │
│     • Evidence Linking: Document ID, Page, Bounding Box, Confidence Score        │
└─────────────────────────┬────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                     INVESTIGATOR WORKBENCH & ANALYTICS UI                        │
│     • Interactive Network Graph    • Evidence Provenance Panel                   │
│     • SNA Analytics (PageRank)     • Suspicious Pattern & Timeline Views         │
│     • Human-in-the-Loop Review     • Official Intelligence Reports Export       │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack & Decision Register

| Layer                 | Selected Tech (MVP / Production)              | Alternatives Evaluated          | Rationale                                                                                                               |
| :-------------------- | :-------------------------------------------- | :------------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| **OCR**               | **EasyOCR** (MVP), Google Cloud Vision (Prod) | Tesseract, PaddleOCR            | EasyOCR delivers high accuracy on multilingual text out-of-the-box.                                                     |
| **Translation**       | **IndicTrans2**                               | XLM-RoBERTa, LLM Prompting      | SOTA open-source model covering all 22 scheduled Indian languages.                                                      |
| **NER Engine**        | **GLiNER + spaCy + IndicNER**                 | Rule-only, Custom BERT          | Combines zero-shot flexibility for unknown categories with IndicNER accuracy.                                           |
| **Entity Resolution** | **Splink** (Fellegi-Sunter model)             | Exact match, DBSCAN             | Industry-standard probabilistic record linkage with blocking to prevent $N^2$ scale blowup.                             |
| **Graph Database**    | **Neo4j** (Community Edition)                 | ArangoDB, NebulaGraph, Postgres | Neo4j Cypher and Graph Data Science (GDS) enable instant multi-hop network traversals.                                  |
| **Graph Analytics**   | **NetworkX / Neo4j GDS**                      | PyTorch Geometric, GNNs         | Classical SNA (PageRank, Louvain) provides explainable, deterministic leader ranking without labeled GNN training data. |
| **Frontend UI**       | **React 19 + TanStack Start + Tailwind CSS**  | Stock Admin Templates           | Fast SSR, type-safe file-routing, dark-mode intelligence aesthetic tailored for forensic workflows.                     |
| **Backend API**       | **FastAPI (Python)**                          | Express, Flask                  | Async performance, native Python ML/NLP library integration.                                                            |

---

## 📁 Repository Structure

```
.
├── src/
│   ├── components/
│   │   ├── app/
│   │   │   ├── AppShell.tsx        # Persistent sidebar navigation & topbar
│   │   │   ├── NetworkGraph.tsx    # Interactive Canvas/SVG criminal network graph
│   │   │   └── bits.tsx            # Reusable UI widgets & metric cards
│   │   └── ui/                     # Radix UI primitives & Tailwind v4 components
│   ├── data/
│   │   └── case-data.ts            # Correlated mock dataset (FIRs, CDRs, Financial, Social)
│   ├── lib/
│   │   ├── error-capture.ts        # Client-side error boundaries & logging
│   │   └── utils.ts                # Class merger & formatting helpers
│   ├── routes/
│   │   ├── __root.tsx              # Root HTML shell, global meta, QueryClient provider
│   │   ├── index.tsx               # Screen 1: Active Cases Landing & New Case Modal
│   │   ├── network.tsx             # Screen 2: Network Graph & Evidence Provenance Workbench
│   │   ├── entities.tsx            # Screen 3: Master Entity Directory & Disambiguation
│   │   ├── evidence.tsx            # Screen 4: Raw Evidence Vault & Ingestion Status
│   │   ├── patterns.tsx            # Screen 5: Suspicious Pattern & Anomaly Detection
│   │   ├── timeline.tsx            # Screen 6: Chronological Case Timeline
│   │   ├── processing.tsx          # Screen 7: Automated Document AI Processing Pipeline
│   │   ├── reports.tsx             # Screen 8: Intelligence Summary & Case Dossier Generator
│   │   ├── audit.tsx               # Screen 9: Immutability & Audit Trail Log
│   │   └── settings.tsx            # Screen 10: Confidence Thresholds & Access Policy
│   ├── router.tsx                  # TanStack Router instance creation
│   └── styles.css                  # Global Tailwind CSS v4 directives & custom themes
├── public/                         # Favicons & static assets
├── bunfig.toml                     # Bun package manager configuration
├── package.json                    # Dependencies & build scripts
├── tsconfig.json                   # TypeScript path aliases & strict type settings
└── vite.config.ts                  # Vite + TanStack Start + Nitro server configuration
```

---

## 🖥️ Application Screens & User Flow

1. **Active Cases Landing (`/`)**: View case dossiers, status indicators, entity counts, and create new investigations (_Operation Alpha_).
2. **Network Investigation Workspace (`/network`)**: Interactive graph view with node filtering, time slider, neighbor expansion, PageRank leader ranking, and evidence provenance panel.
3. **Evidence Vault (`/evidence`)**: Upload and inspect raw FIRs, CDR CSVs, bank statements, surveillance images, and social intelligence records.
4. **Processing Pipeline (`/processing`)**: Real-time status of OCR extraction, Indic translation, NER tagging, and Splink entity resolution.
5. **Entity Directory (`/entities`)**: Master list of Persons, Organizations, Phones, Vehicles, Accounts, and Locations with confidence scores.
6. **Pattern & Anomaly Detection (`/patterns`)**: Automated detection of circular money transfers, frequent co-locations, and burner phone swaps.
7. **Chronological Timeline (`/timeline`)**: Bi-temporal event timeline mapping calls, meetings, and financial transactions.
8. **Dossier & Report Generator (`/reports`)**: Export official court-ready intelligence summaries with source citations.
9. **Audit Trail (`/audit`)**: Cryptographic hashes, user action logs, and model decision tracking for legal compliance.
10. **System Settings (`/settings`)**: Configure ER thresholds, OCR fallback choices, and access control policies.

---

## 🚀 Getting Started

### Prerequisites

- **[Bun](https://bun.sh/)** (v1.1+) _or_ **Node.js** (v20+)

### Installation & Development

```bash
# 1. Clone the repository
git clone https://github.com/vipulreddyvemula/insight-weave-555.git
cd insight-weave-555

# 2. Install dependencies using Bun
bun install

# 3. Start the local development server
bun run dev
```

The application will be available at **`http://localhost:3000`** (or the port indicated by Vite).

### Build & Lint Commands

```bash
# Build production bundle (SSR server + Cloudflare Module output via Nitro)
bun run build

# Preview production build locally
bun run preview

# Run ESLint check
bun run lint

# Format codebase with Prettier
bun run format
```

---

