'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'

const craftDetails = [
  { title: 'Aur 18K', description: 'Materiale premium, surse etice', image: 'https://images.unsplash.com/photo-1582043568776-7cc499677ab1?w=1080' },
  { title: 'Artizani Maeștri', description: 'Decenii de expertiză moștenită', image: 'https://images.unsplash.com/photo-1643968704781-df3b260df6a7?w=1080' },
  { title: 'Garanție pe Viață', description: 'Meșteșug garantat pentru totdeauna', image: 'https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?w=1080' },
]

export function CraftsmanshipShowcase() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair tracking-luxury mb-4" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, letterSpacing: '0.05em' }}>
            Diferența Solus
          </h2>
          <p className="tracking-luxury" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}>
            CALITATE FĂRĂ COMPROMISURI ÎN FIECARE DETALIU
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {craftDetails.map((detail, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} className="group">
              <div className="relative aspect-square overflow-hidden mb-6 bg-[#faf8f5]">
                <ImageWithFallback src={detail.image} alt={detail.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="font-playfair mb-2" style={{ fontSize: '24px', fontWeight: 600 }}>{detail.title}</h3>
              <p style={{ fontSize: '14px', fontWeight: 300, color: '#666' }}>{detail.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
