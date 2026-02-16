import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article')
      if (!article) {
        return
      }

      const articleTop = article.offsetTop
      const articleHeight = article.scrollHeight
      const windowHeight = window.innerHeight
      const scrollY = window.scrollY

      // Show only after scrolling past the article start
      setVisible(scrollY > articleTop)

      const scrollable = articleHeight - windowHeight + articleTop
      if (scrollable <= 0) {
        setProgress(100)
        return
      }

      const current = Math.min(Math.max((scrollY - articleTop) / scrollable, 0), 1)
      setProgress(current * 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!visible) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/50 dark:bg-gray-700/50">
      <div
        className="h-full bg-primary-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
