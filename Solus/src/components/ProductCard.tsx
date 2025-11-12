import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  stock?: number;
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductCard({ id, name, price, image, stock, onNavigate }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group cursor-pointer"
      onClick={() => onNavigate('product', id)}
    >
      <div className="relative overflow-hidden bg-[#faf8f5] aspect-square mb-6">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Stock Indicator */}
        {stock !== undefined && stock <= 3 && (
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2">
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#c9a66b', letterSpacing: '0.08em' }}>
              ONLY {stock} LEFT
            </span>
          </div>
        )}

        {/* Hover Border Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a66b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>

      <div className="text-center">
        <h3
          className="mb-2 tracking-luxury"
          style={{ fontSize: '15px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.05em' }}
        >
          {name}
        </h3>
        <p
          className="tracking-luxury"
          style={{ fontSize: '16px', fontWeight: 600, color: '#c9a66b' }}
        >
          {price} RON
        </p>
      </div>
    </motion.div>
  );
}
