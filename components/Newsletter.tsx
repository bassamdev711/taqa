"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Sun } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

export default function Newsletter({ storeName = "طاقة هوم" }: { storeName?: string }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    const result = await subscribeToNewsletter(email);
    setIsSubmitting(false);
    if (result.success) {
      showToast("success", result.message || "تم الاشتراك بنجاح!");
      setEmail("");
    } else showToast("error", result.error || "حدث خطأ ما");
  };

  return (
    <section className="relative overflow-hidden bg-brand py-20 text-surface md:py-24" dir="rtl">
      <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-green/25 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-brand shadow-lg"><Sun size={25} fill="currentColor" /></div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-accent">خليك على اطلاع</p>
          <h2 className="text-3xl font-black sm:text-5xl">عروض أذكى لبيت أكثر كفاءة</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-surface/65 sm:text-lg">اشترك لتصلك عروض الأجهزة المنزلية، ونصائح اختيار المنتج، وكل جديد في حلول الطاقة الشمسية من {storeName}.</p>
          <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <div className="relative flex-1"><Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-surface/35" size={18} /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="بريدك الإلكتروني" className="h-14 w-full rounded-xl border border-white/10 bg-white/10 px-12 text-surface outline-none transition-colors placeholder:text-surface/35 focus:border-accent/60" required /></div>
            <button type="submit" disabled={isSubmitting} className="btn h-14 bg-accent px-8 text-brand hover:bg-solar disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "جاري الاشتراك..." : "اشترك الآن"}</button>
          </form>
          <p className="mt-5 text-xs text-surface/35">نحترم خصوصيتك، ويمكنك إلغاء الاشتراك في أي وقت.</p>
        </motion.div>
      </div>
    </section>
  );
}
