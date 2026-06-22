import { sampleSettings } from '@/data/sampleProducts'

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:py-20">
      <div className="max-w-2xl">
        <p className="text-[10px] tracking-[0.42em] text-mossSoft">CONTACT</p>
        <h1 className="mt-5 font-display text-5xl leading-tight tracking-[0.06em] text-ivory md:text-7xl">聯絡與洽詢</h1>
        <p className="mt-6 text-sm leading-8 text-ivory/52">採景沒有實體店鋪。商品購買、客製與合作洽詢，請透過 LINE、Instagram 或 Facebook 聯絡。</p>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        <a href={sampleSettings.lineUrl} className="border-t border-ivory/[0.10] py-7 transition hover:border-ivory/35">
          <p className="text-[10px] tracking-[0.28em] text-mossSoft">LINE</p>
          <p className="mt-4 font-display text-3xl text-ivory">私訊洽詢</p>
          <p className="mt-4 text-sm leading-7 text-ivory/45">購買、客製、合作都從 LINE 開始。</p>
        </a>
        <a href={sampleSettings.instagramUrl} className="border-t border-ivory/[0.10] py-7 transition hover:border-ivory/35">
          <p className="text-[10px] tracking-[0.28em] text-mossSoft">INSTAGRAM</p>
          <p className="mt-4 font-display text-3xl text-ivory">作品動態</p>
          <p className="mt-4 text-sm leading-7 text-ivory/45">查看最新作品與製作紀錄。</p>
        </a>
        <a href={sampleSettings.facebookUrl} className="border-t border-ivory/[0.10] py-7 transition hover:border-ivory/35">
          <p className="text-[10px] tracking-[0.28em] text-mossSoft">FACEBOOK</p>
          <p className="mt-4 font-display text-3xl text-ivory">活動資訊</p>
          <p className="mt-4 text-sm leading-7 text-ivory/45">合作、活動與品牌資訊補充。</p>
        </a>
      </div>
    </section>
  )
}
