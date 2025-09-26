'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      className={styles.navbar}
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <Link href="/" className={styles.logo}>
        Community Data Storage Hub
      </Link>
      
      {/* Nav Links */}
      <ul className={`${styles['nav-links']} ${isOpen ? styles.open : ''}`} role="menubar">
        {[
          { href: '/', label: 'Home' },
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/about', label: 'About' },
          { href: '/contact', label: 'Contact' },
          { href: '/login', label: 'Get Started', cta: true },
        ].map(({ href, label, cta }) => (
          <li key={href} role="none">
            <Link
              href={href}
              role="menuitem"
              className={`${styles['nav-link']} ${pathname === href ? styles.active : ''} ${cta ? styles['cta-button'] : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}


