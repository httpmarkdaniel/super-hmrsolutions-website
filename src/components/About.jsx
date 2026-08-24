import { useReveal } from '../hooks/useReveal'


export default function About() {
  const copyRef = useReveal()
  return (
    <section id="about">
      <div className="about-split">

        {/* Animated photo */}
        <div className="about-photo">
          <img
            src="/final%20logo.jpg"
            alt="HMR Solutions"
            className="about-photo-img"
          />
        </div>

        {/* Copy */}
        <div className="about-copy" ref={copyRef} data-reveal>
          <div className="label">Who we are</div>
          <h2 className="display">Building technology done right,<br />since 2010.</h2>

          <p className="about-body">
            HMR Solutions Inc. (HMRSI) is the communications and security division of the HMR Group of Companies, a diversified corporation with affiliates in the retail, auctions, construction, environmental recycling, and metal fabrication businesses, turning over ₱5 billion per year. HMRSI specializes in the infrastructure that makes buildings work, from structured cabling (copper and fiber), network implementation, fire detection, access control, security cameras, public address systems, PABX, condominium intercoms and hospital nurse call systems. HMRSI can provide virtually all auxiliaries for a new and existing structure. We have on staff a design team that includes experienced licensed engineers and an AutoCAD draftsman so we can design your building and network according to your requirements. We supply international quality equipment and materials.
          </p>
          <p className="about-body">
            We act as both a distributor and an integrator/installer. We stand behind our products and offer warranty and preventive maintenance programs for after sales service. Our principals are primarily from the U.S., Europe and Korea. HMR Solutions, Inc. began as the communication and security division of the HMR Group. It has since expanded to fit-out services as well as ELV solutions. Thus we offer complete design, fit-out and installation of auxiliaries. These include structured cabling, FDAS, Access Control and CCTV, Systems, Intercoms and Hospital Nurse Call Systems, PABX, PA/BGM, and Building Management.
          </p>

        </div>

      </div>
    </section>
  )
}
