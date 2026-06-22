import Link from 'next/link'
import type { Product, SiteSettings } from '@/types/product'
import { ProductCard } from '@/components/ProductCard'

export function Hero({ settings, featured }: { settings: SiteSettings; featured: Product[] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-14 pt-12 md:pb-24 md:pt-20">
      <div className="grid items-end gap-12 md:grid-cols-[0.72fr_1.28fr] md:gap-16">
        <div className="max-w-md">
          <p className="text-[10px] tracking-[0.5em] text-mossSoft">CAI JING ECO VIEW</p>
          <h1 className="mt-7 font-display text-6xl leading-[0.95] tracking-[0.08em] text-ivory md:text-7xl">採景</h1>
          <p className="mt-7 font-display text-3xl leading-relaxed text-ivory/88 md:text-4xl">{settings.heroTitle}</p>
          <p className="mt-6 text-sm leading-8 tracking-[0.08em] text-ivory/50">{settings.heroSubtitle}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link href={settings.ctaLink} className="rounded-full bg-ivory px-6 py-3 text-center text-xs font-semibold tracking-[0.18em] text-ink transition hover:bg-white">查看商品</Link>
            <Link href="/contact" className="rounded-full border border-ivory/16 px-6 py-3 text-center text-xs tracking-[0.18em] text-ivory/72 transition hover:border-ivory/36 hover:text-ivory">LINE 洽詢</Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-moss/10 blur-3xl" />
          <div className="overflow-hidden rounded-[2.4rem] border border-ivory/[0.08] bg-charcoal/30 shadow-glow">
            <img src={settings.heroImage} alt="採景首頁作品主視覺" className="aspect-[4/5] w-full object-cover md:aspect-[5/4]" />
          </div>
          <div className="mt-5 flex items-center justify-between text-[10px] tracking-[0.24em] text-ivory/36">
            <span>MINIATURE LANDSCAPE</span>
            <span>ECO VIEW</span>
          </div>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mt-24 md:mt-32">
          <div className="mb-8 flex items-end justify-between border-t border-ivory/[0.08] pt-8">
            <div>
              <p className="text-[10px] tracking-[0.35em] text-mossSoft">SELECTED WORKS</p>
              <h2 className="mt-3 font-display text-3xl tracking-[0.08em] text-ivory">精選商品</h2>
            </div>
            <Link href="/products" className="hidden text-xs tracking-[0.22em] text-ivory/45 hover:text-ivory md:block">查看全部</Link>
          </div>
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      )}
    </section>
  )
}
