'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/products/2w')
  }, [router])

  return (
    <div className="min-h-screen bg-[#212529] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#A8E600]"></div>
    </div>
  )
}
