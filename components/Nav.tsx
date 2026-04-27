"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 80) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-4 inset-x-4 z-50 flex items-center justify-between gap-3"
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold tracking-tight px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl"
      >
        <FytMark size={28} />
        fyt
      </Link>
      <nav className="flex items-center gap-6 px-5 py-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl">
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

function FytMark({ size = 22 }: { size?: number }) {
  const directions = [0, 90, 180, 270];
  const splay = 22;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
      aria-hidden="true"
    >
      <g transform="translate(50 50)">
        {directions.map((dir) => (
          <g key={dir} transform={`rotate(${dir})`}>
            <rect
              x="-7"
              y="-44"
              width="14"
              height="30"
              rx="7"
              fill="currentColor"
              transform={`rotate(${-splay})`}
            />
            <rect
              x="-7"
              y="-44"
              width="14"
              height="30"
              rx="7"
              fill="currentColor"
              transform={`rotate(${splay})`}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
