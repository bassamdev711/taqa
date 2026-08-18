"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, ShoppingBag, Sparkles } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { useCart } from './CartProvider';
import { useToast } from './ToastProvider';
import { getImageSizes } from '@/lib/image-utils';
import { getStoreProductImage } from '@/lib/store-images';

interface ProductCardProps {
  product: { id: string; name: string; slug: string; price: number; compareAtPrice: number | null; imageUrl: string; engName?: string; brand?: string; category?: string };
  currency: string;
  priority?: boolean;
}

export default function ProductCard({ product, currency, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addToCart({ id: product.id, name: product.name, slug: product.slug, price: product.price, imageUrl: product.imageUrl, quantity: 1, maxStock: 99 });
    showToast('success', 'تمت الإضافة إلى السلة بنجاح');
  };

  return (
    <article className="group relative flex h-full min-h-[27rem] flex-col overflow-hidden rounded-[1.5rem] border border-brand/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_25px_65px_-28px_rgba(11,35,43,0.5)]">
      <div className="relative h-[17rem] overflow-hidden bg-surface-alt">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_32%,rgba(239,179,74,0.24),transparent_28%),linear-gradient(135deg,#e3ede8,#f5f1e6)]" />
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-brand/10" />
        <span className="absolute left-5 top-5 z-10 text-[9px] font-black tracking-[0.24em] text-brand/35">TAQA / SELECT</span>
        <FavoriteButton product={product} className="z-20 m-4" />
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={`عرض ${product.name}`} />
        {product.imageUrl ? <Image src={getStoreProductImage(product.imageUrl, product.brand, product.category)} alt={product.name} fill sizes={getImageSizes('card')} priority={priority} loading={priority ? undefined : 'lazy'} className="z-0 object-cover transition-transform duration-700 ease-out group-hover:scale-105" /> : <div className="absolute inset-0 flex items-center justify-center text-brand/20"><Sparkles size={46} strokeWidth={1} /></div>}
        {product.compareAtPrice && <span className="absolute bottom-4 right-4 z-20 rounded-full bg-brand px-3 py-1 text-[10px] font-black text-accent">عرض خاص</span>}
      </div>

      <div className="relative z-20 flex flex-1 flex-col justify-between bg-white p-5 text-right sm:p-6" dir="rtl">
        <div><div className="mb-3 flex items-center justify-between gap-3"><span className="text-[9px] font-black uppercase tracking-[0.18em] text-green">{product.engName || product.brand || 'HOME APPLIANCE'}</span><span className="h-1.5 w-1.5 rounded-full bg-accent" /></div><h3 className="text-xl font-black leading-tight text-brand">{product.name}</h3></div>
        <div className="mt-6 flex items-end justify-between gap-3"><div><p className="text-[9px] font-bold text-foreground/40">السعر الحالي</p><p className="mt-1 text-lg font-black text-brand">{Number(product.price).toLocaleString('ar-SA')} <span className="text-xs text-foreground/45">{currency}</span></p>{product.compareAtPrice && <p className="text-xs text-foreground/35 line-through">{Number(product.compareAtPrice).toLocaleString('ar-SA')} {currency}</p>}</div><button onClick={handleAddToCart} className="relative z-30 flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-surface transition-all hover:bg-accent hover:text-brand" aria-label="أضف للسلة"><ShoppingBag size={17} /></button></div>
        <Link href={`/products/${product.slug}`} className="mt-5 flex items-center justify-between border-t border-brand/10 pt-4 text-xs font-black text-brand transition-colors hover:text-green"><span>مشاهدة المواصفات</span><ArrowUpLeft size={16} /></Link>
      </div>
    </article>
  );
}
