"use client";

import { motion } from "framer-motion";

type StatItem = { value: string; label: string };
type StatsData = { statsJson?: string | null };

const defaultStats: StatItem[] = [
  { value: "24/7", label: "راحة ودعم" },
  { value: "100%", label: "وضوح في المواصفات" },
  { value: "5★", label: "تجربة عملاء" },
  { value: "1", label: "وجهة لكل بيت" },
];

export default function Stats({ data = {} }: { data?: StatsData }) {
  let stats = defaultStats;
  if (data.statsJson) {
    try {
      const parsed: unknown = JSON.parse(data.statsJson);
      if (Array.isArray(parsed)) {
        const validStats = parsed.filter((stat): stat is StatItem => {
          if (!stat || typeof stat !== "object") return false;
          const candidate = stat as Record<string, unknown>;
          return typeof candidate.value === "string" && typeof candidate.label === "string";
        });
        if (validStats.length > 0) stats = validStats;
      }
    } catch { stats = defaultStats; }
  }

  return (
    <section className="border-y border-white/10 bg-brand py-16 text-surface md:py-20" dir="rtl">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid grid-cols-2 gap-y-10 divide-x divide-x-reverse divide-surface/10 md:grid-cols-4 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.07 }} className="px-4 text-center">
              <h4 className="text-3xl font-black text-accent sm:text-5xl">{stat.value}</h4>
              <p className="mt-2 text-sm font-bold text-surface/70 sm:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
