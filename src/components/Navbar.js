'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-[#212529] text-[#F8F9FA] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-1 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <Image 
              src="/nextgen.png" 
              alt="NextGen EV Logo" 
              width={80} 
              height={100}
              className=""
              priority
            />
            <span className="text-2xl font-bold text-[#F8F9FA]">
              NextGen<span className="text-[#7AB800]">EV</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            <Link href="/" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">Home</Link>
            <Link href="/products" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">Products</Link>
            <Link href="/dealership" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">Dealership</Link>
            <Link href="/services" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">Services</Link>
            <Link href="/about" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">About</Link>
            <Link href="/contact" className="px-4 py-2 hover:bg-[#1E5EBF] rounded-2xl transition">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#F8F9FA]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1d21] border-t border-gray-700">
          <div className="flex flex-col px-4 py-2 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              Home
            </Link>
            <Link href="/products" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              Products
            </Link>
            <Link href="/dealership" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              Dealership
            </Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              Services
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              About
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-[#1E5EBF] rounded">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
