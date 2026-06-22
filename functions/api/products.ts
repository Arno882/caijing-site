// Cloudflare Pages Function: /api/products
// D1 binding name: DB
// Admin protection: ADMIN_TOKEN environment variable, sent as x-admin-token.

type Env = {
  DB: D1Database
  ADMIN_TOKEN: string
}

async function ensureTable(db: D1Database) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT,
    price TEXT,
    size TEXT,
    material TEXT,
    status TEXT,
    summary TEXT,
    description TEXT,
    care TEXT,
    coverImage TEXT,
    gallery TEXT,
    featured INTEGER DEFAULT 0,
    visible INTEGER DEFAULT 1,
    sortOrder INTEGER DEFAULT 99,
    seoTitle TEXT,
    seoDescription TEXT,
    createdAt TEXT,
    updatedAt TEXT
  )`).run()
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json; charset=utf-8' } })
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  await ensureTable(env.DB)
  const result = await env.DB.prepare('SELECT * FROM products WHERE status != ? AND visible = 1 ORDER BY sortOrder ASC, updatedAt DESC').bind('隱藏').all()
  const rows = result.results || []
  return Response.json(rows.map((row: any) => ({
    ...row,
    gallery: row.gallery ? JSON.parse(row.gallery) : [],
    featured: Boolean(row.featured),
    visible: Boolean(row.visible)
  })))
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('x-admin-token') || ''
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return unauthorized()
  await ensureTable(env.DB)
  const body = await request.json<any>()
  const now = new Date().toISOString()
  const product = {
    id: body.id || crypto.randomUUID(),
    slug: body.slug,
    name: body.name,
    category: body.category || '',
    price: body.price || '',
    size: body.size || '',
    material: body.material || '',
    status: body.status || '可詢問',
    summary: body.summary || '',
    description: body.description || '',
    care: body.care || '',
    coverImage: body.coverImage || '',
    gallery: JSON.stringify(body.gallery || []),
    featured: body.featured ? 1 : 0,
    visible: body.visible === false ? 0 : 1,
    sortOrder: Number(body.sortOrder || 99),
    seoTitle: body.seoTitle || '',
    seoDescription: body.seoDescription || '',
    createdAt: body.createdAt || now,
    updatedAt: now
  }

  await env.DB.prepare(`INSERT INTO products (
    id, slug, name, category, price, size, material, status, summary, description, care, coverImage, gallery, featured, visible, sortOrder, seoTitle, seoDescription, createdAt, updatedAt
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    slug = excluded.slug,
    name = excluded.name,
    category = excluded.category,
    price = excluded.price,
    size = excluded.size,
    material = excluded.material,
    status = excluded.status,
    summary = excluded.summary,
    description = excluded.description,
    care = excluded.care,
    coverImage = excluded.coverImage,
    gallery = excluded.gallery,
    featured = excluded.featured,
    visible = excluded.visible,
    sortOrder = excluded.sortOrder,
    seoTitle = excluded.seoTitle,
    seoDescription = excluded.seoDescription,
    updatedAt = excluded.updatedAt`).bind(
      product.id, product.slug, product.name, product.category, product.price, product.size, product.material, product.status,
      product.summary, product.description, product.care, product.coverImage, product.gallery, product.featured,
      product.visible, product.sortOrder, product.seoTitle, product.seoDescription, product.createdAt, product.updatedAt
    ).run()

  return Response.json({ ok: true, id: product.id })
}
