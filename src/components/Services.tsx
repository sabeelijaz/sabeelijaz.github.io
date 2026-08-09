import { useFadeUp } from '../hooks/useFadeUp'
import { SERVICES } from '../data'

const SERVICE_ICONS = [
  <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
  <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  <svg key="4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  <svg key="5" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
]

const UPWORK_SVG = (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M24.75 5C21.27 5 18.54 7.18 17.5 10.48C16.06 8.3 15.01 5.75 14.42 3H10.5V13.88C10.5 15.98 8.79 17.69 6.69 17.69C4.59 17.69 2.88 15.98 2.88 13.88V3H-0.04V13.88C-0.04 17.6 2.97 20.62 6.69 20.62C10.41 20.62 13.42 17.6 13.42 13.88V12.73C14.02 14.09 14.77 15.42 15.69 16.62L13.06 29H16.99L18.89 19.9C20.11 20.37 21.41 20.62 22.75 20.62C27.27 20.62 30.96 16.93 30.96 12.41C30.96 8.37 28.22 5 24.75 5ZM24.75 17.69C23.44 17.69 22.16 17.38 21.01 16.81L21.72 13.3V13.19C21.87 11.47 22.79 9.02 24.75 9.02C26.81 9.02 28.08 10.97 28.08 12.97C28.08 15.55 26.63 17.69 24.75 17.69Z" fill="#14a800"/>
  </svg>
)

export default function Services() {
  const ref = useFadeUp()

  return (
    <section className="section fade-up" id="services" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Hire Me</span>
          <h2 className="section-title">What I Can Build for You</h2>
          <p className="section-subtitle">
            Whether you need a complete product or a specialist to strengthen your team — I've got the experience to deliver it right.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div className="service-card" key={i}>
              <div className="service-icon">{SERVICE_ICONS[i]}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-tags">
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Upwork CTA */}
        <div className="upwork-card">
          <div className="upwork-card-left">
            <div className="upwork-logo-wrap" aria-hidden="true">{UPWORK_SVG}</div>
            <div className="upwork-card-info">
              <div className="upwork-name-row">
                <span className="upwork-name">Sabeel Ijaz</span>
                <span className="upwork-badge">Top Rated</span>
              </div>
              <p className="upwork-title">Full-Stack Software Engineer</p>
              <div className="upwork-stats">
                <span className="upwork-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  5.0 Rating
                </span>
                <span className="upwork-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  8+ Years Experience
                </span>
                <span className="upwork-stat">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Islamabad, Pakistan
                </span>
              </div>
            </div>
          </div>
          <div className="upwork-card-right">
            <p className="upwork-desc">Available for contract &amp; freelance work. Let's build something great together.</p>
            <div className="upwork-actions">
              <a href="https://www.upwork.com/freelancers/~01c25194db01ca2e59" target="_blank" rel="noopener" className="btn-upwork">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M24.75 5C21.27 5 18.54 7.18 17.5 10.48C16.06 8.3 15.01 5.75 14.42 3H10.5V13.88C10.5 15.98 8.79 17.69 6.69 17.69C4.59 17.69 2.88 15.98 2.88 13.88V3H-0.04V13.88C-0.04 17.6 2.97 20.62 6.69 20.62C10.41 20.62 13.42 17.6 13.42 13.88V12.73C14.02 14.09 14.77 15.42 15.69 16.62L13.06 29H16.99L18.89 19.9C20.11 20.37 21.41 20.62 22.75 20.62C27.27 20.62 30.96 16.93 30.96 12.41C30.96 8.37 28.22 5 24.75 5ZM24.75 17.69C23.44 17.69 22.16 17.38 21.01 16.81L21.72 13.3V13.19C21.87 11.47 22.79 9.02 24.75 9.02C26.81 9.02 28.08 10.97 28.08 12.97C28.08 15.55 26.63 17.69 24.75 17.69Z"/></svg>
                Hire on Upwork
              </a>
              <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                Email Me Directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
