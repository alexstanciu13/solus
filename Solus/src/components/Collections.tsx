import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  gender: string;
  colour: string;
}

interface CollectionsProps {
  onNavigate: (page: string, productId?: string) => void;
}

export function Collections({ onNavigate }: CollectionsProps) {
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedColour, setSelectedColour] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [isFooterInView, setIsFooterInView] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Detect when footer is in view
  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsFooterInView(footerTop <= windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products: Product[] = [
    {
      id: '1',
      name: 'Heritage Signet Ring',
      price: 1250,
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 2,
      category: 'rings',
      gender: 'mens',
      colour: 'gold',
    },
    {
      id: '2',
      name: 'Classic Chain Bracelet',
      price: 1850,
      image: 'https://images.unsplash.com/photo-1762232977931-2e3f5949b2aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmFjZWxldCUyMG1lbnMlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjM2ODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
      category: 'bracelets',
      gender: 'mens',
      colour: 'silver',
    },
    {
      id: '3',
      name: 'Royal Seal Ring',
      price: 1650,
      image: 'https://images.unsplash.com/photo-1758362197676-228703a17e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lnbmV0JTIwcmluZyUyMGx1eHVyeXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 3,
      category: 'rings',
      gender: 'mens',
      colour: 'gold',
    },
    {
      id: '4',
      name: 'Luxury Chain Necklace',
      price: 2250,
      image: 'https://images.unsplash.com/photo-1619525673983-81151d6cc193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnb2xkJTIwY2hhaW4lMjBqZXdlbHJ5JTIwYmxhY2slMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MjM2ODU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 2,
      category: 'chains',
      gender: 'unisex',
      colour: 'gold',
    },
    {
      id: '5',
      name: 'Heritage Timepiece',
      price: 3850,
      image: 'https://images.unsplash.com/photo-1703355685913-0113173df436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMG1lbnMlMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjIzNjg1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 1,
      category: 'watches',
      gender: 'mens',
      colour: 'black',
    },
    {
      id: '6',
      name: 'Minimalist Band Ring',
      price: 950,
      image: 'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZ29sZCUyMHJpbmclMjBqZXdlbHJ5JTIwcHJlbWl1bXxlbnwxfHx8fDE3NjIzNjg1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 4,
      category: 'rings',
      gender: 'unisex',
      colour: 'silver',
    },
    {
      id: '7',
      name: 'Bold Statement Ring',
      price: 1450,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1080',
      stock: 3,
      category: 'rings',
      gender: 'mens',
      colour: 'black',
    },
    {
      id: '8',
      name: 'Leather Wrap Bracelet',
      price: 890,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1080',
      stock: 5,
      category: 'bracelets',
      gender: 'unisex',
      colour: 'black',
    },
    {
      id: '9',
      name: 'Gold Cuban Chain',
      price: 2850,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1080',
      stock: 2,
      category: 'chains',
      gender: 'mens',
      colour: 'gold',
    },
    {
      id: '10',
      name: 'Elite Chronograph',
      price: 4200,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1080',
      stock: 1,
      category: 'watches',
      gender: 'mens',
      colour: 'silver',
    },
    {
      id: '11',
      name: 'Obsidian Signet Ring',
      price: 1320,
      image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1080',
      stock: 2,
      category: 'rings',
      gender: 'mens',
      colour: 'black',
    },
    {
      id: '12',
      name: 'Sterling Silver Cuff',
      price: 1680,
      image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1080',
      stock: 3,
      category: 'bracelets',
      gender: 'womens',
      colour: 'silver',
    },
    {
      id: '13',
      name: 'Rope Chain Necklace',
      price: 2100,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1080',
      stock: 4,
      category: 'chains',
      gender: 'unisex',
      colour: 'gold',
    },
    {
      id: '14',
      name: 'Vintage Band Ring',
      price: 1150,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1080',
      stock: 3,
      category: 'rings',
      gender: 'unisex',
      colour: 'gold',
    },
    {
      id: '15',
      name: 'Minimalist Timepiece',
      price: 2950,
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1080',
      stock: 2,
      category: 'watches',
      gender: 'unisex',
      colour: 'black',
    },
    {
      id: '16',
      name: 'Beaded Stone Bracelet',
      price: 780,
      image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1080',
      stock: 6,
      category: 'bracelets',
      gender: 'unisex',
      colour: 'black',
    },
    {
      id: '17',
      name: 'Byzantine Chain',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1080',
      stock: 1,
      category: 'chains',
      gender: 'mens',
      colour: 'silver',
    },
    {
      id: '18',
      name: 'Gemstone Signet Ring',
      price: 1890,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1080',
      stock: 2,
      category: 'rings',
      gender: 'mens',
      colour: 'gold',
    },
    {
      id: '19',
      name: 'Premium Diver Watch',
      price: 5100,
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1080',
      stock: 1,
      category: 'watches',
      gender: 'mens',
      colour: 'black',
    },
    {
      id: '20',
      name: 'Double Band Ring',
      price: 1080,
      image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=1080',
      stock: 4,
      category: 'rings',
      gender: 'womens',
      colour: 'silver',
    },
  ];

  // Filter products
  let filteredProducts = products.filter((product) => {
    if (selectedGender !== 'all' && product.gender !== selectedGender) {
      return false;
    }
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedColour !== 'all' && product.colour !== selectedColour) {
      return false;
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'name-az') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
  }

  const genderOptions = [
    { value: 'all', label: 'All' },
    { value: 'mens', label: "Men's" },
    { value: 'womens', label: "Women's" },
    { value: 'unisex', label: 'Unisex' },
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'chains', label: 'Chains' },
    { value: 'watches', label: 'Watches' },
  ];

  const colours = [
    { value: 'all', label: 'All Colours' },
    { value: 'gold', label: 'Gold' },
    { value: 'silver', label: 'Silver' },
    { value: 'black', label: 'Black' },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-az', label: 'Name: A-Z' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1
            className="font-playfair tracking-luxury mb-4"
            style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: 700, color: '#000000', letterSpacing: '0.05em' }}
          >
            Our Collections
          </h1>
          <p
            className="tracking-luxury"
            style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
          >
            METICULOUSLY SELECTED PIECES FOR THE DISCERNING MAN
          </p>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Filters - Fixed on Desktop, Sticky on Mobile */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className={`sticky ${isFooterInView ? 'lg:absolute' : 'lg:fixed'} top-24 lg:left-8 xl:left-16 space-y-8 lg:space-y-12 bg-[#faf8f5] z-10 pb-6 lg:w-64 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto`}>
              {/* Gender Filter */}
              <div>
                <h3
                  className="tracking-luxury mb-4 lg:mb-6 pb-3 border-b border-black/10"
                  style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.08em' }}
                >
                  GENDER
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                  {genderOptions.map((gender) => (
                    <button
                      key={gender.value}
                      onClick={() => setSelectedGender(gender.value)}
                      className={`block w-full text-left px-4 py-2 transition-all duration-200 ${
                        selectedGender === gender.value
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5'
                      }`}
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: selectedGender === gender.value ? 500 : 300,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {gender.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3
                  className="tracking-luxury mb-4 lg:mb-6 pb-3 border-b border-black/10"
                  style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.08em' }}
                >
                  CATEGORY
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`block w-full text-left px-4 py-2 transition-all duration-200 ${
                        selectedCategory === category.value
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5'
                      }`}
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: selectedCategory === category.value ? 500 : 300,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colour Filter */}
              <div>
                <h3
                  className="tracking-luxury mb-4 lg:mb-6 pb-3 border-b border-black/10"
                  style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.08em' }}
                >
                  COLOUR
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                  {colours.map((colour) => (
                    <button
                      key={colour.value}
                      onClick={() => setSelectedColour(colour.value)}
                      className={`block w-full text-left px-4 py-2 transition-all duration-200 ${
                        selectedColour === colour.value
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5'
                      }`}
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: selectedColour === colour.value ? 500 : 300,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {colour.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3
                  className="tracking-luxury mb-4 lg:mb-6 pb-3 border-b border-black/10"
                  style={{ fontSize: '13px', fontWeight: 600, color: '#000000', letterSpacing: '0.08em' }}
                >
                  SORT BY
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`block w-full text-left px-4 py-2 transition-all duration-200 ${
                        sortBy === option.value
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5'
                      }`}
                      style={{ 
                        fontSize: '14px', 
                        fontWeight: sortBy === option.value ? 500 : 300,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="pt-4 lg:pt-6 border-t border-black/10">
                <p
                  className="tracking-luxury"
                  style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b', letterSpacing: '0.08em' }}
                >
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
                </p>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} onNavigate={onNavigate} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a' }}>
                  No pieces match your selection. Please try different filters.
                </p>
              </div>
            )}
            
            {/* Footer Detection Element */}
            <div ref={footerRef} className="h-1 mt-20" />
          </div>
        </div>
      </div>
    </div>
  );
}