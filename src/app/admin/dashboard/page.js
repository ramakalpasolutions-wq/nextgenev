'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('heroImages')
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [media, setMedia] = useState({})
  const [products, setProducts] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Product form state - ALL FIELDS INITIALIZED WITH EMPTY STRINGS
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    range: '',
    topSpeed: '',
    motor: '',
    chargingTime: '',
    batteryCapacity: '',
    payload: '',
    capacity: '',
    voltage: '',
    warranty: '',
    power: '',
    chargingSpeed: '',
    compatibility: '',
    waterproof: '',
    weight: '',
    images: []
  })
  const [editingProductIndex, setEditingProductIndex] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  const sections = [
  // Gallery Sections
  { id: 'heroImages', name: 'Hero Section', storageKey: 'heroImages', icon: '🎬', type: 'gallery' },
  { id: 'twoWheelerUrls', name: '2W Home Section', storageKey: 'twoWheelerUrls', icon: '🛵', type: 'gallery' },
  { id: 'threeWheelerUrls', name: '3W Home Section', storageKey: 'threeWheelerUrls', icon: '🚕', type: 'gallery' },
  { id: 'batteryRepairUrls', name: 'Battery Repair Images', storageKey: 'batteryRepairUrls', icon: '🔋', type: 'gallery' },
  { id: 'chargerRepairUrls', name: 'Charger Repair Images', storageKey: 'chargerRepairUrls', icon: '⚡', type: 'gallery' },
  // Product Sections
  { id: 'twoWheelerProducts', name: '2-Wheeler Products', storageKey: 'twoWheelerProducts', icon: '🏍️', type: 'products', fields: ['range', 'topSpeed', 'motor', 'chargingTime', 'batteryCapacity'] },
  { id: 'threeWheelerProducts', name: '3-Wheeler Products', storageKey: 'threeWheelerProducts', icon: '🛺', type: 'products', fields: ['range', 'payload', 'motor', 'chargingTime', 'topSpeed', 'batteryCapacity'] },
  { id: 'batteryProducts', name: 'Battery Products', storageKey: 'batteryProducts', icon: '🔋', type: 'products', fields: ['capacity', 'voltage', 'warranty', 'chargingTime'] },
  { id: 'chargerProducts', name: 'Charger Products', storageKey: 'chargerProducts', icon: '⚡', type: 'products', fields: ['power', 'chargingSpeed', 'compatibility', 'waterproof', 'warranty', 'weight'] },
]

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth')
    if (!isAuthenticated) {
      router.push('/admin-login')
    }
  }, [router])

  // Logout function
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminAuth')
      router.push('/admin-login')
    }
  }

  // Load all media from API
  const loadAllMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()

      const mediaData = {}
      const productData = {}

      sections.forEach(section => {
        if (section.type === 'gallery') {
          mediaData[section.id] = data[section.storageKey] || []
        } else {
          productData[section.id] = data[section.storageKey] || []
        }
      })

      setMedia(mediaData)
      setProducts(productData)
    } catch (error) {
      console.error('Error loading media:', error)
      setUploadStatus('❌ Failed to load media')
    }
  }

  useEffect(() => {
    loadAllMedia()
  }, [])

  // Upload to Cloudinary
  const uploadToCloudinary = async (file, folder = 'nextgen-ev') => {
    try {
      const timestamp = Math.round(Date.now() / 1000)
      const uploadParams = { timestamp, folder }

      const signatureResponse = await fetch('/api/upload-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign: uploadParams }),
      })

      if (!signatureResponse.ok) {
        throw new Error('Failed to get signature')
      }

      const { signature, apiKey, cloudName } = await signatureResponse.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('api_key', apiKey)
      formData.append('timestamp', timestamp)
      formData.append('signature', signature)
      formData.append('folder', folder)

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      )

      if (!uploadResponse.ok) {
        throw new Error('Cloudinary upload failed')
      }

      const result = await uploadResponse.json()

      return {
        url: result.secure_url,
        publicId: result.public_id,
        name: file.name,
        uploadedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    }
  }

  // Handle gallery image upload - MODIFIED FOR HERO SECTION
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Special handling for hero images - limit to 2 images total
    if (activeSection === 'heroImages') {
      const currentHeroImages = media[activeSection] || []
     const remainingSlots = 1 - currentHeroImages.length

if (remainingSlots <= 0) {
  setUploadStatus('❌ Hero section can only have 1 image. Please delete the existing image first.')
  setTimeout(() => setUploadStatus(''), 4000)
  return
}


      if (files.length > remainingSlots) {
        setUploadStatus(`❌ You can only upload ${remainingSlots} more image(s) for hero section`)
        setTimeout(() => setUploadStatus(''), 4000)
        return
      }
    }

    const validFiles = files.filter(file => file.type.startsWith('image/'))
    if (validFiles.length === 0) {
      setUploadStatus('❌ Please select valid image files')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    setIsUploading(true)
    setUploadStatus(`Uploading ${validFiles.length} image(s)...`)

    try {
      const uploadedImages = []

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        setUploadStatus(`Uploading ${i + 1}/${validFiles.length}...`)

        try {
          const result = await uploadToCloudinary(file, `nextgen-ev/${activeSection}`)
          uploadedImages.push(result)
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error)
        }
      }

      if (uploadedImages.length === 0) {
        setUploadStatus('❌ All uploads failed')
        return
      }

      const currentSection = sections.find(s => s.id === activeSection)
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: currentSection.storageKey,
          images: uploadedImages
        })
      })

      await loadAllMedia()
      setUploadStatus(`✅ ${uploadedImages.length} image(s) uploaded!`)
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('❌ Upload failed')
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadStatus(''), 4000)
    }
  }

  // Handle product image upload
  const handleProductImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    const validFiles = files.filter(file => file.type.startsWith('image/'))
    setUploadStatus(`Uploading ${validFiles.length} product image(s)...`)

    try {
      const uploadedUrls = []

      for (let file of validFiles) {
        const result = await uploadToCloudinary(file, `nextgen-ev/products/${activeSection}`)
        uploadedUrls.push(result.url)
      }

      setProductForm(prev => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedUrls]
      }))

      setUploadStatus(`✅ ${uploadedUrls.length} image(s) added!`)
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      setUploadStatus('❌ Upload failed')
      setTimeout(() => setUploadStatus(''), 3000)
    }
  }

  const saveProduct = async () => {
    if (!productForm.name || !productForm.description || !productForm.images || productForm.images.length === 0) {
      setUploadStatus('❌ Please fill name, description and add images')
      setTimeout(() => setUploadStatus(''), 3000)
      return
    }

    const currentSection = sections.find(s => s.id === activeSection)

    try {
      if (editingProductIndex !== null) {
        await fetch('/api/media', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: currentSection.storageKey,
            index: editingProductIndex,
            product: { ...productForm, id: Date.now() }
          })
        })
        setUploadStatus('✅ Product updated!')
      } else {
        await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: currentSection.storageKey,
            product: { ...productForm, id: Date.now() }
          })
        })
        setUploadStatus('✅ Product added!')
      }

      await loadAllMedia()
      resetProductForm()
      setEditingProductIndex(null)
      setShowProductForm(false)
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      console.error('Save error:', error)
      setUploadStatus('❌ Save failed')
    }
  }

  // Reset product form to initial state
  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: '',
      range: '',
      topSpeed: '',
      motor: '',
      chargingTime: '',
      batteryCapacity: '',
      payload: '',
      capacity: '',
      voltage: '',
      warranty: '',
      power: '',
      chargingSpeed: '',
      compatibility: '',
      waterproof: '',
      weight: '',
      images: []
    })
  }

  const deleteImage = async (index) => {
    if (!confirm('Delete this image?')) return

    const currentSection = sections.find(s => s.id === activeSection)

    try {
      await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: currentSection.storageKey,
          index
        })
      })

      await loadAllMedia()
      setUploadStatus('✅ Image deleted!')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      setUploadStatus('❌ Delete failed')
    }
  }

  const deleteProduct = async (index) => {
    if (!confirm('Delete this product?')) return

    const currentSection = sections.find(s => s.id === activeSection)

    try {
      await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: currentSection.storageKey,
          index
        })
      })

      await loadAllMedia()
      setUploadStatus('✅ Product deleted!')
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      setUploadStatus('❌ Delete failed')
    }
  }

  const editProduct = (index) => {
    const currentProducts = products[activeSection] || []
    const product = currentProducts[index]
    if (product) {
      setProductForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        range: product.range || '',
        topSpeed: product.topSpeed || '',
        motor: product.motor || '',
        chargingTime: product.chargingTime || '',
        batteryCapacity: product.batteryCapacity || '',
        payload: product.payload || '',
        capacity: product.capacity || '',
        voltage: product.voltage || '',
        warranty: product.warranty || '',
        power: product.power || '',
        chargingSpeed: product.chargingSpeed || '',
        compatibility: product.compatibility || '',
        waterproof: product.waterproof || '',
        weight: product.weight || '',
        images: product.images || []
      })
      setEditingProductIndex(index)
      setShowProductForm(true)
    }
  }

  const removeProductImage = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }))
  }

  const currentSectionData = sections.find(s => s.id === activeSection)
  const currentMedia = media[activeSection] || []
  const currentProducts = products[activeSection] || []
  const isProductSection = currentSectionData?.type === 'products'
  const isHeroSection = activeSection === 'heroImages'

  return (
    <div className="min-h-screen bg-[#FFFFF0] flex">
      {/* Mobile Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-30 left-4 z-50 bg-[#343A40] text-white p-3 rounded-lg shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-[#343A40] shadow-2xl transition-all duration-300 z-50 
        ${sidebarOpen ? 'w-72' : 'w-20'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#495057]">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-white text-xl font-bold">Admin Panel</h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-[#495057] p-2 rounded-lg transition hidden lg:block"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
          <div className="space-y-3">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  setShowProductForm(false)
                  setEditingProductIndex(null)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${
                  activeSection === section.id
                    ? 'bg-[#A8E600] text-[#212529]'
                    : 'text-white hover:bg-[#495057]'
                }`}
                title={!sidebarOpen ? section.name : ''}
              >
                <span className="text-2xl flex-shrink-0">{section.icon}</span>
                {sidebarOpen && <span className="text-left text-md">{section.name}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#495057]">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 pt-20 w-full lg:ml-72 ${
        sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
      }`}>
        <div className="p-4 md:p-8">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12 mt-16 lg:mt-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#212529] mb-4">
              Admin <span className="text-[#A8E600]">Dashboard</span>
            </h1>
            <p className="text-[#495057] text-base md:text-lg">Cloudinary-powered media management</p>
          </div>

          {uploadStatus && (
            <div className={`mb-6 p-4 rounded-xl text-center ${
              uploadStatus.startsWith('✅') ? 'bg-green-100 border border-green-500 text-green-800' : 'bg-red-100 border border-red-500 text-red-800'
            }`}>
              <p className="font-bold text-sm md:text-base">{uploadStatus}</p>
            </div>
          )}

          {/* Gallery Upload */}
          {!isProductSection && (
            <>
              <div className="bg-white rounded-3xl p-4 md:p-8 mb-6 md:mb-8 border-2 border-[#A8E600]/30 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#212529] mb-4 md:mb-6">
                  Upload Images for {currentSectionData?.name}
                  {isHeroSection && (
                    <span className="block text-sm text-[#6C757D] mt-2 font-normal">
                      ⚠️ Hero section requires exactly 1 image (currently: {currentMedia.length}/1)
                    </span>
                  )}
                </h2>
                <input
                  type="file"
                  multiple={!isHeroSection}
                  accept="image/*"
                  onChange={handleFileUpload}
                 disabled={isUploading || (isHeroSection && currentMedia.length >= 1)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className={`block w-full p-6 md:p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition ${
                    isUploading || (isHeroSection && currentMedia.length >= 2)
                      ? 'border-gray-400 bg-gray-100 cursor-not-allowed' 
                      : 'border-[#007BFF] hover:border-[#A8E600] bg-[#F8F9FA]'
                  }`}
                >
                  <div className="text-4xl md:text-6xl mb-4">
                    {isHeroSection && currentMedia.length >= 1 ? '🔒' : '☁️'}
                  </div>
                  <p className="text-[#212529] text-base md:text-lg font-bold mb-2">
                    {isUploading 
                      ? 'Uploading...' 
                      : isHeroSection && currentMedia.length >= 1
                      ? 'Hero section full (1/1 image)'
                      : isHeroSection
                      ? `Click to upload hero image`
                      : 'Click to upload images'
                    }
                  </p>
                  <p className="text-[#6C757D] text-sm md:text-base">
                    {isHeroSection && currentMedia.length < 2
                      ? `Upload ${2 - currentMedia.length} more image(s) for hero section`
                      : 'Cloudinary secure upload'
                    }
                  </p>
                </label>
              </div>

              {/* Image Grid - MODIFIED FOR HERO SECTION */}
              <div className="bg-white rounded-3xl p-4 md:p-8 border-2 border-[#007BFF]/30 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#212529] mb-4 md:mb-6">
                  Current Images ({currentMedia.length}{isHeroSection ? '/1' : ''})
                </h2>
                {currentMedia.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl md:text-6xl mb-4">📁</div>
                    <p className="text-[#6C757D] text-base md:text-lg">
                      {isHeroSection ? 'Upload 2 hero images to display side by side' : 'No images uploaded'}
                    </p>
                  </div>
                ) : (
                  <div className={`grid gap-3 md:gap-6 ${
                    isHeroSection 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  }`}>
                    {currentMedia.map((item, index) => (
                      <div key={index} className="relative group bg-[#F8F9FA] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#A8E600] transition shadow-md">
                        {isHeroSection && (
                          <div className="absolute top-2 left-2 bg-[#A8E600] text-[#212529] px-3 py-1 rounded-full text-xs font-bold z-10">
                            Hero Image
                          </div>
                        )}
                        <img 
                          src={item.url} 
                          alt={item.name || `Image ${index + 1}`} 
                          className={`w-full object-cover ${
                            isHeroSection ? 'h-48 md:h-64' : 'h-32 md:h-48'
                          }`} 
                        />
                        <button
                          onClick={() => deleteImage(index)}
                          className="absolute top-2 right-2 bg-red-600 text-white w-7 h-7 md:w-8 md:h-8 rounded-full opacity-0 group-hover:opacity-100 transition font-bold text-sm"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Product Management */}
          {isProductSection && (
            <>
              <div className="bg-white rounded-3xl p-4 md:p-8 mb-6 md:mb-8 border-2 border-[#A8E600]/30 shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-[#212529]">Manage Products</h2>
                  <button
                    onClick={() => {
                      setShowProductForm(!showProductForm)
                      if (showProductForm) {
                        resetProductForm()
                        setEditingProductIndex(null)
                      }
                    }}
                    className="bg-[#A8E600] text-[#212529] px-5 md:px-6 py-2 md:py-3 rounded-full font-bold hover:bg-[#98d600] transition shadow-md text-sm md:text-base w-full sm:w-auto"
                  >
                    {showProductForm ? '✕ Cancel' : '+ Add Product'}
                  </button>
                </div>

                {showProductForm && (
                  <div className="bg-[#F8F9FA] rounded-2xl p-4 md:p-6 mb-6 border border-[#DEE2E6]">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                        placeholder="Product Name *"
                      />
                      <input
                        type="text"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                        placeholder="Price (e.g., ₹1,99,999)"
                      />
                    </div>

                    {/* Specification Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {currentSectionData?.fields?.includes('range') && (
                        <input
                          type="text"
                          value={productForm.range}
                          onChange={(e) => setProductForm({...productForm, range: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Range (e.g., 150 km)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('topSpeed') && (
                        <input
                          type="text"
                          value={productForm.topSpeed}
                          onChange={(e) => setProductForm({...productForm, topSpeed: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Top Speed (e.g., 60 km/h)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('motor') && (
                        <input
                          type="text"
                          value={productForm.motor}
                          onChange={(e) => setProductForm({...productForm, motor: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Motor (e.g., 5 kW)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('chargingTime') && (
                        <input
                          type="text"
                          value={productForm.chargingTime}
                          onChange={(e) => setProductForm({...productForm, chargingTime: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Charging Time (e.g., 4-5 hours)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('batteryCapacity') && (
                        <input
                          type="text"
                          value={productForm.batteryCapacity}
                          onChange={(e) => setProductForm({...productForm, batteryCapacity: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Battery Capacity (e.g., 8 kWh)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('payload') && (
                        <input
                          type="text"
                          value={productForm.payload}
                          onChange={(e) => setProductForm({...productForm, payload: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Payload (e.g., 500 kg)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('capacity') && (
                        <input
                          type="text"
                          value={productForm.capacity}
                          onChange={(e) => setProductForm({...productForm, capacity: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Capacity (e.g., 100 Ah)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('voltage') && (
                        <input
                          type="text"
                          value={productForm.voltage}
                          onChange={(e) => setProductForm({...productForm, voltage: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Voltage (e.g., 48V)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('warranty') && (
                        <input
                          type="text"
                          value={productForm.warranty}
                          onChange={(e) => setProductForm({...productForm, warranty: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Warranty (e.g., 3 years)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('power') && (
                        <input
                          type="text"
                          value={productForm.power}
                          onChange={(e) => setProductForm({...productForm, power: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Power (e.g., 7 kW)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('chargingSpeed') && (
                        <input
                          type="text"
                          value={productForm.chargingSpeed}
                          onChange={(e) => setProductForm({...productForm, chargingSpeed: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Charging Speed (e.g., Fast DC)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('compatibility') && (
                        <input
                          type="text"
                          value={productForm.compatibility}
                          onChange={(e) => setProductForm({...productForm, compatibility: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Compatibility (e.g., All EVs)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('waterproof') && (
                        <input
                          type="text"
                          value={productForm.waterproof}
                          onChange={(e) => setProductForm({...productForm, waterproof: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Waterproof (e.g., IP67)"
                        />
                      )}
                      {currentSectionData?.fields?.includes('weight') && (
                        <input
                          type="text"
                          value={productForm.weight}
                          onChange={(e) => setProductForm({...productForm, weight: e.target.value})}
                          className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none text-sm md:text-base"
                          placeholder="Weight (e.g., 15 kg)"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white text-[#212529] border-2 border-[#007BFF]/30 focus:border-[#A8E600] outline-none h-32 mb-4 text-sm md:text-base"
                      placeholder="Product Description *"
                    />

                    {/* Image Upload */}
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                      id="product-image-upload"
                    />
                    <label
                      htmlFor="product-image-upload"
                      className="block w-full p-4 md:p-6 border-2 border-dashed border-[#007BFF] rounded-xl text-center cursor-pointer mb-4 hover:border-[#A8E600] transition bg-white"
                    >
                      <p className="text-[#212529] font-bold text-sm md:text-base">📸 Click to add product images</p>
                    </label>

                    {/* Image Preview */}
                    {productForm.images && productForm.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        {productForm.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img src={img} alt="" className="w-full h-20 md:h-24 object-cover rounded-lg border border-[#DEE2E6]" />
                            <button
                              type="button"
                              onClick={() => removeProductImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Save Button */}
                    <button
                      onClick={saveProduct}
                      className="w-full bg-[#A8E600] hover:bg-[#98d600] text-[#212529] px-6 py-3 rounded-full font-bold transition shadow-md text-sm md:text-base"
                    >
                      {editingProductIndex !== null ? '💾 Update Product' : '✅ Save Product'}
                    </button>
                  </div>
                )}
              </div>

              {/* Products List */}
              <div className="bg-white rounded-3xl p-4 md:p-8 border-2 border-[#007BFF]/30 shadow-lg">
                <h2 className="text-xl md:text-2xl font-bold text-[#212529] mb-4 md:mb-6">Products ({currentProducts.length})</h2>
                {currentProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl md:text-6xl mb-4">{currentSectionData?.icon}</div>
                    <p className="text-[#6C757D] text-base md:text-lg">No products added</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {currentProducts.map((product, index) => (
                      <div key={index} className="bg-[#F8F9FA] rounded-xl p-4 md:p-6 border-2 border-transparent hover:border-[#A8E600] transition shadow-md">
                        {product.images && product.images[0] && (
                          <img src={product.images[0]} alt={product.name} className="w-full h-40 md:h-48 object-cover rounded-lg mb-4" />
                        )}
                        <h3 className="text-lg md:text-xl font-bold text-[#212529] mb-2">{product.name}</h3>
                        {product.price && <p className="text-[#A8E600] font-bold mb-2 text-sm md:text-base">{product.price}</p>}
                        <p className="text-[#495057] text-xs md:text-sm mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editProduct(index)}
                            className="flex-1 bg-[#007BFF] hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg font-bold transition text-xs md:text-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(index)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 md:px-4 py-2 rounded-lg font-bold transition text-xs md:text-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
