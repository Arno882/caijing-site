'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { sampleProducts, sampleSettings } from '@/data/sampleProducts'
import { getProducts, getSettings, getVisibleProducts } from '@/lib/api'
import { buildLineMessage } from '@/lib/line'
import { ProductCard } from '@/components/ProductCard'
import type { Product, SiteSettings } from '@/types/product'

export default function ProductDetailPage() {
  const [slug, setSlug] = useState(sampleProducts[0].slug)
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [settings, setSettings] = useState<SiteSettings>(sampleSettings)

  useEffect(() => {
    const refresh = () => {
      const query = new URLSearchParams(window.location.search)
      setSlug(query.get('slug') || sampleProducts[0].slug)
      getProducts().then((items) => setProducts(getVisibleProducts(items)))
      getSettings().then(setSettings)
    }
    refresh()
    window.addEventListener('caijing-data-updated', refresh)
    window.addEventListener('focus', refresh)
    return () => {
      window.removeEventListener('caijing-data-updated', refresh)
      window.removeEventListener('focus', refresh)
    }
  }, [])

  const product = useMemo(() => products.find((item) => item.slug === slug) || products[0] || sampleProducts[0], [products, slug])
  const related = products.filter((item) => item.slug !== product.slug && item.visible).slice(0, 2)
  const message = typeof window !== 'undefined' ? buildLineMessage(product, window.location.origin) : buildLineMessage(product)

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <Link href="/products" className="text-xs tracking-[0.22em] text-ivory/40 hover:text-ivory">← 返回商品</Link>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-start">
        <div className="space-y-5">
          <div className="image-frame aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-ivory/[0.08] bg-charcoal/30">
            <img src={product.coverImage} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-5">
              {product.gallery.map((image) => (
                <div key={image} className="image-frame aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-ivory/[0.08] bg-charcoal/30">
                  <img src={image} alt={`${product.name} 細節`} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="md:sticky md:top-24">
          <p className="text-[10px] tracking-[0.34em] text-mossSoft">{product.category}</p>
          <h1 className="mt-5 font-display text-5xl leading-tight tracking-[0.06em] text-ivory md:text-6xl">{product.name}</h1>
          <div className="mt-6 flex items-center gap-5 border-y border-ivory/[0.08] py-5">
            <p className="text-sm tracking-[0.18em] text-ivory/72">{product.price}</p>
            <span className="h-1 w-1 rounded-full bg-ivory/30" />
            <p className="text-xs tracking-[0.18em] text-ivory/45">{product.status}</p>
          </div>
          <p className="mt-8 text-sm leading-9 text-ivory/58">{product.description}</p>
          <div className="mt-10 grid gap-6 text-sm text-ivory/58">
            <Info label="尺寸" value={product.size} />
            <Info label="材質" value={product.material} />
            <Info label="照顧方式" value={product.care} />
          </div>
          <div className="mt-10 rounded-[1.5rem] border border-ivory/[0.08] bg-charcoal/20 p-5">
            <p className="text-[10px] tracking-[0.24em] text-mossSoft">LINE MESSAGE</p>
            <pre className="mt-4 whitespace-pre-wrap text-xs leading-7 text-ivory/55">{message}</pre>
          </div>
          <a href={settings.lineUrl} className="mt-5 inline-flex w-full justify-center rounded-full border border-ivory/18 bg-ivory/[0.04] px-6 py-3 text-center text-xs tracking-[0.18em] text-ivory transition hover:border-ivory/38 hover:bg-ivory hover:text-ink">LINE 私訊詢問</a>
        </aside>
      </div>
      {related.length > 0 && (
        <div className="mt-24 border-t border-ivory/[0.08] pt-10">
          <p className="text-[10px] tracking-[0.35em] text-mossSoft">RELATED</p>
          <h2 className="mt-3 font-display text-3xl text-ivory">其他作品</h2>
          <div className="mt-8 grid gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      )}
    </section>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-ivory/[0.07] pt-4">
      <span className="block text-[10px] tracking-[0.24em] text-ivory/32">{label}</span>
      <p className="mt-2 leading-8">{value}</p>
    </div>
  )
}
