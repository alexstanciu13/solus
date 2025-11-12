import { useState } from 'react';
import { CreditCard, Banknote, Gift, Sparkles, Mail } from 'lucide-react';

interface CheckoutProps {
  cartCount: number;
  onNavigate: (page: string) => void;
}

export function Checkout({ cartCount, onNavigate }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
    phone: '',
  });

  // Upsell options state
  const [giftWrapping, setGiftWrapping] = useState<'none' | 'standard' | 'premium'>('none');
  const [wrappingColor, setWrappingColor] = useState<'black' | 'white'>('black');
  const [customLetter, setCustomLetter] = useState(false);
  const [letterPaper, setLetterPaper] = useState<'white' | 'black' | 'premium'>('white');
  const [letterDetails, setLetterDetails] = useState({
    recipientName: '',
    occasion: '',
    message: '',
    senderName: '',
  });
  const [expressShipping, setExpressShipping] = useState(false);

  const cartItems = [
    { name: 'Heritage Signet Ring', price: 1250, quantity: 1 },
    { name: 'Classic Chain Bracelet', price: 1850, quantity: 1 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 200 ? 0 : 25;
  
  // Upsell pricing
  const wrappingPrice = giftWrapping === 'standard' ? 50 : giftWrapping === 'premium' ? 120 : 0;
  const letterBasePrice = customLetter ? 85 : 0;
  const letterPaperPremium = customLetter && letterPaper === 'premium' ? 35 : 0;
  const letterPrice = letterBasePrice + letterPaperPremium;
  const expressPrice = expressShipping ? 200 : 0;
  
  const upsellTotal = wrappingPrice + letterPrice + expressPrice;
  const total = subtotal + shipping + upsellTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed successfully! Total: ${total} RON (${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'})`);
    onNavigate('home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
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
            {/* Left: Order Review */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="bg-white p-8 border border-black/10 sticky top-32">
                <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600, color: '#2a2a2a' }}>
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-6 mb-8">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p style={{ fontSize: '14px', fontWeight: 500, color: '#2a2a2a' }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: '13px', fontWeight: 300, color: '#666' }}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: '#c9a66b' }}>
                        {item.price} RON
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
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
                  
                  {/* Upsell items in summary */}
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

            {/* Right: Checkout Form */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <div className="bg-black text-white p-8 lg:p-12">
                {/* Contact Info */}
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

                {/* Shipping Address */}
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

                {/* Upsells Section */}
                <div className="mb-10">
                  <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: 600 }}>
                    Enhance Your Order
                  </h2>

                  {/* Gift Wrapping Options */}
                  <div className="mb-6">
                    <h3 className="mb-4" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '0.05em' }}>
                      GIFT WRAPPING
                    </h3>
                    <div className="space-y-3">
                      {/* No Wrapping */}
                      <button
                        type="button"
                        onClick={() => setGiftWrapping('none')}
                        className={`w-full p-5 border-2 transition-colors text-left ${
                          giftWrapping === 'none'
                            ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: '14px', fontWeight: 500 }}>No Gift Wrapping</span>
                          <span style={{ fontSize: '14px', color: '#c9a66b' }}>FREE</span>
                        </div>
                      </button>

                      {/* Standard Wrapping */}
                      <button
                        type="button"
                        onClick={() => setGiftWrapping('standard')}
                        className={`w-full p-5 border-2 transition-colors text-left ${
                          giftWrapping === 'standard'
                            ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <Gift className="w-5 h-5 text-[#c9a66b]" />
                          <div className="flex-1 flex items-center justify-between">
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Standard Gift Wrapping</span>
                            <span style={{ fontSize: '14px', color: '#c9a66b' }}>+50 RON</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b', paddingLeft: '36px' }}>
                          Classic wrapping with satin ribbon
                        </p>
                      </button>

                      {/* Premium Wrapping */}
                      <button
                        type="button"
                        onClick={() => setGiftWrapping('premium')}
                        className={`w-full p-5 border-2 transition-colors text-left ${
                          giftWrapping === 'premium'
                            ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <Sparkles className="w-5 h-5 text-[#c9a66b]" />
                          <div className="flex-1 flex items-center justify-between">
                            <span style={{ fontSize: '14px', fontWeight: 500 }}>Premium Gift Wrapping</span>
                            <span style={{ fontSize: '14px', color: '#c9a66b' }}>+120 RON</span>
                          </div>
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b', paddingLeft: '36px' }}>
                          Hand-wrapped with gold foil seal and luxury ribbon
                        </p>
                      </button>
                    </div>

                    {/* Wrapping Color Selection */}
                    {giftWrapping !== 'none' && (
                      <div className="mt-4 p-4 bg-white/5 border border-white/10">
                        <label className="block mb-3" style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>
                          WRAPPING COLOR
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setWrappingColor('black')}
                            className={`p-4 border-2 transition-colors ${
                              wrappingColor === 'black'
                                ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-black border border-white/20" />
                              <span style={{ fontSize: '13px' }}>Black</span>
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWrappingColor('white')}
                            className={`p-4 border-2 transition-colors ${
                              wrappingColor === 'white'
                                ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                                : 'border-white/20 hover:border-white/40'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-white border border-white/20" />
                              <span style={{ fontSize: '13px' }}>White</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Custom Letter Option */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setCustomLetter(!customLetter)}
                      className={`w-full p-5 border-2 transition-colors text-left ${
                        customLetter
                          ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-[#c9a66b]" />
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 500 }}>Custom Handwritten Letter</p>
                            <p style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b' }}>
                              Personalized message on luxury stationery
                            </p>
                          </div>
                          <span style={{ fontSize: '14px', color: '#c9a66b' }}>+85 RON</span>
                        </div>
                      </div>
                    </button>

                    {/* Letter Details Form */}
                    {customLetter && (
                      <div className="mt-4 p-6 bg-white/5 border border-white/10 space-y-4">
                        <h4 className="mb-4" style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>
                          LETTER DETAILS
                        </h4>
                        <input
                          type="text"
                          placeholder="Recipient's Name"
                          value={letterDetails.recipientName}
                          onChange={(e) => setLetterDetails({ ...letterDetails, recipientName: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#c9a66b] transition-colors"
                          style={{ fontSize: '13px', fontWeight: 300 }}
                        />
                        <input
                          type="text"
                          placeholder="Occasion (e.g., Birthday, Anniversary)"
                          value={letterDetails.occasion}
                          onChange={(e) => setLetterDetails({ ...letterDetails, occasion: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#c9a66b] transition-colors"
                          style={{ fontSize: '13px', fontWeight: 300 }}
                        />
                        <textarea
                          placeholder="Your personal message (max 200 characters)"
                          maxLength={200}
                          value={letterDetails.message}
                          onChange={(e) => setLetterDetails({ ...letterDetails, message: e.target.value })}
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#c9a66b] transition-colors resize-none"
                          style={{ fontSize: '13px', fontWeight: 300 }}
                        />
                        <p className="text-right" style={{ fontSize: '11px', color: '#999' }}>
                          {letterDetails.message.length}/200 characters
                        </p>
                        <input
                          type="text"
                          placeholder="Your Name (Sender)"
                          value={letterDetails.senderName}
                          onChange={(e) => setLetterDetails({ ...letterDetails, senderName: e.target.value })}
                          className="w-full bg-white/10 border border-white/20 px-4 py-3 focus:outline-none focus:border-[#c9a66b] transition-colors"
                          style={{ fontSize: '13px', fontWeight: 300 }}
                        />
                        
                        {/* Paper Color Selection */}
                        <div>
                          <label className="block mb-3" style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>
                            STATIONERY COLOR
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setLetterPaper('white')}
                              className={`p-4 border-2 transition-colors ${
                                letterPaper === 'white'
                                  ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-[#faf8f5] border border-white/20" />
                                <span style={{ fontSize: '13px' }}>Cream Paper</span>
                              </div>
                              <p style={{ fontSize: '11px', color: '#c9a66b', opacity: 0.8 }}>Included</p>
                            </button>
                            <button
                              type="button"
                              onClick={() => setLetterPaper('black')}
                              className={`p-4 border-2 transition-colors ${
                                letterPaper === 'black'
                                  ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-black border border-white/20" />
                                <span style={{ fontSize: '13px' }}>Black Paper</span>
                              </div>
                              <p style={{ fontSize: '11px', color: '#c9a66b', opacity: 0.8 }}>+35 RON</p>
                            </button>
                          </div>
                        </div>
                        
                        <p style={{ fontSize: '11px', fontWeight: 300, color: '#c9a66b', lineHeight: '1.5' }}>
                          Our calligrapher will hand-write your message on premium {letterPaper === 'black' ? 'black' : 'cream'} stationery with {letterPaper === 'black' ? 'gold' : 'gold'} embossing.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Express Shipping Option */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={() => setExpressShipping(!expressShipping)}
                      className={`w-full p-5 border-2 transition-colors text-left ${
                        expressShipping
                          ? 'border-[#c9a66b] bg-[#c9a66b]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Sparkles className="w-5 h-5 text-[#c9a66b]" />
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: 500 }}>Express Shipping</p>
                            <p style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b' }}>
                              Next day delivery
                            </p>
                          </div>
                          <span style={{ fontSize: '14px', color: '#c9a66b' }}>+200 RON</span>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Payment Method */}
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

                {/* Submit Button */}
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
  );
}