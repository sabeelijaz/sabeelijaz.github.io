import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id], .section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    closeMenu()
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <nav id="mainNav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <a href="#top" className="logo" onClick={(e) => handleAnchorClick(e, '#top')}>
            Sabeel <span>Ijaz</span>
          </a>
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={activeSection === l.href.slice(1) ? 'active' : ''}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a href="https://github.com/sabeelijaz" target="_blank" rel="noopener" className="btn-nav">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <button
              className={`mobile-menu-button${menuOpen ? ' active' : ''}`}
              id="mobileMenuBtn"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <div className="hamburger">
                <span /><span /><span />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-menu-overlay${menuOpen ? ' active' : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' active' : ''}`} role="dialog" aria-label="Navigation menu">
        <div className="mobile-menu-header">
          <a href="#top" className="mobile-menu-logo" onClick={(e) => handleAnchorClick(e, '#top')}>
            Sabeel <span>Ijaz</span>
          </a>
          <button className="mobile-menu-close" aria-label="Close menu" onClick={closeMenu}>✕</button>
        </div>
        <nav className="mobile-menu-nav">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={(e) => handleAnchorClick(e, l.href)}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu-cta">
          <a href="https://github.com/sabeelijaz" target="_blank" rel="noopener" className="btn-nav">
            View GitHub Profile
          </a>
        </div>
      </div>
    </>
  )
}
