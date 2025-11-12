import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Type, ArrowLeft, Package, Sparkles, Clock } from 'lucide-react';
import { useState } from 'react';

interface GiftSetDetailProps {
  setId: string;
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: () => void;
}

const GIFT_SETS = [
  {
    id: 'executive',
    name: 'The Executive',
    price: 3850,
    description: 'A distinguished collection for the modern executive. This carefully curated set combines our finest jewelry pieces with premium packaging, perfect for marking life\'s significant achievements.',
    items: [
      { name: 'Heritage Signet Ring', detail: '14k gold-plated sterling silver', image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=800' },
      { name: 'Classic Chain Bracelet', detail: 'Hand-finished sterling silver', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800' },
      { name: 'Premium Gift Box', detail: 'Signature black leather presentation box', image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hasCustomEmbroidery: false,
  },
  {
    id: 'signature-style',
    name: 'The Signature Style',
    price: 1420,
    description: 'Make it yours with our premium custom embroidery collection. This set features our finest apparel pieces ready for personalization, allowing you to create something truly unique.',
    items: [
      { name: 'Personalized Hoodie', detail: 'Premium heavyweight cotton - Choose your embroidery', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
      { name: 'Custom Embroidered Beanie', detail: 'Soft cashmere blend - Monogram options available', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800' },
      { name: 'Luxury Velvet Pouch', detail: 'Protective storage with gold foil logo', image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    hasCustomEmbroidery: true,
    embroideryNote: 'Customization options available during checkout. Choose font, thread color, and placement for each piece.'
  },
  {
    id: 'gentleman',
    name: 'The Gentleman',
    price: 2950,
    description: 'Timeless elegance meets contemporary design. This set embodies refined masculinity with pieces that transition seamlessly from boardroom to evening occasions.',
    items: [
      { name: 'Royal Seal Ring', detail: 'Hand-engraved sterling silver', image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?w=800' },
      { name: 'Luxury Chain Necklace', detail: 'Premium 925 sterling silver, 22" length', image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800' },
      { name: 'Leather Case', detail: 'Italian full-grain leather travel case', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    hasCustomEmbroidery: false,
  },
  {
    id: 'urban-essentials',
    name: 'The Urban Essentials',
    price: 980,
    description: 'Street-smart sophistication for the modern gentleman. This curated selection brings personalized luxury to your everyday wardrobe with custom embroidery options.',
    items: [
      { name: 'Embroidered Cap', detail: 'Structured cotton twill - Custom monogram', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800' },
      { name: 'Embroidered Shirt', detail: 'Italian cotton poplin - Personalization included', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800' },
      { name: 'Monogrammed Travel Case', detail: 'Premium canvas with leather trim', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
    hasCustomEmbroidery: true,
    embroideryNote: 'Choose your monogram and thread color. Our artisans will hand-embroider each piece to your specifications.'
  },
  {
    id: 'minimalist',
    name: 'The Minimalist',
    price: 2450,
    description: 'Less is more. This refined collection celebrates clean lines and understated elegance, perfect for those who appreciate subtle luxury and timeless design.',
    items: [
      { name: 'Minimalist Band Ring', detail: 'Brushed sterling silver, sleek profile', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800' },
      { name: 'Classic Chain Bracelet', detail: 'Hand-finished sterling silver links', image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?w=800' },
      { name: 'Velvet Pouch', detail: 'Soft-touch storage with satin lining', image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    hasCustomEmbroidery: false,
  },
  {
    id: 'heritage',
    name: 'The Heritage Collection',
    price: 4150,
    description: 'Where tradition meets personalization. This comprehensive collection pairs our signature jewelry with custom embroidered apparel, creating a complete luxury experience.',
    items: [
      { name: 'Heritage Signet Ring', detail: '14k gold-plated with classic design', image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=800' },
      { name: 'Personalized Sweater', detail: 'Luxurious merino wool - Custom embroidery', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800' },
      { name: 'Luxury Trousers', detail: 'Tailored wool blend - Monogram available', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800' },
      { name: 'Monogrammed Box', detail: 'Premium presentation case with gold foiling', image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
    hasCustomEmbroidery: true,
    embroideryNote: 'Full personalization suite included. Customize sweater and trousers with embroidery, and add your monogram to the presentation box.'
  },
  {
    id: 'weekend-luxury',
    name: 'The Weekend Luxury',
    price: 1750,
    description: 'Elevated casual elegance for your downtime. This hybrid collection combines personalized apparel with fine jewelry, perfect for the gentleman who values both comfort and sophistication.',
    items: [
      { name: 'Custom Hoodie', detail: 'Premium cotton fleece - Your design', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
      { name: 'Embroidered Beanie', detail: 'Cashmere blend - Monogram included', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800' },
      { name: 'Classic Chain Bracelet', detail: 'Sterling silver statement piece', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800' },
      { name: 'Gift Box', detail: 'Signature packaging with ribbon', image: 'https://images.unsplash.com/photo-1549062572-544a64fb0c56?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
    hasCustomEmbroidery: true,
    embroideryNote: 'Perfect mix of jewelry and custom apparel. Personalize your hoodie and beanie with text, monogram, or symbol.'
  },
  {
    id: 'complete-wardrobe',
    name: 'The Complete Wardrobe',
    price: 5890,
    description: 'The ultimate Solus experience. This comprehensive collection offers a complete wardrobe transformation with every piece customizable to your specifications - the pinnacle of personalized luxury.',
    items: [
      { name: 'Personalized Hoodie', detail: 'Premium heavyweight cotton - Full customization', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800' },
      { name: 'Custom Sweater', detail: 'Merino wool knit - Embroidery included', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800' },
      { name: 'Embroidered Shirt', detail: 'Italian cotton - Monogram options', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800' },
      { name: 'Luxury Trousers', detail: 'Tailored wool blend - Custom details', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800' },
      { name: 'Cap & Beanie Set', detail: 'Premium materials - Matching embroidery', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800' },
      { name: 'Heritage Signet Ring', detail: '14k gold-plated signature piece', image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=800' },
      { name: 'Premium Travel Case', detail: 'Leather with custom embossing', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' }
    ],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
    hasCustomEmbroidery: true,
    embroideryNote: 'Ultimate collection with full customization on every apparel piece. Create a cohesive personal brand across your entire wardrobe.'
  },
];

export function GiftSetDetail({ setId, onNavigate, onAddToCart }: GiftSetDetailProps) {
  const [giftWrapping, setGiftWrapping] = useState(false);
  
  const giftSet = GIFT_SETS.find(set => set.id === setId);

  if (!giftSet) {
    return <div>Gift set not found</div>;
  }

  const handleAddToCart = () => {
    onAddToCart();
    alert(`${giftSet.name} added to cart!${giftWrapping ? ' (with gift wrapping)' : ''}`);
  };

  const totalPrice = giftSet.price + (giftWrapping ? 50 : 0);

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('gifts')}
          className="flex items-center gap-2 mb-12 hover:text-[#c9a66b] transition-colors"
          style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO GIFT SETS
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative overflow-hidden aspect-[4/5] bg-white mb-6">
              <ImageWithFallback
                src={giftSet.image}
                alt={giftSet.name}
                className="w-full h-full object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-[#c9a66b] text-black px-4 py-2 flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                    GIFT SET
                  </span>
                </div>
                {giftSet.hasCustomEmbroidery && (
                  <div className="bg-black text-white px-4 py-2 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                      CUSTOM EMBROIDERY
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 border border-black/10 text-center">
                <Package className="w-5 h-5 mx-auto mb-2 text-[#c9a66b]" />
                <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#2a2a2a' }}>
                  PREMIUM PACKAGING
                </p>
              </div>
              <div className="bg-white p-4 border border-black/10 text-center">
                <Sparkles className="w-5 h-5 mx-auto mb-2 text-[#c9a66b]" />
                <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#2a2a2a' }}>
                  LUXURY CURATION
                </p>
              </div>
              <div className="bg-white p-4 border border-black/10 text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-[#c9a66b]" />
                <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#2a2a2a' }}>
                  READY TO GIFT
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1
              className="font-playfair mb-4"
              style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#000000', letterSpacing: '0.02em' }}
            >
              {giftSet.name}
            </h1>

            <p
              className="mb-8"
              style={{ fontSize: '32px', fontWeight: 600, color: '#c9a66b' }}
            >
              {giftSet.price} RON
            </p>

            <p
              className="mb-12"
              style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.8' }}
            >
              {giftSet.description}
            </p>

            {/* Custom Embroidery Note */}
            {giftSet.hasCustomEmbroidery && giftSet.embroideryNote && (
              <div className="mb-8 p-6 bg-white border border-[#c9a66b]/30">
                <div className="flex items-start gap-3 mb-3">
                  <Type className="w-5 h-5 text-[#c9a66b] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.08em', marginBottom: '8px' }}>
                      PERSONALIZATION INCLUDED
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.6' }}>
                      {giftSet.embroideryNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Items Included */}
            <div className="mb-10">
              <h3
                className="mb-6"
                style={{ fontSize: '14px', fontWeight: 600, color: '#000000', letterSpacing: '0.1em' }}
              >
                INCLUDES ({giftSet.items.length} ITEMS):
              </h3>
              <div className="space-y-4">
                {giftSet.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-white border border-black/10 hover:border-[#c9a66b]/30 transition-colors"
                  >
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 style={{ fontSize: '14px', fontWeight: 500, color: '#000000', marginBottom: '4px' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '12px', fontWeight: 300, color: '#666', lineHeight: '1.5' }}>
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Wrapping Option */}
            <div className="mb-8 p-6 bg-white border border-black/10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={giftWrapping}
                  onChange={(e) => setGiftWrapping(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[#c9a66b]"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}>
                      Add Premium Gift Wrapping
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#c9a66b' }}>
                      +50 RON
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 300, color: '#666', lineHeight: '1.5' }}>
                    Hand-wrapped in our signature black paper with gold foil seal and satin ribbon
                  </p>
                </div>
              </label>
            </div>

            {/* Price Summary */}
            <div className="mb-8 p-6 bg-black text-white">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                  GIFT SET
                </span>
                <span style={{ fontSize: '15px' }}>
                  {giftSet.price} RON
                </span>
              </div>
              {giftWrapping && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
                  <span style={{ fontSize: '13px', letterSpacing: '0.08em' }}>
                    GIFT WRAPPING
                  </span>
                  <span style={{ fontSize: '15px' }}>
                    50 RON
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '0.08em' }}>
                  TOTAL
                </span>
                <span className="font-playfair" style={{ fontSize: '28px', fontWeight: 600 }}>
                  {totalPrice} RON
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (giftSet.hasCustomEmbroidery) {
                  onNavigate('gift-set-customize', setId);
                } else {
                  handleAddToCart();
                }
              }}
              className="w-full bg-[#c9a66b] text-black py-5 tracking-luxury hover:bg-[#b89559] transition-colors mb-4"
              style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}
            >
              {giftSet.hasCustomEmbroidery ? 'CUSTOMIZE & ADD TO CART' : 'ADD TO CART'}
            </button>

            <p className="text-center" style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>
              {giftSet.hasCustomEmbroidery ? '5-7 days for personalization + shipping' : 'Ships within 24 hours'}
            </p>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 border border-black/10 text-center">
            <Gift className="w-8 h-8 mx-auto mb-4 text-[#c9a66b]" />
            <h4 className="mb-3" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em' }}>
              PERFECT FOR GIFTING
            </h4>
            <p style={{ fontSize: '13px', fontWeight: 300, color: '#666', lineHeight: '1.7' }}>
              Each set arrives in our signature packaging. Add a personalized message card at checkout.
            </p>
          </div>
          <div className="bg-white p-8 border border-black/10 text-center">
            <Package className="w-8 h-8 mx-auto mb-4 text-[#c9a66b]" />
            <h4 className="mb-3" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.08em' }}>
              CURATED WITH CARE
            </h4>
            <p style={{ fontSize: '13px', fontWeight: 300, color: '#666', lineHeight: '1.7' }}>
              Every item is hand-selected to create a cohesive, elevated gifting experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}