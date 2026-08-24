import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
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

export default function Clients() {
  const headerRef = useReveal()
  const half = Math.ceil(clientsData.length / 2)
  const row1 = clientsData.slice(0, half)
  const row2 = clientsData.slice(half)
  return (
    <section className="clients-dark" id="clients">
      <div className="container" ref={headerRef} data-reveal style={{ marginBottom: 0, paddingBottom: 0 }}>
        <div className="clients-accent-line" />
        <div className="label">Trusted by</div>
        <h2 className="display">Our Clients.</h2>
      </div>
      <div className="clients-marquee-wrap" aria-label="Our clients">
        <div className="clients-marquee-row go-left" aria-hidden="true">
          {[...row1, ...row1].map((c, i) => <LogoItem key={i} client={c} />)}
        </div>
        <div className="clients-marquee-row go-right" aria-hidden="true">
          {[...row2, ...row2].map((c, i) => <LogoItem key={i} client={c} />)}
        </div>
      </div>
    </section>
  )
}
