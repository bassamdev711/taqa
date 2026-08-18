import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CollectionsSection from "@/components/CollectionsSection";
import ProductsServer from "@/components/ProductsServer";
import { getHomepageSettings } from "@/app/actions/homepage";
import prisma from "@/lib/prisma";
import CampaignBanner from "@/components/CampaignBanner";
import { getStoreConfig } from "@/lib/store-config";

const Experience = dynamic(() => import("@/components/Experience"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const Newsletter = dynamic(() => import("@/components/Newsletter"), { ssr: true });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: true });
const Stats = dynamic(() => import("@/components/Stats"), { ssr: true });

export default async function Home() {
  const [store, { data: settings }] = await Promise.all([getStoreConfig(), getHomepageSettings()]);
  const safeSettings = settings || {};
  let activeCampaign: Awaited<ReturnType<typeof prisma.campaign.findFirst>> = null;
  try {
    activeCampaign = await prisma.campaign.findFirst({ where: { isActive: true, startDate: { lte: new Date() }, endDate: { gte: new Date() } }, orderBy: { createdAt: "desc" } });
  } catch { /* الصفحة تعمل دون حملة عند غياب قاعدة البيانات */ }

  const storeName = store.name === "متجرك" ? "طاقة هوم" : store.name;
  const storeNameLatin = store.nameLatin === "YOUR STORE" ? "TAQA HOME" : store.nameLatin;

  return (
    <main className="min-h-screen overflow-hidden bg-surface font-sans text-foreground">
      <Navbar storeName={storeName} storeNameLatin={storeNameLatin} />
      <Hero data={safeSettings} brandName={storeName} brandNameLatin={storeNameLatin} />
      {activeCampaign && <CampaignBanner campaign={activeCampaign} />}
      <About data={safeSettings} brandName={storeName} />
      <CollectionsSection brandName={storeName} />
      <ProductsServer type="bestsellers" title="الأكثر طلباً" subtitle="أجهزة يعتمد عليها بيتك كل يوم" />
      <ProductsServer type="offers" title="عروض موسمية" subtitle="اختيارات عملية بسعر أفضل" />
      <ProductsServer type="featured" title="اختيارات طاقة هوم" subtitle="ترشيحاتنا للأداء والكفاءة" />
      <Experience data={safeSettings} brandName={storeName} />
      <Stats data={safeSettings} />
      <Testimonials />
      <Newsletter storeName={storeName} />
      <Contact />
      <Footer storeName={storeName} storeNameLatin={storeNameLatin} />
    </main>
  );
}
