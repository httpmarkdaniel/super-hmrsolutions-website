import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { brandsData } from '../data/brandsData'

const toSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const allBrands = Object.entries(brandsData)
  .flatMap(([catKey, cat]) => cat.brands.map(b => ({ ...b, catKey, categoryTitle: cat.title })))
  .sort((a, b) => a.name.localeCompare(b.name))

function BrandLogo({ src, name, size = 52 }) {
  const [errored, setErrored] = useState(false)
  const initials = name.split(/[\s\/&-]/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase()

  if (!src || errored) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(77,157,224,0.15)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: size * 0.3, fontWeight: 800,
        color: '#63aee8', flexShrink: 0, letterSpacing: '-1px',
      }}>
        {initials}
      </div>
    )
  }

  return (
    <img
      src={src} alt={name + ' logo'} onError={() => setErrored(true)}
      style={{
        width: size, height: size, objectFit: 'contain', borderRadius: 10,
        border: '1px solid rgba(255,255,255,0.1)', padding: 8,
        background: '#fff', flexShrink: 0,
      }}
    />
  )
}

function BrandCard({ brand }) {
  return (
    <div id={`brand-${toSlug(brand.name)}`}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '20px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        transition: 'box-shadow var(--t), transform var(--t), border-color var(--t)',
        height: '100%',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,94,184,0.13)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.borderColor = 'var(--blue)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.transform = 'none'
          e.currentTarget.style.borderColor = 'var(--border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BrandLogo src={brand.logo} name={brand.name} size={52} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', lineHeight: 1.2 }}>{brand.name}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 3, fontWeight: 500 }}>{brand.country}</div>
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--blue)', letterSpacing: '.04em', textTransform: 'uppercase' }}>{brand.specialty}</div>
        <p style={{ fontSize: 12.5, color: 'var(--gray-600)', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>{brand.desc}</p>
      </div>
    </div>
  )
}

export default function Brands() {
  const headerRef = useReveal()

  return (
    <section className="section bg-light" id="brands">
      <div className="container">
        <div ref={headerRef} data-reveal style={{ marginBottom: 40 }}>
          <div className="label">Our partners</div>
          <h2 className="display">Brands we build with.</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {allBrands.map(brand => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  )
}
