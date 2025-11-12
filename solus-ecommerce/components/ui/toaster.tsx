'use client'

import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-white border-black/10',
          title: 'text-black',
          description: 'text-gray-600',
          actionButton: 'bg-black text-white',
          cancelButton: 'bg-gray-100 text-black',
        },
      }}
    />
  )
}
