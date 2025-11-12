import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Package, Heart } from 'lucide-react'
import { ProductCard } from '@/components/shop/ProductCard'

// Mock data - will be replaced with database queries after seed
const featuredProducts = [
  {
    id: '1',
    slug: 'inel-heritage-signet',
    nameRo: 'Inel Heritage Signet',
    basePrice: 1250,
    images: [{ url: '/products/ring-1.jpg', altTextRo: 'Inel Heritage Signet' }],
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    slug: 'bratara-clasica-lant',
    nameRo: 'Brățară Clasică Lanț',
    basePrice: 1850,
    images: [{ url: '/products/bracelet-1.jpg', altTextRo: 'Brățară Clasică Lanț' }],
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    slug: 'colier-traditional',
    nameRo: 'Colier Tradițional',
    basePrice: 2100,
    images: [{ url: '/products/necklace-1.jpg', altTextRo: 'Colier Tradițional' }],
    limitedDrop: true,
    inStock: true,
  },
  {
    id: '4',
    slug: 'cercei-eleganti',
    nameRo: 'Cercei Eleganți',
    basePrice: 890,
    images: [{ url: '/products/earrings-1.jpg', altTextRo: 'Cercei Eleganți' }],
    inStock: true,
  },
]

export default async function HomePage() {
  const t = await getTranslations()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#c9a66b] to-[#8b7355]" />

        <div className="relative z-20 text-center text-white max-w-4xl px-4 sm:px-8">
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold tracking-luxury mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <Link href="/collections">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6 h-auto">
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b border-black/10 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#c9a66b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#c9a66b]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Creații Unice</h3>
              <p className="text-gray-600 text-sm">Fiecare piesă este realizată manual cu atenție la detalii</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#c9a66b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#c9a66b]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Transport Gratuit</h3>
              <p className="text-gray-600 text-sm">Livrare gratuită pentru comenzi peste 200 RON</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#c9a66b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#c9a66b]" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Făcut în România</h3>
              <p className="text-gray-600 text-sm">Susținem meșteșugarii locali și tradițiile românești</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold tracking-luxury mb-4">
              {t('products.featuredProducts')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descoperă cele mai apreciate piese din colecția noastră
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/collections">
              <Button variant="outline" size="lg">
                {t('common.viewAll')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Limited Drops */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold tracking-luxury mb-6">
            Ediții Limitate
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Colecții exclusive, disponibile în cantități limitate
          </p>
          <Link href="/collections?filter=limited">
            <Button size="lg" variant="secondary">
              Descoperă Colecția
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Custom Embroidery CTA */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-br from-[#c9a66b] to-[#8b7355] rounded-2xl p-12 text-center text-white">
            <h2 className="font-playfair text-4xl font-bold tracking-luxury mb-4">
              Broderie Personalizată
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Creează bijuterii unice cu broderie personalizată
            </p>
            <Link href="/custom-embroidery">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Personalizează Acum
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
