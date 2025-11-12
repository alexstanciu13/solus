'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  stock: number
  slug: string
}

function ProductCard(product: Product) {
  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="group cursor-pointer">
        <div className="relative overflow-hidden bg-white aspect-square mb-6">
          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          {product.stock <= 3 && (
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-4 py-2">
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#c9a66b', letterSpacing: '0.08em' }}>DOAR {product.stock} BUCĂȚI</span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c9a66b] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
        <div className="text-center">
          <h3 className="mb-2 tracking-luxury" style={{ fontSize: '15px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.05em' }}>{product.name}</h3>
          <p className="tracking-luxury" style={{ fontSize: '16px', fontWeight: 600, color: '#c9a66b' }}>{product.price.toLocaleString('ro-RO')} RON</p>
        </div>
      </motion.div>
    </Link>
  )
}

export default function CollectionsPage() {
  const products: Product[] = [
    { id: '1', slug: 'inel-heritage-signet', name: 'Inel Heritage Signet', price: 1250, image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=1080', stock: 2 },
    { id: '2', slug: 'bratara-clasica-lant', name: 'Brățară Clasică Lanț', price: 1850, image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?w=1080', stock: 1 },
    { id: '3', slug: 'inel-royal-seal', name: 'Inel Royal Seal', price: 1650, image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?w=1080', stock: 3 },
    { id: '4', slug: 'colier-lant-lux', name: 'Colier Lanț de Lux', price: 2250, image: 'https://images.unsplash.com/photo-1619525673983-81151d6cc193?w=1080', stock: 2 },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <h1 className="font-playfair tracking-luxury mb-4" style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, letterSpacing: '0.05em' }}>Colecțiile Noastre</h1>
          <p className="tracking-luxury" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}>PIESE SELECTATE METICULOS PENTRU BĂRBATUL RAFINAT</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => <ProductCard key={product.id} {...product} />)}
        </div>
      </div>
    </div>
  )
}
