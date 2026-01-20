'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ImageCarousel = ({ images, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [images, autoPlayInterval])

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-[#007BFF]/10 to-[#A8E600]/10 rounded-3xl border-2 border-dashed border-[#007BFF]/20">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl text-[#36454F] font-bold mb-2">No Images Yet</p>
          <p className="text-sm text-[#36454F]/60">Please upload images from admin dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
      {images.map((img, index) => (
        <div
          key={`carousel-${index}`}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <Image 
            src={typeof img === 'string' ? img : img.url} 
            alt={`Product ${index + 1}`} 
            fill 
            className="object-contain p-4 bg-[#FFFFF0]" 
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-[#A8E600] w-8' : 'bg-[#36454F]/40 hover:bg-[#36454F]/60 w-2'
            }`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#36454F]/80 hover:bg-[#36454F] text-[#F5F5DC] w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >‹</button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#36454F]/80 hover:bg-[#36454F] text-[#F5F5DC] w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >›</button>
        </>
      )}
    </div>
  )
}

export default function Home() {
  const [heroImages, setHeroImages] = useState([])
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "NextGen 2-Wheeler Vehicles",
      category: "2-Wheeler",
      tagline: "Urban Mobility Redefined",
      description: "Our 2-wheeler electric vehicles are designed for the modern urban commuter who values efficiency, sustainability, and style. With a sleek aerodynamic design and advanced battery technology, these vehicles offer an impressive range of 50 km to 150 km on a single charge. Whether you're navigating busy city streets or cruising through suburban roads, our 2-wheelers deliver a smooth, silent, and eco-friendly ride. Equipped with fast charging capabilities, digital display, and eco mode, they combine cutting-edge technology with practical features to make your daily commute effortless and enjoyable.",
      images: [],
      storageKey: 'twoWheelerUrls',
      features: [
        { label: 'Range', value: '50-120 km', icon: '🔋' },
        { label: 'Charging', value: 'Fast Charging', icon: '⚡' }
      ]
    },
    {
      id: 2,
      name: "NextGen 3-Wheeler Vehicles",
      category: "3-Wheeler",
      tagline: "Built for Business",
      description: "NextGen 3-wheelers are engineered for commercial excellence, offering unmatched reliability and performance for businesses across India. Built with a robust chassis and powerful electric motor, these vehicles can handle heavy payloads of 700 kg to 800 kg while maintaining exceptional energy efficiency. With a range of 150 km to 300 km, our 3-wheelers are perfect for logistics, delivery services, and passenger(4+1) transport. The low maintenance design and long-lasting battery ensure minimal downtime and maximum productivity. Experience the future of commercial mobility with vehicles that are as tough as your business demands, yet gentle on the environment.",
      images: [],
      storageKey: 'threeWheelerUrls',
      features: [
        { label: 'Range', value: '150-300 km', icon: '🔋' },
        { label: 'Charging', value: 'Fast Charging', icon: '⚡' }
      ]
    },
    {
      id: 3,
      name: "EV lithium-ion & LFP(Lithium Ferrous phosphate) batteries Sales & Repair",
      category: "Battery & Pack Repair",
      tagline: "Restore Range. Extend Life.",
      description: "Specialised repair of EV lithium-ion & LFP(Lithium Ferrous phosphate) batteries including cell testing, module replacement, BMS diagnostics, and capacity restoration. Issues such as range drop, auto cut-off, overheating, or charging faults are identified using advanced testing tools and repaired with high-quality cells and components. Every serviced pack is balanced, safety-tested, and load-tested for reliable daily performance.",
      images: [],
      storageKey: 'batteryRepairUrls',
      features: [
        { label: 'Service', value: 'Cell Testing', icon: '🔬' },
        { label: 'Quality', value: 'High-Grade Cells', icon: '⚡' }
      ]
    },
    {
      id: 4,
      name: "EV Chargers sale,Repair & Service",
      category: "Charger Repair",
      tagline: "Safe & Fast Charging, Always.",
      description: "Complete service and repair of EV chargers and power supplies including fan failure, no output, slow charging, fuse damage, and connector issues. Internal PCB, cooling system, MOSFETs, and protection circuits are inspected and repaired with compatible components. Each charger is calibrated for correct output voltage and current to protect your battery and deliver fast, consistent charging.",
      images: [],
      storageKey: 'chargerRepairUrls',
      features: [
        { label: 'Service', value: 'PCB Repair', icon: '🔌' },
        { label: 'Testing', value: 'Voltage Calibration', icon: '⚙️' },
        { label: 'Speed', value: 'Fast Charging', icon: '⚡' },
        { label: 'Safety', value: 'Protection Circuits', icon: '🛡️' }
      ]
    }
  ])

  // Load hero images from API
  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()
        setHeroImages(data.heroImages || [])
      } catch (error) {
        console.error('Error loading hero images:', error)
      }
    }

    loadHeroImages()
    const interval = setInterval(loadHeroImages, 10000)
    return () => clearInterval(interval)
  }, [])

  // Load all product images from API
  useEffect(() => {
    const loadAllImages = async () => {
      try {
        const response = await fetch('/api/media')
        const data = await response.json()

        const updatedProducts = products.map(product => {
          const imageData = data[product.storageKey] || []
          const imageUrls = imageData.map(item => item.url || item)
          return { ...product, images: imageUrls }
        })

        setProducts(updatedProducts)
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadAllImages()
    const interval = setInterval(loadAllImages, 10000)
    return () => clearInterval(interval)
  }, [])

  // Get exactly 2 hero images or show placeholder
  const heroImage1 = heroImages[0]
  const heroImage2 = heroImages[1]

  return (
    <main className="min-h-screen bg-[#FFFFF0] pt-23">
      {/* HERO SECTION - TWO IMAGES SIDE BY SIDE */}
   <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-transparent">     
  
  {/* Two Images Side by Side - SHOW FULL IMAGES */}
  <div className="w-full max-w-8xl mx-auto mb-12 px-0">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-[450px] sm:h-[550px]">
      {/* Image 1 */}
      <div className="relative w-full h-full rounded-l-2xl overflow-hidden shadow-2xl bg-[#F8F9FA]">
        {heroImage1 ? (
          <Image 
            src={typeof heroImage1 === 'string' ? heroImage1 : heroImage1.url} 
            alt="Hero Image 1" 
            fill 
            className="object-contain p-4" 
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#007BFF]/10 to-[#A8E600]/10 border-2 border-dashed border-[#007BFF]/20 rounded-l-3xl">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-xl text-[#36454F] font-bold mb-2">Hero Image 1</p>
              <p className="text-sm text-[#36454F]/60">Upload from admin dashboard</p>
            </div>
          </div>
        )}
      </div>
      

      {/* Image 2 */}
      <div className="relative w-full h-full rounded-r-3xl overflow-hidden shadow-2xl bg-[#F8F9FA]">
        {heroImage2 ? (
          <Image 
            src={typeof heroImage2 === 'string' ? heroImage2 : heroImage2.url} 
            alt="Hero Image 2" 
            fill 
            className="object-contain p-4" 
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#007BFF]/10 to-[#A8E600]/10 border-2 border-dashed border-[#007BFF]/20 rounded-r-3xl">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-xl text-[#36454F] font-bold mb-2">Hero Image 2</p>
              <p className="text-sm text-[#36454F]/60">Upload from admin dashboard</p>
            </div>
          </div>
        )}
      </div>
    </div>
    
  </div>
  

  {/* Rest of your hero content remains the same */}
  {/* Hero Text Content */}
  <div className="relative z-10 text-center text-[#36454F] px-4 max-w-6xl mx-auto">
    <p className="text-xl md:text-2xl mb-4 font-bold tracking-wider text-[#36454F]/80">ELECTRIC REVOLUTION</p>
    
    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-[#36454F]">
      DRIVE THE<br/>
      <span className="text-[#36454F]">FUTURE</span>
    </h1>
    
    <p className="text-xl md:text-2xl mb-12 font-semibold max-w-4xl mx-auto text-gray-500">
      Experience India's most advanced electric 2-wheelers, 3-wheelers,
      and expert EV lithium-ion & LFP(Lithium Ferrous phosphate) batteries & chargers Sales & repair services.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <Link href="/products">
        <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
          EXPLORE VEHICLES →
        </button>
      </Link>
      <Link href="/dealership">
        <button className="bg-transparent border-3 border-[#36454F] hover:bg-[#36454F] hover:text-[#F5F5DC] text-[#36454F] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 text-xl">
          GET DEALERSHIP
        </button>
      </Link>
    </div>
  </div>

 
</section>




      {/* VEHICLES & SERVICES SECTIONS */}
      {products.map((product, index) => (
        <section
          key={`product-${product.id}`}
          className={`py-10 md:py-15 px-4 md:px-8 ${index % 2 === 0 ? 'bg-[#FFFFF0]' : 'bg-[#FFFFF0]'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
              <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <ImageCarousel images={product.images} />
              </div>

              <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-[#36454F]/70 font-bold text-lg mb-2">{product.category}</p>
                <h2 className="text-4xl md:text-6xl font-black mb-4 text-[#36454F]">{product.name}</h2>
                <p className="text-2xl text-[#36454F] font-bold mb-6">{product.tagline}</p>
                <p className="text-[#36454F] text-lg leading-relaxed mb-8">{product.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feature, idx) => (
                    <div key={`feature-${product.id}-${idx}`} className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                      <div className="text-3xl mb-2">{feature.icon}</div>
                      <div className="text-xs text-[#36454F]/60 font-semibold mb-1">{feature.label}</div>
                      <div className="text-lg font-black text-[#36454F]">{feature.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link href={product.id <= 2 ? "/products" : "/contact"} className="flex-1">
                    <button className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                      {product.id <= 2 ? 'VIEW DETAILS →' : 'BOOK SERVICE →'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* WHY CHOOSE US */}
      <section className="py-10 md:py-10 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-[#36454F]">
              WHY CHOOSE <span className="text-[#36454F]">NEXTGEN EV</span>
            </h2>
            <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-8"></div>
            <p className="text-2xl text-[#36454F] opacity-80">
              Leading the electric revolution in India with innovative vehicles,
              advanced battery technology, and expert repair services.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: '100% Electric', desc: 'Zero emissions, pure performance' },
              { icon: '🌱', title: 'Clean Mobility Facilities', desc: 'Sustainable electric mobility & supporting green transportation across India' },
              { icon: '🔧', title: '3 Year Warranty', desc: 'On battery for new vehicles' },
              { icon: '💬', title: '1 Year Warranty', desc: 'on motor,controller and charger' }
            ].map((feature, i) => (
              <div key={`why-${i}`} className="bg-[#FFFFF0] p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border-2 border-[#36454F]/10 hover:border-[#A8E600] group">
                <div className="text-8xl mb-6 transform group-hover:scale-125 transition-transform">{feature.icon}</div>
                <h3 className="text-2xl font-black mb-3 text-[#36454F]">{feature.title}</h3>
                <p className="text-[#36454F]/70 font-semibold text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEALERSHIP PROMO */}
      <section className="py-10 md:py-10 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#36454F] text-lg font-bold mb-4">NATIONWIDE NETWORK</p>
          <h2 className="text-5xl md:text-7xl font-black mb-6 text-[#36454F]">
            Become an Authorized <span className="text-[#36454F]">NextGen EV Dealer</span>
          </h2>
          <p className="text-2xl mb-12 text-gray-500 opacity-90">
            Experience our electric vehicles in person. Locate your nearest
            dealership, book a test drive, and get expert guidance today.
          </p>
          <Link href="/dealership">
            <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
              DEALERSHIP →
            </button>
          </Link>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#36454F]">
            Have Questions About Our Vehicles or Repair Services?
          </h2>
          <p className="text-2xl mb-12 text-gray-500 opacity-90">
            Experience the future of mobility today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/about">
              <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 shadow-2xl text-xl">
                KNOW MORE
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-3 border-[#36454F] hover:bg-[#36454F] hover:text-[#F5F5DC] text-[#36454F] font-bold py-5 px-12 rounded-full transition-all transform hover:scale-110 text-xl">
                CONTACT US
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
