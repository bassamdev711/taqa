"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingCart, Package, Heart, Sun } from "lucide-react";
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

  useEffect(() => {
    if (localRef.current) cartIconRef.current = localRef.current;
  }, [cartIconRef]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 36);
    const checkOffset = () => setTopOffset(document.getElementById("announcement-bar")?.offsetHeight || 0);
    checkOffset();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkOffset);
    const timeout = setTimeout(checkOffset, 100);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkOffset);
      clearTimeout(timeout);
    };
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الأجهزة المنزلية", href: "/products" },
    { name: "الطاقة الشمسية", href: "/#solar" },
    { name: "لماذا نحن", href: "/#about" },
    { name: "تواصل معنا", href: "/#contact" },
  ];

  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} style={{ top: topOffset }} className={`fixed z-50 w-full transition-all duration-300 ${isScrolled ? "bg-brand/95 py-2 shadow-lg backdrop-blur-xl" : "bg-brand py-3 md:py-4"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="relative z-50 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-brand shadow-lg"><Sun size={18} fill="currentColor" /></span>
          <span className="hidden text-[10px] font-bold tracking-[0.22em] text-surface/60 sm:block">{storeNameLatin}</span>
          <span className="text-base font-black text-surface md:text-lg">{storeName}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex" dir="rtl">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="group relative text-sm font-bold text-surface/75 transition-colors hover:text-accent">
              {link.name}
              <span className="absolute -bottom-2 right-0 h-0.5 w-0 bg-accent transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="relative z-50 flex items-center gap-3 md:gap-4">
          <Link href="/track" className="hidden text-surface/75 transition-colors hover:text-accent sm:block" aria-label="تتبع الطلب"><Package size={19} /></Link>
          <Link href="/favorites" className="hidden text-surface/75 transition-colors hover:text-accent md:block" aria-label="المفضلة"><Heart size={19} /></Link>
          <button className="text-surface/75 transition-colors hover:text-accent" aria-label="البحث" onClick={() => setIsSearchOpen(true)}><Search size={19} /></button>
          <div ref={localRef} className="relative hidden md:block">
            <Link href="/cart" className="flex items-center justify-center text-surface/75 transition-colors hover:text-accent" aria-label="سلة المشتريات">
              <motion.div animate={triggerBounce ? { scale: [1, 1.35, 0.95, 1.1, 1], rotate: [0, -8, 8, -4, 0] } : {}} transition={{ duration: 0.5 }} onAnimationComplete={onBounceComplete}><ShoppingCart size={19} /></motion.div>
              <AnimatePresence>{cartCount > 0 && <motion.span key={cartCount} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-brand">{cartCount}</motion.span>}</AnimatePresence>
            </Link>
          </div>
          <button className="text-surface transition-colors hover:text-accent md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>

      <motion.div initial={false} animate={{ opacity: isMobileMenuOpen ? 1 : 0, pointerEvents: isMobileMenuOpen ? "auto" : "none" }} className="fixed inset-0 z-40 flex min-h-screen flex-col items-center justify-center bg-brand/98 backdrop-blur-xl" dir="rtl">
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link, index) => (
            <motion.div key={link.name} initial={{ y: 16, opacity: 0 }} animate={isMobileMenuOpen ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }} transition={{ delay: index * 0.07, duration: 0.3 }}>
              <Link href={link.href} className="text-xl font-black text-surface transition-colors hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </motion.nav>
  );
}
