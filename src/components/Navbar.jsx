import { useState, useEffect } from 'react'
import MenuButton from './MenuButton'
import TextCycler from './TextCycler'
import { useLocation } from 'react-router-dom'
import { TransitionLink } from './PageTransitionContext'
import logoSvg from '../assets/ask creations logo full.svg'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const location = useLocation()
  const isSubPage = location.pathname !== '/'
  const alwaysBlack = location.pathname === '/projects' || location.pathname === '/services'

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      setDateTime(`${time} - ${date}`)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Transition background to black when scrolled past hero section (~75vh)
      if (window.scrollY > window.innerHeight * 0.75) {
        setIsScrolledPastHero(true)
      } else {
        setIsScrolledPastHero(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    setIsOpen(false)
    if (window.location.pathname === '/' || window.location.pathname === '') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `/#${targetId}`)
      } else {
        window.location.href = `/#${targetId}`
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-6 md:px-10 lg:px-12 z-[999] transition-all duration-500 ease-in-out ${
        alwaysBlack || isScrolledPastHero
          ? 'bg-black backdrop-blur-md border-b border-white/10 shadow-xl'
          : 'bg-transparent'
      }`}
    >
      {/* Inner NavBar */}
      <div className="flex items-center justify-between py-[10px] text-white relative">

        {/* Left slot: datetime on home, logo on sub-pages */}
        <div className="flex-1 font-clash text-[16px] font-semibold text-white hidden md:flex items-center">
          {isSubPage ? (
            <TransitionLink to="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <img src={logoSvg} alt="ASK Creations" className="h-4 md:h-5 w-auto object-contain" />
            </TransitionLink>
          ) : (
            dateTime
          )}
        </div>

        {/* Center slot: TextCycler on desktop, datetime/logo on mobile */}
        <div className="flex-1 text-[16px] font-semibold text-left md:text-center flex justify-start md:justify-center items-center">
          {/* Mobile: logo on sub-pages, datetime on home */}
          {isSubPage ? (
            <TransitionLink to="/" className="md:hidden flex items-center hover:opacity-80 transition-opacity duration-300">
              <img src={logoSvg} alt="ASK Creations" className="h-4 w-auto object-contain" />
            </TransitionLink>
          ) : (
            <span className="md:hidden font-clash text-xs text-white/80 tracking-wide">{dateTime}</span>
          )}
          {/* Desktop: text cycler */}
          <div className="hidden md:block w-full">
            <TextCycler />
          </div>
        </div>

        {/* Element 3 - Menu Button or Navigation */}
        <div className="flex-1 flex justify-end items-center gap-7 md:overflow-hidden">
          <div
            className={`
              fixed top-0 left-0 w-screen h-[100dvh] bg-black flex-col items-center justify-center gap-10 -z-10
              md:static md:w-auto md:h-auto md:bg-transparent md:border-none md:flex-row md:py-0 md:gap-6 md:z-auto md:justify-end
              font-clash font-semibold
              transition-all duration-[500ms] md:duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isOpen 
                ? 'flex opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0' 
                : 'flex opacity-0 -translate-y-full pointer-events-none md:pointer-events-auto md:translate-y-0 md:translate-x-[120%]'}
            `}
          >
            <TransitionLink
              to="/projects"
              className="group relative text-4xl md:text-[16px] font-semibold transition-colors duration-300 hover:text-[#FF3D3D] whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Projects
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-[#FF3D3D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </TransitionLink>
            <TransitionLink
              to="/services"
              className="group relative text-4xl md:text-[16px] font-semibold transition-colors duration-300 hover:text-[#FF3D3D] whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Services
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-[#FF3D3D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </TransitionLink>
            <a
              href="/#about"
              className="group relative text-4xl md:text-[16px] font-semibold transition-colors duration-300 hover:text-[#FF3D3D] whitespace-nowrap"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-[#FF3D3D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
            <TransitionLink
              to="/contact"
              className="group relative text-4xl md:text-[16px] font-semibold transition-colors duration-300 hover:text-[#FF3D3D] whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Contact
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-[#FF3D3D] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </TransitionLink>
          </div>

          <div className="transition-all duration-400 ease-in-out z-50 shrink-0">
            <MenuButton
              variant={isOpen ? 'open' : 'closed'}
              onClick={() => setIsOpen((current) => !current)}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
