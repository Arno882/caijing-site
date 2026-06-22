// Cloudflare Pages Function: /api/upload
// R2 binding name: BUCKET
// This endpoint stores images in R2 and returns an internal /assets/<key> URL.

type Env = {
  BUCKET: R2Bucket
  ADMIN_TOKEN: string
}

function unauthorized() {
  return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'content-type': 'application/json; charset=utf-8' } })
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const token = request.headers.get('x-admin-token') || ''
  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) return unauthorized()
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return new Response(JSON.stringify({ error: 'Missing file' }), { status: 400 })
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-')
  const key = `products/${Date.now()}-${safeName}`
  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || 'application/octet-stream' }
  })
  return Response.json({ url: `/assets/${key}`, key })
}
