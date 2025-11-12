'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { Instagram } from 'lucide-react'

export function InstagramSection() {
  const instagramImages = [
    'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619525673983-81151d6cc193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5JTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MjM2ODU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1703355685913-0113173df436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMG1lbnMlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjIzNjg1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1582043568776-7cc499677ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGRldGFpbCUyMG1hY3JvfGVufDF8fHx8MTc2MjM3MTU5OHww&ixlib=rb-4.1.0&q=80&w=1080',
  ]

  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="w-6 h-6 text-[#c9a66b]" />
            <h2
              className="font-playfair tracking-luxury"
              style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
            >
              @solus
            </h2>
          </div>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            FOLLOW OUR JOURNEY
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com/solus"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden bg-[#faf8f5]"
            >
              <ImageWithFallback
                src={image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/solus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border-2 border-black px-10 py-4 tracking-luxury hover:bg-black hover:text-white transition-all duration-300"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em' }}
          >
            <Instagram className="w-4 h-4" />
            FOLLOW US
          </a>
        </div>
      </div>
    </section>
  )
}
