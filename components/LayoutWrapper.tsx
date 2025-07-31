import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import Footer from './Footer'
import AnimatedLogo from './AnimatedLogo'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import SectionContainer from './SectionContainer'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  return (
    <SectionContainer>
      <motion.header
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="flex justify-between items-center py-8"
      >
        <Link href="/" aria-label={siteMetadata.headerTitle} className="group flex items-center">
          <div className="block">
            <AnimatedLogo className="w-40 h-8 sm:w-48 sm:h-10" />
          </div>
        </Link>
        <nav className="hidden sm:flex items-center space-x-2">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                router.pathname === link.href
                  ? 'text-gray-900 dark:text-gray-100 border-b-2 border-gray-900 dark:border-gray-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {link.title}
            </Link>
          ))}
          <ThemeSwitch />
        </nav>
        <MobileNav />
      </motion.header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </SectionContainer>
  )
}

export default LayoutWrapper
