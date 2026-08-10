import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ProcessSection() {
  const sectionRef = useRef(null)

  const steps = [
    {
      number: '001',
      title: 'Design Sprints',
      description:
        'We help you visualise your concept in a short time frame.',
      icon: (
        <svg className="w-20 h-20 text-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 100 100">
          <path d="M 20 65 Q 50 10, 80 65" stroke="currentColor" />
          <path d="M 30 65 Q 50 25, 70 65" stroke="currentColor" />
          <path d="M 40 65 Q 50 40, 60 65" stroke="currentColor" />
          <circle cx="20" cy="65" r="3.5" fill="currentColor" />
          <circle cx="32" cy="65" r="3.5" fill="currentColor" />
          <circle cx="44" cy="65" r="3.5" fill="currentColor" />
          <circle cx="56" cy="65" r="3.5" fill="currentColor" />
          <circle cx="68" cy="65" r="3.5" fill="currentColor" />
          <circle cx="80" cy="65" r="3.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '002',
      title: 'Strategic Design',
      description:
        'We solve problems with strategic design.',
      icon: (
        <svg className="w-20 h-20 text-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 100 100">
          <circle cx="40" cy="40" r="20" stroke="currentColor" />
          <circle cx="60" cy="40" r="20" stroke="currentColor" />
          <circle cx="50" cy="56" r="20" stroke="currentColor" />
          <line x1="45" y1="42" x2="55" y2="42" stroke="currentColor" strokeWidth="1" />
          <line x1="43" y1="46" x2="57" y2="46" stroke="currentColor" strokeWidth="1" />
          <line x1="46" y1="50" x2="54" y2="50" stroke="currentColor" strokeWidth="1" />
        </svg>
      ),
    },
    {
      number: '003',
      title: 'Design Direction',
      description:
        'We tactically expand your brand into the digital world.',
      icon: (
        <svg className="w-20 h-20 text-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 100 100">
          <path d="M 35 65 L 35 45 L 50 35 L 50 45 L 65 30 L 60 25 L 75 25 L 75 40 L 70 35 L 55 50 L 55 65 Z" stroke="currentColor" />
          <path d="M 35 45 L 45 40 L 60 50" stroke="currentColor" />
          <path d="M 50 35 L 60 30 L 75 25" stroke="currentColor" />
        </svg>
      ),
    },
    {
      number: '004',
      title: 'Discovery Workshops',
      description:
        "We facilitate workshops that fast track discovery of your brand's identity and direction.",
      icon: (
        <svg className="w-20 h-20 text-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 100 100">
          <line x1="50" y1="40" x2="35" y2="25" stroke="currentColor" />
          <line x1="50" y1="40" x2="65" y2="25" stroke="currentColor" />
          <line x1="50" y1="40" x2="35" y2="60" stroke="currentColor" />
          <line x1="50" y1="40" x2="65" y2="60" stroke="currentColor" />
          <line x1="35" y1="60" x2="25" y2="70" stroke="currentColor" />
          <line x1="65" y1="60" x2="75" y2="70" stroke="currentColor" />
          <circle cx="50" cy="40" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="35" cy="25" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="65" cy="25" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="35" cy="60" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="65" cy="60" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="25" cy="70" r="4.5" stroke="currentColor" fill="white" />
          <circle cx="75" cy="70" r="4.5" stroke="currentColor" fill="white" />
        </svg>
      ),
    },
  ]

  useGSAP(
    () => {
      // 1. Top Header Headline & Subtitle Reveal Animation
      gsap.fromTo(
        '.process-ref-headline',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.process-ref-subtitle',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.95,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. Middle /WORK Divider Line Expand Animation
      gsap.fromTo(
        '.process-ref-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-ref-line',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 3. 4 Process Cards Staggered Reveal Animation
      gsap.fromTo(
        '.process-ref-col',
        { opacity: 0, y: 55 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.process-ref-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 4. SVG Vector Icons Pop & Scale Entrance
      gsap.fromTo(
        '.process-icon-box',
        { opacity: 0, scale: 0.7, rotate: -8 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.85,
          stagger: 0.16,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: '.process-ref-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen lg:min-h-[700px] bg-[#f0f0f2] text-black px-6 sm:px-10 md:px-16 lg:px-20 select-none overflow-hidden flex flex-col justify-between py-14 md:py-16"
    >
      <div className="max-w-[1500px] w-full mx-auto h-full flex flex-col justify-between">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start justify-between">
          
          {/* Main Headline (Left Column) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="process-ref-headline font-clash font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[62px] text-black leading-[1.06] tracking-tight">
              Design that delivers
              <br />
              uncommonly good
              <br />
              results.
            </h2>
          </div>

          {/* Subtitle (Right Column) */}
          <div className="process-ref-subtitle lg:col-span-5 flex flex-col items-start lg:items-end justify-start h-full pt-2">
            <p className="font-sans font-normal text-base sm:text-lg text-neutral-600 leading-relaxed max-w-sm lg:text-left">
              We don't just design, we partner with you to achieve measurable outcomes.
            </p>
          </div>
        </div>

        {/* Middle Tag Row */}
        <div className="process-ref-line origin-left flex items-center justify-between border-b border-neutral-300/80 pb-4 my-2">
          <span className="font-sans font-medium text-xs text-neutral-500 uppercase tracking-widest">
            /WORK
          </span>
        </div>

        {/* Bottom 4-Column Grid matching reference image exactly */}
        <div className="process-ref-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-ref-col border-l border-neutral-300/90 pl-6 lg:pl-8 flex flex-col justify-between items-start gap-8 min-h-[260px] group hover:border-[#FF3D3D] transition-colors duration-300"
            >
              {/* Top: 3-Digit Step Number */}
              <span className="font-sans font-medium text-xs text-neutral-400 tracking-widest">
                {step.number}
              </span>

              {/* Middle: Vector Icon */}
              <div className="process-icon-box py-2 my-auto group-hover:-translate-y-2 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>

              {/* Bottom: Title & Description */}
              <div className="flex flex-col gap-2">
                <h3 className="font-clash font-medium text-2xl md:text-[25px] text-black tracking-tight leading-snug group-hover:text-[#FF3D3D] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans font-normal text-xs sm:text-sm text-neutral-500 leading-relaxed max-w-[260px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
