import type { Metadata } from "next";
import Link from "next/link";
import DashboardPreview from "@/components/DashboardPreview";

export const metadata: Metadata = {
  title: "fyt — Demo",
  description: "Try fyt's interactive demo. No signup required.",
};

export default function Demo() {
  return (
    <main className="min-h-screen pt-6">
      <div className="max-w-6xl mx-auto px-6 mb-2 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <span aria-hidden>←</span> Back to fyt
        </Link>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-200 border border-violet-500/20">
          Demo mode · sample data
        </span>
      </div>
      <DashboardPreview />
    </main>
  );
}
