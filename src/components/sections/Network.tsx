'use client'

import { useT } from '@/lib/langContext'

export default function Network() {
  const t = useT()

  return (
    <section className="relative overflow-hidden bg-bg py-20 sm:py-24">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />
      <div aria-hidden className="absolute left-[-14rem] top-8 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="absolute right-[-10rem] bottom-10 h-72 w-72 rounded-full bg-accent/8 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-6 md:px-12">
        <div className="max-w-[820px]">
          <span className="stripe" />
          <p className="eyebrow">{t.networkEyebrow}</p>

          <h2 className="mb-5 max-w-[680px] font-display text-[clamp(30px,5vw,58px)] font-bold leading-[0.98] tracking-[-0.01em]">
            <span className="text-accent">{t.networkTitleRed}</span>{' '}
            <span className="text-white">{t.networkTitleWhite}</span>
          </h2>

          <div className="network-story max-w-[720px]">
            <p className="text-[clamp(16px,1.7vw,18px)] font-semibold leading-[1.9] text-white">
              {t.networkBody.split(t.networkBodyBold)[0]}
              <strong className="network-story-highlight">{t.networkBodyBold}</strong>
              {t.networkBody.split(t.networkBodyBold)[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
