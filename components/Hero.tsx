"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative pt-44 pb-28 px-6">
      <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70 text-xs mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          Early access now open
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]"
        >
          See why you lose. Fix it.
          <br />
          <span className="text-gradient">Trade with a system.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
        >
          fyt helps traders journal automatically, manage risk, analyse mistakes with AI, and
          build strategies they can test and automate.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="#waitlist"
            className="px-6 py-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all"
          >
            Join the waitlist
          </Link>
          <Link
            href="#preview"
            className="px-6 py-3 rounded-lg text-white/70 hover:text-white transition-colors inline-flex items-center justify-center gap-1"
          >
            See the dashboard
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-xs text-white/40"
        >
          No card required · Lifetime discount for early members
        </motion.div>
      </div>
    </section>
  );
}
