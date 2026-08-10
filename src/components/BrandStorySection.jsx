import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import askVideo from '../assets/askVideo.mp4'
import logoSvg from '../assets/ask creations logo full.svg'

gsap.registerPlugin(ScrollTrigger)

export default function BrandStorySection() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // 1. Background Video Parallax Zoom Scrub
      gsap.fromTo(
        '.brand-video',
        { scale: 1.15 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )

      // 2. Elements Entrance Animation
      gsap.fromTo(
        '.brand-logo',
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
        '.brand-headline',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
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
        '.brand-para',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
      className="relative w-full h-screen min-h-[650px] overflow-hidden select-none bg-black flex items-center justify-center"
    >
      {/* Background Video (askVideo.mp4) */}
      <video
        src={askVideo}
        autoPlay
        loop
        muted
        playsInline
        className="brand-video w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none z-0" />

      {/* Top Left Logo: SVG Image (ask creations logo full.svg) */}
      <div className="brand-logo absolute top-8 left-6 md:top-14 md:left-10 lg:left-12 z-10 flex items-center">
        <img
          src={logoSvg}
          alt="askcreations logo"
          className="h-5 sm:h-6 md:h-7 w-auto object-contain"
        />
      </div>

      {/* Top Right Headline: Built from instinct, Refined by Design */}
      <div className="brand-headline absolute top-8 right-6 md:top-14 md:right-10 lg:right-12 z-10 text-right max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="font-clash font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-[46px] text-white leading-[1.08] tracking-tight">
          Built from instinct,
          <br />
          Refined by Design
        </h2>
      </div>

      {/* Bottom Left Paragraph: Ideas into campaigns, interfaces... */}
      <div className="brand-para absolute bottom-8 left-6 md:bottom-12 md:left-10 lg:left-12 z-10 max-w-xs sm:max-w-sm md:max-w-md">
        <p className="font-sansfont-medium text-xs sm:text-sm md:text-base text-white/95 leading-snug tracking-wide">
          Ideas into campaigns, interfaces,
          <br />
          and motion stories that feels
          <br />
          handcrafted and unforgettable
        </p>
      </div>
    </section>
  )
}
