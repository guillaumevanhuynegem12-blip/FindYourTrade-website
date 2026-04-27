"use client";

import { motion } from "framer-motion";
import { Users, Lock, Sparkles } from "lucide-react";

export default function TrustSignals() {
  return (
    <section className="relative px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            icon={Users}
            kicker="Waitlist"
            headline="2,847 traders"
            sub="already in line for early access. Early members get a lifetime discount at launch."
          />
          <Card
            icon={Sparkles}
            kicker="Built by traders"
            headline="Not a fintech spreadsheet"
            sub="We built NOVX because existing journals failed us. Every feature answers a question we asked ourselves while losing money."
          />
          <Card
            icon={Lock}
            kicker="Read-only by default"
            headline="Your broker, your keys"
            sub="NOVX uses read-only broker connections. We can see your trades. We can&rsquo;t move your money."
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  icon: Icon,
  kicker,
  headline,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  headline: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-6"
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-600/20 border border-violet-500/20 flex items-center justify-center mb-4">
        <Icon className="w-4 h-4 text-violet-300" />
      </div>
      <div className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-1.5">
        {kicker}
      </div>
      <div className="text-xl font-semibold">{headline}</div>
      <p className="mt-2 text-sm text-white/55 leading-relaxed">{sub}</p>
    </motion.div>
  );
}
