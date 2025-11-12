import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedCategoriesProps {
  onNavigate: (page: string) => void;
}

export function FeaturedCategories({ onNavigate }: FeaturedCategoriesProps) {
  const categories = [
    {
      name: 'Rings',
      tagline: 'Timeless statements',
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Chains',
      tagline: 'Bold elegance',
      image: 'https://images.unsplash.com/photo-1619525673983-81151d6cc193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5JTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MjM2ODU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            Explore by Category
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            METICULOUSLY CRAFTED COLLECTIONS
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => onNavigate('collections')}
              className="group relative overflow-hidden aspect-[4/5] bg-black"
            >
              <ImageWithFallback
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              {/* Category Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-end p-12">
                <h3
                  className="font-playfair tracking-luxury mb-2 text-white"
                  style={{ fontSize: '42px', fontWeight: 700, letterSpacing: '0.05em' }}
                >
                  {category.name}
                </h3>
                <p
                  className="tracking-luxury text-[#c9a66b]"
                  style={{ fontSize: '14px', fontWeight: 300, letterSpacing: '0.08em' }}
                >
                  {category.tagline}
                </p>
                
                {/* Explore Button */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className="tracking-luxury border-b-2 border-[#c9a66b] pb-1"
                    style={{ fontSize: '12px', fontWeight: 500, color: '#c9a66b', letterSpacing: '0.12em' }}
                  >
                    EXPLORE
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
