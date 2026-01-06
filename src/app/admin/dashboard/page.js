'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('hero')
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [media, setMedia] = useState({})
  const [products, setProducts] = useState({})

  // Product form state
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
    images: []
  })
  const [editingProductIndex, setEditingProductIndex] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)

  const sections = [
    { id: 'hero', name: 'Hero Section', storageKey: 'heroImages', icon: '🎬', type: 'gallery' },
    { id: '2wheeler-home', name: '2W Home Section', storageKey: 'twoWheelerUrls', icon: '🛵', type: 'gallery' },
    { id: '3wheeler-home', name: '3W Home Section', storageKey: 'threeWheelerUrls', icon: '🚕', type: 'gallery' },
    { id: '2wheeler-products', name: '2W Products', storageKey: 'twoWheelerProducts', icon: '🏍️', type: 'products' },
    { id: '3wheeler-products', name: '3W Products', storageKey: 'threeWheelerProducts', icon: '🚐', type: 'products' },
    { id: 'battery', name: 'Battery Repair', storageKey: 'batteryRepairUrls', icon: '🔋', type: 'gallery' },
    { id: 'charger', name: 'Charger Repair', storageKey: 'chargerRepairUrls', icon: '⚡', type: 'gallery' },
  ]

  // Check authentication on mount - FIXED ROUTE
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth')
    if (!isAuthenticated) {
      router.push('/admin-login')  // Changed from '/admin' to '/admin-login'
    }
  }, [router])

  // Logout function - FIXED ROUTE
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminAuth')
      router.push('/admin-login')  // Changed from '/admin' to '/admin-login'
    }
  }

  // Load all media from API
  const loadAllMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      
      // Separate gallery items and products
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

      // Get signature from API
      const signatureResponse = await fetch('/api/upload-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paramsToSign: uploadParams }),
      })

      if (!signatureResponse.ok) {
        throw new Error('Failed to get signature')
      }

      const { signature, apiKey, cloudName } = await signatureResponse.json()

      // Upload to Cloudinary
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

  // Handle gallery image upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

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

      // Save to API
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
        // Update product
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
        // Add new product
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
      setProductForm({
        name: '', description: '', price: '', range: '', topSpeed: '',
        motor: '', chargingTime: '', batteryCapacity: '', payload: '', images: []
      })
      setEditingProductIndex(null)
      setShowProductForm(false)
      setTimeout(() => setUploadStatus(''), 2000)
    } catch (error) {
      setUploadStatus('❌ Save failed')
    }
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
      setProductForm({ ...product, images: product.images || [] })
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

  return (
    <div className="min-h-screen bg-[#212529] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout Button */}
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl md:text-6xl font-black text-[#F8F9FA] mb-4">
            Admin <span className="text-[#A8E600]">Dashboard</span>
          </h1>
          <p className="text-[#F8F9FA]/70 text-lg mb-6">Cloudinary-powered media management</p>
          
          {/* Logout Button - Desktop (Top Right) */}
          <button
            onClick={handleLogout}
            className="hidden md:flex absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold transition items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>

          {/* Logout Button - Mobile (Centered) */}
          <button
            onClick={handleLogout}
            className="md:hidden inline-flex bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition items-center gap-2 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                setShowProductForm(false)
                setEditingProductIndex(null)
              }}
              className={`px-4 py-2 rounded-full font-bold transition flex items-center gap-2 text-sm ${
                activeSection === section.id
                  ? 'bg-[#A8E600] text-[#212529] shadow-lg'
                  : 'bg-[#1a1d21] text-[#F8F9FA] hover:bg-[#2a2d31]'
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {uploadStatus && (
          <div className={`mb-6 p-4 rounded-xl text-center ${
            uploadStatus.startsWith('✅') ? 'bg-green-900/30 border border-green-500' : 'bg-red-900/30 border border-red-500'
          }`}>
            <p className="text-[#F8F9FA] font-bold">{uploadStatus}</p>
          </div>
        )}

        {/* Gallery Upload */}
        {!isProductSection && (
          <>
            <div className="bg-[#1a1d21] rounded-3xl p-8 mb-8 border-2 border-[#A8E600]/30">
              <h2 className="text-2xl font-bold text-[#F8F9FA] mb-6">
                Upload Images for {currentSectionData?.name}
              </h2>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`block w-full p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition ${
                  isUploading ? 'border-gray-500 bg-gray-800 cursor-not-allowed' : 'border-[#007BFF] hover:border-[#A8E600]'
                }`}
              >
                <div className="text-6xl mb-4">☁️</div>
                <p className="text-[#F8F9FA] text-lg font-bold mb-2">
                  {isUploading ? 'Uploading...' : 'Click to upload images'}
                </p>
                <p className="text-[#F8F9FA]/60">Cloudinary secure upload</p>
              </label>
            </div>

            {/* Image Grid */}
            <div className="bg-[#1a1d21] rounded-3xl p-8 border-2 border-[#007BFF]/30">
              <h2 className="text-2xl font-bold text-[#F8F9FA] mb-6">
                Current Images ({currentMedia.length})
              </h2>
              {currentMedia.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <p className="text-[#F8F9FA]/60 text-lg">No images uploaded</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentMedia.map((item, index) => (
                    <div key={index} className="relative group bg-[#2a2d31] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#A8E600] transition">
                      <img src={item.url} alt={item.name || `Image ${index + 1}`} className="w-full h-48 object-cover" />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition"
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
            <div className="bg-[#1a1d21] rounded-3xl p-8 mb-8 border-2 border-[#A8E600]/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#F8F9FA]">Manage Products</h2>
                <button
                  onClick={() => {
                    setShowProductForm(!showProductForm)
                    if (showProductForm) {
                      setProductForm({ name: '', description: '', price: '', range: '', topSpeed: '', motor: '', chargingTime: '', batteryCapacity: '', payload: '', images: [] })
                      setEditingProductIndex(null)
                    }
                  }}
                  className="bg-[#A8E600] text-[#212529] px-6 py-3 rounded-full font-bold"
                >
                  {showProductForm ? '✕ Cancel' : '+ Add Product'}
                </button>
              </div>

              {showProductForm && (
                <div className="bg-[#2a2d31] rounded-2xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Product Name"
                    />
                    <input
                      type="text"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Price"
                    />
                    <input
                      type="text"
                      value={productForm.range}
                      onChange={(e) => setProductForm({...productForm, range: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Range"
                    />
                    <input
                      type="text"
                      value={productForm.topSpeed}
                      onChange={(e) => setProductForm({...productForm, topSpeed: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Top Speed"
                    />
                    <input
                      type="text"
                      value={productForm.motor}
                      onChange={(e) => setProductForm({...productForm, motor: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Motor"
                    />
                    <input
                      type="text"
                      value={productForm.chargingTime}
                      onChange={(e) => setProductForm({...productForm, chargingTime: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Charging Time"
                    />
                    <input
                      type="text"
                      value={productForm.batteryCapacity}
                      onChange={(e) => setProductForm({...productForm, batteryCapacity: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                      placeholder="Battery Capacity"
                    />
                    {activeSection === '3wheeler-products' && (
                      <input
                        type="text"
                        value={productForm.payload}
                        onChange={(e) => setProductForm({...productForm, payload: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30"
                        placeholder="Payload"
                      />
                    )}
                  </div>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-[#1a1d21] text-[#F8F9FA] border-2 border-[#007BFF]/30 h-32 mb-4"
                    placeholder="Description"
                  />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="hidden"
                    id="product-image-upload"
                  />
                  <label htmlFor="product-image-upload" className="block w-full p-6 border-2 border-dashed border-[#007BFF] rounded-xl text-center cursor-pointer mb-4">
                    <p className="text-[#F8F9FA] font-bold">Click to add product images</p>
                  </label>
                  {productForm.images && productForm.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {productForm.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt="" className="w-full h-24 object-cover rounded-lg" />
                          <button onClick={() => removeProductImage(index)} className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition text-xs">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={saveProduct} className="w-full bg-[#A8E600] text-[#212529] px-6 py-3 rounded-full font-bold">
                    {editingProductIndex !== null ? '💾 Update Product' : '✅ Save Product'}
                  </button>
                </div>
              )}
            </div>

            {/* Products List */}
            <div className="bg-[#1a1d21] rounded-3xl p-8 border-2 border-[#007BFF]/30">
              <h2 className="text-2xl font-bold text-[#F8F9FA] mb-6">Products ({currentProducts.length})</h2>
              {currentProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📦</div>
                  <p className="text-[#F8F9FA]/60 text-lg">No products added</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentProducts.map((product, index) => (
                    <div key={index} className="bg-[#2a2d31] rounded-xl p-6 border-2 border-transparent hover:border-[#A8E600] transition">
                      {product.images && product.images[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                      )}
                      <h3 className="text-xl font-bold text-[#F8F9FA] mb-2">{product.name}</h3>
                      <p className="text-[#F8F9FA]/70 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex gap-2">
                        <button onClick={() => editProduct(index)} className="flex-1 bg-[#007BFF] text-white px-4 py-2 rounded-lg font-bold">✏️ Edit</button>
                        <button onClick={() => deleteProduct(index)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-bold">🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
