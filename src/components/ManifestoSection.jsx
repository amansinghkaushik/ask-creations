import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function ManifestoSection() {
  const sectionRef = useRef(null)
  const boxRef = useRef(null)
  const p1TextRef = useRef(null)
  const p2TextRef = useRef(null)
  const p3TextRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })

      // Initial State: Wrappers have 0 height, paragraphs hidden at y: 20
      gsap.set(['.manifesto-wrap-1', '.manifesto-wrap-2', '.manifesto-wrap-3'], {
        height: 0,
        overflow: 'hidden',
      })
      gsap.set(['.manifesto-para-1', '.manifesto-para-2', '.manifesto-para-3'], {
        opacity: 0,
        y: 20,
      })

      // 1. Quick expand box from center
      tl.fromTo(
        boxRef.current,
        { scaleX: 0.4, scaleY: 0.3, opacity: 0.3 },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )

      // 2. Expand Box Height for Para 1 & Fade in Para 1
      tl.to('.manifesto-wrap-1', {
        height: () => (p1TextRef.current ? p1TextRef.current.offsetHeight + 10 : 'auto'),
        duration: 0.6,
        ease: 'power2.out',
      }).to(
        '.manifesto-para-1',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<'
      )

      // 3. Expand Box Height for Para 2 & Fade in Para 2
      tl.to('.manifesto-wrap-2', {
        height: () => (p2TextRef.current ? p2TextRef.current.offsetHeight + 30 : 'auto'),
        duration: 0.6,
        ease: 'power2.out',
      }).to(
        '.manifesto-para-2',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<'
      )

      // 4. Expand Box Height for Para 3 & Fade in Para 3
      tl.to('.manifesto-wrap-3', {
        height: () => (p3TextRef.current ? p3TextRef.current.offsetHeight + 30 : 'auto'),
        duration: 0.6,
        ease: 'power2.out',
      }).to(
        '.manifesto-para-3',
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        },
        '<'
      )

      // Refresh ScrollTrigger when fonts load
      document.fonts?.ready?.then(() => {
        ScrollTrigger.refresh()
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="manifesto-section relative z-10 w-full h-screen min-h-screen bg-white text-black select-none overflow-hidden flex flex-col items-center justify-center px-6"
    >
      {/* Centered Dynamic Box Container */}
      <div
        ref={boxRef}
        className="relative max-w-2xl w-full px-8 sm:px-12 py-8 md:py-12 flex flex-col items-center justify-center text-center origin-center transition-all duration-300"
      >
        {/* Left Side: 3 Equally Spaced Squares */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-black shrink-0" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 bg-black shrink-0 transition-all" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-black shrink-0" />

        {/* Right Side: 3 Equally Spaced Squares */}
        <div className="absolute top-0 right-0 w-2 h-2 bg-black shrink-0" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-black shrink-0 transition-all" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-black shrink-0" />

        {/* Top & Bottom Connecting Accent Lines */}
        <div className="absolute top-0 left-2 right-2 border-t border-dashed border-black/20" />
        <div className="absolute bottom-0 left-2 right-2 border-b border-dashed border-black/20" />

        {/* Content Container (Height grows dynamically as wrappers expand) */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Paragraph 1 Wrapper */}
          <div className="manifesto-wrap-1 w-full flex justify-center items-center">
            <p ref={p1TextRef} className="manifesto-para-1 font-clash font-medium text-2xl sm:text-3xl md:text-[38px] text-black leading-[1.15] tracking-tight max-w-[520px]">
              Design shapes the world not as decoration, but as a force that leaves a mark.
            </p>
          </div>

          {/* Paragraph 2 Wrapper */}
          <div className="manifesto-wrap-2 w-full flex justify-center items-center">
            <p ref={p2TextRef} className="manifesto-para-2 font-clash font-medium text-2xl sm:text-3xl md:text-[38px] text-black leading-[1.15] tracking-tight max-w-[520px] pt-6 md:pt-8">
              It defines how your brand is perceived and how it’s experienced.
            </p>
          </div>

          {/* Paragraph 3 Wrapper */}
          <div className="manifesto-wrap-3 w-full flex justify-center items-center">
            <h3 ref={p3TextRef} className="manifesto-para-3 font-clash font-medium text-3xl sm:text-4xl md:text-[46px] text-black tracking-tight pt-6 md:pt-8">
              Leave yours.
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
