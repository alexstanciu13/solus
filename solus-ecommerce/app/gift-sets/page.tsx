'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Gift, Type } from 'lucide-react'
import Link from 'next/link'

const giftSets = [
  { id: 'executive', name: 'The Executive', price: 3850, items: ['Inel Heritage Signet', 'Brățară Clasică Lanț', 'Cutie Premium'], image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=1080' },
  { id: 'signature', name: 'The Signature Style', price: 1420, items: ['Hoodie Personalizat', 'Căciulă Brodată', 'Plic Catifea'], image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', hasEmbroidery: true },
  { id: 'gentleman', name: 'The Gentleman', price: 2950, items: ['Inel Royal Seal', 'Colier Lanț Lux', 'Husă Piele'], image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?w=1080' },
  { id: 'minimalist', name: 'The Minimalist', price: 2450, items: ['Inel Minimalist', 'Brățară Clasică', 'Plic Catifea'], image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?w=1080' },
]

export default function GiftSetsPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <h1 className="font-playfair tracking-luxury mb-4" style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, letterSpacing: '0.05em' }}>
            Seturi Cadou
          </h1>
          <p className="tracking-luxury" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}>
            COLECȚII CURATE PENTRU MOMENTE SPECIALE
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {giftSets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white border border-black/10 overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <ImageWithFallback src={set.image} alt={set.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {set.hasEmbroidery && (
                  <div className="absolute top-4 right-4 bg-[#c9a66b] text-black px-4 py-2 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em' }}>PERSONALIZABIL</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h2 className="font-playfair mb-3" style={{ fontSize: '28px', fontWeight: 600 }}>{set.name}</h2>
                <ul className="mb-6 space-y-2">
                  {set.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#c9a66b]" />
                      <span style={{ fontSize: '14px', fontWeight: 300, color: '#666' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-6 border-t border-black/10">
                  <span className="font-playfair" style={{ fontSize: '28px', fontWeight: 600, color: '#c9a66b' }}>{set.price.toLocaleString('ro-RO')} RON</span>
                  <button className="px-6 py-3 bg-black text-white hover:bg-[#c9a66b] hover:text-black transition-colors" style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em' }}>
                    COMANDĂ
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
