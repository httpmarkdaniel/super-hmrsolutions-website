import { useEffect } from 'react'
import { useSEO } from '../hooks/useSEO'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Solutions from '../components/Solutions'
import Process from '../components/Process'
import About from '../components/About'
import WhyHMR from '../components/WhyHMR'
import CaseStudies from '../components/CaseStudies'
import Testimonials from '../components/Testimonials'
import Brands from '../components/Brands'
import Clients from '../components/Clients'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Contact from '../components/Contact'

const sectionTitles = {
  brands: 'Brands | HMR Solutions',
  about: 'About Us | HMR Solutions',
  contact: 'Contact Us | HMR Solutions',
}

export default function HomePage({ openModal }) {
  useSEO({
    title: 'HMR Solutions | End-to-End Building Technology Philippines',
    description: "Philippines' trusted building technology integrator since 2010. We design, supply, and install structured cabling, CCTV, FDAS, PABX, access control, mesh WiFi, PA systems, and nurse call systems for commercial and institutional projects.",
    canonical: '/',
  })

  useEffect(() => {
    document.title = 'Home | HMR Solutions'

    const updateTitle = () => {
      const scrollMid = window.scrollY + window.innerHeight / 2
      let matched = null

      for (const id of Object.keys(sectionTitles)) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (scrollMid >= top && scrollMid <= bottom) {
          matched = id
          break
        }
      }

      document.title = matched ? sectionTitles[matched] : 'Home | HMR Solutions'
    }

    window.addEventListener('scroll', updateTitle, { passive: true })
    updateTitle()
    return () => {
      window.removeEventListener('scroll', updateTitle)
      document.title = 'Home | HMR Solutions'
    }
  }, [])
  return (
    <>
      <Hero />
      <Ticker />
      <Solutions openModal={openModal} />
      <Process />
      <Brands />
      <Clients />
      <Testimonials />
      <About />
      <WhyHMR />
      <CaseStudies />
      <Blog />
      <FAQ limit={5} />
      <Contact />
    </>
  )
}
