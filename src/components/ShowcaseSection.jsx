import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ShowcaseImg1 from '../assets/ShowcaseImg1.png'
import ShowcaseImg3 from '../assets/ShowcaseImg3.png'
import logomotionVideo from '../assets/logomotion-720p.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function ShowcaseSection() {
  const sectionRef = useRef(null)

  const stats = [
    { target: 1, suffix: '+', label: 'Years experience' },
    { target: 3, suffix: '+', label: 'Projects completed' },
    { target: 3, suffix: '+', label: 'Happy clients Worldwide' },
    { target: 7, suffix: '+', label: 'Hackathon Winner' },
  ]

  const projects = [
    {
      id: 1,
      title: 'ASK Mobile App',
      img: ShowcaseImg1,
      alt: 'ASK iPhone App Mockup',
    },
    {
      id: 2,
      title: 'Logo Motion Animation',
      video: logomotionVideo,
      alt: 'Logo Motion Video',
    },
    {
      id: 3,
      title: 'Orange Mobile Experience',
      img: ShowcaseImg3,
      alt: 'Orange Smartphone Showcase',
    },
  ]

  useGSAP(
    () => {
      // 1. Metric Items Entrance & Animated Counter Numbers
      const statElements = gsap.utils.toArray('.showcase-stat-item')

      statElements.forEach((el, index) => {
        const numEl = el.querySelector('.showcase-stat-num')
        const targetVal = stats[index].target
        const obj = { val: 0 }

        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        )

        gsap.to(obj, {
          val: targetVal,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
          onUpdate: () => {
            if (numEl) {
              numEl.textContent = `${Math.floor(obj.val)}${stats[index].suffix}`
            }
          },
        })
      })

      // 2. Showcase Cards Entrance Animation (Matches HighlightsSection smoothness)
      gsap.fromTo(
        '.showcase-card',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.showcase-cards-grid',
            start: 'top bottom',
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
      className="bg-white text-black py-16 md:py-28 px-6 sm:px-10 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none overflow-hidden"
    >
      {/* Part 1: Metrics Counters Grid with ample breathing gap */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-0 md:gap-x-16 mb-20 md:mb-28 text-center items-baseline">
        {stats.map((stat, i) => (
          <div key={i} className="showcase-stat-item flex flex-col items-center p-2">
            <span className="showcase-stat-num font-clash font-semibold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black tracking-tight leading-none">
              0{stat.suffix}
            </span>
            <span className="font-clash font-semibold text-xs sm:text-sm text-neutral-600 uppercase tracking-tight mt-3">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Part 2: 3 Vertical Portfolio Showcase Cards (Gap-4 spacing) */}
      <div className="showcase-cards-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="showcase-card group relative overflow-hidden bg-neutral-900 aspect-[3/4.2] sm:h-[500px] md:h-[580px] lg:h-[640px] w-full shadow-2xl transition-transform duration-500 hover:-translate-y-2 rounded-lg"
          >
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <img
                src={project.img}
                alt={project.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
