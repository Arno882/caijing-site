'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { getProducts, getSettings, getVisibleProducts } from '@/lib/api'
import { sampleProducts, sampleSettings } from '@/data/sampleProducts'
import type { Product, SiteSettings } from '@/types/product'

export function HomeClient() {
  const [products, setProducts] = useState<Product[]>(getVisibleProducts(sampleProducts))
  const [settings, setSettings] = useState<SiteSettings>(sampleSettings)

  useEffect(() => {
    const refresh = () => {
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

  const featured = products.filter((product) => product.featured)

  return (
    <>
      <Hero settings={settings} featured={featured.length ? featured : products.slice(0, 5)} />
      <AboutPreview />
      <LineCta lineUrl={settings.lineUrl} />
    </>
  )
}

function AboutPreview() {
  return (
    <section className="border-y border-ivory/[0.07] bg-[#050505]">
      <div className="mx-auto grid max-w-7xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[420px] overflow-hidden md:min-h-[520px]">
          <img src="/backgrounds/rainforest-closeup.jpg" alt="雨林微景觀特寫" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/25 to-ink/85" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
        </div>
        <div className="flex items-center px-5 py-14 md:px-16 md:py-20">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.45em] text-mossSoft">ABOUT ECO VIEW</p>
            <h2 className="mt-5 font-display text-5xl tracking-[0.08em] text-ivory md:text-6xl">關於採景</h2>
            <p className="mt-8 text-sm leading-9 tracking-[0.06em] text-ivory/58">
              採景 ECO VIEW 專注於生態瓶、雨林缸與迷你造景創作。我們將苔蘚、岩石、水感與玻璃容器重新組構，讓一座微型風景安靜地存在於生活之中。
            </p>
            <p className="mt-5 text-sm leading-9 tracking-[0.06em] text-ivory/46">
              每件作品都不是單純的商品，而是一個可被觀看、照顧與收藏的小型自然場景。購買、客製與合作皆透過 LINE 洽詢。
            </p>
            <Link href="/about" className="mt-10 inline-flex border border-ivory/18 px-10 py-3 text-xs tracking-[0.2em] text-ivory/72 transition hover:border-ivory/45 hover:text-ivory">
              了解更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function LineCta({ lineUrl }: { lineUrl: string }) {
  return (
    <section className="relative overflow-hidden px-5 py-20 text-center md:py-28">
      <img src="/backgrounds/rainforest-closeup.jpg" alt="LINE 洽詢背景" className="absolute inset-0 h-full w-full object-cover opacity-55 blur-[2px] scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-moss/35 to-ink/95" />
      <div className="relative mx-auto max-w-3xl">
        <p className="text-[10px] tracking-[0.45em] text-ivory/50">PRIVATE CONSULTATION</p>
        <h2 className="mt-5 font-display text-3xl leading-relaxed tracking-[0.12em] text-ivory md:text-5xl">
          想要擁有專屬於你的微景世界？
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-8 tracking-[0.06em] text-ivory/58">
          歡迎透過 LINE 與我們聊聊，洽詢訂製、選物或品牌合作。
        </p>
        <a href={lineUrl} className="mt-9 inline-flex items-center justify-center gap-3 border border-ivory/22 bg-ink/35 px-11 py-3 text-xs tracking-[0.2em] text-ivory transition backdrop-blur-md hover:border-ivory/55 hover:bg-ivory hover:text-ink">
          <span className="h-2 w-2 rounded-full bg-line" />
          LINE 洽詢
        </a>
      </div>
    </section>
  )
}
