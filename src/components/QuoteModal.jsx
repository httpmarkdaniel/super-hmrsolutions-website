import { useState, useEffect, useRef } from 'react'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwwV3SJibGI3z-QHkvngj3veqhVrzDVy8ubm6f63pLrg1ssYxjZAZ18DlffCa9ZE2cA/exec'

const buildingTypes = [
  'Condominium / Residential', 'Office / Commercial', 'Hospital / Healthcare',
  'Hotel / Hospitality', 'Industrial / Manufacturing', 'Government / Institutional',
  'Retail / Restaurant', 'Other',
]

export default function QuoteModal({ open, solution, onClose }) {
  const [fields, setFields] = useState({ name: '', company: '', email: '', phone: '', building: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendErr, setSendErr] = useState(false)
  const nameRef = useRef(null)

  useEffect(() => {
    if (open) {
      setSent(false)
      setSending(false)
      setSendErr(false)
      setFields({ name: '', company: '', email: '', phone: '', building: '', message: '' })
      setErrors({})
      document.body.style.overflow = 'hidden'
      setTimeout(() => nameRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && open) onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (fields.name.trim().length < 2) errs.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = true
    if (fields.message.trim().length < 10) errs.message = true
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    setSendErr(false)

    try {
      const payload = {
        Name: fields.name,
        Company: fields.company || '—',
        Email: fields.email,
        Phone: fields.phone || '—',
        Solution: solution || fields.building || '—',
        Message: fields.message,
      }

      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })
      if (true) {
        setSending(false)
        setSent(true)
        setTimeout(() => onClose(), 6000)
      } else {
        throw new Error('failed')
      }
    } catch {
      setSending(false)
      setSendErr(true)
    }
  }

  return (
    <div
      className={`modal-bg${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <h3 id="modalTitle">Request a Quote</h3>
            {solution && <span className="modal-solution-tag">{solution}</span>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        <div className="modal-body">
          {sent ? (
            <div className="modal-success">
              <div className="ms-icon">✅</div>
              <h4>Inquiry received!</h4>
              <p>Thank you — one of our engineers will get back to you within one business day to discuss your <strong>{solution}</strong> requirements.</p>
            </div>
          ) : (
            <>
              {/* Quick contact bar */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8,
                padding: '11px 14px', marginBottom: 20,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 12, color: 'var(--gray-600)', marginRight: 4 }}>Prefer to call?</span>
                <a
                  href="tel:+63286240526"
                  style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, fontWeight: 700, color: 'var(--blue)', textDecoration: 'none' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  (63 2) 8624-0526
                </a>
                <span style={{ fontSize: 11, color: 'var(--gray-600)', margin: '0 2px' }}>or</span>
                <a
                  href="mailto:info@hmrsolutions.net"
                  style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', textDecoration: 'none' }}
                >
                  info@hmrsolutions.net
                </a>
              </div>

              <form onSubmit={submit} noValidate>
                <div className="modal-form-row">
                  <div className="fgroup">
                    <label htmlFor="mName">Full name *</label>
                    <input ref={nameRef} id="mName" type="text" placeholder="Juan dela Cruz" value={fields.name} onChange={e => set('name', e.target.value)} required autoComplete="name" style={errors.name ? { borderColor: 'var(--red)' } : {}} />
                  </div>
                  <div className="fgroup">
                    <label htmlFor="mCompany">Company / Building</label>
                    <input id="mCompany" type="text" placeholder="Your company or building" value={fields.company} onChange={e => set('company', e.target.value)} autoComplete="organization" />
                  </div>
                </div>
                <div className="modal-form-row">
                  <div className="fgroup">
                    <label htmlFor="mEmail">Email address *</label>
                    <input id="mEmail" type="email" placeholder="juan@company.com" value={fields.email} onChange={e => set('email', e.target.value)} required autoComplete="email" style={errors.email ? { borderColor: 'var(--red)' } : {}} />
                  </div>
                  <div className="fgroup">
                    <label htmlFor="mPhone">Phone / Mobile</label>
                    <input id="mPhone" type="tel" placeholder="+63 9XX XXX XXXX" value={fields.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />
                  </div>
                </div>
                <div className="fgroup">
                  <label htmlFor="mBuilding">Building type</label>
                  <select id="mBuilding" value={fields.building} onChange={e => set('building', e.target.value)}>
                    <option value="">Select your building type…</option>
                    {buildingTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="fgroup">
                  <label htmlFor="mMsg">Project details *</label>
                  <textarea id="mMsg" placeholder="Tell us about your building, number of floors, approximate scale, and any specific requirements…" value={fields.message} onChange={e => set('message', e.target.value)} required style={errors.message ? { borderColor: 'var(--red)' } : {}} />
                </div>

                {sendErr && (
                  <p style={{ fontSize: 13, color: 'var(--red)', marginBottom: 10 }}>
                    Something went wrong. Please email us directly at{' '}
                    <a href="mailto:info@hmrsolutions.net" style={{ color: 'var(--blue)' }}>info@hmrsolutions.net</a> or call{' '}
                    <a href="tel:+63286240526" style={{ color: 'var(--blue)' }}>(63 2) 8624-0526</a>.
                  </p>
                )}

                <button type="submit" className="modal-submit" disabled={sending}>
                  {sending
                    ? <span>Sending…</span>
                    : <><span>Send Inquiry</span><span aria-hidden="true">→</span></>}
                </button>
                <p className="modal-note">We respond within 1 business day · Free site assessment available</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
