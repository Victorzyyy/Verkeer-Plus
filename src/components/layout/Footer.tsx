'use client'

import Link from 'next/link'
import { useLang, useT } from '@/lib/langContext'
import { siteConfig } from '@/data/content'

export default function Footer() {
  const { lang } = useLang()
  const t = useT()

  return (
    <footer className="border-t border-concrete">
      <div className="max-w-[1120px] mx-auto px-6 md:px-12 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-dim">{t.footerCopy}</p>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <Link href="/" className="font-mono text-[11px] text-dim hover:text-accent transition-colors">
            {lang === 'nl' ? 'Home' : 'الرئيسية'}
          </Link>
          <Link href="/werken-bij" className="font-mono text-[11px] text-dim hover:text-accent transition-colors">
            {lang === 'nl' ? 'Werken bij' : 'العمل معنا'}
          </Link>
          <Link href="/contact" className="font-mono text-[11px] text-dim hover:text-accent transition-colors">
            {lang === 'nl' ? 'Contact' : 'تواصل معنا'}
          </Link>
          <Link href="#" className="font-mono text-[11px] text-dim hover:text-accent transition-colors">
            {t.privacy}
          </Link>
          <Link href="#" className="font-mono text-[11px] text-dim hover:text-accent transition-colors">
            {t.terms}
          </Link>
          <span className="font-mono text-[11px] text-dim">
            {siteConfig.group}
          </span>
        </div>
      </div>
    </footer>
  )
}
