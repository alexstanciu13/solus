import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NextDropProps {
  onNavigate: (page: string) => void;
}

export function NextDrop({ onNavigate }: NextDropProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-8 lg:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p
              className="tracking-luxury mb-4"
              style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}
            >
              COMING SOON
            </p>
            
            <h2
              className="font-playfair tracking-luxury mb-8"
              style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em', lineHeight: '1.2' }}
            >
              Limited Edition 002
            </h2>
            
            <p
              className="mb-12"
              style={{ fontSize: '16px', fontWeight: 300, color: '#faf8f5', lineHeight: '1.9', maxWidth: '500px' }}
            >
              An exclusive collection of hand-engraved pieces. Only 8 will be produced. Be among the first to know when they drop.
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 mb-12">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINUTES' },
                { value: timeLeft.seconds, label: 'SECONDS' },
              ].map((unit, index) => (
                <motion.div
                  key={unit.label}
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                  className="text-center bg-white/5 border border-white/10 p-4"
                >
                  <p
                    className="font-playfair mb-1"
                    style={{ fontSize: '36px', fontWeight: 700, color: '#c9a66b' }}
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </p>
                  <p
                    className="tracking-luxury"
                    style={{ fontSize: '10px', fontWeight: 500, color: '#faf8f5', letterSpacing: '0.1em' }}
                  >
                    {unit.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Email Signup */}
            <form className="flex gap-4" onSubmit={(e) => { e.preventDefault(); alert('You will be notified!'); }}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-[#c9a66b] transition-colors"
                style={{ fontSize: '14px', fontWeight: 300 }}
              />
              <button
                type="submit"
                className="bg-[#c9a66b] text-black px-8 py-4 tracking-luxury hover:bg-[#b89559] transition-colors whitespace-nowrap"
                style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em' }}
              >
                NOTIFY ME
              </button>
            </form>
          </motion.div>

          {/* Right: Preview Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Limited Edition 002 Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Blur/Tease Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Coming Soon Badge */}
              <div className="absolute top-8 right-8">
                <div className="bg-[#c9a66b] text-black px-6 py-3">
                  <span className="tracking-luxury" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em' }}>
                    LIMITED 8/8
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
