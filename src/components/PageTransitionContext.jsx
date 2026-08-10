import { createContext, useContext, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'

const PageTransitionContext = createContext({
  navigateWithTransition: () => {},
})

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const overlayRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const prevLocationRef = useRef(location.pathname)

  // Ensure overlay is set offscreen top on mount
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, { yPercent: -100 })
    }
  }, [])

  // Listen to browser back/forward navigation
  useEffect(() => {
    if (prevLocationRef.current !== location.pathname) {
      prevLocationRef.current = location.pathname
      if (!isAnimatingRef.current && overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { yPercent: 0 },
          {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.inOut',
          }
        )
      }
    }
  }, [location.pathname])

  const navigateWithTransition = (to) => {
    if (!to) return

    const targetPath = to.split('#')[0]

    // If navigating to current pathname without hash change, ignore
    if (targetPath === location.pathname && !to.includes('#')) return
    if (isAnimatingRef.current) return

    isAnimatingRef.current = true
    const overlay = overlayRef.current

    // Step 1: Slide black box DOWN from top (-100% -> 0%)
    gsap.fromTo(
      overlay,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          // Change route & scroll to top while screen is completely black
          navigate(to)
          window.scrollTo(0, 0)

          // Step 2: Slide black box UP to reveal next page (0% -> -100%)
          gsap.to(overlay, {
            yPercent: -100,
            duration: 0.45,
            ease: 'power3.inOut',
            delay: 0.05,
            onComplete: () => {
              isAnimatingRef.current = false
            },
          })
        },
      }
    )
  }

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      {/* Black Page Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 w-full h-[100dvh] bg-black z-[999999] pointer-events-none"
      />
      {children}
    </PageTransitionContext.Provider>
  )
}

export function usePageTransition() {
  return useContext(PageTransitionContext)
}

export function TransitionLink({ to, className, children, onClick, ...props }) {
  const { navigateWithTransition } = usePageTransition()
  const location = useLocation()

  const handleClick = (e) => {
    if (onClick) onClick(e)

    if (!to || to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      return
    }

    if (to.includes('#')) {
      const [path] = to.split('#')
      if (path === '' || path === location.pathname) {
        return
      }
    }

    e.preventDefault()
    navigateWithTransition(to)
  }

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  )
}
