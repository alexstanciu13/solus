'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/lib/utils'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const t = useTranslations()
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 200 ? 0 : 25
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#faf8f5]">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{t('cart.empty')}</h2>
          <p className="text-gray-600 mb-6">Coșul tău de cumpărături este gol</p>
          <Link href="/collections">
            <Button size="lg">{t('cart.continueShopping')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="font-playfair text-4xl font-bold tracking-luxury mb-8">
          {t('cart.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 flex gap-6 shadow-sm"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.productNameRo}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{item.productNameRo}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-black transition-colors"
                      aria-label={t('cart.remove')}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {item.variantName && (
                    <p className="text-sm text-gray-600 mb-2">{item.variantName}</p>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="font-semibold text-lg">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6">{t('checkout.orderSummary')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('checkout.subtotal')}</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('checkout.shipping')}</span>
                  <span className="font-medium">
                    {shipping === 0 ? t('common.freeShipping') : formatCurrency(shipping)}
                  </span>
                </div>
                {subtotal < 200 && subtotal > 0 && (
                  <p className="text-sm text-[#c9a66b]">
                    Mai adaugă {formatCurrency(200 - subtotal)} pentru transport gratuit!
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>{t('common.total')}</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3">
                  {t('cart.proceedToCheckout')}
                </Button>
              </Link>

              <Link href="/collections">
                <Button variant="outline" size="lg" className="w-full">
                  {t('cart.continueShopping')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
