import { useFadeUp } from '../hooks/useFadeUp'
import { TESTIMONIALS } from '../data'

export default function Testimonials() {
  const ref = useFadeUp()

  return (
    <section className="section fade-up" id="testimonials" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            Words from colleagues and collaborators — honest feedback that reflects a commitment to quality and teamwork.
          </p>
        </div>
        <div className="features-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="feature-card" key={i}>
              <p
                className="testimonial-text"
                dangerouslySetInnerHTML={{ __html: t.text }}
              />
              <div className="testimonial-author">
                <img src={t.img} alt={t.name} />
                <div className="testimonial-author-info">
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                  <a href={t.linkedin} target="_blank" rel="noopener">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
