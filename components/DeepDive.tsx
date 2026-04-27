"use client";

import { motion } from "framer-motion";
import { Brain, BookOpen, Shield, Bot, TrendingUp, TrendingDown } from "lucide-react";

const sections = [
  {
    num: "01",
    kicker: "AI Coach",
    title: "See every mistake before it costs you again.",
    desc: "NOVX's AI reads your trades the way a senior trader would — flagging overtrading, revenge trades, premature exits, and the emotional patterns you keep repeating.",
    bullets: [
      "Pattern detection across thousands of trades",
      "Plain-English explanations, not just stats",
      "Actionable checklist before your next session",
    ],
    visual: "coach",
  },
  {
    num: "02",
    kicker: "Automated Journal",
    title: "Every trade, logged. Zero manual entry.",
    desc: "Sync your broker once. NOVX pulls every fill, tags your setups, and reconstructs your reasoning with AI — so your journal actually gets filled out.",
    bullets: [
      "Auto-sync with major brokers and platforms",
      "Screenshots and charts attached automatically",
      "Tag once, filter forever",
    ],
    visual: "journal",
  },
  {
    num: "03",
    kicker: "Risk Control",
    title: "Your rules. Enforced before you can break them.",
    desc: "Set your max daily loss, max position size, and consistency rules. NOVX blocks the trades that violate them — before the loss, not after.",
    bullets: [
      "Per-account risk limits",
      "Prop firm rule templates built-in",
      "Lockout when you're on tilt",
    ],
    visual: "risk",
  },
  {
    num: "04",
    kicker: "Strategy Builder",
    title: "Describe your edge. Test it. Automate it.",
    desc: "Write your strategy in plain English. NOVX translates it into a backtest, runs it over years of data, and deploys it live — no code required.",
    bullets: [
      "Natural language strategy definitions",
      "Walk-forward backtesting on real ticks",
      "One-click deploy to live broker execution",
    ],
    visual: "strategy",
  },
];

export default function DeepDive() {
  return (
    <section id="how" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs tracking-[0.25em] text-cyan-300/80 uppercase mb-4"
          >
            How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Four steps from losing to{" "}
            <span className="text-gradient">systematic</span>.
          </motion.h2>
        </div>

        <div className="space-y-28">
          {sections.map((s, i) => (
            <Row key={s.num} section={s} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({
  section,
  reverse,
}: {
  section: (typeof sections)[number];
  reverse: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500">
            {section.num}
          </span>
          <span className="text-xs tracking-[0.2em] text-white/50 uppercase">
            {section.kicker}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
          {section.title}
        </h3>
        <p className="mt-4 text-white/60 text-lg leading-relaxed">{section.desc}</p>
        <ul className="mt-6 space-y-3">
          {section.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-white/75">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <Visual kind={section.visual} />
      </motion.div>
    </div>
  );
}

function Visual({ kind }: { kind: string }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-cyan-600/20 via-blue-600/15 to-indigo-600/20 blur-3xl opacity-70 pointer-events-none" />
      <div className="relative rounded-2xl border border-cyan-500/20 bg-[#0A1018]/90 backdrop-blur-xl overflow-hidden p-5 shadow-2xl">
        {kind === "coach" && <CoachVisual />}
        {kind === "journal" && <JournalVisual />}
        {kind === "risk" && <RiskVisual />}
        {kind === "strategy" && <StrategyVisual />}
      </div>
    </div>
  );
}

function CoachVisual() {
  const insights = [
    { icon: TrendingDown, label: "Overtrading on Fridays", detail: "-$1,842 last 30 days", tone: "rose" },
    { icon: TrendingDown, label: "Exiting winners too early", detail: "Avg R cut by 0.8", tone: "rose" },
    { icon: TrendingUp, label: "A+ setups: 82% win rate", detail: "Keep doing this", tone: "emerald" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-white/50 mb-2">
        <Brain className="w-4 h-4 text-cyan-300" />
        AI Coach · 3 new insights
      </div>
      {insights.map((i) => (
        <div
          key={i.label}
          className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              i.tone === "rose"
                ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
            }`}
          >
            <i.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium">{i.label}</div>
            <div className="text-xs text-white/50">{i.detail}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function JournalVisual() {
  const trades = [
    { sym: "NQ", side: "LONG", setup: "Breakout retest", pnl: "+$840", win: true },
    { sym: "ES", side: "SHORT", setup: "Failed auction", pnl: "+$420", win: true },
    { sym: "CL", side: "LONG", setup: "Revenge trade", pnl: "-$310", win: false },
    { sym: "GC", side: "SHORT", setup: "Trend continuation", pnl: "+$265", win: true },
  ];
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
        <BookOpen className="w-4 h-4 text-cyan-300" />
        Journal · 4 trades auto-logged today
      </div>
      <div className="space-y-2">
        {trades.map((t) => (
          <div
            key={t.sym + t.setup}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5"
          >
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center text-xs font-semibold">
              {t.sym}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    t.side === "LONG"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-rose-500/10 text-rose-300"
                  }`}
                >
                  {t.side}
                </span>
                <span className="text-sm font-medium truncate">{t.setup}</span>
              </div>
              <div className="text-[11px] text-white/40 mt-0.5">Auto-tagged · Screenshot attached</div>
            </div>
            <div
              className={`text-sm font-semibold ${
                t.win ? "text-emerald-300" : "text-rose-300"
              }`}
            >
              {t.pnl}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskVisual() {
  const limits = [
    { label: "Daily loss limit", used: 38, max: "$500", color: "orange" },
    { label: "Position size", used: 72, max: "5 contracts", color: "orange" },
    { label: "Prop firm drawdown", used: 22, max: "$2,000", color: "red" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <Shield className="w-4 h-4 text-cyan-300" />
          Risk Control · Active
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
          Within limits
        </span>
      </div>
      <div className="space-y-4">
        {limits.map((l) => (
          <div key={l.label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/70">{l.label}</span>
              <span className="text-white/40">
                {l.used}% of {l.max}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${l.used}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  l.color === "orange"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                    : "bg-gradient-to-r from-amber-500 to-rose-500"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 p-3 rounded-lg bg-cyan-500/[0.06] border border-cyan-500/20 text-xs text-cyan-100/80">
        Next trade blocked if it breaches any rule. No override.
      </div>
    </div>
  );
}

function StrategyVisual() {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
        <Bot className="w-4 h-4 text-cyan-300" />
        Strategy Builder · Backtest complete
      </div>
      <div className="rounded-lg bg-black/40 border border-white/5 p-3 mb-4">
        <div className="text-[10px] text-cyan-300/70 tracking-wider uppercase mb-2">
          Your description
        </div>
        <div className="text-sm text-white/80 leading-relaxed">
          &ldquo;Buy NQ when price breaks above the opening range high with volume
          1.5x average. Stop below the range. Target 2R.&rdquo;
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MiniStat label="Win rate" value="64%" />
        <MiniStat label="Avg R" value="1.82" />
        <MiniStat label="Trades" value="412" />
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 text-xs py-2 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 font-medium">
          Deploy live
        </button>
        <button className="flex-1 text-xs py-2 rounded-md bg-white/5 border border-white/10 text-white/70">
          Refine
        </button>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white/[0.03] border border-white/5 p-2.5">
      <div className="text-[10px] text-white/40 uppercase tracking-wider">{label}</div>
      <div className="text-base font-semibold mt-0.5">{value}</div>
    </div>
  );
}
