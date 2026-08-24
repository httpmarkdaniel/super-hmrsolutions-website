import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { brandsData } from '../data/brandsData'
import { useSEO } from '../hooks/useSEO'

const toSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const allBrands = Object.entries(brandsData)
  .flatMap(([catKey, cat]) => cat.brands.map(b => ({ ...b, catKey, categoryTitle: cat.title })))

function BrandLogo({ src, name, size = 64 }) {
  const [errored, setErrored] = useState(false)
  const initials = name.split(/[\s/&-]/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()
  if (!src || errored) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 12,
        background: 'rgba(77,157,224,0.18)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: size * 0.3, fontWeight: 800, color: '#63aee8',
        letterSpacing: '-1px', flexShrink: 0,
      }}>
        {initials}
      </div>
    )
  }
  return (
    <img
      src={src} alt={name + ' logo'} onError={() => setErrored(true)}
      style={{
        width: size, height: size, objectFit: 'contain', borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.12)', padding: 10,
        background: '#fff', flexShrink: 0,
      }}
    />
  )
}

export default function BrandPage({ openModal }) {
  const { slug } = useParams()
  const brand = allBrands.find(b => toSlug(b.name) === slug)

  useSEO({
    title: brand ? `${brand.name} | HMR Solutions Philippines` : 'Brand | HMR Solutions',
    description: brand ? `${brand.desc.slice(0, 155).trim()}…` : 'Brand partner of HMR Solutions Philippines.',
    canonical: `/brands/${slug}`,
  })

  if (!brand) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 className="display">Brand not found</h2>
        <p style={{ color: 'var(--gray-600)', margin: '16px 0 32px' }}>This brand page doesn't exist.</p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>← Back to home</Link>
      </div>
    )
  }

  const sameCategory = allBrands.filter(b => b.catKey === brand.catKey && b.name !== brand.name)

  return (
    <>
      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: 400, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${brand.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg,rgba(8,14,22,.93) 40%,rgba(8,14,22,.5) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 56 }}>
          <Link
            to="/#brands"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.45)', marginBottom: 20, transition: 'color var(--t)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,.45)'}
          >
            ← Our Brands
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
            <BrandLogo src={brand.logo} name={brand.name} size={64} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--yellow)', marginBottom: 8 }}>
                {brand.categoryTitle}
              </div>
              <h1 style={{ fontFamily: 'var(--font-head,"Bebas Neue")', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 400, color: '#fff', lineHeight: 1, textTransform: 'uppercase', margin: 0 }}>
                {brand.name}
              </h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.55)' }}>{brand.country}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,.3)' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-light, #63aee8)' }}>{brand.specialty}</span>
          </div>
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="section" style={{ paddingBottom: 64 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="label">About this brand</div>
              <h2 className="display" style={{ marginBottom: 16 }}>Why we use {brand.name}</h2>
              <p style={{ color: 'var(--gray-600)', lineHeight: 1.82, textAlign: 'justify' }}>{brand.about}</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                {brand.website && (
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 13 }}
                  >
                    Visit website →
                  </a>
                )}
                {brand.catalogUrl && (
                  <a
                    href={brand.catalogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none', padding: '10px 20px', border: '1px solid var(--blue-light, rgba(99,174,232,0.3))', borderRadius: 6, transition: 'border-color var(--t)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--blue)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--blue-light, rgba(99,174,232,0.3))'}
                  >
                    Downloads & Catalog
                  </a>
                )}
              </div>
            </div>

            <div>
              {/* Applications */}
              <div className="label">Applications</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>Where we install {brand.name}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 36 }}>
                {brand.applications.map(app => (
                  <span key={app} style={{ padding: '7px 14px', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12.5, fontWeight: 500, color: 'var(--gray-600)', background: 'var(--bg-card)' }}>
                    {app}
                  </span>
                ))}
              </div>

              {/* Key Products */}
              <div className="label">Key Products</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 14 }}>What we supply & install</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {brand.keyProducts.map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HMR NOTE ── */}
      <section className="section tight bg-light">
        <div className="container">
          <div style={{
            maxWidth: 760, margin: '0 auto',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--yellow)',
            borderRadius: 10,
            padding: '28px 32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--yellow)' }}>
                HMR Solutions' Take
              </span>
            </div>
            <p style={{ fontSize: 14.5, color: 'var(--gray-600)', lineHeight: 1.78, margin: 0, textAlign: 'justify' }}>
              {brand.hmrNote}
            </p>
            <div style={{ marginTop: 22 }}>
              <button
                onClick={() => openModal?.(brand.name)}
                className="btn-primary"
                style={{ border: 'none', cursor: 'pointer', fontSize: 13 }}
              >
                Request a quote for {brand.name} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED BRANDS ── */}
      {sameCategory.length > 0 && (
        <section className="section tight">
          <div className="container">
            <div className="label">More in {brand.categoryTitle}</div>
            <h2 className="display" style={{ marginBottom: 28 }}>Other brands in this category</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {sameCategory.map(b => (
                <Link
                  key={b.name}
                  to={`/brands/${toSlug(b.name)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 18px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 8,
                    transition: 'border-color var(--t), box-shadow var(--t)',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,94,184,0.12)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <BrandLogo src={b.logo} name={b.name} size={32} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 2 }}>{b.specialty}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
