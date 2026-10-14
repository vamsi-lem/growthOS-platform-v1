"use client";

import * as data from "@/components/growth-os/data";
import type {
  AuditRow,
  Brief,
  Guardrail,
  PersonId,
  QueueItem,
  Reply,
  Role,
  Scope,
  Signal,
  TenantId,
  Tier,
  Wave,
} from "@/components/growth-os/data";
import { inScope, isNear, isTripped, nowHHMM, tenantName } from "@/components/growth-os/utils";
import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const clone = <T,>(o: T): T => JSON.parse(JSON.stringify(o));

interface DemoData {
  queue: QueueItem[];
  signals: Signal[];
  pool: Signal[];
  replies: Reply[];
  waves: Wave[];
  guard: Guardrail[];
  briefs: Record<TenantId, Brief>;
  audit: AuditRow[];
}

const freshData = (): DemoData => ({
  queue: clone(data.queue),
  signals: clone(data.signals),
  pool: clone(data.scanPool),
  replies: clone(data.replies),
  waves: clone(data.waves),
  guard: clone(data.guard),
  briefs: clone(data.briefs),
  audit: clone(data.audit),
});

export interface Trip {
  g: Guardrail;
  tn: TenantId;
  v: number;
  hit: boolean;
}

interface GrowthOSContextType extends DemoData {
  role: Role;
  scope: Scope;
  person: PersonId;
  devSpec: boolean;
  guardFlow: number;
  guardModalOpen: boolean;
  toast: string | null;
  selected: { signal: string; reply: string; account: string; wave: string; campaign: string };
  trips: Trip[];
  setRole: (r: Role) => void;
  setScope: (s: Scope) => void;
  setPerson: (p: PersonId) => void;
  setDevSpec: (on: boolean) => void;
  select: (key: keyof GrowthOSContextType["selected"], id: string) => void;
  inScope: (tn: TenantId | "all") => boolean;
  approve: (id: string) => void;
  returnItem: (id: string) => void;
  approveMoment: (signalId: string) => void;
  dismissSignal: (signalId: string) => void;
  sendReply: (replyId: string) => void;
  updateDraft: (replyId: string, draft: string) => void;
  saveBrief: (tn: TenantId, pos: string) => void;
  writeFix: (pageId: string) => void;
  runScan: () => string | null;
  tripGuard: () => void;
  confirmGuard: () => void;
  overrideGuard: () => void;
  closeGuardModal: () => void;
  openGuardModal: () => void;
  approveAll: () => void;
  reset: () => void;
  say: (msg: string) => void;
}

const GrowthOSContext = createContext<GrowthOSContextType | undefined>(undefined);

export const useGrowthOS = () => {
  const ctx = useContext(GrowthOSContext);
  if (!ctx) throw new Error("useGrowthOS must be used within a GrowthOSProvider");
  return ctx;
};

