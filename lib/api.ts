import { sampleProducts, sampleSettings } from '@/data/sampleProducts'
import type { Product, SiteSettings } from '@/types/product'

export const PRODUCT_DRAFT_KEY = 'CAIJING_ADMIN_DRAFT_PRODUCTS'
export const SETTINGS_DRAFT_KEY = 'CAIJING_ADMIN_DRAFT_SETTINGS'

function readLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

// 0 元靜態版：前台會優先讀取後台存在瀏覽器 localStorage 的草稿。
// 這樣本機測試時，後台改完資料，前台重新整理就會更新。
// 正式上線仍以 data/sampleProducts.ts 為正式資料來源；localStorage 只存在該瀏覽器。
export async function getProducts(): Promise<Product[]> {
  return readLocalStorage<Product[]>(PRODUCT_DRAFT_KEY, sampleProducts)
}

export async function getSettings(): Promise<SiteSettings> {
  return readLocalStorage<SiteSettings>(SETTINGS_DRAFT_KEY, sampleSettings)
}

export function getVisibleProducts(products: Product[]) {
  return products
    .filter((p) => p.visible && p.status !== '隱藏')
    .sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getCategories(products: Product[]) {
  return ['全部', ...Array.from(new Set(products.map((p) => p.category)))]
}
