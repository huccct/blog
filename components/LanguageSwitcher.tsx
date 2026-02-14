import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
]

const LanguageSwitcher = () => {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        aria-label="Select Language"
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-gray-900 dark:text-gray-100"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                locale === lang.code
                  ? 'font-medium text-primary-500'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => {
                setLocale(lang.code)
                setOpen(false)
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
