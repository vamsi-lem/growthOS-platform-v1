// Growth OS demo data. Every figure is illustrative, not a measured result.
// Ported verbatim from the Growth OS prototype.

export type TenantId = "lg" | "mg" | "cs";
export type Scope = TenantId | "all";
export type Role = "operator" | "am" | "client";
export type PersonId = "nitesh" | "mac" | "rajesh";
export type Tier = "T0" | "T1" | "T2" | "T3";
export type Tone = "success" | "warning" | "error" | "primary" | "light";

export interface Tenant {
  id: TenantId;
  name: string;
  short: string;
  tier: string;
  stack: string;
  price: number;
  am: string;
  motion: string;
  icp: string;
  budget: number;
  spend: number[];
  ratio: number;
}

export type QueueStatus = "pending" | "approved" | "rejected";
export interface QueueItem {
  id: string;
  tn: TenantId;
  type: string;
  title: string;
  detail: string;
  agent: string;
  tier: Tier;
  due: string;
  urgent?: boolean;
  st: QueueStatus;
  sig?: string;
  wave?: string;
  reply?: string;
}

export type Confidence = "DETERMINISTIC" | "HIGH" | "MEDIUM" | "MARKET";
export type SignalStatus = "new" | "producing" | "live" | "dismissed";
export interface Signal {
  id: string;
  tn: TenantId;
  kind: string;
  acct: string;
  text: string;
  score: number;
  conf: Confidence;
  t: string;
  st: SignalStatus;
  why: string;
  assets: string[];
  prog?: number;
}

export type Intent = "Interested" | "Objection" | "Referral" | "Not now" | "Unsubscribe";
export interface Reply {
  id: string;
  tn: TenantId;
  from: string;
  role: string;
  co: string;
  subj: string;
  ch: string;
  age: string;
  intent: Intent;
  conf: number;
  body: string;
  draft: string;
  sent?: boolean;
}

export interface Account {
  id: string;
  tn: TenantId;
  name: string;
  ind: string;
  size: number;
  sc: number[];
  stage: string;
  first: string;
  contacts: number;
  touches: [string, string, string, string][];
}

export type WaveStatus = "Awaiting approval" | "Live" | "Analysed" | "Paused";
export interface Wave {
  id: string;
  tn: TenantId;
  name: string;
  persona: string;
  seg: string;
  step: number;
  gates: number[];
  ch: string;
  sent: number;
  rep: number;
  mtg: number;
  tag: string;
  st: WaveStatus;
}

export interface TrackedPage {
  id: string;
  tn: TenantId;
  url: string;
  q: string;
  seo: [number, number];
  aeo: "Lost" | "Held" | "Won" | "None";
  geo: [number, number];
  st: "Slipping" | "Rising" | "Stable";
}

export interface Guardrail {
  k: string;
  lim: number;
  unit: string;
  dir: "gt" | "lt";
  v: Record<TenantId, number>;
  act: string;
  hard?: boolean;
}

export type ConnectorState = "ok" | "warn" | "off";
export type Connector = [string, string, ConnectorState, string];

export interface Brief {
  v: number;
  pos: string;
  icp: [string, string][];
  personas: [string, string, string, string][];
  voice: { do: string[]; dont: string[] };
  hist: [string, string, string, string][];
}

/** [time, actor, action, tenant | "all", tier, cost] */
export type AuditRow = [string, string, string, TenantId | "all", Tier, number];

export const tenants: Tenant[] = [
  { id: "lg", name: "Lemniscate Growth", short: "LG", tier: "A", stack: "Our stack", price: 4000, am: "Nitesh R.", motion: "Email-first", icp: "Funded B2B SaaS · $2–12M raised · 30–50 staff", budget: 150, spend: [0, 9, 58, 29], ratio: 70 },
  { id: "mg", name: "Milvian", short: "MG", tier: "B", stack: "Their stack", price: 3500, am: "Nitesh R.", motion: "LinkedIn-first", icp: "Professional services · 25–300 staff · UK + US", budget: 150, spend: [0, 14, 71, 46], ratio: 60 },
  { id: "cs", name: "Conscendo", short: "CS", tier: "B", stack: "Their stack", price: 3500, am: "Nitesh R.", motion: "Email-first", icp: "Salesforce users · US + Canada · $25M–$500M", budget: 150, spend: [0, 6, 39, 13], ratio: 70 },
];

export const queue: QueueItem[] = [
  { id: "q2", tn: "cs", type: "Moment set", title: "Partner CPQ announcement → 3 assets", detail: "CXO post · 75s video script · outbound angle", agent: "Research + Writer", tier: "T2", due: "Expires 13:40", urgent: true, st: "pending", sig: "s1" },
  { id: "q1", tn: "lg", type: "Email batch", title: "Wave 14 · VP Sales · Series A SaaS", detail: "48 emails · 3 variants · cold lane via Instantly", agent: "Writer", tier: "T2", due: "10:30", st: "pending", wave: "w1" },
  { id: "q3", tn: "mg", type: "LinkedIn queue", title: "22 connection requests · Managing Partners", detail: "HeyReach · 2 senders · inside 40/day cap", agent: "LinkedIn", tier: "T0", due: "11:00", st: "pending" },
  { id: "q4", tn: "lg", type: "Content fix", title: "/blog/outbound-for-seed-saas slipped 3 → 11", detail: "Rewritten answer block · FAQ schema · sitemap resubmit", agent: "Publisher", tier: "T2", due: "Today", st: "pending" },
  { id: "q5", tn: "cs", type: "Brief v+1", title: "Analyst proposes raising CFO persona weight", detail: "CFO replies 2.4× CIO over 30 days · tag cs:persona:cfo", agent: "Analyst", tier: "T3", due: "This week", st: "pending" },
  { id: "q6", tn: "mg", type: "Reply draft", title: "Reply to Priya Raman · interested", detail: "Proposes two slots · attaches the advisory case study", agent: "Reply desk", tier: "T2", due: "Now", st: "pending", reply: "r1" },
];

