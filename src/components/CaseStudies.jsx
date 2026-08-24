import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { cases } from '../data/casesData'

export default function CaseStudies({ limit, seeAllHref }) {
  const headerRef = useReveal()
  const visible = limit ? cases.slice(0, limit) : cases
  return (
    <section className="section bg-light" id="projects">
      <div className="container">
        <div ref={headerRef} data-reveal>
          <div className="label">Project portfolio</div>
          <h2 className="display">Work we're proud of.</h2>
        </div>
        <div className="cases-grid">
          {visible.map((c, i) => {
            const delay = ((i % 3) + 1).toString()
            return (
              <CaseCard key={i} c={c} delay={delay} />
            )
          })}
        </div>
        {seeAllHref && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href={seeAllHref} className="btn-outline">View all projects →</a>
          </div>
        )}
      </div>
    </section>
  )
}

function CaseCard({ c, delay }) {
  const ref = useReveal()
  return (
    <article className="case-card" ref={ref} data-reveal data-delay={delay} style={{ position: 'relative' }}>
      <div className="case-photo">
        <img src={c.img} alt={c.alt} loading="lazy" width="700" height="400" />
      </div>
      <div className="case-body">
        <h3>{c.title}</h3>
        <div className="case-meta">
          {c.chips.map(chip => <span className="case-chip" key={chip}>{chip}</span>)}
        </div>
        {c.slug && (
          <Link
            to={`/case-studies/${c.slug}`}
            className="case-view-btn"
          >
            <span>View full project</span>
            <span className="case-view-arrow">→</span>
          </Link>
        )}
      </div>
    </article>
  )
}
