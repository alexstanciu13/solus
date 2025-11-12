import { Hero } from './Hero';
import { LimitedDrops } from './LimitedDrops';
import { FeaturedCategories } from './FeaturedCategories';
import { CustomEmbroiderySection } from './CustomEmbroiderySection';
import { HeritageSection } from './HeritageSection';
import { CraftsmanshipShowcase } from './CraftsmanshipShowcase';
import { Testimonials } from './Testimonials';
import { NextDrop } from './NextDrop';
import { SolusStories } from './SolusStories';
import { PressSection } from './PressSection';
import { InstagramSection } from './InstagramSection';

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <LimitedDrops onNavigate={onNavigate} />
      <FeaturedCategories onNavigate={onNavigate} />
      <CustomEmbroiderySection onNavigate={onNavigate} />
      <HeritageSection onNavigate={onNavigate} />
      <CraftsmanshipShowcase />
      <Testimonials />
      <NextDrop onNavigate={onNavigate} />
      <SolusStories onNavigate={onNavigate} />
      <PressSection />
      <InstagramSection />
    </div>
  );
}