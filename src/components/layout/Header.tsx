'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/langContext'
import { localizedHref } from '@/lib/localizedHref'
import { navLinks } from '@/data/content'
import { useState, useEffect } from 'react'

export default function Header() {
  const { lang } = useLang()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Compute the equivalent URL in the other language for the language switcher.
  const altHref = lang === 'ar'
    ? (pathname.replace(/^\/ar/, '') || '/')
    : `/ar${pathname === '/' ? '' : pathname}`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-concrete'
          : 'bg-bg/90 backdrop-blur-sm border-b border-concrete/50'
      }`}
    >
      {/* Red accent bar */}
      <div className="h-0.5 bg-accent w-full" />

      <div className="max-w-[1120px] mx-auto px-6 md:px-12 flex items-center justify-between h-[60px]">
        {/* Logo */}
        <Link
          href={localizedHref('/', lang)}
          className="font-display font-bold text-[18px] tracking-[0.04em] text-text hover:opacity-80 transition-opacity"
        >
          VERKEER<span className="text-accent">S</span>PLUS
        </Link>

        {/* Desktop nav */}
        <nav aria-label={lang === 'nl' ? 'Hoofdmenu' : 'القائمة الرئيسية'} className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={localizedHref(link.href, lang)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted hover:text-text transition-colors duration-200"
            >
              {link[lang]}
            </Link>
          ))}

          {/* Language switch */}
          <Link
            href={altHref}
            className="font-mono text-[11px] tracking-[0.08em] font-bold text-muted border border-concrete rounded px-2.5 py-1.5 hover:border-accent hover:text-white transition-all duration-200"
            title={lang === 'nl' ? 'عربي' : 'Nederlands'}
          >
            {lang === 'nl' ? 'AR' : 'NL'}
          </Link>
        </nav>

        {/* Mobile: lang switch + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={altHref}
            className="font-mono text-[10px] tracking-[0.08em] font-bold text-muted border border-concrete rounded px-2 py-1 hover:border-accent hover:text-white transition-all"
          >
            {lang === 'nl' ? 'AR' : 'NL'}
          </Link>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="text-muted hover:text-white transition-colors p-1"
            aria-label={lang === 'nl' ? 'Menu' : 'القائمة'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-raised border-t border-concrete">
          <nav aria-label={lang === 'nl' ? 'Mobiel menu' : 'قائمة الجوال'} className="max-w-[1120px] mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={localizedHref(link.href, lang)}
                onClick={() => setMenuOpen(false)}
                className="font-mono text-[12px] uppercase tracking-[0.1em] text-muted hover:text-white transition-colors py-1"
              >
                {link[lang]}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
