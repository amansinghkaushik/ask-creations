import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import shapeImg from '../assets/Shape.png'
import avatarSarah from '../assets/AvatarSarah.png'
import avatarMarcus from '../assets/AvatarMarcus.png'
import avatarImg from '../assets/AvatarImg.jpeg'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialsSection() {
  const sectionRef = useRef(null)

  const testimonialSets = [
    [
      {
        id: 1,
        quote:
          'Aman brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.',
        name: 'Sarah Nguyen',
        role: 'Product Manager at FlowSync',
        avatar: avatarSarah,
      },
      {
        id: 2,
        quote:
          'An absolute pleasure to collaborate with. The way he merged aesthetic vision with practical frontend execution saved us weeks of back-and-forth development.',
        name: 'Marcus Chen',
        role: 'CTO at Elevate Digital',
        avatar: avatarMarcus,
      },
    ],
    [
      {
        id: 3,
        quote:
          'Working with Ask Creations transformed our entire digital identity. Their design system and motion work helped us stand out in a noisy market.',
        name: 'Elena Rostova',
        role: 'Design Director at Veloce Studio',
        avatar: avatarImg,
      },
      {
        id: 4,
        quote:
          'Exceptional quality, speed, and communication. Aman delivered a stunning web experience that boosted our conversions by over 40%.',
        name: 'Liam Gallagher',
        role: 'Head of Brand at Northwave',
        avatar: avatarSarah,
      },
    ],
    [
      {
        id: 5,
        quote:
          'A rare talent who bridges the gap between artistic expression and technical engineering. Highly recommended for ambitious brands.',
        name: 'Priya Sharma',
        role: 'Founder & CEO at Lumina AI',
        avatar: avatarMarcus,
      },
      {
        id: 6,
        quote:
          'From initial concept sketches to interactive prototypes, the attention to detail was flawless. The results exceeded all our expectations.',
        name: 'David Vance',
        role: 'Lead Architect at Apex Systems',
        avatar: avatarImg,
      },
    ],
  ]

  const [activeSetIndex, setActiveSetIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % testimonialSets.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonialSets.length])

  const currentSet = testimonialSets[activeSetIndex]

  useGSAP(
    () => {
      // Entrance Animation for Testimonials Section
      gsap.fromTo(
        '.testimonials-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
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

      gsap.fromTo(
        '.testimonial-card-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
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
    <section ref={sectionRef} className="bg-black text-white py-24 md:py-36 px-6 sm:px-10 md:px-16 lg:px-20 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header Div Wrapper */}
        <div className="testimonials-header flex flex-col items-center">
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
            <div className="flex items-center justify-center">
              <span className="tracking-[0.25em] text-base">TESTIMONIALS</span>
            </div>
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

          {/* Main Heading */}
          <h2 className="font-clash font-medium text-3xl sm:text-5xl md:text-6xl text-center text-white tracking-tight mb-16 md:mb-24">
            What it's like to work with Ask Creations.
          </h2>
        </div>

        {/* 2-Column Testimonials Grid with Locked Constant Height */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full relative min-h-[760px] sm:min-h-[680px] md:min-h-[380px]">
          {/* Middle Divider Line on Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-800" />

          {currentSet.map((item, idx) => (
            <div
              key={item.id}
              className={`testimonial-card-item p-6 sm:p-8 md:p-10 flex flex-col justify-between h-[360px] sm:h-[330px] md:h-[380px] transition-all duration-700 ease-in-out`}
            >
              <div>
                <div className="text-4xl sm:text-5xl font-serif text-white mb-4 leading-none select-none">
                  “
                </div>
                <p className="font-clash font-semibold text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed tracking-tight mb-8">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0 border border-neutral-700"
                />
                <div className="flex flex-col">
                  <span className="font-clash font-semibold text-base sm:text-lg text-white leading-tight">
                    {item.name}
                  </span>
                  <span className="font-sans font-medium text-xs sm:text-sm text-neutral-400 mt-0.5">
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Set Pagination Dots */}
        <div className="flex items-center gap-2.5 mt-16">
          {testimonialSets.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSetIndex(index)}
              aria-label={`Go to testimonial set ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                activeSetIndex === index ? 'w-8 bg-[#FF3D3D]' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
