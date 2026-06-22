import type { Product } from '@/types/product'

export function buildLineMessage(product: Product, origin = '') {
  const url = origin ? `${origin}/product?slug=${product.slug}` : `/product?slug=${product.slug}`
  return `您好，我想詢問這件作品：\n\n商品名稱：${product.name}\n商品連結：${url}\n\n請問目前還可以購買嗎？`
}

export function buildLineUrl(lineUrl: string, message?: string) {
  if (!message) return lineUrl
  // LINE official links cannot always prefill text. This keeps the URL safe and lets the UI show copy text.
  return lineUrl
}
