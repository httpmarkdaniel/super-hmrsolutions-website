import { useReveal } from '../hooks/useReveal'

const testimonials = [
  {
    body: "HMR Solutions handled the full cabling and nurse call installation across multiple ward expansions. Their team works cleanly, documents everything properly, and the systems have been running without issues since day one.",
    initials: 'AP', name: 'Axle Rhon Purugganan', title: 'Machine Learning Engineer, HMR Philippines',
  },
  {
    body: "What we value most is that they think about the whole building, not just the one system they're installing that day. HMR understands how everything connects, and that's rare. Our PMS contract has been completely seamless.",
    initials: 'JM', name: 'Jude Michael Maagad', title: 'Junior Front-End Developer, HMR Philippines',
  },
  {
    body: "We needed a contractor who could roll out consistently across multiple cities, same quality, same documentation, same process in every location. HMR delivered exactly that. They're now our standard building technology partner.",
    initials: 'AM', name: 'Alexander Mojica', title: 'Full-Stack Developer, HMR Philippines',
  },
]

function TestCard({ t, delay }) {
  const ref = useReveal()
  return (
    <div className="test-card" ref={ref} data-reveal data-delay={delay}>
      <p className="test-body">{t.body}</p>
      <div className="test-author">
        <div className="test-avatar">{t.initials}</div>
        <div>
          <div className="test-name">{t.name}</div>
          <div className="test-title">{t.title}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const headerRef = useReveal()
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div ref={headerRef} data-reveal>
          <div className="label">What clients say</div>
          <h2 className="display">Trusted. Recommended. Retained.</h2>
        </div>
        <div className="test-grid">
          {testimonials.map((t, i) => (
            <TestCard key={i} t={t} delay={(i + 1).toString()} />
          ))}
        </div>
      </div>
    </section>
  )
}
