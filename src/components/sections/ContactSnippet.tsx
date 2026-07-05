'use client'

import Link from 'next/link'
import { useT } from '@/lib/langContext'
import { localizedHref } from '@/lib/localizedHref'
import { contactInfo } from '@/data/content'
import { useLang } from '@/lib/langContext'

export default function ContactSnippet() {
  const t = useT()
  const { lang } = useLang()

  return (
    <section id="contact" className="relative py-24 bg-bg overflow-hidden">
      <div aria-hidden className="ghost-word">{lang === 'nl' ? '24/7' : '٢٤/٧'}</div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.contactEyebrow}</p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display font-bold text-[clamp(24px,4vw,38px)] text-white mb-4">
              {t.contactTitle}
            </h2>
            <p className="text-muted text-[16px] leading-relaxed mb-8">
              {t.contactBody}
            </p>
            <Link href={localizedHref('/contact', lang)} className="btn-primary">
              {t.contactBtn}
            </Link>
          </div>

          <ul className="space-y-0">
            {contactInfo.map(row => {
              const r = row[lang]
              const inner = (
                <>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim">{r.label}</span>
                  <span className="text-[15px] text-accent-soft">{r.value}</span>
                </>
              )
              return (
                <li key={row.key} className="flex justify-between items-baseline gap-4 py-4 border-b border-concrete last:border-none">
                  {row.href
                    ? <a href={row.href} className="contents hover:opacity-80 transition-opacity">{inner}</a>
                    : inner
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
