import { useParams, Link } from 'react-router-dom'
import { posts } from '../data/blogData'
import { useSEO } from '../hooks/useSEO'

export default function ArticlePage() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  useSEO({
    title: post ? `${post.title} | HMR Solutions` : 'Article | HMR Solutions',
    description: post ? post.excerpt : '',
    canonical: `/blog/${slug}`,
  })

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px' }}>
        <h2 className="display">Article not found</h2>
        <Link to="/blog" className="btn-primary" style={{ display: 'inline-flex', marginTop: 24 }}>â† Back to Articles</Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${post.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,14,22,.2) 0%, rgba(8,14,22,.6) 55%, rgba(8,14,22,.95) 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(236,232,14,.12)', padding: '4px 12px', borderRadius: 20 }}>{post.tag}</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: '#fff', lineHeight: 1.08, textTransform: 'uppercase', maxWidth: 820, margin: 0 }}>{post.title}</h1>
        </div>
      </div>

      {/* Body */}
      <section className="section" style={{ paddingTop: 64, paddingBottom: 96 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 64, alignItems: 'start' }}>

            {/* Article content */}
            <article>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: 'var(--gray-500)', marginBottom: 48, borderLeft: '3px solid var(--yellow)', paddingLeft: 20 }}>
                {post.excerpt}
              </p>
              {post.body.map((section, i) => (
                <div key={i} style={{ marginBottom: 44 }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.35 }}>{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} style={{ fontSize: 15.5, lineHeight: 1.85, color: 'var(--gray-600)', marginBottom: 16, textAlign: 'justify' }}>{p}</p>
                  ))}
                </div>
              ))}
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 20 }}>
                <div className="label" style={{ marginBottom: 12 }}>Get Expert Advice</div>
                <p style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 20 }}>
                  Have questions about implementing these systems in your building? Our engineers are happy to advise.
                </p>
                <a href="/#contact" style={{ display: 'block', textAlign: 'center', padding: '14px 0', borderRadius: 8, background: 'var(--yellow)', color: '#0a0a0a', fontSize: 13, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                  Get a Free Assessment
                </a>
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
                <div className="label" style={{ marginBottom: 16 }}>More Articles</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {posts.filter(p => p.slug !== slug).map(p => (
                    <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{p.tag}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.4 }}>{p.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

