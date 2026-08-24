import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const solutions = [
  {
    num: '01', slug: 'audio-video-intercoms',
    img: 'https://images.unsplash.com/photo-1630703125102-ba2c078309d9?w=800&q=80&auto=format&fit=crop',
    title: 'Audio / Video Intercoms',
    desc: 'IoT-enabled video door phones and intercom systems for condominiums, office lobbies, and gated communities, with mobile app remote access, elevator control, and smart home integration.',
    chips: ['Mobile App', 'IoT-enabled', 'IP-rated'],
  },
  {
    num: '02', slug: 'cctv',
    img: 'https://images.unsplash.com/photo-1589935447067-5531094415d1?w=800&q=80&auto=format&fit=crop',
    title: 'CCTV System',
    desc: 'HD and IP camera systems (Dome, Bullet, PTZ, Fisheye, Thermal) with centralised recording, remote viewing, and AI video analytics. NDAA-certified options available.',
    chips: ['NDAA Certified', 'Remote View', 'Video Analytics'],
  },
  {
    num: '03', slug: 'pabx',
    img: 'https://images.unsplash.com/photo-1531493731235-b5c309dca387?w=800&q=80&auto=format&fit=crop',
    title: 'PABX System',
    desc: 'Unified voice communications over your existing data network: VoIP, GSM/3G, SIP trunk ready. Scalable from 16 to thousands of extensions. Perpetual license, no yearly renewal.',
    chips: ['VoIP Ready', 'SIP Trunk', 'Scalable'],
  },
  {
    num: '04', slug: 'access-control',
    img: 'https://images.unsplash.com/photo-1776329255945-15212b50cd7f?w=800&q=80&auto=format&fit=crop',
    title: 'Access Control System',
    desc: 'Biometric, RFID, and facial recognition readers with vehicle barriers, pedestrian turnstiles, and intrusion sensors, from a single door to enterprise multi-site with full audit trails.',
    chips: ['Biometric', 'Audit Trail', 'Multi-site'],
  },
  {
    num: '05', slug: 'paging',
    img: 'https://images.unsplash.com/photo-1563680401337-b77b5e0be9f7?w=800&q=80&auto=format&fit=crop',
    title: 'Paging System',
    desc: 'Public address, background music, and emergency evacuation systems, zone-controlled, BFP-compliant, with full amplifier, speaker, and conference room solutions.',
    chips: ['BFP Compliant', 'Zone Control', 'Emergency Evacuation'],
  },
  {
    num: '06', slug: 'nurse-call',
    img: 'https://images.unsplash.com/photo-1623657756153-3104597e7ad8?w=800&q=80&auto=format&fit=crop',
    title: 'Nurse Call System',
    desc: 'Patient call, clinical alarms, emergency response, and patient flow management for hospitals and clinics, with EHR integration, real-time dashboards, and full audit logs.',
    chips: ['Clinical Grade', 'Real-time Alert', 'EHR Integration'],
  },
  {
    num: '07', slug: 'synchronized-clocks',
    img: 'https://images.unsplash.com/photo-1716407574854-aabe59ed80e6?w=800&q=80&auto=format&fit=crop',
    title: 'Synchronized Clocks',
    desc: 'NTP-synchronized master and slave clock systems for hospitals, schools, and airports, ensuring consistent timekeeping across every zone of your facility.',
    chips: ['NTP Sync', 'Multi-zone', 'Hospital Grade'],
  },
  {
    num: '08', slug: 'structured-cabling',
    img: 'https://images.unsplash.com/photo-1591808216268-ce0b82787efe?w=800&q=80&auto=format&fit=crop',
    title: 'Structured Cabling',
    desc: 'Cat 6, Cat 6A copper and fiber optic cabling, designed, installed, and certified to TIA-568 standards. 25-year system warranty available.',
    chips: ['TIA-568', 'Fiber & CAT6', '25-yr Warranty'],
  },
  {
    num: '09', slug: 'fdas',
    img: 'https://images.unsplash.com/photo-1665655034446-1536f6de3fe6?w=800&q=80&auto=format&fit=crop',
    title: 'Fire Detection and Alarm System',
    desc: 'RA 9514 and NFPA-compliant fire alarm systems: conventional, addressable, and VESDA. Inert-gas suppression for high-value areas. BFP permit support included.',
    chips: ['RA 9514', 'NFPA', 'BFP Permit'],
  },
  {
    num: '10', slug: 'fire-suppression',
    img: 'https://images.unsplash.com/photo-1743182937899-6de2c00e3d10?w=800&q=80&auto=format&fit=crop',
    title: 'Fire Suppression System',
    desc: 'Sprinkler, clean agent, and gaseous suppression systems for server rooms, data centers, and commercial spaces, designed to protect property and minimize downtime.',
    chips: ['Sprinkler', 'Clean Agent', 'NFPA'],
  },
  {
    num: '11', slug: 'access-point',
    img: 'https://images.unsplash.com/photo-1691435828932-911a7801adfb?w=800&q=80&auto=format&fit=crop',
    title: 'Wireless Networks',
    desc: 'Self-healing mesh WiFi with access points, ICX switches, and centralized WLAN management. Commscope Ruckus, TP-Link Omada, and Ubiquiti, sized for any building.',
    chips: ['Self-healing Mesh', 'Enterprise', 'Building-wide'],
  },
  {
    num: '12', slug: 'seismic',
    img: 'https://images.unsplash.com/photo-1641213131995-06e2cf0790d8?w=800&q=80&auto=format&fit=crop',
    title: 'Seismic System',
    desc: 'Early-warning seismic detection and alert systems for high-rise buildings and critical infrastructure, providing precious seconds to protect occupants and equipment.',
    chips: ['Early Warning', 'Real-time', 'High-rise Ready'],
  },
  {
    num: '13', slug: 'intrusion',
    img: 'https://images.unsplash.com/photo-1618482914248-29272d021005?w=800&q=80&auto=format&fit=crop',
    title: 'Intrusion System',
    desc: 'Motion detectors, door and window contacts, glass-break sensors, and central monitoring, layered perimeter and interior detection for commercial and residential sites.',
    chips: ['Motion Detect', '24/7 Monitor', 'Perimeter'],
  },
  {
    num: '14', slug: 'parking',
    img: 'https://images.unsplash.com/photo-1764556427406-5a580891febc?w=800&q=80&auto=format&fit=crop',
    title: 'Parking Management System',
    desc: 'Automated entry/exit barriers, LPR cameras, slot guidance displays, and cashless payment integration, streamlining flow and revenue for commercial parking facilities.',
    chips: ['LPR Camera', 'Cashless Pay', 'Automated'],
  },
  {
    num: '15', slug: 'data-rack',
    img: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?w=800&q=80&auto=format&fit=crop',
    title: 'Server Room Fitout',
    desc: 'Complete server room fit-outs: data racks, raised flooring, FM200 gas fire suppression, UPS, precision cooling, and environmental monitoring. Built to last.',
    chips: ['Data Racks', 'Raised Flooring', 'FM200'],
  },
  {
    num: '16', slug: 'rtls',
    img: 'https://images.unsplash.com/photo-1625869736621-784a42674da4?w=800&q=80&auto=format&fit=crop',
    title: 'Real Time Location System',
    desc: 'RTLS tracking for patients, staff, infants, and critical equipment in hospitals, using UWB, BLE, and RFID tags for real-time visibility across your facility.',
    chips: ['UWB / BLE', 'RFID', 'Hospital Grade'],
  },
  {
    num: '17', slug: 'water-leak-detection',
    img: 'https://images.unsplash.com/photo-1538474705339-e87de81450e8?w=800&q=80&auto=format&fit=crop',
    title: 'Water Leak Detection System',
    desc: 'Early-warning water leak detection for server rooms and data centers, sensing cables and spot detectors with real-time alerts before flooding damages critical infrastructure.',
    chips: ['Server Room', 'Real-time Alert', 'TTK & RLE'],
  },
  {
    num: '18', slug: 'preventive-maintenance',
    img: 'https://images.unsplash.com/photo-1628147529780-36964fbb8d54?w=800&q=80&auto=format&fit=crop',
    title: 'Preventive Maintenance',
    desc: 'Scheduled inspection, testing, and servicing programs for all building technology systems, keeping your investment performing reliably and extending equipment lifespan.',
    chips: ['Scheduled', 'All Systems', 'Extended Lifespan'],
  },
]

