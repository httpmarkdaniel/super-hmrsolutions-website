import { Link } from 'react-router-dom'
import { brandsData } from '../data/brandsData'
import logoSrc from '../assets/logo.png'

const solutions = [
  { title: 'Audio / Video Intercoms', slug: 'audio-video-intercoms' },
  { title: 'CCTV System', slug: 'cctv' },
  { title: 'PABX System', slug: 'pabx' },
  { title: 'Access Control System', slug: 'access-control' },
  { title: 'Paging System', slug: 'paging' },
  { title: 'Nurse Call System', slug: 'nurse-call' },
  { title: 'Synchronized Clocks', slug: 'synchronized-clocks' },
  { title: 'Structured Cabling', slug: 'structured-cabling' },
  { title: 'Fire Detection & Alarm System', slug: 'fdas' },
  { title: 'Fire Suppression System', slug: 'fire-suppression' },
  { title: 'Wireless Networks', slug: 'access-point' },
  { title: 'Seismic System', slug: 'seismic' },
  { title: 'Intrusion System', slug: 'intrusion' },
  { title: 'Parking Management System', slug: 'parking' },
  { title: 'Server Room Fitout', slug: 'data-rack' },
  { title: 'Real Time Location System', slug: 'rtls' },
  { title: 'Water Leak Detection System', slug: 'water-leak-detection' },
  { title: 'Preventive Maintenance', slug: 'preventive-maintenance' },
]

const allBrands = Object.values(brandsData)
  .flatMap(cat => cat.brands)
  .sort((a, b) => a.name.localeCompare(b.name))

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner" style={{ gridTemplateColumns: '2fr 1fr 2fr 1.1fr' }}>
        <div className="footer-brand">
          <div className="logo">
            <div style={{
                width: 42,
                height: 42,
                flexShrink: 0,
                backgroundImage: `url(${logoSrc})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }} />
            <div className="logo-wordmark">
              <strong style={{ color: '#fff' }}>HMR Solutions</strong>
              <span>End-to-End Building Technology</span>
            </div>
          </div>
          <div className="footer-contacts">
            <a href="tel:+63286240526">📞 &nbsp;(63 2) 8624-0526 loc. 410</a>
            <a href="tel:+63284040129">📞 &nbsp;(63 2) 8404-0129 (Direct)</a>
            <a href="mailto:info@hmrsolutions.net">✉️ &nbsp;info@hmrsolutions.net</a>
            <a href="#">📍 &nbsp;Mandaluyong City, Philippines</a>
          </div>
        </div>

        <div className="footer-col">
          <h6>Solutions</h6>
          <ul>
            {solutions.map(s => (
              <li key={s.slug}>
                <Link to={`/solutions/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h6>Brands</h6>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px' }}>
            {allBrands.map(b => (
              <li key={b.name} style={{ color: 'var(--gray-600)', fontSize: 13.5 }}>{b.name}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h6>Company</h6>
          <ul>
            <li><a href="/#about">About HMR Solutions</a></li>
            <li><Link to="/case-studies">Our Portfolio</Link></li>
            <li><a href="/#brands">Brands We Carry</a></li>
            <li><Link to="/faq">FAQs & Resources</Link></li>
            <li><a href="/#contact">Contact Us</a></li>
          </ul>
          <h6 style={{ marginTop: 24 }}>Service Areas</h6>
          <ul>
            {['Makati & BGC', 'Ortigas & Mandaluyong', 'Quezon City & Pasig', 'Cebu & Davao'].map(a => (
              <li key={a}><a href="/#contact">{a}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 HMR Solutions, Inc. All rights reserved.</span>
        <span>End-to-End Building Technology · Philippines</span>
      </div>
    </footer>
  )
}
