'use client'

import Link from 'next/link'
import { useLang, useT } from '@/lib/langContext'
import { services } from '@/data/content'

export default function ServiceContent({ serviceId }: { serviceId: string }) {
  const { lang } = useLang()
  const t = useT()
  const service = services.find(s => s.id === serviceId)!
  const svc = service[lang]
  const otherServices = services.filter(s => s.id !== serviceId)

  return (
    <>
      <section className="pb-12 border-b border-concrete">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 pt-16">
          <Link href="/#diensten" className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim hover:text-white transition-colors">
            {t.svcBackToServices}
          </Link>
          <span className="stripe mt-5" />
          <h1 className="font-display font-bold text-[clamp(28px,5vw,46px)] text-white leading-[1.12] mb-5 max-w-2xl">
            {svc.title}
          </h1>
          <p className="text-[17px] text-muted leading-relaxed max-w-[600px] mb-8">
            {svc.description}
          </p>
          <Link href="/contact" className="btn-primary">
            {t.contactBtn}
          </Link>
        </div>
      </section>

      <section className="py-16 border-b border-concrete">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-bold text-[clamp(18px,2.4vw,22px)] text-white mb-5">
              {lang === 'nl' ? 'Wat is inbegrepen' : 'ما الذي يشمله'}
            </h2>
            <ul className="space-y-3">
              {svc.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-muted">
                  <span className="text-accent-soft flex-shrink-0 font-bold">+</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">{t.svcProcessEyebrow}</p>
            <h2 className="font-display font-bold text-[clamp(18px,2.4vw,22px)] text-white mb-5">
              {t.svcProcessTitle}
            </h2>
            <ol className="space-y-5">
              <li>
                <strong className="block text-white text-[15px] mb-1">{t.svcStep1Title}</strong>
                <p className="text-[14px] text-muted leading-relaxed">{t.svcStep1Body}</p>
              </li>
              <li>
                <strong className="block text-white text-[15px] mb-1">{t.svcStep2Title}</strong>
                <p className="text-[14px] text-muted leading-relaxed">{t.svcStep2Body}</p>
              </li>
              <li>
                <strong className="block text-white text-[15px] mb-1">{t.svcStep3Title}</strong>
                <p className="text-[14px] text-muted leading-relaxed">{t.svcStep3Body}</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12">
          <h2 className="font-display font-bold text-[16px] text-white mb-5">{t.svcOtherTitle}</h2>
          <div className="flex flex-wrap gap-3">
            {otherServices.map(s => (
              <Link
                key={s.id}
                href={`/diensten/${s.id}`}
                className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted border border-concrete rounded px-4 py-2.5 hover:border-accent hover:text-white transition-all duration-200"
              >
                {s[lang].title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
