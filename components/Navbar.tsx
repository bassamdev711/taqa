"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, Package, Heart, Sun, ArrowUpLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import SearchModal from "./SearchModal";
import { useCartAnimation } from "./CartAnimationProvider";

export default function Navbar({ storeName = "طاقة هوم", storeNameLatin = "TAQA HOME" }: { storeName?: string; storeNameLatin?: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { cartIconRef, triggerBounce, onBounceComplete } = useCartAnimation();
  const localRef = useRef<HTMLDivElement>(null);
  const [topOffset, setTopOffset] = useState(0);

  useEffect(() => { if (localRef.current) cartIconRef.current = localRef.current; }, [cartIconRef]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    const checkOffset = () => setTopOffset(document.getElementById("announcement-bar")?.offsetHeight || 0);
    checkOffset();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkOffset);
    const timeout = setTimeout(checkOffset, 100);
    return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("resize", checkOffset); clearTimeout(timeout); };
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المنزل", href: "/products" },
    { name: "الطاقة", href: "/#solar" },
    { name: "الرؤية", href: "/#about" },
  ];

  return (
    <>
      <motion.nav initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }} style={{ top: topOffset + 14 }} className={`fixed right-0 left-0 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl rounded-2xl border transition-all duration-300 ${isScrolled ? "border-white/20 bg-brand/92 shadow-2xl backdrop-blur-xl" : "border-white/15 bg-brand/75 backdrop-blur-md"}`}>
        <div className="flex items-center justify-between px-4 py-3 md:px-5 md:py-3.5">
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/40 bg-accent text-brand shadow-[0_0_24px_rgba(239,179,74,0.22)]"><Sun size={17} fill="currentColor" /></span>
            <span className="hidden text-[9px] font-black tracking-[0.28em] text-surface/45 sm:block">{storeNameLatin}</span>
            <span className="text-sm font-black text-surface md:text-base">{storeName}</span>
          </Link>

          <div className="hidden items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 md:flex" dir="rtl">
            {navLinks.map((link) => <Link key={link.name} href={link.href} className="rounded-lg px-4 py-2 text-xs font-bold text-surface/70 transition-all hover:bg-white/10 hover:text-accent">{link.name}</Link>)}
          </div>

          <div className="relative z-50 flex items-center gap-2 text-surface/75 md:gap-3">
            <Link href="/#contact" className="hidden items-center gap-2 rounded-lg border border-accent/35 px-3 py-2 text-[11px] font-bold text-accent transition-colors hover:bg-accent hover:text-brand lg:flex">استشارة <ArrowUpLeft size={14} /></Link>
            <Link href="/track" className="hidden transition-colors hover:text-accent sm:block" aria-label="تتبع الطلب"><Package size={18} /></Link>
            <Link href="/favorites" className="hidden transition-colors hover:text-accent md:block" aria-label="المفضلة"><Heart size={18} /></Link>
            <button className="transition-colors hover:text-accent" aria-label="البحث" onClick={() => setIsSearchOpen(true)}><Search size={18} /></button>
            <div ref={localRef} className="relative hidden md:block"><Link href="/cart" className="flex items-center justify-center transition-colors hover:text-accent" aria-label="سلة المشتريات"><motion.div animate={triggerBounce ? { scale: [1, 1.35, 0.96, 1.1, 1], rotate: [0, -8, 8, -4, 0] } : {}} transition={{ duration: 0.5 }} onAnimationComplete={onBounceComplete}><ShoppingCart size={18} /></motion.div><AnimatePresence>{cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-brand">{cartCount}</motion.span>}</AnimatePresence></Link></div>
            <button className="transition-colors hover:text-accent md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
      </motion.nav>

      <motion.div initial={false} animate={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? "auto" : "none" }} className="fixed inset-0 z-40 flex min-h-screen flex-col items-center justify-center bg-brand/98 backdrop-blur-xl" dir="rtl">
        <div className="absolute right-8 top-24 text-[10px] font-black tracking-[0.35em] text-accent/60">{storeNameLatin}</div>
        <div className="flex flex-col items-center gap-6">
          {[...navLinks, { name: "تواصل معنا", href: "/#contact" }].map((link, index) => <motion.div key={link.name} initial={{ y: 16, opacity: 0 }} animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }} transition={{ delay: index * 0.07, duration: 0.3 }}><Link href={link.href} className="text-2xl font-black text-surface transition-colors hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link></motion.div>)}
        </div>
      </motion.div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
