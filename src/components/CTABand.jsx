import { useReveal } from '../hooks/useReveal'

export default function CTABand() {
  const ref = useReveal()
  return (
    <div className="cta-band">
      <div className="cta-inner">
        <div ref={ref} data-reveal>
          <div className="label" style={{ color: 'rgba(255,255,255,.35)' }}>
            <span style={{ display: 'inline-block', width: 24, height: 2, background: 'rgba(255,255,255,.25)', marginRight: 10, verticalAlign: 'middle' }} />
            Free assessment
          </div>
          <h2 className="display" style={{ color: '#fff', marginBottom: 8 }}>Let's talk about<br />your building.</h2>
          <p style={{ color: 'rgba(255,255,255,.48)', fontSize: 15 }}>
            Get a no-obligation site survey and technology plan from our team of engineers.
          </p>
        </div>
        <a href="#contact" className="btn-primary" style={{ fontSize: 15, padding: '16px 34px', flexShrink: 0 }}>
          Contact us today →
        </a>
      </div>
    </div>
  )
}
