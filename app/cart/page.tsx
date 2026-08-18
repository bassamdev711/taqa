import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartClient from './CartClient'
import { Metadata } from 'next'
import { getStoreConfig } from '@/lib/store-config'

export async function generateMetadata(): Promise<Metadata> {
  await getStoreConfig()
  return { title: 'السلة' }
}

export default function CartPage() {
  return (
    <main className="min-h-screen bg-surface text-foreground font-sans flex flex-col" dir="rtl">
      <Navbar />
      <CartClient />
      <Footer />
    </main>
  )
}
