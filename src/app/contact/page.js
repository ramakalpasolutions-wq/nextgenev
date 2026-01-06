'use client'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const loadingToast = toast.loading('Sending your message...')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('✅ Message sent successfully! Check your email for confirmation.', {
          id: loadingToast,
          duration: 5000,
        })

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error(`❌ ${error.message || 'Failed to send message. Please try again.'}`, {
        id: loadingToast,
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-16 bg-[#FAF8F1]">
      {/* Toast Container */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#212529',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            style: {
              background: '#A8E600',
              color: '#F8F9FA',
            },
            iconTheme: {
              primary: '#F8F9FA',
              secondary: '#A8E600',
            },
          },
          error: {
            style: {
              background: '#dc2626',
              color: '#F8F9FA',
            },
            iconTheme: {
              primary: '#F8F9FA',
              secondary: '#dc2626',
            },
          },
          loading: {
            style: {
              background: '#007BFF',
              color: '#F8F9FA',
            },
          },
        }}
      />

      {/* Hero Section - Electric Blue & Lime Green Gradient */}
      <div className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#36454F]">Contact Us</h1>
          <div className="w-24 h-1 bg-[#212529] mx-auto mb-8"></div>
          <p className="text-xl text-[#212529] max-w-3xl mx-auto">
            Get in touch with us for any inquiries or support
          </p>
        </div>
      </div>

      <div className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Ivory Background */}
            <div className="bg-[#FAF8F1] rounded-2xl p-8 shadow-lg border-2 border-[#007BFF]">
              <h2 className="text-2xl font-bold mb-6 text-[#36454F]">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#212529] font-semibold mb-2">Full Name *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-[#212529] bg-white"
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#212529] font-semibold mb-2">Email Address *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-[#212529] bg-white"
                    placeholder="Enter Mail"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#212529] font-semibold mb-2">Phone Number *</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-[#212529] bg-white"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#212529] font-semibold mb-2">Subject *</label>
                  <input 
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-[#212529] bg-white"
                    placeholder="Subject of your inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-[#212529] font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 h-32 text-[#212529] bg-white"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                {/* Lime Green Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 px-8 rounded-lg transition transform text-[#F8F9FA] ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#A8E600] hover:bg-[#98d600] hover:scale-105 shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>

              {/* Quick Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: ''
                    })
                    toast('📋 Form cleared!', { duration: 2000 })
                  }}
                  className="flex-1 bg-white border-2 border-[#007BFF] text-[#007BFF] font-semibold py-2 px-4 rounded-lg hover:bg-[#007BFF] hover:text-white transition"
                >
                  Clear Form
                </button>
                <button
                  onClick={() => toast.success('We typically respond within 24 hours!', { duration: 3000 })}
                  className="flex-1 bg-white border-2 border-[#A8E600] text-[#A8E600] font-semibold py-2 px-4 rounded-lg hover:bg-[#A8E600] hover:text-white transition"
                >
                  Response Time
                </button>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-[#36454F]">Get in Touch</h2>
                <p className="text-[#212529] mb-8">
                  Have questions? We're here to help! Reach out to us through any of the channels below.
                </p>
              </div>
              
              <div className="space-y-6">
                {/* Headquarters - Electric Blue Accent */}
                <div className="flex items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#007BFF]">
                  <div className="bg-[#007BFF]/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[#212529]">Location</h3>
                    <p className="text-[#212529] opacity-80">Near Saptha Kanikalamma Temple, Tirupati Main Road,
Doddipalle, Chittoor - 517001
Andhra Pradesh, India</p>
                  </div>
                </div>
                
                {/* Phone - Lime Green Accent */}
                <div className="flex items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#A8E600]">
                  <div className="bg-[#A8E600]/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-[#A8E600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[#212529]">Phone</h3>
                    <a
                      href="tel:+91 81067 24737"
                      onClick={() => toast('📞 Opening phone dialer...', { duration: 2000 })}
                      className="text-[#007BFF] hover:underline font-semibold"
                    >
                      +91 81067 24737
                    </a>
                  </div>
                </div>
                
                {/* Email - Electric Blue Accent */}
                <div className="flex items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#007BFF]">
                  <div className="bg-[#007BFF]/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-[#007BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[#212529]">Email</h3>
                    <a
                      href="mailto:support@nextgeneev.com"
                      onClick={() => toast('📧 Opening email client...', { duration: 2000 })}
                      className="text-[#007BFF] hover:underline block font-semibold"
                    >
                      support@nextgeneev.com
                    </a>
                  </div>
                </div>
                
                {/* Business Hours - Lime Green Accent */}
                <div className="flex items-start bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#A8E600]">
                  <div className="bg-[#A8E600]/10 p-3 rounded-lg mr-4">
                    <svg className="w-6 h-6 text-[#A8E600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-[#212529]">Business Hours</h3>
                    <p className="text-[#212529] opacity-80">Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
