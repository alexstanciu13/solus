import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Gift, Type } from 'lucide-react';

interface GiftSet {
  id: string;
  name: string;
  price: number;
  items: string[];
  image: string;
  hasCustomEmbroidery?: boolean;
  embroideryNote?: string;
}

interface GiftSetsProps {
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: () => void;
}

export function GiftSets({ onNavigate, onAddToCart }: GiftSetsProps) {
  const giftSets: GiftSet[] = [
    {
      id: 'executive',
      name: 'The Executive',
      price: 3850,
      items: ['Heritage Signet Ring', 'Classic Chain Bracelet', 'Premium Gift Box'],
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'signature-style',
      name: 'The Signature Style',
      price: 1420,
      items: ['Personalized Hoodie', 'Custom Embroidered Beanie', 'Luxury Velvet Pouch'],
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      hasCustomEmbroidery: true,
      embroideryNote: 'Customization options available during checkout'
    },
    {
      id: 'gentleman',
      name: 'The Gentleman',
      price: 2950,
      items: ['Royal Seal Ring', 'Luxury Chain Necklace', 'Leather Case'],
      image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'urban-essentials',
      name: 'The Urban Essentials',
      price: 980,
      items: ['Embroidered Cap', 'Embroidered Shirt', 'Monogrammed Travel Case'],
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800',
      hasCustomEmbroidery: true,
      embroideryNote: 'Choose your monogram and thread color'
    },
    {
      id: 'minimalist',
      name: 'The Minimalist',
      price: 2450,
      items: ['Minimalist Band Ring', 'Classic Chain Bracelet', 'Velvet Pouch'],
      image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'heritage',
      name: 'The Heritage Collection',
      price: 4150,
      items: ['Heritage Signet Ring', 'Personalized Sweater', 'Luxury Trousers', 'Monogrammed Box'],
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800',
      hasCustomEmbroidery: true,
      embroideryNote: 'Full personalization suite included'
    },
    {
      id: 'weekend-luxury',
      name: 'The Weekend Luxury',
      price: 1750,
      items: ['Custom Hoodie', 'Embroidered Beanie', 'Classic Chain Bracelet', 'Gift Box'],
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
      hasCustomEmbroidery: true,
      embroideryNote: 'Mix of jewelry and custom apparel'
    },
    {
      id: 'complete-wardrobe',
      name: 'The Complete Wardrobe',
      price: 5890,
      items: ['Personalized Hoodie', 'Custom Sweater', 'Embroidered Shirt', 'Luxury Trousers', 'Cap & Beanie Set', 'Heritage Signet Ring', 'Premium Travel Case'],
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
      hasCustomEmbroidery: true,
      embroideryNote: 'Ultimate collection with full customization'
    },
  ];

  const handleAddToCart = () => {
    onAddToCart();
    alert('Gift set added to cart!');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: '#000000', letterSpacing: '0.05em' }}
          >
            Solus Essentials
          </h1>
          <p
            className="tracking-luxury mb-6"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            CURATED GIFT SETS FOR THE DISCERNING GENTLEMAN
          </p>
          <p
            style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.8', maxWidth: '600px', margin: '0 auto' }}
          >
            Each set is thoughtfully curated and presented in our signature packaging. Gift wrapping available for an additional 50 RON.
          </p>
        </div>

        {/* Gift Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {giftSets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onNavigate('gift-set-detail', set.id)}
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-white">
                <ImageWithFallback
                  src={set.image}
                  alt={set.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badge Container */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {/* Gift Badge */}
                  <div className="bg-[#c9a66b] text-black px-4 py-2 flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                      GIFT SET
                    </span>
                  </div>
                  
                  {/* Custom Embroidery Badge */}
                  {set.hasCustomEmbroidery && (
                    <div className="bg-black text-white px-4 py-2 flex items-center gap-2">
                      <Type className="w-4 h-4" />
                      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>
                        CUSTOM EMBROIDERY
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white p-8 border border-black/10 transition-all duration-300 group-hover:border-[#c9a66b]/30 group-hover:shadow-lg">
                <h3
                  className="font-playfair mb-3"
                  style={{ fontSize: '28px', fontWeight: 600, color: '#000000' }}
                >
                  {set.name}
                </h3>
                
                <p
                  className="mb-6"
                  style={{ fontSize: '24px', fontWeight: 600, color: '#c9a66b' }}
                >
                  {set.price} RON
                </p>

                {/* Items List */}
                <div className="mb-8 space-y-2">
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#2a2a2a', letterSpacing: '0.08em' }}>
                    INCLUDES:
                  </p>
                  {set.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ fontSize: '14px', color: '#c9a66b' }}>•</span>
                      <span style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Custom Embroidery Note */}
                {set.hasCustomEmbroidery && set.embroideryNote && (
                  <div className="mb-6 p-4 bg-[#faf8f5] border border-[#c9a66b]/20">
                    <div className="flex items-start gap-2">
                      <Type className="w-4 h-4 text-[#c9a66b] mt-0.5 flex-shrink-0" />
                      <p style={{ fontSize: '12px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.6' }}>
                        {set.embroideryNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <button
                  className="w-full bg-black text-white py-4 tracking-luxury hover:bg-[#c9a66b] hover:text-black transition-colors mb-3"
                  style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('gift-set-detail', set.id);
                  }}
                >
                  VIEW DETAILS
                </button>

                {/* Gift Wrapping Option */}
                <p className="text-center" style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>
                  Gift wrapping available +50 RON
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-black text-white p-12 text-center">
            <h3 className="font-playfair mb-4" style={{ fontSize: '28px', fontWeight: 600 }}>
              Corporate Gifting
            </h3>
            <p className="mb-6" style={{ fontSize: '14px', fontWeight: 300, lineHeight: '1.8' }}>
              Looking to make a lasting impression? We offer bespoke corporate gifting services with custom packaging and personalization options.
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="border-2 border-[#c9a66b] text-[#c9a66b] px-10 py-3 tracking-luxury hover:bg-[#c9a66b] hover:text-black transition-all duration-300"
              style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em' }}
            >
              CONTACT US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}