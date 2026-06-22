import { sampleSettings } from '@/data/sampleProducts'

export default function CustomPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div>
          <p className="text-[10px] tracking-[0.42em] text-mossSoft">CUSTOM SERVICE</p>
          <h1 className="mt-5 font-display text-5xl leading-tight tracking-[0.06em] text-ivory md:text-7xl">客製服務</h1>
        </div>
        <div className="border-t border-ivory/[0.08] pt-8">
          <p className="font-display text-3xl leading-relaxed text-ivory/88 md:text-4xl">依空間、尺寸與預算，建立專屬於你的微型自然景觀。</p>
          <div className="mt-10 grid gap-8 text-sm leading-8 text-ivory/55">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-mossSoft">01</p>
              <h2 className="mt-2 font-display text-2xl text-ivory">提出需求</h2>
              <p className="mt-3">透過 LINE 提供預算、用途、尺寸、擺放環境與喜歡的風格。</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-mossSoft">02</p>
              <h2 className="mt-2 font-display text-2xl text-ivory">討論方向</h2>
              <p className="mt-3">採景依照需求建議容器形式、植物配置與整體氛圍。</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-mossSoft">03</p>
              <h2 className="mt-2 font-display text-2xl text-ivory">確認製作</h2>
              <p className="mt-3">確認報價與細節後開始製作，完成後再安排交付方式。</p>
            </div>
          </div>
          <a href={sampleSettings.lineUrl} className="mt-10 inline-flex rounded-full border border-ivory/18 px-6 py-3 text-xs tracking-[0.18em] text-ivory/75 transition hover:border-ivory/40 hover:text-ivory">LINE 洽詢客製</a>
        </div>
      </div>
    </section>
  )
}
