'use client'

import { useT } from '@/lib/langContext'
import ContactForm from '@/components/ui/ContactForm'

export default function ContactContent() {
  const t = useT()

  return (
    <>
      <section className="py-18 pb-12 border-b border-concrete">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12 pt-16">
          <span className="stripe" />
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1 className="font-display font-bold text-[clamp(28px,5vw,46px)] text-white leading-[1.12] mb-5">
            {t.contactTitle}
          </h1>
          <p className="text-[17px] text-muted leading-relaxed max-w-[520px]">
            {t.contactBody}
          </p>
        </div>
      </section>

      <section className="py-14 pb-24">
        <div className="max-w-[1120px] mx-auto px-6 md:px-12">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
