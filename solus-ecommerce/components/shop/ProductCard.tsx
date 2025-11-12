'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/stores/cart'
import { toast } from 'sonner'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    nameRo: string
    basePrice: number
    images: { url: string; altTextRo?: string }[]
    featured?: boolean
    limitedDrop?: boolean
    inStock?: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations()
  const { addItem } = useCartStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      productName: product.nameRo,
      productNameRo: product.nameRo,
      price: Number(product.basePrice),
      quantity: 1,
      image: product.images[0]?.url,
    })
    toast.success(t('products.addedToCart'))
  }

  const imageUrl = product.images[0]?.url || '/placeholder-product.jpg'

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-lg">
        <Image
          src={imageUrl}
          alt={product.images[0]?.altTextRo || product.nameRo}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.limitedDrop && (
            <Badge variant="secondary">Ediție Limitată</Badge>
          )}
          {product.featured && (
            <Badge>Recomandat</Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive">{t('common.outOfStock')}</Badge>
          )}
        </div>

        {/* Quick Add Button */}
        {product.inStock && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              aria-label={t('common.addToCart')}
            >
              <ShoppingBag className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-base group-hover:text-[#c9a66b] transition-colors">
          {product.nameRo}
        </h3>
        <p className="text-lg font-semibold">
          {formatCurrency(Number(product.basePrice))}
        </p>
      </div>
    </Link>
  )
}
