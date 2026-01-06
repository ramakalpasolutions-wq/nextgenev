export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 bg-[#FFFFF0]">
      {/* Hero Section */}
      <div className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-bold tracking-[0.3em] text-[#36454F] opacity-70 mb-4">WHO WE ARE</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-[#36454F]">About NextGen EV</h1>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-[#36454F] max-w-3xl mx-auto opacity-80 font-semibold">
            Pioneering the future of electric mobility in India with innovation, sustainability, and cutting-edge technology
          </p>
        </div>
      </div>

    {/* Mission & Vision Section - Light Cards */}
<section className="py-5 md:py-10 px-4 md:px-8 bg-[#FFFFF0]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-5xl md:text-6xl font-black text-center mb-8 text-[#36454F]">Our Promise</h2>
    <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Mission Card */}
      <div 
        className="bg-white p-12 rounded-3xl shadow-xl border-l-4 border-[#36454F] hover:shadow-2xl transition-all"
      >
        <div className="mb-6">
          <svg 
            className="w-16 h-16 text-[#A8E600]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black mb-6 text-[#36454F]">
          Our Mission
        </h3>
        
        <p className="text-lg leading-relaxed text-[#36454F] opacity-80">
          Deliver affordable, eco-friendly electric vehicles that cut fuel costs, reduce 
          emissions, and support everyday riders, delivery partners, and small 
          businesses across cities and tier-2 towns like Chittoor.
        </p>
      </div>

      {/* Vision Card */}
      <div 
        className="bg-white p-12 rounded-3xl shadow-xl border-l-4 border-[#A8E600] hover:shadow-2xl transition-all"
      >
        <div className="mb-6">
          <svg 
            className="w-16 h-16 text-[#36454F]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-black mb-5 text-[#36454F]">
          Our Vision
        </h3>
        
        <p className="text-lg leading-relaxed text-[#36454F] opacity-80">
          Build a nationwide network where clean, intelligent EVs are the first choice 
          for every short trip, last-mile delivery, and commercial journey—starting 
          from hubs like NextGenEV in Doddipalle, Chittoor.
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Company Overview */}
      <section className="py-10 md:py-10 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-8 text-[#36454F]">Our Story</h2>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[#36454F] leading-relaxed">
            <p className="text-xl opacity-90">
              NextGen EV is a pioneering electric vehicle manufacturer based in India, committed to 
              revolutionizing the future of sustainable transportation. Founded with a vision to create 
              eco-friendly mobility solutions tailored for Indian road conditions, we combine cutting-edge 
              technology with practical design.
            </p>
            
            <p className="text-xl opacity-90">
              Our state-of-the-art manufacturing facility employs advanced engineering techniques to 
              produce high-performance electric vehicles that are both affordable and reliable. Every 
              vehicle undergoes rigorous testing to ensure it meets our strict quality standards.
            </p>
            
            <p className="text-xl opacity-90">
              With a dedicated team of engineers, designers, and customer support professionals, NextGen EV 
              is more than just a vehicle manufacturer—we're building a sustainable future for India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-[#36454F]/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-6xl font-black text-[#36454F] mb-3">10+</div>
              <p className="text-[#36454F] font-bold text-lg">Years Experience</p>
            </div>
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-[#36454F]/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-6xl font-black text-[#A8E600] mb-3">50+</div>
              <p className="text-[#36454F] font-bold text-lg">Cities Covered</p>
            </div>
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-[#36454F]/10 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="text-6xl font-black text-[#36454F] mb-3">80K+</div>
              <p className="text-[#36454F] font-bold text-lg">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Wheeler Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-7xl mr-6">🛵</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#36454F]">2-Wheeler Electric Scooters</h2>
          </div>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-[#36454F]">
              <h3 className="text-3xl font-black mb-6 text-[#36454F]">Design & Performance</h3>
              <ul className="space-y-4 text-[#36454F]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Lightweight Chassis:</strong> Aluminum alloy frame for better handling</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Powerful Motor:</strong> 2500W-3000W BLDC hub motor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Top Speed:</strong> Up to 75 km/h</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Range:</strong> 100-120 km per charge</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Smart Features:</strong> Digital display, mobile app connectivity</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-[#A8E600]">
              <h3 className="text-3xl font-black mb-6 text-[#A8E600]">Safety Features</h3>
              <ul className="space-y-4 text-[#36454F]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Advanced Braking:</strong> Combined braking system (CBS)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>LED Lighting:</strong> Bright LED headlamps and taillights</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Anti-Theft:</strong> GPS tracking and remote immobilization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Tubeless Tires:</strong> Better grip and puncture resistance</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>IP67 Rating:</strong> Water and dust resistant</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Wheeler Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-7xl mr-6">🛺</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#36454F]">3-Wheeler Cargo Vehicles</h2>
          </div>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-[#A8E600]">
              <h3 className="text-3xl font-black mb-6 text-[#A8E600]">Commercial Excellence</h3>
              <ul className="space-y-4 text-[#36454F]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Payload Capacity:</strong> 500-700 kg</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Cargo Volume:</strong> 2.5-3 cubic meters</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Range:</strong> 120-150 km per charge</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Motor Power:</strong> 5000W BLDC motor</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#36454F] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Durability:</strong> Heavy-duty steel chassis</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border-2 border-[#36454F]">
              <h3 className="text-3xl font-black mb-6 text-[#36454F]">Business Benefits</h3>
              <ul className="space-y-4 text-[#36454F]">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Cost Savings:</strong> 80% lower running cost vs diesel</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Low Maintenance:</strong> Minimal moving parts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Fleet Management:</strong> Real-time tracking and analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Zero Emissions:</strong> Eligible for government subsidies</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-[#A8E600] mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg"><strong>Fast ROI:</strong> Payback within 18-24 months</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Technology Section */}
      <section className="py-10 md:py-10 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-7xl mr-6">🔋</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#36454F]">Advanced Battery Technology</h2>
          </div>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-2xl border-2 border-[#36454F]/20 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black mb-6 text-[#A8E600]">Lithium-Ion Battery</h3>
              <ul className="space-y-3 text-[#36454F]">
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Capacity:</strong> 48V/60V/72V options</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Energy Density:</strong> 150-200 Wh/kg</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Cycle Life:</strong> 1500-2000 cycles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Temperature Range:</strong> -20°C to 60°C</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Weight:</strong> 20-30 kg (removable)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl border-2 border-[#36454F]/20 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black mb-6 text-[#36454F]">Battery Management System</h3>
              <ul className="space-y-3 text-[#36454F]">
                <li className="flex items-start">
                  <span className="text-[#36454F] mr-2 font-bold">•</span>
                  <span><strong>Smart BMS:</strong> Real-time monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#36454F] mr-2 font-bold">•</span>
                  <span><strong>Overcharge Protection:</strong> Automatic cutoff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#36454F] mr-2 font-bold">•</span>
                  <span><strong>Temperature Control:</strong> Thermal management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#36454F] mr-2 font-bold">•</span>
                  <span><strong>Cell Balancing:</strong> Extended battery life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#36454F] mr-2 font-bold">•</span>
                  <span><strong>Safety Certified:</strong> BIS and AIS certified</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-2xl border-2 border-[#36454F]/20 shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-black mb-6 text-[#A8E600]">Warranty & Support</h3>
              <ul className="space-y-3 text-[#36454F]">
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Battery Warranty:</strong> 3 years / 50,000 km</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Performance:</strong> 70% capacity guarantee</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Free Service:</strong> First 2 services free</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Replacement:</strong> Battery swap program</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A8E600] mr-2 font-bold">•</span>
                  <span><strong>Recycling:</strong> 100% recyclable components</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Charging Details Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="text-7xl mr-6">⚡</div>
            <h2 className="text-5xl md:text-6xl font-black text-[#36454F]">Charging Infrastructure</h2>
          </div>
          <div className="w-32 h-2 bg-[#A8E600] mx-auto mb-16"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-[#36454F]">
              <h3 className="text-3xl font-black mb-6 text-[#36454F]">Home Charging</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#A8E600] pl-4">
                  <h4 className="font-bold text-lg text-[#36454F] mb-2">Standard Charger (3A)</h4>
                  <p className="text-[#36454F]">Charging Time: 6-8 hours | Input: 230V AC | Portable</p>
                </div>
                <div className="border-l-4 border-[#A8E600] pl-4">
                  <h4 className="font-bold text-lg text-[#36454F] mb-2">Fast Charger (10A)</h4>
                  <p className="text-[#36454F]">Charging Time: 3-4 hours | Input: 230V AC | Wall-mounted</p>
                </div>
                <div className="bg-[#FFFFF0] p-4 rounded-lg mt-4 border-l-4 border-[#36454F]">
                  <p className="text-[#36454F]"><strong>💡 Home Setup:</strong> Simply plug into any standard 15A socket. No special installation required for basic charging.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-2xl shadow-xl border-l-4 border-[#A8E600]">
              <h3 className="text-3xl font-black mb-6 text-[#A8E600]">Public Charging</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#36454F] pl-4">
                  <h4 className="font-bold text-lg text-[#36454F] mb-2">DC Fast Charging</h4>
                  <p className="text-[#36454F]">Charging Time: 45-60 minutes | 0-80% charge | Available at stations</p>
                </div>
                <div className="border-l-4 border-[#36454F] pl-4">
                  <h4 className="font-bold text-lg text-[#36454F] mb-2">Battery Swapping</h4>
                  <p className="text-[#36454F]">Swap Time: 2-3 minutes | Full battery exchange | Coming soon</p>
                </div>
                <div className="bg-[#FFFFF0] p-4 rounded-lg mt-4 border-l-4 border-[#A8E600]">
                  <p className="text-[#36454F]"><strong>🔍 Station Finder:</strong> Use our mobile app to locate 500+ charging stations across India.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
