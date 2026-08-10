import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import aboutPic from '../assets/About me Picture.png'
import shapeImg from '../assets/Shape.png'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // 1. Left Text & Bio Entrance Animation
      gsap.fromTo(
        '.about-left-col',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. Right Portrait Photo Cutout & Red Block Slide Up Animation
      gsap.fromTo(
        '.about-right-photo',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      className="relative w-full h-screen min-h-[700px] bg-white text-black px-4 sm:px-6 md:px-10 lg:px-12 select-none overflow-hidden flex items-center justify-center"
    >
      {/* Centered Main Layout Container */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-between relative h-full">
        
        {/* Left Column: Text & Bio (Vertically Centered) */}
        <div className="about-left-col absolute top-36 left-16 lg:col-span-6 flex ml-0 lg:ml-12 flex-col justify-center items-start w-full z-20 my-auto">
          {/* Headline: About me + Red Shape Badge */}
          <div className="flex items-start gap-2 mb-6 sm:mb-8">
            <h2 className="font-clash font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[76px] text-black tracking-tight leading-none">
              About me
            </h2>
            <span
              className="w-8 h-8 bg-[#FF3D3D] inline-block shrink-0 mt-1"
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

          {/* Left Guideline & Bio Paragraphs */}
          <div className="pl-6 border-l border-neutral-300 flex flex-col gap-4 max-w-md lg:max-w-[460px]">
            <p className="font-sans font-medium text-sm sm:text-base md:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              I'm an engineering student building at the intersection of UI/UX, web development, branding, illustration, and logo design.
            </p>
            <p className="font-sans font-medium text-sm sm:text-base md:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              I started with traditional sketching, anatomy studies, and character design, then evolved into digital product design, interaction systems, and brand storytelling.
            </p>
            <p className="font-sans font-medium text-sm sm:text-base md:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              My focus is creating experiences that feel expressive like art and functional like engineering.
            </p>

            {/* Founder Signature Block */}
            <div className="mt-3 pt-1">
              <span className="font-clash font-bold text-base md:text-lg text-black block leading-none">
                Aman Kaushik
              </span>
              <span className="font-sans font-medium text-xs md:text-sm text-neutral-500 block mt-1">
                Founder
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Large Image & Red Shape Wrapper resting FLUSH at section bottom */}
        <div className="about-right-photo lg:col-span-6 lg:absolute lg:bottom-0 lg:right-6 md:right-10 lg:right-12 flex justify-center lg:justify-end items-end shrink-0 pointer-events-none z-10">
          <div className="relative w-[380px] sm:w-[480px] md:w-[580px] lg:w-[640px] h-[420px] sm:h-[520px] md:h-[620px] lg:h-[680px] flex items-end justify-center">
            {/* Solid Red Background Rectangle */}
            <div className="absolute left-10 inset-0 w-[600px] h-full bg-[#FF3D3D] rounded-none shadow-xl" />

            {/* B&W Portrait Photo Cutout resting FLUSH at bottom */}
            <img
              src={aboutPic}
              alt="Aman Kaushik - Founder"
              className="relative bottom-0 z-10 w-auto h-[116%] max-w-none object-contain object-bottom pointer-events-none drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
