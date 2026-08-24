import { useParams, Link } from 'react-router-dom'
import { cases } from '../data/casesData'
import { useSEO } from '../hooks/useSEO'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = cases.find(c => c.slug === slug)

  useSEO({
    title: project ? `${project.title} | HMR Solutions` : 'Project Not Found | HMR Solutions',
    description: project ? project.desc : undefined,
    canonical: project ? `/case-studies/${slug}` : undefined,
    noindex: !project,
  })

  if (!project) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <h2 style={{ color: 'var(--ink)' }}>Project not found.</h2>
        <Link to="/case-studies" style={{ color: 'var(--blue)' }}>← Back to Projects</Link>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 80 }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 440, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${project.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,14,22,.96) 0%, rgba(8,14,22,.55) 55%, rgba(8,14,22,.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
            {project.tag}
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.9rem)', fontFamily: '"Bebas Neue", sans-serif', fontWeight: 400, letterSpacing: '0.04em', color: '#fff', margin: '0 0 18px', lineHeight: 1.1 }}>
            {project.title}
          </h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.chips.map(chip => (
              <span key={chip} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: 'rgba(99,174,232,0.18)', color: 'var(--blue)', border: '1px solid rgba(99,174,232,0.3)' }}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ padding: '56px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 48, alignItems: 'start' }}>

          {/* Main content */}
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>Project Overview</h2>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.78, marginBottom: 36 }}>
              {project.desc}
            </p>

            {/* Scope of work */}
            {project.scope && (
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 16 }}>
                  Scope of Work
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {project.scope.map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.65 }}>
                      <span style={{ color: 'var(--blue)', flexShrink: 0, marginTop: 2, fontWeight: 700 }}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <div style={{ padding: '20px 22px', borderRadius: 12, background: 'var(--bg-surface)', border: '1px solid var(--border)', borderLeft: '3px solid var(--blue)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 10 }}>
                  Outcome
                </div>
                <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.75, margin: 0 }}>
                  {project.outcome}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Project details */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: 'var(--ink)', marginBottom: 18 }}>Project Details</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 4 }}>Sector</div>
                  <div style={{ fontSize: 13.5, color: 'var(--gray-600)' }}>{project.tag}</div>
                </div>
                {project.location && (
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 4 }}>Location</div>
                    <div style={{ fontSize: 13.5, color: 'var(--gray-600)' }}>{project.location}</div>
                  </div>
                )}
                {project.year && (
                  <div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 4 }}>Year</div>
                    <div style={{ fontSize: 13.5, color: 'var(--gray-600)' }}>{project.year}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 }}>Systems Installed</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.chips.map(chip => (
                      <span key={chip} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'rgba(99,174,232,0.1)', color: 'var(--blue)', border: '1px solid rgba(99,174,232,0.2)' }}>
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '22px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 8 }}>Have a similar project?</div>
              <p style={{ fontSize: 12.5, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 16 }}>
                Our engineers can assess your site and recommend the right systems for your building.
              </p>
              <a
                href="/#contact"
                style={{ display: 'block', textAlign: 'center', padding: '10px 0', borderRadius: 8, background: 'var(--yellow)', color: '#0a0a0a', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
              >
                Get a Free Assessment
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
