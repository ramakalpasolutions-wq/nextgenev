'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Product Image Carousel Component
const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images])

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-[#A8E600]/10 to-[#36454F]/10 rounded-3xl border-2 border-dashed border-[#36454F]/20">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl text-[#36454F] font-bold mb-2">No Images Available</p>
          <p className="text-sm text-[#36454F]/60">Please upload product images from admin dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl bg-[#FFFFF0]">
      {images.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: currentIndex === index ? 1 : 0 }}
        >
          <Image
            src={img}
            alt={`Product ${index + 1}`}
            fill
            className="object-contain p-6"
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-[#A8E600] w-8' : 'bg-[#36454F]/40 w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#36454F]/80 hover:bg-[#36454F] text-[#F5F5DC] w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#36454F]/80 hover:bg-[#36454F] text-[#F5F5DC] w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold transition z-10"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}

export default function ThreeWheelerProducts() {
  const [products, setProducts] = useState([])

  // Load products from API
  const loadProducts = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      console.log('3W Products loaded:', data.threeWheelerProducts?.length || 0)
      setProducts(data.threeWheelerProducts || [])
    } catch (error) {
      console.error('Error loading 3W products:', error)
      setProducts([])
    }
  }

  useEffect(() => {
    loadProducts()
    
    // Refresh every 10 seconds
    const interval = setInterval(loadProducts, 10000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#FFFFF0] pt-24 pb-12">
      {/* Floating 2-Wheeler Icon - Positioned Above 3-Wheeler */}
      <Link href="/products/2w">
        <div className="fixed right-4 md:right-6 bottom-32 md:bottom-auto md:top-[45%] -translate-y-0 md:-translate-y-1/2 z-50 group cursor-pointer">
          <div className="relative">
            {/* Pulsing glow ring */}
            <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-[#36454F] via-[#A8E600] to-[#36454F] rounded-full blur-sm md:blur-md opacity-75 group-hover:opacity-100 animate-pulse"></div>
            
            {/* Main icon button */}
            <div className="relative bg-gradient-to-r from-[#36454F] to-[#A8E600] p-3 md:p-5 rounded-full shadow-xl md:shadow-2xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 duration-300">
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-4xl">🏍️</span>
                {/* Text visible only on larger screens */}
                <span className="hidden xl:block text-white font-bold text-sm whitespace-nowrap">
                  2-Wheeler
                </span>
              </div>
            </div>
          </div>
          
          {/* Tooltip - Hidden on mobile, shows on tablet+ */}
          <div className="hidden md:block absolute right-full mr-3 md:mr-4 top-1/2 -translate-y-1/2 bg-[#36454F] text-[#F5F5DC] px-4 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-bold text-sm md:text-base shadow-xl md:shadow-2xl group-hover:mr-4 md:group-hover:mr-5 pointer-events-none">
            <span className="flex items-center gap-2">
              View 2-Wheelers
              <span className="text-lg md:text-xl">→</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Header Section */}
      <section className="bg-[#FFFFF0] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-[#36454F] mb-6">
            3-Wheeler <span className="text-[#36454F]">Electric Vehicles</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-8">
            Built for Business - Powerful, Reliable, Cost-Effective
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🛺</div>
              <h2 className="text-4xl font-black text-[#36454F] mb-4">No Products Available</h2>
              <p className="text-xl text-[#36454F]/70 mb-8">
                Our 3-wheeler products are being updated. Check back soon!
              </p>
              <Link href="/contact">
                <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-4 px-10 rounded-full transition shadow-xl">
                  Contact Us for Details
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Images */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <ProductCarousel images={product.images || []} />
                  </div>

                  {/* Product Details */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="bg-[#FFFFF0] rounded-3xl p-8 shadow-xl border-2 border-[#36454F]/10">
                      <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#36454F]">
                        {product.name}
                      </h2>
                      
                      {product.price && (
                        <p className="text-3xl text-[#36454F] font-black mb-6">
                          {product.price}
                        </p>
                      )}

                      <p className="text-[#36454F] text-lg leading-relaxed mb-8">
                        {product.description}
                      </p>

                      {/* Specifications Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {product.range && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">🔋</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Range</div>
                            <div className="text-lg font-black text-[#36454F]">{product.range}</div>
                          </div>
                        )}
                        
                        {product.payload && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">📦</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Payload</div>
                            <div className="text-lg font-black text-[#36454F]">{product.payload}</div>
                          </div>
                        )}
                        
                        {product.motor && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">⚙️</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Motor</div>
                            <div className="text-lg font-black text-[#36454F]">{product.motor}</div>
                          </div>
                        )}
                        
                        {product.chargingTime && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Charging</div>
                            <div className="text-lg font-black text-[#36454F]">{product.chargingTime}</div>
                          </div>
                        )}
                        
                        {product.topSpeed && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">🏁</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Top Speed</div>
                            <div className="text-lg font-black text-[#36454F]">{product.topSpeed}</div>
                          </div>
                        )}
                        
                        {product.batteryCapacity && (
                          <div className="bg-[#FFFFF0] p-4 rounded-xl border-2 border-[#36454F]/10 hover:border-[#A8E600] transition shadow-sm">
                            <div className="text-3xl mb-2">🔌</div>
                            <div className="text-xs text-[#36454F]/60 font-semibold mb-1">Battery</div>
                            <div className="text-lg font-black text-[#36454F]">{product.batteryCapacity}</div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/contact" className="flex-1">
                          <button className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                            Inquire Now →
                          </button>
                        </Link>
                        <Link href="/dealership" className="flex-1">
                          <button className="w-full bg-transparent border-2 border-[#36454F] hover:bg-[#36454F] hover:text-[#F5F5DC] text-[#36454F] font-bold py-4 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                            Get Dealership
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FFFFF0] mb-20 md:mb-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-[#36454F] mb-6">
            Power Your Business with EV
          </h2>
          <p className="text-xl text-gray-500 mb-8">
            Experience commercial excellence with our 3-wheeler solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl">
                Schedule Test Drive
              </button>
            </Link>
            <Link href="/">
              <button className="bg-transparent border-3 border-[#36454F] hover:bg-[#36454F] hover:text-[#F5F5DC] text-[#36454F] font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
