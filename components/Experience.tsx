"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpLeft, BatteryCharging, Home, ShieldCheck, Sun, Wrench, Zap } from "lucide-react";

type ExperienceData = { expTopTitle?: string | null; expMainTitle?: string | null; expBox1Title?: string | null; expBox1Desc?: string | null; expBox2Title?: string | null; expBox2Desc?: string | null };

export default function Experience({ data = {}, brandName = "طاقة هوم" }: { data?: ExperienceData; brandName?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <section id="solar" ref={containerRef} className="relative overflow-hidden bg-surface py-24 md:py-32" dir="rtl">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-14">
        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end"><div><span className="eyebrow text-accent">{data.expTopTitle || `${brandName} / 04`}
            </span><h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-brand sm:text-6xl">{data.expMainTitle || "الطاقة ليست فاتورة. إنها قرار تصميم."}</h2></div><p className="max-w-sm text-sm leading-7 text-foreground/55">نبني معك منظومة تفهم المنزل، وتنسجم مع الأجهزة، وتترك أثراً أخف على يومك.</p></div>

        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <motion.div style={{ y }} className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-brand p-6 text-surface shadow-2xl sm:p-9">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-accent/15" /><div className="absolute -left-10 -top-10 h-44 w-44 rounded-full border border-accent/15" /><div className="absolute bottom-[-8rem] right-[-5rem] h-80 w-80 rounded-full bg-green/20 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between"><div className="flex items-start justify-between"><div><span className="eyebrow text-accent">SOLAR / HOME SYSTEM</span><h3 className="mt-4 text-2xl font-black sm:text-3xl">منظومة تعمل معك،<br /><span className="text-surface/45">لا عليك.</span></h3></div><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-brand"><Sun size={22} fill="currentColor" /></span></div>
              <div className="my-10 grid grid-cols-[1fr_auto] items-end gap-8"><div><div className="mb-4 flex items-end gap-2"><span className="text-6xl font-black tracking-[-0.08em] text-accent">86</span><span className="mb-2 text-sm font-bold text-surface/45">%</span></div><p className="flex items-center gap-1 text-xs text-surface/50"><Zap size={12} className="text-accent" /> مؤشر الاستقلال اليومي</p></div><div className="flex h-32 items-end gap-2">{[32, 46, 39, 62, 54, 77, 68, 92].map((height, index) => <span key={index} className={`w-3 rounded-t-full sm:w-4 ${index === 7 ? "bg-accent" : "bg-surface/20"}`} style={{ height: `${height}%` }} />)}</div></div>
              <div className="grid grid-cols-3 gap-3 border-t border-surface/10 pt-5"><div><p className="text-[9px] text-surface/40">الإنتاج</p><p className="mt-1 text-sm font-black">4.8 kWh</p></div><div><p className="text-[9px] text-surface/40">التخزين</p><p className="mt-1 text-sm font-black">76%</p></div><div><p className="text-[9px] text-surface/40">الحالة</p><p className="mt-1 flex items-center gap-1 text-sm font-black text-green"><span className="h-1.5 w-1.5 rounded-full bg-green" /> ممتاز</p></div></div>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[{ icon: Home, title: data.expBox1Title || "يبدأ من بيتك", text: data.expBox1Desc || "نقرأ احتياج منزلك قبل أن نقترح الحل، من عدد الأجهزة إلى نمط الاستخدام." }, { icon: Wrench, title: data.expBox2Title || "يُركّب بثقة", text: data.expBox2Desc || "تفاصيل واضحة من المعاينة إلى التشغيل، دون وعود غامضة أو خطوات ناقصة." }, { icon: BatteryCharging, title: "يستمر معك", text: "مراقبة ودعم وحلول قابلة للتوسع عندما يكبر احتياجك." }].map(({ icon: Icon, title, text }, index) => <motion.div key={title} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }} className="group flex gap-5 rounded-[1.5rem] border border-brand/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-xl sm:p-7"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky text-brand transition-colors group-hover:bg-accent"><Icon size={21} /></span><div><h3 className="text-lg font-black text-brand">{title}</h3><p className="mt-2 text-sm leading-7 text-foreground/55">{text}</p></div></motion.div>)}
          </div>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-5 rounded-[1.5rem] border border-brand/10 bg-white p-6 sm:p-7 md:flex-row md:items-center"><div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-accent"><ShieldCheck size={19} /></span><div><p className="text-sm font-black text-brand">هندسة على مقاس يومك</p><p className="mt-1 text-xs text-foreground/50">حلول منزلية، لا قوائم منتجات عشوائية.</p></div></div><a href="#contact" className="inline-flex items-center gap-2 text-sm font-black text-brand hover:text-green">اطلب استشارة <ArrowUpLeft size={17} /></a></div>
      </div>
    </section>
  );
}
