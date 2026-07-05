'use client'

import { useT } from '@/lib/langContext'
import WerkenBijForm from '@/components/ui/WerkenBijForm'

export default function WerkenBijContent() {
  const t = useT()

  return (
    <>
      {/* Page hero */}
      <section className="py-18 pb-12 border-b border-concrete">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 pt-16">
          <span className="stripe" />
          <p className="eyebrow">{t.wbEyebrow}</p>
          <h1 className="font-display font-bold text-[clamp(28px,5vw,46px)] text-white leading-[1.12] mb-5 max-w-xl">
            {t.wbTitle}
          </h1>
          <p className="text-[17px] text-muted leading-relaxed max-w-[560px]">
            {t.wbIntro}
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-14 pb-24">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12">
          <WerkenBijForm />
        </div>
      </section>
    </>
  )
}
