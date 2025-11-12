'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/stores/cart'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { getTotalItems } = useCartStore()
  const cartCount = getTotalItems()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f5]/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-playfair tracking-luxury transition-opacity hover:opacity-70"
            style={{ fontSize: '40px', fontWeight: 700, color: '#000000', letterSpacing: '0.05em' }}
          >
            SOLUS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <Link
              href="/collections"
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              COLLECTIONS
            </Link>
            <Link
              href="/custom-embroidery"
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              CUSTOM EMBROIDERY
            </Link>
            <Link
              href="/gift-sets"
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              GIFT SETS
            </Link>
            <Link
              href="/stories"
              className="tracking-luxury transition-colors hover:text-[#c9a66b]"
              style={{ fontSize: '13px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
            >
              SOLUS STORIES
            </Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group" aria-label="Shopping cart">
              <ShoppingBag className="w-5 h-5 text-black transition-colors group-hover:text-[#c9a66b]" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 bg-[#c9a66b] text-black rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ fontSize: '11px', fontWeight: 600 }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              <Link
                href="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                COLLECTIONS
              </Link>
              <Link
                href="/custom-embroidery"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                CUSTOM EMBROIDERY
              </Link>
              <Link
                href="/gift-sets"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                GIFT SETS
              </Link>
              <Link
                href="/stories"
                onClick={() => setMobileMenuOpen(false)}
                className="tracking-luxury text-left transition-colors hover:text-[#c9a66b]"
                style={{ fontSize: '14px', fontWeight: 400, color: '#2a2a2a', letterSpacing: '0.08em' }}
              >
                SOLUS STORIES
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
