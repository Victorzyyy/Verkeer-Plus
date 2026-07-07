'use client'

import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { trustItems } from '@/data/content'

export default function OverOns() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section id="over-ons" className="vp-trust-section relative overflow-hidden py-20 sm:py-24">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,25,27,0.20),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_28%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />
      <div aria-hidden className="vp-trust-road" />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12">
        <div className="mb-10 grid gap-5 md:grid-cols-2 md:items-start">
          <div className="min-w-0">
            <span className="stripe" />
            <p className="eyebrow">{t.trustEyebrow}</p>
            <h2 className="font-display font-bold text-[clamp(28px,5vw,54px)] leading-[0.98] text-white">
              {t.trustTitle}
            </h2>
          </div>
          <p className="max-w-[440px] border-l-2 border-accent/70 bg-bg/45 py-4 pl-5 text-[15px] leading-relaxed text-white/78 md:justify-self-start">
            {lang === 'nl'
              ? 'Een goede verkeersploeg zie je niet alleen aan hesjes op straat. Je ziet het aan voorbereiding, bereikbaarheid en mensen die op locatie weten wat er moet gebeuren.'
              : 'فريق المرور الجيد لا يظهر فقط من السترات في الشارع. يظهر من التحضير، وسرعة التواصل، وأشخاص يعرفون ما يجب فعله في الموقع.'}
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
          <div className="vp-trust-photo relative min-h-[360px] overflow-hidden border border-white/12 bg-bg">
            <Image
              src="/images/verkeerplus-car.jpg.webp"
              alt={lang === 'nl' ? 'VerkeerPlus verkeersregelaar met dienstvoertuig' : 'منظم مرور فيركيرسبلوس مع مركبة الخدمة'}
              width={1376}
              height={768}
              className="h-full w-full object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_26%,rgba(13,12,10,0.88)_100%)]" />
          </div>

          <div className="vp-trust-grid grid gap-3">
            {trustItems.map((item) => {
              const it = item[lang]
              return (
                <article key={it.title} className="vp-trust-card group">
                  <span className="vp-trust-dot" aria-hidden />
                  <div>
                    <strong className="block text-[clamp(18px,2.2vw,24px)] font-bold tracking-[-0.01em] text-white">
                      {it.title}
                    </strong>
                    <p className="mt-3 text-[15px] leading-[1.75] text-white/78">{it.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