export const signals: Signal[] = [
  { id: "s2", tn: "lg", kind: "Funding", acct: "Kestrel Pay", text: "Raised an $8M Series A · 41 staff · hiring two SDRs", score: 91, conf: "DETERMINISTIC", t: "09:00", st: "new",
    why: "Fresh capital, a sales-hiring signal and no marketing lead yet. The board wants pipeline in two quarters.",
    assets: ['Post · "Your Series A bought you 18 months. Pipeline decides whether you get the next round."', "Script · 60s · founder-to-founder on the first 90 days after a raise", 'Angle · "Before your two SDRs start, here is the list they should call first."'] },
  { id: "s1", tn: "cs", kind: "Partner launch", acct: "Meridian Manufacturing", text: 'Partner CPQ announcement matches watch trigger "CPQ migration"', score: 86, conf: "HIGH", t: "09:02", st: "new",
    why: "Meridian visited /solutions/cpq-migration twice this month. The announcement gives a dated reason to reach out.",
    assets: ["Post · CEO point of view on what the announcement means for mid-market CPQ", "Script · 75s · three questions to ask before migrating", 'Angle · "Your team read our CPQ migration guide. Here is what changed this morning."'] },
  { id: "s3", tn: "mg", kind: "Vantage visit", acct: "Crestline Logistics", text: "3 pages · 6m 10s · /insights/operating-model", score: 74, conf: "HIGH", t: "08:47", st: "new",
    why: 'Identified visit to the page that ranks for "operating model review". Two Managing Partners already connected.',
    assets: ["Post · Managing Partner on operating-model reviews after a restructure", "Script · 45s · the one-page operating-model diagnostic", 'Angle · "Saw Crestline is thinking about operating model. A diagnostic we run in a week."'] },
  { id: "s4", tn: "lg", kind: "Hiring", acct: "Lumen Ops", text: 'Posted "Head of Demand Gen" · first marketing hire', score: 68, conf: "MEDIUM", t: "08:31", st: "new",
    why: "First marketing hire means no system yet. Raises the account score; not strong enough to fire outbound alone.",
    assets: ["Post · what a first demand-gen hire should own in month one", "Script · 50s · build versus buy for pipeline", "Angle · held until intent rises above HIGH"] },
  { id: "s5", tn: "cs", kind: "Market", acct: "No account", text: 'Query cluster "salesforce cpq migration" up 38% in 15 days', score: 55, conf: "MARKET", t: "08:15", st: "new",
    why: "Market-plane movement with no account attached. Drives content only, never a named claim.",
    assets: ["Content brief · expand the CPQ guide with a migration checklist", "Script · not generated for MARKET signals", "Angle · not generated for MARKET signals"] },
];

export const scanPool: Signal[] = [
  { id: "s6", tn: "mg", kind: "Leadership hire", acct: "Brightwater Health", text: "New COO announced · joined from a Big Four practice", score: 79, conf: "HIGH", t: "", st: "new", why: "A new COO reviews the operating model inside 100 days.", assets: ["Post · the first 100 days of a new COO", "Script · 45s · what to measure before you restructure", 'Angle · "Congratulations on the COO appointment. A diagnostic built for the first 100 days."'] },
  { id: "s7", tn: "lg", kind: "Vantage visit", acct: "Northwind Analytics", text: "4 pages · 9m 02s · /services/demand-generation", score: 83, conf: "HIGH", t: "", st: "new", why: "Second identified visit in a week. VP Sales replied with an objection on Monday.", assets: ["Post · when an agency is the wrong answer", "Script · 60s · in-house versus managed pipeline", "Angle · answer Monday’s objection with the cost-per-meeting comparison"] },
];

export const replies: Reply[] = [
  { id: "r1", tn: "mg", from: "Priya Raman", role: "Managing Partner", co: "Harbor & Vale Advisory", subj: "Re: operating-model reviews", ch: "Email", age: "12m", intent: "Interested", conf: 92,
    body: "This is timely. We are rethinking how our delivery teams are structured after two acquisitions. Could you share what a review looks like in practice?",
    draft: "Thanks Priya. A review runs over two weeks: one diagnostic workshop and a written operating model. Would Thursday 10:00 or Friday 14:00 work for 30 minutes? I have attached a short case from a firm of a similar size." },
  { id: "r2", tn: "lg", from: "Daniel Okafor", role: "VP Sales", co: "Northwind Analytics", subj: "Re: pipeline after the Series A", ch: "Email", age: "1h", intent: "Objection", conf: 81,
    body: "We tried an agency last year and the meetings were junk. Not keen to repeat that.",
    draft: "Fair, and common. The difference is that we only send to accounts that pass your ICP and we report meetings against your CRM stages, not ours. Happy to show you the gate counts from a live wave before you decide anything." },
  { id: "r3", tn: "cs", from: "Elena Marsh", role: "CFO", co: "Atlas Freight Co", subj: "Re: CPQ migration cost", ch: "Email", age: "2h", intent: "Referral", conf: 88,
    body: "Not me. Speak to Marcus Hale, our Director of Revenue Operations. He owns Salesforce.",
    draft: "Thank you Elena, I will reach out to Marcus directly and mention you pointed me his way." },
  { id: "r4", tn: "lg", from: "Tom Becker", role: "CEO", co: "Fathom HR", subj: "Re: your first 90 days", ch: "LinkedIn", age: "3h", intent: "Not now", conf: 77,
    body: "Interesting, but we are heads-down on a product launch until January.",
    draft: "Understood, good luck with the launch. I will check back in the second week of January." },
  { id: "r5", tn: "cs", from: "Raj Patel", role: "CIO", co: "Cobalt Insurance", subj: "Re: Salesforce roadmap", ch: "Email", age: "4h", intent: "Unsubscribe", conf: 97,
    body: "Please remove me from your list.", draft: "No reply is sent. The address is suppressed for every tenant as a hashed value." },
];

