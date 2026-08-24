import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    q: 'What is structured cabling and why does it matter for my building?',
    a: 'Structured cabling is the standardised, organised cabling infrastructure that carries data, voice, and building system signals throughout your building. Done right during construction, it\'s invisible and lasts 20–25 years. HMR Solutions installs Commscope Systimax, Panduit, YFC-Premium Line, and Belden cabling systems with 25-year system warranties available.',
  },
  {
    q: 'Can you handle the full building technology scope, or only specific systems?',
    a: 'We handle everything — structured cabling, server rooms, mesh WiFi, PABX, PA/BGM, video intercoms, CCTV, FDAS, access control, and nurse call systems. Many of our clients engage us during construction planning so we can coordinate all systems from the roughing-in stage.',
  },
  {
    q: 'What is FDAS and is it required in the Philippines?',
    a: 'FDAS stands for Fire Detection and Alarm System. In the Philippines, FDAS installation is mandated by the Fire Code (Republic Act 9514). The BFP requires a compliant FDAS before issuing a fire safety inspection certificate. HMR installs NFPA-compliant systems and provides documentation support for BFP permit applications.',
  },
  {
    q: 'What areas in the Philippines do you serve?',
    a: 'Our primary service area is Metro Manila — Makati, BGC, Ortigas, Mandaluyong, Quezon City, Pasig, and Muntinlupa. We also take on projects in Cebu, Davao, and other provincial locations. Contact us to discuss your project location.',
  },
  {
    q: 'When should we engage HMR Solutions — during construction or after?',
    a: 'As early as possible. The best time to engage us is during the design or pre-construction stage. This allows our engineers to coordinate with your architect before walls close in, preventing costly rework and ensuring proper conduit sizing for all systems.',
  },
  {
    q: 'Do you offer preventive maintenance contracts?',
    a: 'Yes. We offer quarterly and annual preventive maintenance service (PMS) contracts covering all systems. PMS includes scheduled inspections, cleaning, firmware updates, and priority response for emergency callouts.',
  },
  {
    q: 'What is the difference between an IP PABX and a traditional phone system?',
    a: 'An IP PABX routes calls over your existing data network using VoIP, which significantly reduces costs and adds capabilities like softphones and video calling. HMR Solutions installs Matrix Telecom and astTECS systems.',
  },
  {
    q: 'How long does a typical building technology installation take?',
    a: 'Timeline depends on scope. Single-system installations in occupied buildings typically complete in 1–4 weeks. Full building technology fit-outs for mid-rise buildings typically run 2–6 months alongside construction.',
  },
  {
    q: 'Do you supply the equipment or do we source it ourselves?',
    a: 'We supply everything. HMR Solutions is both a distributor and an integrator, so we source, supply, install, and warrant all equipment under one contract. We carry over 32 international brands.',
  },
  {
    q: 'Can you work on existing buildings, or only new construction?',
    a: 'Both. We regularly take on retrofit and upgrade projects in occupied buildings. Our team is experienced in working around building operations with minimal disruption.',
  },
]

const STEP = 48

export default function FAQ({ limit = 5, seeAllHref }) {
  const [open, setOpen] = useState(null)
  const headerRef = useReveal()
  const visible = faqs.slice(0, limit)

  const toggle = (i) => setOpen(open === i ? null : i)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div ref={headerRef} data-reveal style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="label" style={{ justifyContent: 'center' }}>Resources &amp; FAQ</div>
          <h2 className="display">Common questions answered.</h2>
        </div>

        {/* Ladder layout */}
        <div className="faq-ladder">
          {/* Vertical rail */}
          <div className="faq-rail" />

          {visible.map((faq, i) => (
            <div
              key={i}
              className={`faq-rung${open === i ? ' open' : ''}`}
              style={{ marginLeft: i * STEP }}
            >
              {/* Number circle on the rail */}
              <div className="faq-rung-num">{String(i + 1).padStart(2, '0')}</div>

              {/* Horizontal rung connector */}
              <div className="faq-rung-bar" />

              {/* Card */}
              <div className="faq-rung-card">
                <button
                  className="faq-q"
                  aria-expanded={open === i}
                  onClick={() => toggle(i)}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-a">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>

        {seeAllHref && (
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <a href={seeAllHref} className="btn-outline">See all questions →</a>
          </div>
        )}
      </div>
    </section>
  )
}
