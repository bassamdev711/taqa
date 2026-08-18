"use client";

import { motion } from "framer-motion";

type StatItem = { value: string; label: string };
type StatsData = { statsJson?: string | null };

const defaultStats: StatItem[] = [
  { value: "01", label: "وجهة للبيت" },
  { value: "A+", label: "اختيارات كفاءة" },
  { value: "360°", label: "خدمة متكاملة" },
  { value: "24/7", label: "راحة مستمرة" },
];

export default function Stats({ data = {} }: { data?: StatsData }) {
  let stats = defaultStats;
  if (data.statsJson) {
    try {
      const parsed: unknown = JSON.parse(data.statsJson);
      if (Array.isArray(parsed)) {
        const valid = parsed.filter((item): item is StatItem => Boolean(item && typeof item === "object" && typeof (item as Record<string, unknown>).value === "string" && typeof (item as Record<string, unknown>).label === "string"));
        if (valid.length > 0) stats = valid;
      }
    } catch { stats = defaultStats; }
  }
  return (
    <section className="border-y border-brand/10 bg-surface py-14 md:py-20" dir="rtl">
      <div className="mx-auto grid max-w-[92rem] grid-cols-2 divide-x divide-x-reverse divide-brand/10 px-5 md:grid-cols-4 md:px-14">
        {stats.map((stat, index) => <motion.div key={index} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.07 }} className="px-4 text-center md:px-8"><p className="text-3xl font-black tracking-[-0.06em] text-brand sm:text-5xl">{stat.value}</p><p className="mt-2 text-[10px] font-black uppercase tracking-[0.16em] text-foreground/45 sm:text-xs">{stat.label}</p></motion.div>)}
      </div>
    </section>
  );
}
