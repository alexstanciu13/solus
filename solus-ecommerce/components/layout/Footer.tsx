'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Facebook, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  const t = useTranslations()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    alert(t('footer.newsletter'))
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold tracking-luxury mb-4">
              SOLUS
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              {t('hero.subtitle')}
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#c9a66b]">
                  <Facebook className="w-5 h-5" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#c9a66b]">
                  <Instagram className="w-5 h-5" />
                </Button>
              </a>
              <a href="mailto:contact@solus.ro" aria-label="Email">
                <Button variant="ghost" size="icon" className="text-white hover:text-[#c9a66b]">
                  <Mail className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm tracking-luxury mb-4 uppercase">
              {t('nav.collections')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-white transition-colors">
                  {t('categories.all')}
                </Link>
              </li>
              <li>
                <Link href="/collections?category=rings" className="text-gray-400 hover:text-white transition-colors">
                  {t('categories.rings')}
                </Link>
              </li>
              <li>
                <Link href="/collections?category=bracelets" className="text-gray-400 hover:text-white transition-colors">
                  {t('categories.bracelets')}
                </Link>
              </li>
              <li>
                <Link href="/collections?category=necklaces" className="text-gray-400 hover:text-white transition-colors">
                  {t('categories.necklaces')}
                </Link>
              </li>
              <li>
                <Link href="/gift-sets" className="text-gray-400 hover:text-white transition-colors">
                  {t('nav.giftSets')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-sm tracking-luxury mb-4 uppercase">
              Informații
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.shippingInfo')}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.returnPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm tracking-luxury mb-4 uppercase">
              {t('footer.newsletter')}
            </h4>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.newsletterText')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                required
              />
              <Button type="submit" className="w-full" variant="secondary">
                {t('footer.subscribe')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} Solus. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">
                {t('footer.termsConditions')}
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
