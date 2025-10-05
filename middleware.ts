import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // forza sempre https://myhomesbudget.com come dominio unico
  if (url.hostname === 'www.myhomesbudget.com') {
    url.hostname = 'myhomesbudget.com'
    return NextResponse.redirect(url, 301)
  }

  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}
