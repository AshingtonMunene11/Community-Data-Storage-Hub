'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

// Keep year stable for SSR/CSR consistency
const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = {
  Platform: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Security', href: '/security' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/AshingtonMunene11/Community-Data-Storage-Hub' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/Mubig_' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/munenefrank/' },
  { name: 'Email', icon: Mail, href: 'mailto:munenefrank11@gmail.com' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerLogo}>
          {/* ✅ Modern Link usage */}
          <Link href="/" className={styles.logoText}>
            Community Data Storage Hub
          </Link>

          <p className={styles.tagline}>
            Empowering communities with secure, decentralized data storage.
          </p>

          <div className={styles.footerSocial}>
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <Icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className={styles.sectionTitle}>{section}</h3>
            <ul className={styles.linkList}>
              {links.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href} className={styles.link}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {CURRENT_YEAR} Community Data Storage Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}
