import { motion } from 'motion/react';

interface CustomEmbroiderySectionProps {
  onNavigate: (page: string) => void;
}

export function CustomEmbroiderySection({ onNavigate }: CustomEmbroiderySectionProps) {
  return (
    <section className="py-32 lg:py-40 bg-[#000000] relative overflow-hidden">
      {/* Background subtle pattern */}
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
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1080"
                alt="Custom embroidery apparel detail"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#c9a66b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#c9a66b]" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#c9a66b]" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Subtitle */}
            <p
              className="tracking-luxury text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.12em' }}
            >
              BESPOKE APPAREL
            </p>

            {/* Headline */}
            <h2
              className="font-playfair text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '0.02em' }}
            >
              Custom Embroidered
              <br />
              <span className="text-[#c9a66b]">Luxury Clothing</span>
            </h2>

            {/* Description */}
            <div className="space-y-4">
              <p
                className="text-white/80"
                style={{ fontSize: '16px', fontWeight: 300, lineHeight: 1.8, letterSpacing: '0.01em' }}
              >
                Elevate your wardrobe with our bespoke embroidery service. Each garment becomes a canvas for your personal narrative—initials, dates, or meaningful symbols meticulously crafted by master artisans.
              </p>
              <p
                className="text-white/60"
                style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.8, letterSpacing: '0.01em' }}
              >
                From subtle monograms on premium hoodies to intricate designs on tailored shirts, our custom embroidery transforms luxury apparel into signature pieces.
              </p>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { label: 'Hand-crafted', value: 'Precision' },
                { label: 'Premium', value: 'Materials' },
                { label: '48-hour', value: 'Turnaround' },
                { label: 'Lifetime', value: 'Guarantee' }
              ].map((feature, idx) => (
                <div key={idx} className="space-y-1">
                  <p
                    className="text-[#c9a66b] tracking-luxury"
                    style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em' }}
                  >
                    {feature.label.toUpperCase()}
                  </p>
                  <p
                    className="text-white"
                    style={{ fontSize: '14px', fontWeight: 300, letterSpacing: '0.02em' }}
                  >
                    {feature.value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={() => onNavigate('custom-embroidery-catalog')}
                className="group relative overflow-hidden bg-white text-black px-12 py-4 transition-all duration-300 hover:bg-[#c9a66b] hover:text-white"
              >
                <span
                  className="relative z-10 tracking-luxury"
                  style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em' }}
                >
                  EXPLORE CUSTOM APPAREL
                </span>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              {/* Secondary link */}
              <button
                onClick={() => onNavigate('custom-embroidery-catalog')}
                className="mt-6 text-[#c9a66b] hover:text-white transition-colors duration-300 flex items-center gap-2"
                style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.05em' }}
              >
                View Apparel Collection
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '500+', label: 'Custom Pieces Created' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '12', label: 'Embroidery Styles' },
            { number: '∞', label: 'Design Possibilities' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <p
                className="font-playfair text-[#c9a66b]"
                style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '0.02em' }}
              >
                {stat.number}
              </p>
              <p
                className="text-white/60 tracking-luxury"
                style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.08em' }}
              >
                {stat.label.toUpperCase()}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}