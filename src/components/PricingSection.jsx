import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TransitionLink } from './PageTransitionContext'
import shapeImg from '../assets/Shape.png'
import askLogo from '../assets/Asklogo.svg'

gsap.registerPlugin(ScrollTrigger)

const retainerFeatures = [
  'Dedicated design team assigned to you',
  'Priority execution & faster turnaround',
  'Continuous brand, product & web design',
  'Structured updates & communication',
  'Flexible scope aligned to your roadmap',
  'Consistent quality across deliverables',
]

const projectFeatures = [
  'Clearly defined scope & deliverables',
  'Minimum engagement starting ₹55,000',
  'Fixed timeline, milestone-based execution',
  'Professional coordination & delivery',
  'Highly responsive project support',
  'Revisions included within agreed scope',
]

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 shrink-0 mt-0.5">
    <path d="M3 8l3 3 7-7" stroke="#FF3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function PricingSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.pricing-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none', once: true },
        }
      )
      gsap.fromTo(
        '.pricing-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.pricing-grid', start: 'top 82%', toggleActions: 'play none none none', once: true },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-black py-16 md:py-24 px-6 sm:px-10 md:px-12 select-none overflow-hidden"
    >
      <div className="max-w-[985px] mx-auto w-full flex flex-col items-center">

        {/* Header */}
        <div className="pricing-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 md:mb-14 w-full">
          <div className="flex flex-col gap-3">
            {/* Badge — matching ServicesSection style */}
            <div className="text-[#FF3D3D] font-clash font-semibold uppercase tracking-widest flex items-center justify-start gap-1">
              <div className="self-end pt-0.5 flex items-center justify-center shrink-0">
                <span
                  className="w-2 h-2 bg-[#FF3D3D] rotate-180 inline-block shrink-0"
                  style={{
                    maskImage: `url(${shapeImg})`, WebkitMaskImage: `url(${shapeImg})`,
                    maskSize: 'contain', WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center', WebkitMaskPosition: 'center',
                  }}
                />
              </div>
              <span className="tracking-[0.25em] text-sm sm:text-base">PRICING</span>
              <div className="self-start pb-0.5 flex items-center justify-center shrink-0">
                <span
                  className="w-2 h-2 bg-[#FF3D3D] inline-block shrink-0"
                  style={{
                    maskImage: `url(${shapeImg})`, WebkitMaskImage: `url(${shapeImg})`,
                    maskSize: 'contain', WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center', WebkitMaskPosition: 'center',
                  }}
                />
              </div>
            </div>

            <h2 className="font-clash font-medium text-3xl sm:text-4xl md:text-5xl text-black leading-[1.05] tracking-tight max-w-xl">
              Choose a plan that fits your ambitions.
            </h2>
          </div>

          <p className="font-sans font-normal text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-xs lg:text-right lg:mb-1">
            Every project is different. These are starting points — custom scopes always available.
          </p>
        </div>

        {/* ─── GRID ─── */}
        <div className="pricing-grid flex flex-col gap-2 w-full items-center">

          {/* TOP ROW: Preserved 1st card width, Reduced 2nd card width */}
          <div className="grid grid-cols-1 lg:grid-cols-14 gap-2 items-stretch w-full">

            {/* LEFT: Outer white card with absolute tilted black card inside (Preserved width) */}
            <div className="pricing-card lg:col-span-6 bg-white border border-neutral-200/90 rounded-3xl p-3 sm:p-3.5 shadow-sm flex flex-col justify-between relative overflow-visible">

              {/* Absolute Tilted Floating Black Card */}
              <div className="absolute top-2.5 left-2.5 right-2.5 z-10 -rotate-2 hover:rotate-0 hover:scale-[1.01] transition-all duration-300 bg-[#0a0a0a] text-white rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between min-h-[250px] sm:min-h-[270px] overflow-hidden">
                
                {/* Top Row: White Pill Badge + Ask Logo on right corner */}
                <div className="flex items-start justify-between gap-2 z-10">
                  <div className="bg-white text-black font-clash font-semibold text-[11px] sm:text-xs px-3 py-1.5 rounded-sm shadow-sm select-none shrink-0">
                    Selective Partnerships
                  </div>

                  {/* Ask Logo SVG w-40 h-40 */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-end -mt-3 -mr-3 opacity-95">
                    <img
                      src={askLogo}
                      alt="Ask Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Bottom Left Text */}
                <div className="max-w-[190px] sm:max-w-[210px] z-10 -mt-6 sm:-mt-8">
                  <p className="font-clash text-base sm:text-lg leading-snug tracking-tight text-white">
                    <span className="font-semibold text-white">Design support</span>{' '}
                    <span className="text-neutral-400 font-normal">for companies that operate at scale</span>
                  </p>
                </div>
              </div>

              {/* Bottom Section of outer white card (pushed down below absolute black card) */}
              <div className="pt-[270px] sm:pt-[300px] p-4 sm:p-5 flex flex-col gap-3 items-start">
                
                {/* Limited Intake Only Chip */}
                <div className="inline-flex items-center gap-2 border border-neutral-200/80 bg-neutral-50 px-3 py-1 text-[11px] font-clash font-medium text-neutral-700 rounded-sm">
                  <span className="w-2 h-2 rounded-full bg-[#FF3D3D] inline-block shrink-0" />
                  <span>Limited Intake Only</span>
                </div>

                {/* Title */}
                <h3 className="font-clash font-medium text-2xl sm:text-3xl text-black tracking-tight mt-0.5">
                  Start a Partnership
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Integrated design teams.<br />
                  Consistent output.<br />
                  Built for ongoing requirements.
                </p>
              </div>
            </div>

            {/* RIGHT: Retainer pricing detail (Reduced width: lg:col-span-8) */}
            <div className="pricing-card lg:col-span-8 flex flex-col justify-between bg-white border border-neutral-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">

              <div className="flex flex-col gap-3">
                <h3 className="font-clash font-medium text-2xl sm:text-3xl text-black leading-tight tracking-tight">
                  Monthly Design Retainers
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-md">
                  Ongoing design support through a dedicated team integrated into your workflow. Built for companies that require continuous design output.
                </p>
              </div>

              {/* Price */}
              <div className="py-4 my-2 border-b border-neutral-200/80">
                <p className="font-sans text-[11px] text-neutral-400 mb-1 uppercase tracking-widest">Starting from</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-clash font-semibold text-4xl sm:text-5xl leading-none tracking-tight text-black">
                    ₹20,000
                  </span>
                  <span className="font-clash font-normal text-sm text-neutral-400">/ month</span>
                </div>
              </div>

              {/* 2-col Feature grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
                {retainerFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6">
                <TransitionLink
                  to="/contact"
                  className="inline-flex items-center gap-2.5 font-clash font-semibold text-xs uppercase tracking-widest px-6 py-3.5 bg-black text-white hover:bg-[#FF3D3D] transition-all duration-300 shadow-sm"
                >
                  Start a Partnership
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3M13 3H6M13 3v7" />
                  </svg>
                </TransitionLink>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Full-width project card (Reduced width matching top row) */}
          <div className="pricing-card w-full bg-[#0a0a0a] border border-neutral-800 p-6 sm:p-8 lg:p-9 rounded-3xl shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">

              {/* Left: Title + desc + CTA */}
              <div className="flex flex-col gap-3">
                <h3 className="font-clash font-medium text-2xl sm:text-3xl text-white leading-tight tracking-tight">
                  One-Time Projects
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Structured design engagements for clearly defined requirements. Fixed scope and timeline.
                </p>
                <div className="mt-2">
                  <TransitionLink
                    to="/contact"
                    className="inline-flex items-center gap-2.5 font-clash font-semibold text-xs uppercase tracking-widest px-6 py-3.5 bg-white text-black hover:bg-[#FF3D3D] hover:text-white transition-all duration-300 shadow-sm"
                  >
                    Get a Quote
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13L13 3M13 3H6M13 3v7" />
                    </svg>
                  </TransitionLink>
                </div>
              </div>

              {/* Right: 2-col Feature grid spans 2 cols */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {projectFeatures.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckIcon />
                    <span className="font-sans text-xs sm:text-sm text-neutral-400 leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom note */}
        <p className="mt-6 text-center font-sans text-xs text-neutral-400">
          Need something fully custom?{' '}
          <TransitionLink to="/contact" className="text-[#FF3D3D] hover:underline transition-colors">
            Let's talk →
          </TransitionLink>
        </p>

      </div>
    </section>
  )
}
