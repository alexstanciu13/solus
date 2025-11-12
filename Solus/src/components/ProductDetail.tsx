import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Star, Truck, Shield, ChevronRight } from 'lucide-react';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string, id?: string) => void;
  onAddToCart: () => void;
}

export function ProductDetail({ productId, onNavigate, onAddToCart }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [addEmbroidery, setAddEmbroidery] = useState(false);

  // Mock product data
  const product = {
    id: productId,
    name: 'Heritage Signet Ring',
    price: 1250,
    stock: 2,
    description: 'Meticulously crafted from 18k gold-plated sterling silver. This heritage piece embodies timeless elegance with contemporary sophistication.',
    images: [
      'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1619525673983-81151d6cc193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5JTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MjM2ODU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    reviews: [
      { name: 'Alexandru M.', rating: 5, comment: 'Exceptional craftsmanship. The attention to detail is remarkable.' },
      { name: 'Cristian D.', rating: 5, comment: 'A true statement piece. Luxury that speaks for itself.' },
    ],
  };

  const handleAddToCart = () => {
    onAddToCart();
    alert('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#c9a66b] transition-colors"
            style={{ fontSize: '12px', fontWeight: 400, color: '#2a2a2a' }}
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#2a2a2a]" />
          <button
            onClick={() => onNavigate('collections')}
            className="hover:text-[#c9a66b] transition-colors"
            style={{ fontSize: '12px', fontWeight: 400, color: '#2a2a2a' }}
          >
            Collections
          </button>
          <ChevronRight className="w-3 h-3 text-[#2a2a2a]" />
          <span style={{ fontSize: '12px', fontWeight: 400, color: '#c9a66b' }}>
            {product.name}
          </span>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square mb-6 bg-white"
            >
              <ImageWithFallback
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Image Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white border-2 transition-colors ${
                    selectedImage === index ? 'border-[#c9a66b]' : 'border-transparent hover:border-black/20'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="mb-6">
              <span
                className="tracking-luxury inline-block mb-4"
                style={{ fontSize: '11px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}
              >
                SOLUS LIMITED EDITION
              </span>
              <h1
                className="font-playfair mb-4"
                style={{ fontSize: '42px', fontWeight: 600, color: '#000000' }}
              >
                {product.name}
              </h1>
              <p
                className="mb-6"
                style={{ fontSize: '32px', fontWeight: 600, color: '#c9a66b' }}
              >
                {product.price} RON
              </p>
              
              {/* Stock Counter */}
              <div className="inline-block bg-black px-6 py-3 mb-8">
                <motion.span
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.1em' }}
                >
                  ONLY {product.stock} PIECE{product.stock > 1 ? 'S' : ''} REMAINING
                </motion.span>
              </div>
            </div>

            {/* Description */}
            <p
              className="mb-10"
              style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.8' }}
            >
              {product.description}
            </p>

            {/* Custom Embroidery Option */}
            <div className="mb-10 p-6 border border-black/10">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#2a2a2a' }}>
                  Add Custom Embroidery
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addEmbroidery}
                    onChange={(e) => setAddEmbroidery(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a66b]"></div>
                </label>
              </div>
              {addEmbroidery && (
                <button
                  onClick={() => onNavigate('custom-embroidery-catalog')}
                  className="text-[#c9a66b] hover:underline"
                  style={{ fontSize: '13px', fontWeight: 400 }}
                >
                  Configure embroidery →
                </button>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#c9a66b] text-black py-5 tracking-luxury hover:bg-[#b89559] transition-colors mb-8"
              style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}
            >
              ADD TO CART
            </button>

            {/* Shipping Info */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#c9a66b] mt-1" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>
                    Free shipping over 200 RON
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>
                    Express 24h delivery available
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#c9a66b] mt-1" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>
                    Lifetime warranty
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>
                    Craftsmanship guaranteed
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="border-t border-black/10 pt-10">
              <h3 className="mb-6" style={{ fontSize: '18px', fontWeight: 600, color: '#2a2a2a' }}>
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="pb-6 border-b border-black/5 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c9a66b] text-[#c9a66b]" />
                        ))}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>
                        {review.name}
                      </span>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 300, color: '#666', lineHeight: '1.6' }}>
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}