import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import shapeImg from '../assets/Shape.png'

gsap.registerPlugin(ScrollTrigger)

export default function FooterSection() {
  const footerRef = useRef(null)

  useGSAP(
    () => {
      // 1. Top Content Grid Entrance Animation
      gsap.fromTo(
        '.footer-grid',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. Huge Bottom Typography Entrance Animation
      gsap.fromTo(
        '.footer-heading',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-heading-container',
            start: 'top 95%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: footerRef }
  )

  return (
    <footer ref={footerRef} className="bg-black text-white pt-20 md:pt-32 pb-8 px-4 sm:px-6 md:px-10 lg:px-12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Content Grid */}
        <div className="footer-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-24 items-start">
          
          {/* Left Column: Brand & Bio */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Logo: askcreations */}
            <div className="flex items-center gap-1 font-clash font-bold text-xl sm:text-2xl text-white tracking-tight mb-6">
              <span>askcreations</span>
              <span className="w-1.5 h-1.5 bg-[#FF3D3D] inline-block shrink-0 -mt-2" />
            </div>

            {/* Bio statement */}
            <p className="font-clash font-semibold text-lg sm:text-xl text-white/90 leading-snug max-w-md">
              Always open to new projects and collaborations — drop a line if you'd like to connect.
            </p>
          </div>

          {/* Middle Column: Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-y-3 gap-x-6 text-sm font-clash font-semibold text-white/90 pt-1">
            <a href="#home" className="hover:text-[#FF3D3D] transition-colors">Home</a>
            <a href="#style-guide" className="hover:text-[#FF3D3D] transition-colors">Style Guide</a>
            <a href="#work" className="hover:text-[#FF3D3D] transition-colors">Work</a>
            <a href="#components" className="hover:text-[#FF3D3D] transition-colors">Components</a>
            <a href="#about" className="hover:text-[#FF3D3D] transition-colors">About</a>
            <a href="#licenses" className="hover:text-[#FF3D3D] transition-colors">Licenses</a>
            <a href="#contact" className="hover:text-[#FF3D3D] transition-colors">Contact</a>
            <a href="#changelog" className="hover:text-[#FF3D3D] transition-colors">Changelog</a>
          </div>

          {/* Right Column: Newsletter Form */}
          <div className="lg:col-span-4 flex flex-col items-start w-full pt-1 lg:pt-0">
            <h3 className="font-clash font-bold text-xl text-white mb-2">
              Stay Connected
            </h3>
            <p className="text-neutral-400 font-clash text-sm leading-relaxed mb-6">
              Subscribe for studio updates, design perspectives, and what's shaping our world.
            </p>

            {/* Email Input & CTA Button */}
            <div className="w-full flex items-center gap-3">
              <input
                type="email"
                placeholder="E-mail"
                className="bg-transparent border-b border-neutral-700 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white w-full transition-colors"
              />
              <Link
                to="/contact"
                className="bg-white text-black font-clash font-bold text-xs uppercase px-6 py-3.5 hover:bg-[#FF3D3D] hover:text-white transition-colors shrink-0"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>

        </div>

        {/* Social Links Row */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-clash font-semibold text-white/90 mb-4">
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#FF3D3D] transition-colors">
            Twitter(X)
          </a>
          <a href="https://www.instagram.com/aman_singh_kaushik_/" target="_blank" rel="noreferrer" className="hover:text-[#FF3D3D] transition-colors">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/amansinghkaushik/" target="_blank" rel="noreferrer" className="hover:text-[#FF3D3D] transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/amansinghkaushik" target="_blank" rel="noreferrer" className="hover:text-[#FF3D3D] transition-colors">
            GitHub
          </a>
        </div>

        {/* Divider Line */}
        <div className="w-full border-b border-neutral-800/90 mb-6 sm:mb-8" />
      </div>

      {/* Huge Typography */}
      <div className="footer-heading-container w-full flex justify-center items-center overflow-hidden border-t border-white/10 pt-4">
        <h1 className="footer-heading text-[13vw] sm:text-[16vw] leading-[0.8] font-semibold uppercase tracking-[-0.04em] text-white whitespace-nowrap select-none font-clash">
          ASK<br/> CREATIONS
        </h1>
      </div>
    </footer>
  )
}
