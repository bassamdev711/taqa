"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowLeft, CircleCheck, Sun } from "lucide-react";

type HeroData = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroPrimaryButton?: string | null;
  heroSecondaryButton?: string | null;
};

export default function Hero({ data = {}, brandName = "طاقة هوم", brandNameLatin = "TAQA HOME" }: { data?: HeroData; brandName?: string; brandNameLatin?: string }) {
  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-brand text-surface" dir="rtl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(239,179,74,0.18),transparent_24%),radial-gradient(circle_at_18%_82%,rgba(111,149,128,0.18),transparent_30%),linear-gradient(135deg,#0b232b,#123943_62%,#0b232b)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(214,231,227,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,227,0.06)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="pointer-events-none absolute -left-32 bottom-[-12rem] h-[34rem] w-[34rem] rounded-full border border-accent/10 blur-[1px]" />

      <div className="relative z-10 mx-auto grid min-h-[100dvh] max-w-[92rem] items-center gap-10 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20 lg:px-14 lg:pb-16 lg:pt-36">
        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85 }} className="order-2 lg:order-1">
          <div aria-label={brandName} className="mb-7 flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-accent/80">
            <span className="flex items-center gap-2"><Sun size={13} fill="currentColor" /><span className="h-px w-10 bg-accent" /></span>
            {brandNameLatin} / 01
          </div>
          <h1 className="max-w-2xl text-[3.65rem] font-black leading-[0.98] tracking-[-0.045em] text-surface sm:text-7xl lg:text-[6.8rem]">
            البيت،<br /> <span className="text-gradient">بصيغة أذكى.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg font-bold leading-relaxed text-surface/82 sm:text-2xl">{data.heroSubtitle || "أجهزة تصنع راحتك. وطاقة تمنحك استقلالك."}</p>
          <p className="mt-5 max-w-xl text-sm leading-8 text-surface/52 sm:text-base">{data.heroDescription || "من الغسالة التي تفهم إيقاع يومك إلى المنظومة الشمسية التي تفهم احتياج منزلك؛ نختار لك تقنيات جميلة، عملية، وتدوم."}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="btn btn-lg gap-3 bg-accent text-brand hover:bg-solar">{data.heroPrimaryButton || "اكتشف التشكيلة"}<ArrowLeft size={18} /></Link>
            <a href="#solar" className="btn btn-lg gap-3 border border-surface/20 bg-white/5 text-surface hover:bg-white/10">{data.heroSecondaryButton || "مختبر الطاقة"}<ArrowDownLeft size={17} /></a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-surface/10 py-4">
            <div className="border-l border-surface/10 pl-3"><p className="text-xl font-black text-accent">A+</p><p className="mt-1 text-[10px] text-surface/48">كفاءة مختارة</p></div>
            <div className="border-l border-surface/10 px-3"><p className="text-xl font-black text-accent">360°</p><p className="mt-1 text-[10px] text-surface/48">خدمة متكاملة</p></div>
            <div className="pr-3"><p className="text-xl font-black text-accent">01</p><p className="mt-1 text-[10px] text-surface/48">وجهة للبيت</p></div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs text-surface/45"><CircleCheck size={15} className="text-green" /> مواصفات واضحة، تركيب موثوق، ودعم بعد البيع.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.12 }} className="order-1 relative mx-auto w-full max-w-[700px] lg:order-2">
          <div className="relative aspect-[1.08/1] overflow-hidden rounded-[2rem] border border-white/15 bg-[#0d2932] shadow-[0_40px_100px_-35px_rgba(0,0,0,0.8)] sm:rounded-[2.6rem]">
            <div className="absolute left-6 top-6 z-20 text-[9px] font-black tracking-[0.25em] text-surface/40 sm:left-9 sm:top-9">{brandNameLatin}</div>
            <div className="absolute bottom-7 right-7 z-20 max-w-[130px] text-right sm:bottom-10 sm:right-10"><span className="block text-[9px] font-black tracking-[0.22em] text-accent">THE HOME SYSTEM</span><p className="mt-2 text-xs leading-6 text-surface/55">حين تعمل التفاصيل معاً، تشعر بالفرق.</p></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="orbit-drift absolute h-[76%] w-[76%] rounded-full border border-dashed border-accent/30"><span className="absolute -right-1 top-1/2 h-3 w-3 rounded-full bg-accent shadow-[0_0_22px_7px_rgba(239,179,74,0.35)]" /></div>
              <div className="absolute h-[55%] w-[55%] rounded-full border border-surface/10" />
              <div className="solar-pulse absolute h-[38%] w-[38%] rounded-full bg-accent/15 blur-2xl" />

              <div className="absolute bottom-[15%] left-[16%] h-[48%] w-[20%] rounded-[1.3rem] border border-white/25 bg-gradient-to-b from-[#e6eeea] to-[#9bb7b2] shadow-[18px_20px_36px_-18px_rgba(0,0,0,0.7)] sm:left-[18%] sm:w-[19%]">
                <div className="absolute left-1/2 top-3 h-1 w-9 -translate-x-1/2 rounded-full bg-brand/25" /><div className="absolute bottom-7 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full border border-brand/20 bg-white/40" /><div className="absolute bottom-2 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-green" />
              </div>
              <div className="absolute bottom-[12%] left-1/2 h-[65%] w-[29%] -translate-x-1/2 rounded-[1.5rem] border border-white/30 bg-gradient-to-b from-[#f6f4ee] via-[#d7e7e2] to-[#769b96] shadow-[22px_26px_50px_-22px_rgba(0,0,0,0.78)] sm:w-[28%]">
                <div className="absolute left-1/2 top-4 h-1.5 w-14 -translate-x-1/2 rounded-full bg-brand/25" /><div className="absolute inset-x-4 top-16 bottom-4 rounded-2xl border border-brand/10 bg-brand/8" /><div className="absolute bottom-10 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border border-brand/20 bg-white/40 text-[8px] font-black tracking-[0.2em] text-brand/60">WASH</div><div className="absolute bottom-3 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-accent" />
              </div>
              <div className="absolute bottom-[18%] right-[15%] h-[38%] w-[15%] rounded-[1.1rem] border border-white/25 bg-gradient-to-b from-[#edf3ef] to-[#9ab9b1] shadow-[14px_20px_30px_-18px_rgba(0,0,0,0.7)] sm:right-[17%] sm:w-[14%]"><div className="absolute bottom-3 left-1/2 h-1 w-7 -translate-x-1/2 rounded-full bg-accent/75" /></div>
            </div>

            <div className="absolute bottom-7 left-7 right-7 z-20 flex items-end justify-between border-t border-white/15 pt-4 sm:bottom-9 sm:left-9 sm:right-9"><div><p className="text-[9px] font-black tracking-[0.2em] text-accent">ENERGY / 01</p><p className="mt-1 text-xs font-bold text-surface/72">تقنية تحسّن إيقاع يومك</p></div><span className="text-[9px] font-black tracking-[0.18em] text-surface/35">HOME SYSTEM</span></div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[9px] font-black tracking-[0.25em] text-surface/35 lg:flex"><span className="h-px w-10 bg-surface/25" /> SCROLL TO EXPLORE <span className="h-px w-10 bg-surface/25" /></div>
    </section>
  );
}
