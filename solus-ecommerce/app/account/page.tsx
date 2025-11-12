import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User, Package, MapPin, Settings } from 'lucide-react'

export default async function AccountPage() {
  const t = await getTranslations()

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="font-playfair text-4xl font-bold tracking-luxury mb-8">
          {t('account.title')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/account/profile"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#c9a66b]/10 rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-[#c9a66b]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t('account.profile')}</h3>
            <p className="text-gray-600 text-sm">Editează informațiile personale</p>
          </Link>

          <Link
            href="/account/orders"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#c9a66b]/10 rounded-lg flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-[#c9a66b]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t('account.orders')}</h3>
            <p className="text-gray-600 text-sm">Vizualizează istoricul comenzilor</p>
          </Link>

          <Link
            href="/account/addresses"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#c9a66b]/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-[#c9a66b]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t('account.addresses')}</h3>
            <p className="text-gray-600 text-sm">Gestionează adresele de livrare</p>
          </Link>

          <Link
            href="/account/settings"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-[#c9a66b]/10 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-[#c9a66b]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{t('account.settings')}</h3>
            <p className="text-gray-600 text-sm">Setări cont și preferințe</p>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Bine ai venit!</h2>
          <p className="text-gray-600 mb-6">
            Pentru a accesa contul tău, te rugăm să te autentifici.
          </p>
          <div className="flex gap-4">
            <Link href="/login">
              <Button size="lg">{t('auth.login')}</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                {t('auth.register')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
