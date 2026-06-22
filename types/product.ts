export type ProductStatus = '可詢問' | '已售出' | '可客製' | '僅展示' | '隱藏'

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  price: string
  size: string
  material: string
  status: ProductStatus
  summary: string
  description: string
  care: string
  coverImage: string
  gallery: string[]
  featured: boolean
  visible: boolean
  sortOrder: number
  seoTitle: string
  seoDescription: string
  createdAt?: string
  updatedAt?: string
}

export type SiteSettings = {
  brandName: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  ctaText: string
  ctaLink: string
  lineUrl: string
  instagramUrl: string
  facebookUrl: string
  about: string
}
