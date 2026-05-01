"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("done");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="waitlist" className="relative px-6 py-32">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-3xl mx-auto h-64 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-purple-600/20 blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Be first in line.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-white/60"
        >
          <span className="text-white font-medium">2,847</span> traders already on the waitlist.
          Early members get free access until the public launch.
        </motion.p>

        {state === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-200"
          >
            <Check className="w-4 h-4" />
            You're in. Watch your inbox for an invite.
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={submit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@trading.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-violet-500/50 focus:bg-white/10 outline-none transition-colors placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="px-6 py-3 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 font-medium shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
            >
              {state === "loading" ? "Joining…" : "Join waitlist"}
            </button>
          </motion.form>
        )}
        {state === "error" && (
          <p className="mt-3 text-rose-400 text-sm">{message || "Something went wrong. Try again."}</p>
        )}
      </div>
    </section>
  );
}