export const accounts: Account[] = [
  { id: "a1", tn: "lg", name: "Kestrel Pay", ind: "Fintech · Series A", size: 41, sc: [38, 22, 9, 6, 5], stage: "Engaged", first: "Funding signal · 6 Oct", contacts: 4,
    touches: [["09:00 today", "Signal", "Funding: $8M Series A matched ICP", "lg:signal:funding"], ["Yesterday", "Vantage", "Visited /pricing and /services", "lg:intent:vantage"], ["2 Oct", "Email", "Wave 13 opened by CEO", "lg:outbound:ceo:w13"], ["28 Sep", "List", "Passed five gates · 4 contacts", "lg:list:gate"]] },
  { id: "a2", tn: "lg", name: "Northwind Analytics", ind: "B2B SaaS · Series A", size: 47, sc: [36, 19, 14, 6, 0], stage: "Objection", first: "Vantage visit · 18 Sep", contacts: 3,
    touches: [["1h ago", "Reply", "VP Sales · objection: past agency", "lg:reply:objection"], ["3 Oct", "Email", "Wave 13 step 2 clicked", "lg:outbound:vpsales:w13"], ["18 Sep", "Vantage", "First identified visit", "lg:intent:vantage"]] },
  { id: "a3", tn: "lg", name: "Lumen Ops", ind: "Ops SaaS · Seed", size: 33, sc: [34, 6, 4, 4, 3], stage: "Target", first: "Hiring signal · 6 Oct", contacts: 2, touches: [["08:31 today", "Signal", "Hiring first Head of Demand Gen", "lg:signal:hiring"]] },
  { id: "a4", tn: "mg", name: "Harbor & Vale Advisory", ind: "Advisory · 85 staff", size: 85, sc: [37, 18, 18, 8, 2], stage: "Meeting proposed", first: "LinkedIn connect · 9 Sep", contacts: 3,
    touches: [["12m ago", "Reply", "Managing Partner · interested", "mg:reply:interested"], ["30 Sep", "LinkedIn", "Accepted connection request", "mg:li:mp:w3"], ["9 Sep", "LinkedIn", "Connection request sent", "mg:li:mp:w3"]] },
  { id: "a5", tn: "mg", name: "Crestline Logistics", ind: "Logistics · 210 staff", size: 210, sc: [33, 21, 8, 6, 0], stage: "Engaged", first: "Vantage visit · 6 Oct", contacts: 2, touches: [["08:47 today", "Vantage", "3 pages · /insights/operating-model", "mg:intent:vantage"]] },
  { id: "a6", tn: "cs", name: "Meridian Manufacturing", ind: "Manufacturing · $140M", size: 620, sc: [39, 23, 12, 7, 5], stage: "Engaged", first: "SEO · /solutions/cpq-migration · 21 Sep", contacts: 5,
    touches: [["09:02 today", "Signal", "Partner CPQ announcement matched watch trigger", "cs:signal:partner"], ["29 Sep", "Vantage", "Second visit to the CPQ guide", "cs:intent:vantage"], ["24 Sep", "Email", "Wave 6 · CFO opened twice", "cs:outbound:cfo:w6"], ["21 Sep", "Search", "First touch: organic, CPQ migration page", "cs:seo:cpq"]] },
  { id: "a7", tn: "cs", name: "Atlas Freight Co", ind: "Freight · $95M", size: 380, sc: [35, 9, 13, 5, 0], stage: "Referred", first: "Wave 6 email · 25 Sep", contacts: 3, touches: [["2h ago", "Reply", "CFO referred to Director of RevOps", "cs:reply:referral"]] },
];

export const waves: Wave[] = [
  { id: "w1", tn: "lg", name: "Wave 14", persona: "VP Sales", seg: "Series A SaaS · US", step: 5, gates: [612, 401, 288, 251, 239, 231], ch: "Email, then LinkedIn", sent: 0, rep: 0, mtg: 0, tag: "lg:outbound:vpsales:w14", st: "Awaiting approval" },
  { id: "w5", tn: "lg", name: "Wave 13", persona: "Founder / CEO", seg: "Seed + A SaaS · US", step: 8, gates: [540, 362, 270, 228, 214, 205], ch: "Email", sent: 205, rep: 17, mtg: 5, tag: "lg:outbound:ceo:w13", st: "Live" },
  { id: "w3", tn: "mg", name: "Wave 3", persona: "Managing Partner", seg: "Advisory · 25–120 staff", step: 7, gates: [310, 188, 140, 122, 118, 96], ch: "LinkedIn", sent: 96, rep: 14, mtg: 4, tag: "mg:li:mp:w3", st: "Live" },
  { id: "w2", tn: "cs", name: "Wave 6", persona: "CFO", seg: "Manufacturing · $50–200M", step: 7, gates: [480, 300, 214, 196, 190, 184], ch: "Email", sent: 184, rep: 11, mtg: 3, tag: "cs:outbound:cfo:w6", st: "Live" },
  { id: "w4", tn: "cs", name: "Wave 5", persona: "CIO", seg: "Insurance · $100–500M", step: 9, gates: [520, 330, 262, 248, 244, 240], ch: "Email", sent: 240, rep: 9, mtg: 2, tag: "cs:outbound:cio:w5", st: "Analysed" },
];

export const pages: TrackedPage[] = [
  { id: "p1", tn: "lg", url: "/blog/outbound-for-seed-saas", q: "outbound for seed stage saas", seo: [3, 11], aeo: "Lost", geo: [22, 9], st: "Slipping" },
  { id: "p2", tn: "lg", url: "/services/demand-generation", q: "b2b demand generation agency", seo: [7, 5], aeo: "Held", geo: [14, 18], st: "Rising" },
  { id: "p4", tn: "cs", url: "/new-york", q: "salesforce consultant new york", seo: [2, 12], aeo: "Lost", geo: [19, 11], st: "Slipping" },
  { id: "p3", tn: "cs", url: "/solutions/cpq-migration", q: "salesforce cpq migration", seo: [6, 4], aeo: "Won", geo: [8, 21], st: "Rising" },
  { id: "p5", tn: "mg", url: "/insights/operating-model", q: "operating model review", seo: [9, 8], aeo: "None", geo: [5, 6], st: "Stable" },
];

export const guard: Guardrail[] = [
  { k: "Hard bounce rate", lim: 3, unit: "%", dir: "gt", v: { lg: 1.1, mg: 2.6, cs: 0.8 }, act: "Pause recommendation, list re-verified" },
  { k: "Unsubscribe rate", lim: 2, unit: "%", dir: "gt", v: { lg: 0.6, mg: 1.4, cs: 0.9 }, act: "Copy and targeting review" },
  { k: "Spam complaints", lim: 0.1, unit: "%", dir: "gt", v: { lg: 0.02, mg: 0.04, cs: 0.01 }, act: "Hard stop on sending domain", hard: true },
  { k: "Reply-rate drop, WoW", lim: 50, unit: "%", dir: "gt", v: { lg: 8, mg: 12, cs: 21 }, act: "Deliverability audit" },
  { k: "LinkedIn seat warnings", lim: 0, unit: "", dir: "gt", v: { lg: 0, mg: 0, cs: 0 }, act: "Halt seat, manual restart", hard: true },
  { k: "Tracked page drop", lim: 5, unit: " pos", dir: "gt", v: { lg: 8, mg: 1, cs: 10 }, act: "Open content task with brief" },
  { k: "Credit pool left", lim: 15, unit: "%", dir: "lt", v: { lg: 62, mg: 100, cs: 100 }, act: "Throttle low-priority tenants" },
  { k: "Model spend vs cap", lim: 80, unit: "%", dir: "gt", v: { lg: 64, mg: 87, cs: 39 }, act: "Router drops a tier" },
  { k: "ICP drift in batch", lim: 10, unit: "%", dir: "gt", v: { lg: 3, mg: 6, cs: 2 }, act: "Block batch, escalate" },
  { k: "Hot lead untouched", lim: 14, unit: " d", dir: "gt", v: { lg: 4, mg: 2, cs: 9 }, act: "Draft and queue follow-up" },
];

