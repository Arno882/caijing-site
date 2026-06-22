import { ProductsClient } from '@/components/ProductsClient'

export default function ProductsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <div className="max-w-2xl">
        <p className="text-[10px] tracking-[0.42em] text-mossSoft">PRODUCT ARCHIVE</p>
        <h1 className="mt-5 font-display text-5xl leading-tight tracking-[0.06em] text-ivory md:text-7xl">商品展示</h1>
        <p className="mt-6 text-sm leading-8 text-ivory/50">所有作品皆以展示與 LINE 洽詢為主。實際現貨、客製、交付方式，請私訊確認。</p>
      </div>
      <div className="mt-12">
        <ProductsClient />
      </div>
    </section>
  )
}
