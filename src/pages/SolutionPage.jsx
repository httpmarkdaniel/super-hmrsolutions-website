import { useParams, Link } from 'react-router-dom'
import { solutionsData } from '../data/solutionsData'
import { useSEO } from '../hooks/useSEO'

export default function SolutionPage({ openModal }) {
  const { slug } = useParams()
  const data = solutionsData[slug]

  useSEO({
    title: data ? `${data.title} | HMR Solutions Philippines` : 'Solution | HMR Solutions',
    description: data
      ? `${data.overview.slice(0, 155).trim()}…`
      : 'Building technology solutions by HMR Solutions Philippines.',
    canonical: `/solutions/${slug}`,
    schema: data ? {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.title,
      description: data.overview,
      provider: {
        '@type': 'Organization',
        name: 'HMR Solutions Inc.',
        url: 'https://www.hmrsolutions.net',
      },
      areaServed: { '@type': 'Country', name: 'Philippines' },
      serviceType: data.title,
    } : undefined,
    schemaId: 'solution-schema',
  })

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 className="display">Page not found</h2>
        <p style={{ color: 'var(--gray-600)', margin: '16px 0 32px' }}>This solution page doesn't exist yet.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>← Back to home</Link>
      </div>
    )
  }

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: 480, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: '-4%', backgroundImage: `url('${data.heroImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', animation: 'heroBgFloat 10s ease-in-out infinite', transformOrigin: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,14,22,0.25) 0%, rgba(8,14,22,0.5) 55%, rgba(8,14,22,0.92) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 64 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', marginBottom: 20, transition: 'color var(--t)' }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.5)'}
          >
            ← Back to home
          </Link>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 2, background: 'var(--yellow)', display: 'block' }} />
            Solutions
          </div>
          <h1 style={{ fontFamily: 'var(--font-head, "Bebas Neue")', fontSize: 'clamp(2rem,4vw,3.4rem)', fontWeight: 400, color: '#fff', lineHeight: 1.02, textTransform: 'uppercase', maxWidth: 700, margin: 0 }}>{data.title}</h1>
        </div>
      </div>

      {/* ── OVERVIEW ── */}
      <section className="section" style={{ paddingBottom: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="label">Overview</div>
              <h2 className="display">What we offer</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.82, marginTop: 8, textAlign: 'justify' }}>{data.overview}</p>
              <button onClick={() => openModal(data.title)} className="btn-primary" style={{ marginTop: 32, border: 'none', cursor: 'pointer', padding: '18px 40px', fontSize: 15 }}>
                Request a quote
              </button>
            </div>
            <div>
              <div className="label">Applications</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 20 }}>Who needs this system?</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                {data.applications.map(app => (
                  <span key={app} style={{ padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 100, fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', background: 'var(--bg-card)' }}>{app}</span>
                ))}
              </div>
              <div style={{ marginTop: 32 }}>
                <div className="label">Brands we use</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginTop: 8 }}>
                  {data.brands.map(b => (
                    <span key={b} className="brand-chip">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section tight clients-dark">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
            <div>
              <div className="label">Features</div>
              <h2 className="display" style={{ maxWidth: 380, marginBottom: 0 }}>What's included</h2>
            </div>
          </div>
          <div className="feat-row" style={{ '--feat-cols': data.features.length <= 5 ? data.features.length : data.features.length === 6 ? 3 : 4 }}>
            {data.features.map(f => (
              <div key={f.title} className="feat-card">
                <div className="feat-card-img" style={{ backgroundImage: `url('${f.img}')` }} />
                <div className="feat-card-tint" />
                <div className="feat-card-body">
                  <h3>{f.title}</h3>
                  {f.desc && <p>{f.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
