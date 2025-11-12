'use client'

import Link from 'next/link'
import { Instagram, Mail } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mulțumim pentru că te-ai alăturat Solus Circle!')
    setEmail('')
  }

  return (
    <footer className="bg-black text-[#faf8f5] mt-32">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-playfair tracking-luxury mb-4" style={{ fontSize: '32px', fontWeight: 600 }}>
              Alătură-te Solus Circle
            </h3>
            <p className="mb-8" style={{ fontSize: '14px', fontWeight: 300, color: '#c9a66b' }}>
              Acces exclusiv la edițiile limitate și povești din culise
            </p>
            <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Adresa ta de email"
                required
                className="flex-1 bg-transparent border border-white/20 px-6 py-3 focus:outline-none focus:border-[#c9a66b] transition-colors"
                style={{ fontSize: '14px', fontWeight: 300 }}
              />
              <button
                type="submit"
                className="bg-[#c9a66b] text-black px-8 py-3 tracking-luxury hover:bg-[#b89559] transition-colors"
                style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em' }}
              >
                ALĂTURĂ-TE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h4 className="font-playfair tracking-luxury mb-4" style={{ fontSize: '24px', fontWeight: 700 }}>
              SOLUS
            </h4>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: '1.8', color: '#c9a66b' }}>
              Bijuterii de excepție în ediție limitată pentru bărbatul rafinat. Realizate meticulos, disponibile exclusiv.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="tracking-luxury mb-4" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
              EXPLOREAZĂ
            </h5>
            <div className="flex flex-col gap-3">
              <Link
                href="/collections"
                className="text-left hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                Colecții
              </Link>
              <Link
                href="/custom-embroidery"
                className="text-left hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                Broderie Personalizată
              </Link>
              <Link
                href="/gift-sets"
                className="text-left hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                Seturi Cadou
              </Link>
              <Link
                href="/stories"
                className="text-left hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                Povești Solus
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h5 className="tracking-luxury mb-4" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
              CONTACT
            </h5>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@solus.ro"
                className="flex items-center gap-2 hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                <Mail className="w-4 h-4" />
                contact@solus.ro
              </a>
              <a
                href="https://instagram.com/solus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#c9a66b] transition-colors"
                style={{ fontSize: '13px', fontWeight: 300 }}
              >
                <Instagram className="w-4 h-4" />
                @solus
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p style={{ fontSize: '12px', fontWeight: 300, color: '#c9a66b' }}>
            © 2025 Solus. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[#c9a66b] transition-colors" style={{ fontSize: '12px', fontWeight: 300 }}>
              Politica de Confidențialitate
            </Link>
            <Link href="/terms" className="hover:text-[#c9a66b] transition-colors" style={{ fontSize: '12px', fontWeight: 300 }}>
              Termeni și Condiții
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Mark */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16 text-center">
          <div className="inline-block px-6 py-2 border border-[#c9a66b]/30">
            <span className="font-playfair tracking-luxury" style={{ fontSize: '16px', fontWeight: 600, color: '#c9a66b' }}>
              ⬡ SOLUS ⬡
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
