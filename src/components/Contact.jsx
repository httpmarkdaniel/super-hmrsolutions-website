import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwwV3SJibGI3z-QHkvngj3veqhVrzDVy8ubm6f63pLrg1ssYxjZAZ18DlffCa9ZE2cA/exec'

const solutions = [
  'Audio / Video Intercoms',
  'CCTV System',
  'PABX System',
  'Access Control System',
  'Paging System',
  'Nurse Call System',
  'Synchronized Clocks',
  'Structured Cabling',
  'Fire Detection and Alarm System',
  'Fire Suppression System',
  'Wireless Networks',
  'Seismic System',
  'Intrusion System',
  'Parking Management System',
  'Server Room Fitout',
  'Real Time Location System',
  'Water Leak Detection System',
  'Preventive Maintenance',
]

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

export default function Contact() {
  const leftRef = useReveal()
  const rightRef = useReveal()

  const [fields, setFields] = useState({ name: '', company: '', email: '', phone: '', solution: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k, v) => {
    setFields(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  const validate = () => {
    const e = {}
    if (fields.name.trim().length < 2) e.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = true
    if (fields.message.trim().length < 10) e.message = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    try {
      const payload = {
        Name: fields.name,
        Company: fields.company || '—',
        Email: fields.email,
        Phone: fields.phone || '—',
        Solution: fields.solution || '—',
        Message: fields.message,
      }

      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })
      if (true) {
        setStatus('done')
        setFields({ name: '', company: '', email: '', phone: '', solution: '', message: '' })
        setTimeout(() => setStatus('idle'), 7000)
      } else {
        throw new Error('failed')
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <section className="section clients-dark" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div ref={leftRef} data-reveal>
            <div className="label">Get in touch</div>
            <h2 className="display">Let's plan your<br />building's technology.</h2>
            <div className="contact-details">
              {[
                { label: 'Address', val: <span>3/F HMR Trading Haus, Pioneer cor. Reliance St., Mandaluyong City, 1550</span> },
                { label: 'Phone', val: <><a href="tel:+63286240526">(63 2) 8624-0526 loc. 410</a><a href="tel:+63284040129">(63 2) 8404-0129</a></> },
                { label: 'Email', val: <a href="mailto:info@hmrsolutions.net">info@hmrsolutions.net</a> },
                { label: 'Website', val: <a href="https://www.hmrsolutions.net">www.hmrsolutions.net</a> },
                { label: 'Office Hours', val: <span>Monday – Friday, 8:00 AM – 5:00 PM</span>, full: true },
              ].map(({ label, val, full }) => (
                <div className={`cdet${full ? ' full' : ''}`} key={label}>
                  <div className="cdet-label">{label}</div>
                  <div className="cdet-val">{val}</div>
                </div>
              ))}
            </div>
            <div className="map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.0948!2d121.03505!3d14.58579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDM1JzA5LjAiTiAxMjHCsDAyJzA2LjIiRQ!5e0!3m2!1sen!2sph!4v1620000000000!5m2!1sen!2sph"
                title="HMR Solutions location map — Mandaluyong City Philippines"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="form-card" ref={rightRef} data-reveal>
            <form onSubmit={submit} noValidate aria-label="Contact HMR Solutions">
              <div className="form-row">
                <div className={`fgroup${errors.name ? ' has-err' : ''}`}>
                  <label htmlFor="fn">Full name *</label>
                  <input id="fn" type="text" placeholder="Juan dela Cruz" value={fields.name} onChange={e => set('name', e.target.value)} required autoComplete="name" className={errors.name ? 'err' : ''} />
                  <span className="err-msg" role="alert">Please enter your name.</span>
                </div>
                <div className="fgroup">
                  <label htmlFor="co">Company / Project</label>
                  <input id="co" type="text" placeholder="Your company or building" value={fields.company} onChange={e => set('company', e.target.value)} autoComplete="organization" />
                </div>
              </div>
              <div className="form-row">
                <div className={`fgroup${errors.email ? ' has-err' : ''}`}>
                  <label htmlFor="em">Email address *</label>
                  <input id="em" type="email" placeholder="juan@company.com" value={fields.email} onChange={e => set('email', e.target.value)} required autoComplete="email" className={errors.email ? 'err' : ''} />
                  <span className="err-msg" role="alert">Please enter a valid email.</span>
                </div>
                <div className="fgroup">
                  <label htmlFor="ph">Phone number</label>
                  <input id="ph" type="tel" placeholder="+63 9XX XXX XXXX" value={fields.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />
                </div>
              </div>
              <div className="fgroup">
                <label htmlFor="sol">Solution of interest</label>
                <select id="sol" value={fields.solution} onChange={e => set('solution', e.target.value)}>
                  <option value="">Select a solution…</option>
                  {solutions.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className={`fgroup${errors.message ? ' has-err' : ''}`}>
                <label htmlFor="msg">Message *</label>
                <textarea id="msg" placeholder="Tell us about your project, building type, location, and requirements…" value={fields.message} onChange={e => set('message', e.target.value)} required className={errors.message ? 'err' : ''} />
                <span className="err-msg" role="alert">Please write a brief message.</span>
              </div>
              <button
                type="submit"
                className="btn-submit"
                disabled={status === 'sending'}
                style={status === 'done' ? { background: 'var(--green)' } : {}}
              >
                {status === 'sending' ? <span>Sending…</span> : status === 'done' ? <span>✓ Sent successfully</span> : <><span>Send message</span><span aria-hidden="true">→</span></>}
              </button>
              {status === 'done' && (
                <p role="status" style={{ marginTop: 14, fontSize: 13, fontWeight: 500, color: 'var(--green)' }}>
                  Thank you! One of our engineers will get back to you within one business day.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" style={{ marginTop: 14, fontSize: 13, color: 'var(--red)' }}>
                  Something went wrong. Please email <a href="mailto:info@hmrsolutions.net" style={{ color: 'var(--blue)' }}>info@hmrsolutions.net</a> directly or call <a href="tel:+63286240526" style={{ color: 'var(--blue)' }}>(63 2) 8624-0526</a>.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
