'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCartStore } from '@/stores/cart'
import { formatCurrency, generateOrderNumber } from '@/lib/utils'
import { CreditCard, Banknote } from 'lucide-react'

export default function CheckoutPage() {
  const t = useTranslations()
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'COD'>('COD')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
    phone: '',
  })

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 200 ? 0 : 25
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Mock order creation
    const orderNumber = generateOrderNumber()
    console.log('Order created:', { orderNumber, ...formData, paymentMethod, items })

    // Clear cart and redirect
    clearCart()
    alert(`✅ Comanda ${orderNumber} a fost plasată cu succes!\n\nMultumim pentru comandă!`)
    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="font-playfair text-4xl font-bold tracking-luxury mb-8">
          {t('checkout.title')}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">{t('checkout.shippingInfo')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">{t('checkout.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t('checkout.emailPlaceholder')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('checkout.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('checkout.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstName">{t('checkout.firstName')}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder={t('checkout.firstNamePlaceholder')}
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">{t('checkout.lastName')}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder={t('checkout.lastNamePlaceholder')}
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">{t('checkout.address')}</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder={t('checkout.addressPlaceholder')}
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">{t('checkout.city')}</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder={t('checkout.cityPlaceholder')}
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="county">{t('checkout.county')}</Label>
                    <Input
                      id="county"
                      name="county"
                      placeholder={t('checkout.countyPlaceholder')}
                      value={formData.county}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postalCode">{t('checkout.postalCode')}</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder={t('checkout.postalCodePlaceholder')}
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">{t('checkout.paymentMethod')}</h2>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-colors ${
                      paymentMethod === 'COD' ? 'border-black bg-black/5' : 'border-gray-200'
                    }`}
                  >
                    <Banknote className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">{t('payment.cod')}</p>
                      <p className="text-sm text-gray-600">Plătește la livrare</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center gap-4 transition-colors ${
                      paymentMethod === 'CARD' ? 'border-black bg-black/5' : 'border-gray-200'
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <div className="text-left">
                      <p className="font-semibold">{t('payment.card')}</p>
                      <p className="text-sm text-gray-600">Stripe - Plată securizată</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-6">{t('checkout.orderSummary')}</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.productNameRo} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t pt-4 mb-6">
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
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('common.total')}</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {t('checkout.placeOrder')}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Prin plasarea comenzii, accept{' '}
                  <a href="/terms" className="underline">
                    termenii și condițiile
                  </a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
