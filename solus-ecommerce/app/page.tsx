import { Hero } from '@/components/home/Hero'
import { LimitedDrops } from '@/components/home/LimitedDrops'
import { FeaturedCategories } from '@/components/home/FeaturedCategories'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <LimitedDrops />
      <FeaturedCategories />
    </div>
  )
}
