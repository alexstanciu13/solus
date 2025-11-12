'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import Link from 'next/link'

export function HeritageSection() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-black text-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1706955008775-c00874bb4d4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwd29ya3Nob3AlMjBjcmFmdHNtYW5zaGlwfGVufDF8fHx8MTc2MjM3MTU5OHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Solus craftsmanship"
              className="w-full h-full object-cover"
            />

            {/* Brand Mark Overlay */}
            <div className="absolute top-8 left-8">
              <div className="px-6 py-2 border border-[#c9a66b]/50 bg-black/50 backdrop-blur-sm">
                <span className="font-playfair tracking-luxury" style={{ fontSize: '14px', fontWeight: 600, color: '#c9a66b' }}>
                  ⬡ SOLUS ⬡
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p
                className="tracking-luxury mb-4"
                style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}
              >
                OUR PHILOSOPHY
              </p>
              <h2
                className="font-playfair tracking-luxury mb-8"
                style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em', lineHeight: '1.2' }}
              >
                Heritage Meets Contemporary Elegance
              </h2>
            </div>

            <div className="space-y-6">
              <p
                style={{ fontSize: '16px', fontWeight: 300, color: '#faf8f5', lineHeight: '1.9' }}
              >
                At Solus, we believe luxury is earned through dedication to craft, not mass production. Each piece is meticulously created by master artisans who honor centuries-old techniques while embracing modern precision.
              </p>
              <p
                style={{ fontSize: '16px', fontWeight: 300, color: '#faf8f5', lineHeight: '1.9' }}
              >
                Our commitment to limited editions ensures that every item remains rare and meaningful. We produce no more than a dozen pieces per design, making each acquisition a statement of discerning taste.
              </p>
              <p
                style={{ fontSize: '16px', fontWeight: 300, color: '#c9a66b', lineHeight: '1.9' }}
              >
                This is jewelry for those who understand that true luxury whispers.
              </p>
            </div>

            <Link
              href="/stories"
              className="inline-block border-2 border-[#c9a66b] text-[#c9a66b] px-10 py-4 tracking-luxury hover:bg-[#c9a66b] hover:text-black transition-all duration-300 mt-8"
              style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em' }}
            >
              OUR STORY
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
