'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/types/product'
import { getCategories } from '@/lib/api'
import { ProductCard } from '@/components/ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => getCategories(products), [products])
  const [active, setActive] = useState('全部')
  const filtered = active === '全部' ? products : products.filter((p) => p.category === active)

  return (
    <section>
      <div className="no-scrollbar -mx-5 mb-10 flex gap-3 overflow-x-auto border-y border-ivory/[0.07] px-5 py-4 md:mx-0 md:flex-wrap md:px-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`shrink-0 px-2 py-2 text-xs tracking-[0.2em] transition ${active === category ? 'text-ivory' : 'text-ivory/38 hover:text-ivory/75'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}
