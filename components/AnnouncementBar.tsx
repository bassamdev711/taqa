import Link from 'next/link'
import prisma from '@/lib/prisma'

export default async function AnnouncementBar() {
  let bar: { message: string; linkText: string | null; linkUrl: string | null; bgColor: string; textColor: string; isActive: boolean } | null = null
  try {
    bar = await prisma.announcementBar.findUnique({ where: { id: 'singleton' } })
  } catch {
    bar = null
  }

  if (bar && !bar.isActive) return null
  const displayBar = bar || {
    message: 'شحن وتركيب موثوق للأجهزة المنزلية — استشرنا لحل الطاقة الشمسية المناسب لمنزلك',
    linkText: 'تواصل معنا',
    linkUrl: '/#contact',
    bgColor: '#f59e0b',
    textColor: '#102a33',
    isActive: true,
  }

  return (
    <div id="announcement-bar" style={{ backgroundColor: displayBar.bgColor, color: displayBar.textColor }} className="sticky left-0 top-0 z-[60] w-full overflow-hidden py-2.5">
      <div className="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused]">
        <div className="flex min-w-full items-center justify-center gap-3 px-4 text-sm font-bold">
          <span>{displayBar.message}</span>
          {displayBar.linkText && displayBar.linkUrl && <Link href={displayBar.linkUrl} className="text-xs font-black underline opacity-80 transition-opacity hover:opacity-100">{displayBar.linkText} ←</Link>}
        </div>
      </div>
    </div>
  )
}
