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
      <section className="relative min-h-[72vh] flex flex-col overflow-hidden bg-bg">
        {/* Background road image — heavy blur + strong dark overlay for a calm, atmospheric backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/road-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-55 scale-110"
            style={{ filter: 'blur(18px) brightness(0.55)' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/30 to-bg" />
        </div>

        {/* Traffic signs - decorative SVG. Scattered asymmetrically so they don't crowd the hero copy. */}
        {/* Top-left corner — mandatory direction (blue), pulled tight to the edge */}
        <div aria-hidden className="absolute left-[clamp(12px,calc(50%-360px-12vw),240px)] top-[12%] z-[2] opacity-80 animate-[sway_5s_ease-in-out_infinite]">
          <svg width="72" height="72" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#1a6fc4" strokeWidth="8"/>
            <path d="M30 50 L70 50 M55 35 L70 50 L55 65" stroke="#1a6fc4" strokeWidth="8" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        {/* Upper-right — warning triangle, slightly below the arrow (offset for asymmetry, but clear of h1) */}
        <div aria-hidden className="absolute right-[clamp(10px,calc(50%-360px-8vw),200px)] top-[8%] sm:top-[22%] z-[2] opacity-80 animate-[sway_5s_ease-in-out_infinite_reverse]">
          <svg width="72" height="72" viewBox="0 0 100 100">
            <polygon points="50,4 96,96 4,96" fill="none" stroke="#d4191b" strokeWidth="8"/>
            <text x="50" y="72" textAnchor="middle" fill="#d4191b" fontSize="44" fontWeight="bold">!</text>
          </svg>
        </div>
        {/* Mid-right — STOP octagon, tucked further out toward the corner */}
        <div aria-hidden className="hidden sm:block absolute right-[clamp(20px,calc(50%-360px-14vw),280px)] top-[42%] z-[2] opacity-75 animate-[sway_6s_ease-in-out_infinite]">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <polygon
              points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30"
              fill="#c81b1d"
              stroke="#f5f2ec"
              strokeWidth="4"
            />
            <text x="50" y="62" textAnchor="middle" fill="#f5f2ec" fontSize="26" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">STOP</text>
          </svg>
        </div>
        {/* Lower-left — speed limit 80, lower than STOP but clear of the left cone */}
        <div aria-hidden className="hidden sm:block absolute left-[clamp(20px,calc(50%-360px-8vw),240px)] top-[60%] z-[2] opacity-75 animate-[sway_6s_ease-in-out_infinite_reverse]">
          <svg width="60" height="60" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="#f5f2ec" stroke="#d4191b" strokeWidth="10"/>
            <text x="50" y="64" textAnchor="middle" fill="#1a1a1a" fontSize="42" fontWeight="bold" fontFamily="Arial, sans-serif">80</text>
          </svg>
        </div>

        {/* Cones */}
        {[
          'left-[clamp(10px,calc(50%-360px-4vw),320px)] bottom-[18%]',
          'right-[clamp(10px,calc(50%-360px-4vw),320px)] bottom-[18%]',
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos} z-[2] opacity-70`}>
            <svg width="48" height="68" viewBox="0 0 48 68">
              <polygon points="24,2 44,66 4,66" fill="#d4191b"/>
              <rect x="4" y="48" width="40" height="7" fill="#fff" opacity="0.9"/>
              <rect x="4" y="58" width="40" height="4" fill="#fff" opacity="0.7"/>
              <rect x="0" y="63" width="48" height="5" fill="#1a1a1a"/>
            </svg>
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-[3] flex-1 flex items-center justify-center text-center px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-[clamp(27px,5.6vw,43px)] text-white leading-[1.15] mb-6"
                style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              {t.heroTitle}{' '}
              <span className="text-accent">{t.heroTitleHighlight}</span>{' '}
              {t.heroTitleEnd}
            </h1>
            <p className="text-[17px] text-muted leading-relaxed max-w-xl mx-auto mb-10"
               style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
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
