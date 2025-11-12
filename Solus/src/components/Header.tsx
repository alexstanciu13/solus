import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  cartCount?: number;
  isHomePage?: boolean;
  onMobileMenuChange?: (isOpen: boolean) => void;
}

export function Header({ onNavigate, cartCount = 0, isHomePage = false, onMobileMenuChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (open: boolean) => {
    setMobileMenuOpen(open);
    onMobileMenuChange?.(open);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Hidden on home page when AnimatedLogo is active, but visible when mobile menu is open */}
          <button
            onClick={() => onNavigate('home')}
            className={`font-playfair tracking-luxury transition-opacity hover:opacity-70 ${
              isHomePage && !mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            style={{ fontSize: '40px', fontWeight: 700, color: '#000000', letterSpacing: '0.05em' }}
          >
            SOLUS
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => onNavigate('collections')}
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              COLLECTIONS
            </button>
            <button
              onClick={() => onNavigate('custom-embroidery-catalog')}
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              CUSTOM EMBROIDERY
            </button>
            <button
              onClick={() => onNavigate('gifts')}
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              GIFT SETS
            </button>
            <button
              onClick={() => onNavigate('stories')}
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              SOLUS STORIES
            </button>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('checkout')}
              className="relative group"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-black transition-colors group-hover:text-[#c9a66b]" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c9a66b] text-black rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: '11px', fontWeight: 600 }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => toggleMobileMenu(!mobileMenuOpen)}
              className="md:hidden text-black"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-black/10 relative z-[60]">
            <nav className="flex flex-col gap-6">
              <button
                onClick={() => {
                  onNavigate('collections');
                  toggleMobileMenu(false);
                }}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                COLLECTIONS
              </button>
              <button
                onClick={() => {
                  onNavigate('custom-embroidery-catalog');
                  toggleMobileMenu(false);
                }}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                CUSTOM EMBROIDERY
              </button>
              <button
                onClick={() => {
                  onNavigate('gifts');
                  toggleMobileMenu(false);
                }}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                GIFT SETS
              </button>
              <button
                onClick={() => {
                  onNavigate('stories');
                  toggleMobileMenu(false);
                }}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                SOLUS STORIES
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}