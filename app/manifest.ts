import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'طاقة هوم | TAQA HOME',
    short_name: 'طاقة هوم',
    description: 'أجهزة منزلية أذكى، وطاقة شمسية لبيت أكثر كفاءة.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f1eee7',
    theme_color: '#0b232b',
    lang: 'ar',
    dir: 'rtl',
    icons: [{ src: '/taqa-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  }
}
