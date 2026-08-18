import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FavoritesClient from "./FavoritesClient";
import { getStoreConfig } from '@/lib/store-config'

export async function generateMetadata() {
  await getStoreConfig()
  return {
    title: 'المفضلة',
    description: 'المنتجات التي اخترتها لبيتك من TAQA HOME.',
  }
}

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-surface-alt font-sans flex flex-col" dir="rtl">
      <Navbar />
      <div className="flex-grow">
        <FavoritesClient />
      </div>
      <Footer />
    </main>
  );
}