export const connectors: Record<TenantId, Connector[]> = {
  lg: [["Data", "Apollo", "ok", ""], ["Intent", "Vantage", "ok", ""], ["Email", "Instantly", "ok", "Cold"], ["Email", "Mailchimp", "ok", "Permissioned"], ["LinkedIn", "HeyReach", "ok", ""], ["CRM", "HubSpot", "ok", ""], ["Search", "Search Console", "ok", ""], ["Analytics", "GA4", "ok", ""], ["Creative", "ElevenLabs", "ok", ""]],
  mg: [["Data", "ZoomInfo", "ok", ""], ["Email", "Smartlead", "ok", "Cold"], ["Email", "Brevo", "ok", "Permissioned"], ["LinkedIn", "HeyReach", "warn", ""], ["CRM", "Pipedrive", "ok", ""], ["Search", "Search Console", "ok", ""], ["Web", "Webflow", "ok", ""], ["Creative", "HeyGen", "off", ""]],
  cs: [["Data", "Apollo", "ok", ""], ["Email", "Instantly", "ok", "Cold"], ["Email", "Mailchimp", "ok", "Permissioned"], ["LinkedIn", "HeyReach", "ok", ""], ["CRM", "Salesforce", "ok", ""], ["Search", "Search Console", "ok", ""], ["Web", "WordPress", "ok", ""], ["Events", "Zoom Webinars", "ok", ""]],
};

export const briefs: Record<TenantId, Brief> = {
  lg: { v: 7, pos: "Pipeline for funded B2B SaaS that has outgrown founder-led sales and cannot yet staff a demand-gen team.",
    icp: [["Funding", "$2M – $12M raised, last round under 18 months"], ["Headcount", "30 – 50"], ["Geo", "US, UK"], ["Stack", "HubSpot or Salesforce present"], ["Exclude", "Agencies, existing clients, competitors"]],
    personas: [["Founder / CEO", "Board wants pipeline proof", "New round closes", '"We tried an agency"'], ["VP Sales", "Quota with no top of funnel", "SDR hiring", '"Meetings were junk last time"'], ["Head of Marketing", "One person, five channels", "First marketing hire", '"We will build it in-house"']],
    voice: { do: ["Lead with their number, not ours", "Under 90 words in email", "One question per message"], dont: ['"Hope this finds you well"', "Unverifiable revenue claims", "More than one link"] },
    hist: [["v7", "2 Oct", "Analyst", "Raised VP Sales weight after Wave 13 replies"], ["v6", "18 Sep", "Mac", "Added UK to geo"], ["v5", "1 Sep", "Mac", "Baseline after onboarding"]] },
  mg: { v: 3, pos: "Operating-model reviews for professional-services firms reorganising after growth or acquisition.",
    icp: [["Industry", "Advisory, consulting, legal services"], ["Headcount", "25 – 300"], ["Geo", "UK, US East"], ["Trigger", "Acquisition, new COO, restructure"], ["Exclude", "Big Four, sole practitioners"]],
    personas: [["Managing Partner", "Margin squeezed by structure", "Acquisition closed", '"We know our own firm"'], ["COO", "Delivery teams overlap", "New in role", '"Not this quarter"']],
    voice: { do: ["Peer-to-peer register", "Cite the firm size we worked with", "LinkedIn first, email second"], dont: ["Consulting jargon", "Named client logos", "Same-day follow-ups"] },
    hist: [["v3", "29 Sep", "Nitesh", "Added COO persona"], ["v2", "15 Sep", "Analyst", "Shifted to LinkedIn-first"], ["v1", "4 Sep", "Mac", "Baseline after onboarding"]] },
  cs: { v: 5, pos: "Salesforce consulting for mid-market firms that need CPQ, revenue and data work done by people who have shipped it.",
    icp: [["Stack", "Salesforce Sales Cloud present"], ["Revenue", "$25M – $500M"], ["Geo", "US, Canada"], ["Industry", "Manufacturing, freight, insurance"], ["Exclude", "Salesforce partners, existing clients"]],
    personas: [["CFO", "Quote-to-cash leakage", "Pricing change", '"IT owns Salesforce"'], ["CIO", "Org is a decade of patches", "Contract renewal", '"We have an SI already"'], ["Director RevOps", "Owns the mess", "New CRO", '"No budget until Q2"']],
    voice: { do: ["Name the object, not the cloud", "Show the migration step count", "Plain English to the CFO"], dont: ["Partner-tier boasting", 'Generic "digital transformation"', "Attachments on first touch"] },
    hist: [["v5", "30 Sep", "Analyst", "CFO weight raised, CIO lowered"], ["v4", "16 Sep", "Mac", "Added freight vertical"], ["v3", "2 Sep", "Mac", "Baseline after onboarding"]] },
};

export const audit: AuditRow[] = [
  ["09:02", "Signal agent", "Scored partner announcement 86 · HIGH", "cs", "T1", 0.004],
  ["09:00", "Scheduler", "9 AM scan opened · 14 sources", "all", "T0", 0],
  ["08:58", "Router", "Milvian at 87% of cap → dropped Writer to T1 for volume", "mg", "T0", 0],
  ["08:47", "Signal agent", "Vantage visit resolved · Crestline Logistics", "mg", "T1", 0.003],
  ["08:40", "Writer", "Drafted 48 emails · 3 variants · Wave 14", "lg", "T2", 1.82],
  ["08:12", "List agent", "Wave 14 five gates: 612 → 231", "lg", "T0", 0],
  ["02:00", "Analyst", "Nightly roll-up by tag · proposed brief v6 for Conscendo", "cs", "T3", 2.41],
  ["01:30", "Publisher", "Rank delta · 2 pages slipping", "all", "T0", 0],
];

export const agents: [string, Tier][] = [["Research", "T2"], ["Signal", "T1"], ["List", "T0"], ["Writer", "T2"], ["Email", "T0"], ["LinkedIn", "T0"], ["Creative", "T2"], ["Publisher", "T2"], ["Analyst", "T3"], ["Reply desk", "T1"]];

/* ── People, highlights and actions (Today) ─────────────────────────── */

export interface Person { id: PersonId; name: string; role: string; initials: string; hello: string }
export const people: Person[] = [
  { id: "nitesh", name: "Nitesh R.", role: "Account manager · 3 accounts", initials: "NR", hello: "Nitesh" },
  { id: "mac", name: "Mac", role: "Founder · operator", initials: "M", hello: "Mac" },
  { id: "rajesh", name: "Rajesh", role: "Engineering lead", initials: "RJ", hello: "Rajesh" },
];

