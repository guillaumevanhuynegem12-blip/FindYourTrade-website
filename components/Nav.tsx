"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 inset-x-4 z-50 flex justify-center"
    >
      <nav className="flex items-center gap-6 px-5 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <NovxMark />
          Novx
        </Link>
        <div className="hidden sm:flex items-center gap-5 text-sm text-white/60">
          <a href="#preview" className="hover:text-white transition-colors">
            Product
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </div>
        <Link
          href="#waitlist"
          className="text-sm px-3.5 py-1.5 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
        >
          Get early access
        </Link>
      </nav>
    </motion.header>
  );
}

function NovxMark({ size = 22 }: { size?: number }) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
      aria-hidden="true"
    >
      <g transform="translate(50 50)">
        {rays.map((a) => (
          <rect
            key={a}
            x="-6"
            y="-46"
            width="12"
            height="32"
            rx="6"
            fill="currentColor"
            transform={`rotate(${a})`}
          />
        ))}
      </g>
    </svg>
  );
}
