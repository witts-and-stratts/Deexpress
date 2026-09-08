'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import enAbout from '@/locales/en/about.json'
import enCommon from '@/locales/en/common.json'
import enCoverage from '@/locales/en/coverage.json'
import enContact from '@/locales/en/contact.json'
import enDestinations from '@/locales/en/destinations.json'
import enFooter from '@/locales/en/footer.json'
import enForm from '@/locales/en/form.json'
import enHome from '@/locales/en/home.json'
import enNav from '@/locales/en/nav.json'
import enQuote from '@/locales/en/quote.json'
import enRegions from '@/locales/en/regions.json'
import enServices from '@/locales/en/services.json'
import enTrack from '@/locales/en/track.json'
import deAbout from '@/locales/de/about.json'
import deCommon from '@/locales/de/common.json'
import deCoverage from '@/locales/de/coverage.json'
import deContact from '@/locales/de/contact.json'
import deDestinations from '@/locales/de/destinations.json'
import deFooter from '@/locales/de/footer.json'
import deForm from '@/locales/de/form.json'
import deHome from '@/locales/de/home.json'
import deNav from '@/locales/de/nav.json'
import deQuote from '@/locales/de/quote.json'
import deRegions from '@/locales/de/regions.json'
import deServices from '@/locales/de/services.json'
import deTrack from '@/locales/de/track.json'

const en = {
  about: enAbout,
  common: enCommon,
  coverage: enCoverage,
  contact: enContact,
  destinations: enDestinations,
  footer: enFooter,
  form: enForm,
  home: enHome,
  nav: enNav,
  quote: enQuote,
  regions: enRegions,
  services: enServices,
  track: enTrack,
}

export type Dict = typeof en
export type Lang = 'en' | 'de'

const de: Dict = {
  about: deAbout,
  common: deCommon,
  coverage: deCoverage,
  contact: deContact,
  destinations: deDestinations,
  footer: deFooter,
  form: deForm,
  home: deHome,
  nav: deNav,
  quote: deQuote,
  regions: deRegions,
  services: deServices,
  track: deTrack,
}

const DICTS: Record<Lang, Dict> = { en, de }

type LangContextValue = { lang: Lang; t: Dict; setLang: (lang: Lang) => void }

const LangContext = createContext<LangContextValue>({ lang: 'en', t: en, setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('lang')
    if (requested === 'de' || requested === 'en') {
      const id = requestAnimationFrame(() => setLangState(requested))
      return () => cancelAnimationFrame(id)
    }
    const saved = window.localStorage.getItem('dex-lang')
    if (saved === 'de' || saved === 'en') {
      const id = requestAnimationFrame(() => setLangState(saved))
      return () => cancelAnimationFrame(id)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang)
    window.localStorage.setItem('dex-lang', nextLang)
  }

  return <LangContext.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
