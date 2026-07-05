'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useLang, useT } from '@/lib/langContext'
import { services } from '@/data/content'

export default function Services() {
  const { lang } = useLang()
  const t = useT()
  const [active, setActive] = useState(0)

  const next = useCallback(() => setActive(i => (i + 1) % services.length), [])
  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const svc = services[active][lang]

  return (
    <section id="diensten" className="py-24 bg-bg">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.servicesEyebrow}</p>
        <h2 className="font-display font-bold text-[clamp(22px,4vw,36px)] text-white mb-12">
          {t.servicesTitle}
        </h2>

        {/* Tab nav */}
        <div className="flex gap-1 mb-10 border-b border-concrete overflow-x-auto">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`font-mono text-[12px] uppercase tracking-[0.08em] px-5 py-3 whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
                active === i
                  ? 'text-white border-accent'
                  : 'text-muted border-transparent hover:text-white hover:border-concrete'
              }`}
            >
              {s[lang].title}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="font-display font-bold text-[clamp(20px,3vw,28px)] text-white mb-4">
              {svc.title}
            </h3>
            <p className="text-muted text-[16px] leading-relaxed mb-8">
              {svc.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="/contact" className="btn-primary">
                {t.contactBtn}
              </a>
              <Link href={`/diensten/${services[active].id}`} className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted hover:text-white transition-colors">
                {lang === 'nl' ? 'Meer informatie →' : 'مزيد من المعلومات ←'}
              </Link>
            </div>
          </div>

          <div>
            <ul className="space-y-3">
              {svc.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-[15px] text-muted">
                  <span className="text-accent flex-shrink-0 font-bold">+</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
