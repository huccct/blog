import { useState } from 'react'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitcher from './LanguageSwitcher'
import headerNavLinks from '@/data/headerNavLinks'
import { useTranslation } from '@/lib/i18n'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const { t } = useTranslation()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <div className="sm:hidden">
      <div className="flex items-center">
        <LanguageSwitcher />
        <ThemeSwitch />
        <button
          type="button"
          className="ml-1 mr-1 h-8 w-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle Menu"
          onClick={onToggleNav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="text-gray-900 dark:text-gray-100"
          >
            {navShow ? (
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>
      <div
        className={`fixed inset-0 top-0 z-30 h-screen w-full transform bg-white/90 backdrop-blur-md transition-all duration-300 ease-in-out dark:bg-gray-900/90 ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          type="button"
          className="absolute right-6 top-6 p-2"
          onClick={onToggleNav}
          aria-label="Close Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6 text-gray-900 dark:text-gray-100"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <nav className="mt-24 flex h-full flex-col items-center">
          {headerNavLinks.map((link) => (
            <div key={link.titleKey} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-wide text-gray-900 transition-colors hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                onClick={onToggleNav}
              >
                {t(link.titleKey)}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileNav
