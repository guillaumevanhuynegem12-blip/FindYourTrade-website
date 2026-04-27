"use client";

import { motion } from "framer-motion";

const brokers = [
  "TradingView",
  "MetaTrader 5",
  "NinjaTrader",
  "Interactive Brokers",
  "Tradovate",
  "TD Ameritrade",
  "Rithmic",
  "cTrader",
];

export default function BrokerStrip() {
  return (
    <section className="relative px-6 py-16 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-xs tracking-[0.25em] text-white/40 uppercase">
            Works with
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200">
            Launching soon
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brokers.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-center text-sm text-white/60 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/[0.04] transition-all"
            >
              {b}
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Don&rsquo;t see yours?{" "}
          <a href="#waitlist" className="text-cyan-300 hover:text-cyan-200">
            Request it on the waitlist
          </a>
          .
        </p>
      </div>
    </section>
  );
}
