'use client'

import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { trustItems } from '@/data/content'

export default function OverOns() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section id="over-ons" className="relative py-24 overflow-hidden bg-raised">
      {/* Ghost word */}
      <div aria-hidden className="ghost-word">
        {lang === 'nl' ? 'VEILIGHEID' : 'السلامة'}
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 md:px-12">
        <span className="stripe" />
        <p className="eyebrow">{t.trustEyebrow}</p>
        <h2 className="font-display font-bold text-[clamp(22px,4vw,36px)] text-white mb-12 max-w-xl">
          {t.trustTitle}
        </h2>

        {/* Full-width barriers image */}
        <div className="relative w-full overflow-hidden border border-concrete mb-12" style={{ maxHeight: 380 }}>
          <Image
            src="/images/barriers.jpg"
            alt={lang === 'nl' ? 'Professionele wegafzetting met barriers' : 'حواجز طريق احترافية'}
            width={1376}
            height={768}
            className="w-full object-cover"
            style={{ maxHeight: 380, objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-raised/40 to-transparent" />
        </div>

        {/* Trust items */}
        <div className="max-w-2xl">
          {trustItems.map((item, i) => {
            const it = item[lang]
            return (
              <div
                key={i}
                className={`py-7 transition-transform duration-[550ms] ease-out cursor-default
                  hover:scale-[1.03] hover:origin-left
                  ${i < trustItems.length - 1 ? 'border-b border-concrete' : ''}`}
              >
                <strong className="block text-white font-bold text-[clamp(18px,2.2vw,22px)] tracking-[-0.01em] mb-2">
                  {it.title}
                </strong>
                <p className="text-muted text-[16px] leading-[1.7]">{it.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
