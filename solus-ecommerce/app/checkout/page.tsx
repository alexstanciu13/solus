'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Banknote, Gift, Sparkles, Mail } from 'lucide-react'
import { useCartStore } from '@/stores/cart'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice } = useCartStore()

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod')
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

  const [giftWrapping, setGiftWrapping] = useState<'none' | 'standard' | 'premium'>('none')
  const [wrappingColor, setWrappingColor] = useState<'black' | 'white'>('black')
  const [customLetter, setCustomLetter] = useState(false)
  const [letterPaper, setLetterPaper] = useState<'white' | 'black'>('white')
  const [letterDetails, setLetterDetails] = useState({
    recipientName: '',
    occasion: '',
    message: '',
    senderName: '',
  })
  const [expressShipping, setExpressShipping] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 200 ? 0 : 25

  const wrappingPrice = giftWrapping === 'standard' ? 50 : giftWrapping === 'premium' ? 120 : 0
  const letterBasePrice = customLetter ? 85 : 0
  const letterPaperPremium = customLetter && letterPaper === 'black' ? 35 : 0
  const letterPrice = letterBasePrice + letterPaperPremium
  const expressPrice = expressShipping ? 200 : 0

  const upsellTotal = wrappingPrice + letterPrice + expressPrice
  const total = subtotal + shipping + upsellTotal

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Order placed successfully! Total: ${total} RON (${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'})`)
    router.push('/')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <h1 className="font-playfair mb-8" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700 }}>
            Your cart is empty
          </h1>
          <button
            onClick={() => router.push('/collections')}
            className="bg-[#c9a66b] text-black px-12 py-4 tracking-luxury hover:bg-[#b89559] transition-colors"
            style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-16">
          <h1
            className="font-playfair tracking-luxury"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 700, color: '#000000', letterSpacing: '0.05em' }}
          >
            Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white p-8 border border-black/10 sticky top-32">
                <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600, color: '#2a2a2a' }}>
                  Order Summary
                </h2>

                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p style={{ fontSize: '14px', fontWeight: 500, color: '#2a2a2a' }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: '13px', fontWeight: 300, color: '#666' }}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#c9a66b' }}>
                        {item.price * item.quantity} RON
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-black/10 pt-6 space-y-3">
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>Subtotal</span>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a' }}>{subtotal} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>Shipping</span>
                    <span style={{ fontSize: '14px', fontWeight: 400, color: shipping === 0 ? '#c9a66b' : '#2a2a2a' }}>
                      {shipping === 0 ? 'FREE' : `${shipping} RON`}
                    </span>
                  </div>

                  {wrappingPrice > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>
                        {giftWrapping === 'premium' ? 'Premium' : 'Standard'} Gift Wrapping ({wrappingColor})
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a' }}>{wrappingPrice} RON</span>
                    </div>
                  )}
                  {letterPrice > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>Custom Handwritten Letter</span>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a' }}>{letterPrice} RON</span>
                    </div>
                  )}
                  {expressPrice > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>Express Shipping</span>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a' }}>{expressPrice} RON</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 border-t border-black/10">
                    <span className="tracking-luxury" style={{ fontSize: '16px', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}>
                      TOTAL
                    </span>
                    <span className="font-playfair" style={{ fontSize: '24px', fontWeight: 600, color: '#c9a66b' }}>
                      {total} RON
                    </span>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="mt-6 p-4 bg-[#c9a66b]/10 border border-[#c9a66b]/30">
                    <p style={{ fontSize: '12px', fontWeight: 400, color: '#2a2a2a' }}>
                      Add {200 - subtotal} RON more to qualify for free shipping
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-black text-white p-8 lg:p-12">
                <div className="mb-10">
                  <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600 }}>
                    Contact Information
                  </h2>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  />
                </div>

                <div className="mb-10">
                  <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600 }}>
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className="bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className="bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                    className="w-full bg-white/10 border border-white/20 px-6 py-4 mb-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  />
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    />
                    <input
                      type="text"
                      name="county"
                      value={formData.county}
                      onChange={handleChange}
                      placeholder="County"
                      required
                      className="bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                      required
                      className="bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                      style={{ fontSize: '14px', fontWeight: 300 }}
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="w-full bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                    style={{ fontSize: '14px', fontWeight: 300 }}
                  />
                </div>

                <div className="mb-10">
                  <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600 }}>
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`w-full p-6 border-2 transition-colors text-left ${
                        paymentMethod === 'cod'
                          ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Banknote className="w-6 h-6 text-[#c9a66b]" />
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 600 }}>Cash on Delivery</p>
                          <p style={{ fontSize: '13px', fontWeight: 300, color: '#c9a66b' }}>
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-6 border-2 transition-colors text-left ${
                        paymentMethod === 'card'
                          ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <CreditCard className="w-6 h-6 text-[#c9a66b]" />
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 600 }}>Card Payment</p>
                          <p style={{ fontSize: '13px', fontWeight: 300, color: '#c9a66b' }}>
                            Secure online payment
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c9a66b] text-black py-5 tracking-luxury hover:bg-[#b89559] transition-colors"
                  style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}
                >
                  CONFIRM & PLACE ORDER
                </button>

                <p className="mt-6 text-center" style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b' }}>
                  By placing your order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
