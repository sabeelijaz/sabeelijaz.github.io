import { useFadeUp } from '../hooks/useFadeUp'
import { PROJECTS } from '../data'

export default function Projects() {
  const ref = useFadeUp()

  return (
    <section className="section fade-up" id="projects" ref={ref as React.RefObject<HTMLElement>}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            Turning concepts into functional, user-driven solutions — designed, built, and optimised for real-world impact.
          </p>
        </div>
        <div className="features-grid">
          {PROJECTS.map((p, i) => (
            <div className="feature-card-project" key={i}>
              <div className="feature-icon-project">
                <img src={p.img} alt={p.alt} />
              </div>
              <div className="project-card-body">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
