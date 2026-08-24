import CaseStudies from '../components/CaseStudies'
import { useSEO } from '../hooks/useSEO'

export default function CaseStudiesPage() {
  useSEO({
    title: 'Projects & Case Studies | HMR Solutions Philippines',
    description: 'Explore completed building technology projects by HMR Solutions — CCTV, FDAS, structured cabling, PABX, and integrated systems for commercial and institutional clients across the Philippines.',
    canonical: '/case-studies',
  })
  return <CaseStudies />
}
