import Link from 'next/link'
import { sampleSettings } from '@/data/sampleProducts'

const nav = [
  { href: '/', label: '首頁' },
  { href: '/products', label: '作品選物' },
  { href: '/about', label: '關於採景' },
  { href: '/custom', label: '客製服務' },
  { href: '/contact', label: '聯絡我們' }
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <img src="/brand/logo-ecoview-seal.png" alt="採景 ECO VIEW Logo" className="h-10 w-10 object-contain" />
          <div className="hidden leading-none sm:block">
            <p className="font-display text-lg tracking-[0.24em] text-ivory">採景</p>
            <p className="mt-1 text-[9px] tracking-[0.28em] text-ivory/38">ECO VIEW</p>
          </div>
        </Link>
        <nav className="hidden gap-8 text-[11px] tracking-[0.22em] text-ivory/60 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ivory">{item.label}</Link>
          ))}
        </nav>
        <a href={sampleSettings.lineUrl} className="rounded-full border border-ivory/18 px-5 py-2 text-[11px] tracking-[0.2em] text-ivory/72 transition hover:border-ivory/40 hover:text-ivory">LINE 洽詢</a>
      </div>
    </header>
  )
}
