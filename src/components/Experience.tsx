import { useFadeUp } from '../hooks/useFadeUp'
import { EXPERIENCE } from '../data'

export default function Experience() {
  const ref = useFadeUp()

  return (
    <section className="section fade-up" id="experience" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Career</span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            From backend architecture to full-stack development — delivering efficient, maintainable,
            and secure systems across six companies.
          </p>
        </div>
        <div className="timeline">
          {EXPERIENCE.map((job, i) => (
            <div key={i} className={`timeline__event timeline__event--${job.type}`}>
              <div className="timeline__event__icon">
                <img src={job.logo} alt={job.company} className="company-logo" />
              </div>
              <div className="timeline__event__body">
                <div className="timeline__event__content">
                  <div className="timeline__event__title">{job.title}</div>
                  <div className="timeline__event__description">
                    <ul>
                      {job.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="timeline__event__date">
                  {job.date.split(' – ').map((part, k) => (
                    <span key={k}>{part}{k === 0 ? <br /> : null}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
