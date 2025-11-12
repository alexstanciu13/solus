'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Alexandru M.', title: 'Executiv', rating: 5, quote: 'Meșteșug excepțional. Atenția la detalii este remarcabilă. Inelul meu signet a devenit piesa mea signature.' },
  { name: 'Cristian D.', title: 'Antreprenor', rating: 5, quote: 'O piesă statement adevărată. Solus înțelege că luxul vorbește prin reținere și calitate, nu prin ostentație.' },
  { name: 'Andrei P.', title: 'Arhitect', rating: 5, quote: 'Serviciul de broderie personalizată mi-a ridicat piesa la nivel de moștenire. Aceasta este bijuterie care povestește.' },
]

export function Testimonials() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-[#faf8f5]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-playfair tracking-luxury mb-4" style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, letterSpacing: '0.05em' }}>
            Voci ale Distincției
          </h2>
          <p className="tracking-luxury" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}>
            CE SPUN CLIENȚII NOȘTRI
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} className="bg-white p-10 border border-black/10">
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c9a66b] text-[#c9a66b]" />
                ))}
              </div>
              <p className="mb-6" style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8, color: '#2a2a2a' }}>"{testimonial.quote}"</p>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#2a2a2a' }}>{testimonial.name}</p>
                <p style={{ fontSize: '13px', fontWeight: 300, color: '#c9a66b' }}>{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
