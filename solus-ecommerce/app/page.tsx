import { Hero } from '@/components/home/Hero'
import { LimitedDrops } from '@/components/home/LimitedDrops'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
import { CustomEmbroiderySection } from '@/components/home/CustomEmbroiderySection'
import { CraftsmanshipShowcase } from '@/components/home/CraftsmanshipShowcase'
import { Testimonials } from '@/components/home/Testimonials'
import { NextDrop } from '@/components/home/NextDrop'
import { HeritageSection } from '@/components/home/HeritageSection'
import { SolusStories } from '@/components/home/SolusStories'
import { PressSection } from '@/components/home/PressSection'
import { InstagramSection } from '@/components/home/InstagramSection'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LimitedDrops />
      <FeaturedCategories />
      <CustomEmbroiderySection />
      <CraftsmanshipShowcase />
      <Testimonials />
      <NextDrop />
      <HeritageSection />
      <SolusStories />
      <PressSection />
      <InstagramSection />
    </div>
  )
}
