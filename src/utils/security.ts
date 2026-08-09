// ── Input Security & Validation Utilities ────────────────

const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const blockedDomains = new Set([
  'mailinator.com', 'guerrillamail.com', 'tempmail.com', 'throwam.com',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'guerrillamail.info',
  'spam4.me', 'trashmail.com', 'trashmail.me', 'yopmail.com', 'dispostable.com',
  'fakeinbox.com', 'maildrop.cc', 'spamgourmet.com', 'getairmail.com',
  'discard.email', 'spambox.us', 'trashmail.net', 'getnada.com', '10minutemail.com',
  'tempinbox.com', 'mailnull.com', 'spamevader.com', 'mailnesia.com',
])

const suspiciousPatterns = [
  /https?:\/\//i,
  /\$\{.*\}/,
  /\{\{.*\}\}/,
  /eval\s*\(/i,
  /document\./i,
  /window\./i,
  /script/i,
  /base64/i,
]

export const sanitize = (str: string): string => {
  if (typeof str !== 'string') return ''
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'`]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

export const validateEmail = (email: string): { ok: boolean; msg: string } => {
  const val = sanitize(email)
  if (!val) return { ok: false, msg: 'Email is required.' }
  if (!emailRegex.test(val)) return { ok: false, msg: 'Please enter a valid email address.' }
  const domain = val.split('@')[1].toLowerCase()
  if (blockedDomains.has(domain)) return { ok: false, msg: 'Disposable email addresses are not allowed.' }
  return { ok: true, msg: '' }
}

export const validateText = (
  value: string,
  fieldName: string,
  min = 2,
  max = 500
): { ok: boolean; msg: string; clean?: string } => {
  const val = sanitize(value)
  if (!val) return { ok: false, msg: `${fieldName} is required.` }
  if (val.length < min) return { ok: false, msg: `${fieldName} must be at least ${min} characters.` }
  if (val.length > max) return { ok: false, msg: `${fieldName} must be under ${max} characters.` }
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(val)) return { ok: false, msg: `${fieldName} contains invalid content.` }
  }
  return { ok: true, msg: '', clean: val }
}

export const checkRateLimit = (
  key: string,
  limit = 3,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; msg?: string } => {
  const now = Date.now()
  const raw = localStorage.getItem(key)
  let record = raw ? JSON.parse(raw) : { count: 0, start: now }
  if (now - record.start > windowMs) record = { count: 0, start: now }
  if (record.count >= limit) {
    const remaining = Math.ceil((windowMs - (now - record.start)) / 60000)
    return { allowed: false, msg: `Too many attempts. Please wait ${remaining} minute(s).` }
  }
  record.count += 1
  localStorage.setItem(key, JSON.stringify(record))
  return { allowed: true }
}

export const checkCooldown = (
  key: string,
  cooldownMs = 30000
): { allowed: boolean; msg?: string } => {
  const last = parseInt(localStorage.getItem(key) || '0', 10)
  const now = Date.now()
  if (now - last < cooldownMs) {
    const secs = Math.ceil((cooldownMs - (now - last)) / 1000)
    return { allowed: false, msg: `Please wait ${secs}s before submitting again.` }
  }
  localStorage.setItem(key, String(now))
  return { allowed: true }
}