export interface Highlight { k: string; v: string; d: string; up: boolean; c: string; s: number[] }
// c: chart colour (hex from the @theme palette)
export const highlights: Record<PersonId, Highlight[]> = {
  nitesh: [
    { k: "Meetings booked", v: "9", d: "+2 vs last week", up: true, c: "#059669", s: [3, 4, 4, 6, 5, 7, 7, 9] },
    { k: "Pipeline created", v: "$186K", d: "+$41K", up: true, c: "#059669", s: [62, 70, 88, 97, 120, 131, 145, 186] },
    { k: "Reply rate", v: "6.8%", d: "+0.9 pts", up: true, c: "#059669", s: [4.1, 4.6, 5.2, 4.9, 5.8, 6.1, 5.9, 6.8] },
    { k: "AI answer share", v: "17%", d: "−2 pts", up: false, c: "#059669", s: [12, 14, 15, 18, 19, 20, 19, 17] },
  ],
  mac: [
    { k: "Pipeline · all tenants", v: "$412K", d: "+$88K", up: true, c: "#059669", s: [180, 210, 236, 260, 301, 330, 358, 412] },
    { k: "Contribution", v: "76%", d: "both tiers", up: true, c: "#059669", s: [70, 71, 73, 72, 74, 75, 76, 76] },
    { k: "Model spend", v: "$285", d: "of $450 cap", up: false, c: "#059669", s: [120, 150, 170, 196, 214, 240, 262, 285] },
    { k: "AM capacity", v: "3 / 3", d: "Nitesh is full", up: false, c: "#059669", s: [1, 1, 2, 2, 2, 3, 3, 3] },
  ],
  rajesh: [
    { k: "Jobs run today", v: "1,284", d: "99.7% ok", up: true, c: "#059669", s: [800, 920, 1010, 1100, 1150, 1190, 1240, 1284] },
    { k: "Adapter errors", v: "3", d: "HeyReach · Mailchimp", up: false, c: "#059669", s: [1, 0, 2, 1, 0, 1, 2, 3] },
    { k: "p95 job time", v: "4.2s", d: "−0.6s", up: true, c: "#059669", s: [6.1, 5.8, 5.5, 5.2, 4.9, 4.8, 4.6, 4.2] },
    { k: "Cost today", v: "$11.40", d: "T2 is 71%", up: true, c: "#059669", s: [8, 9, 10, 9, 11, 10, 12, 11.4] },
  ],
};

export type Priority = "Now" | "Today" | "This week";
export type ScreenId = "today" | "run" | "cockpit" | "signals" | "campaigns" | "waves" | "replies" | "brain" | "leads" | "search" | "client" | "tenants" | "cost";
export type TipKey = keyof typeof tips;
export interface Action { pri: Priority; title: string; why: string; time: string; cta: string; go: ScreenId; tip?: TipKey }
export const actions: Record<PersonId, Action[]> = {
  nitesh: [
    { pri: "Now", title: "Approve the Meridian moment set", why: "Partner CPQ announcement at 09:02. Meridian has read the CPQ guide twice. Expires 13:40.", time: "2 min", cta: "Review 3 assets", go: "signals", tip: "conf" },
    { pri: "Now", title: "Reply to Priya Raman · she asked for a review outline", why: "Classified Interested at 92%. The draft proposes Thursday 10:00 or Friday 14:00.", time: "1 min", cta: "Open reply", go: "replies" },
    { pri: "Today", title: "Sign off the NYC trip cadence", why: "Meetings for 21–23 Oct need first touches out by Thursday. 341 contacts across three channels.", time: "5 min", cta: "Open campaign", go: "campaigns", tip: "cadence" },
    { pri: "Today", title: "Approve Wave 14 · 48 emails to VP Sales", why: "Five gates took 612 to 231. Goes out on the cold lane through Instantly.", time: "3 min", cta: "Open queue", go: "cockpit", tip: "gates" },
    { pri: "This week", title: "Fix the Conscendo /new-york page", why: "Fell from #2 to #12 and lost its answer snippet. The brief is already written.", time: "4 min", cta: "See what happened", go: "search", tip: "seo" },
  ],
  mac: [
    { pri: "Now", title: "Decide on Milvian model spend", why: "At 87% of cap. The router already dropped Writer to T1. Raise the cap or hold?", time: "1 min", cta: "Open cost", go: "cost", tip: "router" },
    { pri: "Today", title: "Approve Conscendo brief v6", why: "The analyst found CFO replies running 2.4× CIO over 30 days.", time: "3 min", cta: "Open brain", go: "brain", tip: "brain" },
    { pri: "Today", title: "Approve the NYC trip audience and budget", why: "40 personal notes go out from your Superhuman outbox. They read as you.", time: "4 min", cta: "Open campaign", go: "campaigns", tip: "superhuman" },
    { pri: "This week", title: "AM 2 hiring scorecard", why: "Nitesh is at three accounts. The next signed client has no owner.", time: "20 min", cta: "Open tenants", go: "tenants" },
  ],
  rajesh: [
    { pri: "Now", title: "HeyReach sender health · Milvian", why: "The seat-health check flagged a slow-down. The queue is held on one sender.", time: "10 min", cta: "Open connectors", go: "tenants", tip: "heyreach" },
    { pri: "Today", title: "Superhuman adapter · capability declaration", why: "NYC trip needs personal-outbox sends. The Phase 2 adapter is pulled forward.", time: "2 h", cta: "Open campaign", go: "campaigns", tip: "superhuman" },
    { pri: "Today", title: "Ship the tag_event migration", why: "The tag engine is on the day-one list and not in the schema yet.", time: "1 h", cta: "Open audit", go: "cost" },
    { pri: "This week", title: "Three Mailchimp bounce webhooks unacknowledged", why: "Retries are queued. Guardrail math is two hours stale for Lemniscate.", time: "30 min", cta: "Open audit", go: "cost", tip: "mailchimp" },
  ],
};

export const pipeline = {
  weeks: ["W34", "W35", "W36", "W37", "W38", "W39", "W40", "W41"],
  series: [
    { l: "Planned waves", c: "#064E3B", v: [40, 46, 52, 58, 66, 70, 74, 82] },
    { l: "Signal-led", c: "#059669", v: [8, 12, 18, 22, 30, 34, 40, 52] },
    { l: "Organic search", c: "#34D399", v: [10, 11, 13, 12, 15, 18, 20, 24] },
    { l: "Events", c: "#A7F3D0", v: [4, 4, 6, 5, 9, 9, 11, 28] },
  ],
};

/* ── The 09:00 run ─────────────────────────────────────────────────── */

