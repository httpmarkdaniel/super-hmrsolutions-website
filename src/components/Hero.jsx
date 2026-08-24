import { useReveal } from '../hooks/useReveal'

export default function Hero() {
  const ref = useReveal()

  return (
    <section className="hero" id="home" aria-label="HMR Solutions Inc.">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content container" ref={ref} data-reveal>
        <div className="hero-eyebrow" aria-hidden="true">Philippines' End-to-End Building Technology Specialists</div>

        <h1 style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(3.8rem, 10vw, 9.5rem)',
          fontWeight: 400,
          lineHeight: 0.95,
          letterSpacing: '0.06em',
          color: '#ffffff',
          margin: '0 0 28px',
        }}>
          HMR SOLUTIONS INC.
        </h1>

        <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>Every system in your building. One partner.</h2>

        <div className="hero-actions">
          <a href="#solutions" className="btn-primary">Explore solutions →</a>
          <a href="#contact" className="btn-ghost">Get a free assessment</a>
        </div>
      </div>
    </section>
  )
}
