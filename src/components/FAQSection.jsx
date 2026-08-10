import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import shapeImg from '../assets/Shape.png'

gsap.registerPlugin(ScrollTrigger)

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const sectionRef = useRef(null)

  const faqs = [
    {
      question: 'How does the pricing work?',
      answer:
        'Our pricing reflects the experience, quality, and resources dedicated to each project and is therefore not subject to negotiation. For projects, we typically require 50% advance, with the remaining amount paid across mutually agreed milestones. Retainers are billed monthly.',
    },
    {
      question: 'What is your working hours?',
      answer:
        'We operate Monday through Friday, 9:00 AM to 6:00 PM EST, with asynchronous communication available via Slack or email for urgent needs.',
    },
    {
      question: 'How many revisions is included?',
      answer:
        'Each project scope includes 2 comprehensive revision rounds per milestone stage to ensure every detail matches your brand standards perfectly.',
    },
    {
      question: 'How long does a typical project takes?',
      answer:
        'Depending on the complexity, standard brand identity or web design projects typically take between 3 to 6 weeks from kick-off to final delivery.',
    },
  ]

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  useGSAP(
    () => {
      // 1. Left Header Column Entrance Animation
      gsap.fromTo(
        '.faq-left-col',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // 2. Right Accordion List Staggered Entrance Animation
      gsap.fromTo(
        '.faq-item',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.faq-list-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-white text-black py-24 md:py-36 px-4 sm:px-6 md:px-10 lg:px-12 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Title, Subtitle, CTA */}
        <div className="faq-left-col lg:col-span-5 flex flex-col items-start w-full">
          <h2 className="font-clash font-normal text-4xl sm:text-5xl md:text-6xl text-black tracking-tight leading-none">
            Frequently
            <br />
             asked
            <br />
            questions
          </h2>

          <p className="text-neutral-500 font-clash font-medium text-base sm:text-lg mt-3 mb-8">
            Clear answers to common questions
          </p>

          {/* CTA Link with Shape Icon in #FF3D3D matching ServicesSection */}
          <div className="mt-6 flex items-center">
            <a
              href="#contact"
              className="text-[#FF3D3D] font-clash font-semibold text-sm tracking-wide inline-flex items-center gap-1 hover:text-black transition-colors group"
            >
              <div className="self-start flex items-center justify-center shrink-0">
                <span
                  className="w-2 h-2 rotate-270 bg-[#FF3D3D] group-hover:bg-black transition-colors inline-block shrink-0"
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
              <div className="flex items-center">
                <span className="underline underline-offset-4">Get in touch</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: Accordion List */}
        <div className="faq-list-container lg:col-span-7 flex flex-col w-full divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div key={idx} className="faq-item py-6 transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                >
                  <h3 className="font-clash font-medium text-xl sm:text-2xl text-black tracking-tight group-hover:text-[#FF3D3D] transition-colors pr-4">
                    {faq.question}
                  </h3>
                  <span className="text-[#FF3D3D] font-clash font-light text-2xl sm:text-3xl shrink-0 transition-transform duration-300">
                    {isOpen ? '✕' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-6 animate-fadeIn">
                    <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
