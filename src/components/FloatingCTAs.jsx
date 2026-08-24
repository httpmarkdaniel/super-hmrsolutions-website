export default function FloatingCTAs({ scrollY, openModal }) {
  return null
  const visible = scrollY > 400

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 24,
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'flex-end',
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity .25s ease, transform .25s ease',
      }}
      aria-hidden={!visible}
    >
      {/* Call button */}
      <a
        href="tel:+63286240526"
        title="Call HMR Solutions"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--blue)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
          textDecoration: 'none',
          transition: 'transform .15s ease, box-shadow .15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(0,0,0,0.45)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.35)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>

      {/* Request a Quote button */}
      <button
        onClick={() => openModal?.('')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '11px 18px',
          background: 'var(--yellow)',
          color: '#0a0a0a',
          border: 'none',
          borderRadius: 24,
          fontSize: 13, fontWeight: 800,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: '0 4px 20px rgba(236,232,14,0.55)',
          whiteSpace: 'nowrap',
          transition: 'transform .15s ease, box-shadow .15s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(236,232,14,0.7)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(236,232,14,0.55)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        Request a Quote
      </button>
    </div>
  )
}

