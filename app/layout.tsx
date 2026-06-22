import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BottomLineBar } from '@/components/BottomLineBar'

export const metadata: Metadata = {
  title: '採景 ECO VIEW｜生態瓶・雨林缸・迷你造景',
  description: '採景 ECO VIEW 是沒有實體店鋪的迷你造景品牌，展示生態瓶、雨林缸與客製作品。購買與客製洽詢請透過 LINE 私訊。',
  openGraph: {
    title: '採景 ECO VIEW｜一方玻璃，一座微型風景',
    description: '生態瓶｜雨林缸｜迷你造景｜客製洽詢',
    type: 'website',
    images: ['/placeholders/og-caijing.svg']
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Header />
        <main className="min-h-screen pb-24 md:pb-0">{children}</main>
        <Footer />
        <BottomLineBar />
      </body>
    </html>
  )
}
