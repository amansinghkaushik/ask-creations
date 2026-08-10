import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import taginMockup from '../assets/taginmockup.png'
import sundarbanImg from '../assets/sundarban.png'
import pawwfyImg from '../assets/pawwfy.png'
import mworldImg from '../assets/mworld.png'
import creativeImg from '../assets/CreativeImg.png'
import shapeImg from '../assets/Shape.png'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState(1)
  const sectionRef = useRef(null)

  const services = [
    {
      id: 1,
      name: 'Branding',
      tagline: 'Where brands find their voice',
      img: taginMockup,
    },
    {
      id: 2,
      name: 'App Design',
      tagline: 'Intuitive & human-centered mobile experiences',
      img: pawwfyImg,
    },
    {
      id: 3,
      name: 'Presentation',
      tagline: 'High-stakes pitch decks that win deals',
      img: creativeImg,
    },
    {
      id: 4,
      name: 'Social Media',
      tagline: 'Engaging content & visual campaign strategy',
      img: sundarbanImg,
    },
    {
      id: 5,
      name: 'Corporate',
      tagline: 'Enterprise-level brand identity systems',
      img: mworldImg,
    },
    {
      id: 6,
      name: 'Packaging',
      tagline: 'Tactile product packaging that stands out on shelves',
      img: creativeImg,
    },
    {
      id: 7,
      name: 'Web Design',
      tagline: 'High-converting interactive web experiences',
      img: taginMockup,
    },
    {
      id: 8,
      name: 'Digital Marketing',
      tagline: 'Data-driven growth & performance creative',
      img: sundarbanImg,
    },
    {
      id: 9,
      name: 'E-Commerce',
      tagline: 'Seamless online store purchasing flows',
      img: pawwfyImg,
    },
    {
      id: 10,
      name: 'Photography',
      tagline: 'Cinematic product & editorial portraiture',
      img: creativeImg,
    },
  ]

  const activeService = services.find((s) => s.id === activeServiceId) || services[0]

  useGSAP(
    () => {
      // 1. Left Sticky Card Entrance
      gsap.fromTo(
        '.services-preview-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. Right Vertical Services List Staggered Entrance
      gsap.fromTo(
        '.service-list-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.service-list-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-black text-white py-20 md:py-32 px-6 sm:px-10 md:px-12 lg:px-16 select-none relative">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        
        {/* Left Column: Interactive Service Preview Card (Sticky at top on mobile + desktop) */}
        <div className="services-preview-card lg:col-span-4 sticky top-16 z-30 bg-black/95 backdrop-blur-md pt-2 pb-4 lg:py-0 border-b border-neutral-900 lg:border-none lg:top-28 flex flex-col items-start w-full gap-3 lg:gap-4 self-start">
          
          {/* Section Header Div Wrapper matching TestimonialsSection */}
          <div className="text-[#FF3D3D] font-clash font-semibold uppercase tracking-widest mb-2 lg:mb-4 flex items-center justify-start gap-1">
            {/* Left Shape Div Wrapper (Aligned to BOTTOM) */}
            <div className="self-end pt-0.5 flex items-center justify-center shrink-0">
              <span
                className="w-2 h-2 bg-[#FF3D3D] rotate-180 inline-block shrink-0"
                style={{
                  maskImage: `url(${shapeImg})`,
                  WebkitMaskImage: `url(${shapeImg})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>

            {/* Header Text Div Wrapper */}
            <div className="flex items-center justify-center">
              <span className="tracking-[0.25em] text-xs sm:text-base">SERVICES</span>
            </div>

            {/* Right Shape Div Wrapper (Aligned to TOP) */}
            <div className="self-start pb-0.5 flex items-center justify-center shrink-0">
              <span
                className="w-2 h-2 bg-[#FF3D3D] inline-block shrink-0"
                style={{
                  maskImage: `url(${shapeImg})`,
                  WebkitMaskImage: `url(${shapeImg})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                }}
              />
            </div>
          </div>

          {/* Image Preview Box - Compact on mobile (reduced height & width) */}
          <div className="relative w-1/2 sm:w-2/3 lg:w-full aspect-[4/3] max-h-[150px] sm:max-h-[200px] lg:max-h-none overflow-hidden bg-neutral-900 rounded-sm">
            <img
              src={activeService.img}
              alt={activeService.name}
              className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
            />
          </div>

          {/* Service Details below image */}
          <div className="flex flex-col items-start gap-1 sm:gap-2 pt-1">
            <span className="text-neutral-500 font-clash font-medium text-[10px] sm:text-xs uppercase tracking-wider">
              {activeService.name}
            </span>
            <h3 className="text-white font-clash font-semibold text-sm sm:text-base md:text-xl leading-snug">
              {activeService.tagline}
            </h3>
            {/* Work with us CTA — matching FAQSection Get in touch style */}
            <Link
              to="/services"
              className="text-[#FF3D3D] font-clash font-semibold text-xs sm:text-sm tracking-wide inline-flex items-center gap-1 hover:text-white transition-colors group mt-1 sm:mt-2"
            >
              <div className="self-start flex items-center justify-center shrink-0">
                <span
                  className="w-2 h-2 rotate-270 bg-[#FF3D3D] group-hover:bg-white transition-colors inline-block shrink-0"
                  style={{
                    maskImage: `url(${shapeImg})`,
                    WebkitMaskImage: `url(${shapeImg})`,
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                  }}
                />
              </div>
              <div className="flex items-center">
                <span className="underline underline-offset-4">Explore our services</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Medium Typography List of Services (Col Span 8 ~67% width) */}
        <div className="service-list-container mt-6 lg:mt-20 lg:col-span-8 flex flex-col w-full divide-y divide-neutral-900 border-t border-b border-neutral-900">
          {services.map((service) => {
            const isActive = service.id === activeServiceId

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveServiceId(service.id)}
                onClick={() => setActiveServiceId(service.id)}
                className="service-list-item group py-4 sm:py-5 md:py-6 cursor-pointer flex items-center justify-between transition-colors duration-300"
              >
                <div className="flex items-center">
                  <h2
                    className={`font-clash text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-normal transition-all duration-300 ${
                      isActive
                        ? 'text-white font-semibold ml-4'
                        : 'text-neutral-700 font-medium hover:text-neutral-400'
                    }`}
                  >
                    {service.name}
                  </h2>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
