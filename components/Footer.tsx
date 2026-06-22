import Link from 'next/link'
import { sampleSettings } from '@/data/sampleProducts'

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-5 py-14 text-xs tracking-[0.18em] text-ivory/45">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <img src="/brand/logo-ecoview-seal.png" alt="採景 ECO VIEW Logo" className="h-16 w-16 object-contain" />
          <p className="mt-4 font-display text-2xl tracking-[0.24em] text-ivory/80">採景 ECO VIEW</p>
          <p className="mt-4 max-w-xs leading-7">一方玻璃，一座微型風景。購買與客製請透過 LINE 洽詢。</p>
        </div>
        <div>
          <p className="text-ivory/72">導覽</p>
          <div className="mt-5 grid gap-3">
            <Link href="/" className="hover:text-ivory">首頁</Link>
            <Link href="/products" className="hover:text-ivory">作品選物</Link>
            <Link href="/about" className="hover:text-ivory">關於採景</Link>
          </div>
        </div>
        <div>
          <p className="text-ivory/72">服務</p>
          <div className="mt-5 grid gap-3">
            <Link href="/custom" className="hover:text-ivory">客製服務</Link>
            <Link href="/contact" className="hover:text-ivory">聯絡我們</Link>
          </div>
        </div>
        <div>
          <p className="text-ivory/72">聯絡我們</p>
          <div className="mt-5 grid gap-3">
            <a href={sampleSettings.lineUrl} className="hover:text-ivory">LINE 洽詢</a>
            <a href={sampleSettings.instagramUrl} className="hover:text-ivory">Instagram</a>
            <a href={sampleSettings.facebookUrl} className="hover:text-ivory">Facebook</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-ivory/[0.08] pt-6 text-[10px] text-ivory/32">© 2026 採景 ECO VIEW. All rights reserved.</div>
    </footer>
  )
}
