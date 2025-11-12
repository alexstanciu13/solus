'use client'

import { motion } from 'framer-motion'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1619525673983-81151d6cc193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5JTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MjM2ODU4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Bijuterii de lux din aur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Logo - SOLUS */}
          <h1
            className="font-playfair tracking-luxury mb-8 text-white"
            style={{ fontSize: 'clamp(60px, 12vw, 120px)', fontWeight: 700, letterSpacing: '0.08em' }}
          >
            SOLUS
          </h1>

          <p
            className="tracking-luxury mb-8 sm:mb-12"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.15em' }}
          >
            BIJUTERII ARTIZANALE DE EXCEPȚIE PENTRU BĂRBATUL RAFINAT
          </p>
          <Link
            href="/collections"
            className="inline-block border-2 border-[#c9a66b] text-[#c9a66b] px-8 sm:px-12 py-3 sm:py-4 tracking-luxury hover:bg-[#c9a66b] hover:text-black transition-all duration-300"
            style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em' }}
          >
            DESCOPERĂ EDIȚIILE LIMITATE
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-[#c9a66b]/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-[#c9a66b] rounded-full"
          />
        </motion.div>
      </div>
    </section>
  )
}
