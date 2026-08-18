"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, LayoutGrid } from 'lucide-react';

interface FilterChip { label: string; href: string; imageUrl: string | null }
interface CategoryFilterChipsProps { filters: FilterChip[]; activeCollection?: string | null }

export default function CategoryFilterChips({ filters, activeCollection }: CategoryFilterChipsProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleScroll = () => { const current = window.scrollY; if (current > 120 && current > lastScrollY + 5) setIsVisible(false); else if (current < lastScrollY - 5 || current < 50) setIsVisible(true); setLastScrollY(current); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const handleMouseDown = (e: React.MouseEvent) => { if (!scrollRef.current) return; isDraggingRef.current = true; setIsDragging(true); startXRef.current = e.pageX; scrollStartRef.current = scrollRef.current.scrollLeft; };
  const handleMouseLeave = () => { isDraggingRef.current = false; setIsDragging(false); };
  const handleMouseUp = () => { isDraggingRef.current = false; setIsDragging(false); };
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDraggingRef.current || !scrollRef.current) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollStartRef.current - (e.pageX - startXRef.current); };

  return (
    <div className={`sticky z-40 border-b border-brand/10 bg-surface/88 backdrop-blur-xl transition-all duration-500 ${isVisible ? 'top-14 md:top-[68px]' : '-top-[200px]'}`}>
      <div ref={scrollRef} dir="rtl" className="no-scrollbar w-full cursor-grab overflow-x-auto active:cursor-grabbing" onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
        <div className="flex w-max items-center gap-2 px-5 py-4 md:mx-auto md:gap-3 md:px-10">
          {filters.map((filter, index) => {
            const isActive = filter.href === '/products' ? !activeCollection : activeCollection === new URLSearchParams(filter.href.split('?')[1]).get('collection');
            return <Link key={filter.href} href={filter.href} draggable={false} onClick={(e) => { if (isDragging) e.preventDefault(); }} className={`group flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300 ${isActive ? 'border-brand bg-brand text-surface shadow-lg' : 'border-brand/10 bg-white text-brand hover:border-accent/45'}`}>
              <span className={`text-[9px] font-black tracking-[0.2em] ${isActive ? 'text-accent' : 'text-foreground/35'}`}>{String(index).padStart(2, '0')}</span>
              <div className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg ${isActive ? 'bg-white/10' : 'bg-surface-alt'}`}>{filter.imageUrl ? <Image src={filter.imageUrl} alt={filter.label} fill className="object-cover" sizes="36px" draggable={false} /> : <LayoutGrid size={16} className={isActive ? 'text-accent' : 'text-brand/45'} />}</div>
              <span className="text-xs font-black">{filter.label}</span>{isActive ? <ArrowUpLeft size={14} className="text-accent" /> : null}
            </Link>
          })}
        </div>
      </div>
    </div>
  );
}
