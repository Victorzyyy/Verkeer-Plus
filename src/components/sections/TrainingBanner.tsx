'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useT } from '@/lib/langContext'

const LightStreakDivider = dynamic(() => import('@/components/canvas/LightStreakDivider'), { ssr: false })

export default function TrainingBanner() {
  const t = useT()

  return (
    <>
      <LightStreakDivider />

      <section className="relative overflow-hidden bg-raised border-b-4 border-accent">
        {/* Left red bar */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent" />

        <div className="max-w-[1120px] mx-auto px-6 md:px-12 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rtl:flex-row-reverse">
          <div>
            <h3 className="font-display font-bold text-[clamp(20px,4vw,30px)] uppercase tracking-[0.04em] text-white mb-2">
              {t.bannerTitle}
            </h3>
            <p className="text-[15px] text-muted max-w-[480px]">{t.bannerBody}</p>
          </div>
          <Link href="/werken-bij" className="btn-outline shrink-0">
            {t.bannerBtn}
          </Link>
        </div>
      </section>
    </>
  )
}
