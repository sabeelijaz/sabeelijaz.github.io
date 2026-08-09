const NAV_LINKS = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#tech-stack', label: 'Tech Stack' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          {NAV_LINKS.map((l, i) => (
            <span key={l.href}>
              {i > 0 && <span className="footer-separator">·</span>}
              <a href={l.href} onClick={(e) => handleClick(e, l.href)}>{l.label}</a>
            </span>
          ))}
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} Sabeel Ijaz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
