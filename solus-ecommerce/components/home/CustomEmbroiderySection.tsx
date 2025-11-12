'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CustomEmbroiderySection() {
  return (
    <section className="py-32 lg:py-40 bg-[#000000] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #c9a66b 2px, #c9a66b 3px)',
            backgroundSize: '100% 100px'
          }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative group">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1080" alt="Custom embroidery detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#c9a66b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#c9a66b]" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#c9a66b]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
            <p className="tracking-luxury text-[#c9a66b]" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.12em' }}>ÎMBRĂCĂMINTE PERSONALIZATĂ</p>
            <h2 className="font-playfair text-white" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0.02em' }}>
              Broderie Personalizată<br /><span className="text-[#c9a66b]">Pe Îmbrăcăminte de Lux</span>
            </h2>
            <div className="space-y-4">
              <p className="text-white/80" style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8 }}>
                Ridică-ți garderoba cu serviciul nostru de broderie bespoke. Fiecare haină devine o pânză pentru povestea ta personală.
              </p>
              <p className="text-white/60" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8 }}>
                De la monograme subtile pe hanorace premium până la design-uri intric ate pe cămăși croite, broderia noastră personalizată transformă îmbrăcămintea de lux în piese signature.
              </p>
            </div>
            <div className="pt-8">
              <Link href="/custom-embroidery" className="inline-block bg-white text-black px-12 py-4 hover:bg-[#c9a66b] hover:text-white transition-all duration-300">
                <span className="tracking-luxury" style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}>EXPLOREAZĂ BRODERIA</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
