'use client'

import { motion } from 'framer-motion'

export function PressSection() {
  const pressLogos = [
    { name: 'VOGUE', style: 'italic' },
    { name: 'GQ', style: 'normal' },
    { name: 'ESQUIRE', style: 'normal' },
    { name: 'FORBES', style: 'normal' },
  ]

  const pressQuotes = [
    {
      quote: 'Solus redefines luxury through restraint',
      publication: 'Vogue Romania',
    },
    {
      quote: 'The future of heritage jewelry',
      publication: 'GQ Style',
    },
  ]

  return (
    <section className="py-32 px-8 lg:px-16 bg-[#faf8f5]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="tracking-luxury"
            style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}
          >
            AS SEEN IN
          </p>
        </div>

        {/* Press Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {pressLogos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              <span
                className={`tracking-luxury ${logo.style === 'italic' ? 'italic' : ''}`}
                style={{ fontSize: '24px', fontWeight: 700, color: '#2a2a2a', letterSpacing: '0.15em', opacity: 0.6 }}
              >
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Press Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pressQuotes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-8 border border-black/5"
            >
              <p
                className="font-playfair mb-4"
                style={{ fontSize: '20px', fontWeight: 400, color: '#000000', lineHeight: '1.6', fontStyle: 'italic' }}
              >
                "{item.quote}"
              </p>
              <p
                className="tracking-luxury"
                style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.1em' }}
              >
                — {item.publication.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