function SolCard({ sol, openModal }) {
  const cardRef = useRef(null)
  const navigate = useNavigate()

  return (
    <div
      className={`sol-card${sol.tall ? ' tall' : ''}`}
      ref={cardRef}
      onClick={() => navigate(`/solutions/${sol.slug}`)}
      role="listitem"
      style={{ cursor: 'pointer' }}
    >
      <div className="sol-img" style={{ backgroundImage: `url('${sol.img}')` }} aria-hidden="true" />
      <div className="sol-tint" aria-hidden="true" />
      <div className="sol-body">
        <h3>{sol.title}</h3>
        <p>{sol.desc}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <button
            onClick={e => { e.stopPropagation(); openModal(sol.title) }}
            style={{
              padding: '13px 0',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: 'var(--yellow)',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 18px rgba(236,232,14,0.55)',
              width: '100%',
            }}
          >
            Request a Quote
          </button>
          <Link
            to={`/solutions/${sol.slug}`}
            onClick={e => e.stopPropagation()}
            style={{ fontSize: 13.5, fontWeight: 700, color: '#60a5fa', textDecoration: 'none', textAlign: 'center', padding: '6px 0', display: 'block', letterSpacing: '0.02em' }}
          >
            Learn more →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Solutions({ openModal }) {
  const headerRef = useReveal()

  return (
    <section className="section" id="solutions">
      <div className="container" style={{ marginBottom: 48 }} ref={headerRef} data-reveal>
        <div className="label">What we offer</div>
        <h2 className="display">Every system your building needs,<br />from the ground up.</h2>
      </div>
      <div className="sol-grid" role="list">
        {solutions.map(sol => (
          <SolCard
            key={sol.num}
            sol={sol}
            openModal={openModal}
          />
        ))}
      </div>
    </section>
  )
}
