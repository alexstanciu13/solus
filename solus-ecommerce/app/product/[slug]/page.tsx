'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import { Star, Truck, Shield, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/stores/cart'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [addEmbroidery, setAddEmbroidery] = useState(false)
  const { addItem } = useCartStore()

  const product = {
    id: params.slug,
    name: 'Inel Heritage Signet',
    price: 1250,
    stock: 2,
    description: 'Realizat meticulos din argint sterling placat cu aur 18k. Această piesă heritage întruchipează eleganța atemporală cu rafinament contemporan.',
    images: [
      'https://images.unsplash.com/photo-1708221269975-cc31682c7fc4?w=1080',
      'https://images.unsplash.com/photo-1758362197676-228703a17e69?w=1080',
      'https://images.unsplash.com/photo-1619525673983-81151d6cc193?w=1080',
    ],
    reviews: [
      { name: 'Alexandru M.', rating: 5, comment: 'Meșteșug excepțional. Atenția la detalii este remarcabilă.' },
      { name: 'Cristian D.', rating: 5, comment: 'O piesă cu adevărat statement. Lux care vorbește de la sine.' },
    ],
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    })
    alert('Adăugat în coș!')
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] pt-32 pb-20">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="flex items-center gap-2 mb-12">
          <Link href="/" className="hover:text-[#c9a66b] transition-colors" style={{ fontSize: '12px', fontWeight: 400, color: '#2a2a2a' }}>
            Acasă
          </Link>
          <ChevronRight className="w-3 h-3 text-[#2a2a2a]" />
          <Link href="/collections" className="hover:text-[#c9a66b] transition-colors" style={{ fontSize: '12px', fontWeight: 400, color: '#2a2a2a' }}>
            Colecții
          </Link>
          <ChevronRight className="w-3 h-3 text-[#2a2a2a]" />
          <span style={{ fontSize: '12px', fontWeight: 400, color: '#c9a66b' }}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="relative aspect-square mb-6 bg-white">
              <ImageWithFallback src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white border-2 transition-colors ${selectedImage === index ? 'border-[#c9a66b]' : 'border-transparent hover:border-black/20'}`}
                >
                  <ImageWithFallback src={image} alt={`Imagine ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <span className="tracking-luxury inline-block mb-4" style={{ fontSize: '11px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.15em' }}>
                SOLUS EDIȚIE LIMITATĂ
              </span>
              <h1 className="font-playfair mb-4" style={{ fontSize: '42px', fontWeight: 600, color: '#000000' }}>
                {product.name}
              </h1>
              <p className="mb-6" style={{ fontSize: '32px', fontWeight: 600, color: '#c9a66b' }}>
                {product.price.toLocaleString('ro-RO')} RON
              </p>

              <div className="inline-block bg-black px-6 py-3 mb-8">
                <motion.span animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '12px', fontWeight: 600, color: '#c9a66b', letterSpacing: '0.1em' }}>
                  DOAR {product.stock} {product.stock > 1 ? 'PIESE' : 'PIESĂ'} RĂMAS
                </motion.span>
              </div>
            </div>

            <p className="mb-10" style={{ fontSize: '15px', fontWeight: 300, color: '#2a2a2a', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div className="mb-10 p-6 border border-black/10">
              <div className="flex items-center justify-between mb-4">
                <span style={{ fontSize: '14px', fontWeight: 500, color: '#2a2a2a' }}>Adaugă Broderie Personalizată</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={addEmbroidery} onChange={(e) => setAddEmbroidery(e.target.checked)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c9a66b]"></div>
                </label>
              </div>
              {addEmbroidery && (
                <Link href="/custom-embroidery" className="text-[#c9a66b] hover:underline" style={{ fontSize: '13px', fontWeight: 400 }}>
                  Configurează broderia →
                </Link>
              )}
            </div>

            <button onClick={handleAddToCart} className="w-full bg-[#c9a66b] text-black py-5 tracking-luxury hover:bg-[#b89559] transition-colors mb-8" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}>
              ADAUGĂ ÎN COȘ
            </button>

            <div className="space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-[#c9a66b] mt-1" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>Transport gratuit peste 200 RON</p>
                  <p style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>Livrare express 24h disponibilă</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#c9a66b] mt-1" />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>Garanție pe viață</p>
                  <p style={{ fontSize: '12px', fontWeight: 300, color: '#666' }}>Meșteșug garantat</p>
                </div>
              </div>
            </div>

            <div className="border-t border-black/10 pt-10">
              <h3 className="mb-6" style={{ fontSize: '18px', fontWeight: 600, color: '#2a2a2a' }}>Recenzii Clienți</h3>
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div key={index} className="pb-6 border-b border-black/5 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#c9a66b] text-[#c9a66b]" />
                        ))}
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 500, color: '#2a2a2a' }}>{review.name}</span>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 300, color: '#666', lineHeight: '1.6' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
