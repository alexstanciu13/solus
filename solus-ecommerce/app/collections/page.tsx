import { getTranslations } from 'next-intl/server'
import { ProductCard } from '@/components/shop/ProductCard'

// Mock data - will fetch from database after seed
const products = [
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
  {
    id: '5',
    slug: 'inel-vintage',
    nameRo: 'Inel Vintage',
    basePrice: 1450,
    images: [{ url: '/products/ring-2.jpg', altTextRo: 'Inel Vintage' }],
    inStock: true,
  },
  {
    id: '6',
    slug: 'bratara-minimalista',
    nameRo: 'Brățară Minimalistă',
    basePrice: 950,
    images: [{ url: '/products/bracelet-2.jpg', altTextRo: 'Brățară Minimalistă' }],
    inStock: true,
  },
  {
    id: '7',
    slug: 'colier-statement',
    nameRo: 'Colier Statement',
    basePrice: 2450,
    images: [{ url: '/products/necklace-2.jpg', altTextRo: 'Colier Statement' }],
    limitedDrop: true,
    inStock: true,
  },
  {
    id: '8',
    slug: 'cercei-perle',
    nameRo: 'Cercei cu Perle',
    basePrice: 1200,
    images: [{ url: '/products/earrings-2.jpg', altTextRo: 'Cercei cu Perle' }],
    inStock: true,
  },
]

export default async function CollectionsPage() {
  const t = await getTranslations()

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-5xl font-bold tracking-luxury mb-4">
            {t('nav.collections')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorează colecția completă de bijuterii artizanale
          </p>
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-4">
            <select className="px-4 py-2 border border-black/20 rounded-md bg-white">
              <option value="">Toate categoriile</option>
              <option value="rings">{t('categories.rings')}</option>
              <option value="bracelets">{t('categories.bracelets')}</option>
              <option value="necklaces">{t('categories.necklaces')}</option>
              <option value="earrings">{t('categories.earrings')}</option>
            </select>
          </div>
          <div>
            <select className="px-4 py-2 border border-black/20 rounded-md bg-white">
              <option value="">Sortează</option>
              <option value="price-asc">Preț: Crescător</option>
              <option value="price-desc">Preț: Descrescător</option>
              <option value="newest">Cele mai noi</option>
              <option value="popular">Cele mai populare</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">Se afișează {products.length} produse</p>
        </div>
      </div>
    </div>
  )
}
