import Link from 'next/link';
import { Cloud, Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
{/*import './globals.css';*/}


const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Community', href: '/community' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
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
    { name: 'Email', icon: Mail, href: 'munenefrank11@gmail.com' },
  ];

  return (
    <footer className="footer">
      <div className="footerGrid">
        <div className="brand">
          <Link href="/">
            Community Data Storage Hub
          </Link>
          <p>
            Empowering communities with secure, decentralized data storage.
          </p>
          <div>
            {socialLinks.map(({ name, icon: Icon, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="socialIcon" />
              </a>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className="sectionTitle">{section}</h3>
            <ul>
              {links.map(({ name, href }) => (
                <li key={name}>
                  <Link href={href} className="link">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bottom">
        <p className="text-sm text-gray-600"> &copy; {currentYear} Community Data Storage Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
