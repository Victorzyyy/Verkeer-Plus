'use client'

import { useT } from '@/lib/langContext'

export default function Network() {
  const t = useT()

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Road asphalt bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/road-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px) brightness(0.32)',
          transform: 'scale(1.05)',
        }}
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.networkEyebrow}</p>

        <h2
          className="font-display font-bold text-[clamp(26px,4vw,38px)] mb-5 leading-[1.2] tracking-[-0.01em] max-w-[600px]"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)' }}
        >
          <span className="text-accent">{t.networkTitleRed}</span>{' '}
          <span className="text-white">{t.networkTitleWhite}</span>
        </h2>

        <p
          className="text-[clamp(15.5px,1.6vw,17px)] font-medium leading-[1.9] max-w-[640px] text-white/95"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.85), 0 0 24px rgba(0,0,0,0.6)' }}
        >
          {t.networkBody.split(t.networkBodyBold)[0]}
          <strong className="text-white font-semibold">{t.networkBodyBold}</strong>
          {t.networkBody.split(t.networkBodyBold)[1]}
        </p>
      </div>
    </section>
  )
}
