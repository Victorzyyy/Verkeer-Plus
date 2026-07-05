'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useT } from '@/lib/langContext'

const HighwayCanvas = dynamic(() => import('@/components/canvas/HighwayCanvas'), { ssr: false })
const LightStreakDivider = dynamic(() => import('@/components/canvas/LightStreakDivider'), { ssr: false })

export default function Hero() {
  const t = useT()

  return (
    <>
      <section className="relative min-h-[88vh] flex flex-col overflow-hidden bg-bg">
        {/* Background road image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/road-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-25"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
        </div>

        {/* Animated highway canvas */}
        <div className="absolute inset-0 z-[1]">
          <HighwayCanvas />
        </div>

        {/* Traffic signs - decorative SVG */}
        <div className="absolute left-[clamp(10px,calc(50%-360px-10vw),220px)] top-[20%] z-[2] opacity-80 animate-[sway_5s_ease-in-out_infinite]">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#1a6fc4" strokeWidth="8"/>
            <path d="M30 50 L70 50 M55 35 L70 50 L55 65" stroke="#1a6fc4" strokeWidth="8" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
        <div className="absolute right-[clamp(10px,calc(50%-360px-10vw),220px)] top-[20%] z-[2] opacity-80 animate-[sway_5s_ease-in-out_infinite_reverse]">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <polygon points="50,4 96,96 4,96" fill="none" stroke="#d4191b" strokeWidth="8"/>
            <text x="50" y="72" textAnchor="middle" fill="#d4191b" fontSize="44" fontWeight="bold">!</text>
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
              <a href="/contact" className="btn-primary">
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