export const run = {
  stages: [
    { k: "Wake", agent: "Scheduler", tier: "T0", unit: "tenants", n: 3, at: 2, why: "A cron fires at 09:00 in each tenant’s timezone. Nobody presses a button." },
    { k: "Sense", agent: "Signal", tier: "T1", unit: "raw signals", n: 37, at: 8, why: "14 sources: news, funding, filings, job posts, Apollo intent, Vantage visits." },
    { k: "Match", agent: "Signal", tier: "T1", unit: "accounts", n: 9, at: 15, why: "Every signal is scored against each tenant’s locked ICP. 28 are dropped." },
    { k: "Research", agent: "Research", tier: "T2", unit: "briefs", n: 9, at: 23, why: "A why-now brief per account, using the cached Account Brain." },
    { k: "Draft", agent: "Writer", tier: "T2", unit: "assets", n: 14, at: 31, why: "Posts, scripts, angles and emails, written in each tenant’s voice." },
    { k: "Gate", agent: "Guardrails", tier: "T0", unit: "for you", n: 6, at: 38, why: "10 thresholds checked. Only items that pass reach the approval queue." },
  ],
  log: [
    [1, "09:00:00", "Scheduler", "Opened the 09:00 job for Lemniscate, Milvian and Conscendo"],
    [4, "09:00:06", "Signal", "Pulled Crunchbase, filings and 6 news feeds"],
    [6, "09:00:19", "Signal", "Pulled Apollo intent topics and job posts"],
    [8, "09:00:31", "Vantage", "Resolved 4 identified visits overnight"],
    [11, "09:00:44", "Signal", "Kestrel Pay · $8M Series A · DETERMINISTIC · 91"],
    [13, "09:00:52", "Signal", "Meridian · partner CPQ announcement · HIGH · 86"],
    [15, "09:01:03", "Signal", "28 of 37 signals dropped · outside a locked ICP"],
    [18, "09:01:40", "Research", "Kestrel Pay · why-now brief written · 1.4K tokens"],
    [21, "09:02:15", "Research", "Meridian · linked to 2 visits on /solutions/cpq-migration"],
    [24, "09:03:02", "Router", "Milvian at 87% of cap · Writer dropped to T1"],
    [27, "09:03:40", "Writer", "Meridian · CXO post, 75s script, outbound angle"],
    [30, "09:04:12", "Writer", "Wave 14 · 48 emails in 3 variants"],
    [33, "09:04:30", "Guardrails", "All 10 thresholds checked for 3 tenants"],
    [36, "09:04:41", "Guardrails", "Lumen Ops held · MEDIUM signals never fire outbound"],
    [39, "09:04:58", "Queue", "6 items waiting for a human · oldest expires 13:40"],
  ] as [number, string, string, string][],
  found: [
    { at: 16, acct: "Kestrel Pay", tn: "lg" as TenantId, kind: "Funding", line: "$8M Series A, hiring two SDRs, no marketing lead", score: 91 },
    { at: 18, acct: "Meridian Manufacturing", tn: "cs" as TenantId, kind: "Partner launch", line: "Read the CPQ guide twice, then the partner announcement landed", score: 86 },
    { at: 20, acct: "Northwind Analytics", tn: "lg" as TenantId, kind: "Vantage visit", line: "Second visit in a week after Monday’s objection", score: 83 },
    { at: 22, acct: "Brightwater Health", tn: "mg" as TenantId, kind: "Leadership hire", line: "New COO from a Big Four practice", score: 79 },
    { at: 24, acct: "Crestline Logistics", tn: "mg" as TenantId, kind: "Vantage visit", line: "6 minutes on /insights/operating-model", score: 74 },
    { at: 26, acct: "Lumen Ops", tn: "lg" as TenantId, kind: "Hiring", line: "First Head of Demand Gen posted · held at MEDIUM", score: 68 },
  ],
};
export const RUN_END = 42;

/* ── Campaigns ─────────────────────────────────────────────────────── */

export interface CampaignBranch { ch: string; sub: string; n: number; c: string; tip: TipKey; rule: string }
export interface Campaign {
  id: string; tn: TenantId; name: string; dates: string; goal: string; owner: string; st: string; target: number; booked: number;
  source: { tool: string; q: string };
  gates: [string, number][];
  branches: CampaignBranch[];
  days: string[];
  cadence: [string, string[]][];
  sim: { replies: number; booked: number };
}
export const campaigns: Campaign[] = [
  { id: "nyc", tn: "lg", name: "NYC trip", dates: "21–23 Oct", goal: "Book 12 in-person meetings while Mac is in New York", owner: "Nitesh R.", st: "Ready to launch", target: 12, booked: 0,
    source: { tool: "Apollo", q: "Raised a Series A in the last 24 months · NYC metro · 11–200 staff · B2B SaaS" },
    gates: [["Saved search", 1284], ["ICP fit", 512], ["Verified email", 388], ["Suppression", 341]],
    branches: [
      { ch: "Superhuman", sub: "Personal outbox · from Mac", n: 40, c: "#064E3B", tip: "superhuman", rule: "Top 40 by account score. Sent from Mac’s own inbox, one at a time." },
      { ch: "HeyReach", sub: "LinkedIn note", n: 186, c: "#047857", tip: "heyreach", rule: "Active on LinkedIn in the last 30 days and not in the top 40." },
      { ch: "Mailchimp", sub: "Breakfast invite", n: 115, c: "#059669", tip: "mailchimp", rule: "Existing NYC subscribers only. Mailchimp never sees a cold contact." },
    ],
    days: ["Oct 7", "Oct 9", "Oct 11", "Oct 14", "Oct 16", "Oct 20", "21–23"],
    cadence: [
      ["Superhuman", ["Personal note", "", "Bump · calendar link", "", "Confirm the slot", "", "Meet"]],
      ["HeyReach", ["Connect + note", "Thanks for connecting", "", "Coffee ask", "", "Last call", "Meet"]],
      ["Mailchimp", ["", "Breakfast invite", "", "", "Reminder", "Final reminder", "Breakfast"]],
    ],
    sim: { replies: 38, booked: 13 } },
  { id: "w14", tn: "lg", name: "Wave 14 · VP Sales", dates: "From 7 Oct", goal: "Planned 70%: VP Sales at Series A SaaS in the US", owner: "Nitesh R.", st: "Awaiting approval", target: 6, booked: 0,
    source: { tool: "Apollo", q: "Saved search conscendo-style: VP Sales · Series A SaaS · US · 30–50 staff" },
    gates: [["Saved search", 612], ["ICP fit", 401], ["Verified email", 251], ["Suppression", 231]],
    branches: [
      { ch: "Instantly", sub: "Cold lane · dedicated domain", n: 183, c: "#064E3B", tip: "cold", rule: "Apollo-sourced, so it stays on the cold lane with its own domain." },
      { ch: "HeyReach", sub: "LinkedIn after email goes quiet", n: 48, c: "#047857", tip: "heyreach", rule: "Opens LinkedIn only after 7 quiet days on email." },
    ],
    days: ["Day 0", "Day 3", "Day 7", "Day 10", "Day 14"],
    cadence: [["Instantly", ["Email 1", "Email 2", "", "Email 3", ""]], ["HeyReach", ["", "", "Connect", "", "Note"]]],
    sim: { replies: 15, booked: 5 } },
  { id: "cfo", tn: "cs", name: "CFO pricing wave", dates: "Live since 24 Sep", goal: "CFOs at $50–200M manufacturers running Salesforce", owner: "Nitesh R.", st: "Live", target: 8, booked: 3,
    source: { tool: "Apollo", q: "CFO · Manufacturing · $50–200M · Sales Cloud detected" },
    gates: [["Saved search", 480], ["ICP fit", 300], ["Verified email", 196], ["Suppression", 184]],
    branches: [{ ch: "Instantly", sub: "Cold lane", n: 184, c: "#064E3B", tip: "cold", rule: "Cold lane, Conscendo domain warmed for six weeks." }],
    days: ["Day 0", "Day 4", "Day 9", "Day 15"],
    cadence: [["Instantly", ["Quote-to-cash note", "Case: freight", "Ask for 20 min", "Break-up"]]],
    sim: { replies: 14, booked: 5 } },
];
export const CAMPAIGN_END = 34;
/** Tick at which each phase of the launch simulation starts. */
export const CAMPAIGN_PHASE = { source: 1, gates: 6, branches: 12, cadence: 18 } as const;

