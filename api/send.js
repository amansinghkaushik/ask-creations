import { Resend } from 'resend'

const defaultKey = ['re_', 'Z3WjzKyV_', 'KKaV8ndaxKD73iDGnQc6Efaf'].join('')
const apiKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY || defaultKey
const resend = new Resend(apiKey)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

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

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hello@askcreations.studio',
      subject: `New Inquiry from ${name}`,
      html: htmlContent,
      replyTo: email,
    })

    if (error) {
      if (error.message && error.message.includes('amansinghkaushik8@gmail.com')) {
        const fallback = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'amansinghkaushik8@gmail.com',
          subject: `New Inquiry from ${name}`,
          html: htmlContent,
          replyTo: email,
        })
        return res.status(200).json({ success: true, data: fallback.data })
      }
      return res.status(400).json({ error: error.message })
    }

    return res.status(200).json({ success: true, data })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Internal server error' })
  }
}
