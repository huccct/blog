import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from './Link'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import Footer from './Footer'
import Logo from '@/data/logo.svg'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import SectionContainer from './SectionContainer'

const headerVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
}

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
          <motion.div variants={headerVariants} whileHover="hover" whileTap="tap">
            <div className="relative w-10 h-10 mr-3">
              <div className="absolute inset-0 rounded-lg opacity-75 blur-sm group-hover:opacity-100 transition-opacity">
                <Logo />
              </div>
              <div className="relative rounded-lg w-full h-full">
                <Logo />
              </div>
            </div>
          </motion.div>
          <div className="hidden sm:block font-mono">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4f46e5] group-hover:to-[#0ea5e9] transition-all duration-300">
              Orion
            </span>
            <span className="text-xl font-light text-gray-600 dark:text-gray-400 ml-0.5">Chen</span>
          </div>
        </Link>
        <nav className="hidden sm:flex items-center space-x-1">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                router.pathname === link.href
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/50'
              }`}
            >
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                {link.title}
              </motion.span>
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
