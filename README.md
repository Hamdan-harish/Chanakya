# Chanakya Insights

Design and build a polished, production-quality web application UI for a government/law-enforcement investigation platform called Chanakya** — Criminal Network Analysis System**.

The product is an investigator workbench for Problem Statement 26189: an AI-powered system that processes fragmented crime-related data from multiple sources such as FIRs/police reports, CDRs, financial transactions, surveillance reports, social-media intelligence, criminal-history records, and intelligence reports; extracts entities and relationships; builds a network; identifies influential entities; detects suspicious patterns; and gives investigators visual and analytical insights.

IMPORTANT:
This is NOT a generic SaaS analytics dashboard.
This is NOT a chatbot.
The primary visual object is the investigation network graph.
The UI should feel like a serious intelligence-analysis / investigative platform used by trained investigators.

DESIGN LANGUAGE

Use a dark, professional, high-trust interface.

Visual direction:

Dark charcoal / near-black background

Subtle borders and surfaces

White/light-gray typography

restrained accent colors

red/orange only for alerts, suspicious activity, and high-risk indicators

blue/cyan can be used for neutral information and selected entities

avoid excessive gradients, glassmorphism, neon cyberpunk styling, or flashy animations

dense but organized information layout

desktop-first application

responsive enough for laptop/tablet

strong visual hierarchy

professional government/intelligence software aesthetic

typography should feel highly legible and technical

use icons consistently

animations should be subtle and functional

Do not make it look like a stock admin template.

APPLICATION STRUCTURE

Create a persistent left sidebar.

Top of sidebar:
SUTR
“Criminal Network Analysis”

Navigation:

CASE

Overview

Evidence

Processing

INVESTIGATE

Network

Entities

Patterns

Timeline

OUTPUT

Reports

SYSTEM

Audit Log

Settings

At the very top of the application, show:

current case name

case ID

global search

notifications/alerts

investigator profile

After a case is opened, the Network screen should be the primary investigation workspace.

SCREEN 1 — CASE OVERVIEW

Create a case-oriented landing page.

Do NOT use meaningless KPI-card-heavy SaaS design.

Instead show:

ACTIVE INVESTIGATIONS

Example cards/list items:

OPERATION ALPHA
Case ID: OP-2026-001
Status: Active
23 entities
47 relationships
4 suspicious patterns
Last activity: 12 minutes ago

OPERATION BRAVO
Case ID: OP-2026-002
Status: Under Review
...

Each case should have:

case name

case ID

date created

status

entity count

relationship count

number of alerts

investigator/owner

last updated

“Open Investigation” action

Include a prominent:

New Investigation

Include a small “Recent Activity” panel.

SCREEN 2 — CREATE INVESTIGATION

Create a clean case creation form.

Fields:

Case Name

Case ID (auto-generated)

Investigation Type

Description

Priority

Assigned Investigator

Buttons:
Cancel
Create Investigation

After creation, navigate to Evidence.

SCREEN 3 — EVIDENCE / DATA INGESTION

This screen is extremely important.

The investigator must clearly understand that the system can process MULTIPLE DATA SOURCES.

Show six large source cards:

FIR / Police Report
icon: document
formats: PDF, DOCX, TXT

CDR
icon: phone
formats: CSV, XLSX

Financial Transactions
icon: bank/card
formats: CSV, XLSX

Criminal History
icon: database/folder
formats: CSV, JSON

Surveillance Reports
icon: eye/document
formats: PDF, TXT

Social-Media Intelligence
icon: globe/social
formats: JSON, CSV, TXT

Each card should have:

source icon

source name

short description

supported formats

Upload button

Also provide:
“Upload files” drag-and-drop area

Show uploaded files in a table:

Filename
Source
Format
Size
Uploaded
Status

Example:

FIR_002.pdf
FIR
PDF
2.4 MB
13:42
Ready

cdr_august.csv
CDR
CSV
8.1 MB
13:43
Ready

transactions.csv
Financial
CSV
4.7 MB
13:44
Ready

At the bottom:
[ Process Investigation ]

Include a small security note:
“Case data is restricted to authorized investigators.”

SCREEN 4 — PROCESSING

Do not use a simple spinner.

Create an intelligent processing visualization showing the system transforming raw evidence into structured intelligence.

Vertical pipeline:

✓ Documents ingested
✓ Text extracted
✓ Entities extracted
✓ Relationships identified
◉ Entity resolution
○ Graph construction
○ Pattern analysis
○ Network analysis

On the right or below show live processing statistics:

Documents processed: 17
Entities identified: 126
Relationships identified: 243
Potential duplicate identities: 19
Potential suspicious patterns: 7

Show source-specific progress:

FIR
████████████ 100%

CDR
████████████ 100%

Financial
███████████░ 92%

Social intelligence
███████░░░░░ 64%

Use subtle animated progress, not flashy effects.

When processing finishes:
[ Enter Investigation Workspace ]

