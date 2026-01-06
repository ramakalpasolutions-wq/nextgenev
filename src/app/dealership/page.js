'use client'
import { useState } from 'react'

export default function DealershipPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessName: '',
    // experience: '',
    // investment: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitted(false)

  try {
    const response = await fetch('/api/dealership', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('Application submitted successfully:', data)
      setSubmitted(true)
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        businessName: '',
        // experience: '',
        // investment: '',
        message: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } else {
      throw new Error(data.error || 'Failed to submit application')
    }
  } catch (error) {
    console.error('Submit error:', error)
    alert(error.message || 'Failed to submit application. Please try again.')
  }
}


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // const dealerships = [
  //   {
  //     city: 'Mumbai',
  //     address: '123 Main Street, Andheri West, Mumbai, Maharashtra 400058',
  //     phone: '+91 9876543210',
  //     email: 'mumbai@nextgenev.com',
  //   },
  //   {
  //     city: 'Delhi',
  //     address: '456 Park Avenue, Connaught Place, New Delhi 110001',
  //     phone: '+91 9876543211',
  //     email: 'delhi@nextgenev.com',
  //   },
  //   {
  //     city: 'Bangalore',
  //     address: '789 Tech Park, Whitefield, Bangalore, Karnataka 560066',
  //     phone: '+91 9876543212',
  //     email: 'bangalore@nextgenev.com',
  //   },
  //   {
  //     city: 'Chennai',
  //     address: '321 Beach Road, Adyar, Chennai, Tamil Nadu 600020',
  //     phone: '+91 9876543213',
  //     email: 'chennai@nextgenev.com',
  //   },
  // ]

  return (
    <div className="min-h-screen pt-16 bg-[#FAF8F1]">
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto bg-[#FAF8F1] rounded-xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">Become a Dealership Partner</h2>
            <div className="w-24 h-1 bg-[#A8E600] mx-auto mb-8"></div>
            <p className="text-xl text-black opacity-90 max-w-3xl mx-auto">
              Join the NextGen EV family and be part of the electric revolution. Fill out the form below to apply.
            </p>
          </div>

          <div className="bg-gray-500 rounded-3xl p-8 md:p-12 shadow-2xl m-2">
            {submitted && (
              <div className="bg-[#A8E600]/20 border-2 border-[#A8E600] text-white px-6 py-4 rounded-lg mb-8 flex items-center">
                <svg className="w-6 h-6 text-[#A8E600] mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Thank you! We'll contact you within 48 hours.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-9">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2">Full Name *</label>
                  <input 
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/10 text-white bg-[#FAF8F1]/10"
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white font-bold mb-2">Email Address *</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]/10"
                    placeholder="Enter Mail"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2">Phone Number *</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]/10"
                    placeholder="XXXXX XXXXX"
                    required
                  />
                </div>
                
                {/* <div>
                  <label className="block text-white font-bold mb-2">Business Name *</label>
                  <input 
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]"
                    placeholder="Your Company Name"
                    required
                  />
                </div> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2">City *</label>
                  <input 
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]/10"
                    placeholder="Enter your city"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white font-bold mb-2">State *</label>
                  <input 
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]/10"
                    placeholder="Enter your state"
                    required
                  />
                </div>
              </div>

             
              
              <div>
                <label className="block text-white font-bold mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-[#212529]/20 rounded-lg focus:border-[#007BFF] focus:outline-none focus:ring-2 focus:ring-[#007BFF]/20 text-white bg-[#FAF8F1]/10 h-32"
                  placeholder="Tell us about your business plans and location preferences..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="flex-1 bg-[#A8E600] hover:bg-[#007BFF] text-[#212729] font-bold py-4 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-[#FAF8F1]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#A8E600]">Partnership Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'High Margins', desc: 'Competitive profit margins on all products', color: 'border-[#007BFF]' },
              { icon: '📚', title: 'Training & Support', desc: 'Comprehensive training for your team', color: 'border-[#A8E600]' },
              { icon: '📢', title: 'Marketing Support', desc: 'Co-branded marketing materials', color: 'border-[#007BFF]' },
              { icon: '🔧', title: 'Technical Assistance', desc: '24/7 technical support hotline', color: 'border-[#A8E600]' },
              { icon: '📦', title: 'Inventory Support', desc: 'Flexible inventory management', color: 'border-[#007BFF]' },
              { icon: '🎯', title: 'Exclusive Territory', desc: 'Protected dealership zones', color: 'border-[#A8E600]' }
            ].map((benefit, index) => (
              <div key={index} className={`bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-2xl transition border-2 ${benefit.color} hover:scale-105 transform`}>
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-black">{benefit.title}</h3>
                <p className="text-black opacity-80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
