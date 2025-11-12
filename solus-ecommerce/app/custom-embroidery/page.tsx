'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import Link from 'next/link'

const PRODUCTS = [
  { id: 'hoodie', name: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', price: 450, description: 'Bumbac premium de greutate mare' },
  { id: 'sweater', name: 'Pulover', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800', price: 380, description: 'Tricotat din lână merinos luxoasă' },
  { id: 'beanie', name: 'Căciulă', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800', price: 120, description: 'Amestec de cașmir moale' },
  { id: 'cap', name: 'Șapcă', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', price: 140, description: 'Bumbac twill structurat' },
]

export default function CustomEmbroideryPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="font-playfair tracking-luxury mb-6" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
          BRODERIE PERSONALIZATĂ
        </h1>
        <p className="max-w-2xl mx-auto mb-4" style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
          Ridică-ți garderoba cu broderie personalizată. Fiecare piesă devine o expresie unică a identității tale.
        </p>
        <div className="inline-block px-6 py-2 border border-black/20 bg-white" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#666' }}>
          5-7 ZILE MEȘTEȘUG · ARTIZANI MAEȘTRI
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group text-left bg-white border border-black/10 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-playfair mb-2" style={{ fontSize: '24px', letterSpacing: '0.05em' }}>{product.name}</h3>
                <p className="mb-4" style={{ fontSize: '12px', color: '#999', letterSpacing: '0.05em' }}>{product.description}</p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '14px', color: '#666' }}>DE LA</span>
                  <span className="font-playfair" style={{ fontSize: '20px' }}>{product.price} RON</span>
                </div>
                <div className="mt-4 pt-4 border-t border-black/10">
                  <span className="inline-block px-4 py-2 border border-black text-black group-hover:bg-black group-hover:text-white transition-colors duration-300" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                    PERSONALIZEAZĂ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
