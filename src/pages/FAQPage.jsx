import FAQ from '../components/FAQ'
import { useSEO } from '../hooks/useSEO'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is structured cabling and why does it matter for my building?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Structured cabling is the standardised, organised cabling infrastructure that carries data, voice, and building system signals throughout your building. HMR Solutions installs Commscope Systimax, Panduit, YFC-Premium Line, and Belden cabling systems with 25-year system warranties available.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you handle the full building technology scope, or only specific systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We handle everything — structured cabling, server rooms, mesh WiFi, PABX, PA/BGM, video intercoms, CCTV, FDAS, access control, and nurse call systems. We can take on a single system or the full building technology package.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is FDAS and is it required in the Philippines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FDAS stands for Fire Detection and Alarm System. In the Philippines, FDAS installation is mandated by the Fire Code (Republic Act 9514) for commercial buildings, condominiums, hospitals, hotels, and schools. HMR Solutions installs NFPA-compliant systems using Kidde, Siemens, Notifier by Honeywell, and Asenware.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas in the Philippines do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our primary service area is Metro Manila — Makati, BGC, Ortigas, Mandaluyong, Quezon City, Pasig, and Muntinlupa. We also take on projects in Cebu, Davao, and other provincial locations depending on scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'When should we engage HMR Solutions — during construction or after?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As early as possible. The best time to engage us is during the design or pre-construction stage so our engineers can coordinate with your architect and contractor on conduit routing, cable pathways, and equipment room sizing before walls close in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer preventive maintenance contracts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer quarterly and annual preventive maintenance service (PMS) contracts covering all systems — structured cabling, WiFi, PABX, FDAS, CCTV, access control, PA/BGM, and nurse call.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an IP PABX and a traditional phone system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A traditional PABX routes calls over physical phone lines. An IP PABX routes calls over your existing data network using VoIP, which significantly reduces costs and adds capabilities like softphones, video calling, and CRM integration.',
      },
    },
  ],
}

export default function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions | HMR Solutions Philippines',
    description: 'Answers to common questions about structured cabling, FDAS, PABX, CCTV, access control, and building technology from HMR Solutions — Philippines\' end-to-end integrator since 2010.',
    canonical: '/faq',
    schema: faqSchema,
    schemaId: 'faq-schema',
  })
  return <FAQ />
}
