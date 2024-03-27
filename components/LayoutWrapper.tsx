import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Link from './Link'
import Logo from '@/data/logo.svg'
import ThemeSwitch from './ThemeSwitch'
import MobileNav from './MobileNav'
import Footer from './Footer'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import SectionContainer from './SectionContainer'
import { useEffect, useState } from 'react'

const headerVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
}

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  return (
    <SectionContainer>
      <div className="dynamic-background">{/* Background animation or interactive element */}</div>

      <motion.header
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="flex justify-between items-center py-10"
      >
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <motion.div variants={headerVariants} whileHover="hover" whileTap="tap">
            <Logo className="interactive-logo w-12 h-12 mr-3" />
          </motion.div>
          <div className="playful-font hidden sm:block text-2xl font-bold text-gray-900 dark:text-gray-100">
            {siteMetadata.headerTitle}
          </div>
        </Link>
        <nav className="hidden sm:flex space-x-4 items-center">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`custom-cursor px-4 py-2 rounded-md text-gray-900 dark:text-gray-100 transition-all duration-300 ${
                router.pathname === link.href
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-primary-500 hover:text-white'
              }`}
            >
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                {link.title}
              </motion.span>
            </Link>
          ))}
          <ThemeSwitch />
          <MobileNav />
        </nav>
      </motion.header>
      <main className="mb-auto">{children}</main>
      <Footer />
    </SectionContainer>
  )
}

export default LayoutWrapper
