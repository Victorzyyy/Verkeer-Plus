'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { localizedHref } from '@/lib/localizedHref'

const LightStreakDivider = dynamic(() => import('@/components/canvas/LightStreakDivider'), { ssr: false })

export default function Hero() {
  const { lang } = useLang()
  const t = useT()

  return (
    <>
      <section className="relative min-h-[68vh] flex flex-col overflow-hidden bg-bg">
        {/* No blur — let the photo read as a photo. Brightness + gradients do the readability work. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/road-bg.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            style={{ filter: 'brightness(0.42)' }}
            sizes="100vw"
          />
          {/* Top vignette (nav area) + bottom blend into next section */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/65 via-transparent to-bg" />
          {/* Soft left wash so centered text has extra contrast regardless of photo content */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-transparent" />
        </div>

        {/* Two signs — enough traffic context, not visual noise */}
        <div aria-hidden className="absolute left-[clamp(16px,calc(50%-380px-5vw),200px)] top-[15%] z-[2] opacity-65 animate-[sway_5s_ease-in-out_infinite]">
          <svg width="66" height="66" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#1a6fc4" strokeWidth="8"/>
            <path d="M30 50 L70 50 M55 35 L70 50 L55 65" stroke="#1a6fc4" strokeWidth="8" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <div aria-hidden className="hidden sm:block absolute right-[clamp(16px,calc(50%-380px-5vw),200px)] top-[20%] z-[2] opacity-60 animate-[sway_6s_ease-in-out_infinite_reverse]">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill="#c81b1d" stroke="#f5f2ec" strokeWidth="4"/>
            <text x="50" y="62" textAnchor="middle" fill="#f5f2ec" fontSize="26" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">STOP</text>
          </svg>
        </div>

        {/* Hero content */}
        <div className="relative z-[3] flex-1 flex items-center justify-center text-center px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-[clamp(27px,5.6vw,43px)] text-white leading-[1.15] mb-6"
                style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9)' }}>
              {t.heroTitle}{' '}
              <span className="text-accent">{t.heroTitleHighlight}</span>{' '}
              {t.heroTitleEnd}
            </h1>
            <p className="text-[17px] text-muted leading-relaxed max-w-xl mx-auto mb-10"
               style={{ textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>
              {t.heroSub}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <a href={localizedHref('/contact', lang)} className="btn-primary">
                {t.contactBtn}
              </a>
              <a href="#over-ons" className="font-mono text-[13px] uppercase tracking-[0.08em] text-white/80 hover:text-white transition-colors">
                {t.heroBtn} →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Light streak divider */}
      <LightStreakDivider />
    </>
  )
}
