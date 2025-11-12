import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Alexandru M.',
      title: 'Executive',
      rating: 5,
      quote: 'Exceptional craftsmanship. The attention to detail is remarkable. My signet ring has become my signature piece.',
    },
    {
      name: 'Cristian D.',
      title: 'Entrepreneur',
      rating: 5,
      quote: 'A true statement piece. Solus understands that luxury speaks through restraint and quality, not ostentation.',
    },
    {
      name: 'Andrei P.',
      title: 'Architect',
      rating: 5,
      quote: 'The custom embroidery service elevated my piece to an heirloom. This is jewelry that tells a story.',
    },
  ];

  return (
    <section className="py-32 px-8 lg:px-16 bg-[#faf8f5]">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            Voices of Distinction
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            WHAT OUR CLIENTS SAY
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white p-10 border border-black/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c9a66b] text-[#c9a66b]" />
                ))}
              </div>

              {/* Quote */}
              <p
                className="mb-8"
                style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.8' }}
              >
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div>
                <p
                  style={{ fontSize: '14px', fontWeight: 600, color: '#000000' }}
                >
                  {testimonial.name}
                </p>
                <p
                  style={{ fontSize: '13px', fontWeight: 300, color: '#c9a66b' }}
                >
                  {testimonial.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
