import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import ContactSection from '../components/ContactSection'
import FAQSection from '../components/FAQSection'
import FooterSection from '../components/FooterSection'

export default function ContactPage() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="min-h-screen w-full bg-[#0e0e0e] relative">
      <Navbar />
      <ContactSection />
      <FAQSection />
      <FooterSection />
    </main>
  )
}
