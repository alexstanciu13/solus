'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import Link from 'next/link'

const stories = [
  { id: 'artisan-craft', title: 'Meșteșugul Artizanilor', excerpt: 'Povestea meșterilor care creează fiecare piesă cu pasiune...', image: 'https://images.unsplash.com/photo-1706955008775-c00874bb4d4b?w=1080', date: '15 Nov 2025' },
  { id: 'heritage', title: 'Moștenire și Tradiție', excerpt: 'Cum combinăm tradiția românească cu designul modern...', image: 'https://images.unsplash.com/photo-1619525673983-81151d6cc193?w=1080', date: '10 Nov 2025' },
  { id: 'materials', title: 'Materiale Premium', excerpt: 'Selectăm doar cele mai fine materiale pentru colecțiile noastre...', image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=1080', date: '5 Nov 2025' },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="text-center mb-20">
          <h1 className="font-playfair tracking-luxury mb-4" style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, letterSpacing: '0.05em' }}>
            Povești Solus
          </h1>
          <p className="tracking-luxury" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}>
            DESCOPERIȚI LUMEA DIN SPATELE CREAȚIILOR NOASTRE
          </p>
        </div>

        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <Link href={`/stories/${story.id}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white border border-black/10 overflow-hidden hover:shadow-2xl transition-shadow duration-500">
                  <div className="aspect-[4/3] lg:aspect-auto overflow-hidden bg-gray-100">
                    <ImageWithFallback src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="tracking-luxury mb-4 inline-block" style={{ fontSize: '11px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}>
                      {story.date}
                    </span>
                    <h2 className="font-playfair mb-4" style={{ fontSize: '36px', fontWeight: 600 }}>{story.title}</h2>
                    <p className="mb-6" style={{ fontSize: '15px', fontWeight: 300, color: '#666', lineHeight: '1.8' }}>{story.excerpt}</p>
                    <span className="text-[#c9a66b] group-hover:underline" style={{ fontSize: '13px', fontWeight: 500 }}>Citește mai mult →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
