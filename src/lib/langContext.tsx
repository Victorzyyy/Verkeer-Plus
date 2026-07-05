'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from '@/types'

interface LangContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
  toggle: () => void
}

const LangContext = createContext<LangContextValue>({
  lang: 'nl',
  dir: 'ltr',
  toggle: () => {},
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('nl')

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
  }, [lang, dir])

  const toggle = () => setLang(prev => (prev === 'nl' ? 'ar' : 'nl'))

  return (
    <LangContext.Provider value={{ lang, dir, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export function useT() {
  const { lang } = useLang()
  const { ui } = require('@/data/content')
  return ui[lang] as typeof ui['nl']
}
