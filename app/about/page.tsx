import { sampleSettings } from '@/data/sampleProducts'

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:py-20">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <div>
          <p className="text-[10px] tracking-[0.42em] text-mossSoft">ABOUT ECO VIEW</p>
          <h1 className="mt-5 font-display text-5xl leading-tight tracking-[0.06em] text-ivory md:text-7xl">關於採景</h1>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-ivory/[0.08]">
            <img src="/backgrounds/rainforest-closeup.jpg" alt="採景雨林微景觀特寫" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="border-t border-ivory/[0.08] pt-8 md:mt-28">
          <p className="font-display text-3xl leading-relaxed text-ivory/88 md:text-4xl">把自然收進一方玻璃，讓微小風景成為生活裡的安靜焦點。</p>
          <p className="mt-8 text-sm leading-9 text-ivory/55">{sampleSettings.about}</p>
          <p className="mt-5 text-sm leading-9 text-ivory/55">採景不以大量販售為核心，而是透過作品展示、私訊洽詢與客製討論，為不同空間建立合適的微型自然景觀。</p>
          <div className="mt-10 grid gap-6 border-t border-ivory/[0.08] pt-8 text-sm text-ivory/50">
            <p><span className="text-mossSoft">01</span> 生態瓶與雨林缸作品展示</p>
            <p><span className="text-mossSoft">02</span> 桌上型迷你造景與客製洽詢</p>
            <p><span className="text-mossSoft">03</span> 品牌合作、活動陳列與禮物規劃</p>
          </div>
        </div>
      </div>
    </section>
  )
}
