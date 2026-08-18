"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Wrench } from "lucide-react";
import { submitContactMessage } from "@/app/actions/contact";
import { useToast } from "@/components/ToastProvider";

type ContactData = {
  phoneNumber?: string | null; showPhoneNumber?: boolean | null;
  emailAddress?: string | null; showEmailAddress?: boolean | null;
  address?: string | null; showAddress?: boolean | null;
};

export default function ContactClient({ contactData }: { contactData?: ContactData | null }) {
  const phone = contactData?.phoneNumber || "+967 777 777 777";
  const email = contactData?.emailAddress || "hello@example-store.com";
  const address = contactData?.address || "صنعاء، الجمهورية اليمنية";
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitContactMessage(formData);
    setIsSubmitting(false);
    if (result.success) {
      showToast("success", result.message || "تم الإرسال بنجاح");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } else showToast("error", result.error || "حدث خطأ ما");
  };

  return (
    <section id="contact" className="bg-surface py-20 md:py-28" dir="rtl">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div><span className="mb-3 block text-xs font-bold uppercase tracking-[0.28em] text-accent">نحن قريبون منك</span><h2 className="text-4xl font-black text-brand sm:text-5xl">خلّنا نساعدك تختار</h2></div>
          <p className="max-w-md text-sm leading-7 text-foreground/60">اسألنا عن جهاز، اطلب استشارة للطاقة الشمسية، أو اترك رسالتك وسيرد عليك فريقنا بأقرب وقت.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-[2rem] bg-brand p-7 text-surface sm:p-10">
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-brand"><Wrench size={25} /></div>
            <h3 className="text-2xl font-black sm:text-3xl">استشارة قبل الشراء</h3>
            <p className="mt-4 text-sm leading-7 text-surface/65">نساعدك في مقارنة السعة، استهلاك الكهرباء، خيارات التركيب، وما يناسب مساحة منزلك.</p>
            <div className="mt-10 space-y-6">
              {contactData?.showPhoneNumber !== false && <div className="flex items-start gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent"><Phone size={18} /></span><div><p className="text-xs text-surface/45">اتصل أو تواصل عبر واتساب</p><p className="mt-1 font-bold" dir="ltr">{phone}</p></div></div>}
              {contactData?.showEmailAddress !== false && <div className="flex items-start gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent"><Mail size={18} /></span><div><p className="text-xs text-surface/45">البريد الإلكتروني</p><p className="mt-1 font-bold">{email}</p></div></div>}
              {contactData?.showAddress !== false && <div className="flex items-start gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent"><MapPin size={18} /></span><div><p className="text-xs text-surface/45">نخدمك من</p><p className="mt-1 font-bold">{address}</p></div></div>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.08 }} className="rounded-[2rem] border border-brand/10 bg-white p-6 shadow-sm sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className="mb-2 block text-sm font-bold text-brand">الاسم</label><input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-12 w-full rounded-xl border border-brand/10 bg-surface px-4 text-foreground outline-none transition-colors focus:border-accent" /></div>
                <div><label className="mb-2 block text-sm font-bold text-brand">رقم الهاتف</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="h-12 w-full rounded-xl border border-brand/10 bg-surface px-4 text-foreground outline-none transition-colors focus:border-accent" dir="ltr" /></div>
              </div>
              <div><label className="mb-2 block text-sm font-bold text-brand">البريد الإلكتروني</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-12 w-full rounded-xl border border-brand/10 bg-surface px-4 text-foreground outline-none transition-colors focus:border-accent" dir="ltr" /></div>
              <div><label className="mb-2 block text-sm font-bold text-brand">كيف يمكننا مساعدتك؟</label><textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="مثال: أبحث عن ثلاجة موفرة للطاقة أو أحتاج استشارة لنظام شمسي..." className="w-full resize-none rounded-xl border border-brand/10 bg-surface px-4 py-3 leading-7 text-foreground outline-none transition-colors focus:border-accent" /></div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full gap-2 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "جاري الإرسال..." : "إرسال الاستشارة"}<Send size={17} /></button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
