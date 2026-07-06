'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { localizedHref } from '@/lib/localizedHref'
import { services, siteConfig } from '@/data/content'

const LightStreakDivider = dynamic(() => import('@/components/canvas/LightStreakDivider'), { ssr: false })

export default function Hero() {
  const { lang } = useLang()
  const t = useT()
  const serviceLabels = services.map(service => service[lang].title)

  return (
    <>
      <section className="vp-hero relative overflow-hidden bg-bg">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/road-bg.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            style={{ filter: 'brightness(0.55) saturate(0.9)' }}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,25,27,0.22),transparent_28%),linear-gradient(90deg,rgba(13,12,10,0.98)_0%,rgba(13,12,10,0.9)_48%,rgba(13,12,10,0.42)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="relative z-[3] mx-auto grid min-h-[calc(100vh-62px)] max-w-[1180px] items-center gap-8 px-5 py-10 md:grid-cols-[minmax(0,1fr)_390px] md:px-8 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-bg/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(212,25,27,0.9)]" />
              {lang === 'nl' ? 'Dispatch actief · landelijke inzet' : 'التنسيق نشط · تغطية وطنية'}
            </div>

            <h1 className="font-display text-[clamp(34px,7vw,78px)] font-black leading-[0.94] text-white">
              {t.heroTitle}{' '}
              <span className="text-accent">{t.heroTitleHighlight}</span>{' '}
              {t.heroTitleEnd}
            </h1>
            <p className="mt-6 max-w-2xl text-[clamp(16px,1.8vw,19px)] leading-[1.75] text-white/82">
              {t.heroSub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={localizedHref('/contact', lang)} className="btn-primary">
                {t.contactBtn}
              </a>
              <a href="#diensten" className="btn-outline">
                {t.servicesTitle}
              </a>
              <a href="#over-ons" className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-white">
                {t.heroBtn} →
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl gap-2 sm:grid-cols-3">
              {serviceLabels.map((label, index) => (
                <a key={label} href="#diensten" className="vp-route-chip">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <aside className="vp-dispatch-panel">
            <div className="flex items-center justify-between border-b border-concrete pb-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft">
                  {lang === 'nl' ? 'Live planning' : 'التخطيط المباشر'}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">
                  {lang === 'nl' ? 'Team nodig?' : 'تحتاج فريقاً؟'}
                </h2>
              </div>
              <span className="vp-signal" aria-hidden="true"><i /><i /><i /></span>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                [lang === 'nl' ? 'Responstijd' : 'زمن الاستجابة', t.heroTitleHighlight],
                [lang === 'nl' ? 'Bereikbaar' : 'متاحون', '24/7'],
                [lang === 'nl' ? 'Telefoon' : 'الهاتف', siteConfig.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border border-concrete bg-bg/70 px-4 py-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim">{label}</span>
                  <strong className="text-right text-sm font-bold text-white">{value}</strong>
                </div>
              ))}
            </div>

            <a href={`tel:${siteConfig.phoneTel}`} className="mt-5 flex items-center justify-center bg-white px-5 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-bg transition-colors hover:bg-accent hover:text-white">
              {lang === 'nl' ? 'Bel direct' : 'اتصل الآن'}
            </a>
          </aside>
        </div>
      </section>

      {/* Light streak divider */}
      <LightStreakDivider />
    </>
  )
}
