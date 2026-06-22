'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { sampleProducts, sampleSettings } from '@/data/sampleProducts'
import type { Product, ProductStatus, SiteSettings } from '@/types/product'

const statuses: ProductStatus[] = ['可詢問', '已售出', '可客製', '僅展示', '隱藏']
const STORAGE_KEY = 'CAIJING_ADMIN_DRAFT_PRODUCTS'
const SETTINGS_KEY = 'CAIJING_ADMIN_DRAFT_SETTINGS'

function notifyFrontEnd() {
  window.dispatchEvent(new Event('caijing-data-updated'))
}

type Tab = '商品管理' | '首頁設定' | '匯出資料'

function makeSlug(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\u4e00-\u9fa5]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `product-${Date.now()}`
}

function emptyProduct(order = 99): Product {
  return {
    id: crypto.randomUUID(),
    slug: `product-${Date.now()}`,
    name: '',
    category: '生態瓶',
    price: '私訊洽詢',
    size: '',
    material: '玻璃、苔蘚、石材、造景介質',
    status: '可詢問',
    summary: '',
    description: '',
    care: '避免陽光直射，放置於明亮散射光環境，依作品狀態適量補水。',
    coverImage: '/products/moss-001.jpg',
    gallery: [],
    featured: false,
    visible: true,
    sortOrder: order,
    seoTitle: '',
    seoDescription: ''
  }
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('商品管理')
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [editing, setEditing] = useState<Product>(emptyProduct())
  const [settings, setSettings] = useState<SiteSettings>(sampleSettings)
  const [notice, setNotice] = useState('0 元版後台：資料會先存在此瀏覽器。正式上線仍以 data/sampleProducts.ts 為準。')

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY)
      const savedSettings = localStorage.getItem(SETTINGS_KEY)
      if (savedProducts) setProducts(JSON.parse(savedProducts))
      if (savedSettings) setSettings(JSON.parse(savedSettings))
    } catch {
      setNotice('讀取本機草稿失敗，已改用範例資料。')
    }
  }, [])

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))).filter(Boolean), [products])
  const exportPayload = useMemo(() => JSON.stringify({ settings, products }, null, 2), [settings, products])

  function saveProducts(next: Product[]) {
    setProducts(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    notifyFrontEnd()
  }

  function saveSettings(next: SiteSettings) {
    setSettings(next)
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next))
    notifyFrontEnd()
  }

  function saveProduct(event: FormEvent) {
    event.preventDefault()
    const normalized: Product = {
      ...editing,
      slug: editing.slug || makeSlug(editing.name),
      seoTitle: editing.seoTitle || `${editing.name}｜採景 ECO VIEW`,
      seoDescription: editing.seoDescription || editing.summary,
      updatedAt: new Date().toISOString()
    }
    const exists = products.some((p) => p.id === normalized.id)
    const next = exists
      ? products.map((p) => (p.id === normalized.id ? normalized : p))
      : [normalized, ...products]
    saveProducts(next)
    setEditing(emptyProduct(next.length + 1))
    setNotice('商品草稿已儲存。要正式上線，請將匯出資料交給網站管理員更新 data/sampleProducts.ts。')
  }

  function editProduct(product: Product) {
    setEditing(product)
    setActiveTab('商品管理')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function removeProduct(id: string) {
    const next = products.filter((p) => p.id !== id)
    saveProducts(next)
    setNotice('商品已從本機草稿移除。')
  }

  async function copyExport() {
    await navigator.clipboard.writeText(exportPayload)
    setNotice('已複製匯出資料。')
  }

  function downloadExport() {
    const blob = new Blob([exportPayload], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'caijing-products-export.json'
    a.click()
    URL.revokeObjectURL(url)
    setNotice('已下載匯出 JSON。')
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs tracking-[0.35em] text-mossSoft">ADMIN CMS</p>
        <h1 className="mt-4 font-display text-4xl tracking-[0.08em] text-ivory md:text-6xl">採景後台</h1>
        <p className="mt-5 text-sm leading-8 text-ivory/56">用填表單的方式整理商品。此版本不使用 R2、不使用資料庫，適合 0 元靜態網站管理草稿。</p>
      </div>

      <div className="mt-8 rounded-2xl border border-mossSoft/25 bg-moss/10 p-4 text-sm leading-7 text-ivory/70">{notice}</div>

      <div className="mt-8 grid grid-cols-3 gap-3 rounded-[1.4rem] border border-ivory/10 bg-charcoal/40 p-2">
        {(['商品管理', '首頁設定', '匯出資料'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-2xl px-3 py-3 text-xs tracking-[0.16em] transition ${activeTab === tab ? 'bg-ivory text-ink' : 'text-ivory/55 hover:bg-ivory/8 hover:text-ivory'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === '商品管理' && (
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <form onSubmit={saveProduct} className="luxury-card rounded-[2rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.28em] text-mossSoft">STEP 1</p>
                <h2 className="mt-2 font-display text-3xl text-ivory">新增／編輯商品</h2>
              </div>
              <button type="button" onClick={() => setEditing(emptyProduct(products.length + 1))} className="rounded-full border border-ivory/12 px-4 py-2 text-xs tracking-[0.16em] text-ivory/60 hover:border-ivory/30 hover:text-ivory">清空</button>
            </div>

            <div className="mt-6 rounded-2xl border border-ivory/10 bg-ink/45 p-4">
              <p className="text-sm font-semibold text-ivory">圖片路徑說明</p>
              <p className="mt-2 text-xs leading-6 text-ivory/52">0 元版請先把圖片放到 <code>public/products</code>，封面欄位填 <code>/products/圖片檔名.jpg</code>。</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="商品名稱" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v, slug: makeSlug(v) })} required placeholder="例如：生態瓶｜森林小景" />
              <Field label="分類" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} list={categories} placeholder="生態瓶" />
              <Field label="價格" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} placeholder="私訊洽詢 / NT$ 1,880" />
              <label>
                <span className="admin-label">商品狀態</span>
                <select className="admin-input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as ProductStatus })}>
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </label>
              <Field label="封面圖片路徑" value={editing.coverImage} onChange={(v) => setEditing({ ...editing, coverImage: v })} placeholder="/products/moss-001.jpg" />
              <Field label="排序" value={String(editing.sortOrder)} onChange={(v) => setEditing({ ...editing, sortOrder: Number(v) || 99 })} />
            </div>

            <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-ivory/10 bg-ink/40">
              <img src={editing.coverImage || '/placeholders/product-1.svg'} alt="商品預覽" className="aspect-[4/5] w-full object-cover" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="尺寸" value={editing.size} onChange={(v) => setEditing({ ...editing, size: v })} placeholder="約 12 × 12 × 18 cm" />
              <Field label="材質" value={editing.material} onChange={(v) => setEditing({ ...editing, material: v })} />
            </div>

            <TextArea label="簡短介紹" value={editing.summary} onChange={(v) => setEditing({ ...editing, summary: v })} placeholder="一句話描述商品特色" />
            <TextArea label="商品介紹" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} placeholder="放在商品詳情頁的完整介紹" />
            <TextArea label="照顧方式" value={editing.care} onChange={(v) => setEditing({ ...editing, care: v })} />

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-ivory/10 p-4 text-sm text-ivory/70">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} /> 首頁精選
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-ivory/10 p-4 text-sm text-ivory/70">
                <input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} /> 前台顯示
              </label>
            </div>

            <button className="mt-6 w-full rounded-full bg-ivory px-5 py-3 text-sm font-semibold tracking-[0.16em] text-ink">儲存商品草稿</button>
          </form>

          <div className="luxury-card rounded-[2rem] p-6">
            <p className="text-xs tracking-[0.28em] text-mossSoft">STEP 2</p>
            <h2 className="mt-2 font-display text-3xl text-ivory">商品清單</h2>
            <p className="mt-2 text-xs leading-6 text-ivory/50">點商品可以回左側編輯。</p>
            <div className="mt-5 space-y-3">
              {products.map((product) => (
                <div key={product.id} className="rounded-2xl border border-ivory/10 p-4">
                  <button onClick={() => editProduct(product)} className="w-full text-left">
                    <p className="text-sm font-semibold text-ivory">{product.name || '未命名商品'}</p>
                    <p className="mt-1 text-xs tracking-[0.14em] text-ivory/45">{product.category}／{product.status}／{product.price}</p>
                  </button>
                  <button onClick={() => removeProduct(product.id)} className="mt-3 text-xs tracking-[0.16em] text-fog hover:text-ivory">移除草稿</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === '首頁設定' && (
        <section className="mt-8 luxury-card rounded-[2rem] p-6">
          <p className="text-xs tracking-[0.28em] text-mossSoft">HOME</p>
          <h2 className="mt-2 font-display text-3xl text-ivory">首頁設定</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="首頁標題" value={settings.heroTitle} onChange={(v) => saveSettings({ ...settings, heroTitle: v })} />
            <Field label="首頁副標" value={settings.heroSubtitle} onChange={(v) => saveSettings({ ...settings, heroSubtitle: v })} />
            <Field label="首頁主圖路徑" value={settings.heroImage} onChange={(v) => saveSettings({ ...settings, heroImage: v })} />
            <Field label="LINE 連結" value={settings.lineUrl} onChange={(v) => saveSettings({ ...settings, lineUrl: v })} />
            <Field label="Instagram 連結" value={settings.instagramUrl} onChange={(v) => saveSettings({ ...settings, instagramUrl: v })} />
            <Field label="Facebook 連結" value={settings.facebookUrl} onChange={(v) => saveSettings({ ...settings, facebookUrl: v })} />
          </div>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-ivory/10">
            <img src={settings.heroImage} alt="首頁封面預覽" className="w-full object-cover" />
          </div>
        </section>
      )}

      {activeTab === '匯出資料' && (
        <section className="mt-8 luxury-card rounded-[2rem] p-6">
          <p className="text-xs tracking-[0.28em] text-mossSoft">EXPORT</p>
          <h2 className="mt-2 font-display text-3xl text-ivory">匯出給網站管理員</h2>
          <p className="mt-3 text-sm leading-7 text-ivory/55">0 元版不直接寫入網站檔案。請匯出 JSON，再由網站管理員更新 <code>data/sampleProducts.ts</code>。</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button onClick={copyExport} className="rounded-full bg-ivory px-5 py-3 text-sm font-semibold tracking-[0.16em] text-ink">複製資料</button>
            <button onClick={downloadExport} className="rounded-full border border-ivory/14 px-5 py-3 text-sm tracking-[0.16em] text-ivory/70">下載 JSON</button>
          </div>
          <textarea className="admin-input mt-5 min-h-96 font-mono text-xs" value={exportPayload} readOnly />
        </section>
      )}
    </div>
  )
}

function Field({ label, value, onChange, required, list, placeholder }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; list?: string[]; placeholder?: string }) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <input className="admin-input" value={value} onChange={(e) => onChange(e.target.value)} required={required} list={list ? `${label}-list` : undefined} placeholder={placeholder} />
      {list && <datalist id={`${label}-list`}>{list.map((item) => <option key={item} value={item} />)}</datalist>}
    </label>
  )
}

function TextArea({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="mt-4 block">
      <span className="admin-label">{label}</span>
      <textarea className="admin-input min-h-28" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </label>
  )
}
