import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import shapeImg from '../assets/Shape.png'

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || ''

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const sectionRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const { name, email, message } = formState

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color: #FF3D3D; font-size: 24px; margin-bottom: 16px;">New Contact Form Message</h2>
        <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin: 16px 0 8px 0;"><strong>Message:</strong></p>
        <div style="background: #f8f8f8; padding: 16px; border-left: 4px solid #FF3D3D; font-size: 15px; line-height: 1.5; border-radius: 4px;">
          ${message.replace(/\n/g, '<br/>')}
        </div>
      </div>
    `

    try {
      // Primary attempt via direct API request (supported natively in browser)
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: 'hello@askcreations.studio',
          subject: `New Inquiry from ${name}`,
          html: htmlContent,
          reply_to: email,
        }),
      })

      const data = await response.json()

      // If domain verification restricts recipient on testing mode (resend.dev limit), send to fallback account email
      if (response.status === 403 && data.message?.includes('amansinghkaushik8@gmail.com')) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: 'amansinghkaushik8@gmail.com',
            subject: `New Inquiry from ${name}`,
            html: htmlContent,
            reply_to: email,
          }),
        })
      } else if (!response.ok && data.message) {
        throw new Error(data.message)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Failed to send email:', err)
      setErrorMessage(err.message || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useGSAP(
    () => {
      // Left column slides in from left
      gsap.fromTo(
        '.contact-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // Right form slides in from right
      gsap.fromTo(
        '.contact-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )

      // Contact info rows staggered entrance
      gsap.fromTo(
        '.contact-info-row',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
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
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0e0e0e] text-white py-20 md:py-28 lg:py-32 px-6 sm:px-10 md:px-12 lg:px-20 select-none overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* LEFT COLUMN */}
        <div className="contact-left flex flex-col items-start gap-10">

          {/* Headline */}
          <h2 className="font-clash font-medium text-[64px] sm:text-[80px] md:text-[96px] lg:text-[108px] leading-[0.9] tracking-tight text-white -mt-4">
            GET IN<br />TOUCH
          </h2>

          {/* Divider */}
          <div className="w-full border-t border-white/10" />

          {/* Contact Info Rows */}
          <div className="flex flex-col gap-0 w-full">

            {/* Email */}
            <div className="contact-info-row flex items-center gap-4 py-5 border-b border-white/10 group">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center text-white/40 group-hover:text-[#FF3D3D] transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <a
                href="mailto:hello@askcreations.studio"
                className="font-clash font-medium text-base sm:text-lg text-white/70 hover:text-[#FF3D3D] transition-colors duration-300 tracking-tight"
              >
                hello@askcreations.studio
              </a>
            </div>

            {/* Phone */}
            <div className="contact-info-row flex items-center gap-4 py-5 border-b border-white/10 group">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center text-white/40 group-hover:text-[#FF3D3D] transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <a
                href="tel:+919999999999"
                className="font-clash font-medium text-base sm:text-lg text-white/70 hover:text-[#FF3D3D] transition-colors duration-300 tracking-tight"
              >
                +91 99999 99999
              </a>
            </div>

            {/* Location */}
            <div className="contact-info-row flex items-center gap-4 py-5 group">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center text-white/40 group-hover:text-[#FF3D3D] transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <span className="font-clash font-medium text-base sm:text-lg text-white/70 tracking-tight">
                New Delhi, India
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="contact-right w-full">
          <div className="bg-[#181818] border border-white/[0.08] p-8 sm:p-10 md:p-12 flex flex-col gap-8">

            {/* Form Header */}
            <div className="flex flex-col gap-1">
              <h3 className="font-clash font-semibold text-xl sm:text-2xl text-white tracking-tight">
                Send Message
              </h3>
              <p className="font-sans text-sm text-white/40">
                I'll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-14 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#FF3D3D]/10 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#FF3D3D" strokeWidth="2" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="font-clash font-semibold text-white text-xl text-center">Message sent!</p>
                <p className="font-sans text-white/40 text-sm text-center max-w-xs">
                  Thanks for reaching out. I'll be in touch soon.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: '', email: '', message: '' }) }}
                  className="mt-4 font-clash font-semibold text-sm text-[#FF3D3D] border border-[#FF3D3D]/30 px-6 py-2.5 hover:bg-[#FF3D3D] hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {errorMessage && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans rounded">
                    {errorMessage}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="font-clash font-medium text-[11px] uppercase tracking-widest text-white/40">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    disabled={loading}
                    className="bg-[#222222] border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3D3D]/50 transition-colors duration-300 w-full disabled:opacity-50"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="font-clash font-medium text-[11px] uppercase tracking-widest text-white/40">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                    disabled={loading}
                    className="bg-[#222222] border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3D3D]/50 transition-colors duration-300 w-full disabled:opacity-50"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="font-clash font-medium text-[11px] uppercase tracking-widest text-white/40">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    rows={5}
                    required
                    disabled={loading}
                    className="bg-[#222222] border border-white/[0.08] px-4 py-3.5 font-sans text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FF3D3D]/50 transition-colors duration-300 w-full resize-none disabled:opacity-50"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full bg-white text-black font-clash font-semibold text-sm uppercase tracking-widest py-4 hover:bg-[#FF3D3D] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer mt-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  {!loading && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
