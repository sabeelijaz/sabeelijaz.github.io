import { useEffect, useRef } from 'react'

const STATS = [
  { target: 0, suffix: '+', label: 'Years of Experience', dynamic: true },
  { target: 15, suffix: '+', label: 'Projects Delivered' },
  { target: 6, suffix: '', label: 'Companies Worked At' },
  { target: 20, suffix: '+', label: 'Technologies Used' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return
        animated.current = true

        const yearsTarget = new Date().getFullYear() - 2018

        section.querySelectorAll<HTMLSpanElement>('.stat-number').forEach((el, i) => {
          const stat = STATS[i]
          const target = stat.dynamic ? yearsTarget : stat.target
          const suffix = stat.suffix
          let count = 0
          const step = Math.ceil(target / 60)
          const timer = setInterval(() => {
            count = Math.min(count + step, target)
            el.innerHTML = `${count}<span>${suffix}</span>`
            if (count >= target) clearInterval(timer)
          }, 25)
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="stats fade-up" id="stats" ref={sectionRef}>
      <div className="stats-container">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-number" data-target={s.dynamic ? 0 : s.target}>
                0<span>{s.suffix}</span>
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
