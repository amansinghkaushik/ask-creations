import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import CreativeImg from '../assets/CreativeImg.png'

gsap.registerPlugin(ScrollTrigger)

export default function CreativitySection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // 1. As section arrives: Text starts BIG (scale: 1.6) and shrinks to normal size (scale: 1)
      //    Image starts slightly down (y: 140) and comes UP (y: 0)
      tl.fromTo(
        '.creativity-text',
        { scale: 1.6, opacity: 0.3 },
        { scale: 1, opacity: 1, ease: 'none', duration: 1 }
      ).fromTo(
        '.creativity-img',
        { y: 140, scale: 0.92 },
        { y: 0, scale: 1, ease: 'none', duration: 1 },
        '<'
      )

      // 2. As section scrolls past: Reverse motion (text grows back out, image moves back down)
      tl.to('.creativity-text', {
        scale: 1.5,
        opacity: 0.3,
        ease: 'none',
        duration: 1,
      }).to(
        '.creativity-img',
        {
          y: 140,
          scale: 0.92,
          ease: 'none',
          duration: 1,
        },
        '<'
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="bg-white text-black py-20 md:py-32 px-4 sm:px-6 relative flex flex-col items-center justify-center select-none overflow-hidden"
    >
      {/* Container holding center image & layered headline */}
      <div className="relative max-w-6xl w-full flex items-center justify-center my-12">
        {/* Center Red Portrait Image Box (Animates Up on Scroll In, Down on Scroll Out) */}
        <div className="creativity-img w-[300px] sm:w-[420px] md:w-[500px] lg:w-[740px] h-[300px] sm:h-[420px] md:h-[500px] lg:h-[560px] overflow-hidden shrink-0 shadow-2xl relative transition-shadow duration-300">
          <img
            src={CreativeImg}
            alt="Creativity Meets Strategy"
            className="w-full h-full object-cover object-top brightness-95 contrast-125"
          />
          {/* Red Color Overlay matching reference red tint */}
          <div className="absolute inset-0 bg-[#FF2A2A]/70 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Huge Layered Headline Overlay (Starts BIG, shrinks to 1 on Scroll In, reverses on Scroll Out) */}
        <div className="creativity-text absolute inset-0 flex flex-col items-center justify-center text-center font-clash font-bold text-4xl sm:text-6xl md:text-8xl lg:text-[110px] leading-[0.95] tracking-tight pointer-events-none z-20 w-full mix-blend-difference text-white origin-center">
          {/* Line 1: Where Creativity */}
          <div className="whitespace-nowrap flex items-center justify-center gap-1 sm:gap-3">
            <span>Where</span>
            <span>Creativity</span>
          </div>

          {/* Line 2: Meets Strategy */}
          <div className="whitespace-nowrap flex items-center justify-center gap-1 sm:gap-3 mt-2">
            <span>Meets</span>
            <span>Strategy</span>
          </div>
        </div>
      </div>
    </section>
  )
}
