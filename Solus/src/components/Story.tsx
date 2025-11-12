import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronLeft } from 'lucide-react';

interface StoryProps {
  storyId: string;
  onNavigate: (page: string) => void;
}

export function Story({ storyId, onNavigate }: StoryProps) {
  const stories = {
    limited: {
      title: 'The Art of Limited',
      subtitle: 'Why we keep Solus rare and meaningful',
      image: 'https://images.unsplash.com/photo-1689525665283-1937ca14f051?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      content: [
        'In a world of mass production, we choose restraint. Every Solus piece is deliberately limited, not as a marketing tactic, but as a commitment to excellence and exclusivity.',
        'Our philosophy is simple: true luxury cannot be replicated. When you wear a Solus piece, you carry something that exists in limited quantities, meticulously crafted for those who understand that rarity has inherent value.',
        'We produce in small batches, often no more than a dozen pieces per design. This allows our master artisans to devote uncompromising attention to each detail, ensuring that every ring, bracelet, and chain meets our exacting standards.',
        'Scarcity is not created—it is earned through dedication to craft. This is the Solus way.',
      ],
    },
    craftsman: {
      title: 'Meet the Craftsman',
      subtitle: 'Inside our studio with master artisans',
      image: 'https://images.unsplash.com/photo-1643968704781-df3b260df6a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdHNtYW4lMjBoYW5kcyUyMHdvcmtpbmclMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      content: [
        'Behind every Solus piece stands a master craftsman with decades of experience. Their hands have shaped gold, set stones, and brought designs to life with precision that machines cannot replicate.',
        'In our atelier, time moves differently. A single ring may take days to perfect, with each curve examined, each surface polished to mirror finish, each detail scrutinized under expert eyes.',
        'We work with artisans who learned their craft through years of apprenticeship, honoring traditions passed down through generations while embracing modern techniques where they enhance quality.',
        'This is not fast fashion. This is heritage jewelry, created for those who value the human touch and the irreplaceable skill of true mastery.',
      ],
    },
    embroidery: {
      title: 'Behind the Embroidery',
      subtitle: 'The meticulous process of personalization',
      image: 'https://images.unsplash.com/photo-1761724794734-4ee4148a621b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlbWJyb2lkZXJ5JTIwZGV0YWlsfGVufDF8fHx8MTc2MjM2ODU4OXww&ixlib=rb-4.1.0&q=80&w=1080',
      content: [
        'Our custom embroidery service represents the pinnacle of personalization. Each piece is individually crafted, transforming your jewelry into a unique heirloom.',
        'Using techniques refined over centuries, our embroidery specialists work with silk threads and precious metal fibers to create designs that will last generations. The process is painstaking, requiring steady hands and unwavering focus.',
        'From initial design consultation to the final stitch, every personalized piece receives over 20 hours of dedicated attention. We believe that items carrying your personal mark deserve nothing less than perfection.',
        'This is jewelry that tells your story, crafted with reverence for both tradition and the individual.',
      ],
    },
  };

  const story = stories[storyId as keyof typeof stories] || stories.limited;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Back Button */}
      <div className="fixed top-32 left-8 lg:left-16 z-10">
        <button
          onClick={() => onNavigate('stories')}
          className="flex items-center gap-2 text-[#2a2a2a] hover:text-[#c9a66b] transition-colors"
          style={{ fontSize: '13px', fontWeight: 500 }}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="tracking-luxury" style={{ letterSpacing: '0.08em' }}>BACK</span>
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <ImageWithFallback
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-[#faf8f5]" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10">
        <div className="max-w-[700px] mx-auto px-8">
          <div className="bg-[#faf8f5] pt-16 pb-32">
            {/* Title */}
            <div className="text-center mb-16">
              <h1
                className="font-playfair tracking-luxury mb-4"
                style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 700, color: '#000000', letterSpacing: '0.03em' }}
              >
                {story.title}
              </h1>
              <p
                className="tracking-luxury"
                style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
              >
                {story.subtitle.toUpperCase()}
              </p>
            </div>

            {/* Article Content */}
            <div className="space-y-8">
              {story.content.map((paragraph, index) => (
                <p
                  key={index}
                  style={{ fontSize: '16px', fontWeight: 300, color: '#2a2a2a', lineHeight: '2', textAlign: 'justify' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-20 text-center">
              <button
                onClick={() => onNavigate('collections')}
                className="border-2 border-black px-12 py-4 tracking-luxury hover:bg-black hover:text-white transition-all duration-300"
                style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em' }}
              >
                EXPLORE COLLECTIONS
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Mark */}
      <div className="border-t border-black/10 py-12 bg-white">
        <div className="text-center">
          <div className="inline-block px-6 py-2 border border-[#c9a66b]/30">
            <span className="font-playfair tracking-luxury" style={{ fontSize: '16px', fontWeight: 600, color: '#c9a66b' }}>
              ⬡ SOLUS ⬡
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
