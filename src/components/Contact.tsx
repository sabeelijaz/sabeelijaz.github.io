import { useState, useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
import { validateEmail, validateText, checkRateLimit, checkCooldown, sanitize } from '../utils/security'

declare const grecaptcha: { getResponse: () => string; reset: () => void }
declare const emailjs: {
  send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<void>
}

type FieldErrors = { name?: string; email?: string; subject?: string; message?: string; recaptcha?: string }

export default function Contact() {
  const ref = useFadeUp()
  const honeypotRef = useRef<HTMLInputElement>(null)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [btnState, setBtnState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const setField = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = (): boolean => {
    const newErrors: FieldErrors = {}
    const nameR = validateText(fields.name, 'Name', 2, 80)
    if (!nameR.ok) newErrors.name = nameR.msg
    const emailR = validateEmail(fields.email)
    if (!emailR.ok) newErrors.email = emailR.msg
    const subjectR = validateText(fields.subject, 'Subject', 3, 120)
    if (!subjectR.ok) newErrors.subject = subjectR.msg
    const msgR = validateText(fields.message, 'Message', 10, 2000)
    if (!msgR.ok) newErrors.message = msgR.msg
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypotRef.current?.value) return
    if (!validate()) return

    const rateRes = checkRateLimit('contact_rate', 3, 15 * 60 * 1000)
    if (!rateRes.allowed) { setErrors({ message: rateRes.msg }); return }
    const coolRes = checkCooldown('contact_last', 30000)
    if (!coolRes.allowed) { setErrors({ message: coolRes.msg }); return }

    const recaptchaToken = grecaptcha.getResponse()
    if (!recaptchaToken) {
      setErrors({ recaptcha: 'Please complete the reCAPTCHA check.' })
      return
    }

    setBtnState('loading')
    try {
      await emailjs.send('service_portfolio', 'template_portfolio', {
        name: sanitize(fields.name),
        email: sanitize(fields.email),
        subject: sanitize(fields.subject),
        message: sanitize(fields.message),
        'g-recaptcha-response': recaptchaToken,
      })
      setBtnState('success')
      setFields({ name: '', email: '', subject: '', message: '' })
      grecaptcha.reset()
      setTimeout(() => setBtnState('idle'), 4000)
    } catch {
      setBtnState('error')
      grecaptcha.reset()
      setTimeout(() => setBtnState('idle'), 4000)
    }
  }

  return (
    <section className="contact fade-up" id="contact" ref={ref as React.RefObject<HTMLElement>}>
      <div className="contact-container">
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or looking for a developer to join your team? I'd love to hear from you.
          </p>
        </div>
        <div className="contact-layout">
          {/* Left */}
          <div className="contact-info">
            <h3 className="contact-info-title">Get in touch</h3>
            <p className="contact-info-desc">
              I'm open to freelance projects, full-time roles, and interesting collaborations.
              Response time is usually within 24 hours.
            </p>
            <div className="contact-links">
              <a href="https://www.upwork.com/freelancers/~01c25194db01ca2e59" target="_blank" rel="noopener" className="contact-link contact-link-upwork">
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M24.75 5C21.27 5 18.54 7.18 17.5 10.48C16.06 8.3 15.01 5.75 14.42 3H10.5V13.88C10.5 15.98 8.79 17.69 6.69 17.69C4.59 17.69 2.88 15.98 2.88 13.88V3H-0.04V13.88C-0.04 17.6 2.97 20.62 6.69 20.62C10.41 20.62 13.42 17.6 13.42 13.88V12.73C14.02 14.09 14.77 15.42 15.69 16.62L13.06 29H16.99L18.89 19.9C20.11 20.37 21.41 20.62 22.75 20.62C27.27 20.62 30.96 16.93 30.96 12.41C30.96 8.37 28.22 5 24.75 5ZM24.75 17.69C23.44 17.69 22.16 17.38 21.01 16.81L21.72 13.3V13.19C21.87 11.47 22.79 9.02 24.75 9.02C26.81 9.02 28.08 10.97 28.08 12.97C28.08 15.55 26.63 17.69 24.75 17.69Z"/></svg>
                <span className="contact-link-text">Hire me on Upwork</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{marginLeft:'auto',opacity:0.4,flexShrink:0}}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/sabeel-ijaz/" target="_blank" rel="noopener" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                <span className="contact-link-text">linkedin.com/in/sabeel-ijaz</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{marginLeft:'auto',opacity:0.4,flexShrink:0}}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <a href="https://github.com/sabeelijaz" target="_blank" rel="noopener" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <span className="contact-link-text">github.com/sabeelijaz</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{marginLeft:'auto',opacity:0.4,flexShrink:0}}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input ref={honeypotRef} type="text" name="website" autoComplete="off" tabIndex={-1} aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }} />

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" placeholder="Your full name"
                  autoComplete="name" required value={fields.name} onChange={setField('name')}
                  className={errors.name ? 'input-error' : ''} />
                {errors.name && <p className="field-error gate-error" role="alert">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="your@email.com"
                  autoComplete="email" inputMode="email" required value={fields.email} onChange={setField('email')}
                  className={errors.email ? 'input-error' : ''} />
                {errors.email && <p className="field-error gate-error" role="alert">{errors.email}</p>}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="What's this about?"
                required value={fields.subject} onChange={setField('subject')}
                className={errors.subject ? 'input-error' : ''} />
              {errors.subject && <p className="field-error gate-error" role="alert">{errors.subject}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5}
                placeholder="Tell me about your project or opportunity..." required
                value={fields.message} onChange={setField('message')}
                className={errors.message ? 'input-error' : ''} />
              {errors.message && <p className="field-error gate-error" role="alert">{errors.message}</p>}
            </div>
            <div className="recaptcha-wrapper">
              <div className="g-recaptcha" data-sitekey="6LcnFgYsAAAAAF0tIud-as_QzAg4JcKkamja2A6f" data-theme="dark" />
            </div>
            {errors.recaptcha && <p className="gate-error" role="alert">{errors.recaptcha}</p>}
            <button
              type="submit"
              className="btn-primary btn-submit"
              disabled={btnState === 'loading'}
              style={btnState === 'success' ? { background: '#10b981' } : btnState === 'error' ? { background: '#ef4444' } : {}}
            >
              {btnState === 'loading' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg> Sending...
                </>
              ) : btnState === 'success' ? (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!</>
              ) : btnState === 'error' ? '✕ Failed — Try Again' : (
                <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
