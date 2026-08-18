'use client'

import { startTransition, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Zap } from 'lucide-react'

interface SplashScreenProps { storeName?: string; storeNameLatin?: string }

export default function SplashScreen({ storeName = 'طاقة هوم', storeNameLatin = 'TAQA HOME' }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const splashKey = `store_splash_seen:${storeNameLatin || storeName}`
    if (sessionStorage.getItem(splashKey)) return
    startTransition(() => setShowSplash(true))
    sessionStorage.setItem(splashKey, 'true')
    const timer = setTimeout(() => setShowSplash(false), 1600)
    return () => clearTimeout(timer)
  }, [storeName, storeNameLatin])

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div key="splash-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-brand" dir="rtl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18),transparent_34%),linear-gradient(140deg,#102a33,#173f48)]" />
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: [0.6, 1, 1.06, 1], opacity: [0, 1, 1, 0.25] }} transition={{ duration: 1.1 }} className="absolute h-56 w-56 rounded-full border border-accent/40" />
          <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: [0.4, 1.4], opacity: [0, 0.45, 0] }} transition={{ duration: 1.2, delay: 0.15 }} className="absolute h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-brand shadow-[0_0_45px_rgba(245,158,11,0.28)]"><Sun size={31} fill="currentColor" /></div>
            <span className="text-2xl font-black tracking-[0.2em] text-surface">{storeNameLatin}</span>
            <div className="my-3 h-px w-12 bg-accent" />
            <span className="text-sm font-bold text-surface/75">{storeName}</span>
            <p className="mt-5 inline-flex items-center gap-2 text-xs text-surface/45"><Zap size={13} className="text-accent" fill="currentColor" /> أجهزة أذكى، طاقة أفضل</p>
          </motion.div>
          <button type="button" onClick={() => setShowSplash(false)} className="absolute bottom-8 z-10 rounded-full border border-surface/25 px-4 py-2 text-xs text-surface/65 transition-colors hover:border-accent hover:text-accent">تخطي</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