export const GrowthOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const t = useTranslations("growthOs.toast");
  const [state, setState] = useState<DemoData>(freshData);
  const [role, setRoleState] = useState<Role>("am");
  const [scope, setScopeState] = useState<Scope>("all");
  const [person, setPerson] = useState<PersonId>("nitesh");
  const [devSpec, setDevSpec] = useState(false);
  const [guardFlow, setGuardFlow] = useState(0);
  const [guardModalOpen, setGuardModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState({ signal: "s2", reply: "r1", account: "a1", wave: "w1", campaign: "nyc" });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const momentTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const effectiveScope: Scope = role === "client" ? "mg" : scope;
  const scoped = useCallback((tn: TenantId | "all") => inScope(effectiveScope, tn), [effectiveScope]);

  const say = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const log = useCallback((actor: string, action: string, tn: TenantId | "all", tier: Tier, cost = 0) => {
    setState((s) => ({ ...s, audit: [[nowHHMM(), actor, action, tn, tier, cost], ...s.audit] }));
  }, []);

  const startMoment = useCallback(
    (id: string) => {
      setState((s) => ({
        ...s,
        signals: s.signals.map((x) => (x.id === id ? { ...x, st: "producing", prog: 0 } : x)),
        queue: s.queue.map((q) => (q.sig === id ? { ...q, st: "approved" } : q)),
      }));
      if (momentTimer.current) clearInterval(momentTimer.current);
      momentTimer.current = setInterval(() => {
        const sg = stateRef.current.signals.find((x) => x.id === id);
        if (!sg || (sg.prog ?? 0) >= 100) {
          if (momentTimer.current) clearInterval(momentTimer.current);
          if (sg) {
            setState((s) => ({ ...s, signals: s.signals.map((x) => (x.id === id ? { ...x, st: "live" } : x)) }));
            log("Publisher", `Moment set live · ${sg.acct}`, sg.tn, "T2", 0.94);
            say(t("momentLive"));
          }
          return;
        }
        setState((s) => ({ ...s, signals: s.signals.map((x) => (x.id === id ? { ...x, prog: Math.min(100, (x.prog ?? 0) + 4) } : x)) }));
      }, 160);
    },
    [log, say, t],
  );

  useEffect(() => () => {
    if (momentTimer.current) clearInterval(momentTimer.current);
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const approve = useCallback(
    (id: string) => {
      const q = stateRef.current.queue.find((x) => x.id === id);
      if (!q) return;
      setState((s) => {
        const next = { ...s, queue: s.queue.map((x) => (x.id === id ? { ...x, st: "approved" as const } : x)) };
        if (q.wave) next.waves = s.waves.map((w) => (w.id === q.wave ? { ...w, step: 6, st: "Live", sent: 48 } : w));
        if (q.type === "Brief v+1") {
          const b = clone(s.briefs);
          b[q.tn].v += 1;
          b[q.tn].hist.unshift([`v${b[q.tn].v}`, "Today", "You", "Approved analyst proposal: CFO weight up"]);
          next.briefs = b;
        }
        if (q.reply) next.replies = s.replies.map((r) => (r.id === q.reply ? { ...r, sent: true } : r));
        return next;
      });
      if (q.sig) startMoment(q.sig);
      log("You", `Approved · ${q.title}`, q.tn, q.tier);
      say(t("approved", { type: q.type, tenant: tenantName(q.tn) }));
    },
    [log, say, startMoment, t],
  );

  const returnItem = useCallback(
    (id: string) => {
      const q = stateRef.current.queue.find((x) => x.id === id);
      if (!q) return;
      setState((s) => ({ ...s, queue: s.queue.map((x) => (x.id === id ? { ...x, st: "rejected" } : x)) }));
      log("You", `Returned to agent · ${q.title}`, q.tn, q.tier);
      say(t("returned", { agent: q.agent }));
    },
    [log, say, t],
  );

  const approveMoment = useCallback(
    (id: string) => {
      const sg = stateRef.current.signals.find((x) => x.id === id);
      if (!sg) return;
      startMoment(id);
      log("You", `Approved moment set · ${sg.acct}`, sg.tn, "T2");
    },
    [log, startMoment],
  );

  const dismissSignal = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, signals: s.signals.map((x) => (x.id === id ? { ...x, st: "dismissed" } : x)) }));
      say(t("dismissed"));
    },
    [say, t],
  );

  const sendReply = useCallback(
    (id: string) => {
      const rp = stateRef.current.replies.find((r) => r.id === id);
      if (!rp) return;
      const unsub = rp.intent === "Unsubscribe";
      setState((s) => ({
        ...s,
        replies: s.replies.map((r) => (r.id === id ? { ...r, sent: true } : r)),
        queue: s.queue.map((q) => (q.reply === id ? { ...q, st: "approved" } : q)),
      }));
      log("You", `${unsub ? "Confirmed suppression · " : "Sent reply · "}${rp.from}`, rp.tn, unsub ? "T0" : "T2");
      say(unsub ? t("suppressed") : t("replySent"));
    },
    [log, say, t],
  );

  const updateDraft = useCallback((id: string, draft: string) => {
    setState((s) => ({ ...s, replies: s.replies.map((r) => (r.id === id ? { ...r, draft } : r)) }));
  }, []);

  const saveBrief = useCallback(
    (tn: TenantId, pos: string) => {
      const v = stateRef.current.briefs[tn].v + 1;
      setState((s) => {
        const b = clone(s.briefs);
        b[tn].v = v;
        b[tn].pos = pos;
        b[tn].hist.unshift([`v${v}`, "Today", "You", "Edited positioning"]);
        return { ...s, briefs: b };
      });
      log("You", `Saved brief v${v}`, tn, "T0");
      say(t("briefSaved", { version: v }));
    },
    [log, say, t],
  );

  const writeFix = useCallback(
    (pageId: string) => {
      const p = data.pages.find((x) => x.id === pageId);
      if (!p) return;
      const item: QueueItem = { id: `q${Date.now()}`, tn: p.tn, type: "Content fix", title: `${p.url} slipped ${p.seo[0]} → ${p.seo[1]}`, detail: "Brief written · answer block · schema · sitemap resubmit", agent: "Publisher", tier: "T2", due: "Today", st: "pending" };
      setState((s) => ({ ...s, queue: [item, ...s.queue] }));
      log("Publisher", `Content brief written · ${p.url}`, p.tn, "T2", 0.31);
      say(t("fixQueued"));
    },
    [log, say, t],
  );

  const runScan = useCallback(() => {
    const pool = stateRef.current.pool;
    if (!pool.length) {
      say(t("scanEmpty"));
      return null;
    }
    const time = nowHHMM();
    const fresh = pool.map((p) => ({ ...p, t: time }));
    setState((s) => ({ ...s, signals: [...fresh, ...s.signals], pool: [] }));
    setSelected((s) => ({ ...s, signal: fresh[0].id }));
    log("Scheduler", `9 AM scan rerun · ${fresh.length} new signals`, "all", "T1", 0.008);
    say(t("scanned", { count: fresh.length }));
    return fresh[0].id;
  }, [log, say, t]);

  const tripGuard = useCallback(() => {
    setState((s) => ({ ...s, guard: s.guard.map((g, i) => (i === 0 ? { ...g, v: { ...g.v, mg: 3.4 } } : g)) }));
    setGuardFlow(1);
    setGuardModalOpen(true);
    log("Guardrail engine", "Hard bounce 3.4% > 3% · Wave 3", "mg", "T0");
  }, [log]);

  const confirmGuard = useCallback(() => {
    setState((s) => ({ ...s, waves: s.waves.map((w) => (w.id === "w3" ? { ...w, st: "Paused" } : w)) }));
    setGuardFlow(4);
    setGuardModalOpen(false);
    log("You", "Paused Wave 3 · re-verifying 96 contacts", "mg", "T0");
    say(t("wavePaused"));
  }, [log, say, t]);

  const overrideGuard = useCallback(() => {
    setGuardFlow(0);
    setGuardModalOpen(false);
    log("You", "Override bounce guardrail · reason: seed list skew", "mg", "T0");
    say(t("overrideLogged"));
  }, [log, say, t]);

  const approveAll = useCallback(() => {
    stateRef.current.queue.filter((q) => q.st === "pending").forEach((q) => approve(q.id));
  }, [approve]);

  const reset = useCallback(() => {
    if (momentTimer.current) clearInterval(momentTimer.current);
    setState(freshData());
    setGuardFlow(0);
    setGuardModalOpen(false);
    say(t("reset"));
  }, [say, t]);

  const setRole = useCallback((r: Role) => {
    setRoleState(r);
    setPerson(r === "operator" ? "mac" : "nitesh");
    if (r === "client") setScopeState("mg");
    else setScopeState((s) => (s === "mg" && role === "client" ? "all" : s));
  }, [role]);

  const trips = useMemo(() => {
    const out: Trip[] = [];
    state.guard.forEach((g) =>
      (["lg", "mg", "cs"] as TenantId[]).forEach((tn) => {
        const v = g.v[tn];
        const hit = isTripped(g, v);
        if ((hit || isNear(g, v)) && scoped(tn)) out.push({ g, tn, v, hit });
      }),
    );
    return out;
  }, [state.guard, scoped]);

  const value: GrowthOSContextType = {
    ...state,
    role,
    scope: effectiveScope,
    person,
    devSpec,
    guardFlow,
    guardModalOpen,
    toast,
    selected,
    trips,
    setRole,
    setScope: setScopeState,
    setPerson,
    setDevSpec,
    select: (key, id) => setSelected((s) => ({ ...s, [key]: id })),
    inScope: scoped,
    approve,
    returnItem,
    approveMoment,
    dismissSignal,
    sendReply,
    updateDraft,
    saveBrief,
    writeFix,
    runScan,
    tripGuard,
    confirmGuard,
    overrideGuard,
    closeGuardModal: () => setGuardModalOpen(false),
    openGuardModal: () => {
      setGuardFlow((f) => Math.max(1, f));
      setGuardModalOpen(true);
    },
    approveAll,
    reset,
    say,
  };

  return <GrowthOSContext.Provider value={value}>{children}</GrowthOSContext.Provider>;
};