SCREEN 5 — MAIN INVESTIGATION NETWORK WORKSPACE

THIS IS THE MOST IMPORTANT SCREEN.

The network graph should occupy the majority of the screen.

Layout:

LEFT:
Filters and investigation controls

CENTER:
Large interactive network graph

RIGHT:
Selected entity / relationship / alert information panel

TOP:
Case name
global search
time filter
alerts

Left panel

FILTER NETWORK

Entity Type:
□ Person
□ Phone
□ Bank Account
□ Vehicle
□ Location
□ Organization
□ Social Account

Relationship:
□ Calls
□ Transfers
□ Owns
□ Visited
□ Associated With
□ Member Of

Additional:
Confidence
Date range
Source
Alert level

Buttons:
Apply
Reset

Center graph

Display a realistic fictional criminal network.

Use different node shapes/icons for different entity types.

Example:

Person
Phone
Bank Account
Vehicle
Location
Organization
Social Account

Edges must have relationship labels.

Example:
Person — CALLS — Phone
Person — TRANSFERS — Account
Person — OWNS — Vehicle
Person — VISITED — Location
Person — ASSOCIATED WITH — Person

Do NOT create a random spaghetti graph.

Create a clear, readable network with clusters and meaningful structure.

The graph should support:

zoom

pan

node selection

edge selection

focus on node

expand neighbors

hide/show node categories

search within graph

reset view

Include a small legend.

When a node is selected:

highlight that node

highlight first-degree relationships

dim unrelated nodes

When an edge is selected:
show its relationship details in the right panel.

SCREEN 6 — ENTITY DETAIL PANEL

When the investigator clicks a person node, show a rich entity panel.

Example:

PERSON

Ravi Kumar
Alias: R. Kumar

Possible Role:
Recruiter

Confidence:
87%

Identifiers
Phone:
9876543210

Vehicle:
KL-07-AB-1234

Location:
Kochi

Network
12 people
2 phones
4 accounts
5 locations

Sources:
FIR-02
CDR-114
TXN-019
SUR-07

Actions:
[ View Evidence ]
[ Expand Network ]
[ Add Investigation Note ]

IMPORTANT:
Never present an AI prediction as a confirmed fact.

Use language such as:
“Possible role”
“Potential connection”
“Confidence”
“Requires review”

Instead of:
“Criminal”
“Confirmed financier”
“Guilty”

SCREEN 7 — WHY WAS THIS ENTITY FLAGGED?

This is one of the most important features.

When the investigator clicks a suspicious entity or a predicted role, open a detailed explanation panel.

Title:
WHY THIS ENTITY WAS FLAGGED

Example:

Possible Role
FINANCIER

Confidence
87%

Supporting Signals

• 14 transactions with 3 network members
• 9 transactions occurred shortly after communication events
• Connected to 2 suspected transporters
• Activity increased significantly during the investigation period

SOURCE EVIDENCE

TXN-014
₹45,000 → Account 4921

TXN-019
₹80,000 → Account 7712

CDR-114
Call with Suspect B

FIR-02
Witness reference

Every piece of evidence should be clickable.

Clicking evidence should open the underlying source record/document preview.

Visually distinguish:
AI-derived interpretation
vs
raw evidence

Add a disclaimer:
“AI-generated analysis is investigative assistance and not a determination of guilt.”

SCREEN 8 — ENTITY RESOLUTION REVIEW

Create a dedicated screen for possible duplicate identities.

Title:
ENTITY RESOLUTION

Example card:

Possible Identity Match

Ramesh Kumar
R. Kumar
Ramesh K.
रमेश कुमार

Match confidence:
94%

Matching signals:
✓ similar name
✓ same phone number
✓ same location
✓ overlapping network connections

Show two clear actions:

[ Merge Entities ]
[ Keep Separate ]

Allow investigator review.

The UI should make it obvious that AI suggestions can be manually reviewed rather than silently merged.

SCREEN 9 — SUSPICIOUS PATTERNS

Create a dedicated analytical page.

Title:
Suspicious Patterns

Show a ranked list.

Example:

HIGH
Coordinated Communication Burst

23 entities
18:40–19:05

[ Investigate ]

MEDIUM
Unusual Financial Flow

₹18.4 lakh
7 accounts

[ Investigate ]

MEDIUM
Repeated Cross-Location Activity

Kochi → Bengaluru → Mumbai

[ Investigate ]

Each alert should show:

severity

pattern name

entities affected

timeframe

concise reason

confidence

source count

Investigate button

When clicking Investigate:
automatically open Network and focus the relevant subgraph.

SCREEN 10 — TIMELINE

Create a chronological investigation timeline.

Example:

04 AUG

09:42
Call
A → B

11:10
Financial transaction
₹50,000
Account A → Account B

07 AUG

18:30
Vehicle sighting
Location X

19:04
Call
B → C

12 AUG

21:10
Communication burst
17 calls in 15 minutes

