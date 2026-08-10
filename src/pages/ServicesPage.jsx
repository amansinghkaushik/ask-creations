import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Navbar from '../components/Navbar'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import FooterSection from '../components/FooterSection'
import taginMockup from '../assets/taginmockup.png'
import sundarbanImg from '../assets/sundarban.png'
import pawwfyImg from '../assets/pawwfy.png'
import mworldImg from '../assets/mworld.png'
import creativeImg from '../assets/CreativeImg.png'

// All 10 services from ServicesSection — same data
const services = [
  { id: 1, name: 'Branding', tagline: 'Where brands find their voice', img: taginMockup },
  { id: 2, name: 'App Design', tagline: 'Intuitive & human-centered mobile experiences', img: pawwfyImg },
  { id: 3, name: 'Presentation', tagline: 'High-stakes pitch decks that win deals', img: creativeImg },
  { id: 4, name: 'Social Media', tagline: 'Engaging content & visual campaign strategy', img: sundarbanImg },
  { id: 5, name: 'Corporate', tagline: 'Enterprise-level brand identity systems', img: mworldImg },
  { id: 6, name: 'Packaging', tagline: 'Tactile product packaging that stands out on shelves', img: creativeImg },
  { id: 7, name: 'Web Design', tagline: 'High-converting interactive web experiences', img: taginMockup },
  { id: 8, name: 'Digital Marketing', tagline: 'Data-driven growth & performance creative', img: sundarbanImg },
  { id: 9, name: 'E-Commerce', tagline: 'Seamless online store purchasing flows', img: pawwfyImg },
  { id: 10, name: 'Photography', tagline: 'Cinematic product & editorial portraiture', img: creativeImg },
]

export default function ServicesPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useGSAP(() => {
    gsap.fromTo('.svc-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo('.svc-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.3 })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="min-h-screen w-full bg-white text-black">
      <Navbar />

      <section className="pt-32 md:pt-40 pb-4 px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Header row: big title left, description right */}
        <div className="svc-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-16 mb-8 sm:mb-10">
          <h1 className="font-clash font-medium text-[72px] sm:text-[96px] md:text-[120px] lg:text-[140px] text-black leading-[0.88] tracking-tight shrink-0">
            Services
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-500 max-w-xs leading-relaxed sm:pb-3">
            Our design capabilities are applied with clarity and intent. Structured to support both focused work and long-term needs.
          </p>
        </div>

        {/* 2-col card grid — same card style as ProjectsPage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service) => (
            <a
              key={service.id}
              href="/contact"
              className="svc-card group flex flex-col w-full text-black cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title row */}
              <div className="flex items-center justify-between pt-3 pb-2 border-b border-transparent group-hover:border-black/20 transition-colors">
                <div>
                  <h3 className="font-sans font-semibold text-xl sm:text-2xl md:text-3xl text-black tracking-tight">
                    {service.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-400 mt-0.5">{service.tagline}</p>
                </div>
                <span className="font-clash text-xl sm:text-2xl text-black shrink-0 ml-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </main>
  )
}
