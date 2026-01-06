"use client";

export default function ServicesPage() {
  const services = [
    {
      icon: '🔧',
      title: 'Maintenance Service',
      description: 'Regular maintenance and servicing for optimal performance',
      features: ['Battery health check', 'Motor inspection', 'Brake system check', 'Software updates'],
      color: '#FF6B6B',
    },
    {
      icon: '🔋',
      title: 'Battery Service',
      description: 'Comprehensive battery care and replacement services',
      features: ['Battery health diagnostics', 'Warranty claims', 'Battery replacement', 'Charging optimization'],
      color: '#FFD700',
    },
    {
      icon: '🚗',
      title: 'Roadside Assistance',
      description: '24/7 emergency roadside assistance across India',
      features: ['Emergency charging', 'Towing service', 'On-spot repairs', 'Battery jump-start'],
      color: '#00D9FF',
    },
    {
      icon: '💡',
      title: 'Basic Services',
      description: 'Essential support for individual EV owners including health check and software updates.',
      features: ['Battery health check', 'Motor inspection', 'Software updates', 'General maintenance'],
      color: '#FFB84D',
    },
    {
      icon: '🛡️',
      title: 'Extended Warranty',
      description: 'Comprehensive warranty packages for peace of mind',
      features: ['Extended coverage', 'Zero depreciation', 'Consumables included', 'Transferable warranty'],
      color: '#A8E600',
    },
    {
      icon: '📊',
      title: 'Performance Monitoring',
      description: 'Real-time vehicle performance tracking and analytics',
      features: ['App-based monitoring', 'Usage analytics', 'Efficiency reports', 'Predictive maintenance'],
      color: '#3FBF85',
    },
  ]

  return (
    <div 
      className="min-h-screen pt-16"
      style={{
        backgroundColor: '#FFFFF0',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <p
              style={{
                fontSize: 12,
                letterSpacing: 5,
                textTransform: 'uppercase',
                marginBottom: 12,
                color: '#36454F',
                fontWeight: 700,
                opacity: 0.7,
              }}
            >
              SERVICES & SOLUTIONS
            </p>

            <h1
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                color: '#36454F',
                marginBottom: 16,
                fontWeight: 900,
                letterSpacing: -1,
              }}
            >
              Our Services
            </h1>

            <div style={{
              width: 128,
              height: 8,
              background: '#A8E600',
              margin: '0 auto 32px',
              borderRadius: 4,
            }}></div>

            <p
              style={{
                color: '#36454F',
                fontSize: 20,
                lineHeight: 1.6,
                maxWidth: 700,
                margin: '0 auto',
                opacity: 0.8,
              }}
            >
              Comprehensive service packages designed to keep your NextGen EV running smoothly and efficiently.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                style={{
                  backgroundColor: '#FFFFF0',
                  border: '2px solid rgba(54, 69, 79, 0.1)',
                  borderRadius: 24,
                  padding: 32,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${service.color}20`;
                  e.currentTarget.style.borderColor = service.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(54, 69, 79, 0.1)';
                }}
              >
                {/* Glow Effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: -60,
                    width: 250,
                    height: 250,
                    background: service.color,
                    borderRadius: '50%',
                    filter: 'blur(80px)',
                    opacity: 0.08,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Icon */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      background: `${service.color}15`,
                      border: `2px solid ${service.color}40`,
                      borderRadius: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 20,
                      fontSize: 36,
                      transition: 'transform 0.3s ease',
                    }}
                    className="group-hover:scale-110"
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      color: '#36454F',
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 12,
                      marginTop: 0,
                    }}
                  >
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p
                    style={{
                      color: '#36454F',
                      fontSize: 15,
                      lineHeight: 1.6,
                      marginBottom: 24,
                      opacity: 0.7,
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: 14,
                          color: '#36454F',
                          marginBottom: 10,
                          fontWeight: 600,
                        }}
                      >
                        <svg
                          className="flex-shrink-0"
                          style={{ 
                            width: 20, 
                            height: 20, 
                            color: service.color, 
                            marginRight: 10 
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFFF0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 900,
              marginBottom: 32,
              color: '#36454F',
            }}
          >
            Ready to Service Your NextGen EV?
          </h2>
          <p 
            style={{
              fontSize: 20,
              marginBottom: 48,
              color: '#36454F',
              opacity: 0.8,
            }}
          >
            Book your service appointment today and experience premium EV care
          </p>
          <button
            style={{
              background: '#A8E600',
              color: '#36454F',
              fontWeight: 700,
              padding: '20px 48px',
              borderRadius: 50,
              fontSize: 18,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(168, 230, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.background = '#98d600';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#A8E600';
            }}
          >
            BOOK SERVICE →
          </button>
        </div>
      </section>
    </div>
  )
}
