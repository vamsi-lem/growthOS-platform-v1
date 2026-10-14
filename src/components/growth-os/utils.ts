import type { Confidence, Guardrail, Intent, Scope, TenantId, Tone, WaveStatus } from "./data";
import { tenants } from "./data";

/** Tenant colour as a Tailwind background class (brand / warning / success scales). */
export const tenantDotClass: Record<TenantId, string> = {
  lg: "bg-brand-800",
  mg: "bg-brand-500",
  cs: "bg-brand-300",
};

export const tenantName = (id: TenantId | "all") =>
  tenants.find((t) => t.id === id)?.name ?? "All tenants";

export const inScope = (scope: Scope, tn: TenantId | "all") =>
  scope === "all" || tn === "all" || tn === scope;

/** Brain / client screens show one tenant; "All" falls back to the default. */
export const singleTenant = (scope: Scope, fallback: TenantId): TenantId =>
  scope === "all" ? fallback : scope;

export const confidenceTone: Record<Confidence, Tone> = {
  DETERMINISTIC: "success",
  HIGH: "primary",
  MEDIUM: "warning",
  MARKET: "light",
};

export const intentTone: Record<Intent, Tone> = {
  Interested: "success",
  Objection: "warning",
  Referral: "primary",
  "Not now": "light",
  Unsubscribe: "error",
};

export const waveTone = (st: WaveStatus): Tone =>
  st === "Live" ? "success" : st === "Awaiting approval" ? "primary" : st === "Paused" ? "error" : "light";

export const scoreOf = (sc: number[]) => sc.reduce((a, b) => a + b, 0);

export const isTripped = (g: Guardrail, v: number) => (g.dir === "gt" ? v > g.lim : v < g.lim);

export const isNear = (g: Guardrail, v: number) =>
  !isTripped(g, v) && (g.dir === "gt" ? v > g.lim * 0.8 && g.lim > 0 : v < g.lim * 1.3);

export const limitLabel = (g: Guardrail) => `${g.dir === "gt" ? "> " : "< "}${g.lim}${g.unit}`;

export const nowHHMM = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
};

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const pct = (part: number, whole: number) => `${Math.round((part / whole) * 100)}%`;
