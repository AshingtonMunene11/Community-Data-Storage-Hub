import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* Left: Logo */}
      <Link href="/" className={styles.logo}>
        Community Data Storage Hub
      </Link>

      {/* Right: Navigation Links */}
      <ul className={styles['nav-links']}>
        <li><Link href="/" className={styles['nav-link']}>Home</Link></li>
        <li><Link href="/dashboard" className={styles['nav-link']}>Dashboard</Link></li>
        <li><Link href="/about" className={styles['nav-link']}>About</Link></li>
        <li><Link href="/contact" className={styles['nav-link']}>Contact</Link></li>
        <li><Link href="/login" className={`${styles['nav-link']} ${styles['cta-button']}`}>Get Started</Link></li>
      </ul>
    </nav>
  )
}
