'use client'

import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { trustItems } from '@/data/content'

export default function OverOns() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section id="over-ons" className="relative overflow-hidden bg-raised py-20 sm:py-24">
      {/* Ghost word */}
      <div aria-hidden className="ghost-word">
        {lang === 'nl' ? 'VEILIGHEID' : 'السلامة'}
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.trustEyebrow}</p>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <h2 className="font-display font-bold text-[clamp(28px,5vw,52px)] leading-[1] text-white">
              {t.trustTitle}
            </h2>

            <div className="relative mt-8 overflow-hidden border border-concrete" style={{ maxHeight: 430 }}>
              <Image
                src="/images/barriers.jpg"
                alt={lang === 'nl' ? 'Professionele wegafzetting met barriers' : 'حواجز طريق احترافية'}
                width={1376}
                height={768}
                className="w-full object-cover"
                style={{ maxHeight: 430, objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-raised/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 border border-white/15 bg-bg/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur">
                {lang === 'nl' ? 'CROW · veiligheid · uitvoering' : 'CROW · السلامة · التنفيذ'}
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {trustItems.map((item, i) => {
              const it = item[lang]
              return (
                <div key={i} className="border border-concrete bg-bg/55 p-5 transition-colors hover:border-accent/70">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent-soft">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <strong className="mt-4 block text-[clamp(18px,2.2vw,23px)] font-bold tracking-[-0.01em] text-white">
                    {it.title}
                  </strong>
                  <p className="mt-3 text-[15px] leading-[1.75] text-muted">{it.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
