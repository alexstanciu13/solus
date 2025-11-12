import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { Collections } from './components/Collections';
import { ProductDetail } from './components/ProductDetail';
import { CustomEmbroideryCatalog } from './components/CustomEmbroideryCatalog';
import { CustomEmbroideryProduct } from './components/CustomEmbroideryProduct';
import { GiftSets } from './components/GiftSets';
import { GiftSetDetail } from './components/GiftSetDetail';
import { GiftSetCustomization } from './components/GiftSetCustomization';
import { Checkout } from './components/Checkout';
import { StoriesPage } from './components/StoriesPage';
import { Story } from './components/Story';
import { AnimatedLogo } from './components/AnimatedLogo';

type Page = 'home' | 'collections' | 'product' | 'gifts' | 'gift-set-detail' | 'gift-set-customize' | 'checkout' | 'stories' | 'story' | 'custom-embroidery-catalog' | 'custom-embroidery-product';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedId, setSelectedId] = useState<string>('');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      setSelectedId(id);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const isHomePage = currentPage === 'home';

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Header 
        onNavigate={handleNavigate} 
        cartCount={cartCount} 
        isHomePage={isHomePage}
        onMobileMenuChange={setMobileMenuOpen}
      />
      <AnimatedLogo 
        onNavigate={handleNavigate} 
        isHomePage={isHomePage}
        mobileMenuOpen={mobileMenuOpen}
      />
      
      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'collections' && <Collections onNavigate={handleNavigate} />}
        {currentPage === 'product' && (
          <ProductDetail
            productId={selectedId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'custom-embroidery-catalog' && (
          <CustomEmbroideryCatalog onNavigate={handleNavigate} />
        )}
        {currentPage === 'custom-embroidery-product' && (
          <CustomEmbroideryProduct 
            productId={selectedId} 
            onNavigate={handleNavigate} 
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'gifts' && (
          <GiftSets onNavigate={handleNavigate} onAddToCart={handleAddToCart} />
        )}
        {currentPage === 'gift-set-detail' && (
          <GiftSetDetail
            setId={selectedId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'gift-set-customize' && (
          <GiftSetCustomization
            setId={selectedId}
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout cartCount={cartCount} onNavigate={handleNavigate} />
        )}
        {currentPage === 'stories' && <StoriesPage onNavigate={handleNavigate} />}
        {currentPage === 'story' && <Story storyId={selectedId} onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}