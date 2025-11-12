import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const craftDetails = [
  {
    title: '18K Gold',
    description: 'Premium materials, ethically sourced',
    image: 'https://images.unsplash.com/photo-1582043568776-7cc499677ab1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwamV3ZWxyeSUyMGRldGFpbCUyMG1hY3JvfGVufDF8fHx8MTc2MjM3MTU5OHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Master Artisans',
    description: 'Decades of inherited expertise',
    image: 'https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBoYW5kcyUyMHdvcmtpbmclMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Lifetime Warranty',
    description: 'Craftsmanship guaranteed forever',
    image: 'https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsZWF0aGVyJTIwY2FzZSUyMGJveHxlbnwxfHx8fDE3NjIzNzE1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function CraftsmanshipShowcase() {
  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            The Solus Difference
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            UNCOMPROMISING QUALITY IN EVERY DETAIL
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {craftDetails.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-[#faf8f5]">
                <ImageWithFallback
                  src={detail.image}
                  alt={detail.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="text-center">
                <h3
                  className="tracking-luxury mb-2"
                  style={{ fontSize: '18px', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
                >
                  {detail.title}
                </h3>
                <p
                  style={{ fontSize: '14px', fontWeight: 300, color: '#2a2a2a' }}
                >
                  {detail.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 bg-black text-white p-12 md:p-16"
        >
          <div className="text-center">
            <p
              className="font-playfair mb-2"
              style={{ fontSize: '48px', fontWeight: 700, color: '#c9a66b' }}
            >
              12
            </p>
            <p
              className="tracking-luxury"
              style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.08em' }}
            >
              PIECES PER DESIGN
            </p>
          </div>
          
          <div className="text-center border-l-0 md:border-l border-white/20">
            <p
              className="font-playfair mb-2"
              style={{ fontSize: '48px', fontWeight: 700, color: '#c9a66b' }}
            >
              100%
            </p>
            <p
              className="tracking-luxury"
              style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.08em' }}
            >
              HANDCRAFTED
            </p>
          </div>
          
          <div className="text-center border-l-0 md:border-l border-white/20">
            <p
              className="font-playfair mb-2"
              style={{ fontSize: '48px', fontWeight: 700, color: '#c9a66b' }}
            >
              ∞
            </p>
            <p
              className="tracking-luxury"
              style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.08em' }}
            >
              LIFETIME WARRANTY
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
