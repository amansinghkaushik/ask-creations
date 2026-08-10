import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import FAQSection from '../components/FAQSection'
import FooterSection from '../components/FooterSection'
import taginMockup from '../assets/taginmockup.png'
import sundarbanImg from '../assets/sundarban.png'
import pawwfyImg from '../assets/pawwfy.png'
import mworldImg from '../assets/mworld.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const projects = [
  { id: 'tagin', title: 'TAG-IN', img: taginMockup, alt: 'TAG-IN Mockup' },
  { id: 'sundarban', title: 'Sundarban', img: sundarbanImg, alt: 'Sundarban Mockup' },
  { id: 'pawffy', title: 'Pawffy', img: pawwfyImg, alt: 'Pawffy Mockup' },
  { id: 'mworld', title: 'M-World', img: mworldImg, alt: 'M-World Mockup' },
]

export default function ProjectsPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useGSAP(() => {
    gsap.fromTo('.proj-header', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    gsap.fromTo('.proj-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.3 })
  }, { scope: pageRef })

  return (
    <main ref={pageRef} className="min-h-screen w-full bg-white text-black overflow-x-hidden">
      <Navbar />

      <section className="pt-28 sm:pt-36 md:pt-40 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1440px] mx-auto">
        {/* Header row: big title left, description right */}
        <div className="proj-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12 mb-8 sm:mb-12">
          <h1 className="font-clash font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] text-black leading-[0.9] tracking-tight shrink-0">
            Projects
          </h1>
          <p className="font-sans text-sm sm:text-base text-neutral-500 max-w-xs leading-relaxed md:pb-2">
            A showcase of our design thinking and execution. Built to reflect our standards, process, and capability.
          </p>
        </div>

        {/* 2-col card grid with responsive gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`#${project.id}`}
              className="proj-card group flex flex-col w-full text-black cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 shadow-sm">
                <img
                  src={project.img}
                  alt={project.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Title row */}
              <div className="flex items-center justify-between pt-3.5 pb-2 border-b border-transparent group-hover:border-black/20 transition-colors">
                <h3 className="font-sans font-semibold text-xl sm:text-2xl md:text-3xl text-black tracking-tight">
                  {project.title}
                </h3>
                <span className="font-clash text-xl sm:text-2xl text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <FAQSection />
      <FooterSection />
    </main>
  )
}
