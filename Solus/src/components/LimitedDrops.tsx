import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface LimitedDropsProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function LimitedDrops({ onNavigate }: LimitedDropsProps) {
  const featuredProducts: Product[] = [
    {
      id: '1',
      name: 'Heritage Signet Ring',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 2,
    },
    {
      id: '2',
      name: 'Classic Chain Bracelet',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
    },
    {
      id: '3',
      name: 'Royal Seal Ring',
      price: 1650,
      image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 3,
    },
  ];

  return (
    <section className="py-32 px-8 lg:px-16 bg-[#faf8f5]">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 600, color: '#000000', letterSpacing: '0.05em' }}
          >
            This Week's Limited Drops
          </h2>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            RARE PIECES, EXCLUSIVELY AVAILABLE
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button
            onClick={() => onNavigate('collections')}
            className="border-2 border-black px-12 py-4 tracking-luxury hover:bg-black hover:text-white transition-all duration-300"
            style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.12em' }}
          >
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>
    </section>
  );
}
