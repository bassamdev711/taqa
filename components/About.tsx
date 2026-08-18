"use client";

import { motion } from "framer-motion";
import { ArrowUpLeft, CheckCircle2, Leaf, ShieldCheck, Zap } from "lucide-react";

type AboutData = {
  aboutTopTitle?: string | null;
  aboutMainTitle?: string | null;
  aboutQuote?: string | null;
  aboutDescription?: string | null;
};

export default function About({ data = {} }: { data?: AboutData; brandName?: string }) {
  return (
    <section id="about" className="relative overflow-hidden bg-brand py-20 text-surface md:py-28" dir="rtl">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-green/25 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="order-2 lg:order-1"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:p-7">
              <Zap className="mb-8 text-accent" size={26} />
              <p className="text-3xl font-black sm:text-4xl">أذكى</p>
              <p className="mt-2 text-sm leading-6 text-surface/60">اختيارات توازن بين الأداء والاستهلاك.</p>
            </div>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:p-7">
              <Leaf className="mb-8 text-solar" size={26} />
              <p className="text-3xl font-black sm:text-4xl">أنظف</p>
              <p className="mt-2 text-sm leading-6 text-surface/60">طاقة شمسية لأسلوب حياة أكثر استدامة.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm sm:p-7">
              <ShieldCheck className="mb-8 text-surface/80" size={26} />
              <p className="text-3xl font-black sm:text-4xl">موثوق</p>
              <p className="mt-2 text-sm leading-6 text-surface/60">جودة وضمان ودعم يرافقك بعد الشراء.</p>
            </div>
            <div className="mt-8 rounded-3xl border border-accent/25 bg-accent p-5 text-brand shadow-xl sm:p-7">
              <ArrowUpLeft className="mb-8" size={26} />
              <p className="text-3xl font-black sm:text-4xl">أسهل</p>
              <p className="mt-2 text-sm leading-6 text-brand/70">من المقارنة حتى التوصيل والتركيب.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.28em] text-accent">{data.aboutTopTitle || "لماذا طاقة هوم؟"}</span>
          <h2 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{data.aboutMainTitle || "نرتّب لك طريقاً أوضح إلى بيت أفضل."}</h2>
          <div className="my-7 h-px w-20 bg-accent" />
          <p className="max-w-xl text-2xl font-bold leading-relaxed text-surface/90 sm:text-3xl">{data.aboutQuote || "ليست الأجهزة مجرد منتجات؛ إنها تفاصيل تصنع راحة يومك."}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-surface/65 sm:text-lg">{data.aboutDescription || "نختار تشكيلة عملية من الأجهزة المنزلية الكهربائية وحلول الطاقة الشمسية، ونقدّم لك مواصفات واضحة وخدمة موثوقة تساعدك على اتخاذ القرار بثقة."}</p>
          <div className="mt-8 space-y-3 text-sm font-bold text-surface/80">
            <p className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={18} /> مقارنة واضحة للمواصفات والاستهلاك</p>
            <p className="flex items-center gap-3"><CheckCircle2 className="text-accent" size={18} /> حلول تناسب احتياج منزلك وميزانيتك</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
