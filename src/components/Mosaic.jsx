const images = [
  { src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80&auto=format&fit=crop', alt: 'Server room data center installation Philippines', label: 'Server Room' },
  { src: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=700&q=80&auto=format&fit=crop', alt: 'CCTV surveillance camera installation', label: 'CCTV Surveillance' },
  { src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=80&auto=format&fit=crop', alt: 'Commercial office building security', label: 'Commercial Buildings' },
  { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80&auto=format&fit=crop', alt: 'Structured network cabling installation', label: 'Structured Cabling' },
  { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80&auto=format&fit=crop', alt: 'Hospital healthcare facility systems', label: 'Healthcare Facilities' },
]

export default function Mosaic() {
  return (
    <div className="mosaic" style={{ marginTop: 4 }} aria-hidden="true">
      {images.map((img, i) => (
        <div className="mi" key={i}>
          <img src={img.src} alt={img.alt} loading="lazy" width="700" height="400" />
          <div className="mi-label">{img.label}</div>
        </div>
      ))}
    </div>
  )
}
