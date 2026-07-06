'use client'

import Link from 'next/link'
import { useLang, useT } from '@/lib/langContext'
import { localizedHref } from '@/lib/localizedHref'

export default function BecomeSteward() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-[720px] mx-auto px-6 md:px-12 text-center">
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent-soft">
          {lang === 'nl' ? '// Voor sollicitanten' : '// للمتقدمين'}
        </span>
        <h2 className="mt-4 font-display font-bold text-[clamp(22px,4vw,32px)] leading-[1.2] text-white">
          {t.bannerTitle}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          {t.bannerBody}
        </p>
        <Link
          href={localizedHref('/werken-bij', lang)}
          className="mt-8 inline-block font-mono text-[13px] uppercase tracking-[0.1em] text-white border-b border-accent pb-1 hover:text-accent-soft transition-colors"
        >
          {t.bannerBtn} →
        </Link>
      </div>
    </section>
  )
}
