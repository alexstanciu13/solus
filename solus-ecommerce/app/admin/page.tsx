import { getTranslations } from 'next-intl/server'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'

export default async function AdminDashboard() {
  const t = await getTranslations()

  const stats = [
    {
      title: 'Total Vânzări',
      value: '45.230 RON',
      icon: DollarSign,
      change: '+12.5%',
    },
    {
      title: 'Comenzi',
      value: '145',
      icon: ShoppingCart,
      change: '+8.2%',
    },
    {
      title: 'Produse',
      value: '24',
      icon: Package,
      change: '+3',
    },
    {
      title: 'Clienți',
      value: '892',
      icon: Users,
      change: '+24',
    },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-8">
          <h1 className="font-playfair text-4xl font-bold tracking-luxury mb-2">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">Bine ai venit înapoi!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#c9a66b]/10 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[#c9a66b]" />
                </div>
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="/admin/products"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Produse</h3>
            <p className="text-gray-600 text-sm">Gestionează produsele și categoriile</p>
          </a>
          <a
            href="/admin/orders"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Comenzi</h3>
            <p className="text-gray-600 text-sm">Vezi și procesează comenzile</p>
          </a>
          <a
            href="/admin/customers"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Clienți</h3>
            <p className="text-gray-600 text-sm">Gestionează baza de clienți</p>
          </a>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-2">🚧 În Dezvoltare</h3>
          <p className="text-gray-700">
            Dashboard-ul admin este în curs de dezvoltare. Funcționalitățile complete vor fi disponibile în curând.
          </p>
        </div>
      </div>
    </div>
  )
}
