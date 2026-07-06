'use client'

import { useLang, useT } from '@/lib/langContext'

export default function Network() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
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

      <div className="relative z-10 mx-auto grid max-w-[1120px] gap-8 px-6 md:grid-cols-[1fr_340px] md:px-12">
        <div>
        <span className="stripe" />
        <p className="eyebrow">{t.networkEyebrow}</p>

        <h2
          className="mb-5 max-w-[680px] font-display text-[clamp(30px,5vw,58px)] font-bold leading-[0.98] tracking-[-0.01em]"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)' }}
        >
          <span className="text-accent">{t.networkTitleRed}</span>{' '}
          <span className="text-white">{t.networkTitleWhite}</span>
        </h2>

        <div className="network-story max-w-[720px]">
          <p className="text-[clamp(16px,1.7vw,18px)] font-semibold leading-[1.9] text-white">
            {t.networkBody.split(t.networkBodyBold)[0]}
            <strong className="network-story-highlight">{t.networkBodyBold}</strong>
            {t.networkBody.split(t.networkBodyBold)[1]}
          </p>
        </div>
        </div>

        <div className="border border-white/15 bg-bg/80 p-5 backdrop-blur">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft">
            {lang === 'nl' ? 'Operationele basis' : 'قاعدة تشغيلية'}
          </p>
          <div className="mt-5 grid gap-3">
            {(lang === 'nl'
              ? ['Partners door heel Nederland', 'Pijler Groep netwerk', 'Snel schaalbare ploegen']
              : ['شركاء في جميع أنحاء هولندا', 'شبكة Pijler Groep', 'فرق قابلة للتوسع بسرعة']
            ).map(item => (
              <div key={item} className="border border-concrete bg-raised/70 px-4 py-3 text-sm font-semibold text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
