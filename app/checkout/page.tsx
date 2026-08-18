import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CheckoutClient from './CheckoutClient'
import { Metadata } from 'next'
import { getStoreConfig } from '@/lib/store-config'

export async function generateMetadata(): Promise<Metadata> {
  await getStoreConfig()
  return { title: 'إتمام الطلب' }
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-surface text-foreground font-sans flex flex-col" dir="rtl">
      <Navbar />
      <CheckoutClient />
      <Footer />
    </main>
  )
}
