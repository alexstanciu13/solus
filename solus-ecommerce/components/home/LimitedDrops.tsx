'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  stock: number
  slug: string
}

function ProductCard({ id, name, price, image, stock, slug }: Product) {
  return (
    <Link href={`/product/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="group cursor-pointer"
      >
        <div className="relative overflow-hidden bg-[#faf8f5] aspect-square mb-6">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Stock Indicator */}
          {stock <= 3 && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2">
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#c9a66b', letterSpacing: '0.08em' }}>
                DOAR {stock} BUCĂȚI
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
            {price.toLocaleString('ro-RO')} RON
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

export function LimitedDrops() {
  const featuredProducts: Product[] = [
    {
      id: '1',
      slug: 'inel-heritage-signet',
      name: 'Inel Heritage Signet',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 2,
    },
    {
      id: '2',
      slug: 'bratara-clasica-lant',
      name: 'Brățară Clasică Lanț',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
    },
    {
      id: '3',
      slug: 'inel-royal-seal',
      name: 'Inel Royal Seal',
      price: 1650,
      image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 3,
    },
  ]

  return (
    <section className="py-32 px-8 lg:px-16 bg-[#faf8f5]">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            Edițiile Limitate ale Săptămânii
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            PIESE RARE, DISPONIBILE EXCLUSIV
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="border-2 border-black px-12 py-4 tracking-luxury hover:bg-black hover:text-white transition-all duration-300 inline-block"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em' }}
          >
            VEZI TOATE COLECȚIILE
          </Link>
        </div>
      </div>
    </section>
  )
}
