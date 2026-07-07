'use client'

import Image from 'next/image'
import { useLang, useT } from '@/lib/langContext'
import { trustItems } from '@/data/content'

export default function OverOns() {
  const { lang } = useLang()
  const t = useT()

  return (
    <section id="over-ons" className="relative py-24 overflow-hidden bg-bg">
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

        {/* Team photo — full width, bleeds edge-to-edge on mobile */}
        <div className="relative -mx-6 md:-mx-12 mb-14 overflow-hidden" style={{ maxHeight: 420 }}>
          <Image
            src="/images/verkeerplus-car.jpg"
            alt={lang === 'nl' ? 'VerkeerPlus verkeersregelaar met dienstvoertuig' : 'منظم مرور فيركيرسبلوس مع مركبة الخدمة'}
            width={1080}
            height={1080}
            className="w-full object-cover object-top"
            style={{ maxHeight: 420 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
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
