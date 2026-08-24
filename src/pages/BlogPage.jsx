import Blog from '../components/Blog'
import { useSEO } from '../hooks/useSEO'

export default function BlogPage() {
  useSEO({
    title: 'Blog | HMR Solutions Philippines',
    description: 'Insights, guides, and updates on building technology from the HMR Solutions engineering team — structured cabling, CCTV, FDAS, PABX, and more.',
    canonical: '/blog',
  })
  return <Blog />
}
