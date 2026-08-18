import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Home, Snowflake, Sun, Zap } from 'lucide-react'

type CollectionCard = {
  id: string
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
}

const defaultCollections: CollectionCard[] = [
  { id: 'wash', name: 'الغسيل والعناية', slug: 'washing-care', description: 'غسالات ومجففات تجعل روتينك اليومي أسهل.', imageUrl: null },
  { id: 'cool', name: 'التبريد والثلاجات', slug: 'cooling', description: 'حلول تبريد تحفظ طعامك وتوازن استهلاكك.', imageUrl: null },
  { id: 'kitchen', name: 'أجهزة المطبخ', slug: 'kitchen-appliances', description: 'أداء عملي وتصميم يناسب كل مطبخ.', imageUrl: null },
  { id: 'solar', name: 'الطاقة الشمسية', slug: 'solar-energy', description: 'ألواح وبطاريات وحلول طاقة لمنزل أكثر استقلالاً.', imageUrl: null },
]

const categoryVisuals = [
  { icon: Home, className: 'from-sky to-white text-brand' },
  { icon: Snowflake, className: 'from-[#dcecf7] to-white text-brand' },
  { icon: Zap, className: 'from-[#fff1c2] to-white text-brand' },
  { icon: Sun, className: 'from-[#ffe3a4] to-[#fff8e6] text-brand' },
]

export const revalidate = 3600

export default async function CollectionsSection({ brandName = 'طاقة هوم' }: { brandName?: string }) {
  let collections: CollectionCard[] = []
  try {
    collections = await prisma.collection.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' }, take: 4 })
  } catch {
    collections = []
  }

  const visibleCollections = collections.length > 0 ? collections : defaultCollections

  return (
    <section className="bg-surface py-16 md:py-24" dir="rtl">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-9 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.28em] text-accent">تشكيلة {brandName}</span>
            <h2 className="text-3xl font-black text-brand sm:text-5xl">كل ما يحتاجه بيتك</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 font-bold text-brand hover:text-green">استعرض الكل <ArrowLeft size={17} /></Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCollections.map((collection, index) => {
            const visual = categoryVisuals[index % categoryVisuals.length]
            const Icon = visual.icon
            return (
              <Link key={collection.id} href={`/products?collection=${collection.slug}`} className="group relative min-h-[260px] overflow-hidden rounded-[1.6rem] border border-brand/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:min-h-[360px]">
                {collection.imageUrl ? (
                  <Image src={collection.imageUrl} alt={collection.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${visual.className}`}>
                    <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/60 blur-2xl" />
                    <div className="absolute bottom-8 left-1/2 flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-[2rem] border border-brand/10 bg-white/65 shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <Icon size={46} strokeWidth={1.4} />
                    </div>
                    <span className="absolute left-6 top-6 text-[10px] font-black tracking-[0.25em] text-brand/35">TAQA / {String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand via-brand/85 to-transparent p-5 pt-20 text-surface md:p-7 md:pt-28">
                  <h3 className="text-xl font-black">{collection.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-surface/65">{collection.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
