"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "When does NOVX launch?",
    a: "Early access opens in waves throughout 2026. Waitlist members are invited first, in the order they signed up. Join early — lifetime discount disappears at public launch.",
  },
  {
    q: "Which brokers and platforms will you support?",
    a: "At launch: TradingView, MetaTrader 5, NinjaTrader, Tradovate, Interactive Brokers, and Rithmic. We&rsquo;re adding cTrader and TD Ameritrade shortly after. Request yours on the waitlist form and we&rsquo;ll prioritise based on demand.",
  },
  {
    q: "How much will NOVX cost?",
    a: "Pricing isn&rsquo;t final, but we&rsquo;re targeting under $40/month for the core tier — journal, AI coach, risk control. Strategy builder and live automation sit on a higher tier. Waitlist members get a permanent discount regardless of what the public price lands at.",
  },
  {
    q: "Isn&rsquo;t this just another trade journal?",
    a: "Journals log what happened. NOVX tells you why you lost and stops you from repeating it. The journal is automated, the coach is genuinely useful, and the strategy builder lets you take what works and run it without you. Those three things together don&rsquo;t exist anywhere else right now.",
  },
  {
    q: "Do I need to know how to code to use the strategy builder?",
    a: "No. You describe your strategy in plain English — entries, exits, filters, risk. NOVX translates it into a backtest, runs it, and deploys it live. If you can explain your edge to another trader, you can build it in NOVX.",
  },
  {
    q: "I&rsquo;m a prop firm trader. Does NOVX work for me?",
    a: "Yes — prop firm traders are a primary use case. Risk Control ships with templates for FTMO, Topstep, MyForexFunds, and others. It enforces daily loss limits, trailing drawdown, and consistency rules before the violation happens, not after.",
  },
  {
    q: "What data does NOVX need? Is my account safe?",
    a: "NOVX uses read-only broker connections wherever possible — we can see your fills, we cannot place or modify orders. Where live automation is needed, you opt in per-strategy with explicit scope. Your broker credentials are encrypted at rest and never leave your region.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs tracking-[0.25em] text-violet-300/80 uppercase mb-4"
          >
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Questions, answered.
          </motion.h2>
        </div>

        <div className="space-y-2">
          {faqs.map((f, i) => (
            <Item key={f.q} faq={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
      >
        <span
          className="text-base md:text-lg font-medium pr-2"
          dangerouslySetInnerHTML={{ __html: faq.q }}
        />
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0"
        >
          <Plus className="w-4 h-4 text-white/60" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 text-white/60 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: faq.a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
