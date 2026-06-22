import Link from 'next/link'
import type { Product } from '@/types/product'

function statusClass(status: Product['status']) {
  if (status === '已售出') return 'text-fog'
  if (status === '可客製') return 'text-mossSoft'
  if (status === '僅展示') return 'text-ivory/45'
  return 'text-ivory/70'
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product?slug=${product.slug}`} className="group block">
      <article className="transition duration-500 hover:-translate-y-1">
        <div className="image-frame aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-ivory/[0.08] bg-charcoal/30">
          <img src={product.coverImage} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" loading="lazy" />
        </div>
        <div className="pt-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[10px] tracking-[0.24em] text-mossSoft/80">{product.category}</span>
            <span className={`text-[10px] tracking-[0.18em] ${statusClass(product.status)}`}>{product.status}</span>
          </div>
          <h3 className="font-display text-2xl tracking-[0.06em] text-ivory">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-7 text-ivory/48">{product.summary}</p>
          <p className="mt-4 text-xs tracking-[0.18em] text-ivory/68">{product.price}</p>
        </div>
      </article>
    </Link>
  )
}