⚠ Suspicious activity spike

Timeline filters:

Calls

Transactions

Locations

Reports

Social activity

Clicking an event should open its source record and optionally focus related graph nodes.

SCREEN 11 — GLOBAL SEARCH

Make search extremely prominent.

Placeholder:

“Search people, phones, vehicles, accounts, locations, cases…”

Example query:
9876543210

Results:

9876543210

Associated Person
Ravi Kumar

Associated Cases
OP-2026-001

Related entities
4 people
2 vehicles
3 locations

[ Open Investigation ]

Search should return heterogeneous entity types.

SCREEN 12 — REPORTS

Create an investigator-facing report page.

Show:

INVESTIGATION REPORT

Case:
OPERATION ALPHA

Sections:

Case Summary
Key Entities
Network Summary
Suspicious Patterns
Timeline
Relationship Evidence
Source References

Buttons:

[ Export PDF ]
[ Export JSON ]

The report should distinguish:
Observed evidence
AI-generated analysis
Investigator notes

SCREEN 13 — AUDIT LOG

Professional audit trail.

Example:

12:42
Inspector A
Opened Case OP-001

12:43
Inspector A
Viewed Ravi Kumar

12:44
Inspector A
Reviewed entity merge

12:46
Inspector A
Exported investigation report

Show:
timestamp
user
action
case
object

Include filters by date, investigator, action.

CORE INTERACTIONS

The prototype should feel interactive even if backend data is mocked.

Implement:

navigation between pages

case selection

file upload UI

processing animation

network graph interactions

clicking nodes

clicking edges

filters

search

opening evidence

opening suspicious patterns

entity merge review

timeline interactions

report export button UI

audit log navigation

Use realistic fictional data throughout.

Do NOT use real personally identifiable information.

SAMPLE NETWORK DATA

Create one realistic demo investigation with approximately:

15–25 people/entities
8–12 phone numbers
5–8 bank accounts
4–6 vehicles
5–8 locations
2–4 organizations
3–5 social accounts

Create meaningful relationships between them.

Include at least one hidden/interesting structure that becomes apparent when multiple sources are correlated.

Example:

Ravi Kumar
→ Phone 9876543210
→ calls Amit
→ transfers money to Account B
→ Account B is linked to transporter
→ vehicle associated with transporter appears at Location X
→ FIR contains witness mention
→ social-media intelligence connects alias “Ravi_87”

Use fictional values only.

NETWORK GRAPH UX

The graph is the heart of the application.

Make it visually impressive but readable.

Provide:

zoom controls

fit graph

reset layout

search node

expand neighbors

collapse neighbors

filter nodes

time slider

relationship legend

Have a “Focus Investigation” action that isolates a suspicious cluster.

Add a subtle mini-map if appropriate.

VISUAL HIERARCHY

The most important things on screen should be:

Current investigation

Network relationships

Suspicious findings

Evidence supporting findings

Entity details

Do not make decorative charts more important than the investigation graph.

Avoid excessive donut charts and generic business metrics.

TRUST / SAFETY UX

Because this is an investigative system:

Use careful terminology.

Prefer:

Possible

Suspected

Potential

Confidence

Supporting evidence

Requires review

Avoid:

Guilty

Criminal confirmed by AI

100% certain

Include a persistent small notice somewhere in the investigation workspace:

“AI analysis supports investigators. Findings require human verification.”

Also include:

source provenance

timestamps

confidence indicators

audit trail

investigator review controls

DEMO FLOW

The completed UI should support this exact demonstration:

Investigator creates “Operation Alpha”

Investigator uploads FIR, CDR, financial, surveillance, criminal-history and social-intelligence files

Processing animation shows extraction

System displays entities and relationships

Investigator opens Network

Investigator sees the unified network

Investigator searches a person/phone

Entity panel opens

A suspicious role is shown as “Possible”

Investigator clicks “Why was this entity flagged?”

Supporting evidence appears

Investigator clicks source evidence

Timeline shows related events

Investigator opens suspicious-pattern analysis

Investigator exports a report

The experience should tell a coherent story from fragmented evidence to actionable investigative intelligence.

TECHNICAL UI EXPECTATIONS

Use:

React

TypeScript

Tailwind CSS

modern component library where helpful

Cytoscape.js, React Flow, Sigma.js, or another appropriate graph visualization library

responsive layout

reusable components

clean component architecture

Use mock data so every screen is populated and visually convincing.

Do not spend time building a backend or machine-learning model in this task unless required by the selected UI generation environment.

The output should be a polished FRONTEND PROTOTYPE that looks like a real investigative product and is ready for us to connect to our actual backend later.

Most important:
Make the Network Investigation Workspace the visual centerpiece.
Make evidence provenance and “Why was this flagged?” a major differentiating interaction.
Make the entire application feel like one coherent investigator workflow rather than a collection of unrelated dashboard pages.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/31467b7b-95ef-4541-a40b-982653e9be08).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
