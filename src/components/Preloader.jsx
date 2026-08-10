import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import AsklogoSvg from '../assets/Asklogo.svg'

// Split text into individual letter spans with overflow-hidden wrappers
function SplitText({ text, className }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ lineHeight: 1 }}
        >
          <span
            className={`letter-char inline-block ${className}`}
            style={{ display: 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  )
}

export default function Preloader({ onStartWipe, onComplete }) {
  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  const rowRef = useRef(null)
  const bylineRef = useRef(null)

  const onStartWipeRef = useRef(onStartWipe)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onStartWipeRef.current = onStartWipe
    onCompleteRef.current = onComplete
  })

  useEffect(() => {
    const overlay = overlayRef.current
    const logo = logoRef.current
    const byline = bylineRef.current
    const letters = overlay.querySelectorAll('.letter-char')

    // Prevent scroll while preloader is active
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        if (onCompleteRef.current) onCompleteRef.current()
      },
    })

    // Initial state — all hidden below
    tl.set(logo, { y: 60, opacity: 0 })
    tl.set(letters, { y: '100%', opacity: 0 })
    tl.set(byline, { y: 30, opacity: 0 })

    // --- Phase 1: Logo slides up ---
    tl.to(logo, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.25)

    // --- Phase 2: Letters stagger up one by one ---
    tl.to(
      letters,
      {
        y: '0%',
        opacity: 1,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.045,
      },
      0.35
    )

    // --- Phase 3: Byline slides up ---
    tl.to(
      byline,
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.1'
    )

    // --- Hold ---
    tl.to({}, { duration: 1.0 })

    // --- Phase 4: Byline falls down ---
    tl.to(byline, { y: 40, opacity: 0, duration: 0.4, ease: 'power2.in' })

    // --- Phase 5: Letters stagger back down one by one (reverse) ---
    tl.to(
      letters,
      {
        y: '110%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        stagger: { amount: 0.4, from: 'end' },
      },
      '-=0.1'
    )

    // --- Phase 6: Logo falls down ---
    tl.to(logo, { y: 60, opacity: 0, duration: 0.4, ease: 'power2.in' }, '-=0.25')

    // --- Phase 7: Whole overlay wipes UP off screen ---
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
      onStart: () => {
        document.body.style.overflow = ''
        if (onStartWipeRef.current) onStartWipeRef.current()
      },
    }, '+=0.05')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{ willChange: 'transform' }}
    >
      {/* Logo + ASK CREATIONS on the same row */}
      <div ref={rowRef} className="flex items-center">

        {/* Logo */}
        <div ref={logoRef} style={{ opacity: 0 }}>
          <img
            src={AsklogoSvg}
            alt="ASK Logo"
            className="w-8 h-auto sm:w-8 md:w-9 mb-1"
            draggable={false}
          />
        </div>

        {/* ASK CREATIONS — per-letter clip animation */}
        <h1
          className="font-clash font-semibold tracking-[0.18em] leading-none select-none"
        >
          <SplitText
            text="skcreations"
            className="text-white text-2xl sm:text-3xl md:text-5xl"
          />
        </h1>
      </div>

      {/* Designed by me tag */}
      <div ref={bylineRef} className="mt-3 flex items-center gap-3" style={{ opacity: 0 }}>
        <span className="block w-8 h-px bg-white/25" />
        <p className="font-clash text-white text-[10px] sm:text-[11px] tracking-[0.3em]">
          Designed by ME
        </p>
        <span className="block w-8 h-px bg-white/25" />
      </div>
    </div>
  )
}
