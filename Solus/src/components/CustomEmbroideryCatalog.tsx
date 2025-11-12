import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomEmbroideryCatalogProps {
  onNavigate: (page: string, productId?: string) => void;
}

const PRODUCTS = [
  { id: 'hoodie', name: 'Hoodie', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', price: 450, description: 'Premium heavyweight cotton blend' },
  { id: 'sweater', name: 'Sweater', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800', price: 380, description: 'Luxurious merino wool knit' },
  { id: 'beanie', name: 'Beanie', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800', price: 120, description: 'Soft cashmere blend' },
  { id: 'cap', name: 'Cap', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', price: 140, description: 'Structured cotton twill' },
  { id: 'shirt', name: 'Shirt', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800', price: 320, description: 'Italian cotton poplin' },
  { id: 'trousers', name: 'Trousers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', price: 420, description: 'Tailored wool blend' },
];

export function CustomEmbroideryCatalog({ onNavigate }: CustomEmbroideryCatalogProps) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20 text-center">
        <h1 className="font-playfair tracking-luxury mb-6" style={{ fontSize: 'clamp(40px, 8vw, 80px)' }}>
          CUSTOM EMBROIDERY
        </h1>
        <p className="max-w-2xl mx-auto mb-4" style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
          Elevate your wardrobe with personalized embroidery. Each piece becomes a unique expression of your identity.
        </p>
        <div className="inline-block px-6 py-2 border border-black/20 bg-white" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#666' }}>
          5-7 DAYS CRAFTSMANSHIP · MASTER ARTISANS
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <button
              key={product.id}
              onClick={() => onNavigate('custom-embroidery-product', product.id)}
              className="group text-left bg-white border border-black/10 overflow-hidden hover:shadow-2xl transition-shadow duration-500"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-100 relative">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-playfair mb-2" style={{ fontSize: '24px', letterSpacing: '0.05em' }}>
                  {product.name}
                </h3>
                <p className="mb-4" style={{ fontSize: '12px', color: '#999', letterSpacing: '0.05em' }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '14px', color: '#666' }}>FROM</span>
                  <span className="font-playfair" style={{ fontSize: '20px' }}>
                    {product.price} RON
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-black/10">
                  <span className="inline-block px-4 py-2 border border-black text-black group-hover:bg-black group-hover:text-white transition-colors duration-300" style={{ fontSize: '11px', letterSpacing: '0.1em' }}>
                    PERSONALIZE
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-32">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white border border-black/10">
            <h4 className="mb-3" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>ARTISAN CRAFTED</h4>
            <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#666' }}>
              Every embroidery is meticulously hand-crafted by master artisans
            </p>
          </div>
          <div className="p-8 bg-white border border-black/10">
            <h4 className="mb-3" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>PREMIUM MATERIALS</h4>
            <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#666' }}>
              Finest threads and materials for lasting luxury
            </p>
          </div>
          <div className="p-8 bg-white border border-black/10">
            <h4 className="mb-3" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>TRULY UNIQUE</h4>
            <p style={{ fontSize: '12px', lineHeight: '1.8', color: '#666' }}>
              No two pieces are alike - your design, your story
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
