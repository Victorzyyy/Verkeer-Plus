'use client'

import { useLang, useT } from '@/lib/langContext'
import { faqItems } from '@/data/content'

export default function FAQ() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section id="faq" className="py-24 bg-raised">
      <div className="max-w-[820px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.faqEyebrow}</p>
        <h2 className="font-display font-bold text-[clamp(22px,4vw,36px)] text-white mb-10">
          {t.faqTitle}
        </h2>

        <div className="divide-y divide-concrete border-t border-b border-concrete">
          {faqItems.map((item, i) => {
            const it = item[lang]
            return (
              <details key={i} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-medium text-[16px] marker:content-none">
                  {it.q}
                  <span className="shrink-0 text-accent-soft text-[18px] leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] text-muted leading-relaxed">{it.a}</p>
              </details>
            )
          })}
        </div>
      </div>
    </section>
  )
}
