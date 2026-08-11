import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Navbar from '../components/Navbar'
import PricingSection from '../components/PricingSection'
import FAQSection from '../components/FAQSection'
import FooterSection from '../components/FooterSection'
import taginMockup from '../assets/taginmockup.png'
import pawwfyImg from '../assets/pawwfy.png'
import BrandingImg from '../assets/Branding.png'
import PresentationImg from '../assets/Presentation.webp'
import SocialMediaImg from '../assets/Socialmedia.webp'
import CorporateImg from '../assets/Corporates.webp'
import PackagingImg from '../assets/Packaging.webp'
import DigitalMarketingImg from '../assets/DigitalMarketing.webp'
import EcommerceImg from '../assets/Ecommerce.webp'
import PhotographyImg from '../assets/Photography.webp'

// All 10 services matching ServicesSection
const services = [
  { id: 1, name: 'Branding', tagline: 'Where brands find their voice', img: BrandingImg },
  { id: 2, name: 'App Design', tagline: 'Intuitive & human-centered mobile experiences', img: pawwfyImg },
  { id: 3, name: 'Presentation', tagline: 'High-stakes pitch decks that win deals', img: PresentationImg },
  { id: 4, name: 'Social Media', tagline: 'Engaging content & visual campaign strategy', img: SocialMediaImg },
  { id: 5, name: 'Corporate', tagline: 'Enterprise-level brand identity systems', img: CorporateImg },
  { id: 6, name: 'Packaging', tagline: 'Tactile product packaging that stands out on shelves', img: PackagingImg },
  { id: 7, name: 'Web Design', tagline: 'High-converting interactive web experiences', img: taginMockup },
  { id: 8, name: 'Digital Marketing', tagline: 'Data-driven growth & performance creative', img: DigitalMarketingImg },
  { id: 9, name: 'E-Commerce', tagline: 'Seamless online store purchasing flows', img: EcommerceImg },
  { id: 10, name: 'Photography', tagline: 'Cinematic product & editorial portraiture', img: PhotographyImg },
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
    <main ref={pageRef} className="min-h-screen w-full bg-white text-black overflow-x-hidden">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-40 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Header row: big title left, description right */}
        <div className="svc-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12 mb-8 sm:mb-12">
          <h1 className="font-clash font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-black leading-[0.9] tracking-tight shrink-0">
            Services
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-500 max-w-xs leading-relaxed md:pb-2">
            Our design capabilities are applied with clarity and intent. Structured to support both focused work and long-term needs.
          </p>
        </div>

        {/* 2-col card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {services.map((service) => (
            <a
              key={service.id}
              href="/contact"
              className="svc-card group flex flex-col w-full text-black cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title row */}
              <div className="flex items-center justify-between pt-3.5 pb-2 border-b border-transparent group-hover:border-black/20 transition-colors">
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
