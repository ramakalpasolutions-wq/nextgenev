'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState({
    twoWheeler: [],
    threeWheeler: [],
    batteries: [],
    chargers: []
  })
  const [loading, setLoading] = useState(true)

  // Load all products from API
  const loadProducts = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setProducts({
        twoWheeler: data.twoWheelerProducts || [],
        threeWheeler: data.threeWheelerProducts || [],
        batteries: data.batteryRepairUrls || [],
        chargers: data.chargerRepairUrls || []
      })
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
    const interval = setInterval(loadProducts, 10000)
    return () => clearInterval(interval)
  }, [])

  const SectionCard = ({ title, icon, href, color }) => {
    return (
      <Link href={href}>
        <div className={`${color} rounded-3xl p-12 text-center cursor-pointer transform hover:scale-105 transition shadow-xl`}>
          <div className="text-7xl mb-4">{icon}</div>
          <h2 className="text-4xl font-black text-[#36454F] mb-2">{title}</h2>
          {/* <p className="text-xl text-[#36454F]/70 mb-6">{count} Products</p> */}
          <button className="bg-[#36454F] hover:bg-[#2a3238] text-white font-bold py-3 px-8 rounded-full transition">
            Explore →
          </button>
        </div>
      </Link>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A8E600]"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FFFFF0] pt-24 pb-12">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-[#36454F] mb-6">
            Our <span className="text-[#A8E600]">Products</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500">
            Complete EV Solutions for Every Need
          </p>
        </div>
      </section>

      {/* Four Category Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionCard 
              title="2-Wheelers"
              icon="🏍️"
              count={products.twoWheeler.length}
              href="/products/2w"
              color="bg-gradient-to-br from-[#A8E600]/20 to-[#A8E600]/5"
            />
            <SectionCard 
              title="3-Wheelers"
              icon="🛺"
              count={products.threeWheeler.length}
              href="/products/3w"
              color="bg-gradient-to-br from-[#36454F]/20 to-[#36454F]/5"
            />
            <SectionCard 
              title="Batteries"
              icon="🔋"
              // count={products.batteries.length}
              href="/products/batteries"
              color="bg-gradient-to-br from-blue-200/20 to-blue-200/5"
            />
            <SectionCard 
              title="Chargers"
              icon="⚡"
              // count={products.chargers.length}
              href="/products/chargers"
              color="bg-gradient-to-br from-orange-200/20 to-orange-200/5"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#36454F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Go Electric?
          </h2>
          <p className="text-xl mb-8">Choose your perfect EV solution today</p>
          <Link href="/contact">
            <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-4 px-10 rounded-full transition transform hover:scale-105">
              Contact Us Now →
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}
