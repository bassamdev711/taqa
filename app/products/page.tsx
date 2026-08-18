import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getCurrency } from '@/lib/currency'
import ProductCard from '@/components/ProductCard'
import CategoryFilterChips from '@/components/CategoryFilterChips'
import { getStoreConfig } from '@/lib/store-config'
import { ArrowDownLeft, Sparkles } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  await getStoreConfig()
  return { title: 'الكتالوج', description: 'تشكيلة الأجهزة المنزلية والطاقة الشمسية من TAQA HOME.' }
}

export const dynamic = 'force-dynamic'

const fallbackCollections = [
  { name: 'كل المنتجات', slug: '', imageUrl: null },
  { name: 'الغسيل والعناية', slug: 'washing-care', imageUrl: null },
  { name: 'التبريد والثلاجات', slug: 'cooling', imageUrl: null },
  { name: 'أجهزة المطبخ', slug: 'kitchen-appliances', imageUrl: null },
  { name: 'الطاقة الشمسية', slug: 'solar-energy', imageUrl: null },
]

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const currency = await getCurrency()
  const store = await getStoreConfig()
  const { collection } = await searchParams
  let products: Array<{ id: string; slug: string; name: string; brand: string | null; price: unknown; compareAtPrice: unknown; imageUrl: string | null; featured: boolean }> = []
  let dbCollections: Array<{ name: string; slug: string; imageUrl: string | null }> = []
  let dataLoadFailed = false

  try {
    products = await prisma.product.findMany({ where: { isActive: true, stock: { gt: 0 }, ...(collection ? { collection: { slug: collection } } : {}) }, orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }], select: { id: true, slug: true, name: true, brand: true, price: true, compareAtPrice: true, imageUrl: true, featured: true } })
    dbCollections = await prisma.collection.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  } catch {
    dataLoadFailed = true
  }

  const collectionList = dbCollections.length > 0 ? [{ name: 'كل المنتجات', slug: '', imageUrl: null }, ...dbCollections] : fallbackCollections
  const chipFilters = collectionList.map((item) => ({ label: item.name, href: item.slug ? `/products?collection=${item.slug}` : '/products', imageUrl: item.imageUrl }))

  return (
    <main className="flex min-h-screen flex-col bg-surface font-sans text-foreground" dir="rtl">
      <Navbar storeName={store.name} storeNameLatin={store.nameLatin} />
      <header className="relative overflow-hidden bg-brand px-5 pb-16 pt-36 text-surface sm:px-8 md:pb-20 lg:px-14">
        <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full border border-accent/15" /><div className="absolute bottom-[-12rem] right-[38%] h-80 w-80 rounded-full bg-green/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-[92rem] flex-col justify-between gap-10 md:flex-row md:items-end"><div><div className="mb-6 flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-accent"><Sparkles size={14} /> TAQA HOME / CATALOGUE</div><h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.05em] sm:text-7xl">أشياء تجعل<br /><span className="text-gradient">البيت يعمل.</span></h1></div><div className="max-w-sm"><p className="text-base leading-8 text-surface/60">اختيارات منزلية ذات أداء واضح، وتصميم هادئ، وطاقة تفكر في الغد.</p><a href="#catalog-grid" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-accent hover:text-solar">تصفح الآن <ArrowDownLeft size={17} /></a></div></div>
      </header>
      <div className="flex-grow">
        <CategoryFilterChips filters={chipFilters} activeCollection={collection} />
        <section id="catalog-grid" className="mx-auto max-w-[92rem] px-5 py-12 sm:px-8 md:py-20 lg:px-14">
          <div className="mb-8 flex items-end justify-between"><div><span className="eyebrow text-accent">THE COLLECTION</span><h2 className="mt-3 text-3xl font-black text-brand sm:text-4xl">{collection ? collectionList.find((item) => item.slug === collection)?.name || 'اختيارات القسم' : 'كل الاختيارات'}</h2></div><span className="text-xs font-bold text-foreground/40">{products.length ? `${products.length} منتج` : 'تشكيلة مختارة'}</span></div>
          {dataLoadFailed ? <div className="rounded-[1.5rem] border border-brand/10 bg-white py-24 text-center text-foreground/55">تعذر تحميل الكتالوج حالياً. يرجى تحديث الصفحة والمحاولة لاحقاً.</div> : products.length === 0 ? <div className="rounded-[1.5rem] border border-brand/10 bg-white py-24 text-center text-foreground/50">لا توجد منتجات في هذه المجموعة حالياً</div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6">{products.map((product, index) => <ProductCard key={product.id} product={{ id: product.id, name: product.name, slug: product.slug, price: Number(product.price), compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null, imageUrl: product.imageUrl || '', brand: product.brand || undefined }} currency={currency} priority={index < 4} />)}</div>}
        </section>
      </div>
      <Footer storeName={store.name} storeNameLatin={store.nameLatin} />
    </main>
  )
}
