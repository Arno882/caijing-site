'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/ProductGrid'
import { getProducts, getVisibleProducts } from '@/lib/api'
import { sampleProducts } from '@/data/sampleProducts'
import type { Product } from '@/types/product'

export function ProductsClient() {
  const [products, setProducts] = useState<Product[]>(getVisibleProducts(sampleProducts))

  useEffect(() => {
    const refresh = () => {
      getProducts().then((items) => setProducts(getVisibleProducts(items)))
    }
    refresh()
    window.addEventListener('caijing-data-updated', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('caijing-data-updated', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  return <ProductGrid products={products} />
}
