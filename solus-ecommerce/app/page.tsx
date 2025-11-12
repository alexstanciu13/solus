import { Hero } from '@/components/home/Hero'
import { LimitedDrops } from '@/components/home/LimitedDrops'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'
import { CustomEmbroiderySection } from '@/components/home/CustomEmbroiderySection'
import { CraftsmanshipShowcase } from '@/components/home/CraftsmanshipShowcase'
import { Testimonials } from '@/components/home/Testimonials'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LimitedDrops />
      <FeaturedCategories />
      <CustomEmbroiderySection />
      <CraftsmanshipShowcase />
      <Testimonials />
    </div>
  )
}
