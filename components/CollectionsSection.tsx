import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpLeft, Home, Snowflake, Sun, Zap } from 'lucide-react'
import { getStoreCollectionImage } from '@/lib/store-images'

type CollectionCard = { id: string; name: string; slug: string; description: string | null; imageUrl: string | null }

const defaultCollections: CollectionCard[] = [
  { id: 'wash', name: 'الغسيل والعناية', slug: 'washing-care', description: 'غسالات ومجففات تجعل روتينك اليومي أخف.', imageUrl: null },
  { id: 'cool', name: 'التبريد والثلاجات', slug: 'cooling', description: 'برودة ثابتة، ومساحة تعيش مع عائلتك.', imageUrl: null },
  { id: 'kitchen', name: 'أجهزة المطبخ', slug: 'kitchen-appliances', description: 'أداء عملي بتفاصيل تليق بمطبخك.', imageUrl: null },
  { id: 'solar', name: 'الطاقة الشمسية', slug: 'solar-energy', description: 'منظومة تبدأ من السطح وتصل إلى راحة يومك.', imageUrl: null },
]

const categoryVisuals = [
  { code: '01', icon: Home, accent: 'from-[#dcebe5] to-[#f5f1e6]' },
  { code: '02', icon: Snowflake, accent: 'from-[#d9e9ee] to-[#f5f1e6]' },
  { code: '03', icon: Zap, accent: 'from-[#ffe4a6] to-[#f5f1e6]' },
  { code: '04', icon: Sun, accent: 'from-[#f8d584] to-[#fff6db]' },
]

export const revalidate = 3600

export default async function CollectionsSection({ brandName = 'طاقة هوم' }: { brandName?: string }) {
  let collections: CollectionCard[] = []
  try { collections = await prisma.collection.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 4 }) } catch { collections = [] }
  const visibleCollections = collections.length > 0 ? collections : defaultCollections

  return (
    <section className="relative overflow-hidden bg-brand py-20 text-surface md:py-28" dir="rtl">
      <div className="absolute left-[-10rem] top-[-8rem] h-[30rem] w-[30rem] rounded-full border border-accent/10" />
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-14">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><span className="eyebrow text-accent">{brandName} / 03</span><h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-6xl">مساحات البيت،<br /><span className="text-surface/42">بذوق مختلف.</span></h2></div>
          <Link href="/products" className="inline-flex items-center gap-3 text-sm font-black text-accent transition-colors hover:text-solar">افتح الكتالوج <ArrowUpLeft size={18} /></Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {visibleCollections.map((collection, index) => {
            const visual = categoryVisuals[index % categoryVisuals.length]
            const Icon = visual.icon
            return (
              <Link key={collection.id} href={`/products?collection=${collection.slug}`} className="group relative min-h-[20rem] overflow-hidden bg-brand p-5 transition-colors duration-500 hover:bg-[#153d47] sm:p-7">
                {getStoreCollectionImage(collection.imageUrl, collection.slug) ? <Image src={getStoreCollectionImage(collection.imageUrl, collection.slug)} alt={collection.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" /> : <div className={`absolute inset-5 rounded-[1.4rem] bg-gradient-to-br ${visual.accent} opacity-90 transition-transform duration-700 group-hover:scale-[1.03]`}><div className="absolute right-5 top-5 text-[9px] font-black tracking-[0.28em] text-brand/35">TAQA / {visual.code}</div><Icon className="absolute bottom-7 left-7 text-brand/70" size={52} strokeWidth={1.1} /></div>}
                <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/20 to-transparent opacity-90" />
                <div className="relative z-10 flex h-full flex-col justify-between"><span className="text-[10px] font-black tracking-[0.28em] text-surface/35">{visual.code}</span><div><h3 className="text-2xl font-black text-surface">{collection.name}</h3><p className="mt-3 max-w-[15rem] text-sm leading-6 text-surface/55">{collection.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">اكتشف القسم <ArrowUpLeft size={15} /></span></div></div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
