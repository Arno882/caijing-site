'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { getSettings } from '@/lib/api'

export function BottomLineBar() {
  const [lineUrl, setLineUrl] = useState('https://line.me/R/ti/p/@your-line-id')

  useEffect(() => {
    getSettings().then((settings) => setLineUrl(settings.lineUrl))
  }, [])

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ivory/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden">
      <a href={lineUrl} className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full border border-ivory/18 bg-ivory/[0.04] px-5 py-3 text-sm tracking-[0.16em] text-ivory shadow-glow">
        <span className="h-2 w-2 rounded-full bg-line" />
        <MessageCircle size={16} /> LINE 洽詢
      </a>
    </div>
  )
}
