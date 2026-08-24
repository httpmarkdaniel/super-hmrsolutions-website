import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

export default function NotFoundPage() {
  useSEO({ title: '404 — Page Not Found | HMR Solutions', noindex: true })

  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: 80, fontWeight: 800, color: 'var(--blue)', lineHeight: 1, fontFamily: 'var(--font-head, "Bebas Neue")', letterSpacing: '-2px' }}>404</div>
      <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, margin: '16px 0 12px', color: 'var(--ink)' }}>Page not found</h1>
      <p style={{ color: 'var(--gray-600)', maxWidth: 420, lineHeight: 1.7, marginBottom: 36 }}>
        The page you're looking for doesn't exist or may have moved. Head back to the homepage to find what you need.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>← Back to home</Link>
        <Link to="/#contact" className="btn-ghost" style={{ display: 'inline-flex' }}>Contact us</Link>
      </div>
    </div>
  )
}
