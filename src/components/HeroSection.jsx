import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import heroImg from '../assets/HeroImg.png'
import AvatarImg from '../assets/AvatarImg.jpeg'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef(null)

  // Track window width for responsive B&W cutout box sizing
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1280
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dynamic Cutout Position & Dimensions (percentages per breakpoint)
  const getCutout = () => {
    if (windowWidth < 640) {
      // Mobile screens
      return { top: 20, left: 32, width: 48, height: 18 }
    } else if (windowWidth < 1024) {
      // Tablet / small screens
      return { top: 18, left: 36, width: 38, height: 20 }
    } else if (windowWidth < 1440) {
      // 13" MacBook / standard laptops (original perfect ratio)
      return { top: 16, left: 40, width: 30, height: 20 }
    } else {
      // Large screens / 4K desktops
      return { top: 15, left: 42, width: 26, height: 20 }
    }
  }

  const cutout = getCutout()

  useGSAP(
    () => {
      // 1. Entry Animation Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } })

      // Step 1: Hero Image appears smoothly
      tl.from('.hero-image-bg', {
        y: 70,
        opacity: 0,
        scale: 0.95,
        duration: 1.3,
      })

      // Step 2: Bottom Text (ASK & CREATIONS)
      tl.from(
        '.hero-line-1',
        {
          y: 80,
          opacity: 0,
          duration: 1.1,
        },
        '-=0.7'
      ).from(
        '.hero-line-2',
        {
          y: 90,
          opacity: 0,
          duration: 1.1,
        },
        '-=0.8'
      )

      // Step 3: Center Horizontal Services Bar text appears from bottom (clipped)
      tl.from(
        '.hero-services-item',
        {
          y: '100%',
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
        },
        '-=0.5'
      )

      // Step 4: Left Paragraph expands left-to-right + Social icons top-to-bottom + CTA Block right-to-left AT THE SAME TIME
      tl.fromTo(
        '.hero-left-para',
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          opacity: 0,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
        .from(
          '.hero-social-icon',
          {
            y: -30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
          },
          '<'
        )
        .from(
          '.hero-cta-block',
          {
            x: 60,
            opacity: 0,
            duration: 1.1,
          },
          '<'
        )

      // 2. Pin HeroSection for 100vh until ManifestoSection covers it completely
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: false,
      })
    },
    { scope: containerRef }
  )

  // Calculated Inset values for clipping out the 5px blur inside the rectangle
  const topPct = cutout.top
  const leftPct = cutout.left
  const rightPct = Math.max(0, 100 - cutout.left - cutout.width)
  const bottomPct = Math.max(0, 100 - cutout.top - cutout.height)

  return (
    <section
      ref={containerRef}
      className="relative z-0 w-full h-screen bg-[#FF3D3D] overflow-hidden flex flex-col justify-end select-none pt-20"
    >
      {/* Hero Content Wrapper */}
      <div className="relative w-full h-full flex flex-col justify-end">
        {/* Layer 1: Crisp Clear Background Hero Cutout Image (0 Blur: z-10) */}
        <div className="absolute bottom-[-160px] left-[50%] -translate-x-1/2 h-[150vh] md:h-[150vh] lg:h-[150vh] z-10 pointer-events-none flex items-end justify-center">
          <img
            src={heroImg}
            alt="Hero Cutout Background"
            className="hero-image-bg h-full w-auto max-w-none object-contain object-bottom"
          />
        </div>

        {/* Layer 1.5: 5px Backdrop Blur Layer */}
        <div
          className="absolute inset-0 w-full h-full z-15 backdrop-blur-[5px] pointer-events-none"
          style={{
            clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, ${leftPct}% ${topPct}%, ${leftPct}% ${100 - bottomPct}%, ${100 - rightPct}% ${100 - bottomPct}%, ${100 - rightPct}% ${topPct}%, ${leftPct}% ${topPct}%)`,
          }}
        />

        {/* Layer 1.8: Combined Soft Desaturated B&W Backdrop Box + EST. 2026 Badge Wrapper */}
        <div
          className="absolute z-18 pointer-events-none"
          style={{
            top: `${cutout.top}%`,
            left: `${cutout.left}%`,
            width: `${cutout.width}%`,
            height: `${cutout.height}%`,
          }}
        >
          {/* Softened B&W Desaturated Backdrop Filter */}
          <div
            className="w-full h-full"
            style={{
              backdropFilter: 'grayscale(100%) contrast(105%) brightness(100%)',
              WebkitBackdropFilter: 'grayscale(100%) contrast(105%) brightness(100%)',
            }}
          />

          {/* EST. 2026 Vertical Badge Aligned to Bottom End */}
          <div className="absolute right-[-10px] bottom-1 text-white/80 font-clash text-[10px] sm:text-[11px] tracking-[0.25em] font-medium uppercase rotate-90 origin-bottom-right whitespace-nowrap">
            EST. 2026
          </div>
        </div>

        {/* Layer 1.85: Left Paragraph Aligned with Date/Time */}
        <div className="hero-left-para absolute left-4 sm:left-6 md:left-10 lg:left-12 top-[10%] sm:top-[10%] md:top-[10%] max-w-[50%] sm:max-w-[320px] md:max-w-[450px] lg:max-w-[600px] z-20 pointer-events-auto overflow-hidden">
          <p className="text-white/95 font-normal text-[11px] sm:text-xs md:text-sm lg:text-base leading-snug sm:leading-relaxed tracking-wide">
            We Design Brands, Products and Digital experience for companies that refuse mediocrity. Creative precision. Enterprise Scale. Built to move Business forward.
          </p>
        </div>

        {/* Layer 1.85: Right Social Links Aligned with Menu Button */}
        <div className="absolute right-4 sm:right-6 md:right-10 lg:right-12 top-[12%] sm:top-[11.5%] md:top-[11%] z-20 flex flex-col items-center gap-6 sm:gap-7 md:gap-8 pointer-events-auto">
          <a href="https://www.linkedin.com/in/amansinghkaushik/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-social-icon hover:scale-110 transition-transform p-1 sm:p-0">
            <svg className="w-5 h-5 fill-current text-white hover:text-white/80 transition-colors" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="https://github.com/amansinghkaushik" target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-social-icon hover:scale-110 transition-transform p-1 sm:p-0">
            <svg className="w-5 h-5 fill-current text-white hover:text-white/80 transition-colors" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/aman_singh_kaushik_/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hero-social-icon hover:scale-110 transition-transform p-1 sm:p-0">
            <svg className="w-5 h-5 fill-current text-white hover:text-white/80 transition-colors" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="https://whatsapp.com" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hero-social-icon hover:scale-110 transition-transform p-1 sm:p-0">
            <svg className="w-5 h-5 fill-current text-white hover:text-white/80 transition-colors" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.642-.981z" />
            </svg>
          </a>
        </div>

        {/* Layer 1.9: Center Horizontal Services Bar */}
        <div className="absolute top-[48%] -translate-y-1/2 w-full px-4 sm:px-6 md:px-10 lg:px-12 z-20 flex justify-between items-center text-neutral-200 font-clash font-semibold text-[10px] sm:text-xs md:text-xs lg:text-sm tracking-wide uppercase overflow-hidden py-2 gap-1 sm:gap-2">
          <div className="overflow-hidden inline-block">
            <span className="hero-services-item inline-block hover:text-white transition-colors duration-300 cursor-pointer">
              Brand Identity
            </span>
          </div>
          <div className="overflow-hidden inline-block">
            <span className="hero-services-item inline-block hover:text-white transition-colors duration-300 cursor-pointer">
              Web & App Experiences
            </span>
          </div>
          <div className="overflow-hidden inline-block">
            <span className="hero-services-item inline-block hover:text-white transition-colors duration-300 cursor-pointer">
              Corporate Design
            </span>
          </div>
          <div className="overflow-hidden inline-block">
            <span className="hero-services-item inline-block hover:text-white transition-colors duration-300 cursor-pointer">
              Digital Presence
            </span>
          </div>
        </div>

        {/* Layer 2: Single Wrapper Container for Typography & CTA Block */}
        <div className="relative z-20 w-full px-4 sm:px-6 md:px-10 lg:px-12 pb-0 flex flex-col justify-end pointer-events-none box-border max-w-full overflow-hidden">
          {/* Top Row: ASK on the Left + CTA Block on the Right */}
          <div className="w-full flex items-start justify-between gap-4 sm:gap-6 md:gap-8">
            {/* Line 1: ASK */}
            <div className="hero-line-1 font-clash font-semibold text-white uppercase text-[16.32vw] leading-[0.78] tracking-tight shrink">
              ASK
            </div>

            {/* CTA Block & Avatar */}
            <div className="hero-cta-block flex flex-row lg:flex-col items-center lg:items-end justify-end gap-3 sm:gap-4 lg:gap-2.5 pointer-events-auto pt-1 sm:pt-2 shrink-0">
              {/* Avatar & Text Div */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-normal max-w-[110px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px] text-right leading-tight">
                  Schedule A <strong className="font-semibold text-white">15-Minute Call</strong> With Our Team To Discuss our Project
                </span>
                {/* Two Overlapping Circles */}
                <div className="relative flex items-center shrink-0">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-lg z-10 shrink-0">
                    <img src={AvatarImg} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black text-white flex items-center justify-center z-0 -ml-4 sm:-ml-5 md:-ml-6 shrink-0 shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* CTA Button — same size as desktop */}
              <Link to="/contact" className="bg-black text-white font-clash font-semibold text-xs sm:text-sm lg:text-base px-5 py-3 sm:px-8 sm:py-4 tracking-wider uppercase hover:bg-white hover:text-black transition-colors border border-white/10 whitespace-nowrap shrink-0">
                GET IN TOUCH
              </Link>
            </div>
          </div>

          {/* Line 2: CREATIONS */}
          <div className="hero-line-2 font-clash font-semibold text-white uppercase text-[16.32vw] leading-[0.78] w-full block whitespace-nowrap tracking-tight">
            CREATIONS
          </div>
        </div>
      </div>
    </section>
  )
}
