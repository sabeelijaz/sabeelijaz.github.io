import { useState, useEffect, useRef } from 'react'
import { validateEmail, checkRateLimit, checkCooldown, sanitize } from '../utils/security'

declare const emailjs: {
  send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<void>
}

export default function VisitorGate() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const submitted = localStorage.getItem('sabeelijaz_visitor_submitted') === 'true'
    if (!submitted) {
      setVisible(true)
      document.body.classList.add('gate-open')
    } else {
      // Ensure body scroll is never locked if gate was already dismissed
      document.body.classList.remove('gate-open')
    }
    // Cleanup on unmount — always restore scroll
    return () => {
      document.body.classList.remove('gate-open')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypotRef.current?.value) return

    const emailResult = validateEmail(email)
    if (!emailResult.ok) {
      setError(emailResult.msg)
      return
    }

    const rateRes = checkRateLimit('gate_rate', 2, 30 * 60 * 1000)
    if (!rateRes.allowed) { setError(rateRes.msg!); return }

    const coolRes = checkCooldown('gate_last', 15000)
    if (!coolRes.allowed) { setError(coolRes.msg!); return }

    setLoading(true)
    setError('')
    setFailed(false)

    try {
      await emailjs.send('service_portfolio', 'template_visitor_gate', {
        visitor_email: sanitize(email),
        to_name: 'Sabeel',
        message: `A visitor with the email "${sanitize(email)}" just entered your portfolio.`,
        reply_to: sanitize(email),
      })
      localStorage.setItem('sabeelijaz_visitor_submitted', 'true')
      setDone(true)
      setTimeout(() => {
        setVisible(false)
        document.body.classList.remove('gate-open')
      }, 1200)
    } catch {
      setFailed(true)
      setTimeout(() => setFailed(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) setError('')
  }

  if (!visible) return null

  return (
    <div id="visitorGate" className="visitor-gate" role="dialog" aria-modal="true" aria-labelledby="gateTitle">
      <div className="gate-card">
        <div className="gate-avatar" aria-hidden="true">
          <img src="/images/profile.png" alt="Sabeel Ijaz" />
        </div>
        <div className="gate-badge">👋 Welcome</div>
        <h2 className="gate-title" id="gateTitle">Looking for a developer?</h2>
        <p className="gate-subtitle">You're in the right place. Explore my work and reach out if you need help with:</p>
        <ul className="gate-services-list">
          <li>🌐 Web &amp; Full-Stack Applications</li>
          <li>⚙️ Backend APIs &amp; Microservices</li>
          <li>☁️ Cloud Architecture &amp; AWS</li>
          <li>🗄️ Database Design &amp; Optimization</li>
        </ul>
        <p className="gate-cta-note">Drop your email and I'll know you stopped by — you can also hire me directly via Upwork.</p>

        {done ? (
          <div className="gate-success-msg">
            <div className="gate-success-icon">✓</div>
            <h3>You're in!</h3>
            <p>Thanks for stopping by. Enjoy the portfolio.</p>
          </div>
        ) : (
          <form className="gate-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input
              ref={honeypotRef}
              type="text"
              name="phone_number"
              autoComplete="off"
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}
            />
            <div className="gate-input-wrap">
              <svg className="gate-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,12 2,6" />
              </svg>
              <input
                type="email"
                id="gateEmail"
                className={`gate-input${error ? ' input-error' : ''}`}
                placeholder="your@email.com"
                autoComplete="email"
                inputMode="email"
                required
                aria-required="true"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  const r = validateEmail(email)
                  if (email.trim()) setError(r.msg)
                }}
              />
            </div>
            {error && <p className="gate-error" role="alert">{error}</p>}
            <button type="submit" className="gate-btn" disabled={loading || done}>
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Notifying...
                </>
              ) : failed ? '✕ Failed — Try Again' : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  View Portfolio
                </>
              )}
            </button>
          </form>
        )}

        <p className="gate-hint">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Your email is only used to notify me of your visit. Nothing else.
        </p>
      </div>
    </div>
  )
}
