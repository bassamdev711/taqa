"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BadgeCheck, Gauge, Headphones, Wrench } from "lucide-react";

type ExperienceData = {
  expTopTitle?: string | null;
  expMainTitle?: string | null;
  expBox1Title?: string | null;
  expBox1Desc?: string | null;
  expBox2Title?: string | null;
  expBox2Desc?: string | null;
};

const serviceCards = [
  { icon: Gauge, title: "كفاءة محسوبة", text: "نساعدك على اختيار الجهاز الذي يقدم الأداء الذي تحتاجه باستهلاك أكثر توازناً." },
  { icon: Wrench, title: "تركيب منظم", text: "من التوصيل إلى حلول الطاقة الشمسية، نرتب التفاصيل لتبدأ استخدامك براحة." },
  { icon: BadgeCheck, title: "ضمان واضح", text: "منتجات موثوقة ومعلومات مباشرة حتى تعرف ما الذي تحصل عليه قبل الدفع." },
  { icon: Headphones, title: "دعم قريب", text: "نظل معك بعد الشراء عبر متابعة سهلة وخدمة عملاء تفهم احتياجك." },
];

export default function Experience({ data = {} }: { data?: ExperienceData; brandName?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  return (
    <section id="solar" ref={containerRef} className="relative overflow-hidden bg-surface py-20 md:py-28" dir="rtl">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.28em] text-accent">{data.expTopTitle || "خدمتنا تبدأ من احتياجك"}</span>
            <h2 className="max-w-2xl text-4xl font-black leading-tight text-brand sm:text-5xl">{data.expMainTitle || "أجهزة أفضل. خدمة أبسط. طاقة أذكى."}</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-foreground/60">نختصر عليك الحيرة ونحوّل قرار الشراء إلى تجربة مفهومة من أول مقارنة حتى ما بعد التركيب.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map(({ icon: Icon, title, text }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className={`group rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${index === 1 ? "border-accent/30 bg-accent text-brand" : "border-brand/10 bg-white text-brand"}`}
            >
              <span className={`mb-10 flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? "bg-brand/10" : "bg-sky"}`}><Icon size={23} /></span>
              <h3 className="text-xl font-black">{index === 0 && data.expBox1Title ? data.expBox1Title : index === 1 && data.expBox2Title ? data.expBox2Title : title}</h3>
              <p className={`mt-3 text-sm leading-7 ${index === 1 ? "text-brand/70" : "text-foreground/60"}`}>{index === 0 && data.expBox1Desc ? data.expBox1Desc : index === 1 && data.expBox2Desc ? data.expBox2Desc : text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div style={{ y }} className="mt-5 overflow-hidden rounded-[2rem] bg-brand p-6 text-surface sm:p-8 lg:mt-7 lg:flex lg:items-center lg:justify-between lg:px-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">حلول الطاقة الشمسية</span>
            <h3 className="mt-3 max-w-2xl text-2xl font-black sm:text-3xl">خفّض اعتمادك على الشبكة، وامنح منزلك طاقة تستمر.</h3>
          </div>
          <a href="#contact" className="btn mt-6 w-full border border-surface/20 bg-white/10 text-surface hover:bg-white/15 lg:mt-0 lg:w-auto">استشرنا لحل مناسب</a>
        </motion.div>
      </div>
    </section>
  );
}
