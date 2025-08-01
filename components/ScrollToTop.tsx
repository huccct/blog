import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div
      className={`fixed right-8 bottom-8 z-[9999] ${show ? 'block' : 'hidden'}`}
    >
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-3 text-gray-500 transition-all hover:bg-gray-300 hover:scale-110 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 shadow-lg"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}

export default ScrollToTop