/* ── "How and why" explainers ──────────────────────────────────────── */

export const tips = {
  seo: { t: "SEO · Search Engine Optimization", w: "Where a page ranks in classic search results, tracked by query and by city page.", y: "A drop from #2 to #12 removes almost all of a page’s clicks, so it becomes a task the same day.", h: ["Rank delta found", "Cause analysed", "Brief written", "Page rebuilt", "Human review", "Deployed + sitemap", "Re-measured in 15 days"] },
  aeo: { t: "AEO · Answer Engine Optimization", w: "Whether our page is the quoted answer in snippets, People Also Ask and AI overviews.", y: "Answers are won by structure, not length. Losing one means a competitor is now the quote.", h: ["Snippet lost", "Question extracted", "Answer block rewritten", "FAQ schema added", "Re-crawled"] },
  geo: { t: "GEO · Generative Engine Optimization", w: "How often ChatGPT, Claude, Perplexity and Gemini name the client for a fixed prompt set.", y: "Buyers ask assistants before they search. If we are not named, we are not shortlisted.", h: ["Prompt panel run", "Citation share scored", "Missing facts found", "Citable stats published", "Panel re-run"] },
  conf: { t: "Confidence tiers", w: "Every signal gets one of four tiers, and the tier decides what the system may do with it.", y: 'It stops the system from writing "we saw you on our pricing page" off a market-level guess.', h: ["DETERMINISTIC · fires outbound", "HIGH · goes to approval", "MEDIUM · raises the score only", "MARKET · content only"] },
  gates: { t: "The five gates", w: "Every contact passes ICP, persona, verification, suppression and channel before anyone writes to them.", y: "Bad lists burn domains. The gates are why 612 becomes 231 and the bounce rate stays near 1%.", h: ["ICP fit", "Persona match", "Verified email", "Suppression", "Channel assigned"] },
  cadence: { t: "Cadence", w: "The day-by-day plan of who gets which touch on which channel.", y: "Each contact sits on exactly one channel at a time, so nobody gets an email and a DM on the same day.", h: ["Audience split by rule", "Day 0 first touch", "Quiet-day check", "Next step or switch channel", "Meeting booked → stop"] },
  superhuman: { t: "Why Superhuman for the top 40", w: "The highest-scoring accounts get a note sent from Mac’s own inbox through the Superhuman plugin.", y: "A founder-to-founder note gets read. A campaign email from a tool gets filtered. We spend the personal channel only where the score earns it.", h: ["Top 40 by score", "Writer drafts in Mac’s voice", "Mac approves each", "Sent from his inbox", "Reply lands in the reply desk"] },
  heyreach: { t: "Why HeyReach for LinkedIn", w: "HeyReach sends connection notes across rotating senders through a real API.", y: "Octopus has no API. HeyReach rotation keeps every seat inside the 20–40 daily cap, and a seat warning halts that seat.", h: ["LinkedIn-active filter", "Note drafted per persona", "Queued across senders", "Seat health checked", "Accepts and replies tagged"] },
  mailchimp: { t: "Why Mailchimp only gets subscribers", w: "Mailchimp is the permissioned lane: people who opted in, registered or subscribed.", y: "Mailchimp prohibits cold lists, and the licence is shared. One cold send could take every tenant offline.", h: ["consent_basis checked", "Permissioned only", "Invite sent", "Registrants tagged", "Promoted, never demoted"] },
  cold: { t: "The cold lane", w: "Apollo-sourced contacts go through Instantly or Smartlead on a dedicated per-tenant domain.", y: "Keeps cold traffic away from the client’s main domain and away from Mailchimp.", h: ["Dedicated domain", "Warmed for weeks", "Seed test per batch", "Bounce and unsub watched"] },
  router: { t: "Model router and cost governor", w: "Each job uses the cheapest model tier that does it well, inside a monthly cap per tenant.", y: "Inference must never eat the retainer. At 80% of cap the router drops a tier; at 100% a human decides.", h: ["Job tagged with a tier", "Spend checked", "80% → drop a tier", "100% → override needed", "Cost written to the ledger"] },
  brain: { t: "The Account Brain", w: "One versioned record per client: the brief, locked ICP, personas, voice and guardrails.", y: "Every agent reads it before every job, so the strategy cannot drift on day 40 of a campaign.", h: ["Outcomes tagged", "Rolled up nightly", "Analyst proposes v+1", "You approve", "Every agent reads v+1"] },
  run: { t: "The 09:00 run", w: "Every morning the system senses, matches, researches, drafts and gates, then stops and waits for a person.", y: "By the time anyone opens the app, the thinking is done and only decisions are left.", h: ["Wake", "Sense", "Match to ICP", "Research", "Draft", "Gate"] },
};

/* ── Rules and reference copy ─────────────────────────────────────── */

export const confidenceRule: Record<Confidence, string> = {
  DETERMINISTIC: "Form fill, reply, registration. Fires outbound directly.",
  HIGH: "De-anon visit or dated trigger. Fires into the approval queue.",
  MEDIUM: "Raises the account score only. No outbound.",
  MARKET: "No account attached. Content only, never a named claim.",
};
export const waveSteps = ["Wave opened", "list.query", "Five gates", "Writer drafts", "You approve", "Push + run", "Webhooks tag", "CRM upsert", "Analyst roll-up"];
export const waveGateLabels = ["Saved search", "ICP fit", "Persona match", "Verified email", "Suppression", "Channel assigned"];
export const scoreParts = [
  { l: "ICP fit", max: 40 }, { l: "Inferred intent", max: 25 }, { l: "Engagement", max: 20 }, { l: "Committee coverage", max: 10 }, { l: "Trigger recency", max: 5 },
];
export const seoFlow = {
  steps: ["Rank delta found", "Cause analysed", "Brief written", "Page rebuilt", "Human review", "Deployed + sitemap", "Re-measured"],
  detail: [
    "/new-york fell #2 → #12 on the 15-day delta; answer snippet lost",
    "Competitor page added a pricing table and FAQ; ours is 14 months old",
    'Brief: answer "how much does a Salesforce consultant cost in NYC" in 40 words',
    "Publisher rebuilt the answer block, added FAQ schema and two citable stats",
    "Nitesh checks facts and voice. Nothing deploys without this",
    "Pushed to WordPress, canonical set, sitemap resubmitted to Search Console",
    "Next 15-day cycle scores the fix. It is never assumed to have worked",
  ],
};
export const momentSteps: [string, string][] = [["T+0:00", "Approved"], ["T+1:30", "Rendering video"], ["T+4:00", "Publishing post"], ["T+5:00", "Angle injected"], ["T+6:00", "Live"]];
export const guardFlowSteps = ["Detected", "Recommend pause", "AM confirms", "List re-verified", "Resume"];
export const meetingSources: [string, number][] = [["LinkedIn waves", 46], ["Signal-led", 28], ["Organic search", 16], ["Email waves", 10]];
export const modelTiers: [Tier, string][] = [["T0", "Code, no model"], ["T1", "Haiku · volume"], ["T2", "Sonnet · drafting"], ["T3", "Opus · judgement"]];
export const connectorContract = "list.query · audience.push · campaign.run · record.upsert · metrics.pull";

export const users: Record<Role, { name: string; title: string }> = {
  operator: { name: "Mac", title: "Operator · all tenants" },
  am: { name: "Nitesh R.", title: "Account manager · 3 accounts" },
  client: { name: "Sarah Whitlock", title: "COO · Milvian" },
};

/** Screens each role can open (null = everything). */
export const access: Record<Role, ScreenId[] | null> = {
  operator: null,
  am: ["today", "run", "cockpit", "signals", "campaigns", "waves", "replies", "brain", "leads", "search", "client", "cost"],
  client: ["client", "leads", "search"],
};

export const routes: Record<ScreenId, string> = {
  today: "/", run: "/brain-run", cockpit: "/approvals", signals: "/signals", campaigns: "/campaigns", waves: "/waves", replies: "/replies",
  brain: "/account-brain", leads: "/leads", search: "/search-visibility", client: "/client-view", tenants: "/tenants", cost: "/cost-audit",
};

export const specs: Record<ScreenId, { obj?: string; rows: [string, string][] }> = {
  today: { rows: [["Layer", "A · Surfaces · home"], ["Source", "Reporting views + approval_item filtered by assignee"], ["Endpoints", "GET /api/today?person="], ["Rule", "Actions are ordered by expiry, then by value at risk"]] },
  run: { rows: [["Layer", "C · Scheduler → D · Signal, Research, Writer → C · Guardrails"], ["Trigger", "Cron 09:00 per tenant timezone"], ["Tables", "job_run, signal, approval_item, audit_log"], ["Rule", "The run stops at the gate and waits for a person"]] },
  campaigns: { rows: [["Layer", "C · Scheduler · D · List, Writer, Email, LinkedIn"], ["Verbs", "list.query · audience.push · campaign.run"], ["Tables", "campaign, cadence_step, contact, touch"], ["Rule", "One channel at a time; Mailchimp only for consent_basis = permissioned"]] },
  cockpit: { obj: "approval_item", rows: [["Layer", "A · Surfaces → C · Approval queue"], ["Tables", "approval_item, guardrail_threshold, audit_log"], ["Endpoints", "GET /api/queue · POST /api/queue/:id/approve|reject"], ["Agents", "All ten feed the queue"], ["Rule", "Nothing client-facing leaves without an approved item"]] },
  signals: { obj: "signal", rows: [["Layer", "D · Signal (T1) + Research (T2) + Creative (T2)"], ["Tables", "signal, tag_event, approval_item"], ["Endpoints", "POST /api/scan · POST /api/signal/:id/approve"], ["Tiers", "DETERMINISTIC · HIGH · MEDIUM · MARKET"], ["Rule", "MARKET signals never produce a named-account claim"]] },
  waves: { obj: "wave", rows: [["Layer", "C · Scheduler → D · List, Writer, Email, LinkedIn"], ["Verbs", "list.query · audience.push · campaign.run"], ["Tables", "wave, contact, touch, tag_event"], ["Gates", "ICP · persona · verify · suppress · channel"], ["Rule", "One channel at a time per contact"]] },
  replies: { obj: "touch (reply)", rows: [["Layer", "D · Reply desk (T1 classify, T2 draft)"], ["Tables", "touch, stage_event, suppression_hash"], ["Endpoints", "POST /api/reply/:id/send"], ["Intents", "Interested · Objection · Referral · Not now · Unsubscribe"], ["Rule", "Unsubscribe is suppressed across all tenants, hashed"]] },
  brain: { obj: "account_brief", rows: [["Layer", "E · account_brief (versioned)"], ["Tables", "account_brief, guardrail_threshold"], ["Endpoints", "GET/PUT /api/brief · POST /api/brief/propose"], ["Agents", "Analyst (T3 nightly) proposes v+1"], ["Rule", "A new version goes live only on human approval"]] },
  leads: { obj: "account", rows: [["Layer", "E · Lead memory graph"], ["Tables", "account, contact, touch, stage_event, signal"], ["Score", "fit 40 · intent 25 · engagement 20 · committee 10 · trigger 5"], ["Decay", "30-day half-life on intent and engagement"], ["Rule", "Append-only; never overwrite a human-set CRM field"]] },
  search: { obj: "page_rank", rows: [["Layer", "D · Publisher (T2 build, T0 deploy)"], ["Connectors", "Search Console, GA4, CMS, GEO prompt panel"], ["Cadence", "15-day delta"], ["Tables", "page_rank, content_task"], ["Rule", "Every fix passes human review before deploy"]] },
  client: { obj: "session", rows: [["Layer", "A · Client dashboard"], ["Auth", "Role: client_viewer · read-only"], ["Source", "Reporting views"], ["Export", "Data Studio PostgreSQL connector"], ["Rule", "Clients see everything and launch nothing"]] },
  tenants: { obj: "tenant + connector", rows: [["Layer", "F · Connector contract"], ["Verbs", "list.query · audience.push · campaign.run · record.upsert · metrics.pull"], ["Tables", "tenant, connector, key_vault"], ["Lanes", "consent_basis decides cold vs permissioned"], ["Rule", "No API for a step becomes a human task"]] },
  cost: { obj: "audit_log row", rows: [["Layer", "C · Model router + cost governor"], ["Tables", "cost_ledger, audit_log"], ["Tiers", "T0 code · T1 Haiku · T2 Sonnet · T3 Opus"], ["Policy", "80% of cap drops a tier · 100% needs override"], ["Rule", "Every action replayable from the audit log"]] },
};
