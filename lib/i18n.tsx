import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translations = Record<string, any>

interface I18nContextValue {
  locale: string
  setLocale: (locale: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en')
  const [translations, setTranslations] = useState<Translations>({})

  // Load translations for a locale
  const loadTranslations = useCallback(async (loc: string) => {
    try {
      const res = await fetch(`/locales/${loc}/common.json`)
      const data = await res.json()
      setTranslations(data)
    } catch {
      console.warn(`Failed to load translations for locale: ${loc}`)
    }
  }, [])

  // Read cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )locale=([^;]*)/)
    const saved = match ? match[1] : 'en'
    setLocaleState(saved)
    loadTranslations(saved)
  }, [loadTranslations])

  const setLocale = useCallback(
    (loc: string) => {
      document.cookie = `locale=${loc};path=/;max-age=31536000`
      setLocaleState(loc)
      loadTranslations(loc)
    },
    [loadTranslations]
  )

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let value = getNestedValue(translations, key)
      if (typeof value !== 'string') {
        return key
      }
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          value = (value as string).replace(`{${k}}`, String(v))
        })
      }
      return value
    },
    [translations]
  )

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return ctx
}
