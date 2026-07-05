'use client'

import { createContext, useContext, ReactNode } from 'react'
import type { Lang } from '@/types'
import { ui } from '@/data/content'

interface LangContextValue {
  lang: Lang
  dir: 'ltr' | 'rtl'
}

const LangContext = createContext<LangContextValue>({
  lang: 'nl',
  dir: 'ltr',
})

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <LangContext.Provider value={{ lang, dir }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

export function useT() {
  const { lang } = useLang()
  return ui[lang]
}
