import { useReveal } from '../hooks/useReveal'

const items = [
  {
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
    title: 'True End-to-End',
    desc: 'We handle the full scope, from cable tray design and roughing-in during construction, through to commissioning, user training, and long-term maintenance. No handoffs, no gaps.',
  },
  {
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop',
    title: 'In-House Engineers',
    desc: 'Our own Electronics and Communications Engineers do the work. We don\'t subcontract the technical tasks that matter, so quality and accountability stay with us throughout.',
  },
  {
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
    title: 'Vendor-Neutral Advice',
    desc: 'We carry over 32 global brands across every system category. We recommend what fits your building and budget, not whatever we have excess stock of.',
  },
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop',
    title: 'Built to Last',
    desc: 'Proper design, certified installation, and documented handover. Systems built the right way the first time cost far less to maintain and expand as your building grows.',
  },
]

function WhyCard({ item }) {
  const ref = useReveal()
  return (
    <div className="why-card" ref={ref} data-reveal>
      <div className="why-card-img" style={{ backgroundImage: `url('${item.img}')` }} />
      <div className="why-card-tint" />
      <div className="why-card-body">
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </div>
  )
}

export default function WhyHMR() {
  const headerRef = useReveal()
  return (
    <section className="section clients-dark" id="why">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 48 }} ref={headerRef} data-reveal>
          <div>
            <div className="label">Why HMR Solutions</div>
            <h2 className="display" style={{ maxWidth: 380, marginBottom: 0 }}>One partner for the whole building.</h2>
          </div>
        </div>
        <div className="why-row">
          {items.map(item => (
            <WhyCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
