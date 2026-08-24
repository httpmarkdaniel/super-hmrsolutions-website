const items = [
  'Structured Cabling', 'Server Room Infrastructure', 'Mesh WiFi & Networking',
  'IP PABX', 'PA / BGM Systems', 'Video Intercoms', 'CCTV Surveillance',
  'Fire Detection & Alarm', 'Access Control', 'Nurse Call', 'RTLS Solutions', 'Preventive Maintenance',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span className="ti" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
