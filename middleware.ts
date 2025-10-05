import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANONICAL_HOST = 'www.myhomesbudget.com' // <-- canonico CON www

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const host = req.headers.get('host') || ''

  // 1) apex → https://www...
  if (host === 'myhomesbudget.com') {
    url.hostname = CANONICAL_HOST
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  // 2) http://www → https://www (un solo hop)
  if (host === CANONICAL_HOST && url.protocol === 'http:') {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  // 3) Risposta normale + header canonical per TUTTE le pagine
  const res = NextResponse.next()

  // Canonical assoluto senza querystring/frammenti
  const path = url.pathname === '/' ? '/' : url.pathname.replace(/\/+$/, '')
  const canonical = `https://${CANONICAL_HOST}${path}`
  res.headers.set('Link', `<${canonical}>; rel="canonical"`)

  return res
}

// Escludi asset/statici e file pubblici
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
