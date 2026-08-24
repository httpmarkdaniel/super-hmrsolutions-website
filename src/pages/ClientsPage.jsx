import { useState } from 'react'
import { useSEO } from '../hooks/useSEO'
import { clientsData } from '../data/clientsData'

function LogoItem({ client }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="clients-marquee-item">
      <img src={client.logo} alt={client.name} onError={() => setFailed(true)} />
    </div>
  )
}

export default function ClientsPage() {
  useSEO({
    title: 'Our Clients | HMR Solutions',
    description: 'Trusted by leading companies across healthcare, real estate, hospitality, banking, government, and more.',
    canonical: '/clients',
  })
  const half = Math.ceil(clientsData.length / 2)
  const row1 = clientsData.slice(0, half)
  const row2 = clientsData.slice(half)
  return (
    <div
      className="clients-dark"
      style={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1443527394413-4b820fd08dde?w=1920&q=85&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,14,22,0.52)', zIndex: 0 }} aria-hidden="true" />
      <div className="container" style={{ marginBottom: 0, position: 'relative', zIndex: 1 }}>
        <div className="clients-accent-line" />
        <div className="label">Trusted by</div>
        <h2 className="display">Our Clients.</h2>
      </div>
      <div className="clients-marquee-wrap" style={{ position: 'relative', zIndex: 1 }} aria-label="Our clients">
        <div className="clients-marquee-row go-left" aria-hidden="true">
          {[...row1, ...row1].map((c, i) => <LogoItem key={i} client={c} />)}
        </div>
        <div className="clients-marquee-row go-right" aria-hidden="true">
          {[...row2, ...row2].map((c, i) => <LogoItem key={i} client={c} />)}
        </div>
      </div>
    </div>
  )
}
