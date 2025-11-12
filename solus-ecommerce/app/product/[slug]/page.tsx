'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/lib/utils'
import { ShoppingBag, Heart, Share2, ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

// Mock product data
const mockProduct = {
  id: '1',
  slug: 'inel-heritage-signet',
  nameRo: 'Inel Heritage Signet',
  descriptionRo:
    'Inel sigiliu clasic cu motive tradiționale românești, realizat manual din argint 925. Fiecare piesă este unică și poartă amprenta meșterului artiz an. Designul combină eleganța clasică cu elemente inspirate din arta populară românească.',
  basePrice: 1250,
  images: [
    { url: '/products/ring-1.jpg', altTextRo: 'Inel Heritage Signet' },
    { url: '/products/ring-1-2.jpg', altTextRo: 'Detaliu inel' },
  ],
  featured: true,
  inStock: true,
  categoryRo: 'Inele',
}

export default function ProductDetailPage() {
  const params = useParams()
  const t = useTranslations()
  const { addItem } = useCartStore()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem({
      productId: mockProduct.id,
      productName: mockProduct.nameRo,
      productNameRo: mockProduct.nameRo,
      price: mockProduct.basePrice,
      quantity,
      image: mockProduct.images[0].url,
    })
    toast.success(t('products.addedToCart'))
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/collections" className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('common.backToHome')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
              <Image
                src={mockProduct.images[selectedImage].url}
                alt={mockProduct.images[selectedImage].altTextRo || mockProduct.nameRo}
                fill
                className="object-cover"
                priority
              />
              {mockProduct.featured && (
                <Badge className="absolute top-4 left-4">Recomandat</Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <Image src={image.url} alt={image.altTextRo || ''} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">{mockProduct.categoryRo}</p>
              <h1 className="font-playfair text-4xl font-bold tracking-luxury mb-4">
                {mockProduct.nameRo}
              </h1>
              <p className="text-3xl font-bold">{formatCurrency(mockProduct.basePrice)}</p>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{mockProduct.descriptionRo}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t('common.quantity')}</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 w-5 h-5" />
                {t('common.addToCart')}
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="mr-2 w-5 h-5" />
                  Favorite
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Share2 className="mr-2 w-5 h-5" />
                  Distribuie
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-black/10 pt-6">
              <h3 className="font-semibold mb-4">{t('products.productDetails')}</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Material:</dt>
                  <dd className="font-medium">Argint 925</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Fabricație:</dt>
                  <dd className="font-medium">Handmade în România</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Transport:</dt>
                  <dd className="font-medium">Gratuit peste 200 RON</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Livrare:</dt>
                  <dd className="font-medium">2-3 zile lucrătoare</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
