import { useReveal } from '../hooks/useReveal'

const steps = [
  {
    num: '01',
    title: 'Site Survey',
    desc: 'Free on-site visit to assess your building and infrastructure before we recommend anything.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'System Design',
    desc: 'Full engineering drawings, cable schedules, rack layouts, and a transparent itemised cost breakdown.',
    img: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Installation',
    desc: 'Certified technicians install to spec with proper cable management, labelling, and documentation.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Commissioning',
    desc: 'End-to-end testing and user training. Nothing is signed off until every system is verified.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Maintenance',
    desc: 'Scheduled upkeep keeps your systems compliant and performing for the life of the building.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&auto=format&fit=crop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
      </svg>
    ),
  },
]

export default function Process() {
  const headerRef = useReveal()

  return (
    <section
      className="section tight"
      id="process"
      style={{
        position: 'relative',
        backgroundImage: `url('https://images.unsplash.com/photo-1596564309076-01c1868b07a4?w=1800&q=80&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,14,22,0.83)' }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headerRef} data-reveal style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 72px' }}>
          <div className="label" style={{ justifyContent: 'center' }}>How we work</div>
          <h2 className="display">From first call to long-term maintenance.</h2>
        </div>

        <div className="process-timeline">
          {/* Dashed connector line through circle centers */}
          <div className="process-connector" aria-hidden="true" />

          <div className="process-grid">
            {steps.map((step, i) => (
              <div key={step.num} className="process-step">

                {/* Icon circle */}
                <div className="process-circle">
                  {step.icon}
                </div>

                {/* Card */}
                <div
                  className="process-card"
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,94,184,0.15)'
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.borderColor = 'var(--blue)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'none'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  {/* Image */}
                  <div style={{
                    height: 118,
                    backgroundImage: `url(${step.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />

                  {/* Content */}
                  <div style={{ padding: '14px 16px 18px' }}>
                    <span style={{
                      display: 'inline-block',
                      fontSize: 10, fontWeight: 700,
                      color: 'var(--blue)',
                      background: 'rgba(99,174,232,0.12)',
                      border: '1px solid rgba(99,174,232,0.22)',
                      borderRadius: 20, padding: '2px 9px',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      marginBottom: 10,
                    }}>
                      {step.num}
                    </span>

                    <h4 style={{
                      fontSize: '0.95rem', fontWeight: 700,
                      color: 'var(--ink)', margin: '0 0 8px',
                      lineHeight: 1.25,
                    }}>
                      {step.title}
                    </h4>

                    <p style={{
                      fontSize: 12, color: 'var(--gray-600)',
                      lineHeight: 1.7, margin: 0,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

