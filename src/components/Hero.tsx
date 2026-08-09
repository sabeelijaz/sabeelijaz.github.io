import { useEffect, useState } from 'react'

export default function Hero() {
  const [years, setYears] = useState('8+')

  useEffect(() => {
    const calculated = new Date().getFullYear() - 2018
    setYears(`${calculated}+`)
  }, [])

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">Available for freelance &amp; full-time roles</div>
          <h1 className="hero-title">
            Hi, I'm Sabeel Ijaz<br />
            <span className="accent">Full-Stack Engineer</span>
          </h1>
          <p className="hero-subtitle">
            <span>{years}</span> years building scalable web applications, robust APIs, and intuitive UIs using
            Java, Node.js, Angular, React, and AWS. I write clean, maintainable code and help
            teams ship high-quality software on time.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn-primary" onClick={(e) => handleAnchorClick(e, '#contact')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              Get in Touch
            </a>
            <a href="https://www.linkedin.com/in/sabeel-ijaz/" target="_blank" rel="noopener" className="btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn Profile
            </a>
          </div>
          <div className="hero-meta">
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Islamabad, Pakistan
            </span>
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Open to Remote Work
            </span>
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
              </svg>
              {years} Years Experience
            </span>
            <span className="hero-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" />
              </svg>
              Started in 2018
            </span>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <img
            src="/images/og-image.svg"
            alt="Sabeel Ijaz — Full-Stack Software Engineer"
            className="hero-photo"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/og-image.svg' }}
          />
        </div>
      </div>
    </section>
  )
}
