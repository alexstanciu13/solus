import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Story {
  id: string;
  title: string;
  caption: string;
  image: string;
}

interface SolusStoriesProps {
  onNavigate: (page: string, storyId?: string) => void;
}

export function SolusStories({ onNavigate }: SolusStoriesProps) {
  const stories: Story[] = [
    {
      id: 'limited',
      title: 'The Art of Limited',
      caption: 'Why we keep Solus rare and meaningful',
      image: 'https://images.unsplash.com/photo-1689525665283-1937ca14f051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'craftsman',
      title: 'Meet the Craftsman',
      caption: 'Inside our studio with master artisans',
      image: 'https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBoYW5kcyUyMHdvcmtpbmclMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'embroidery',
      title: 'Behind the Embroidery',
      caption: 'The meticulous process of personalization',
      image: 'https://images.unsplash.com/photo-1761724794734-4ee4148a621b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbWJyb2lkZXJ5JTIwZGV0YWlsfGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <section className="py-32 px-8 lg:px-16 bg-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            Solus Stories
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            EDITORIAL INSIGHTS INTO OUR WORLD
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
              onClick={() => onNavigate('story', story.id)}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-6">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Story Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3
                    className="font-playfair mb-2 text-white"
                    style={{ fontSize: '24px', fontWeight: 600 }}
                  >
                    {story.title}
                  </h3>
                  <p
                    style={{ fontSize: '13px', fontWeight: 300, color: '#c9a66b', lineHeight: '1.6' }}
                  >
                    {story.caption}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="tracking-luxury"
                  style={{ fontSize: '12px', fontWeight: 500, color: '#c9a66b', letterSpacing: '0.1em' }}
                >
                  READ MORE
                </span>
                <svg className="w-4 h-4 text-[#c9a66b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
