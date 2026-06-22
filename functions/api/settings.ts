// Cloudflare Pages Function: /api/settings
// D1 binding name: DB

type Env = {
  DB: D1Database
  ADMIN_TOKEN: string
}

const defaultSettings = {
  brandName: '採景',
  heroTitle: '一方玻璃，一座微型風景。',
  heroSubtitle: '迷你造景作品展示｜苔蘚微景觀｜客製洽詢',
  heroImage: '/placeholders/hero-caijing.svg',
  ctaText: '查看商品',
  ctaLink: '/products',
  lineUrl: 'https://line.me/R/ti/p/@your-line-id',
  instagramUrl: 'https://www.instagram.com/',
  facebookUrl: 'https://www.facebook.com/',
  about: '採景將自然濃縮於一方空間，在玻璃、苔蘚與光影之間，保留一座微型風景的安靜深度。'
}

async function ensureTable(db: D1Database) {
  await db.prepare('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)').run()
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json; charset=utf-8' } })
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  await ensureTable(env.DB)
  const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?').bind('site').first<any>()
  if (!row?.value) return Response.json(defaultSettings)
  return Response.json(JSON.parse(row.value))
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('x-admin-token') || ''
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return unauthorized()
  await ensureTable(env.DB)
  const body = await request.json()
  await env.DB.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').bind('site', JSON.stringify(body)).run()
  return Response.json({ ok: true })
}
