"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, Check, Leaf, ShieldCheck, Sparkles, Zap } from "lucide-react";

type AboutData = { aboutTopTitle?: string | null; aboutMainTitle?: string | null; aboutQuote?: string | null; aboutDescription?: string | null };

export default function About({ data = {}, brandName = "طاقة هوم" }: { data?: AboutData; brandName?: string }) {
  return (
    <section id="about" className="relative overflow-hidden bg-surface py-24 md:py-32" dir="rtl">
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[0.3fr_1fr_0.8fr] lg:gap-16">
          <div className="hidden border-l border-brand/10 lg:block">
            <div className="sticky top-32 flex h-[25rem] flex-col items-center justify-between pb-6 pt-1"><span className="rotate-90 text-[9px] font-black tracking-[0.4em] text-brand/40">THE TAQA HOME EDIT</span><span className="text-8xl font-black tracking-[-0.12em] text-brand/8">02</span><span className="h-14 w-px bg-gradient-to-b from-accent to-transparent" /></div>
          </div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="eyebrow text-accent">{data.aboutTopTitle || "فلسفة {brandName}".replace("{brandName}", brandName)}</span>
            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-brand sm:text-6xl lg:text-7xl">{data.aboutMainTitle || "نصمم راحةً تُرى، وتُقاس، وتدوم."}</h2>
            <div className="my-8 flex items-center gap-4"><span className="h-2 w-2 rounded-full bg-accent" /><span className="h-px w-24 bg-brand/20" /><span className="text-[10px] font-black tracking-[0.25em] text-brand/40">HOME / ENERGY / LIFE</span></div>
            <p className="max-w-2xl text-2xl font-bold leading-relaxed text-green sm:text-3xl">{data.aboutQuote || "كل جهاز هو قرار صغير. مجموع القرارات يصنع بيتاً أجمل."}</p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-foreground/60 sm:text-lg">{data.aboutDescription || "في {brandName} لا نعرض الأجهزة كقطع منفصلة؛ نراها كنظام واحد ينسجم مع هندسة منزلك، إيقاع يومك، والطاقة التي تريد أن تعيش بها.".replaceAll("{brandName}", brandName)}</p>
            <a href="#solar" className="mt-8 inline-flex items-center gap-3 text-sm font-black text-brand transition-colors hover:text-green">شاهد كيف نفكر بالطاقة <ArrowUpLeft size={18} /></a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="relative min-h-[32rem] overflow-hidden rounded-[2rem] bg-brand p-6 text-surface shadow-2xl sm:p-8">
            <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full border border-accent/30" /><div className="absolute -left-8 -top-8 h-36 w-36 rounded-full border border-accent/15" /><div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-green/20 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-brand"><Sparkles size={20} /></span><span className="text-[9px] font-black tracking-[0.28em] text-surface/35">TAQA / 02</span></div>
              <div className="py-10"><p className="text-[7.5rem] font-black leading-none tracking-[-0.12em] text-surface/8 sm:text-[9rem]">24</p><div className="-mt-8 mr-3"><p className="text-lg font-black">ساعة في يومك</p><p className="mt-3 max-w-[15rem] text-sm leading-7 text-surface/55">نصنع حلولاً تشتغل بهدوء، حتى تمنحك أنت مساحة أكبر للحياة.</p></div></div>
              <div className="space-y-3 border-t border-surface/10 pt-5 text-xs font-bold text-surface/68"><p className="flex items-center gap-3"><Check className="text-accent" size={15} /> اختيار على أساس الاحتياج</p><p className="flex items-center gap-3"><Check className="text-accent" size={15} /> مواصفات بلا تعقيد</p><p className="flex items-center gap-3"><Check className="text-accent" size={15} /> خدمة تكمّل التجربة</p></div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-3 border-t border-brand/10 pt-6 sm:grid-cols-3 md:mt-24 md:gap-8">
          <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 text-brand"><Zap size={18} /></span><div><p className="text-sm font-black text-brand">أداء محسوب</p><p className="mt-1 text-xs text-foreground/50">تقنية تلائم الاستهلاك اليومي</p></div></div>
          <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 text-brand"><Leaf size={18} /></span><div><p className="text-sm font-black text-brand">طاقة أهدأ</p><p className="mt-1 text-xs text-foreground/50">حلول أكثر استدامة للغد</p></div></div>
          <div className="flex items-center gap-4"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 text-brand"><ShieldCheck size={18} /></span><div><p className="text-sm font-black text-brand">ثقة مستمرة</p><p className="mt-1 text-xs text-foreground/50">دعم واضح بعد الشراء</p></div></div>
        </div>
      </div>
    </section>
  );
}
