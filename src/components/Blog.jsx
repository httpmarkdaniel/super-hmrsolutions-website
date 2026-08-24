import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { posts } from '../data/blogData'

function ArticleCard({ post, delay, featured }) {
  const ref = useReveal()
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <article
        className={`blog-article-card${featured ? ' featured' : ''}`}
        ref={ref}
        data-reveal
        data-delay={delay}
        style={{ cursor: 'pointer' }}
      >
        <div className="blog-article-img" style={{ backgroundImage: `url('${post.img}')` }} />
        <div className="blog-article-tint" />
        <div className="blog-article-body">
          <div className="blog-article-meta">
            <span className="blog-tag-pill">{post.tag}</span>
            <span className="blog-read-time">{post.readTime}</span>
          </div>
          <h3 className="blog-article-title">{post.title}</h3>
          <p className="blog-article-excerpt">{post.excerpt}</p>
          <span className="blog-cta">Read full article →</span>
        </div>
      </article>
    </Link>
  )
}

export default function Blog({ limit, seeAllHref }) {
  const headerRef = useReveal()
  const visible = limit ? posts.slice(0, limit) : posts
  const [featured, ...rest] = visible

  return (
    <section className="section" id="resources">
      <div className="container">
        <div ref={headerRef} data-reveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label" style={{ justifyContent: 'center' }}>Articles</div>
          <h2 className="display">Building Technology Insights.</h2>
        </div>

        {/* Featured — full width */}
        {featured && <ArticleCard post={featured} delay="1" featured />}

        {/* Remaining — same style, 2 columns */}
        {rest.length > 0 && (
          <div className="blog-grid" style={{ marginTop: 24 }}>
            {rest.map((post, i) => (
              <ArticleCard key={i} post={post} delay={(i + 2).toString()} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
