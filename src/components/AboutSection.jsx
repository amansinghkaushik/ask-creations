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
      className="relative w-full bg-white text-black px-4 sm:px-6 md:px-10 lg:px-12 select-none overflow-hidden h-[700px] sm:h-[780px] md:h-screen md:min-h-[600px] lg:min-h-[650px] flex flex-col justify-start items-center md:block"
    >
      {/* Centered Main Layout Container with balanced gap between columns */}
      <div className="max-w-[1080px] w-full mx-auto flex flex-col md:flex-row items-center md:items-end justify-between relative h-full gap-4 md:gap-8 lg:gap-12">
        
        {/* Left Column: Text & Bio (Centered & narrow on mobile, left-aligned on desktop/tablet) */}
        <div className="about-left-col pt-8 sm:pt-12 md:pt-0 flex flex-col justify-start items-start w-full max-w-[330px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[500px] mx-auto md:mx-0 z-20 md:my-auto shrink-0">
          {/* Headline: About me + Red Shape Badge */}
          <div className="flex items-start gap-2 mb-3 sm:mb-5 lg:mb-8">
            <h2 className="font-clash font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[76px] text-black tracking-tight leading-none">
              About me
            </h2>
            <span
              className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-[#FF3D3D] inline-block shrink-0 mt-1"
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
          <div className="pl-4 sm:pl-6 border-l border-neutral-300 flex flex-col gap-2.5 sm:gap-3.5 w-full">
            <p className="font-sans font-medium text-xs sm:text-sm md:text-[15px] lg:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              I'm an engineering student building at the intersection of UI/UX, web development, branding, illustration, and logo design.
            </p>
            <p className="font-sans font-medium text-xs sm:text-sm md:text-[15px] lg:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              I started with traditional sketching, anatomy studies, and character design, then evolved into digital product design, interaction systems, and brand storytelling.
            </p>
            <p className="font-sans font-medium text-xs sm:text-sm md:text-[15px] lg:text-[17px] text-neutral-700 leading-relaxed tracking-normal">
              My focus is creating experiences that feel expressive like art and functional like engineering.
            </p>

            {/* Founder Signature Block */}
            <div className="mt-2 sm:mt-3 pt-1">
              <span className="font-clash font-bold text-sm sm:text-base md:text-lg text-black block leading-none">
                Aman Kaushik
              </span>
              <span className="font-sans font-medium text-xs md:text-sm text-neutral-500 block mt-1">
                Founder
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Photo & Red Shape pinned FLUSH at bottom-0 on mobile, tablet, & desktop */}
        <div className="about-right-photo absolute bottom-0 left-0 right-0 md:left-auto md:right-2 lg:right-6 flex items-end justify-center md:justify-end pointer-events-none z-10 w-full md:w-auto">
          <div className="relative w-[280px] sm:w-[340px] md:w-[420px] lg:w-[500px] xl:w-[560px] h-[310px] sm:h-[380px] md:h-[480px] lg:h-[560px] xl:h-[630px] flex items-end justify-center">
            {/* Solid Red Background Rectangle */}
            <div className="absolute bottom-0 w-[250px] sm:w-[310px] md:w-[380px] lg:w-[450px] xl:w-[510px] h-full bg-[#FF3D3D] rounded-none shadow-xl left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 lg:left-8" />

            {/* B&W Portrait Photo Cutout resting FLUSH at bottom */}
            <img
              src={aboutPic}
              alt="Aman Kaushik - Founder"
              className="relative bottom-0 z-10 w-auto h-[128%] sm:h-[118%] md:h-[120%] max-w-none object-contain object-bottom pointer-events-none drop-shadow-xl"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
