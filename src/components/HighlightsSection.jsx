import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TransitionLink } from './PageTransitionContext'
import taginMockup from '../assets/taginmockup.png'
import sundarbanImg from '../assets/sundarban.png'
import pawwfyImg from '../assets/pawwfy.png'
import mworldImg from '../assets/mworld.png'
import shapeImg from '../assets/Shape.png'

gsap.registerPlugin(ScrollTrigger)

export default function HighlightsSection() {
  const sectionRef = useRef(null)

  const highlights = [
    {
      id: 1,
      title: 'TAG-IN',
      img: taginMockup,
      alt: 'TAG-IN Shoes Mockup',
      link: '#tag-in',
    },
    {
      id: 2,
      title: 'Sundarban',
      img: sundarbanImg,
      alt: 'Sundarban Eco Platform Mockup',
      link: '#sundarban',
    },
    {
      id: 3,
      title: 'Pawffy',
      img: pawwfyImg,
      alt: 'Pawffy Pet Adoption App Mockup',
      link: '#pawffy',
    },
    {
      id: 4,
      title: 'M-World',
      img: mworldImg,
      alt: 'M-World Digital Experience Mockup',
      link: '#mworld',
    },
  ]

  useGSAP(
    () => {
      // 1. Header & Title Fade Up
      gsap.fromTo(
        '.highlights-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. 2x2 Cards Grid Staggered Reveal Animation (Highly Visible & Prominent)
      gsap.fromTo(
        '.highlight-card',
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.22,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.highlights-grid',
            start: 'top 82%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-white text-black py-24 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 select-none overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        {/* Section Header Div Wrapper */}
        <div className="highlights-header flex flex-col items-center">
          <div className="text-[#FF3D3D] font-clash font-semibold uppercase tracking-widest mb-4 flex items-center justify-center gap-1">
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
            <span className="tracking-[0.25em] text-sm sm:text-base">SELECTED PROJECTS</span>
            <div className="self-end pt-0.5 flex items-center justify-center shrink-0">
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

          {/* Main Heading */}
          <h2 className="font-clash font-medium text-3xl sm:text-5xl md:text-6xl text-center text-black tracking-tight mb-16 md:mb-20">
            From concept to execution
          </h2>
        </div>

        {/* 2x2 Highlights Grid */}
        <div className="highlights-grid grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-6 md:gap-y-8 w-full">
          {highlights.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="highlight-card group flex flex-col w-full text-black cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02]"
            >
              {/* Image Box */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 shadow-md">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title & Diagonal Arrow Bar below image */}
              <div className="flex items-center justify-between pt-4 pb-2 border-b border-transparent group-hover:border-black/20 transition-colors">
                <h3 className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl text-black tracking-tight">
                  {item.title}
                </h3>
                <span className="font-clash text-2xl sm:text-3xl text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* View All Projects CTA Button */}
        <div className="flex justify-center mt-16 md:mt-20">
          <TransitionLink
            to="/projects"
            className="inline-flex items-center gap-3 bg-black text-white font-clash font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 tracking-wider uppercase hover:bg-[#FF3D3D] transition-colors border border-white/10"
          >
            VIEW ALL PROJECTS
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
