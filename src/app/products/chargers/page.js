'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'


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
      <div className="flex items-center justify-center h-96 bg-gradient-to-br from-orange-200/20 to-[#36454F]/10 rounded-2xl border-2 border-dashed border-orange-300">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">📷</div>
          <p className="text-xl text-[#36454F] font-bold mb-2">No Images Available</p>
          <p className="text-sm text-[#36454F]/60">Please upload product images from admin dashboard</p>
        </div>
      </div>
    )
  }


  return (
    <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg bg-[#FFFFF0]">
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
            className="object-contain p-4"
            priority={index === 0}
          />
        </div>
      ))}


      {images.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-orange-500 w-6' : 'bg-orange-200 w-2 hover:bg-orange-300'
                }`}
              />
            ))}
          </div>


          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#36454F] hover:bg-[#2a3238] text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-300 hover:shadow-lg"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#36454F] hover:bg-[#2a3238] text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold z-10 transition-all duration-300 hover:shadow-lg"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}


export default function ChargersPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)


  const loadProducts = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setProducts(data.chargerProducts || [])
    } catch (error) {
      console.error('Error loading chargers:', error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadProducts()
    const interval = setInterval(loadProducts, 10000)
    return () => clearInterval(interval)
  }, [])


  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-[#36454F]"></div>
      </div>
    )
  }


  return (
    <main className="min-h-screen bg-[#FFFFF0]">
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatBtn {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .float-btn {
          animation: slideInRight 0.6s ease-out forwards;
        }

        .float-btn:nth-child(1) {
          animation-delay: 0.1s;
        }

        .float-btn:nth-child(2) {
          animation-delay: 0.2s;
        }

        .float-btn:nth-child(3) {
          animation-delay: 0.3s;
        }

        .float-btn {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .float-btn:hover {
          animation: floatBtn 3s ease-in-out infinite;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
          transform: scale(1.1);
        }

        .float-btn:hover .expand-text {
          animation: none;
        }
      `}</style>

      {/* Floating Navigation Buttons - Right Side */}
      <div className="fixed right-4 top-32 z-40 flex flex-col gap-3 md:gap-4">
        {/* 2-Wheeler Button */}
        <Link href="/products/2w">
          <button className="float-btn flex items-center gap-2 bg-[#A8E600] hover:bg-[#98d600] text-[#36454F] p-3 rounded-full font-bold shadow-lg group transition-all duration-400">
            <span className="text-xl md:text-2xl transition-transform duration-400 group-hover:scale-110">🏍️</span>
            <span className="expand-text hidden group-hover:inline text-sm whitespace-nowrap pr-2 transition-all duration-400">2-Wheeler</span>
          </button>
        </Link>


        {/* 3-Wheeler Button */}
        <Link href="/products/3w">
          <button className="float-btn flex items-center gap-2 bg-[#36454F] hover:bg-[#2a3238] text-white p-3 rounded-full font-bold shadow-lg group transition-all duration-400">
            <span className="text-xl md:text-2xl transition-transform duration-400 group-hover:scale-110">🛺</span>
            <span className="expand-text hidden group-hover:inline text-sm whitespace-nowrap pr-2 transition-all duration-400">3-Wheeler</span>
          </button>
        </Link>


        {/* Batteries Button */}
        <Link href="/products/batteries">
          <button className="float-btn flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full font-bold shadow-lg group transition-all duration-400">
            <span className="text-xl md:text-2xl transition-transform duration-400 group-hover:scale-110">🔋</span>
            <span className="expand-text hidden group-hover:inline text-sm whitespace-nowrap pr-2 transition-all duration-400">Batteries</span>
          </button>
        </Link>
      </div>


      {/* Header Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-[#36454F] mb-4">
            EV <span className="text-orange-500">Chargers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Fast, Reliable, and Safe Charging Solutions
          </p>
        </div>
      </section>


      {/* Products Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <div className="text-7xl mb-4">⚡</div>
              <h2 className="text-3xl font-black text-[#36454F] mb-3">No Chargers Available</h2>
              <p className="text-lg text-gray-600 mb-6">Our charger products are being updated. Check back soon!</p>
              <Link href="/contact">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Contact Us for Details
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {products.map((product, index) => (
                <div key={product.id || index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image Section */}
                    <div className={`${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                      <ProductCarousel images={product.images || []} />
                    </div>


                    {/* Details Section */}
                    <div className={`${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <h2 className="text-3xl md:text-4xl font-black text-[#36454F] mb-3">{product.name}</h2>
                      
                      {product.price && (
                        <p className="text-2xl md:text-3xl text-orange-500 font-black mb-4">{product.price}</p>
                      )}


                      <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>


                      {/* Specifications Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {product.power && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">⚡</div>
                            <div className="text-xs text-gray-600 font-semibold">Power</div>
                            <div className="text-sm font-black text-[#36454F]">{product.power}</div>
                          </div>
                        )}
                        {product.chargingSpeed && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">⏱️</div>
                            <div className="text-xs text-gray-600 font-semibold">Charging Speed</div>
                            <div className="text-sm font-black text-[#36454F]">{product.chargingSpeed}</div>
                          </div>
                        )}
                        {product.compatibility && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">🔌</div>
                            <div className="text-xs text-gray-600 font-semibold">Compatibility</div>
                            <div className="text-sm font-black text-[#36454F]">{product.compatibility}</div>
                          </div>
                        )}
                        {product.waterproof && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">💧</div>
                            <div className="text-xs text-gray-600 font-semibold">Waterproof</div>
                            <div className="text-sm font-black text-[#36454F]">{product.waterproof}</div>
                          </div>
                        )}
                        {product.warranty && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">✅</div>
                            <div className="text-xs text-gray-600 font-semibold">Warranty</div>
                            <div className="text-sm font-black text-[#36454F]">{product.warranty}</div>
                          </div>
                        )}
                        {product.weight && (
                          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 hover:border-orange-500 hover:shadow-md transition-all duration-300">
                            <div className="text-2xl mb-1">⚖️</div>
                            <div className="text-xs text-gray-600 font-semibold">Weight</div>
                            <div className="text-sm font-black text-[#36454F]">{product.weight}</div>
                          </div>
                        )}
                      </div>


                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className="flex-1">
                          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                            Inquire Now
                          </button>
                        </Link>
                        <Link href="/dealership" className="flex-1">
                          <button className="w-full border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
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
      <section className="px-4 py-16 bg-[#36454F] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Charge Your EV Faster</h2>
          <p className="text-lg text-gray-300 mb-6">Get the best charging solutions for your electric vehicle</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                Get Charger Today
              </button>
            </Link>
            <Link href="/">
              <button className="border-2 border-white hover:bg-white hover:text-[#36454F] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
