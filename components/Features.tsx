"use client";

import { motion } from "framer-motion";
import { Brain, BookOpen, Shield, Bot, LineChart, Radio } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Coach",
    desc: "Pinpoints your repeated mistakes and emotional patterns.",
  },
  {
    icon: BookOpen,
    title: "Journal",
    desc: "Every trade, reasoned, tagged, and reviewed in seconds.",
  },
  {
    icon: Shield,
    title: "Risk Control",
    desc: "Position sizing and consistency rules, enforced automatically.",
  },
  {
    icon: Bot,
    title: "Strategy Builder",
    desc: "Describe it in plain English. Backtest it. Automate it.",
  },
  {
    icon: LineChart,
    title: "Market Analysis",
    desc: "Multi-timeframe bias and regime at a glance.",
  },
  {
    icon: Radio,
    title: "Live Signals",
    desc: "Real-time alerts when your edge actually fires.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Everything a profitable trader needs.
          </motion.h2>
          <p className="mt-4 text-white/60">Six tools. One edge.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] transition-all p-6 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="relative font-semibold">{f.title}</div>
              <div className="relative text-sm text-white/50 mt-1">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
