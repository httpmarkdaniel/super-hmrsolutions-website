import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoSrc from '../assets/logo.png'
import { brandsData } from '../data/brandsData'

const toSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const brandCategories = Object.entries(brandsData).map(([, cat]) => ({
  category: cat.title,
  brands: cat.brands.slice().sort((a, b) => a.name.localeCompare(b.name)),
}))

const solutionCategories = [
  {
    category: 'Security & Surveillance',
    links: [
      { label: 'CCTV System', slug: 'cctv' },
      { label: 'Access Control System', slug: 'access-control' },
      { label: 'Intrusion System', slug: 'intrusion' },
    ],
  },
  {
    category: 'Communications',
    links: [
      { label: 'Audio / Video Intercoms', slug: 'audio-video-intercoms' },
      { label: 'PABX System', slug: 'pabx' },
      { label: 'Paging System', slug: 'paging' },
      { label: 'Nurse Call System', slug: 'nurse-call' },
    ],
  },
  {
    category: 'IT Infrastructure',
    links: [
      { label: 'Structured Cabling', slug: 'structured-cabling' },
      { label: 'Wireless Networks', slug: 'access-point' },
      { label: 'Server Room Fitout', slug: 'data-rack' },
      { label: 'Water Leak Detection', slug: 'water-leak-detection' },
    ],
  },
  {
    category: 'Fire Safety',
    links: [
      { label: 'Fire Detection and Alarm System', slug: 'fdas' },
      { label: 'Fire Suppression System', slug: 'fire-suppression' },
    ],
  },
  {
    category: 'Building Management',
    links: [
      { label: 'Synchronized Clocks', slug: 'synchronized-clocks' },
      { label: 'Parking Management System', slug: 'parking' },
      { label: 'Real Time Location System', slug: 'rtls' },
      { label: 'Seismic System', slug: 'seismic' },
    ],
  },
  {
    category: 'Services',
    links: [
      { label: 'Preventive Maintenance', slug: 'preventive-maintenance' },
    ],
  },
]

const allSolutionLinks = solutionCategories.flatMap(c => c.links)

function Dropdown({ label, categories, basePath, open, onOpen, onClose, width = 700, closeTimer }) {
  const handleEnter = () => {
    clearTimeout(closeTimer.current)
    onOpen()
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(onClose, 200)
  }

  return (
    <li style={{ position: 'relative' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          display: 'block',
          padding: '6px 12px',
          fontSize: '13.5px',
          fontWeight: 500,
          color: open ? 'var(--ink)' : 'var(--gray-600)',
          borderRadius: 6,
          background: open ? 'rgba(0,0,0,.06)' : 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'color var(--t), background var(--t)',
          whiteSpace: 'nowrap',
        }}
      >
        {label} <span style={{ fontSize: 9, opacity: .6 }}>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
            padding: '16px',
            zIndex: 200,
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(categories.length, 4)}, 1fr)`,
            gap: '0 8px',
          }}
        >
          {categories.map(cat => (
            <div key={cat.category} style={{ paddingBottom: 8 }}>
              <div style={{
                fontSize: 10.5,
                fontWeight: 700,
                color: 'var(--yellow)',
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                padding: '4px 12px 8px',
              }}>
                {cat.category}
              </div>
              {cat.links.map(item => (
                <Link
                  key={item.slug}
                  to={`${item.basePath || basePath}/${item.slug}`}
                  role="menuitem"
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '7px 12px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--gray-600)',
                    borderRadius: 6,
                    transition: 'background var(--t), color var(--t)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,.05)'; e.currentTarget.style.color = 'var(--ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--gray-600)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </li>
  )
}


function BrandsDropdown({ open, onOpen, onClose, closeTimer }) {
  const handleEnter = () => { clearTimeout(closeTimer.current); onOpen() }
  const handleLeave = () => { closeTimer.current = setTimeout(onClose, 200) }

  return (
    <li style={{ position: 'relative' }} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        aria-haspopup="true"
        aria-expanded={open}
        style={{
          display: 'block', padding: '6px 12px', fontSize: '13.5px', fontWeight: 500,
          color: open ? 'var(--ink)' : 'var(--gray-600)', borderRadius: 6,
          background: open ? 'rgba(0,0,0,.06)' : 'none', border: 'none',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color var(--t), background var(--t)', whiteSpace: 'nowrap',
        }}
      >
        Brands <span style={{ fontSize: 9, opacity: .6 }}>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div
          role="menu"
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: '50%',
            transform: 'translateX(-50%)', width: 760,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
            padding: '16px', zIndex: 200,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 8px',
          }}
        >
          {brandCategories.map(cat => (
            <div key={cat.category} style={{ paddingBottom: 8 }}>
              <div style={{
                fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)',
                textTransform: 'uppercase', letterSpacing: '0.09em', padding: '4px 12px 8px',
              }}>
                {cat.category}
              </div>
              {cat.brands.map(b => (
                <a
                  key={b.name}
                  href={`/#brand-${toSlug(b.name)}`}
                  role="menuitem"
                  onClick={onClose}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '7px 12px',
                    fontSize: '13px', fontWeight: 500, color: 'var(--gray-600)',
                    borderRadius: 6, transition: 'background var(--t), color var(--t)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,.05)'; e.currentTarget.style.color = 'var(--ink)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--gray-600)' }}
                >
                  {b.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </li>
  )
}

