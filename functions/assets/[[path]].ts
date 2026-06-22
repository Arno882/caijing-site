// Cloudflare Pages Function: /assets/*
// Serves images stored in R2.

type Env = { BUCKET: R2Bucket }

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const path = Array.isArray(params.path) ? params.path.join('/') : String(params.path || '')
  if (!path) return new Response('Not found', { status: 404 })
  const object = await env.BUCKET.get(path)
  if (!object) return new Response('Not found', { status: 404 })
  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  return new Response(object.body, { headers })
}
