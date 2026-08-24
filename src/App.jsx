import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import Topbar from './components/Topbar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import FloatingCTAs from './components/FloatingCTAs'
import HomePage from './pages/HomePage'
import SolutionPage from './pages/SolutionPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ProjectPage from './pages/ProjectPage'
import FAQPage from './pages/FAQPage'
import ClientsPage from './pages/ClientsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [modal, setModal] = useState({ open: false, solution: '' })

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openModal = (solution) => setModal({ open: true, solution })
  const closeModal = () => setModal({ open: false, solution: '' })

  return (
    <>
<span className="sr-only">HMR Solutions — Integrated Building Technology Specialists Philippines</span>
      <ScrollToTop />
      <ScrollProgress scrollY={scrollY} />
      <FloatingCTAs scrollY={scrollY} openModal={openModal} />
      <Topbar />
      <Navbar
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        scrolled={scrollY > 10}
      />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage openModal={openModal} />} />
          <Route path="/solutions/:slug" element={<SolutionPage openModal={openModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug" element={<ProjectPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <QuoteModal open={modal.open} solution={modal.solution} onClose={closeModal} />
    </>
  )
}

export default App