export default function Navbar({ mobileNavOpen, setMobileNavOpen, scrolled }) {
  const [openDrop, setOpenDrop] = useState(null)
  const closeTimerRef = useRef(null)
  const location = useLocation()

  useEffect(() => { setOpenDrop(null) }, [location])

  const toggle = (name) => setOpenDrop(prev => prev === name ? null : name)
  const close = () => setOpenDrop(null)
  const toggleMobile = () => setMobileNavOpen(o => !o)
  const closeMobile = () => setMobileNavOpen(false)

  const handleHome = () => {
    setMobileNavOpen(false)
    setOpenDrop(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      <div className={`nav-wrap${scrolled ? ' scrolled' : ''}`} id="navWrap">
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <Link to="/" className="logo" onClick={handleHome} aria-label="HMR Solutions — home">
            <div aria-hidden="true" style={{
              width: 42,
              height: 42,
              flexShrink: 0,
              backgroundImage: `url(${logoSrc})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }} />
            <div className="logo-wordmark">
              <strong>HMR Solutions</strong>
            </div>
          </Link>

          <ul className="nav-links" role="list">
            <li>
              <Link to="/" onClick={handleHome}>Home</Link>
            </li>

            <Dropdown
              label="Solutions"
              categories={solutionCategories}
              basePath="/solutions"
              open={openDrop === 'solutions'}
              onOpen={() => setOpenDrop('solutions')}
              onClose={close}
              closeTimer={closeTimerRef}
            />

            <BrandsDropdown
              open={openDrop === 'brands'}
              onOpen={() => setOpenDrop('brands')}
              onClose={close}
              closeTimer={closeTimerRef}
            />
            <li><Link to="/clients">Clients</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/case-studies">Projects</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><a href="/#contact" className="btn-contact nav-link-btn-cta">Contact Us</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <button className="ham" onClick={toggleMobile} aria-label="Toggle menu" aria-expanded={mobileNavOpen}>
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile nav */}
      <div className={`mobile-nav${mobileNavOpen ? ' open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <button className="mob-nav-btn" onClick={handleHome}>Home</button>

        <span className="mob-nav-label">Solutions</span>
        {solutionCategories.map(cat => (
          <div key={cat.category}>
            <div style={{ padding: '6px 16px 2px', fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {cat.category}
            </div>
            {cat.links.map(s => (
              <Link key={s.slug} to={`/solutions/${s.slug}`} onClick={() => setMobileNavOpen(false)} style={{ paddingLeft: 24, fontSize: 13.5 }}>
                {s.label}
              </Link>
            ))}
          </div>
        ))}

        <span className="mob-nav-label">Brands</span>
        {brandCategories.map(cat => (
          <div key={cat.category}>
            <div style={{ padding: '6px 16px 2px', fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {cat.category}
            </div>
            {cat.brands.map(b => (
              <a key={b.name} href={`/#brand-${toSlug(b.name)}`} onClick={closeMobile} style={{ display: 'block', paddingLeft: 24, paddingTop: 6, paddingBottom: 6, fontSize: 13.5, color: 'var(--gray-600)', textDecoration: 'none' }}>
                {b.name}
              </a>
            ))}
          </div>
        ))}
        <Link to="/about" className="mob-nav-btn" onClick={closeMobile}>About Us</Link>
        <Link to="/case-studies" className="mob-nav-btn" onClick={closeMobile}>Projects</Link>
        <Link to="/clients" className="mob-nav-btn" onClick={closeMobile}>Clients</Link>
        <Link to="/blog" className="mob-nav-btn" onClick={closeMobile}>Blogs</Link>
        <Link to="/faq" className="mob-nav-btn" onClick={closeMobile}>FAQs</Link>
        <a href="/#contact" className="mob-nav-btn" onClick={closeMobile}>Contact</a>
        <a href="/#contact" className="mob-nav-btn mob-cta" onClick={closeMobile}>Get a Free Assessment →</a>
      </div>
    </>
  )
}
