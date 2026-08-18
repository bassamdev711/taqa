"use client";

import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowLeft, CheckCircle2, Home, Sun, Zap } from "lucide-react";

type HeroData = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroPrimaryButton?: string | null;
  heroSecondaryButton?: string | null;
};

export default function Hero({
  data = {},
  brandName = "طاقة هوم",
  brandNameLatin = "TAQA HOME",
}: {
  data?: HeroData;
  brandName?: string;
  brandNameLatin?: string;
}) {
  const scrollToProducts = () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative overflow-hidden bg-surface pt-24 md:pt-28" dir="rtl">
      <div className="absolute -top-40 -left-24 h-[34rem] w-[34rem] rounded-full bg-sky/70 blur-3xl" />
      <div className="absolute right-[-12rem] top-32 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl items-center gap-12 px-5 pb-12 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="order-2 text-center lg:order-1 lg:text-right"
        >
          <div aria-label={brandName} className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/10 bg-white/70 px-4 py-2 text-xs font-bold text-brand shadow-sm backdrop-blur">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-brand"><Sun size={14} /></span>
            حلول أذكى لبيت أكثر راحة
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-brand sm:text-6xl lg:text-7xl">
            بيتك يستحق <span className="text-gradient">اختياراً أذكى</span>
          </h1>
          <p className="mt-5 text-xl font-bold leading-relaxed text-green sm:text-2xl">
            {data.heroSubtitle || "أجهزة منزلية موثوقة، وطاقة شمسية تصنع فرقاً."}
          </p>
          <p className="mt-5 max-w-xl text-base leading-8 text-foreground/65 sm:text-lg">
            {data.heroDescription || "اكتشف تشكيلة مختارة من الغسالات والثلاجات وأجهزة المطبخ، إلى جانب حلول الطاقة الشمسية التي تمنح منزلك أداءً يومياً أكثر كفاءة."}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <button onClick={scrollToProducts} className="btn btn-primary btn-lg gap-3">
              {data.heroPrimaryButton || "تصفح المنتجات"}
              <ArrowLeft size={18} />
            </button>
            <a href="#solar" className="btn btn-outline btn-lg gap-2">
              {data.heroSecondaryButton || "اكتشف الطاقة الشمسية"}
              <ArrowDownLeft size={17} />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-foreground/60 lg:justify-start">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green" size={16} /> ضمان معتمد</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green" size={16} /> شحن وتركيب</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-green" size={16} /> دعم بعد البيع</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12 }}
          className="order-1 relative mx-auto w-full max-w-[620px] lg:order-2"
        >
          <div className="absolute -right-4 -top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent"><Zap size={18} fill="currentColor" /></span>
            <span className="text-right"><strong className="block text-sm text-brand">طاقة أقل</strong><small className="block text-[11px] text-foreground/55">أداء يومي أكثر</small></span>
          </div>

          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[2rem] bg-brand p-5 shadow-[0_30px_80px_-30px_rgba(16,42,51,0.6)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.23),transparent_28%),linear-gradient(135deg,#1b4550,#102a33_70%)]" />
            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.22))]" />
            <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-surface/55 sm:left-8 sm:top-8">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_5px_rgba(245,158,11,0.16)]" />
              {brandNameLatin}
            </div>

            <div className="relative flex h-full items-end justify-center gap-3 pb-8 sm:gap-5 sm:pb-12">
              <div className="relative h-[58%] w-[22%] min-w-[78px] rounded-[1.2rem] border border-white/20 bg-gradient-to-b from-surface/95 to-sky/75 shadow-2xl sm:min-w-[110px]">
                <div className="absolute left-1/2 top-4 h-1.5 w-8 -translate-x-1/2 rounded-full bg-brand/35" />
                <div className="absolute bottom-7 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand/15 bg-white/45 text-brand/70 sm:h-16 sm:w-16"><span className="text-[9px] font-black tracking-widest">COOL</span></div>
                <div className="absolute bottom-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-green/70" />
              </div>

              <div className="relative h-[76%] w-[30%] min-w-[110px] rounded-[1.2rem] border border-white/20 bg-gradient-to-b from-white to-sky shadow-2xl sm:min-w-[150px]">
                <div className="absolute left-1/2 top-4 h-1.5 w-12 -translate-x-1/2 rounded-full bg-brand/25" />
                <div className="absolute inset-x-3 top-12 bottom-3 rounded-xl border border-brand/10 bg-brand/5" />
                <div className="absolute bottom-8 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-brand/15 bg-white/70 text-brand sm:h-20 sm:w-20"><span className="text-[9px] font-black tracking-widest">WASH</span></div>
                <div className="absolute bottom-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-accent" />
              </div>

              <div className="relative hidden h-[42%] w-[16%] min-w-[62px] rounded-[1rem] border border-white/20 bg-gradient-to-b from-surface to-sky/65 shadow-xl sm:block">
                <div className="absolute inset-x-2 top-3 h-2 rounded-full bg-brand/20" />
                <div className="absolute bottom-4 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-accent/70" />
              </div>
            </div>

            <div className="absolute bottom-4 right-5 left-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-surface backdrop-blur-md sm:right-8 sm:left-8 sm:bottom-7">
              <div><p className="text-xs font-bold text-surface/60">تشكيلة الموسم</p><p className="mt-1 text-sm font-black sm:text-base">تقنية تحسّن يومك</p></div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-brand"><Home size={17} /></span>
            </div>
          </div>

          <div className="absolute -bottom-5 -left-4 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:-left-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green/10 text-green"><Sun size={20} /></div>
            <div><strong className="block text-sm text-brand">حلول شمسية</strong><small className="block text-[11px] text-foreground/55">استثمار يدوم</small></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
