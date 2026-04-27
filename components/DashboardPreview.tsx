"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Shield,
  Brain,
  Bot,
  LineChart,
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Camera,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Play,
  Pause,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";

type View = "overview" | "journal" | "risk" | "coach" | "strategies" | "markets";
type Theme = "dark" | "light";

const navItems: { id: View; icon: typeof LayoutDashboard; label: string }[] = [
  { id: "overview", icon: LayoutDashboard, label: "Overview" },
  { id: "journal", icon: BookOpen, label: "Journal" },
  { id: "risk", icon: Shield, label: "Risk" },
  { id: "coach", icon: Brain, label: "AI Coach" },
  { id: "strategies", icon: Bot, label: "Strategies" },
  { id: "markets", icon: LineChart, label: "Markets" },
];

export default function DashboardPreview() {
  const [view, setView] = useState<View>("overview");
  const [theme, setTheme] = useState<Theme>("dark");

  return (
    <section id="preview" className="relative px-6 pb-32">
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute -inset-10 bg-violet-600/10 blur-3xl opacity-50 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          data-theme={theme}
          className={`relative rounded-2xl border backdrop-blur-xl overflow-hidden shadow-2xl transition-colors ${
            theme === "dark"
              ? "border-violet-500/20 bg-[#0A1018]/90"
              : "border-violet-500/30 bg-[#FAFAF9]"
          }`}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-md border border-white/5">
                novx.trading / {view}
              </div>
            </div>
            <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="w-7 h-7 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/40 flex items-center justify-center text-white/60 hover:text-violet-400 transition-colors"
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4 md:p-6">
            <Sidebar view={view} onSelect={setView} />
            <div className="col-span-12 md:col-span-10 space-y-4 min-w-0">
              <TopBar />
              <MobileTabs view={view} onSelect={setView} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {view === "overview" && <OverviewView />}
                  {view === "journal" && <JournalView />}
                  {view === "risk" && <RiskView />}
                  {view === "coach" && <CoachView />}
                  {view === "strategies" && <StrategiesView />}
                  {view === "markets" && <MarketsView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <p className="relative text-center text-xs text-white/40 mt-5">
          Click a section in the sidebar to preview it · Mock data for demonstration
        </p>
      </div>
    </section>
  );
}

function Sidebar({ view, onSelect }: { view: View; onSelect: (v: View) => void }) {
  return (
    <div className="hidden md:block col-span-2 space-y-1">
      {navItems.map((item) => {
        const active = item.id === view;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left ${
              active
                ? "bg-white/[0.08] text-white border border-white/10"
                : "text-white/50 hover:text-white/90 hover:bg-white/[0.03] border border-transparent"
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function MobileTabs({ view, onSelect }: { view: View; onSelect: (v: View) => void }) {
  return (
    <div className="md:hidden -mx-1 overflow-x-auto">
      <div className="flex gap-1.5 px-1 pb-1">
        {navItems.map((item) => {
          const active = item.id === view;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap transition-colors ${
                active
                  ? "bg-white/[0.08] text-white border border-white/10"
                  : "text-white/50 border border-white/5 bg-white/[0.02]"
              }`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5">
        <Search className="w-4 h-4 text-white/40" />
        <span className="text-sm text-white/40">Search trades, strategies…</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 text-xs text-white/50 px-2.5 py-1.5 rounded-md bg-white/[0.03] border border-white/5">
          <span>March 2026</span>
        </div>
        <div className="relative">
          <Bell className="w-4 h-4 text-white/60" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-violet-500" />
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/10" />
      </div>
    </div>
  );
}

/* ============================== OVERVIEW ============================== */

function OverviewView() {
  return (
    <>
      <KpiRow />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <NovxScoreCard />
        </div>
        <div className="lg:col-span-8">
          <CalendarCard />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8">
          <EquityCard />
        </div>
        <div className="lg:col-span-4">
          <DayPerfCard />
        </div>
      </div>
    </>
  );
}

function KpiRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Kpi label="Net P&L" value="+$24,815" delta="+18.4%" positive />
      <Kpi label="Trade Win %" value="68.2%" delta="+6.2%" positive />
      <Kpi label="Profit Factor" value="2.41" delta="+0.3" positive />
      <Kpi label="Avg Win / Loss" value="1.82" delta="+0.14" positive />
      <Kpi label="Expectancy" value="$112" delta="+$18" positive />
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="flex items-baseline gap-2 mt-1">
        <div className="text-lg md:text-xl font-semibold">{value}</div>
        <div
          className={`flex items-center gap-0.5 text-[10px] ${
            positive ? "text-emerald-300" : "text-rose-300"
          }`}
        >
          {positive ? (
            <TrendingUp className="w-2.5 h-2.5" />
          ) : (
            <TrendingDown className="w-2.5 h-2.5" />
          )}
          {delta}
        </div>
      </div>
    </div>
  );
}

function NovxScoreCard() {
  const metrics = [
    { label: "Win %", value: 82 },
    { label: "Profit Factor", value: 78 },
    { label: "Avg W/L", value: 66 },
    { label: "Recovery", value: 71 },
    { label: "Max DD", value: 88 },
    { label: "Consistency", value: 74 },
  ];
  const score = 76;

  const cx = 110;
  const cy = 110;
  const radius = 80;
  const points = metrics.map((m, i) => {
    const angle = (Math.PI * 2 * i) / metrics.length - Math.PI / 2;
    const r = (m.value / 100) * radius;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
      lx: cx + Math.cos(angle) * (radius + 16),
      ly: cy + Math.sin(angle) * (radius + 16),
      label: m.label,
    };
  });

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 h-full">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-white/50">Novx Score</div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-200 border border-violet-500/20">
          Top 14%
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <div className="text-4xl font-bold text-violet-300">{score}</div>
        <div className="text-xs text-white/40">/ 100</div>
      </div>
      <svg viewBox="0 0 220 220" className="w-full">
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.12" />
          </radialGradient>
        </defs>
        {gridLevels.map((lvl) => (
          <polygon
            key={lvl}
            points={metrics
              .map((_, i) => {
                const angle = (Math.PI * 2 * i) / metrics.length - Math.PI / 2;
                const x = cx + Math.cos(angle) * radius * lvl;
                const y = cy + Math.sin(angle) * radius * lvl;
                return `${x},${y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
          />
        ))}
        {metrics.map((_, i) => {
          const angle = (Math.PI * 2 * i) / metrics.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(angle) * radius}
              y2={cy + Math.sin(angle) * radius}
              stroke="rgba(255,255,255,0.04)"
            />
          );
        })}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="url(#radarFill)"
          stroke="#22D3EE"
          strokeWidth="1.5"
        />
        {points.map((p) => (
          <circle key={p.label} cx={p.x} cy={p.y} r="2.5" fill="#67E8F9" />
        ))}
        {points.map((p) => (
          <text
            key={p.label + "l"}
            x={p.lx}
            y={p.ly}
            fontSize="9"
            fill="rgba(255,255,255,0.5)"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function CalendarCard() {
  const days: (number | null)[][] = [
    [null, null, null, null, null, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, null, null, null, null, null, null],
  ];

  const pnlMap: Record<number, number> = {
    2: 180, 3: 420, 4: -220, 5: 640, 6: 310, 9: -150,
    10: 780, 11: 220, 12: 480, 13: -340, 16: 190, 17: 960,
    18: 420, 19: -180, 20: 1250, 23: 310, 24: 640, 25: 80,
    26: -420, 27: 520, 30: 890,
  };

  const weekLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const totalPnl = Object.values(pnlMap).reduce((a, b) => a + b, 0);
  const winDays = Object.values(pnlMap).filter((v) => v > 0).length;
  const totalDays = Object.values(pnlMap).length;

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 h-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-white/50">P&L Calendar</div>
          <div className="text-sm text-white/70 mt-0.5">
            <span className="text-emerald-300 font-semibold">
              +${totalPnl.toLocaleString("en-US")}
            </span>{" "}
            · {winDays}/{totalDays} green days
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-white/40">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-emerald-500/60" />
            Win
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-sm bg-rose-500/60" />
            Loss
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {weekLabels.map((d, i) => (
          <div key={i} className="text-[10px] text-white/40 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="space-y-1">
        {days.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((day, di) => {
              if (day === null) {
                return <div key={di} className="aspect-[1.4] rounded-md" />;
              }
              const pnl = pnlMap[day];
              const intensity =
                pnl !== undefined ? Math.min(Math.abs(pnl) / 1000, 1) : 0;
              const isWin = pnl !== undefined && pnl > 0;
              const isLoss = pnl !== undefined && pnl < 0;
              return (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: (wi * 7 + di) * 0.01 }}
                  className={`relative aspect-[1.4] rounded-md border p-1 flex flex-col justify-between overflow-hidden ${
                    isWin
                      ? "border-emerald-500/20"
                      : isLoss
                        ? "border-rose-500/20"
                        : "border-white/5"
                  }`}
                  style={{
                    background:
                      pnl === undefined
                        ? "rgba(255,255,255,0.02)"
                        : isWin
                          ? `rgba(16, 185, 129, ${0.08 + intensity * 0.35})`
                          : `rgba(244, 63, 94, ${0.08 + intensity * 0.35})`,
                    boxShadow:
                      intensity > 0.7
                        ? isWin
                          ? "0 0 12px rgba(16,185,129,0.25)"
                          : "0 0 12px rgba(244,63,94,0.25)"
                        : "none",
                  }}
                >
                  <div className="text-[10px] text-white/60 font-medium leading-none">
                    {day}
                  </div>
                  {pnl !== undefined && (
                    <div
                      className={`text-[10px] font-semibold leading-none ${
                        isWin ? "text-emerald-300" : "text-rose-300"
                      }`}
                    >
                      {pnl > 0 ? "+" : "-"}${Math.abs(pnl)}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function EquityCard() {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-white/50">Equity curve</div>
          <div className="text-2xl font-semibold mt-0.5">$124,815.22</div>
        </div>
        <div className="flex gap-1">
          {["1D", "1W", "1M", "3M", "1Y"].map((p, i) => (
            <div
              key={p}
              className={`text-xs px-2 py-1 rounded ${
                i === 2 ? "bg-white/[0.08] text-white border border-white/10" : "text-white/40"
              }`}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
      <EquityCurve />
    </div>
  );
}

function EquityCurve() {
  return (
    <svg viewBox="0 0 600 180" className="w-full h-36 md:h-44">
      <defs>
        <linearGradient id="eqFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="eqLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {[0, 45, 90, 135].map((y) => (
        <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" />
      ))}
      <motion.path
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        d="M 0 150 C 50 140, 80 130, 120 135 S 180 90, 240 95 S 320 70, 380 60 S 460 40, 520 25 S 580 20, 600 15 L 600 180 L 0 180 Z"
        fill="url(#eqFill)"
      />
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        d="M 0 150 C 50 140, 80 130, 120 135 S 180 90, 240 95 S 320 70, 380 60 S 460 40, 520 25 S 580 20, 600 15"
        fill="none"
        stroke="url(#eqLine)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DayPerfCard() {
  const days = [
    { d: "Mon", v: 820, pos: true },
    { d: "Tue", v: 1240, pos: true },
    { d: "Wed", v: -310, pos: false },
    { d: "Thu", v: 640, pos: true },
    { d: "Fri", v: 1890, pos: true },
  ];
  const max = Math.max(...days.map((d) => Math.abs(d.v)));
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs text-white/50">Performance by day</div>
        <div className="text-[10px] text-violet-300/70">Best: Fri</div>
      </div>
      <div className="space-y-3">
        {days.map((d) => {
          const pct = (Math.abs(d.v) / max) * 100;
          return (
            <div key={d.d} className="flex items-center gap-3">
              <div className="text-[10px] text-white/50 w-8">{d.d}</div>
              <div className="flex-1 h-5 rounded-md bg-white/[0.03] relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-md ${
                    d.pos
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                      : "bg-gradient-to-r from-rose-500 to-rose-400"
                  }`}
                />
              </div>
              <div
                className={`text-[11px] font-semibold w-14 text-right ${
                  d.pos ? "text-emerald-300" : "text-rose-300"
                }`}
              >
                {d.pos ? "+" : "-"}${Math.abs(d.v)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== JOURNAL ============================== */

function JournalView() {
  const filters = ["All trades", "Wins", "Losses", "A+ setups", "This week"];
  const [active, setActive] = useState("All trades");
  const trades = [
    { sym: "NQ", side: "LONG", setup: "Opening range breakout", entry: "21,840", exit: "21,912", pnl: 1440, win: true, tags: ["A+", "Breakout", "Morning"], time: "09:42" },
    { sym: "ES", side: "SHORT", setup: "Failed auction", entry: "5,284.50", exit: "5,276.75", pnl: 775, win: true, tags: ["A+", "Reversal"], time: "10:18" },
    { sym: "CL", side: "LONG", setup: "Revenge trade", entry: "74.82", exit: "74.48", pnl: -340, win: false, tags: ["Tilt", "B-"], time: "11:24" },
    { sym: "GC", side: "SHORT", setup: "Trend continuation", entry: "2,342.40", exit: "2,339.80", pnl: 520, win: true, tags: ["A", "Continuation"], time: "13:02" },
    { sym: "NQ", side: "LONG", setup: "VWAP bounce", entry: "21,876", exit: "21,862", pnl: -280, win: false, tags: ["B", "Mean-rev"], time: "14:41" },
    { sym: "ES", side: "LONG", setup: "Range expansion", entry: "5,291.25", exit: "5,298.00", pnl: 675, win: true, tags: ["A", "Breakout"], time: "15:17" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Trades today" value="6" delta="+2" positive />
        <Kpi label="Win rate today" value="66.7%" delta="+4.2%" positive />
        <Kpi label="Avg hold time" value="8m 14s" delta="-1m" positive />
        <Kpi label="Most traded" value="NQ" delta="3 trades" positive />
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-xs text-white/50">Trade journal</div>
            <div className="text-sm text-white/70 mt-0.5">
              Auto-synced from broker · Screenshots attached automatically
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                  active === f
                    ? "bg-white/[0.08] text-white border border-white/10"
                    : "text-white/50 border border-white/5 bg-white/[0.02] hover:text-white/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {trades.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-violet-500/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {t.sym}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      t.side === "LONG"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-rose-500/10 text-rose-300"
                    }`}
                  >
                    {t.side}
                  </span>
                  <span className="text-sm font-medium truncate">{t.setup}</span>
                  <span className="text-[10px] text-white/40">· {t.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex flex-col items-end text-[10px] text-white/40">
                <span>In {t.entry}</span>
                <span>Out {t.exit}</span>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded bg-white/[0.03] border border-white/5 flex items-center justify-center">
                  <Camera className="w-3.5 h-3.5 text-white/40" />
                </div>
                <div
                  className={`text-sm font-semibold w-16 text-right ${
                    t.win ? "text-emerald-300" : "text-rose-300"
                  }`}
                >
                  {t.win ? "+" : "-"}${Math.abs(t.pnl)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ============================== RISK ============================== */

function RiskView() {
  const limits = [
    { label: "Daily loss limit", used: 38, cap: "$500", remaining: "$310 remaining", tone: "ok" },
    { label: "Weekly loss limit", used: 52, cap: "$1,500", remaining: "$720 remaining", tone: "ok" },
    { label: "Position size", used: 72, cap: "5 contracts", remaining: "Currently 3 open", tone: "warn" },
    { label: "Prop firm trailing DD", used: 22, cap: "$2,000", remaining: "$1,560 buffer", tone: "ok" },
    { label: "Consecutive losses", used: 50, cap: "4 trades", remaining: "2 more before cooldown", tone: "warn" },
  ];

  const rules = [
    { label: "Blocked: revenge trade attempt", time: "Yesterday 14:22", kind: "blocked" },
    { label: "Lockout: 3 losses in a row", time: "Mar 18 · 11:40", kind: "lockout" },
    { label: "Warning: position size near cap", time: "Mar 17 · 10:08", kind: "warn" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Rules active" value="7" delta="All enforced" positive />
        <Kpi label="Blocks today" value="1" delta="-$420 saved" positive />
        <Kpi label="Days under DD" value="23" delta="+2 streak" positive />
        <Kpi label="Prop firm" value="FTMO $100k" delta="87% to payout" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-white/50">Active limits</div>
              <div className="text-sm text-white/70 mt-0.5">
                Enforced before order submission · No override
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              All within limits
            </span>
          </div>
          <div className="space-y-4">
            {limits.map((l) => (
              <div key={l.label}>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white/80">{l.label}</span>
                    <span className="text-white/40">· Cap {l.cap}</span>
                  </div>
                  <span
                    className={`text-[10px] ${
                      l.tone === "warn" ? "text-amber-300" : "text-white/50"
                    }`}
                  >
                    {l.remaining}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${l.used}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      l.tone === "warn"
                        ? "bg-gradient-to-r from-amber-500 to-rose-400"
                        : "bg-white/30"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <div className="text-xs text-white/50 mb-3">Prop firm template</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-violet-300" />
              </div>
              <div>
                <div className="text-sm font-semibold">FTMO $100k</div>
                <div className="text-[10px] text-white/40">Phase 2 · 18 days left</div>
              </div>
            </div>
            <div className="space-y-1.5 text-[11px] text-white/60">
              <Rule ok text="Daily loss 5%" />
              <Rule ok text="Max loss 10%" />
              <Rule ok text="Min trading days 5/10" />
              <Rule ok text="No weekend holds" />
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <div className="text-xs text-white/50 mb-3">Recent enforcement</div>
            <div className="space-y-2">
              {rules.map((r) => (
                <div key={r.label} className="flex items-start gap-2">
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      r.kind === "blocked"
                        ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                        : r.kind === "lockout"
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : "bg-violet-500/10 text-violet-300 border border-violet-500/20"
                    }`}
                  >
                    {r.kind === "blocked" ? (
                      <Lock className="w-3 h-3" />
                    ) : r.kind === "lockout" ? (
                      <Pause className="w-3 h-3" />
                    ) : (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-white/80 leading-tight">
                      {r.label}
                    </div>
                    <div className="text-[10px] text-white/40 mt-0.5">{r.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Rule({ ok, text }: { ok?: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        className={`w-3 h-3 ${ok ? "text-emerald-300" : "text-white/30"}`}
      />
      {text}
    </div>
  );
}

/* ============================== AI COACH ============================== */

function CoachView() {
  const insights = [
    {
      tone: "bad",
      title: "You overtrade on Fridays after 2pm",
      detail: "Net -$1,842 across last 30 days. Most trades taken without confluence.",
      action: "Lock account after 2pm on Fridays",
    },
    {
      tone: "bad",
      title: "You exit winners an average of 0.8R too early",
      detail: "Your winners could be 1.7R instead of 0.9R if you held to your planned stop.",
      action: "Enable auto-target lock at entry",
    },
    {
      tone: "good",
      title: "Your A+ setups win 82% of the time",
      detail: "Opening range breakouts with 1.5x volume and morning session.",
      action: "Scale these — 2x position size",
    },
  ];

  const patterns = [
    { label: "Revenge trading", count: 7, trend: "down" },
    { label: "Over-leverage", count: 3, trend: "down" },
    { label: "FOMO entries", count: 12, trend: "up" },
    { label: "Premature exit", count: 9, trend: "flat" },
  ];

  const checklist = [
    "Review yesterday's revenge trade on CL",
    "No trades before 09:35 (your stats show this)",
    "Stick to NQ + ES. You lose on forex.",
    "Stop at 3 trades on Fridays",
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Coach insights" value="3 new" delta="This week" positive />
        <Kpi label="Mistakes avoided" value="11" delta="+$2,140 saved" positive />
        <Kpi label="Habit score" value="B+" delta="Up from C" positive />
        <Kpi label="Streak" value="14 days" delta="Following plan" positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-violet-300" />
            <div className="text-xs text-white/50">AI insights · Updated 2m ago</div>
          </div>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className={`p-4 rounded-lg border ${
                  ins.tone === "bad"
                    ? "bg-rose-500/[0.04] border-rose-500/15"
                    : "bg-emerald-500/[0.04] border-emerald-500/15"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      ins.tone === "bad"
                        ? "bg-rose-500/10 text-rose-300"
                        : "bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {ins.tone === "bad" ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{ins.title}</div>
                    <div className="text-xs text-white/55 mt-1 leading-relaxed">
                      {ins.detail}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-200">
                      <Sparkles className="w-3 h-3" />
                      {ins.action}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <div className="text-xs text-white/50 mb-3">Patterns detected</div>
            <div className="space-y-2.5">
              {patterns.map((p) => (
                <div key={p.label} className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{p.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{p.count}</span>
                    {p.trend === "down" ? (
                      <TrendingDown className="w-3 h-3 text-emerald-300" />
                    ) : p.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-rose-300" />
                    ) : (
                      <span className="w-3 h-0.5 bg-white/30 rounded" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-violet-300" />
              <div className="text-xs text-violet-200">Before your next session</div>
            </div>
            <ul className="space-y-2">
              {checklist.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[12px] text-white/80">
                  <div className="w-3.5 h-3.5 rounded border border-violet-400/40 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================== STRATEGIES ============================== */

function StrategiesView() {
  const strategies = [
    { name: "ORB Momentum NQ", status: "Live", wr: "64%", pf: "2.1", trades: 412, pnl: "+$8,420", deployed: true },
    { name: "Failed auction ES", status: "Live", wr: "71%", pf: "2.8", trades: 186, pnl: "+$5,230", deployed: true },
    { name: "VWAP reclaim CL", status: "Paper", wr: "58%", pf: "1.6", trades: 94, pnl: "+$1,120", deployed: false },
    { name: "Gap & go NQ", status: "Backtest", wr: "69%", pf: "2.4", trades: 220, pnl: "+$4,680", deployed: false },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Strategies" value="4" delta="2 live" positive />
        <Kpi label="Live PF (blended)" value="2.34" delta="+0.2" positive />
        <Kpi label="Automated trades" value="128" delta="This month" positive />
        <Kpi label="Combined P&L" value="+$13,650" delta="+12.8%" positive />
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/50">Your strategies</div>
            <div className="text-sm text-white/70 mt-0.5">
              Built in plain English · Backtested on tick data · One-click deploy
            </div>
          </div>
          <button className="text-[11px] px-3 py-1.5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 font-medium">
            + New strategy
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {strategies.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-4 hover:border-violet-500/20 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-violet-300" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{s.name}</div>
                    <div className="text-[10px] text-white/40">
                      {s.trades} trades backtested
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    s.status === "Live"
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                      : s.status === "Paper"
                        ? "bg-violet-500/10 text-violet-200 border border-violet-500/20"
                        : "bg-white/5 text-white/50 border border-white/10"
                  }`}
                >
                  {s.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <MiniStat label="Win %" value={s.wr} />
                <MiniStat label="Profit F" value={s.pf} />
                <MiniStat label="P&L" value={s.pnl} accent />
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center justify-center gap-1.5 text-[11px] py-1.5 px-3 rounded-md flex-1 ${
                    s.deployed
                      ? "bg-white/5 border border-white/10 text-white/70"
                      : "bg-gradient-to-br from-violet-500 to-purple-600 font-medium"
                  }`}
                >
                  {s.deployed ? (
                    <>
                      <Pause className="w-3 h-3" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" />
                      Deploy
                    </>
                  )}
                </button>
                <button className="text-[11px] py-1.5 px-3 rounded-md bg-white/5 border border-white/10 text-white/70">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

function MiniStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md bg-white/[0.03] border border-white/5 p-2">
      <div className="text-[9px] text-white/40 uppercase tracking-wider">{label}</div>
      <div
        className={`text-sm font-semibold mt-0.5 ${
          accent ? "text-emerald-300" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

/* ============================== MARKETS ============================== */

function MarketsView() {
  const markets = [
    { sym: "NQ", name: "Nasdaq 100", price: "21,876.50", change: "+0.84%", bias: "Bullish", regime: "Trend", alignment: 4 },
    { sym: "ES", name: "S&P 500", price: "5,291.25", change: "+0.42%", bias: "Bullish", regime: "Trend", alignment: 3 },
    { sym: "CL", name: "Crude Oil", price: "74.48", change: "-0.31%", bias: "Neutral", regime: "Range", alignment: 2 },
    { sym: "GC", name: "Gold", price: "2,342.40", change: "+0.18%", bias: "Bullish", regime: "Trend", alignment: 3 },
    { sym: "6E", name: "Euro FX", price: "1.0842", change: "-0.12%", bias: "Bearish", regime: "Range", alignment: 1 },
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Markets tracked" value="24" delta="6 flagged" positive />
        <Kpi label="Aligned TFs" value="NQ · 4/4" delta="Strong setup" positive />
        <Kpi label="Regime" value="Risk-on" delta="3 days" positive />
        <Kpi label="Session" value="NY open" delta="Your best" positive />
      </div>

      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-white/50">Multi-timeframe bias</div>
            <div className="text-sm text-white/70 mt-0.5">
              15m · 1h · 4h · 1D alignment — green when all agree
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {markets.map((m, i) => (
            <motion.div
              key={m.sym}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="w-11 h-11 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {m.sym}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{m.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      m.bias === "Bullish"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : m.bias === "Bearish"
                          ? "bg-rose-500/10 text-rose-300"
                          : "bg-white/5 text-white/50"
                    }`}
                  >
                    {m.bias}
                  </span>
                  <span className="text-[10px] text-white/40">· {m.regime}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[11px] text-white/60">{m.price}</span>
                  <span
                    className={`text-[11px] font-medium ${
                      m.change.startsWith("+") ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <div className="text-[9px] text-white/40 uppercase tracking-wider">
                  Alignment
                </div>
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className={`w-5 h-1.5 rounded-sm ${
                        j < m.alignment ? "bg-white/40" : "bg-white/5"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
