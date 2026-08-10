import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ManifestoSection from './components/ManifestoSection'
import CreativitySection from './components/CreativitySection'
import ShowcaseSection from './components/ShowcaseSection'
import ServicesSection from './components/ServicesSection'
import HighlightsSection from './components/HighlightsSection'
import ProcessSection from './components/ProcessSection'
import BrandStorySection from './components/BrandStorySection'
import AboutSection from './components/AboutSection'
import TestimonialsSection from './components/TestimonialsSection'
import FAQSection from './components/FAQSection'
import PricingSection from './components/PricingSection'
import FooterSection from './components/FooterSection'
import ContactPage from './pages/ContactPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'
import Preloader from './components/Preloader'
import { PageTransitionProvider } from './components/PageTransitionContext'

function HomePage() {
  const [heroReady, setHeroReady] = useState(false)
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  return (
    <main className="min-h-screen w-full bg-white relative">
      {/* Preloader — sits above everything, fires heroReady on wipe start and unmounts on complete */}
      {!preloaderFinished && (
        <Preloader
          onStartWipe={() => setHeroReady(true)}
          onComplete={() => setPreloaderFinished(true)}
        />
      )}

      <Navbar />
      <HeroSection ready={heroReady} />
      <CreativitySection />
      <ShowcaseSection />
      <ManifestoSection />
      <ServicesSection />
      <HighlightsSection />
      <ProcessSection />
      <BrandStorySection />
      <PricingSection />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </main>
  )
}

export default function App() {
  return (
    <PageTransitionProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageTransitionProvider>
  )
}

