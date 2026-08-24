import About from '../components/About'
import WhyHMR from '../components/WhyHMR'
import { useSEO } from '../hooks/useSEO'

export default function AboutPage() {
  useSEO({
    title: 'About Us | HMR Solutions Philippines',
    description: 'HMR Solutions Inc. — building technology integrators in the Philippines since 2010. Structured cabling, CCTV, FDAS, access control, and more.',
    canonical: '/about',
  })
  return (
    <>
      <About />
      <WhyHMR />
    </>
  )
}
